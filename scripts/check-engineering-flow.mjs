#!/usr/bin/env node

// Packaging and handoff checks, not an evaluation of agent outcomes.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateTechnicalConstraints } from "../skills/engineering/lain-to-tickets/technical-constraints.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const skillRoot = "skills/engineering/lain-technical-design";
const changedSkills = ["lain-ask-matt", "lain-grill-with-docs", "lain-to-spec", "lain-to-tickets", "lain-implement", "lain-prototype", "lain-wayfinder", "lain-code-review", "lain-setup-matt-pocock-skills", "lain-technical-design"];
const headings = ["What it does", "When to reach for it", "Common questions", "It's working if", "Where it fits"];

try {
  const plugin = JSON.parse(read(".claude-plugin/plugin.json"));
  assert.equal(plugin.skills.filter((entry) => entry === `./${skillRoot}`).length, 1, "Register technical design exactly once");
  const skill = read(`${skillRoot}/SKILL.md`);
  assert.match(skill, /^name: lain-technical-design$/m);
  assert.doesNotMatch(skill, /^disable-model-invocation:/m, "Technical design remains model-invoked");
  assert.doesNotMatch(read(`${skillRoot}/agents/openai.yaml`), /allow_implicit_invocation:\s*false/);
  for (const relative of ["README.md", "skills/engineering/README.md"]) {
    assert.match(read(relative), /\[lain-technical-design\]\([^)]*lain-technical-design\/SKILL\.md\)/);
  }
  const skillPages = [
    ...changedSkills.map((name) => ({ bucket: "engineering", name })),
    { bucket: "productivity", name: "lain-grilling" },
  ];
  for (const { bucket, name } of skillPages) {
    const page = read(`docs/${bucket}/${name}.md`);
    assert.doesNotMatch(page, /^# /m, `${name}: published docs have no H1`);
    let previous = -1;
    for (const heading of headings) {
      const index = page.indexOf(`## ${heading}\n`);
      assert.ok(index > previous, `${name}: missing or misordered ${heading}`);
      previous = index;
    }
    assert.doesNotMatch(page, /\]\((?!https:\/\/)[^)]+\)/, `${name}: docs require absolute links`);
    assert.ok(!page.includes("\u2014"), `${name}: no em dashes`);
    const body = read(`skills/${bucket}/${name}/SKILL.md`);
    assert.ok(!body.includes("\u2014"), `${name}: no em dashes`);
    assert.doesNotMatch(body, /Call the Skill tool(?: twice, for| with) "lain-(?:ask-matt|grill-with-docs|to-spec|to-tickets|implement|wayfinder|setup-matt-pocock-skills)"/, `${name}: no implicit call to user-invoked skills`);
  }
  for (const relative of [`${skillRoot}/ARTIFACTS.md`, `${skillRoot}/DELIVERY-CONSTRAINTS.md`, "skills/engineering/lain-prototype/TECHNICAL.md", "skills/engineering/lain-setup-matt-pocock-skills/engineering.md"]) {
    assert.ok(read(relative).trim(), `Missing reference ${relative}`);
  }
  const doc = read(`${skillRoot}/DELIVERY-CONSTRAINTS.md`);
  const match = doc.match(/```json\n([\s\S]*?)\n```/);
  assert.ok(match, "Documented manifest example is required");
  const example = JSON.parse(match[1]);
  assert.equal(example.schema_version, 1);
  const tickets = example.delivery_ids.map((item, index) => {
    const constraints = example.technical_constraints.filter((entry) => entry.applies_to.includes(item.id));
    const verifies = constraints.filter((entry) => entry.verified_by === item.id);
    const ref = (entry) => `${entry.id}@${entry.revision}`;
    return {
      id: `T${index + 1}`, owns: [item.id], relative: `T${index + 1}.md`,
      body: `Applies: ${constraints.map(ref).join(", ")}\n${verifies.length ? `Verifies: ${verifies.map(ref).join(", ")}\n` : ""}\n## Technical trace\n${constraints.map((entry) => `- ${ref(entry)}: ${entry.definition}`).join("\n")}\n\n## Context pointers\n${constraints.map((entry) => `- ${entry.source}`).join("\n")}\n`,
    };
  });
  assert.deepEqual(validateTechnicalConstraints(example, tickets), [], "Documented example must satisfy the real validator");
  const metrics = JSON.parse(read("evals/metrics.json")).metrics;
  const fixtureSets = ["risk-adaptive-flow", "requirements-alignment"];
  let scenarioCount = 0;
  for (const fixtureSet of fixtureSets) {
    const cases = JSON.parse(read(`evals/fixtures/${fixtureSet}/cases.json`));
    assert.equal(cases.schema_version, 1, `${fixtureSet}: unsupported schema`);
    assert.equal(cases.status, "development-inputs-not-release-evidence");
    assert.ok(Array.isArray(cases.cases) && cases.cases.length > 0, `${fixtureSet}: missing cases`);
    assert.equal(new Set(cases.cases.map((item) => item.id)).size, cases.cases.length, `${fixtureSet}: unique case IDs`);
    for (const item of cases.cases) {
      for (const key of ["id", "title", "prompt", "seed"]) assert.ok(typeof item[key] === "string" && item[key].trim(), `${item.id}: missing ${key}`);
      assert.ok(Array.isArray(item.checks) && item.checks.length > 0);
      for (const check of item.checks) assert.ok(typeof check === "string" && check.trim(), `${item.id}: empty check`);
      assert.ok(Array.isArray(item.metrics) && item.metrics.length > 0);
      for (const metric of item.metrics) assert.ok(Object.hasOwn(metrics, metric), `${item.id}: unknown metric ${metric}`);
      if (Object.hasOwn(item, "user_turns")) {
        assert.ok(Array.isArray(item.user_turns) && item.user_turns.length > 0, `${item.id}: invalid user turns`);
        for (const turn of item.user_turns) {
          for (const key of ["when", "say"]) assert.ok(typeof turn[key] === "string" && turn[key].trim(), `${item.id}: missing user turn ${key}`);
        }
      }
    }
    scenarioCount += cases.cases.length;
  }
  console.log(`Engineering checks passed: registration, invocation boundary, ${skillPages.length} docs pages, documented manifest, and ${scenarioCount} development scenarios.`);
  console.log("These checks do not establish behavioral outcome lift, independent review, or live link availability.");
} catch (error) {
  console.error(`Engineering checks failed: ${error.message}`);
  process.exitCode = 1;
}
