## What it does

`lain-to-tickets` turns ready plans, specs or settled conversations into tracer-bullet vertical implementation slices. Each ticket has a source contract, blocking edges and required evidence. It publishes only the exact validated breakdown approved by the user.

A published readiness snapshot is not the ticket's permanent execution state. The same artifact can retain its contract while showing what has actually been implemented, checked and left open.

## When to reach for it

You invoke `/lain-to-tickets`; the agent does not invoke it automatically. Use it when a ready delivery needs several implementation sessions. A small settled change can use [implement](https://aihero.dev/skills-implement) directly. Unresolved shared design or prerequisite evidence belongs in design or a decision map, not a ready implementation ticket.

## Ownership and shared constraints

`Owns` gives each delivery scenario exactly one owner. Shared invariants and technical decisions may apply to several tickets without duplicating delivery ownership.

| Optional field | Purpose |
| --- | --- |
| `Applies` | Exact constraint revisions affecting this ticket's owned scenarios |
| `Verifies` | Constraints whose verification scenario this ticket owns |
| `Technical trace` | Exact definitions of applicable constraints |

Relevant tickets point to accepted sources and describe actual verification duties. Explain how a constraint applies to this ticket separately from its exact canonical definition. Ordinary schema-v1 tickets remain valid without optional registry fields. Changing provisional names into tracker IDs does not change scenario-based applicability.

## Publication and tracking

| Phase | What the validator checks | What a pass does not establish |
| --- | --- | --- |
| `publication`, the default | Ready label, unchecked acceptance, exact source definitions, ownership, dependencies and shared constraints | Approval, comprehension, source currency or actual execution |
| Explicit `--phase=tracking` | A non-empty configured live status, Current state fields, checked or unchecked acceptance, and the same contract/graph checks | New publication readiness, completion, dependency release or authorization |

Once implementation starts, Current state appears after the outcome: execution, verification, the checked source/revision, and remaining duties. This keeps an implemented but unreviewed result visible without resetting its status or checkboxes to satisfy draft validation. Relevant historical sources must still be read, but obsolete Comments or fenced examples cannot satisfy missing current fields in tracking mode.

Use native tracker lifecycle state when available, and update its existing summary within authority. Do not create competing states or remote labels as a side effect. A readiness label alone is not enough to claim a ticket or release a dependency.

## Structure, comprehension and integration

A fresh cold reader receives representative ticket shapes and only their declared pointers, then reconstructs the behavior and shared constraints. Missing independent sampling is disclosed. A complete template is not a substitute for understanding.

Prefer an early real integration path and assign later quality, migration or lifecycle checks to the relevant slices. On a constraint revision, reconcile the source, update affected tickets, rerun structural validation and affected cold-reader samples, and preserve unrelated work and concurrent ownership. Current blockers and material limitations update the current section before history is appended.

## Common questions

**Does a green tracking check mean the ticket is done?**

No. It verifies the structure of a live record, not whether its evidence supports completion. Independent review, integration and release duties retain their own requirements.

**Does every new ticket need a progress table?**

No. A new untouched draft needs no invented execution record. After work starts, keep the current state compact; use real evidence links rather than copied logs.

**Is per-ticket review sufficient?**

Not for multi-ticket delivery. Integrate and check as slices land, then run final [code review](https://aihero.dev/skills-code-review) from the branch point.

## It's working if

- Tickets remain complete, observable vertical slices.
- Each source scenario has one owner and dependencies are acyclic.
- Draft validation still runs on the exact approved artifacts.
- A developer can distinguish implementation from remaining review or integration work.
- Source revisions, limitations and superseded decisions stay traceable.
- The [shared artifact writing reference](https://github.com/learnathing/skills/blob/main/docs/productivity/lain-writing-for-agents.md) keeps outcomes before machine fields without creating a second contract.

## Where it fits

[To-spec](https://aihero.dev/skills-to-spec) supplies the contract; this skill prepares it for implementation sessions. [Technical design](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-technical-design.md) owns readiness and shared-constraint serialization. [Ask Matt](https://aihero.dev/skills-ask-matt) routes the set.
