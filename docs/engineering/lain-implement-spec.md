## What it does

`lain-implement-spec` coordinates approved tickets into a verified integration branch. It adds task-graph scheduling and integration checks without bypassing the fork's per-ticket source, evidence and review gates.

## When to reach for it

You invoke `/lain-implement-spec`; the agent does not start this workflow automatically.

| Situation | Direction |
| --- | --- |
| One bounded change | [lain-implement](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-implement.md) |
| Approved, technically ready tickets with useful parallel work | `lain-implement-spec` |
| Missing product or shared technical decisions | Resolve those prerequisites before dispatch |
| No subagent support | Disclosed serial execution, or a recoverable checkpoint when gates cannot be completed |

## Prerequisites

Provide the authoritative spec, approved tickets and configured tracker. Parallel work needs actual subagent and worktree support. Independent review remains a separate requirement; unavailable tooling is not evidence that it happened.

## Integration is a verified state

Workers start from a recorded integration commit and use the same [implementation discipline](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-implementation.md) as one-ticket work. The merger is serialized. Dependents start only after prerequisite changes and their required checks are integrated, not when a worker merely says done.

Changes in shared constraints invalidate affected readiness. Conflicting files may require serialization even without a declared ticket edge. The coordinator keeps source revisions, ownership and evidence in a durable checkpoint, and re-reads originals when resuming.

## Common questions

**Does whole-branch review replace per-ticket review?**

No. Local review catches ticket defects; integration validation and final branch review catch interactions. Evidence is refreshed when the relevant target changes.

**Does it always open a PR or close the parent issue?**

No. Publication needs applicable authority, and the tracker lifecycle determines when closure is appropriate. An integration branch is not proof of release readiness.

**Will cleanup discard unfinished work?**

No. Only recorded, clean worker worktrees whose commits are reachable from the accepted integration tip can be removed, without force. Blocked or foreign work stays recoverable.

## It's working if

- Every running ticket has one owner and recoverable source definitions.
- Dependency release follows actual integration evidence.
- Shared-constraint changes pause the affected work instead of silently changing requirements.
- The invoking worktree and unrelated changes remain intact.
- The final report distinguishes code, integration, review and release status.

## Where it fits

This is an optional coordinated delivery entry after spec and ticket approval, not a new planning phase. [lain-pr](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-pr.md) formats the resulting PR body, while [lain-retro](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-retro.md) remains optional. [lain-ask-matt](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-ask-matt.md) maps the alternatives.
