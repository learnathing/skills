# Technical decision handoff

Use this only when new design is needed. Reuse cases stay in the existing contract. Follow the project's configured paths; absent a convention, shared designs can live under `docs/design/` and experiment records under `docs/experiments/`. Create files lazily.

## Minimum design note

- **Scope and source**: the capability or delivery wave, required outcomes, relevant source IDs, existing implementation and constraints.
- **Solution delta**: what changes and why the old solution is insufficient. Include only relevant data, algorithm, runtime, security, deployment or recovery details. A logical model is not a mandate to create one table per concept.
- **Accepted decisions**: stable scoped ID such as `kb:C1`, revision such as `1`, exact meaning, authority, source anchor, evidence, and affected scopes. Separate required constraints from tunable choices. Increment a decision's revision when its meaning changes, not when unrelated prose changes.
- **Evidence**: commands and results, fixed data or environment versions, experiment records, compatibility facts, and limitations. Reference evidence rather than copying large logs into every ticket.
- **Open and deferred**: question ID, affected scope, blocker or defer status, and unblock/revisit condition. Never present a deferred critical prerequisite as ready.
- **Verification and delivery**: behavior, quality, integration, migration and recovery checks that are actually relevant; identify the responsible delivery scenario and execution environment. Code complete, integrated, and releasable are different claims.

A decision can be proposed, accepted, deferred, or superseded. Acceptance comes from explicit task/project authority or a human decision, never a guessed approval. Preserve prior meanings and source provenance. Reviewers need only the relevant subset, not every historical ADR.

## Scope readiness

State the particular scope that can proceed and the source/evidence on which it relies. A project can contain ready and blocked scopes simultaneously. Do not force future capabilities into a premature global spec. If an unresolved shared identity or permissions model affects two capabilities, neither is ready merely because each has a local plan.

## Shared constraints in delivery

The authoritative spec's Delivery Manifest may include `technical_constraints`. Use scoped IDs across specs. Each entry pins one accepted definition and source, the delivery IDs it applies to, and one affected delivery ID responsible for verifying it. `Owns` remains exclusive delivery ownership; `Applies` is shared compliance; `Verifies` is the assigned verification obligation.

Only encode source-backed constraints that actually bind delivery. Local algorithms, file positions, speculative reuse and advisory ideas need no registry entry. [DELIVERY-CONSTRAINTS.md](DELIVERY-CONSTRAINTS.md) owns the optional serialization; the ticket skill owns its executable validator. Do not copy competing schemas into other skills.

When a decision changes, update its source first, identify affected specs and tickets, update their manifest references, rerun structural validation and the affected cold-reader/verification sample, then re-establish readiness. Do not silently rewrite all tickets, and do not mutate stable scenario meanings under unchanged IDs.
