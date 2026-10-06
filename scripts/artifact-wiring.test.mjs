// Structural wiring checks only. Human comprehension needs the separate evaluation.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = fileURLToPath(new URL("../", import.meta.url));
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const registry = JSON.parse(read("scripts/artifact-producers.json"));

test("the shared profile is owned by the existing model-invoked writer", () => {
  const skill = read("skills/productivity/lain-writing-for-agents/SKILL.md");
  assert.doesNotMatch(skill, /^disable-model-invocation: true$/m);
  assert.ok(skill.includes("HUMAN-ARTIFACTS.md"));
  const profile = read(registry.profile);
  assert.ok(profile.includes("not ASD-STE100 conformance"));
  assert.ok(profile.includes("working language"));
  assert.ok(profile.includes("INCOMPLETE"));
  assert.ok(profile.includes("NOT INDEPENDENTLY VERIFIED"));
});

test("producer declarations are unique and have meaningful artifact names", () => {
  assert.equal(registry.schema_version, 1);
  assert.equal(new Set(registry.producers.map((p) => p.entry)).size, registry.producers.length);
  for (const producer of registry.producers) assert.ok(producer.artifacts.trim());
});

for (const p of registry.producers) {
  test(`${p.skill}: writing call and human docs are connected`, () => {
    const skill = read(p.entry);
    assert.match(skill, /call the Skill tool with "lain-writing-for-agents" in artifact mode/i);
    const doc = read(`docs/${p.bucket}/${p.skill}.md`);
    assert.ok(doc.includes("shared artifact writing reference"));
    assert.ok(doc.includes("## Where it fits"));
    assert.ok(!skill.includes("\u2014") && !doc.includes("\u2014"));
  });
}

test("quiz options no longer require unnatural equal-length wording", () => {
  const teach = read("skills/productivity/lain-teach/SKILL.md");
  assert.doesNotMatch(teach, /each answer should be exactly the same number of words/);
  assert.ok(teach.includes("without forcing identical word or character counts"));
});

test("independent review keeps its no-skills reviewer brief", () => {
  const review = read("skills/engineering/lain-code-review/SKILL.md");
  assert.ok(review.includes("Do not invoke lain-code-review, call skills, or spawn additional agents"));
  assert.ok(review.includes("not to the independent reviewer"));
});
