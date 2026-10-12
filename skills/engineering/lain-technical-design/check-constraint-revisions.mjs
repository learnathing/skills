#!/usr/bin/env node
// Cross-manifest identity checks only; no semantic, approval or source-freshness claim.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** Compare only manifests the caller has identified as relevant current authority. */
export function checkConstraintRevisions(inputs) {
  const errors = [];
  const definitions = new Map();
  if (!Array.isArray(inputs) || inputs.length === 0) return ["Supply at least one manifest"];
  for (const input of inputs) {
    const location = input?.name ?? "manifest";
    const manifest = input?.manifest;
    if (!manifest || manifest.schema_version !== 1 || !Array.isArray(manifest.delivery_ids)) {
      errors.push(`${location}: expected schema-v1 Delivery Manifest`);
      continue;
    }
    const constraints = manifest.technical_constraints === undefined ? [] : manifest.technical_constraints;
    if (!Array.isArray(constraints)) {
      errors.push(`${location}: technical_constraints must be an array`);
      continue;
    }
    const seen = new Set();
    for (const entry of constraints) {
      if (!entry || !["id", "revision", "definition", "source"].every((key) => typeof entry[key] === "string" && entry[key].trim())) {
        errors.push(`${location}: each constraint needs id, revision, definition and source`);
        continue;
      }
      const { id, revision, definition, source } = entry;
      if (!id.includes(":") || [id, revision, definition, source].some((value) => value !== value.trim() || /[\r\n]/.test(value))) {
        errors.push(`${location}: use scoped IDs and exact trimmed single-line constraint fields`);
        continue;
      }
      if (seen.has(id)) errors.push(`${location}: duplicate constraint ID ${id}`);
      seen.add(id);
      // JSON tuple avoids delimiter collisions between ID and revision.
      const key = JSON.stringify([id, revision]);
      const previous = definitions.get(key);
      if (previous && previous.definition !== definition) {
        errors.push(`${id}@${revision}: conflicting exact definitions in ${previous.name} (${previous.source}) and ${location} (${source})`);
      } else if (!previous) {
        definitions.set(key, { definition, source, name: location });
      }
    }
  }
  return errors;
}

export function main(args) {
  if (!args.length || args.some((arg) => arg.startsWith("--"))) {
    console.error("Usage: check-constraint-revisions.mjs <current-manifest.json> [other-current-manifest.json ...]");
    return 2;
  }
  const inputs = [];
  try {
    for (const filename of args) inputs.push({ name: filename, manifest: JSON.parse(fs.readFileSync(filename, "utf8")) });
  } catch (error) {
    console.error(`Cannot read manifest: ${error.message}`);
    return 2;
  }
  const errors = checkConstraintRevisions(inputs);
  if (errors.length) {
    errors.forEach((error) => console.error(`ERROR: ${error}`));
    return 1;
  }
  console.log(`Checked exact constraint definitions across ${inputs.length} supplied manifests. Different revisions and scope-specific applicability are allowed.`);
  console.log("Not checked: authority, freshness, semantic sufficiency, source-link availability or approval.");
  return 0;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  process.exitCode = main(process.argv.slice(2));
}
