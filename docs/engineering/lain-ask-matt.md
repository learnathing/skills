## What it does

`lain-ask-matt` recommends the skill or flow appropriate to the current situation. It reads the candidate skills whose boundaries determine the route, names the next invocation, and stops. It does not perform the work or invoke a user-invoked skill for you.

## When to reach for it

You invoke `/lain-ask-matt`; the agent does not reach for it automatically.

| Situation | Direction |
| --- | --- |
| A settled request fits existing design | [Implement](https://aihero.dev/skills-implement) directly |
| Product decisions need clarification | [Grill with docs](https://aihero.dev/skills-grill-with-docs) |
| Data, algorithm or other technical risk is unsettled | [Technical design](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-technical-design.md) |
| Planning itself requires several sessions | [Wayfinder](https://aihero.dev/skills-wayfinder) |
| Ready work requires several implementation sessions | Spec, tickets, then implementation |
| Incoming issues or a difficult bug | Triage or diagnosing bugs |

## Risk and coordination

A short permissions change can need design; a large mechanical change can reuse a known solution. Risk decides design depth, not line count. Session capacity decides whether the work needs a decision map, specification or multiple tickets.

UI/logic questions can use an interactive prototype. Feasibility, retrieval quality, capacity and migration questions use a technical experiment with actual evidence. External facts use research. A prototype is not the automatic next step when implementation is already settled.

Prefer one context for bounded planning when it fits. For larger work, retain scoped source IDs, accepted decision revisions and evidence, and load only the relevant subset in each session. Use handoff for actual portability rather than between every pair of phases.

## Common questions

**Is there one mandatory sequence?**

No. Settled small changes skip a new interview and standalone spec. A risky task can need design despite being short. Main-flow entry points check readiness even when the router is bypassed.

**Does it automatically run its recommendation?**

No. User-invoked workflows stay under human control. Model-invoked disciplines are available to other skills within work already authorized.

**The router and a source skill disagree. Which wins?**

The source `SKILL.md`. The router must read it before using a boundary to choose or skip work. A hidden user-invoked skill is not necessarily uninstalled; check the command or plugin registration before reporting absence.

**Where do project preferences live?**

In repository instructions and, when useful, optional engineering policy. Editing managed skill files is not the durable place for project-specific authority or tracker configuration.

## It's working if

- It names a next invocation and stops rather than starting unrelated work.
- Simple tasks avoid unnecessary documents and approvals.
- Small but consequential changes are not mistaken for technically settled work.
- Ready independent capabilities can leave a larger planning map.
- Recommendations follow the actual source-skill boundaries.

## Where it fits

This is a standalone router over this repository's skills, not a mandatory stage and not a scan of arbitrary installed skills. It points into the main flow, discovery on-ramps, codebase upkeep and standalone utilities. [The source](https://github.com/learnathing/skills/blob/main/skills/engineering/lain-ask-matt/SKILL.md) carries the full route map.
