## What it does

`lain-implementation` owns the execution discipline shared by single-ticket and coordinated delivery. It operates only within an already-authorized bounded task; loading it does not grant permission to edit or publish.

## When to reach for it

The agent reaches for this model-invoked discipline beneath an authorized implementation workflow. You can also type `/lain-implementation` with a bounded request. For the normal one-ticket entry point, use [lain-implement](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-implement.md).

## One source for completion gates

The protocol preserves the starting worktree, recovers the authoritative contract, reconciles it with the code, builds evidence-bearing vertical slices, verifies review findings and commits only task-owned changes. The same rules apply inside a worker worktree and a single implementation session.

Technical readiness, empirical checks and independent review are not replaced by green unit tests. `INCOMPLETE` review still blocks a completion commit. A direct-review exception needs explicit policy and cannot waive unread sources or unfinished checks.

## Common questions

**Why extract this instead of having one skill invoke lain-implement?**

`lain-implement` is user-invoked. Other skills cannot invoke it. A model-invoked shared discipline avoids that illegal call and prevents parallel delivery from maintaining a weaker copy of the implementation gates.

**Does automatic invocation permit implementation without a request?**

No. This discipline requires existing implementation authority and a bounded source contract. A request for inspection remains read-only.

## It's working if

- Both delivery entry points use the same execution gates.
- Existing user changes remain outside task commits.
- Evidence is tied to the actual source and target revision.
- Missing coverage and independent review stay visible.

## Where it fits

This reusable discipline sits beneath [lain-implement](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-implement.md) and [lain-implement-spec](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-implement-spec.md). [lain-ask-matt](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-ask-matt.md) chooses the human-facing entry point.
