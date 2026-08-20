## What it does

`to-tickets` breaks a plan, [spec](https://www.aihero.dev/ai-coding-dictionary/spec), or settled conversation into tracer-bullet implementation tickets on the configured issue tracker. Each ticket declares its blocking edges and delivers a narrow path through every required layer.

Every ticket also carries a **fresh-context contract**: the source IDs it owns, invariants, seam, success and failure semantics, pointers, and required evidence. A new [session](https://www.aihero.dev/ai-coding-dictionary/session) should not have to rediscover product decisions.

## When to reach for it

You invoke this by typing `/to-tickets`; the [agent](https://www.aihero.dev/ai-coding-dictionary/agent) will not reach for it on its own.

| Where you are | What to run |
| --- | --- |
| Decisions are unresolved | [grill-with-docs](https://aihero.dev/skills-grill-with-docs) |
| A multi-session spec is ready | `to-tickets` |
| The whole change fits one context window | [implement](https://aihero.dev/skills-implement) directly |
| A wide mechanical change cannot land as green vertical slices | `to-tickets`, using expand-contract sequencing |

## Prerequisites

[setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills) must have configured the issue tracker. A source spec works best because its invariant and scenario IDs make coverage mechanical rather than interpretive.

## The fresh-context contract

Each ticket carries:

| Field | Purpose |
| --- | --- |
| Spec trace | Names and defines the scenarios or requirements this ticket owns |
| Contract | States invariants, seam, success, and authorised failure behaviour |
| Context pointers | Links the parent spec, relevant glossary and ADR entries, and non-normative code anchors |
| Acceptance criteria | Describes externally verifiable behaviour |
| Evidence required | Names observable proof and the details required for any fallback actually introduced |
| Blocked by | Makes the dependency graph explicit |

When the source exists only in conversation, relevant source definitions are inlined into every published ticket. An ID without its meaning is not traceability. Paths remain discovery anchors, not requirements, so the ticket stays meaningful when files move.

## Coverage gate

Before showing the final breakdown, the skill stages every ticket in a common Markdown schema and runs its deterministic validator against the authoritative source's Delivery Manifest. The command checks fields, exact manifest definitions and unique ownership, acceptance-checkbox presence, edge references, and graph cycles. Semantic sufficiency remains the cold-reader's job. A fresh cold-reader receives the highest-risk ticket and one example of each materially different ticket shape. Any blocking product or design question sends that shape back for rewriting, validation, and resampling. When the harness has no fresh sub-agent, the skill marks independent sampling unavailable and discloses it.

Only the validated breakdown is presented for approval. If you request changes, the changed shape is validated again before the next approval. The published artifacts must exactly match the approved breakdown, and the validator runs once more before publication.

When model capacity is exposed, ticket and required-source size is recorded as a diagnostic. There is no universal percentage gate. A ticket is split when it owns several outcomes, has an unbounded change surface, or a cold reader cannot recover the contract with room to explore and verify.

Prefactoring becomes a separate ticket only when a named limitation in the current code blocks a required slice. General cleanup and imagined future reuse do not qualify.

## Common questions

**Why include code anchors if paths go stale?**

They reduce rediscovery cost for the next session, but they are explicitly non-normative. Behaviour, interfaces, and acceptance criteria remain the source of truth.

**Should every duplicated scenario appear in several tickets?**

No. Each source ID has one primary owner unless the duplication is intentional and explained. Shared invariants may be referenced by several tickets, but ownership of delivered behaviour stays clear.

**Is per-ticket review enough?**

No for a multi-ticket feature. Per-ticket review catches local defects. After the frontier completes, run one [code-review](https://aihero.dev/skills-code-review) against the branch point from a fresh session to catch interactions and vocabulary drift across slices.

## It's working if

- Every source scenario or requirement ID has exactly one explained owner.
- The blocking graph has no cycle.
- Each ticket is a demoable vertical slice, not a database or API layer in isolation.
- The checked-in validator exits zero on the exact approved ticket artifacts against the authoritative Delivery Manifest.
- Sampled ticket shapes pass an independent cold-reader check or disclose that sampling was unavailable.
- Prefactor tickets identify the concrete blocker they remove.

## Where it fits

`to-tickets` is the handoff from planning to fresh implementation sessions:

```txt
grill-with-docs → to-spec → to-tickets → implement → code-review
```

[to-spec](https://aihero.dev/skills-to-spec) provides traced source IDs; [implement](https://aihero.dev/skills-implement) consumes one ticket at a time. [ask-matt](https://aihero.dev/skills-ask-matt) routes across the full set.
