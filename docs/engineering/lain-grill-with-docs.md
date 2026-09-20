## What it does

`lain-grill-with-docs` clarifies a requirement, sharpens domain vocabulary and preserves the decisions needed to implement it. The combined requirement must retain the meaning the user accepted or delegated; finishing the questions does not by itself establish agreement.

## When to reach for it

You invoke `/lain-grill-with-docs`; the [agent](https://www.aihero.dev/ai-coding-dictionary/agent) does not invoke it automatically. Use it for unresolved behaviour or consequential design choices in a workspace. For an interview without a workspace, use [grill-me](https://aihero.dev/skills-grill-me).

| Situation | Route |
| --- | --- |
| A settled change fits the existing design | Go directly to [implement](https://aihero.dev/skills-implement) |
| The intended outcome, scope or consequential choices remain unclear | Use this [skill](https://www.aihero.dev/ai-coding-dictionary/skill) |
| Several scopes need coordinated planning | Use [wayfinder](https://aihero.dev/skills-wayfinder) |

## Prerequisites

A workspace provides the code and existing decisions to investigate. The skill updates domain documents when needed. It uses an existing issue or document convention to save a requirement handoff when work actually moves between [sessions](https://www.aihero.dev/ai-coding-dictionary/session) and writing is authorized.

## The decision handoff

The interview checks the problem, observable success and scope before treating a proposed solution as the requirement. It concentrates on decisions that could change the result. Facts available in code or documentation are investigated, and reversible choices within the task's authority stay with the agent.

The **decision handoff** carries exact decisions and their origins, outcomes, invariants, failures, exclusions and concrete acceptance examples. The examples expose competing interpretations: for an export feature, "the current page" and "all filtered results" produce different outputs. It does not turn every example into a new requirement or require a full test suite during the interview.

| Information | Home |
| --- | --- |
| Canonical domain terms | `CONTEXT.md` |
| Qualifying enduring trade-offs | ADRs |
| Current requirement and agreement evidence | The decision handoff, saved to an authorized source when portability is needed |

## Agreement and the next action

Existing confirmation and delegated authority are reused. The agent shows the integrated handoff, then continues authorized work when the relevant prerequisites are settled. It asks again only when a consequential interpretation lacks support, not merely because the summary was reformatted.

| End state | Meaning |
| --- | --- |
| Interview stopped with open choices | Settled decisions are preserved; the affected requirement remains unresolved |
| Requirements aligned, technical prerequisite open | The intended behaviour is clear, but the dependent scope is not ready to build |
| Scope ready, implementation not authorized | The handoff is usable; the interview does not grant permission to implement |
| Scope ready and next work authorized | Continue without another approval ritual |

Independent ready scopes need not wait for unrelated future decisions.

## Common questions

**Does every session need a final "confirm everything" round?**

No. Existing answers and applicable delegation can already support the integrated requirement. Only a new consequential interpretation needs a targeted decision. A request to stop is not approval of unresolved choices.

**Must I answer every database and algorithm detail?**

No. The agent investigates facts and makes reversible choices within the task's authority. Product semantics and consequential choices outside that authority still need their responsible owner.

**Can another session recover the requirement from `CONTEXT.md` alone?**

No. That file is only vocabulary. For an actual handoff, the agreement belongs in an authorized durable source with its definitions, revision, acceptance examples and remaining questions. A bounded same-session task needs no extra file. When saving is unavailable or disallowed, the conversation contains a portable handoff and an explicit unsaved status.

**No glossary or ADR was created. Is that wrong?**

Not when no new term or qualifying trade-off arose. The decision handoff is still required.

## It's working if

- The summary answers what problem the change solves and what observable result counts as success.
- You can distinguish what you decided, what you delegated and what remains a proposal.
- Acceptance examples expose materially different interpretations before implementation.
- Existing answers are reused, and an authorized next step does not wait for duplicate approval.
- A new session can recover saved decisions without treating a glossary or an unexplained ID as the requirement.

## Where it fits

This is a clarification entry point in the build flow. [To-spec](https://aihero.dev/skills-to-spec) synthesizes the handoff for multi-session delivery; a settled bounded request can move directly to [implement](https://aihero.dev/skills-implement). [Ask Matt](https://aihero.dev/skills-ask-matt) selects the route.
