// Structural contract regression checks, not model behavior or context-capacity tests.
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (relative) => readFileSync(new URL(`../${relative}`, import.meta.url), "utf8");
const review = read("skills/engineering/lain-code-review/SKILL.md");
const implement = read("skills/engineering/lain-implementation/SKILL.md");
const sha256 = (text) => createHash("sha256").update(text).digest("hex");

// These bodies are deliberately unchanged from f3a1dbfe. Review any intentional
// contract edit before updating its digest; a matching digest is not evidence of execution.
const briefDigests = {
  Standards: "9d836caed16779c171c682b10cc06f9263da494fe93dddb54ffd37f14e4a8b37",
  Spec: "e08b5e07852d27a1e38c7cdb990cd356836983f4dbeb49ce54fa0955a84257bb",
  Design: "3a9cb925e1a4d1b256191c9ce0f38771a39dbd56133d64a51653b36e5ef75efe",
};

test("one independent reviewer covers all axes without an automatic topology router", () => {
  assert.match(review, /Use one independent sub-agent in a fresh review context for all applicable axes/);
  assert.match(review, /calling agent remains the coordinator; do not spawn an aggregator/);
  assert.match(review, /Do not add a complexity classifier or automatically switch reviewer counts/);
  assert.match(review, /Explicit user or project requirements for additional independent or specialist review remain separate obligations/);
  assert.doesNotMatch(review, /Dispatch three independent reviews|Spawn the applicable axes in parallel|Each axis runs in an independent sub-agent/);
  assert.doesNotMatch(review, /^disable-model-invocation:/m);
});

for (const [axis, digest] of Object.entries(briefDigests)) {
  test(`${axis} responsibility is preserved verbatim`, () => {
    const match = review.match(new RegExp(`### ${axis} brief\\n\\n(.*?)(?=\\n##)`, "s"));
    assert.ok(match, `Missing ${axis} brief`);
    assert.equal(sha256(match[1].trim()), digest);
  });
}

test("incomplete coverage reaches the implementer's commit gate", () => {
  assert.match(review, /\*\*PASS\*\*: applicable review coverage and required independent review are complete, with no verified blocker/);
  assert.match(review, /\*\*INCOMPLETE\*\*: required sources, checks, or finding verification remain unfinished/);
  assert.match(review, /Report every applicable non-pass state/);
  assert.match(implement, /If review reports `INCOMPLETE`,[\s\S]*?do not commit/);
  assert.match(implement, /Permission to use direct review does not waive incomplete coverage/);
  assert.match(implement, /all applicable coverage is complete/);
  assert.match(implement, /review gate is complete with no unresolved blocker/);
});

test("missing independent review retains the explicit exception boundary", () => {
  assert.match(review, /report `NOT INDEPENDENTLY VERIFIED` rather than PASS/);
  assert.match(implement, /Proceed only when explicit task or project policy accepts direct review for this scope/);
  assert.match(review, /Multiple lenses from the same reviewer are not independent corroboration/);
});

test("context recovery preserves source authority without an invented capacity gate", () => {
  assert.match(review, /Include conversation-only decisions with their exact definitions and origins/);
  assert.match(review, /Across truncation or compaction, retain source anchors and revisions, unresolved findings, and outstanding checks/);
  assert.match(review, /Re-read the necessary originals/);
  assert.match(review, /Missing capacity telemetry alone is not a blocker/);
  assert.match(review, /A supplied or identified source that cannot be read is a coverage gap/);
  assert.match(review, /A legitimately absent spec disclosed under step 2 is not itself incomplete coverage/);
});

test("repair verification still covers unchanged task hunks", () => {
  assert.match(review, /first report each previous finding as `resolved`, `unresolved`, or `rejected with supporting evidence`/);
  assert.match(review, /full blocker-only scan of the current target, including unchanged task hunks/);
  assert.match(implement, /Verification is limited to prior dispositions and a full blocker-only scan of the target/);
  assert.match(review, /Do not turn advisories into blockers by accumulation/);
});

test("docs and indexes describe the same review default and coverage gap", () => {
  const page = read("docs/engineering/lain-code-review.md");
  const implementationPage = read("docs/engineering/lain-implement.md");
  assert.match(page, /one independent reviewer/);
  assert.match(page, /`INCOMPLETE`/);
  assert.match(implementationPage, /`INCOMPLETE`/);
  for (const file of ["README.md", "skills/engineering/README.md"]) {
    const line = read(file).split("\n").find((item) => item.startsWith("- **[lain-code-review]"));
    assert.ok(line, `${file}: missing review entry`);
    assert.match(line, /one independent reviewer/i);
    assert.doesNotMatch(line, /run as independent sub-agents/);
  }
  for (const text of [page, implementationPage]) {
    let previous = -1;
    for (const heading of ["What it does", "When to reach for it", "Common questions", "It's working if", "Where it fits"]) {
      const index = text.indexOf(`## ${heading}\n`);
      assert.ok(index > previous, `Missing or misordered ${heading}`);
      previous = index;
    }
    assert.doesNotMatch(text, /\]\((?!https:\/\/)[^)]+\)/);
    assert.ok(!text.includes("\u2014"));
  }
});
