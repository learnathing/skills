---
name: lain-ask-matt
description: Ask which skill or flow fits your situation. A router over the skills in this repo.
disable-model-invocation: true
---

# Ask Matt

You don't remember every skill, so ask.

Before finalising a route, read the `SKILL.md` for each candidate whose boundary decides the branch. After choosing, read the recommended next step. Do not load unrelated skills. This file owns routing conditions; each source skill owns its internal workflow. If they disagree, the source skill wins.

A **flow** is a path through the skills. Most paths run along one **main flow**, with situational **on-ramps**. Everything else is standalone or a reusable discipline underneath.

## The main flow: idea → ship

Technical risk decides design depth; session count decides coordination. Routing advice alone does not authorize an interview, experiment, or implementation.

| Technical situation | Route before building |
| --- | --- |
| A settled change fits existing design | Direct `/lain-implement`; no ceremonial grill, spec, design note or tickets |
| A bounded shared interface, data, algorithm, failure, security or migration decision is unsettled | `/lain-technical-design`, or `/lain-grill-with-docs` for unresolved product choices |
| Several scopes depend on unresolved shared decisions that exceed one planning session | `/lain-wayfinder`, using a thin baseline and scope-by-scope technical design |

`/lain-technical-design` is model-invoked and can also be typed directly. It distinguishes reuse, a bounded design gap, and a blocker; it owns the risk rules and optional shared-constraint handoff. Main-flow entry points also check readiness, so bypassing this router does not bypass the precondition.

1. **Does the request need clarification?** Use **`/lain-grill-with-docs`** when decisions need an interview and you are working in a working directory. It retains domain vocabulary and qualifying ADRs. Without a working directory, use **`/lain-grill-me`**. Skip a new interview for a settled request; do not ask again for existing decisions or codebase-answerable facts.
2. **Does a question need evidence beyond discussion?**
   - **UI or logic interaction** → `/lain-prototype` for a throwaway artifact to react to.
   - **Technical feasibility, retrieval quality, capacity or migration** → `/lain-prototype` in technical-experiment mode, with a baseline, reproducible commands and actual evidence.
   - **External facts** → `/lain-research`, then return its source-backed findings to the decision.

   Use `/lain-handoff` only when actually moving to a new directory, harness, colleague or side session. An experiment in the same workspace does not require a ceremonial context switch. Return validated decisions to the authoritative source before treating the scope as buildable.
3. **Is this a multi-session build, and is the current scope ready?**
   - **Yes** → **`/lain-to-spec`**, then **`/lain-to-tickets`**, then a fresh **`/lain-implement`** session for each unblocked ticket. Run relevant integration checks as slices land, then one branch-level `/lain-code-review` from a fresh session after all tickets finish.
   - **No, it is ready and bounded** → **`/lain-implement`** in the current session.
   - **Not ready** → resolve only the blocking source decision or evidence gap; session capacity is not evidence of technical readiness.

Read `/lain-implement` before recommending the build step; it owns the build and quality-gate protocol. Reach for **`/lain-tdd`** on its own for concrete behavior built test-first, and **`/lain-code-review`** to review a branch, PR, or working tree against a fixed point.

### Context hygiene

Prefer a continuous context for bounded planning when it fits. Large efforts must not rely on one ever-growing conversation: retain scoped source IDs, accepted decision revisions, evidence and open dependencies in durable sources, and load only what the current capability needs. Each `/lain-implement` starts from its ticket and relevant pointers. Reuse a still-applicable assessment rather than repeating it at every phase.

Use the harness's reported remaining capacity and material still needed as a diagnostic. When capacity is unavailable, make no numeric smart-zone claim. If remaining sources, work, and verification cannot fit, compact at a phase boundary or split a bounded task as appropriate below.

## On-ramps

- **Bugs and requests piling up** → **`/lain-triage`**. It moves incoming issues through triage roles and produces agent-ready issues, which `/lain-implement` later picks up. Do not triage tickets already produced by `/lain-to-tickets`.
- **Something's broken** → **`/lain-diagnosing-bugs`**. Use it for hard bugs, intermittent flakes, and regressions. It establishes a real feedback loop and distinguishes provisional diagnosis from a verified fix. A poor verification seam can lead to `/lain-improve-codebase-architecture`.
- **A huge, foggy effort** → **`/lain-wayfinder`**. Use a shared map when planning itself cannot fit one session, not merely because delivery has many tickets. It produces decisions, not deliverables. When a capability becomes ready, hand that scope to `/lain-to-spec`, then `/lain-to-tickets` and `/lain-implement`. Independent future scopes can remain open; a shared prerequisite still blocks every dependent scope. Go straight to implementation only when the effort turned out genuinely small and its relevant decisions are recoverable.

## Codebase health

**`/lain-improve-codebase-architecture`** surveys an existing codebase for deepening opportunities. Picking a candidate creates an idea for the main flow; **`/lain-codebase-design`** is the discipline for designing its shape. A survey is not a compulsory precondition to a small change or a replacement for system-level technical design.

## Reusable disciplines underneath

- **`/lain-technical-design`** supplies risk-adaptive solution design and scope readiness. It delegates module shape to `/lain-codebase-design` and measurement to `/lain-prototype`. Binding shared constraints flow into the spec and relevant tickets; reversible local choices remain with the implementer. Optional `docs/agents/engineering.md` records existing authority and verification conventions without requiring a setup rerun.
- **`/lain-domain-modeling`** sharpens domain language and records qualifying ADRs. Reading an existing glossary alone does not invoke active domain-modeling work. `CONTEXT.md` remains a glossary, not a specification or architecture notebook.
- **`/lain-codebase-design`** supplies deep-module vocabulary for a small interface at a clean seam. It is used by TDD, architecture improvement, and technical design when module shape matters.

## Phase boundaries

A phase is a chunk of work inside a session. At a boundary between phases, choose among:

- **Continue** when the next phase needs the current context and it fits.
- **`/clear`** when nothing here matters to the next phase.
- **`/lain-handoff`** for portability to a new harness, directory, colleague or bounded side task.
- **Subagent** for a tightly scoped task with its own sources and verification.
- **`/compact`** when the other options do not fit.

Read [PHASE-BOUNDARIES.md](PHASE-BOUNDARIES.md) for the ordered decision tree. Prefer staying in context when possible, not an automatic handoff for every step. Mid-phase, continue or split the remaining bounded work instead of interrupting it for context ceremony.

## Standalone

- **`/lain-grill-me`**: stateless interviewing when there is no working directory. With a repository, `/lain-grill-with-docs` leaves the relevant domain paper trail.
- **`/lain-grilling`**: the model-invoked interview primitive. Facts are the agent's work; unresolved decisions belong to their authorized owner. It does not authorize implementation merely by completing an interview.
- **`/lain-resolving-merge-conflicts`**: an in-progress merge or rebase, resolved by intent traced to each side's source. Preserve unrelated work and respect a later instruction to stop or abort.
- **`/lain-prototype`**: a bounded UI/logic demonstration or technical experiment. The result returns to the authoritative design or spec before separately authorized production implementation. Retain the useful evidence outside production paths.
- **`/lain-research`**: source-backed investigation with a cited Markdown result. Research informs a decision; it does not replace an experiment or make the decision by itself.
- **`/lain-to-questionnaire`**: a decision depends on someone else's knowledge. It clarifies the recipient and needed response, not the underlying decision on their behalf.
- **`/lain-wizard`**: procedures that genuinely require human action, such as credentials, infrastructure access or an approved cutover. It is not a reason to delegate work the agent can safely perform itself, and it does not authorize production changes.
- **`/lain-wait-what`**: clarify a message that did not land, with the missing context and domain vocabulary.
- **`/lain-teach`**: a stateful learning workspace across sessions.
- **`/lain-writing-for-agents`**: the reference for writing skills, repository instructions and their supporting documents.

## Precondition

**`/lain-setup-matt-pocock-skills`** configures the tracker, triage labels and domain-document layout used by tracker-dependent routes. It is user-invoked; recommend it to the human when a required configuration is missing. Do not mistake a user-invoked skill hidden from model invocation for an uninstalled skill. The optional engineering-policy file is not a new mandatory setup step.
