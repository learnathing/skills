// Compatibility checks exercise the real validator. They do not measure comprehension.
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = fileURLToPath(new URL("../", import.meta.url));
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const fixtures = "evals/fixtures/readable-artifacts";
const validator = path.join(root, "skills/engineering/lain-to-tickets/validate-tickets.mjs");

function run(t, edit = () => {}) {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), "readable-artifacts-"));
  t.after(() => fs.rmSync(temp, { recursive: true, force: true }));
  const manifest = JSON.parse(read(`${fixtures}/source-manifest.json`));
  const tickets = { "01.md": read(`${fixtures}/tickets/01.md`), "02.md": read(`${fixtures}/tickets/02.md`) };
  edit({ manifest, tickets });
  const dir = path.join(temp, "票据 drafts");
  fs.mkdirSync(dir);
  fs.writeFileSync(path.join(temp, "manifest.json"), JSON.stringify(manifest));
  for (const [name, text] of Object.entries(tickets)) fs.writeFileSync(path.join(dir, name), text);
  const result = spawnSync(process.execPath, [validator, path.join(temp, "manifest.json"), dir], { encoding: "utf8", timeout: 10000 });
  assert.ifError(result.error);
  assert.equal(result.signal, null);
  return result;
}
function fails(t, edit, pattern) {
  const result = run(t, edit);
  assert.equal(result.status, 1, result.stdout + result.stderr);
  assert.match(result.stderr, pattern);
}

test("spec reading order changes without dropping its sections or publication requirements", () => {
  const spec = read("skills/engineering/lain-to-spec/SKILL.md");
  const template = spec.split("<spec-template>")[1].split("</spec-template>")[0];
  let last = -1;
  for (const heading of ["Problem Statement", "Outcome", "Scenarios", "Out of Scope", "Invariants", "Interface and Failure Contract", "Implementation Decisions", "Verification", "Known Unknowns", "Source Index", "Delivery Manifest"]) {
    const at = template.indexOf(`## ${heading}\n`);
    assert.ok(at > last, `missing or misplaced ${heading}`);
    last = at;
  }
  const gate = spec.match(/Publish only when:\n\n([\s\S]*?)\n\n/)[1];
  assert.equal(createHash("sha256").update(gate).digest("hex"), "100919a0d1c6dfe7024a8f39b1e567414531b7c1fcc40ce781202289bff8a10d");
  assert.match(template, /multiple sentences/);
});

test("ticket template exposes acceptance before metadata and retains literal parser keys", () => {
  const raw = read("skills/engineering/lain-to-tickets/ticket-template.md");
  const text = raw.includes("<ticket-template>") ? raw.split("<ticket-template>")[1].split("</ticket-template>")[0] : raw;
  assert.ok(text.indexOf("What to build:") < text.indexOf("Ticket:"));
  assert.ok(text.indexOf("## Acceptance criteria") < text.indexOf("## Delivery metadata"));
  assert.ok(text.indexOf("## Contract") < text.indexOf("## Spec trace"));
  for (const key of ["Ticket:", "Blocked by:", "Status: ready-for-agent", "Owns:"]) assert.ok(text.includes(key));
  for (const field of ["Invariants", "Seam", "Success", "Failures and degradation"]) assert.ok(text.includes(`**${field}:**`));
});

test("example spec and source manifest carry the same definitions in visible prose", () => {
  const spec = read(`${fixtures}/spec.md`);
  const manifest = JSON.parse(read(`${fixtures}/source-manifest.json`));
  assert.deepEqual(JSON.parse(spec.match(/```json\n([\s\S]*?)\n```/)[1]), manifest);
  const prose = spec.split("## Source Index")[0];
  for (const item of manifest.delivery_ids) assert.ok(prose.includes(item.definition));
});

test("Chinese prose, multi-sentence definitions and bottom metadata pass schema-v1 validation", (t) => {
  const result = run(t);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Validated 2 tickets against 3 manifest delivery IDs/);
});

test("legacy schema-v1 tickets need no optional technical registry or fields", (t) => {
  const result = run(t, ({ manifest, tickets }) => {
    delete manifest.technical_constraints;
    for (const key of Object.keys(tickets)) {
      tickets[key] = tickets[key].replace(/^Applies:.*\n/gm, "").replace(/^Verifies:.*\n/gm, "");
    }
  });
  assert.equal(result.status, 0, result.stderr);
});

test("the old metadata-first order remains accepted", (t) => {
  const result = run(t, ({ tickets }) => {
    for (const key of Object.keys(tickets)) {
      const body = tickets[key];
      const from = body.indexOf("## Delivery metadata\n");
      const to = body.indexOf("## Spec trace\n");
      tickets[key] = body.slice(from, to) + body.slice(0, from) + body.slice(to);
    }
  });
  assert.equal(result.status, 0, result.stderr);
});

test("changing a literal parser key is rejected", (t) => {
  fails(t, ({ tickets }) => { tickets["01.md"] = tickets["01.md"].replace("Ticket: 01", "票据: 01"); }, /missing Ticket field/);
});
test("paraphrasing an exact definition is rejected", (t) => {
  fails(t, ({ tickets }) => { tickets["02.md"] = tickets["02.md"].replace(/^- S3:.*$/m, "- S3: 返回一个合适的响应。"); }, /Spec trace does not carry/);
});
test("a stale shared constraint revision is rejected", (t) => {
  fails(t, ({ tickets }) => { tickets["02.md"] = tickets["02.md"].replace("Applies: suggestions:C1@1", "Applies: suggestions:C1@0"); }, /stale Applies reference/);
});
test("dropping verification ownership is rejected", (t) => {
  fails(t, ({ tickets }) => { tickets["02.md"] = tickets["02.md"].replace(/^Verifies:.*\n/m, ""); }, /missing Verifies reference/);
});
test("dropping the shared constraint definition is rejected", (t) => {
  fails(t, ({ tickets }) => { tickets["02.md"] = tickets["02.md"].replace(/^- suggestions:C1@1:.*$/m, ""); }, /Technical trace must carry/);
});
test("dropping a shared constraint source is rejected", (t) => {
  fails(t, ({ tickets }) => { tickets["02.md"] = tickets["02.md"].replace("spec.md#source-index", "spec.md#other"); }, /Context pointers must include/);
});
test("duplicate delivery ownership is rejected", (t) => {
  fails(t, ({ tickets }) => { tickets["02.md"] = tickets["02.md"].replace("Owns: S3", "Owns: S1, S3"); }, /multiple owners/);
});
test("unknown blockers are rejected", (t) => {
  fails(t, ({ tickets }) => { tickets["02.md"] = tickets["02.md"].replace("Blocked by: 01", "Blocked by: missing"); }, /unknown blocker/);
});
test("dependency cycles are rejected", (t) => {
  fails(t, ({ tickets }) => { tickets["01.md"] = tickets["01.md"].replace("Blocked by: None", "Blocked by: 02"); }, /Blocking graph cycle/);
});
test("missing observable acceptance checkboxes are rejected", (t) => {
  fails(t, ({ tickets }) => { tickets["01.md"] = tickets["01.md"].replace(/^- \[ \].*$/gm, ""); }, /Acceptance criteria/);
});
test("structural validation alone cannot detect a misleading readable overview", (t) => {
  const result = run(t, ({ tickets }) => {
    tickets["02.md"] = tickets["02.md"].replace(/^What to build:.*$/m, "What to build: 此错误示例声称所有失败都返回 200。");
  });
  // Deliberately documents the checker's boundary, not an acceptable artifact.
  assert.equal(result.status, 0, result.stderr);
});
