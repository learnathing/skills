---
name: lain-domain-modeling
description: Resolve material domain ambiguity and preserve project-specific meanings. Use when behavior depends on conflicting domain definitions, a new project concept needs a definition, the user asks to build or revise a domain model or glossary, or a qualifying ADR needs recording or revision.
---

When writing the artifacts described here, call the Skill tool with "lain-writing-for-agents" in artifact mode. Reuse the reference when already loaded. If unavailable, disclose once and draft directly without weakening existing gates. A glossary defines the concept in plain domain language, with a distinguishing example only when needed, not a chain of other undefined terms. An ADR leads with the choice, reason and consequential trade-off, keeping proposal/acceptance and supersession clear. Preserve existing document names, the glossary-only boundary and the three-part ADR eligibility test; do not require more headings or records.

# Domain Modeling

Reuse accurate established names before creating vocabulary. Relevant standards and mature industry terminology supply defaults; existing project interfaces, product names and sourced domain meanings still matter. Verify a disputed technical definition from its primary source instead of inventing an authoritative-sounding term. Do not silently rename a public API or product concept to match a preferred glossary.

This is active domain work, not a mandatory companion to every interview. If the task only needs existing vocabulary and the meaning is clear, read the relevant definitions and return without a naming discussion or document edit. Ordinary internal naming within an implementation task stays with the agent. Record project-specific meanings and necessary distinctions, not a general technical encyclopedia.

## File structure

Most repos have a single context:

```
/
├── CONTEXT.md
├── docs/
│   └── adr/
│       ├── 0001-event-sourced-orders.md
│       └── 0002-postgres-for-write-model.md
└── src/
```

If a `CONTEXT-MAP.md` exists at the root, the repo has multiple contexts. The map points to where each one lives:

```
/
├── CONTEXT-MAP.md
├── docs/
│   └── adr/                          ← system-wide decisions
├── src/
│   ├── ordering/
│   │   ├── CONTEXT.md
│   │   └── docs/adr/                 ← context-specific decisions
│   └── billing/
│       ├── CONTEXT.md
│       └── docs/adr/
```

Create files lazily: only when you have something to write. If no `CONTEXT.md` exists, create one when the first term is resolved. If no `docs/adr/` exists, create it when the first ADR is needed.

## During the session

### Resolve meaning, not harmless synonyms

Inspect the relevant glossary, accepted decisions, request and code. When context makes a synonym unambiguous, use the established term without interrupting. A different word alone is not a domain conflict. A familiar industry term can still have several meanings in this project; do not erase those differences by choosing the most common one.

Investigate a real mismatch before asking. Existing code is evidence of behavior, not automatic authority to override the requirement. Resolve choices supported by existing intent or delegation. If competing meanings still change observable behavior, an interface, data ownership or acceptance, describe the concrete difference and ask only its authorized owner. Include your recommendation and trade-off, not a request to select an abstract label.

### Use scenarios to distinguish outcomes

Use the smallest relevant example that separates plausible interpretations. Label hypothetical probes as examples, not accepted requirements. Inspect or test a factual question within the task's authority instead of turning every edge case into a user question. Stop once the material distinction is resolved; do not expand a domain model merely to exhaust possible cases.

### Retain only useful project definitions

When a genuinely needed definition is settled within authority, update the configured glossary at that point using [CONTEXT-FORMAT.md](./CONTEXT-FORMAT.md). Preserve existing document names and unrelated content. Prefer plain established terms; coin a local name only when existing language cannot express a real distinction, and explain that distinction. Do not rename stable symbols for style.

`CONTEXT.md` remains a glossary, not a spec, scratch pad or implementation notebook. Keep required behavior and its decision provenance in the authoritative handoff or spec. A glossary needs no entry for a standard technical term whose ordinary meaning is sufficient. If nothing material changed, make no edit. Source conflicts, unresolved meanings and unaccepted proposals must stay distinguishable from accepted definitions.

### Offer ADRs sparingly

Only offer to create an ADR when all three are true:

1. **Hard to reverse**: the cost of changing your mind later is meaningful
2. **Surprising without context**: a future reader will wonder "why did they do it this way?"
3. **The result of a real trade-off**: there were genuine alternatives and you picked one for specific reasons

If any of the three is missing, skip the ADR. Use the format in [ADR-FORMAT.md](./ADR-FORMAT.md).
