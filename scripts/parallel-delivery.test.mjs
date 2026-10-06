// Structural contracts only: these tests do not simulate agent execution.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (relative) => readFileSync(new URL(`../${relative}`, import.meta.url), "utf8");
const shared = read("skills/engineering/lain-implementation/SKILL.md");
const entry = read("skills/engineering/lain-implement/SKILL.md");
const parallel = read("skills/engineering/lain-implement-spec/SKILL.md");

test("extracting the execution discipline preserves all original six-state text", () => {
  const baseline = read("evals/fixtures/upstream-adoption/implementation-before.md");
  const marker = "## 1. Pin the change\n";
  assert.ok(shared.includes(marker) && baseline.includes(marker));
  assert.equal(shared.slice(shared.indexOf(marker)), baseline.slice(baseline.indexOf(marker)));
});

test("both entry points use the model-invoked execution discipline", () => {
  assert.match(entry, /^disable-model-invocation: true$/m);
  assert.match(parallel, /^disable-model-invocation: true$/m);
  assert.doesNotMatch(shared, /^disable-model-invocation:/m);
  for (const body of [entry, parallel]) assert.match(body, /call the Skill tool with "lain-implementation"/i);
  assert.doesNotMatch(parallel, /call the Skill tool with ["`]lain-implement["`]/i);
  assert.match(shared, /Loading this skill does not grant permission/);
});

test("dependency completion is tied to verified integration and current sources", () => {
  assert.match(parallel, /every prerequisite is integrated/);
  assert.match(parallel, /required prerequisite checks passed/);
  assert.match(parallel, /A worker's claim that it is done does not release a dependent ticket/);
  assert.match(parallel, /source and shared-constraint revisions remain accepted/);
  assert.match(parallel, /A changed shared constraint stops all affected pending or running scopes/);
  assert.match(parallel, /Two tickets with no declared blocking edge can still contend/);
});

test("merges serialize and refresh evidence after target changes", () => {
  assert.match(parallel, /Only one merger writes the integration branch at a time/);
  assert.match(parallel, /If the integration tip changes between synchronization and merge, synchronize again/);
  assert.match(parallel, /Earlier review evidence covers only the earlier target/);
  assert.match(parallel, /Do not mark the ticket integrated or release its dependents while these checks remain unmet/);
  assert.match(parallel, /last verified integration point/);
});

test("tool limitations and final review preserve explicit non-pass states", () => {
  assert.match(parallel, /If subagents are unavailable, disclose the limitation/);
  assert.match(parallel, /do not claim concurrency, fresh-context review or independence/);
  assert.match(parallel, /original integration base and current integration HEAD/);
  assert.match(parallel, /`INCOMPLETE` and `NOT INDEPENDENTLY VERIFIED` remain non-pass states/);
  assert.match(parallel, /never waives missing coverage/);
});

test("publication and worktree cleanup require evidence and ownership", () => {
  assert.match(parallel, /Never reset or clean the user's worktree/);
  assert.match(parallel, /applicable publication authority/);
  assert.match(parallel, /code completion alone must not prematurely close tickets or their parent spec/);
  assert.match(parallel, /clean and their commits are reachable from the accepted integration tip/);
  assert.match(parallel, /Use non-forcing removal/);
  assert.match(parallel, /Leave blocked worktrees and evidence recoverable/);
  assert.match(parallel, /Honor a later stop or abort instruction/);
});
