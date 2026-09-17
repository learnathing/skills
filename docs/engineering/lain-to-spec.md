## What it does

`lain-to-spec` synthesizes settled conversation and repository context into a traceable specification and publishes ready work to the configured tracker. It does not interview, invent a technical solution or run experiments.

## When to reach for it

You invoke `/lain-to-spec`; the agent does not invoke it automatically. Use it when settled work needs multiple implementation sessions, or one capability on a larger map is ready. A settled single-session change can use [implement](https://aihero.dev/skills-implement) without a standalone spec.

## Traceability and scope readiness

The configured tracker comes from setup. Sources include the decision handoff, relevant glossary, ADRs, pinned compatibility facts, accepted technical design and actual experiment evidence.

Every binding claim has a source ID. Invariants have exercising scenarios; scenarios have an observation seam and required evidence. Change scenarios describe newly passing behavior, while preservation scenarios retain an already-passing baseline. The Delivery Manifest contains the exact definitions that downstream tickets own.

Assessment-only technical checking is not a design session. Missing consequential choices or prerequisite evidence keep the dependent scope out of ready-for-agent status. A clearly labelled draft may retain open questions, but it is not permission to implement around them. Existing or accepted verification seams can be reused; a new consequential seam choice returns to design rather than being invented during synthesis.

A spec owns behavior and binding shared or hard-to-reverse constraints. Design notes own solution rationale and evidence. Tunable parameters, file placement and local refactoring do not become requirements. Agent-made decisions retain their real authority and source, not invented user approval.

The optional `technical_constraints` registry supplies scoped IDs, revisions, source anchors, affected scenario IDs and a verification owner. Schema version 1 and ordinary manifests remain compatible. Structural traceability is not evidence that the architecture works or that an unrun benchmark passed.

## Common questions

**Can the agent fill in missing architecture while writing the spec?**

Not here. It can recover accepted decisions and existing compatibility facts. New consequential choices must be resolved before ready publication, using [technical design](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-technical-design.md) or clarification.

**Must every schema field or algorithm parameter be fixed?**

No. Only source-backed constraints belong in the spec. Preserve implementation freedom for local and tunable choices.

**Must the entire project be settled?**

No. Name the current capability scope and its shared prerequisites. Independent future questions may remain open; difficult requirements cannot silently disappear to make the scope look ready.

## It's working if

- Binding claims and original decisions have durable traces.
- Invariants, scenarios and verification form a complete current-scope contract.
- No unresolved critical choice is published as ready.
- Shared constraints retain exact accepted revisions and evidence obligations.
- Small ordinary work needs no optional registry or design packet.

## Where it fits

[Grill with docs](https://aihero.dev/skills-grill-with-docs) and technical design supply accepted decisions. This skill synthesizes them for [to-tickets](https://aihero.dev/skills-to-tickets). [Ask Matt](https://aihero.dev/skills-ask-matt) routes the full flow.
