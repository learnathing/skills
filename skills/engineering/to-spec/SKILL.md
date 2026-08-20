---
name: to-spec
description: "Turn the current conversation into a spec and publish it to the project issue tracker: no interview, just synthesis of what you've already discussed."
disable-model-invocation: true
---

This skill takes the current conversation context and codebase understanding and produces a traceable spec. Do NOT interview the user. Synthesize only what is already known.

The issue tracker and triage label vocabulary should have been provided to you. If not, tell the user to run `/setup-matt-pocock-skills`.

## Process

### 1. Gather primary sources

Explore the repo if needed. Read the decision handoff in the conversation, the relevant glossary, ADRs, prototypes, and existing interfaces. Use the project's domain vocabulary.

Build a source index before drafting. Preserve decision IDs from the handoff. When another primary source has no stable ID, assign one and record the exact decision or compatibility fact plus a durable anchor. A source category such as "conversation" or "existing behaviour" is not an anchor. Account for every decision-bearing source item by mapping it to a contract claim or explicitly sourced out-of-scope statement.

Require exact source IDs for the decision-bearing contract: observable outcomes, invariants, public interface and error semantics, and hard-to-reverse architectural choices. Scenarios cite the decisions they exercise. Code can supply pinned compatibility facts, but it does not create a new requirement by itself. Implementation-discoverable choices such as likely modules or file locations are not normative requirements and need no invented source ID.

If a missing decision changes observable behaviour, an invariant, an interface, or an error mode, stop and list it. Tell the user to continue `/grill-with-docs`; do not invent an answer or publish a ready spec.

### 2. Choose verification seams

Prefer an existing stable seam. Choose the highest stable seam that observes each scenario, then add a lower seam only when a complex rule needs faster feedback or a failure boundary cannot be controlled from above. There is no target number of seams.

Use an established repository seam without adding a user turn. When the choice changes an externally observable or hard-to-reverse interface contract, or several choices encode materially different caller behaviour, call the Skill tool with "codebase-design" before proposing it and confirm the choice with the user. Java visibility or an internal test seam alone does not make it a user decision.

### 3. Write and gate the spec

Write the spec using the template below. Give invariants and scenarios stable IDs so later issues and tests can trace back to them. Mark each scenario as `change` when the requested work must make it newly pass, or `preservation` when existing behaviour must stay green.

Publish only when:

- Every decision-bearing contract claim cites an exact source-index ID
- Every decision-bearing source item is represented or explicitly out of scope
- Every invariant is exercised by at least one scenario
- Every scenario maps to a verification seam and observable evidence
- Every caller-visible failure or degradation has explicit semantics
- No open decision can change behaviour, an invariant, an interface, or an error mode
- The Delivery Manifest contains every scenario ID, its exact expected-behaviour definition, and the source IDs it exercises

Publish the gated spec to the project issue tracker and apply the `ready-for-agent` triage label.

<spec-template>

## Problem Statement

The problem that the user is facing, from the user's perspective.

## Source Index

| ID | Exact decision or compatibility fact | Origin or durable anchor |
| --- | --- | --- |
| D1 | The confirmed decision in precise language | Decision handoff, ADR, prototype, or pinned compatibility evidence |

## Outcome

The observable result the user or caller needs.

## Invariants

- **I1**: A business truth that must remain true before, during, and after the change. Cite its source ID.

## Scenarios

Use the smallest complete set of happy-path, boundary, and failure scenarios that exercises every invariant. Do not add hypothetical behaviour that was never decided.

| ID | Type | Source ID | Situation | Expected behaviour |
| --- | --- | --- | --- | --- |
| S1 | change or preservation | D1 | Concrete setup and action | Caller-visible result |

## Delivery Manifest

Emit valid JSON in a fenced `json` block. `delivery_ids` contains every scenario that tickets must own. Its definition exactly matches the scenario's situation and expected behaviour in one durable sentence.

```json
{
  "schema_version": 1,
  "delivery_ids": [
    {
      "id": "S1",
      "definition": "Concrete setup and action produces the caller-visible result.",
      "source_ids": ["D1"]
    }
  ]
}
```

## Interface and Failure Contract

### Verification seams

For each seam, state the interface callers use and why that seam observes the scenarios assigned to it.

### Errors and degradation

| Trigger | Caller-visible result | Observability | Source |
| --- | --- | --- | --- |
| A specified failure condition | Error, retry, or degraded result | How an operator or caller can detect it | The decision that authorises this behaviour |

## Implementation Decisions

Include this section only when source-backed, hard-to-reverse implementation decisions constrain the solution. Cite each decision's exact source-index ID. This can include:

- Architectural decisions
- Schema changes
- API contracts
- Required cross-system interactions

Do not promote implementation-discoverable module selection, file placement, or local refactoring choices into sourced requirements.

Do NOT include specific file paths or code snippets. They may end up being outdated very quickly.

Exception: if a prototype produced a snippet that encodes a decision more precisely than prose can (state machine, reducer, schema, type shape), inline it within the relevant decision and note briefly that it came from a prototype. Trim to the decision-rich parts, not a working demo, just the important bits.

## Verification

| Scenario | Seam | Evidence |
| --- | --- | --- |
| S1 | The agreed public seam | The test, command, or observable result that proves the scenario |

## Out of Scope

A description of the things that are out of scope for this spec.

## Known Unknowns

Implementation-discoverable facts that do not change behaviour, invariants, interfaces, or error modes. This section must contain no blocking product or design decision when the spec is published.

</spec-template>
