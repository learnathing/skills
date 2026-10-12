# Ticket contract template

Use one artifact per ticket. Call the Skill tool with "lain-writing-for-agents" in artifact mode while drafting. If unavailable, disclose once and use this template without weakening its source or verification rules. Keep the literal field names and section headings below for the schema-v1 validator; their values and explanatory prose may use the reader's working language.

Lead with the outcome and acceptance criteria. Keep material failure behavior, invariants and shared constraints readable before the provenance fields. An ID is not a substitute for its meaning. Avoid paraphrasing the same success result under several headings; refer to an existing complete acceptance criterion when appropriate.

When the source manifest contains `technical_constraints`, add only applicable `Applies` and `Verifies` fields after `Owns`, an exact-definition `Technical trace` section, matching anchors in `Context pointers`, and assigned observations in `Evidence required`. Use the serialization supplied by `lain-technical-design`. Explain the material constraint in `Contract` too, with its revision, explicitly as its application to this ticket rather than another canonical definition. Omit unused fields. Do not publish these authoring instructions as ticket content.

<ticket-template>

# <Identifier>: <Observable outcome>

What to build: <The end-to-end change, who uses it, and why it matters.>

## Acceptance criteria

- [ ] <Situation and action produce an observable result; include the scenario ID.>

## Contract

- **Invariants:** <The meaning of each rule that must remain true, with its ID.>
- **Seam:** <The interface the caller uses and how its result can be observed.>
- **Success:** <Reference the complete outcome above; add only missing contract details.>
- **Failures and degradation:** <Trigger, caller-visible result, limits and authorizing source.>

<Material exclusions and shared constraints, when relevant. Do not invent behavior to fill a field.>

## Dependencies

<Each blocking ticket's title, identifier and why its result is needed; or no dependencies. A scoped dependency graph may supplement this when several relationships are hard to follow, never inventing extra blockers.>

## Evidence required

- <Test, command or observation required for each acceptance criterion; planned, not claimed executed.>
- <Source, trigger, caller-visible result and observability for any fallback actually introduced.>

## Delivery metadata

Ticket: <Identifier>

Blocked by: <Real ticket identifiers separated by commas, or None>

Status: ready-for-agent

Owns: <Delivery Manifest IDs separated by commas>

## Spec trace

- <Owned ID>: <Exact definition copied from the authoritative Delivery Manifest>

## Context pointers

- <Descriptive title and durable source issue or spec, with relevant revision or actual anchor>
- <Relevant glossary and ADR entries>
- <Movable code anchors, labelled non-normative>

</ticket-template>

When the only source is conversation, also inline the relevant source-index rows with exact definitions and origins. For a remote tracker, add a parent reference when one exists and encode the same `Blocked by` values as native relationships where supported. For local files, use dependency-order numbering. Validate the exact staged artifact that will be published. Do not translate parser keys or silently paraphrase a frozen definition as a presentation edit.

## After execution starts

Keep this same ticket readable as it changes. Under the existing authority to update the ticket, insert `## Current state` immediately after `What to build`, with `Execution:`, `Verification:`, `As of:` and `Remaining:` lines. Use actual revision/evidence links and the reader's language; leave no claimed check without evidence. State implementation, integration, independent review and release limitations separately rather than implying they advance together. Omit this section from a new untouched draft unless it has a real state to communicate.

The published `Status:` and unchecked boxes were a readiness snapshot, not an instruction to stay ready forever. Use the configured live tracker status and preserve actual checked criteria. For published local tickets run `validate-tickets.mjs <manifest> <directory> --phase=tracking`; a tracking pass never certifies completion. The default publication mode remains unchanged. Do not select already-started work from the old readiness label alone.

Before appending Comments, update the current section for new blockers, material limitations or accepted superseding decisions. Preserve history and source authority; unresolved differences stay visible without silently rewriting the accepted contract. Link evidence instead of copying whole logs. Use the artifact-mode living-document reference for source ownership, visible indexes and handoff boundaries.
