## What it does

`lain-domain-modeling` resolves domain ambiguity that could change behavior, data, interfaces or acceptance. It reuses established project and industry terminology before considering a new name. A clear synonym is not a reason to interrupt the user or edit a glossary.

The **ubiquitous language** is the shared meaning people need for this project, not an obligation to invent a private technical vocabulary. Passive reading of existing definitions is not active domain modeling.

## When to reach for it

Type `/lain-domain-modeling`, or the agent invokes it when material domain work is needed.

| Situation | Action |
| --- | --- |
| The request uses a harmless synonym with clear meaning | Reuse the established term and continue |
| Competing meanings would change the required behavior | Inspect sources, then resolve the remaining consequential difference |
| A genuinely new project concept needs a definition | Describe its distinction using existing language first |
| A durable trade-off qualifies for an ADR | Record the decision under its actual authority |
| You explicitly want to build or revise the domain model | Use this skill within that requested scope |
| Only a module's structure is in question | Use [codebase design](https://aihero.dev/skills-codebase-design) |

## Necessary project meanings, not an encyclopedia

Relevant standards provide defaults, but they do not silently override a project's existing public API, product names or accepted business meaning. The agent checks the request, glossary, accepted decisions and code before asking. Code is evidence of behavior, not automatic authority to change a requirement.

A glossary entry records a necessary local distinction. It does not repeat standard timeout or API definitions when their ordinary meaning is sufficient. A real legacy alias can be recorded; `_Avoid_` is reserved for a term that would cause a material misunderstanding, not every alternative word.

A distinguishing example can expose whether "cancel" means stopping a future action or reversing one that already happened. Such a probe is not a new requirement. If sources or delegation settle the difference, the agent proceeds; otherwise it asks the responsible person about the observable consequence, with a recommendation.

## Small, sourced records

Reuse the configured document names and locations. Create the glossary or ADR directory only when a useful authorized record exists. Keep the glossary separate from specs, implementation notes and conversation history.

An ADR is still offered only when the choice is hard to reverse, surprising without context and the result of a real trade-off. A paragraph may be enough. The [shared artifact writing reference](https://github.com/learnathing/skills/blob/main/docs/productivity/lain-writing-for-agents.md) keeps the choice, reason and consequence readable without hiding proposal or acceptance status.

## Common questions

**Should every project have a glossary?**

Not as a ritual. Record meanings that would otherwise be misunderstood; a small task with clear established language may require no glossary work at all.

**Can the agent rename my API to match its preferred terminology?**

Not for style. Public symbols and product names are compatibility and domain context. A real semantic conflict must be reconciled with its sources and authority, not resolved by bulk renaming.

**Does using standard terms remove the need for clarification?**

No. The same standard word can represent different product behavior. Clarify the material difference, not the spelling, and first investigate what existing sources already establish.

**No glossary changed after grilling. Did something fail?**

Not by itself. [Grill with docs](https://aihero.dev/skills-grill-with-docs) loads active modeling only when needed. No material change should mean no glossary edit, not a forced terminology discussion.

## It's working if

- Familiar, accurate project names survive the design discussion.
- Clear synonyms do not trigger questions or new entries.
- A question identifies a real behavioral difference and offers a recommendation.
- A needed local definition remains understandable outside the original conversation.
- Standard facts, unaccepted proposals and project decisions are not mixed together.

## Where it fits

This model-invoked discipline supports [grill with docs](https://aihero.dev/skills-grill-with-docs) and other callers only when domain work is relevant. [Codebase design](https://aihero.dev/skills-codebase-design) addresses module shape rather than imposing names on the project. [Ask Matt](https://aihero.dev/skills-ask-matt) selects the route.
