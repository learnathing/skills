## What it does

`lain-technical-design` resolves the minimum sufficient design for the current delivery scope. It distinguishes reuse, a bounded design gap and a blocker. Risk determines design depth; session count determines coordination.

Assessment-only mode identifies gaps without making decisions, interviewing, editing files or running experiments. A small reuse case needs an anchored conclusion in the existing contract, not a new architecture document.

## When to reach for it

Type `/lain-technical-design`, or the agent reaches for it when shared data identity, interfaces, algorithms, failure semantics, migrations, permissions, capacity or cross-ticket decisions are unsettled.

| Situation | Result |
| --- | --- |
| Existing design supports the change | Reuse its sources and continue |
| A bounded consequential question is open | Form a scoped proposal and obtain the necessary evidence |
| Authority, access or a shared prerequisite is missing | Keep the affected scope blocked |
| Planning itself needs several sessions | Recommend a decision map, not a huge one-shot specification |

## Recommend an approach, not a technology questionnaire

In design mode, the agent works down from the goal and inspected constraints, recommends an approach and validates uncertain technical choices within authority. It compares alternatives only when they could change the result. You do not need to pick a data structure or learn implementation jargon before it can proceed.

A remaining question explains an observable consequence and includes a recommendation. Existing intent or delegation can settle even a caller-visible choice; missing authority, private-data permissions or a material unresolved preference cannot be replaced by model confidence. Assessment-only mode still stops before design or experimentation.

## Sources and authority

Read relevant code, tests, accepted design and ADRs, plus optional `docs/agents/engineering.md`. Missing optional policy does not require setup. Reversible choices inside authority remain autonomous; material cost, data handling, product semantics and consequential choices outside that authority require the responsible human.

A spec owns required behavior and binding constraints. Design notes explain the solution and evidence. ADRs preserve enduring trade-offs; `CONTEXT.md` remains a glossary. Link sources rather than keeping competing copies. Never record an agent recommendation as user approval.

One scoped constraint ID and revision has one exact normative definition. A ticket may explain its application in different words, but that explanation cannot replace the canonical registry definition. Applicable scenarios and verification ownership can differ across delivery scopes without changing the definition.

## Evidence and current readiness

Research establishes reported facts; executed experiments establish measured results. An unrun alternative remains unknown, not rejected by experimental evidence. A summary must not claim that a chosen solution is the only viable one unless the evidence supports that stronger statement.

When new evidence arrives, update the current readiness statement and checked source/revision before appending history. An implementation limitation that conflicts with a requirement must be identified as an accepted exception or an unresolved difference, not silently treated as the requirement.

Compare relevant current manifests with the cross-manifest definition checker when constraints are shared. It rejects differing exact definitions under the same ID/revision, while allowing distinct revisions and applicability sets. It does not fetch or certify source authority, freshness, semantic equivalence or approval. Per-scope ticket validation still applies. Do not turn every archived manifest into another global gate.

Evidence needed before accepting a design must exist before dependent implementation. Delivery-time verification remains an assigned obligation, not an impossible demand to test code before it exists. Independent ready scopes can proceed while others remain open; revisions recheck affected work after resolving ownership.

## Common questions

**Does every change require architecture approval?**

No. Reuse is a first-class outcome. Do not create empty designs, new ADRs or another interview for an already settled small task.

**Can a shortened definition keep the same ID and revision?**

Not as a replacement normative definition. Keep it as a labeled explanation, or reconcile the authoritative source and dependent copies. A meaningful decision change needs its accepted revision and history.

**Does the checker decide which conflicting definition is correct?**

No. It identifies the differing supplied strings and their sources. The source owner and existing design process settle the conflict.

## It's working if

- Small settled work continues without architecture paperwork.
- Choices, uncertainty and evidence limits stay visible in the current reading path.
- A fresh implementation session recovers the relevant shared contract.
- The same ID/revision does not hide several competing normative definitions.
- Unrelated work is not invalidated by presentation edits.
- The [shared artifact writing reference](https://github.com/learnathing/skills/blob/main/docs/productivity/lain-writing-for-agents.md) keeps decisions and consequences ahead of registers.

## Where it fits

This discipline sits beneath [grill-with-docs](https://aihero.dev/skills-grill-with-docs), [to-spec](https://aihero.dev/skills-to-spec), [to-tickets](https://aihero.dev/skills-to-tickets) and [implement](https://aihero.dev/skills-implement). [Codebase design](https://aihero.dev/skills-codebase-design) owns module shape; [prototype](https://aihero.dev/skills-prototype) supplies runnable evidence. [Ask Matt](https://aihero.dev/skills-ask-matt) routes the set.
