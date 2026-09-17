---
name: lain-grill-with-docs
description: A relentless interview to sharpen a plan or design, which also creates docs (ADR's and glossary) as we go.
disable-model-invocation: true
---

Call the Skill tool twice, for "lain-grilling" and "lain-domain-modeling".

Work only the **decision-bearing frontier**: branches that change observable behaviour, a domain invariant, a public interface or error mode, or a hard-to-reverse choice. Facts discoverable from the codebase are the agent's work. Implementation details that can safely wait for implementation are not design branches.

Once the requested scope is clear, reuse a still-applicable technical assessment or call the Skill tool with "lain-technical-design" in assessment-only mode. If it identifies a design gap, use design mode within the authorized planning scope; bring back only choices that require human authority. Do not make the user research code or choose every algorithm parameter. An interview-only request does not authorize experiments or implementation.

Assign every confirmed decision a stable source ID (`D1`, `D2`, ...), keeping its exact meaning and origin. Assign unresolved branches `O1`, `O2`, ...; never reuse or renumber an ID.

Before finishing, write a concise **decision handoff** into the conversation:

- A source index: ID, exact decision, and origin
- Outcomes the change must produce, citing decision IDs
- Domain invariants it must preserve, citing decision IDs
- Caller-visible failure and degradation decisions, citing decision IDs
- Explicitly excluded behaviour, citing decision IDs
- Open decisions, using open IDs
- When relevant, the ready delivery scope, accepted technical decision revisions and evidence, and deferred questions with revisit conditions

The handoff is not a glossary and must not be written into `CONTEXT.md`. `lain-domain-modeling` still owns glossary updates and ADRs.

The session is complete when every decision-bearing branch is either resolved or listed as open. If an open decision changes behaviour, an invariant, an interface, an error mode, or a critical technical prerequisite of the current scope, say that the scope is not ready for a ready `lain-to-spec` publication yet. Future scopes may remain open without blocking a genuinely independent ready scope.
