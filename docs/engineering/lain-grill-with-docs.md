## What it does

`lain-grill-with-docs` clarifies a plan while sharpening domain vocabulary and recording source-backed decisions. It works the decision-bearing frontier, not every local implementation choice, and ends with a concise decision handoff.

## When to reach for it

You invoke `/lain-grill-with-docs`; the agent does not invoke it automatically. Use it for unresolved behavior or design choices in a workspace. Without a workspace, use [grill-me](https://aihero.dev/skills-grill-me). A settled small change can go directly to [implement](https://aihero.dev/skills-implement); multi-session planning can use [wayfinder](https://aihero.dev/skills-wayfinder).

## The handoff and technical questions

The skill delegates interviews to grilling and active terminology work to domain modeling. Canonical terms belong in `CONTEXT.md`, qualifying enduring trade-offs in ADRs, and feature outcomes, invariants, failure semantics, exclusions and open decisions in the handoff.

Once the scope is clear, it reuses an applicable technical assessment or calls [technical design](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-technical-design.md). Facts discoverable from code or primary documentation remain agent work. Only choices requiring human authority return as questions. An interview-only request does not authorize experiments or implementation.

When relevant, the handoff adds accepted technical decision revisions, evidence, the ready scope, and deferred questions with revisit triggers. A critical open prerequisite blocks its dependent scope, not every independent future capability. Do not hide a design question in the glossary or label it a harmless implementation detail when it changes the contract.

## Common questions

**Must I answer every database and algorithm detail?**

No. The agent investigates facts and makes reversible choices inside its explicit authority. Unresolved product semantics, material cost and consequential choices outside that authority still need their responsible owner.

**No glossary or ADR was created. Is that wrong?**

Not if no new term or qualifying decision arose. The source-indexed handoff is still required. Reuse does not require an empty architecture document.

**Can an unresolved technical question be left for implementation?**

Only when it is genuinely local or safely deferred with a trigger. An unresolved shared identity, permission, failure or other critical prerequisite cannot underpin ready implementation tickets.

## It's working if

- Codebase-answerable facts are investigated rather than asked back.
- Existing decisions are not repeatedly reopened.
- Exact decisions and their origins survive in the handoff.
- Technical unknowns are resolved, explicitly blocked, or safely deferred.
- `CONTEXT.md` remains vocabulary and ADRs remain selective.

## Where it fits

[To-spec](https://aihero.dev/skills-to-spec) synthesizes the handoff for multi-session delivery. A small settled request can move directly to implementation. [Ask Matt](https://aihero.dev/skills-ask-matt) selects the route.
