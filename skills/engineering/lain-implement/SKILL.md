---
name: lain-implement
description: "Implement a piece of work based on a spec or set of tickets."
disable-model-invocation: true
---

# Implement

Implement one bounded piece of work through an evidence-bearing state machine. Green tests are an intermediate state, not completion.

## Choose the validation path

Use the full workflow below for behavior changes, uncertain contracts, or changes with material integration risk. For a settled change with no runtime behavior impact, such as prose, formatting, or a mechanical metadata correction, pin the worktree baseline, make the scoped edit, inspect the complete task diff, and run the relevant repository checks. Then commit only the task changes and report the evidence. Do not create tests, a contract table, or independent review solely to satisfy the full workflow. Explicit user requirements and repository release gates still apply.

## 1. Pin the change

Before editing, record the current `HEAD` as the fixed point, `git status --short`, the tracked diff, and the untracked file list. These form the pre-existing worktree baseline. If existing changes overlap the task, stop and resolve ownership with the user. If they are disjoint, preserve the baseline, pass it to review, and exclude it from the task commit.

## 2. Rehydrate the contract

Read the full source: an issue or spec with its comments and parent, or the current conversation's decision handoff for a same-session route. Also read relevant sibling issue titles, the domain glossary, relevant ADRs, repository instructions, and the nearest existing implementation at the intended seam. If the source has no stable IDs, assign local IDs and preserve each definition in the contract.

Write a concise implementation contract into the conversation:

- Scenario or acceptance-criterion IDs
- Scenario type: change or preservation
- Invariants
- Public seam and caller-visible success result
- Error and degradation semantics
- Out-of-scope behaviour
- Verification evidence required

This state is complete when every acceptance criterion maps to observable evidence and no caller-visible failure behaviour is left implicit.

## 3. Reconcile top down and bottom up

Trace the requested behaviour from the caller down through the existing code. Then trace the implementation constraints back up from data, dependencies, transactions, and external systems.

Follow every changed scenario through its real callers and immediate dependencies. Record only mismatches, newly discovered constraints, and decisions that change the contract. Do not create a success table whose only evidence is its own completed rows. This state is complete when the implementation route is known and every material mismatch is resolved in the source or explicitly left out of scope.

If the codebase contradicts the contract in a way that changes behaviour, an invariant, an interface, or an error mode, check existing decisions, compatibility requirements, and the user's latest instructions first. If materially different caller outcomes remain unresolved, ask a focused question and pause the dependent work. Continue independent authorized work where possible. Do not hide the contradiction behind a default or fallback.

## 4. Build vertical slices

Call the Skill tool with "lain-tdd". Complete one red → green slice at a time through the agreed seam, refactoring when a slice reveals a concrete structural improvement. Run focused typechecking and tests throughout, then the repository's relevant full validation before review.

Before review, inspect the diff for every path added by the change that substitutes for missing, invalid, or failed required behaviour: a fallback default, retry, caught exception, compatibility path, or degraded result. Ordinary initial values and defaults already required by the contract are not fallbacks. Record an entry only when such a path exists:

- The source decision that authorises it
- Its trigger
- The caller-visible result
- How it is observed

An entry without a source decision is an unresolved contract problem, not implementation freedom. Evidence consists of actual entries plus the Design review's independent diff inspection; absence needs no register entry.

## 5. Review and converge

Call the Skill tool with "lain-code-review" using the pinned fixed point and the working tree as the target. Supply the original issue, spec, or decision handoff as the authoritative Spec source. Supply the implementation contract only as a coverage index, so Spec review can detect omissions in the rehydration itself. Pass the pre-existing worktree baseline as excluded scope. Give every blocker one disposition: `fixed` or `rejected with evidence`. Report advisories. Fix an advisory only when its concrete benefit fits the ticket; otherwise defer it without turning it into a user approval gate.

If the first review has no blocker, the review gate is complete and the workflow proceeds to the commit state.

If the first review has blockers, fix those that stay within the source contract and ticket scope, rerun relevant validation, then call the Skill tool with "lain-code-review" in verification mode with the previous report. Verification is limited to prior dispositions and a full blocker-only scan of the target.

Continue targeted repair and blocker-only verification while each pass resolves at least one blocker and the fixes remain within the contract and ticket. Stop when the same blocker survives a targeted repair, a fix requires a contract or scope decision, or a caller-provided review budget is exhausted. Report the blocker and do not commit. This is a progress boundary, not a fixed pass count.

## 6. Commit

Commit only the task's changes after validation passes, every actual fallback entry is authorised, and the review gate has no unresolved blocker.

Report the commit, validation evidence, actual fallback entries if any, and finding dispositions.
