#!/usr/bin/env node
// Read-only conventional path resolution; map contents and authority are inspected by the caller.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { parseArgs } from "node:util";

function exists(file) {
  try { fs.lstatSync(file); return true; }
  catch (error) { if (error.code === "ENOENT") return false; throw error; }
}

function readableFile(root, value) {
  if (typeof value !== "string" || !value.trim()) throw new Error("A configured domain path must be a non-empty string");
  const file = path.resolve(root, value);
  if (!fs.statSync(file).isFile()) throw new Error(`Domain source is not a file: ${value}`);
  fs.accessSync(file, fs.constants.R_OK);
  return file;
}

/** Resolve only the root entry points. Explicit configuration always outranks discovery. */
export function resolveDomainDocs(root, configuration = {}) {
  root = path.resolve(root);
  if (!fs.statSync(root).isDirectory()) throw new Error("Repository root must be a directory");
  for (const key of Object.keys(configuration)) {
    if (!["glossary", "map"].includes(key)) throw new Error(`Unknown domain configuration key: ${key}`);
  }
  const keys = ["glossary", "map"].filter((key) => Object.hasOwn(configuration, key));
  if (keys.length) {
    const selected = Object.fromEntries(keys.map((key) => [key, readableFile(root, configuration[key])]));
    return { status: "resolved", authority: "configured", ...selected };
  }
  const families = [
    { authority: "existing-glossary", glossary: "GLOSSARY.md", map: "GLOSSARY-MAP.md" },
    { authority: "existing-context", glossary: "CONTEXT.md", map: "CONTEXT-MAP.md" },
  ].map((family) => ({
    authority: family.authority,
    entries: Object.fromEntries(["glossary", "map"]
      .filter((key) => exists(path.join(root, family[key])))
      .map((key) => [key, family[key]])),
  })).filter((family) => Object.keys(family.entries).length);
  if (families.length > 1) {
    throw new Error("Ambiguous domain documents: both naming families exist; select authoritative glossary/map paths in project configuration");
  }
  if (!families.length) return { status: "missing", suggested_glossary: path.join(root, "GLOSSARY.md") };
  const { authority, entries } = families[0];
  return { status: "resolved", authority, ...Object.fromEntries(Object.entries(entries)
    .map(([key, value]) => [key, readableFile(root, value)])) };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try {
    const { values, positionals } = parseArgs({ options: {
      glossary: { type: "string" }, map: { type: "string" }, help: { type: "boolean" },
    }, allowPositionals: true, strict: true });
    if (values.help) {
      console.log("Usage: node resolve-domain-docs.mjs [repository-root] [--glossary PATH] [--map PATH]");
    } else {
      if (positionals.length > 1) throw new Error("Expected at most one repository root");
      const configuration = {};
      for (const key of ["glossary", "map"]) if (Object.hasOwn(values, key)) configuration[key] = values[key];
      console.log(JSON.stringify(resolveDomainDocs(positionals[0] ?? process.cwd(), configuration), null, 2));
    }
  } catch (error) { console.error(`Domain resolution failed: ${error.message}`); process.exitCode = 1; }
}
