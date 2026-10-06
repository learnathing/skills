#!/usr/bin/env node
// Local maintainer linking only. Never replace real files/directories or foreign symlinks.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { parseArgs } from "node:util";
import { randomUUID } from "node:crypto";

const buckets = ["engineering", "productivity", "in-progress", "misc", "deprecated"];
function stat(file) {
  try { return fs.lstatSync(file); }
  catch (error) { if (error.code === "ENOENT") return null; throw error; }
}
function within(parent, child) {
  const relative = path.relative(parent, child);
  return relative === "" || (!relative.startsWith(`..${path.sep}`) && relative !== ".." && !path.isAbsolute(relative));
}
function prospectiveRealPath(file) {
  if (stat(file)) return fs.realpathSync(file);
  const parent = path.dirname(file);
  if (parent === file) throw new Error(`Cannot resolve destination: ${file}`);
  return path.join(prospectiveRealPath(parent), path.basename(file));
}
function linkTarget(file) { return path.resolve(path.dirname(file), fs.readlinkSync(file)); }
function ownedLink(repo, target, name) {
  return name.startsWith("lain-") && buckets.some((bucket) => target === path.join(repo, "skills", bucket, name));
}

/** Preflight all destinations before mutation. Options apply only to this checkout's links. */
export function linkSkills({ repo, home = os.homedir(), includeInProgress = false, includeMisc = false, dryRun = false, prune = false, log = console.log }) {
  repo = fs.realpathSync(repo);
  home = path.resolve(home);
  const selected = ["engineering", "productivity", ...(includeInProgress ? ["in-progress"] : []), ...(includeMisc ? ["misc"] : [])];
  const sources = new Map();
  for (const bucket of selected) {
    const directory = path.join(repo, "skills", bucket);
    if (!stat(directory)) continue;
    for (const entry of fs.readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      if (!entry.isDirectory()) continue;
      const skillFile = path.join(directory, entry.name, "SKILL.md");
      if (!stat(skillFile)) continue;
      if (!fs.statSync(skillFile).isFile()) throw new Error(`SKILL.md is not a file: ${skillFile}`);
      if (!/^lain-[a-z0-9-]+$/.test(entry.name)) throw new Error(`Unexpected unnamespaced skill: ${entry.name}`);
      if (sources.has(entry.name)) throw new Error(`Duplicate selected skill: ${entry.name}`);
      sources.set(entry.name, path.join(directory, entry.name));
    }
  }
  const destinations = [...new Set([".claude", ".agents"].map((harness) => {
    const destination = prospectiveRealPath(path.join(home, harness, "skills"));
    if (within(repo, destination)) throw new Error(`Destination resolves into this repository: ${destination}`);
    if (stat(destination) && !fs.statSync(destination).isDirectory()) throw new Error(`Destination is not a directory: ${destination}`);
    return destination;
  }))];
  const plan = [];
  for (const destination of destinations) {
    for (const [name, source] of sources) {
      const target = path.join(destination, name);
      const existing = stat(target);
      if (!existing) { plan.push({ action: "link", target, source }); continue; }
      if (!existing.isSymbolicLink()) throw new Error(`Refusing to replace user file or directory: ${target}`);
      const previous = linkTarget(target);
      if (previous === source) continue;
      if (!ownedLink(repo, previous, name)) throw new Error(`Refusing to replace foreign symlink: ${target}`);
      plan.push({ action: "replace", target, source, previous });
    }
    if (prune && stat(destination)) {
      for (const entry of fs.readdirSync(destination, { withFileTypes: true })) {
        if (!entry.isSymbolicLink() || sources.has(entry.name)) continue;
        const target = path.join(destination, entry.name);
        const previous = linkTarget(target);
        if (ownedLink(repo, previous, entry.name)) plan.push({ action: "prune", target, previous });
      }
    }
  }
  if (dryRun) for (const item of plan) log(`would ${item.action}: ${item.target}${item.source ? ` -> ${item.source}` : ""}`);
  if (dryRun) return plan;
  for (const item of plan) {
    const destination = path.dirname(item.target);
    if (prospectiveRealPath(destination) !== destination || within(repo, destination)) throw new Error(`Destination changed after preflight: ${destination}`);
    fs.mkdirSync(destination, { recursive: true });
    const current = stat(item.target);
    if (item.action === "link") {
      if (current) throw new Error(`Target appeared after preflight: ${item.target}`);
      fs.symlinkSync(item.source, item.target, "dir");
    } else {
      if (!current?.isSymbolicLink() || linkTarget(item.target) !== item.previous) throw new Error(`Target changed after preflight: ${item.target}`);
      if (item.action === "prune") fs.unlinkSync(item.target);
      else {
        const temporary = path.join(destination, `.lain-link-${randomUUID()}`);
        fs.symlinkSync(item.source, temporary, "dir");
        try { fs.renameSync(temporary, item.target); }
        finally { if (stat(temporary)) fs.unlinkSync(temporary); }
      }
    }
    log(`${item.action}: ${item.target}${item.source ? ` -> ${item.source}` : ""}`);
  }
  return plan;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try {
    const { values } = parseArgs({ options: {
      "include-in-progress": { type: "boolean" }, "include-misc": { type: "boolean" },
      "dry-run": { type: "boolean" }, prune: { type: "boolean" }, help: { type: "boolean" },
    }, strict: true });
    if (values.help) console.log("Usage: bash scripts/link-skills.sh [--include-in-progress] [--include-misc] [--dry-run] [--prune]\nDefault: engineering and productivity only. Prune removes only unselected symlinks pointing into this checkout.");
    else linkSkills({ repo: fileURLToPath(new URL("../", import.meta.url)), home: process.env.HOME || os.homedir(),
      includeInProgress: values["include-in-progress"], includeMisc: values["include-misc"], dryRun: values["dry-run"], prune: values.prune });
  } catch (error) { console.error(`Linking failed: ${error.message}`); process.exitCode = 1; }
}
