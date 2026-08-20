## What it does

`implement` builds one bounded issue or spec through an evidence-bearing state machine. It rehydrates the contract, reconciles top-down intent with bottom-up code constraints, drives [tdd](https://aihero.dev/skills-tdd), and reviews the working tree before committing. It enters repair verification only when the review finds a blocker.

Passing tests are an intermediate state. Completion requires traceable evidence, authorised semantics for every fallback actually introduced, and a review gate with no unresolved blocker.

## When to reach for it

You invoke this by typing `/implement`; the [agent](https://www.aihero.dev/ai-coding-dictionary/agent) will not reach for it on its own.

| What you have | Reach for |
| --- | --- |
| One implementation issue with a contract | `implement` |
| A small settled change in the current [session](https://www.aihero.dev/ai-coding-dictionary/session) | `implement` directly |
| Several issues | One fresh `implement` session per unblocked issue |
| Requirements or failure behaviour still unresolved | [grill-with-docs](https://aihero.dev/skills-grill-with-docs) or [to-spec](https://aihero.dev/skills-to-spec) first |

## Prerequisites

Check that the current branch is the intended destination. The skill records the initial `HEAD`, status, tracked diff, and untracked files as a baseline. Overlapping user changes stop for an ownership decision; disjoint changes are passed to review as excluded baseline and left out of the task commit. Tracker-backed issues depend on the configuration written by [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills).

## Reconciliation as the join

The source contract is the top-down view: outcomes, invariants, interfaces, and failure semantics. Code exploration is the bottom-up view: current callers, dependency constraints, transactions, data, and external systems. `implement` follows changed scenarios through both views before coding.

It records mismatches and newly discovered constraints, not a table whose completed rows merely assert success. A mismatch that changes behaviour returns to the source contract. A same-session route uses the conversation's decision handoff as its source and assigns IDs when needed, so skipping a durable spec does not mean skipping Spec review.

## The fallback register

Every new path that substitutes for missing, invalid, or failed required behaviour records its source decision, trigger, caller-visible result, and observability. This includes fallback defaults, retries, caught exceptions, compatibility paths, and degraded results. Ordinary initial values and contract-required defaults do not count.

The skill records actual fallback entries only, and absence needs no register entry. The independent Design review inspects the diff. An entry without a source decision blocks completion.

## Bounded review

The first [code-review](https://aihero.dev/skills-code-review) pass examines the working tree against the pinned fixed point. The original issue, spec, or decision handoff remains the authoritative Spec source; the rehydrated contract is only a coverage index, so review can detect an omission in the rehydration itself. A clean blocker gate ends review immediately. When blockers exist, the skill repairs them and runs verification over prior dispositions plus a full blocker-only scan. Repair continues only while blocker progress is real and fixes remain in scope. A repeated blocker, contract expansion, or caller-provided budget exhaustion stops without commit. New advisories are out of scope during verification.

## Common questions

**Can review see uncommitted changes now?**

Yes. `implement` explicitly calls `code-review` in working-tree mode, including untracked source files, before the commit.

**Does it act on review findings?**

Yes. Every blocker is fixed or rejected with evidence. Advisories are fixed only when their concrete benefit fits the ticket; otherwise they remain visible without becoming a user approval gate.

**Can I point it at several tickets at once?**

No. One run owns one bounded issue. Use separate worktrees for parallel sessions, and run a final branch-level review after all issue frontiers complete.

**Does it close the tracker issue?**

No. The workflow proves and commits the implementation; tracker closure remains separate unless your repository instructions explicitly add it.

## It's working if

- The run begins with a fixed point, working-tree status, and implementation contract.
- Every acceptance criterion maps to observable evidence.
- Change scenarios show real red and green evidence, plus post-refactor evidence when code changed after Green.
- Every fallback actually introduced has source-backed semantics and observability.
- The first review sees uncommitted work and every blocker receives a disposition.
- A clean first review does not trigger a ceremonial second pass.
- A blocker that repeats without progress or requires contract expansion stops the commit.

## Where it fits

`implement` is the build-and-converge step of the main chain:

```txt
grill-with-docs → to-spec → to-tickets → implement → code-review
```

[to-tickets](https://aihero.dev/skills-to-tickets) produces the fresh-context contract. `implement` drives `tdd` and calls `code-review` as its quality gate. [ask-matt](https://aihero.dev/skills-ask-matt) routes across the full set.
