## What it does

`lain-technical-design` resolves the **minimum sufficient design** for the current delivery scope. It distinguishes reuse of an existing solution, a bounded design gap, and a blocker. Risk determines design depth; session count determines coordination.

Assessment-only mode identifies gaps without making decisions, interviewing, editing files or running experiments. A small reuse case needs an anchored conclusion in the existing contract, not a new architecture document.

## When to reach for it

Type `/lain-technical-design`, or the agent reaches for it when shared data identity, interfaces, algorithms, failure semantics, migrations, permissions, capacity or cross-ticket decisions are unsettled.

| Situation | Result |
| --- | --- |
| Existing design supports the change | Reuse its sources and continue |
| A bounded consequential question is open | Form a scoped proposal and obtain the necessary evidence |
| Authority, access or a shared prerequisite is missing | Keep the affected scope blocked |
| Planning itself needs several sessions | Recommend a decision map, not a huge one-shot specification |

## Sources and authority

Read relevant code, tests, accepted design and ADRs, plus optional `docs/agents/engineering.md`. Missing optional policy does not require setup. Facts are investigated by the agent. Reversible choices inside explicit authority remain autonomous; material cost, data handling, product semantics and consequential choices outside that authority require the responsible human.

A spec owns required behavior and binding constraints. Design notes explain the solution and evidence. ADRs preserve enduring trade-offs; `CONTEXT.md` remains a glossary. Link sources rather than keeping competing copies. Never record an agent recommendation as user approval.

Shared constraints use scoped IDs and revisions, affected delivery scenarios and a verification owner. Tunable parameters and file placement do not become product requirements. A deferred decision has a revisit trigger and cannot be a hidden prerequisite of work marked ready.

## Evidence and rolling readiness

Research establishes reported facts; technical experiments establish measured results. An unrun benchmark is not quality evidence. Evidence needed before accepting a design must exist before dependent implementation; delivery-time verification remains an assigned obligation, not an impossible demand to test code before it exists.

Keep a thin project baseline, then design capabilities near implementation. Independent ready scopes can proceed while others remain open. A changed shared decision preserves its previous meaning and rechecks only affected work after resolving ownership.

## Common questions

**Does every change require architecture approval?**

No. Reuse is a first-class outcome. Do not generate empty designs, new ADRs or another interview for an already settled small task.

**Can the agent choose retrieval algorithms and data models?**

It proposes, investigates and evaluates them, and chooses within explicit authority. Shared identity, deletion semantics, data handling and migration costs cannot remain implicit. Algorithm-quality claims require suitable evidence.

**Must the whole system be designed before coding starts?**

No. Only the current scope and its shared prerequisites must be ready. A partial handoff is not a claim that the whole project is complete.

## It's working if

- A small settled change continues without architecture paperwork.
- Decisions distinguish approved constraints, delegated choices, actual evidence and open questions.
- A fresh implementation session can recover the relevant shared contract.
- A decision revision identifies affected work without invalidating unrelated tickets.
- Unavailable evidence is not presented as a completed experiment.

## Where it fits

This model-invoked discipline sits beneath [grill-with-docs](https://aihero.dev/skills-grill-with-docs), [to-spec](https://aihero.dev/skills-to-spec), [to-tickets](https://aihero.dev/skills-to-tickets) and [implement](https://aihero.dev/skills-implement). [Codebase design](https://aihero.dev/skills-codebase-design) still owns module shape, and [prototype](https://aihero.dev/skills-prototype) provides runnable evidence. [Ask Matt](https://aihero.dev/skills-ask-matt) routes the set.
