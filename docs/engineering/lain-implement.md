## What it does

`lain-implement` builds one bounded issue or settled request. It restores the source contract, reconciles it with actual code and data constraints, drives TDD, reviews the working tree and commits only task-owned changes after the required gate.

Green tests are an intermediate state. Code completion does not imply that unperformed deployment, migration or production validation has passed.

## When to reach for it

You invoke `/lain-implement`; the agent does not invoke it automatically. Use it directly for a settled small change inside existing design, or once per ready implementation ticket. Several tickets need separate bounded sessions or worktrees. A consequential unresolved prerequisite is resolved before the affected implementation proceeds.

## Contract, design and evidence

The skill pins the starting HEAD, tracked changes and untracked files. Overlapping existing work requires an ownership decision; unrelated user changes remain excluded from the task commit.

The original issue, spec or decision handoff is authoritative. The reconstructed implementation contract indexes outcomes, invariants, failure semantics and verification; it does not replace the source. Relevant technical constraints add their accepted revisions, evidence and verification duties. Read only the affected subset, not the entire project's history.

An existing technical assessment may be reused when still applicable. Otherwise [technical design](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-technical-design.md) assesses the scope. Reuse means continue without a ceremonial design note, new interview or standalone spec. Reversible local choices inside authority remain implementation work; a discovered contradiction in a shared contract returns to the source and its owners.

Changed behavior has actual Red and Green evidence. Preserved behavior has baseline and final results. Run assigned quality, integration, migration and recovery checks when their gate requires them. Behavior tests cannot establish an unmeasured retrieval-quality or capacity claim. Missing required evidence stays unmet, not silently passed.

Actual fallback paths need an authorizing source, trigger, caller-visible result and observability. Ordinary contract-required defaults are not fallback entries. Production actions retain their separate authorization requirements.

## Review and completion

[Code review](https://aihero.dev/skills-code-review) receives the original source, relevant technical evidence and pre-existing worktree exclusions. Repair is blocker-driven and progress-bounded. A repeated blocker, contract expansion or exhausted caller budget stops the completion commit.

When independent review is unavailable, it must not become a synthetic PASS. A direct review can substitute only under explicit existing task or project policy; otherwise report the unmet review requirement. Distinguish implementation, integration and release readiness in the final report.

## Common questions

**Does a small change require another interview?**

No. Settled behavior and compatible existing design take the direct path. The guard discovers actual technical gaps; it does not generate paperwork.

**Can the agent improve an algorithm while implementing?**

Yes inside accepted tuning, quality and resource boundaries, with the required evidence. A new shared data identity or external data-handling decision is not ordinary tuning.

**Does it automatically close the issue or deploy?**

No, unless separately authorized. A verified implementation commit is not an implicit permission to mutate production or the tracker lifecycle.

## It's working if

- Task ownership and the starting worktree are explicit.
- Existing design is reused without unnecessary artifacts.
- Shared constraints use accepted, applicable revisions.
- Tests and required experiments have actual evidence.
- New shared contradictions are escalated rather than hidden by defaults.
- Review limitations and unperformed production steps are reported honestly.

## Where it fits

[To-tickets](https://aihero.dev/skills-to-tickets) supplies a fresh-context contract, or a settled request supplies one directly. This skill uses [TDD](https://aihero.dev/skills-tdd) and code review internally. [Ask Matt](https://aihero.dev/skills-ask-matt) chooses the appropriate route.
