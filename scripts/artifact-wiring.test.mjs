// Structural wiring checks only. Human comprehension needs the separate evaluation.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = fileURLToPath(new URL("../", import.meta.url));
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const producers = [
  ["engineering", "lain-to-spec"], ["engineering", "lain-to-tickets"], ["engineering", "lain-grill-with-docs"],
  ["engineering", "lain-technical-design"], ["engineering", "lain-wayfinder"], ["engineering", "lain-prototype"],
  ["engineering", "lain-research"], ["engineering", "lain-domain-modeling"], ["engineering", "lain-code-review"],
  ["engineering", "lain-implement"], ["engineering", "lain-tdd"], ["engineering", "lain-diagnosing-bugs"],
  ["engineering", "lain-triage"], ["productivity", "lain-to-questionnaire"], ["productivity", "lain-teach"],
  ["engineering", "lain-setup-matt-pocock-skills"], ["engineering", "lain-improve-codebase-architecture"],
  ["engineering", "lain-pr"], ["productivity", "lain-handoff"], ["engineering", "lain-retro"],
];

test("artifact mode runs only on explicit request and keeps its reference", () => {
  const skill = read("skills/productivity/lain-writing-for-agents/SKILL.md");
  assert.doesNotMatch(skill, /^disable-model-invocation: true$/m);
  assert.match(skill, /explicitly asks/);
  assert.match(skill, /do not enter this mode on their own/);
  const profile = read("skills/productivity/lain-writing-for-agents/HUMAN-ARTIFACTS.md");
  assert.ok(profile.includes("working language"));
  assert.ok(profile.includes("NOT INDEPENDENTLY VERIFIED"));
});

for (const [bucket, name] of producers) {
  test(`${name}: no automatic artifact-mode load`, () => {
    const dir = path.join(root, "skills", bucket, name);
    for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".md"))) {
      const text = read(`skills/${bucket}/${name}/${file}`);
      assert.doesNotMatch(text, /artifact[ -]mode/i, `${name}/${file}`);
      assert.ok(!text.includes("\u2014"), `${name}/${file}`);
    }
    assert.ok(!read(`docs/${bucket}/${name}.md`).includes("shared artifact writing reference"));
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
});
