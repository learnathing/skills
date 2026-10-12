// Executable structure checks, not a human comprehension or agent-outcome evaluation.
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { checkConstraintRevisions } from "../skills/engineering/lain-technical-design/check-constraint-revisions.mjs";
import { checkLocalLinks } from "../skills/productivity/lain-writing-for-agents/check-local-links.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const validator = path.join(root, "skills/engineering/lain-to-tickets/validate-tickets.mjs");
const current = "## Current state\n\nExecution: 已實作，尚未整合。\nVerification: Tests passed; NOT INDEPENDENTLY VERIFIED.\nAs of: commit example-revision, evidence in test fixture.\nRemaining: 獨立審查及整合驗證。\n\n";
function temp(t) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "artifact-life-"));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  return directory;
}
function run(t, args = [], edit = () => {}) {
  const directory = temp(t);
  const source = "evals/fixtures/readable-artifacts";
  const manifest = JSON.parse(read(`${source}/source-manifest.json`));
  const tickets = Object.fromEntries(["01.md", "02.md"].map((file) => [file, read(`${source}/tickets/${file}`)]));
  edit(tickets, manifest);
  const drafts = path.join(directory, "tickets"); fs.mkdirSync(drafts);
  for (const [file, body] of Object.entries(tickets)) fs.writeFileSync(path.join(drafts, file), body);
  const manifestFile = path.join(directory, "manifest.json"); fs.writeFileSync(manifestFile, JSON.stringify(manifest));
  const result = spawnSync(process.execPath, [validator, manifestFile, drafts, ...args], { encoding: "utf8", timeout: 10000 });
  assert.ifError(result.error); assert.equal(result.signal, null);
  return result;
}
function track(tickets) {
  for (const key of Object.keys(tickets)) tickets[key] = tickets[key]
    .replace("## Acceptance criteria", `${current}## Acceptance criteria`)
    .replace("Status: ready-for-agent", "Status: implemented-awaiting-review")
    .replaceAll("- [ ]", "- [x]");
}
test("default and explicit publication accept the unchanged ready fixture", (t) => {
  for (const args of [[], ["--phase=publication"]]) assert.equal(run(t, args).status, 0);
});
test("publication still rejects live statuses and all-checked acceptance", (t) => {
  const result = run(t, [], track);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Status must be ready-for-agent/);
  assert.match(result.stderr, /unchecked observable criterion/);
});
test("tracking accepts local live states and completed checkboxes without declaring completion", (t) => {
  const result = run(t, ["--phase=tracking"], track);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /not publication readiness, verified completion/);
});
test("tracking does not require resetting unchecked criteria", (t) => {
  const result = run(t, ["--phase=tracking"], (tickets) => {
    track(tickets); tickets["01.md"] = tickets["01.md"].replaceAll("- [x]", "- [ ]");
  });
  assert.equal(result.status, 0, result.stderr);
});
for (const name of ["Execution", "Verification", "As of", "Remaining"]) {
  test(`tracking rejects a missing ${name} even when history contains a copy`, (t) => {
    const result = run(t, ["--phase=tracking"], (tickets) => {
      track(tickets);
      tickets["01.md"] = tickets["01.md"].replace(new RegExp(`^${name}:.*\\n`, "m"), "") + `\n## Comments\n\n${current}`;
    });
    assert.equal(result.status, 1); assert.match(result.stderr, new RegExp(name));
  });
}
test("tracking rejects an empty current field rather than consuming the next line", (t) => {
  const result = run(t, ["--phase=tracking"], (tickets) => { track(tickets); tickets["01.md"] = tickets["01.md"].replace(/^Execution:.*$/m, "Execution:"); });
  assert.equal(result.status, 1); assert.match(result.stderr, /non-empty Execution/);
});
test("tracking rejects duplicate current-state sections", (t) => {
  const result = run(t, ["--phase=tracking"], (tickets) => { track(tickets); tickets["01.md"] = current + tickets["01.md"]; });
  assert.equal(result.status, 1); assert.match(result.stderr, /one Current state section/);
});
test("tracking cannot recover a missing exact definition from history", (t) => {
  const result = run(t, ["--phase=tracking"], (tickets) => {
    track(tickets); const line = tickets["02.md"].match(/^- S3:.*$/m)[0];
    tickets["02.md"] = tickets["02.md"].replace(line, "") + `\n## Comments\n\n## Spec trace\n${line}\n`;
  });
  assert.equal(result.status, 1); assert.match(result.stderr, /Spec trace/);
});
for (const [name, edit, error] of [
  ["ownership", (tickets) => { tickets["02.md"] = tickets["02.md"].replace("Owns: S3", "Owns: S1, S3"); }, /multiple owners/],
  ["cycles", (tickets) => { tickets["01.md"] = tickets["01.md"].replace("Blocked by: None", "Blocked by: 02"); }, /Blocking graph cycle/],
  ["constraint revisions", (tickets) => { tickets["02.md"] = tickets["02.md"].replaceAll("suggestions:C1@1", "suggestions:C1@0"); }, /stale/],
  ["verification owners", (tickets) => { tickets["02.md"] = tickets["02.md"].replace(/^Verifies:.*\n/m, ""); }, /missing Verifies/],
]) test(`tracking preserves ${name} checks`, (t) => {
  const result = run(t, ["--phase=tracking"], (tickets) => { track(tickets); edit(tickets); });
  assert.equal(result.status, 1); assert.match(result.stderr, error);
});
test("unknown or repeated phases fail as usage errors", (t) => {
  for (const args of [["--phase=done"], ["--phase=tracking", "--phase=publication"], ["--force"]]) assert.equal(run(t, args).status, 2);
});

const manifest = (definition = "The reader restores the last position.", revision = "1") => ({
  schema_version: 1, delivery_ids: [{ id: "S1", definition: "Example", source_ids: ["D1"] }],
  technical_constraints: [{ id: "reader:C1", revision, definition, source: "spec.md#position", applies_to: ["S1"], verified_by: "S1" }],
});
test("same exact shared definition permits scope-specific applicability and source-link aliases", () => {
  const a = manifest(), b = manifest(); b.technical_constraints[0].applies_to = ["S2"]; b.technical_constraints[0].source = "other.md#position";
  assert.deepEqual(checkConstraintRevisions([{ name: "A", manifest: a }, { name: "B", manifest: b }]), []);
});
test("same ID and revision with a different definition is rejected", () => {
  const errors = checkConstraintRevisions([{ name: "A", manifest: manifest() }, { name: "B", manifest: manifest("The reader restores the first position.") }]);
  assert.match(errors.join("\n"), /reader:C1@1.*conflicting exact definitions/);
});
test("different revisions remain distinguishable rather than erased by normalization", () => {
  assert.deepEqual(checkConstraintRevisions([{ name: "A", manifest: manifest() }, { name: "B", manifest: manifest("A new agreed meaning.", "2") }]), []);
});
test("legacy manifests need no invented shared registry", () => {
  const a = manifest(); delete a.technical_constraints;
  assert.deepEqual(checkConstraintRevisions([{ name: "legacy", manifest: a }]), []);
});
test("malformed registries fail instead of disappearing", () => {
  for (const registry of [null, {}, [null], [{ id: "plain" }]]) {
    const a = manifest(); a.technical_constraints = registry;
    assert.ok(checkConstraintRevisions([{ name: "A", manifest: a }]).length);
  }
});
test("duplicate same-scope constraint IDs are rejected", () => {
  const a = manifest(); a.technical_constraints.push({ ...a.technical_constraints[0], revision: "2" });
  assert.match(checkConstraintRevisions([{ name: "A", manifest: a }]).join("\n"), /duplicate constraint ID/);
});

function linkFixture(t, body, target = "# Current State\n\n<a id=\"reader-c1\"></a>\n") {
  const directory = temp(t); fs.mkdirSync(path.join(directory, "docs"));
  fs.writeFileSync(path.join(directory, "index.md"), body);
  fs.writeFileSync(path.join(directory, "docs", "target.md"), target);
  return checkLocalLinks(directory, ["index.md"]);
}
test("descriptive links reach local files, headings and explicit anchors", (t) => {
  const r = linkFixture(t, "[Current state](docs/target.md#current-state)\n[Constraint](docs/target.md#reader-c1)\n");
  assert.equal(r.checked, 2); assert.deepEqual(r.errors, []); assert.deepEqual(r.unverified, []);
});
test("an ID in a table cell does not create an anchor", (t) => {
  const r = linkFixture(t, "[C1](docs/target.md#reader:C1)", "# Constraints\n\n| ID | Definition |\n| reader:C1 | Definition |\n");
  assert.match(r.errors.join("\n"), /missing anchor/);
});
test("missing local targets fail", (t) => {
  assert.equal(linkFixture(t, "[Missing](missing.md)").errors.length, 1);
});
test("fenced and inline examples are not actual links or anchors", (t) => {
  const r = linkFixture(t, "```md\n[Missing](missing.md)\n```\n`[Missing](missing.md)`\n[Missing anchor](docs/target.md#fake)", "# Example\n\n`<a id=\"fake\"></a>`\n");
  assert.equal(r.checked, 0); assert.equal(r.errors.length, 1); assert.match(r.errors[0], /missing anchor/);
});
test("external links are counted but never fetched", (t) => {
  const r = linkFixture(t, "[Docs](https://example.invalid/secret)\n");
  assert.equal(r.external, 1); assert.equal(r.checked, 0); assert.deepEqual(r.errors, []);
});
test("reference-style links need a definition", (t) => {
  const r = linkFixture(t, "[Known][source]\n[source]: docs/target.md#current-state\n[Unknown][missing]\n");
  assert.equal(r.checked, 1); assert.match(r.errors.join("\n"), /undefined link reference missing/);
});
test("renderer-specific heading slugs remain unverified", (t) => {
  const r = linkFixture(t, "[狀態](docs/target.md#目前狀態)", "# 目前狀態\n");
  assert.equal(r.checked, 0); assert.equal(r.unverified.length, 1);
});
test("unsupported nested destinations are not claimed valid", (t) => {
  const r = linkFixture(t, "[File](docs/target(v2).md)");
  assert.equal(r.checked, 0); assert.ok(r.unverified.length);
});
test("a symlink cannot lead the checker outside the declared root", (t) => {
  const directory = temp(t), outside = temp(t);
  fs.writeFileSync(path.join(outside, "private.md"), "# Private\n");
  fs.symlinkSync(path.join(outside, "private.md"), path.join(directory, "external.md"));
  fs.writeFileSync(path.join(directory, "index.md"), "[Outside](external.md)\n");
  const result = checkLocalLinks(directory, ["index.md"]);
  assert.match(result.errors.join("\n"), /outside root/);
});

test("living and visual references are reachable from artifact mode", () => {
  const shared = read("skills/productivity/lain-writing-for-agents/HUMAN-ARTIFACTS.md");
  for (const file of ["LIVING-ARTIFACTS.md", "VISUALS.md"]) {
    assert.ok(shared.includes(`](${file})`));
    assert.ok(read(`skills/productivity/lain-writing-for-agents/${file}`).trim());
  }
  assert.match(read("skills/engineering/lain-technical-design/DELIVERY-CONSTRAINTS.md"), /check-constraint-revisions\.mjs/);
  assert.match(read("skills/engineering/lain-to-tickets/ticket-template.md"), /--phase=tracking/);
  assert.match(read("skills/engineering/lain-setup-matt-pocock-skills/issue-tracker-local.md"), /Publication readiness is not execution/);
});
test("the visible example index reaches hidden artifacts and their actual anchors", () => {
  const examples = path.join(root, "evals/fixtures/artifact-evolution");
  const result = checkLocalLinks(examples, ["README.md", ".scratch/navigation.md", ".scratch/ticket.md", ".scratch/decision.md"]);
  assert.deepEqual(result.errors, []);
  assert.deepEqual(result.unverified, []);
  assert.ok(result.checked >= 5);
});
test("the diagram example keeps its source, text equivalent and missing-target branch", () => {
  const text = read("evals/fixtures/artifact-evolution/.scratch/navigation.md");
  assert.match(text, /reader:N1@1/);
  assert.match(text, /accTitle:/); assert.match(text, /accDescr:/);
  assert.match(text, /D -->\|不存在\| F\[保留畫面與歷史/);
  assert.match(text, /目標不存在 \| 畫面不變，歷史不移除/);
  assert.match(text, /仍須在目標閱讀器檢查/);
  // These assertions prevent deletion of declared coverage, not rendering or semantic equivalence.
});

test("a fenced Comments heading does not truncate active tracking fields", (t) => {
  const result = run(t, ["--phase=tracking"], (tickets) => {
    track(tickets); tickets["01.md"] = "```md\n## Comments\n```\n" + tickets["01.md"];
  });
  assert.equal(result.status, 0, result.stderr);
});
test("a Current state example inside a fence is not a live snapshot", (t) => {
  const result = run(t, ["--phase=tracking"], (tickets) => {
    for (const key of Object.keys(tickets)) tickets[key] = `\`\`\`md\n${current}\n\`\`\`\n${tickets[key]}`;
  });
  assert.equal(result.status, 1); assert.match(result.stderr, /Current state/);
});
test("duplicate live statuses fail instead of picking whichever appears first", (t) => {
  const result = run(t, ["--phase=tracking"], (tickets) => { track(tickets); tickets["01.md"] = "Status: done\n" + tickets["01.md"]; });
  assert.equal(result.status, 1); assert.match(result.stderr, /one non-empty live Status/);
});

test("cross-manifest CLI reports a real file conflict and rejects unreadable input", (t) => {
  const directory = temp(t), a = path.join(directory, "a.json"), b = path.join(directory, "b.json");
  fs.writeFileSync(a, JSON.stringify(manifest()));
  fs.writeFileSync(b, JSON.stringify(manifest("Different definition.")));
  const command = path.join(root, "skills/engineering/lain-technical-design/check-constraint-revisions.mjs");
  const conflict = spawnSync(process.execPath, [command, a, b], { encoding: "utf8", timeout: 10000 });
  assert.ifError(conflict.error); assert.equal(conflict.status, 1); assert.match(conflict.stderr, /conflicting exact definitions/);
  const missing = spawnSync(process.execPath, [command, path.join(directory, "missing.json")], { encoding: "utf8", timeout: 10000 });
  assert.ifError(missing.error); assert.equal(missing.status, 2);
});
test("local-link CLI leaves renderer-dependent anchors explicitly unverified", (t) => {
  const directory = temp(t);
  fs.writeFileSync(path.join(directory, "index.md"), "# 中文標題\n\n[跳轉](#中文標題)\n");
  const result = spawnSync(process.execPath, [path.join(root, "skills/productivity/lain-writing-for-agents/check-local-links.mjs"), directory, "index.md"], { encoding: "utf8", timeout: 10000 });
  assert.ifError(result.error); assert.equal(result.status, 2); assert.match(result.stderr, /UNVERIFIED/);
});
test("resynced docs keep their section order, absolute links and writer pointer", () => {
  for (const file of ["docs/productivity/lain-writing-for-agents.md", ...["lain-to-spec", "lain-to-tickets", "lain-technical-design", "lain-setup-matt-pocock-skills"].map((name) => `docs/engineering/${name}.md`)]) {
    const doc = read(file); let previous = -1;
    for (const heading of ["What it does", "When to reach for it", "Common questions", "It's working if", "Where it fits"]) {
      const at = doc.indexOf(`## ${heading}\n`); assert.ok(at > previous, `${file}: ${heading}`); previous = at;
    }
    assert.doesNotMatch(doc, /^# /m); assert.doesNotMatch(doc, /\]\((?!https:\/\/)[^)]+\)/);
    assert.ok(doc.includes("shared artifact writing reference")); assert.ok(!doc.includes("\u2014"));
  }
});
