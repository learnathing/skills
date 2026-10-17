---
name: lain-grill-with-docs
description: Clarify requirements and consequential design choices, preserving domain language and a source-backed decision handoff.
disable-model-invocation: true
---

When writing the artifacts described here, call the Skill tool with "lain-writing-for-agents" in artifact mode. Reuse the reference when already loaded. If unavailable, disclose once and draft directly without weakening existing gates. The decision handoff starts with the agreed outcome, scope and material open choices. Place the source index after the understandable agreement, preserving exact decisions, acceptance examples and authority. This is the same handoff, not an additional summary or approval ceremony.

Call the Skill tool with "lain-grilling".

Read relevant existing domain definitions without starting a terminology exercise. Only if a material domain ambiguity remains after source inspection, a genuinely new project concept needs a definition, or a qualifying ADR is needed, call the Skill tool with "lain-domain-modeling". An explicit request to build or revise the domain model also qualifies. Clear synonyms, passive glossary reading and ordinary internal naming do not trigger it. If the needed skill is unavailable, disclose the limitation and keep the affected meaning unresolved rather than inventing a definition.

## Establish the requirement

Use the request, prior decisions and relevant evidence to establish whose problem this change solves, the situation, observable success, current scope and exclusions. Check relevant failure modes and constraints for gaps that could change the outcome. This is a coverage check, not a fixed questionnaire: infer routine context, reuse settled answers, and skip irrelevant dimensions. Challenge a proposed solution when it would not solve the stated problem; do not require a new business case or metric for an already clear change.

Work the **decision-bearing frontier**, distinguishing agent work from questions for the user. Observable behavior, invariants, interfaces, failure modes and hard-to-reverse choices need supported decisions, but they do not all need a new user answer. Investigate facts and resolve design choices within the existing intent and authority. Ask only when a material difference remains that sources or delegation cannot settle, with a recommended outcome and its consequences. Do not require the user to choose data structures or learn implementation jargon to finish a product interview. Stop questioning once this scope no longer needs human input; unresolved technical evidence still affects readiness.

Once the requested scope is clear, reuse a still-applicable technical assessment or call the Skill tool with "lain-technical-design" in assessment-only mode. If it identifies a design gap, use design mode within the authorized planning scope; bring back only choices that require human authority. An interview-only request does not authorize experiments or implementation.

## Preserve the agreement

Reuse existing source IDs. Assign new accepted decisions stable IDs (`D1`, `D2`, ...), recording exact meaning and origin, including whether a choice was made by the user or by the agent under identified authority. Keep recommendations and unsupported interpretations distinct from accepted decisions. Assign unresolved branches `O1`, `O2`, ...; never reuse or renumber an ID. Qualify IDs by source when combining handoffs; preserve superseded decisions and identify their replacements when meaning changes.

Before finishing, write a concise **decision handoff** into the conversation. Combine related items and omit empty sections; preserve:

- The problem, current scope and observable outcomes, with their sources
- A source index: ID, exact decision, origin and supporting confirmation or delegated authority
- Domain invariants, caller-visible failure and degradation semantics, and explicitly excluded behaviour, citing decision IDs
- Concrete acceptance examples sufficient to distinguish plausible competing interpretations, with expected results and decision IDs; reuse examples already discussed rather than inventing requirements or an exhaustive test suite
- Open decisions with their affected scopes; safely deferred questions with revisit conditions
- When relevant, accepted technical decision revisions, evidence and verification obligations

`CONTEXT.md` remains a glossary. `lain-domain-modeling` owns glossary updates and qualifying ADRs; neither replaces the requirement handoff.

## Close without adding an approval ritual

Check the combined handoff against the user's request and decisions, not just whether each question received an answer. Its requirement meaning, scope and acceptance semantics need support from existing confirmation or applicable delegated authority. Straightforward synthesis and examples that preserve that meaning need no new approval. Show the handoff and continue work already authorized when its prerequisites are settled.

When synthesis introduces a consequential interpretation not covered by that support, show the specific difference and resolve only that choice with its authorized owner. Silence or a request to stop is not acceptance. "Use your recommendations" can accept the recommendations it refers to; do not extend it to undisclosed choices unless the user delegated those too. Record agent-made choices as such, rather than attributing them to the user.

Ending the interview is distinct from requirements alignment, technical readiness and authorization for the next action. State the applicable status and evidence briefly, without mandatory status tables. If the user stops early, hand back what is settled and what remains open. If an open decision changes behaviour, an invariant, an interface, an error mode or a critical technical prerequisite of the current scope, that scope is not ready for a ready `lain-to-spec` publication or implementation. Independent ready scopes may proceed within existing authorization.

For an actual cross-session or cross-agent handoff, preserve the agreement in an authorized durable source using the project's existing issue or document convention. Include scope, revision, exact decision definitions and origins, acceptance examples, confirmation or delegation evidence, and remaining questions. Reuse an existing source rather than maintaining competing copies; preserve prior revisions when meaning changes. Do not create a new document merely to certify a bounded same-session task; honor an explicit request for a document. If writing is unavailable or disallowed, provide the portable handoff in the conversation and disclose that it has not been saved; do not claim cross-session recovery or block independent authorized work.
