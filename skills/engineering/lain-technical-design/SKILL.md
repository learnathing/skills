---
name: lain-technical-design
description: "Resolve technical risk before committing work to an implementation route. Use when requirements leave shared interfaces, data identity, algorithms, failure semantics, migrations, security, capacity, or cross-ticket decisions unsettled, or when another skill needs a readiness assessment."
---

# Technical Design

Choose the **minimum sufficient design** for the current delivery scope. Risk determines design depth; coordination determines whether work needs multiple sessions. A small authorization change can need design; a large mechanical change can reuse it.

## 1. Assess before expanding

Read the request, relevant code and tests, existing design and ADRs, and `docs/agents/engineering.md` when present. Its absence is not a setup blocker. Inspect only the affected surface and immediate dependencies. Identify evidence for existing constraints before asking questions.

Check whether the change introduces or changes shared interfaces, authoritative data or persistent identity, consistency or failure semantics, algorithms with unverified quality or capacity, permissions or data handling, external cost or infrastructure, migration or recovery. These are triggers to investigate, not mandatory document sections.

Return one disposition, with concrete source or code anchors and any unresolved risk:

- **reuse**: current design supports this scope. Put a brief reference in the existing handoff or implementation contract; create no design file, ADR, interview, or experiment merely to certify reuse.
- **design-needed**: a bounded technical decision or evidence gap must be resolved before the affected work starts. Identify the smallest missing decision and affected scenarios.
- **blocked**: necessary authority, access, evidence, or a shared prerequisite is unavailable. Name what would unblock it; do not silently choose a default.

An **assessment-only** caller stops here. It may also read [DELIVERY-CONSTRAINTS.md](DELIVERY-CONSTRAINTS.md) when explicitly asked for the serialization reference, without advancing into design. Assessment does not authorize new decisions, interviews, experiments, publication, or file edits. In design mode, continue only within the caller's authorized scope. Do not restart a settled interview or reopen unaffected decisions.

## 2. Resolve the actual technical question

Separate facts to investigate from choices to make. Fetch documentation or inspect code for facts. Call the Skill tool with "lain-research" when outside research is needed. When a module's shape is in question, call the Skill tool with "lain-codebase-design". Use its interface discipline without treating it as a complete system architecture checklist.

Cover only relevant parts of the solution: module responsibilities and interactions; logical data identity, ownership and invariants; algorithm candidates and evaluation; runtime paths and partial failure; security and quality constraints; deployment, compatibility, migration and recovery. Record why a consequential alternative was rejected, not ceremonial alternatives for an obvious local change.

For a runnable feasibility, retrieval-quality, capacity, or migration question, call the Skill tool with "lain-prototype" in technical-experiment mode. Research establishes reported facts; an executed experiment supplies measured evidence. Neither a plausible design nor passing behavior tests proves an unmeasured quality claim.

Facts are the agent's work. Make reversible technical choices within explicit project or task authority and record that authority and the evidence. Ask the authorized human only for unresolved product semantics, material cost, data handling, irreversible trade-offs, or a choice outside that authority. Never attribute an agent recommendation to the user. Design discussion alone does not authorize paid resources, production changes, or sending private data elsewhere.

## 3. Capture only what downstream work needs

Use the existing issue or a short design note for a bounded change. A cross-session or shared decision needs a durable source; use [ARTIFACTS.md](ARTIFACTS.md). When a spec or ticket needs binding shared constraints, read [DELIVERY-CONSTRAINTS.md](DELIVERY-CONSTRAINTS.md) for the optional manifest and ticket serialization. Do not load it for ordinary reuse work. Preserve original IDs and qualify them by source scope when combining documents.

Record accepted constraints separately from tunable implementation choices, blocking questions, and deferred questions. A deferred question needs a revisit trigger or latest responsible point and the scopes it can affect. Do not put implementation details in `CONTEXT.md`; call the Skill tool with "lain-domain-modeling" only when terminology or a worthwhile ADR actually changes.

Specs own required behavior and binding constraints. Design notes explain the current solution and evidence. ADRs explain enduring trade-offs. Link them instead of keeping conflicting copies. Never promote local file placement or experimental parameters into product requirements. New constraints must return to the authoritative source before implementation tickets rely on them.

## 4. Gate a scope, not an entire project

A delivery scope is **ready** only when its shared decisions are accepted within authority, no unresolved critical assumption underlies its implementation, and each binding constraint has an identified verification obligation. Evidence required to accept a decision before implementation must exist, or the uncertain work must be isolated as an experiment that does not promise production behavior. Delivery-time proof remains an assigned verification obligation, not a prerequisite to writing the implementation. Mark missing or inconclusive evidence honestly.

For a large effort, keep a thin system baseline and design capabilities near implementation. Record which scope is ready, which prerequisite remains open, and what evidence supports that distinction. Recommend `/lain-wayfinder` to the human when coordination needs a decision map; never invoke that user-invoked skill. Unrelated ready scopes can proceed while others remain blocked.

On a shared decision change, preserve the old revision, record the replacement and reason, find affected source and ticket references, and recheck only those scopes. A prose-only edit does not invalidate every ticket. A pinned source does not justify implementing a known-obsolete contract. Do not edit another session's scope or a published contract without resolving ownership and authority.

## Completion evidence

Return the disposition, affected scope, durable decisions or reuse anchors, actual evidence, unresolved or deferred questions, and the next authorized action. Do not claim readiness from a completed checklist alone. A small reuse case needs only the short anchored conclusion; it does not need empty registers. Structural validators can check references, not architectural sufficiency, source freshness, experiment quality, or human approval.
