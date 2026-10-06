## What it does

`lain-pr` turns a change's intent, verification evidence and merge risk into a reviewable pull request description. Writing the body does not authorize opening a PR, pushing a branch or releasing the change.

## When to reach for it

Type `/lain-pr`, or the agent can reach for it when asked to prepare or improve a PR description.

| Need | Use |
| --- | --- |
| Explain an existing change and its evidence | `lain-pr` |
| Build a bounded change | [lain-implement](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-implement.md) |
| Assess correctness and compliance | [lain-code-review](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-code-review.md) |

## Evidence without invented baselines

The body names the source decision and the actual checks or artifacts supporting each claim. A missing before-state remains missing. A preservation test can pass before and after; it does not need an artificial failure to fit a template.

Use a screenshot for a visual claim, execution results for behavior, and measurements for capacity or quality. A diagram or pseudocode sketch explains the change but does not prove it ran.

## Common questions

**Does this create or publish the PR?**

No. It supplies the description format. Repository writes, push, PR creation and release actions need their own authorization.

**What happens when a required check was not run?**

The body says so and keeps the obligation visible. It cannot turn missing execution or independent review into a passing result.

## It's working if

- A reviewer can connect the purpose to the originating request.
- Each success claim points to actual evidence, or is marked unverified.
- Rollback limitations and affected consumers are visible.
- No publication or release happens merely because the description is complete.

- The PR body explains the user-visible purpose before dense trace data and keeps evidence gaps and rollback limitations visible. See the [shared artifact writing reference](https://github.com/learnathing/skills/blob/main/docs/productivity/lain-writing-for-agents.md).

## Where it fits

This is a reusable presentation discipline after implementation and review, not another approval stage. [lain-ask-matt](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-ask-matt.md) maps the neighboring workflows.
