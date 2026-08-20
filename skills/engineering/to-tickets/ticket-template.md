# Ticket contract template

Use one artifact per ticket.

# <Identifier>: <Title>

Ticket: <Identifier>

Blocked by: Real ticket identifiers separated by commas, or `None`

Status: ready-for-agent

Owns: Delivery Manifest IDs separated by commas

What to build: The end-to-end behaviour this ticket makes work.

## Spec trace

- <Owned ID>: Exact definition copied from the Delivery Manifest

## Contract

- **Invariants:** IDs this ticket preserves
- **Seam:** interface through which behaviour is implemented and verified
- **Success:** caller-visible result
- **Failures and degradation:** only source-authorised behaviour

## Context pointers

- Durable source issue or spec
- Relevant glossary and ADR entries
- Movable code anchors, labelled non-normative

## Acceptance criteria

- [ ] Externally verifiable criterion

## Evidence required

- Observable evidence for every acceptance criterion
- Source, trigger, caller-visible result, and observability for every fallback actually introduced

For a remote tracker, add a parent reference when one exists and encode the same `Blocked by` values with native relationships where supported. For local files, use dependency-order numbering in the identifier. Keep the fields in the staged draft so the validator checks the same artifact that will be published.
