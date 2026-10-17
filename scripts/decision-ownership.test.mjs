// Source-contract and fixture integrity checks, not agent-behavior evaluations.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = fileURLToPath(new URL("../", import.meta.url));
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const eng = (n) => read(`skills/engineering/lain-${n}/SKILL.md`);
const prod = (n) => read(`skills/productivity/lain-${n}/SKILL.md`);
const digest = (text) => createHash("sha256").update(text).digest("hex");
// Retained sections from c8959a3. These pin unchanged gates, not preferred new prose.
const preserved = {
  "handoff": "e5feca5c7509dc77bf81ab0857c7a94fde8ae5355c873512b9ac7a6ca2676781",
  "assessment": "cd8c328538af7dc95da52c94a612bcf0f09382931a00732e9f7e617d4e05559f",
  "technical": "45894f80dcd6c8c2e59051192fb0d017e570c3db0a11e17d391a1b4939cbb746",
  "depth": "094c2af4d954adfffce080c800155942a0bb585ddd4d4bc2c01446c9b909def8",
  "adr": "1cfa55590b6694ed1781ee020aa9ad1ec132385b0bd6ee9a0a634f6216134618"
};
const changed = [
  ["engineering", "lain-domain-modeling", false],
  ["engineering", "lain-codebase-design", false],
  ["engineering", "lain-technical-design", false],
  ["engineering", "lain-grill-with-docs", true],
  ["engineering", "lain-ask-matt", true],
  ["productivity", "lain-grilling", false],
  ["productivity", "lain-grill-me", true],
];

test("established terms: design concepts no longer ban accurate industry names", () => {
  const text = eng("codebase-design");
  assert.doesNotMatch(text, /Use these terms exactly|_Avoid_:.*(?:API|component|boundary)|Say \*\*seam\*\* or \*\*interface\*\*/);
  assert.match(text, /Use established terms such as component, service, API and boundary/);
  assert.match(text, /do not rename public APIs/i);
});

test("human-question frontier: investigation and delegated choices are not a user questionnaire", () => {
  const text = prod("grilling");
  assert.match(text, /human-question \*\*frontier\*\*/);
  assert.match(text, /available evidence, existing intent and applicable delegation cannot resolve/);
  assert.match(text, /Unknown technical details stay with agent investigation or design/);
  assert.match(text, /A caller-visible choice does not automatically require a question/);
});

test("conditional domain work: the wrapper loads modeling only for a material need", () => {
  const text = eng("grill-with-docs");
  assert.doesNotMatch(text, /Call the Skill tool twice, for "lain-grilling" and "lain-domain-modeling"/);
  assert.match(text, /Only if a material domain ambiguity remains[\s\S]+call the Skill tool with "lain-domain-modeling"/);
  assert.match(text, /An explicit request to build or revise the domain model also qualifies/);
  assert.match(text, /Clear synonyms, passive glossary reading and ordinary internal naming do not trigger it/);
});

test("domain work preserves project meaning and does not turn examples into requirements", () => {
  const text = eng("domain-modeling");
  assert.match(text, /a synonym unambiguous, use the established term without interrupting/);
  assert.match(text, /not automatic authority to override the requirement/);
  assert.match(text, /hypothetical probes as examples, not accepted requirements/);
  assert.match(text, /If nothing material changed, make no edit/);
  assert.match(text, /not a general technical encyclopedia/);
});

test("glossary template does not reintroduce a universal synonym blacklist", () => {
  const text = read("skills/engineering/lain-domain-modeling/CONTEXT-FORMAT.md");
  assert.doesNotMatch(text, /list the others under|Be opinionated|sentences max/);
  assert.match(text, /Use `_Avoid_` only for a term that would cause a material misunderstanding/);
  assert.match(text, /Do not blacklist harmless synonyms/);
});

test("unknown technical answers return to investigation, not repeated jargon", () => {
  const text = prod("grilling");
  assert.match(text, /take back the investigation or propose the smallest authorized experiment/);
  assert.match(text, /Do not repeat the same question in different jargon/);
  assert.match(text, /preference or permission, retain that uncertainty/);
  assert.match(text, /Model confidence and the user's seniority are not decision authority/);
});

test("stopping and learning remain controlled by the user, not branch exhaustion", () => {
  const text = prod("grilling");
  assert.match(text, /End the interview when no material human-owned question remains/);
  assert.match(text, /explicit request for learning or design co-creation/i);
  assert.match(text, /Honor the user's latest instruction to stop, limit, deepen or change/);
  assert.match(text, /An empty question frontier is not evidence/);
});

test("fewer questions do not authorize experiments, implementation or invented acceptance", () => {
  const text = prod("grilling");
  assert.match(text, /A recommendation is not accepted merely because it was presented/);
  assert.match(text, /does not authorize experiments or implementation/);
  assert.match(text, /A real unresolved choice blocks only the work that depends on it/);
});

test("technical design recommends before escalating while retaining evidence limits", () => {
  const text = eng("technical-design");
  assert.match(text, /In design mode, turn the high-level goal/);
  assert.match(text, /recommended approach before asking the user to select technologies/);
  assert.match(text, /missing evidence stays explicit until it runs/);
  assert.match(text, /Never attribute an agent recommendation to the user/);
});

test("the source-backed handoff and its authority gates are unchanged", () => {
  assert.equal(digest(eng("grill-with-docs").split("## Preserve the agreement")[1]), preserved.handoff);
});
test("assessment-only mode and downstream technical readiness gates are unchanged", () => {
  const text = eng("technical-design");
  assert.equal(digest(text.split("## 1. Assess before expanding")[1].split("## 2. Resolve the actual technical question")[0]), preserved.assessment);
  assert.equal(digest(text.split("## 3. Capture only what downstream work needs")[1]), preserved.technical);
});
test("depth and testability rules are unchanged by vocabulary changes", () => {
  assert.equal(digest(eng("codebase-design").split("## Deep vs shallow")[1].split("## Rejected framings")[0]), preserved.depth);
});
test("ADR eligibility remains the same three-part test", () => {
  assert.equal(digest(eng("domain-modeling").split("### Offer ADRs sparingly")[1]), preserved.adr);
});

for (const [bucket, name, userOnly] of changed) {
  test(`${name}: invocation mode, docs and routing stay consistent`, () => {
    const body = read(`skills/${bucket}/${name}/SKILL.md`);
    const frontmatter = body.match(/^---\n([\s\S]+?)\n---/);
    assert.ok(frontmatter, `${name}: missing frontmatter`);
    assert.match(frontmatter[1], new RegExp(`^name: ${name}$`, "m"));
    assert.equal(/^disable-model-invocation: true$/m.test(frontmatter[1]), userOnly);
    assert.doesNotMatch(body, /Call the Skill tool(?: twice, for| with) "lain-(?:ask-matt|grill-with-docs|grill-me|to-spec|to-tickets|implement|wayfinder|setup-matt-pocock-skills)"/);
    assert.ok(!body.includes("\u2014"));
    const doc = read(`docs/${bucket}/${name}.md`);
    assert.doesNotMatch(doc, /^# /m);
    assert.doesNotMatch(doc, /\]\((?!https:\/\/)[^)]+\)/);
    let previous = -1;
    for (const h of ["What it does", "When to reach for it", "Common questions", "It's working if", "Where it fits"]) {
      const at = doc.indexOf(`## ${h}\n`);
      assert.ok(at > previous, `${name}: missing or misplaced ${h}`);
      previous = at;
    }
    assert.ok(!doc.includes("\u2014"));
    assert.ok(read("README.md").includes(`[${name}](`));
    assert.ok(read(`skills/${bucket}/README.md`).includes(`[${name}](`));
    assert.ok(eng("ask-matt").includes(name));
  });
}

test("entry docs and indexes do not restore exhaustive interviews or vocabulary bans", () => {
  for (const file of ["README.md", "skills/productivity/README.md", "docs/productivity/lain-grill-me.md", "docs/productivity/lain-grilling.md", "docs/engineering/lain-domain-modeling.md", "docs/engineering/lain-codebase-design.md"]) {
    assert.doesNotMatch(read(file), /relentless(?:ly)?|every branch visited|until every branch of the design tree is resolved|bans the loose substitutes|Forty-six questions|stops producing the words/i, file);
  }
});

test("decision-ownership fixtures are diverse development inputs, not claimed results", () => {
  const data = JSON.parse(read("evals/fixtures/decision-ownership/cases.json"));
  assert.equal(data.schema_version, 1);
  assert.equal(data.status, "development-inputs-not-release-evidence");
  assert.ok(data.cases.length >= 8);
  assert.equal(new Set(data.cases.map((c) => c.id)).size, data.cases.length);
  const tags = new Set();
  for (const c of data.cases) {
    for (const key of ["id", "title", "prompt", "seed"]) assert.ok(typeof c[key] === "string" && c[key].trim(), `${c.id}: ${key}`);
    assert.ok(Array.isArray(c.checks) && c.checks.length > 0);
    for (const check of c.checks) assert.ok(typeof check === "string" && check.trim());
    assert.ok(Array.isArray(c.tags) && c.tags.length > 0);
    c.tags.forEach((tag) => tags.add(tag));
    assert.equal(c.result, undefined, "Fixtures must not carry invented run results");
  }
  for (const tag of ["established-terms", "harmless-synonym", "material-ambiguity", "delegated-design", "authority", "stop", "learning", "missing-evidence"]) assert.ok(tags.has(tag), tag);
  assert.match(read("evals/decision-ownership.md"), /not yet executed/i);
});
