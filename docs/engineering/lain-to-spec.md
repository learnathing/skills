## What it does

`lain-to-spec` synthesizes settled conversation and repository context into a traceable specification and publishes ready work to the configured tracker. It does not interview, invent a technical solution or run experiments.

The spec explains behavior before the examples that verify it. A developer should not have to simulate a long test script or decode three ID columns to discover the product rule. The source and publication requirements remain unchanged.

## When to reach for it

You invoke `/lain-to-spec`; the agent does not invoke it automatically. Use it when settled work needs multiple implementation sessions, or one capability on a larger map is ready. A settled single-session change can use [implement](https://aihero.dev/skills-implement) without a standalone spec.

## Behavior and traceability

Group scenarios by reader question or capability. Explain the rule and important exceptions, then place examples beside it. Compact condition/result tables work for choices; operation/result pairs work for multi-step cases. IDs remain stable even when the same case is laid out differently. A diagram is optional, must refer to the same revision and retain an equivalent explanation including failure paths.

Every binding claim has a source ID. Invariants have exercising scenarios; scenarios have an observation seam and required evidence. Change scenarios describe newly passing behavior, while preservation scenarios retain an already-passing baseline. The Delivery Manifest retains the exact definitions that downstream tickets own, after the main reading path.

## Source authority and scope readiness

The configured tracker comes from setup. Sources include the decision handoff, relevant glossary, ADRs, pinned compatibility facts, accepted technical design and actual experiment evidence.

Existing implementation behavior does not silently override the request. The spec distinguishes an accepted exception, an observed limitation and an unresolved difference. A consequential unresolved difference keeps its dependent scope out of ready-for-agent status. In a blocked draft, the difference appears near the beginning as well as in its relevant section.

Assessment-only checking is not a design session. Existing or accepted verification seams can be reused; a new consequential seam returns to design. A spec owns behavior and binding shared or hard-to-reverse constraints. Design notes own rationale and evidence. Local module choices and tunable parameters do not become product requirements.

The optional schema-v1 constraint registry retains exact definitions, source anchors, affected scenario IDs and verification ownership. When current scopes share a constraint, the cross-manifest checker detects different exact definitions under the same ID and revision. It does not establish approval, semantic equivalence or source freshness, and does not require scanning historical archives.

## Common questions

**Can the agent fill in missing architecture while writing the spec?**

Not here. It can recover accepted decisions and existing compatibility facts. New consequential choices must be resolved before ready publication, using [technical design](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-technical-design.md) or clarification.

**Must every scenario be in the same table?**

No. Use the form that makes the behavior clear without losing stable IDs or exact definitions. A long sequence can remain one scenario, with each operation next to its expected result.

**Must the entire project be settled?**

No. Name the current capability and its shared prerequisites. Independent future questions may remain open; difficult requirements cannot disappear to make a scope look ready.

## It's working if

- A developer can explain the rule before reading the detailed verification sequence.
- Material exceptions and open requirement differences are not hidden in compatibility metadata.
- Binding claims and original decisions retain durable traces.
- Shared constraints have consistent accepted definitions and revisions.
- Small ordinary work needs no optional registry, diagram or design packet.
- The [shared artifact writing reference](https://github.com/learnathing/skills/blob/main/docs/productivity/lain-writing-for-agents.md) improves the reading path without weakening the contract.

## Where it fits

[Grill with docs](https://aihero.dev/skills-grill-with-docs) and technical design supply accepted decisions. This skill synthesizes them for [to-tickets](https://aihero.dev/skills-to-tickets). [Ask Matt](https://aihero.dev/skills-ask-matt) routes the full flow.
