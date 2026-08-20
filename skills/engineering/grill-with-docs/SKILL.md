---
name: grill-with-docs
description: A relentless interview to sharpen a plan or design, which also creates docs (ADR's and glossary) as we go.
disable-model-invocation: true
---

Call the Skill tool twice, for "grilling" and "domain-modeling".

Work only the **decision-bearing frontier**: branches that change observable behaviour, a domain invariant, a public interface or error mode, or a hard-to-reverse choice. Facts discoverable from the codebase are the agent's work. Implementation details that can safely wait for implementation are not design branches.

Assign every confirmed decision a stable source ID (`D1`, `D2`, ...), keeping its exact meaning and origin. Assign unresolved branches `O1`, `O2`, ...; never reuse or renumber an ID.

Before finishing, write a concise **decision handoff** into the conversation:

- A source index: ID, exact decision, and origin
- Outcomes the change must produce, citing decision IDs
- Domain invariants it must preserve, citing decision IDs
- Caller-visible failure and degradation decisions, citing decision IDs
- Explicitly excluded behaviour, citing decision IDs
- Open decisions, using open IDs

The handoff is not a glossary and must not be written into `CONTEXT.md`. `domain-modeling` still owns glossary updates and ADRs.

The session is complete when every decision-bearing branch is either resolved or listed as open. If an open decision changes behaviour, an invariant, an interface, or an error mode, say that the work is not ready for `to-spec` yet.
