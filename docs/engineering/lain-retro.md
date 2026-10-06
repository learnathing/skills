## What it does

`lain-retro` examines a coding session and proposes changes to the environment that could prevent repeated mistakes or wasted work. It leaves the environment unchanged until those changes are separately authorized.

## When to reach for it

You invoke `/lain-retro`; the agent does not start it automatically. Use it after a difficult diagnosis, repeated review findings or an unexpectedly expensive session. A small successful change does not require a retrospective.

| Finding | Likely intervention |
| --- | --- |
| A mechanical rule is repeatedly missed | Repair or add a deterministic check |
| A contextual judgment is unclear | Clarify a scoped standard |
| The agent cannot find existing information | Add a navigation pointer |
| Required observations are unavailable | Propose the smallest authorized information source |

## Pay once for repeatable checks

The skill reads existing check commands and their wiring before recommending new tooling. A check that exists but never runs is not a reason to invent another check. Standards remain available to implementers and reviewers; fewer steering instructions must not reduce review coverage.

## Common questions

**Does it automatically edit AGENTS.md or CI?**

No. The output is a set of source-backed proposals with verification criteria. Applying a proposal is separately authorized work.

**What can it conclude from an incomplete session log?**

Only findings supported by the records it can inspect. It reports gaps rather than inventing a complete account of the session.

## It's working if

- Every finding points to an observed event or inspected configuration.
- Existing broken or unwired checks are identified before replacements are proposed.
- A mechanical-rule proposal includes failing and allowed examples.
- The report separates observed problems from untested improvement hypotheses.

## Where it fits

This is optional maintenance after coding, diagnosis or review. [lain-code-review](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-code-review.md) assesses a change; retro assesses the environment around the work. [lain-ask-matt](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-ask-matt.md) provides the route map.
