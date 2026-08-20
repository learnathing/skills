#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const [sourceManifestPath, draftDirectory, ...unexpectedArguments] = process.argv.slice(2);

if (!sourceManifestPath || !draftDirectory || unexpectedArguments.length > 0) {
  console.error("Usage: validate-tickets.mjs <source-manifest.json> <draft-directory>");
  process.exit(2);
}

const root = path.resolve(draftDirectory);
const errors = [];

let sourceManifest;
try {
  sourceManifest = JSON.parse(fs.readFileSync(path.resolve(sourceManifestPath), "utf8"));
} catch (error) {
  console.error(`Cannot read source manifest: ${error.message}`);
  process.exit(2);
}

if (sourceManifest.schema_version !== 1 || !Array.isArray(sourceManifest.delivery_ids) || sourceManifest.delivery_ids.length === 0) {
  console.error("Source manifest must use schema_version 1 and contain delivery_ids");
  process.exit(2);
}

const sourceDefinitions = new Map();
for (const item of sourceManifest.delivery_ids) {
  if (typeof item.id !== "string" || !item.id.trim() || typeof item.definition !== "string" || !item.definition.trim()) {
    console.error("Every source manifest delivery ID needs a non-empty id and definition");
    process.exit(2);
  }
  if (!Array.isArray(item.source_ids) || item.source_ids.length === 0) {
    console.error(`Source manifest delivery ID ${item.id} needs source_ids`);
    process.exit(2);
  }
  if (sourceDefinitions.has(item.id)) {
    console.error(`Duplicate source manifest delivery ID: ${item.id}`);
    process.exit(2);
  }
  sourceDefinitions.set(item.id, item.definition.trim());
}

const requiredSourceIds = [...sourceDefinitions.keys()];

if (!fs.statSync(root, { throwIfNoEntry: false })?.isDirectory()) {
  console.error(`Draft directory does not exist: ${root}`);
  process.exit(2);
}

function markdownFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) return markdownFiles(target);
    return entry.isFile() && entry.name.endsWith(".md") ? [target] : [];
  });
}

function field(body, name) {
  return body.match(new RegExp(`^${name}:\\s*(.+)$`, "m"))?.[1].trim();
}

function values(raw) {
  if (!raw || raw === "None") return [];
  return raw.split(",").map((value) => value.trim()).filter(Boolean);
}

function escaped(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function section(body, heading) {
  const headingMatch = new RegExp(`^## ${escaped(heading)}\\s*$`, "m").exec(body);
  if (!headingMatch) return "";
  const remainder = body.slice(headingMatch.index + headingMatch[0].length);
  const nextHeading = remainder.search(/^## /m);
  return (nextHeading === -1 ? remainder : remainder.slice(0, nextHeading)).trim();
}

const files = markdownFiles(root);
if (files.length === 0) errors.push("No Markdown ticket drafts found");

const tickets = files.map((file) => {
  const body = fs.readFileSync(file, "utf8");
  const relative = path.relative(root, file);
  const id = field(body, "Ticket");
  const blockedBy = values(field(body, "Blocked by"));
  const owns = values(field(body, "Owns"));

  if (!body.match(/^# \S.+$/m)) errors.push(`${relative}: missing ticket title`);
  if (!id) errors.push(`${relative}: missing Ticket field`);
  if (!field(body, "Blocked by")) errors.push(`${relative}: missing Blocked by field`);
  if (field(body, "Status") !== "ready-for-agent") errors.push(`${relative}: Status must be ready-for-agent`);
  if (owns.length === 0) errors.push(`${relative}: Owns must contain at least one source ID`);
  if (!field(body, "What to build")) errors.push(`${relative}: missing What to build field`);

  for (const heading of ["Spec trace", "Contract", "Context pointers", "Acceptance criteria", "Evidence required"]) {
    if (!section(body, heading)) errors.push(`${relative}: missing or empty ${heading} section`);
  }

  for (const contractField of ["Invariants", "Seam", "Success", "Failures and degradation"]) {
    if (!body.match(new RegExp(`^- \\*\\*${escaped(contractField)}:\\*\\*\\s+\\S`, "m"))) {
      errors.push(`${relative}: missing Contract field ${contractField}`);
    }
  }

  if (!section(body, "Acceptance criteria").match(/^- \[ \] \S/m)) {
    errors.push(`${relative}: Acceptance criteria needs an unchecked observable criterion`);
  }

  for (const sourceId of owns) {
    const expectedDefinition = sourceDefinitions.get(sourceId);
    const definition = expectedDefinition
      ? new RegExp(`^- (?:\\*\\*)?${escaped(sourceId)}(?:\\*\\*)?:\\s+${escaped(expectedDefinition)}(?:\\s|$)`, "m")
      : new RegExp(`^- (?:\\*\\*)?${escaped(sourceId)}(?:\\*\\*)?:\\s+\\S`, "m");
    if (!section(body, "Spec trace").match(definition)) {
      errors.push(`${relative}: Spec trace does not carry the manifest definition for ${sourceId}`);
    }
  }

  return { id, blockedBy, owns, relative };
});

const byId = new Map();
for (const ticket of tickets) {
  if (!ticket.id) continue;
  if (byId.has(ticket.id)) errors.push(`${ticket.relative}: duplicate Ticket ID ${ticket.id}`);
  byId.set(ticket.id, ticket);
}

const ownership = new Map();
for (const ticket of tickets) {
  for (const sourceId of ticket.owns) {
    const owners = ownership.get(sourceId) ?? [];
    owners.push(ticket.id ?? ticket.relative);
    ownership.set(sourceId, owners);
  }
  for (const blocker of ticket.blockedBy) {
    if (blocker === ticket.id) errors.push(`${ticket.relative}: ticket blocks itself`);
    if (!byId.has(blocker)) errors.push(`${ticket.relative}: unknown blocker ${blocker}`);
  }
}

for (const sourceId of requiredSourceIds) {
  const owners = ownership.get(sourceId) ?? [];
  if (owners.length === 0) errors.push(`Required source ID ${sourceId} has no owner`);
  if (owners.length > 1) errors.push(`Required source ID ${sourceId} has multiple owners: ${owners.join(", ")}`);
}

const requiredSet = new Set(requiredSourceIds);
for (const [sourceId, owners] of ownership) {
  if (!requiredSet.has(sourceId)) errors.push(`Owned source ID ${sourceId} is not in the required source set`);
  if (owners.length > 1) errors.push(`Source ID ${sourceId} has multiple owners: ${owners.join(", ")}`);
}

const visiting = new Set();
const visited = new Set();

function visit(id, route = []) {
  if (visiting.has(id)) {
    errors.push(`Blocking graph cycle: ${[...route, id].join(" -> ")}`);
    return;
  }
  if (visited.has(id)) return;
  visiting.add(id);
  for (const blocker of byId.get(id)?.blockedBy ?? []) visit(blocker, [...route, id]);
  visiting.delete(id);
  visited.add(id);
}

for (const id of byId.keys()) visit(id);

if (errors.length > 0) {
  for (const error of [...new Set(errors)]) console.error(`ERROR: ${error}`);
  process.exit(1);
}

console.log(`Validated ${tickets.length} tickets against ${requiredSourceIds.length} manifest delivery IDs; graph acyclic.`);
