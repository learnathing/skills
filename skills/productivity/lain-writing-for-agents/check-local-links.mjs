#!/usr/bin/env node
// Deliberately narrow, read-only Markdown link checks. Not a full renderer or network probe.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

function withoutFences(text) {
  let fence;
  return text.split(/\r?\n/).map((line) => {
    const match = /^ {0,3}(`{3,}|~{3,})/.exec(line);
    if (!fence && match) { fence = match[1]; return ""; }
    if (fence) {
      if (new RegExp(`^ {0,3}${fence[0]}{${fence.length},}\\s*$`).test(line)) fence = undefined;
      return "";
    }
    return /^ {4}|^\t/.test(line) ? "" : line;
  }).join("\n");
}

function anchors(text) {
  const result = new Set();
  const counts = new Map();
  let unsupported = false;
  const body = withoutFences(text);
  for (const match of body.replace(/(`+)([^\n]*?)\1/g, "").matchAll(/<a\s+[^>]*?(?:id|name)=["']([^"']+)["'][^>]*>/gi)) result.add(match[1]);
  for (const match of body.matchAll(/^ {0,3}#{1,6}[ \t]+(.+?)\s*#*\s*$/gm)) {
    const title = match[1].replace(/[`*_]/g, "").trim();
    // Only portable simple ASCII heading slugs are checked automatically.
    if (!/^[A-Za-z0-9 _-]+$/.test(title)) { unsupported = true; continue; }
    const base = title.toLowerCase().replace(/ /g, "-");
    const count = counts.get(base) ?? 0;
    result.add(count ? `${base}-${count}` : base);
    counts.set(base, count + 1);
  }
  return { result, unsupported };
}
const inside = (root, target) => {
  const relative = path.relative(root, target);
  return relative !== ".." && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative);
};

/** Supports simple inline links/images and standalone reference definitions. */
export function checkLocalLinks(rootPath, files) {
  const report = { checked: 0, errors: [], unverified: [], external: 0 };
  let root;
  try { root = fs.realpathSync(rootPath); }
  catch (error) { report.errors.push(`Root: ${error.message}`); return report; }
  for (const file of files) {
    const filename = path.resolve(root, file);
    let content;
    try {
      if (!inside(root, fs.realpathSync(filename))) throw new Error("source is outside root");
      content = withoutFences(fs.readFileSync(filename, "utf8"));
    } catch (error) { report.errors.push(`${file}: ${error.message}`); continue; }
    const prose = content.replace(/(`+)([^\n]*?)\1/g, "");
    const inline = [...prose.matchAll(/!?\[[^\]\n]*\]\(([^)\n]*)\)/g)].map((m) => m[1]);
    const definitions = [...prose.matchAll(/^ {0,3}\[[^\]\n]+\]:[ \t]*(.+)$/gm)].map((m) => m[1]);
    const refs = new Set([...prose.matchAll(/^ {0,3}\[([^\]\n]+)\]:/gm)].map((m) => m[1].trim().toLowerCase()));
    for (const match of prose.matchAll(/!?\[([^\]\n]+)\]\[([^\]\n]*)\]/g)) {
      const ref = (match[2] || match[1]).trim().toLowerCase();
      if (!refs.has(ref)) report.errors.push(`${file}: undefined link reference ${ref}`);
    }
    for (let target of [...inline, ...definitions]) {
      target = target.trim();
      if (target.startsWith("<") && target.endsWith(">")) target = target.slice(1, -1);
      if (!target || /[\s()\\]/.test(target) || target.includes("?")) {
        report.unverified.push(`${file}: unsupported destination syntax ${target}`); continue;
      }
      if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(target)) { report.external++; continue; }
      const separator = target.indexOf("#");
      let local, fragment;
      try {
        local = decodeURIComponent(separator < 0 ? target : target.slice(0, separator));
        fragment = separator < 0 ? "" : decodeURIComponent(target.slice(separator + 1));
      } catch { report.errors.push(`${file}: invalid URL escaping in ${target}`); continue; }
      const resolved = local.startsWith("/") ? path.resolve(root, `.${local}`) : path.resolve(path.dirname(filename), local || path.basename(filename));
      try {
        if (!inside(root, fs.realpathSync(resolved))) throw new Error("target is outside root");
        if (fragment) {
          if (!/\.md$/i.test(resolved)) {
            report.unverified.push(`${file}: non-Markdown fragment ${target}`); continue;
          }
          const found = anchors(fs.readFileSync(resolved, "utf8"));
          if (!found.result.has(fragment)) {
            if (found.unsupported) { report.unverified.push(`${file}: check renderer-specific anchor ${target}`); continue; }
            throw new Error(`missing anchor ${fragment}`);
          }
        }
        report.checked++;
      } catch (error) { report.errors.push(`${file}: ${target}: ${error.message}`); }
    }
  }
  return report;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [root, ...files] = process.argv.slice(2);
  if (!root || !files.length) {
    console.error("Usage: check-local-links.mjs <repository-root> <file.md> [file.md ...]");
    process.exitCode = 2;
  } else {
    const result = checkLocalLinks(root, files);
    result.errors.forEach((message) => console.error(`ERROR: ${message}`));
    result.unverified.forEach((message) => console.error(`UNVERIFIED: ${message}`));
    console.log(`Checked ${result.checked} supported local destinations; ${result.errors.length} errors; ${result.unverified.length} unverified; ${result.external} external destinations not fetched.`);
    console.log("Not a complete Markdown parser, renderer, semantic check, or verification of external links.");
    process.exitCode = result.errors.length ? 1 : result.unverified.length ? 2 : 0;
  }
}
