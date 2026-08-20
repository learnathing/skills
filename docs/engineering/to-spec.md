## What it does

`to-spec` turns settled conversation and repository context into a traceable [spec](https://www.aihero.dev/ai-coding-dictionary/spec), then publishes it to the configured issue tracker.

It does not interview you or invent missing product decisions. Every decision-bearing contract claim must have a source, and a spec is published as ready only when its invariants, scenarios, failure semantics, and verification map are complete.

## When to reach for it

You invoke this by typing `/to-spec`; the [agent](https://www.aihero.dev/ai-coding-dictionary/agent) will not reach for it on its own.

| Where you are | What to run |
| --- | --- |
| Important decisions are still open | [grill-with-docs](https://aihero.dev/skills-grill-with-docs) |
| The work fits one [context window](https://www.aihero.dev/ai-coding-dictionary/context-window) | [implement](https://aihero.dev/skills-implement), without a separate spec |
| The work spans several sessions | `to-spec`, then [to-tickets](https://aihero.dev/skills-to-tickets) |
| A [wayfinder](https://aihero.dev/skills-wayfinder) map is resolved | `/to-spec #<map_issue>` |

## Prerequisites

[setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills) must have configured an issue tracker and triage labels. The source conversation should contain a decision handoff, or equivalent settled decisions, plus any relevant glossary entries, ADRs, and prototypes.

## Traceability over volume

The spec preserves stable source-decision IDs and uses separate IDs for invariants and scenarios. A source index records exact decisions for observable outcomes, invariants, public interfaces, error semantics, and hard-to-reverse architecture. Every decision-bearing source item must appear in the contract or an explicitly sourced out-of-scope statement, so a shorter document cannot improve traceability by dropping a difficult decision. A minimal complete scenario set replaces a long list of generic user stories.

| Spec element | What makes it complete |
| --- | --- |
| Invariant | Has a source and at least one exercising scenario |
| Scenario | Is marked change or preservation, and has an exact source ID, concrete expected behaviour, and verification evidence |
| Delivery Manifest | Carries every scenario ID, its exact durable definition, and the source IDs it exercises for deterministic ticket validation |
| Failure or degradation | States the trigger, caller-visible result, observability, and source decision |
| Hard-to-reverse implementation decision | Traces to conversation, ADR, prototype, or required compatibility |
| Known unknown | Cannot change behaviour, invariants, interfaces, or error modes |

Code is a source for current behaviour and compatibility constraints, not permission to invent a new requirement. Implementation-discoverable module selection, file placement, and local refactoring choices are not promoted into pseudo-requirements. "Conversation" and "existing behaviour" are source categories, not sufficient anchors by themselves.

## Risk-based seams

`to-spec` prefers an existing public **seam** and the highest stable seam that can observe a scenario. It adds a lower seam only when a complex rule needs faster feedback or a failure boundary cannot be controlled from above. There is no ideal number of seams.

An established repository seam can be used without another user turn. The skill checks with you only when a seam choice changes an externally observable or hard-to-reverse interface contract, or materially different choices encode different caller behaviour. Java visibility and internal test seams remain implementation choices. [codebase-design](https://aihero.dev/skills-codebase-design) supplies vocabulary when that contract needs design work.

## Common questions

**What happens when the conversation did not settle an error case?**

The skill stops and lists the missing decision. It does not choose failure, retry, or degradation on your behalf, and it does not publish the spec as ready.

**Why not write every possible user story?**

Volume is not coverage. The measurable target is whether every invariant, agreed boundary, and caller-visible failure has a scenario and observable verification. Hypothetical stories create unsupported behaviour and downstream branches.

**Does this template work for refactors and interface changes?**

Yes. Invariants, interfaces, failure contracts, and verification are meaningful for both feature and architectural work, without wrapping the change in invented user stories.

## It's working if

- Every decision-bearing contract claim names a source.
- Every decision-bearing source item is represented or explicitly out of scope.
- Every source ID resolves to an exact decision or pinned compatibility fact.
- Every invariant maps to at least one scenario.
- Every scenario maps to a seam and observable evidence.
- The machine-readable Delivery Manifest exactly represents every scenario tickets must own.
- Preservation scenarios remain green without a fabricated Red state.
- Caller-visible failure behaviour is explicit.
- A blocking unknown stops publication instead of becoming an assumption.
- The resulting spec is shorter because repeated prose has been replaced by IDs and traceability.

## Where it fits

`to-spec` is the multi-session branch of the main chain:

```txt
grill-with-docs → to-spec → to-tickets → implement → code-review
```

[grill-with-docs](https://aihero.dev/skills-grill-with-docs) supplies settled decisions; [to-tickets](https://aihero.dev/skills-to-tickets) turns the traced scenarios into fresh-context implementation issues. [ask-matt](https://aihero.dev/skills-ask-matt) routes the whole flow.
