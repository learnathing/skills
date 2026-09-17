# Engineering decisions and verification

This file is optional. Read existing repository policy first. Missing configuration does not require a setup rerun and does not grant permission for costly or irreversible actions. Populate only discovered or explicitly authorized facts; omit unused sections rather than filling guesses.

## Technical sources

Use the repository's existing design, ADR, experiment and specification locations. If none exist, create `docs/design/` or `docs/experiments/` only when there is a real artifact to retain. Keep `CONTEXT.md` a domain glossary.

## Decision authority

Record who may accept product semantics, data-handling/security changes, external costs, infrastructure, and hard-to-reverse shared contracts. Record the envelope within which agents may select and tune reversible technical choices. Existing task-specific authority still applies; silence is not approval. Ask only about a missing authority that blocks the current scope.

## Verification

Record actual repository commands and environments for behavior tests, integration, quality evaluation, capacity, migration and recovery where relevant. Distinguish required checks from diagnostics. Thresholds come from accepted requirements, not this template. Do not record an unrun command as passing.

## Delivery and change

For cross-session work, retain scoped source IDs, relevant accepted constraint revisions, source/evidence anchors, and unresolved dependencies. Load only the relevant subset. On a shared decision change, update its source and impacted scopes before resuming. Integration evidence and release authorization are separate from code completion.
