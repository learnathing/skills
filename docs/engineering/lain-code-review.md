## What it does

`lain-code-review` reviews committed or working-tree changes since a fixed point along three independent axes. **Standards** checks repository rules, **Spec** checks requested behaviour, and **Design** checks readability, rule locality, interface depth, failure semantics, and test stability.

Each axis runs in an independent [sub-agent](https://www.aihero.dev/ai-coding-dictionary/subagent). The coordinator then verifies every citation against the current code before reporting it. The output is a read-only evidence report and a blocker gate, not an automatic rewrite.

## When to reach for it

Type `/lain-code-review`, or the [agent](https://www.aihero.dev/ai-coding-dictionary/agent) reaches for it when you ask to review a branch, PR, working tree, or work since a fixed point.

| Your situation | Reach for |
| --- | --- |
| Review committed branch work | `lain-code-review` with a fixed point and HEAD target |
| Review implementation before commit | `lain-code-review` with a fixed point and working-tree target |
| Verify that reported fixes resolved the findings | `lain-code-review` in verification mode with the previous report |
| Build the work and close the gate automatically | [lain-implement](https://aihero.dev/skills-implement) |
| Diagnose a known failure | [lain-diagnosing-bugs](https://aihero.dev/skills-diagnosing-bugs) |

## Prerequisites

The fixed point must resolve. The Spec axis needs an originating issue or [spec](https://www.aihero.dev/ai-coding-dictionary/spec); without one, that axis is skipped rather than inferred. Tracker lookup uses the configuration written by [lain-setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills).

## The three axes

| Axis | Reads | Reports |
| --- | --- | --- |
| Standards | Repository instructions | Violations of applicable documented rules |
| Spec | Authoritative originating source plus any implementation contract used as a coverage index | Source decisions omitted or distorted in rehydration, missing behaviour, wrong behaviour, and unsupported scope |
| Design | Changed modules, immediate callers and dependencies, domain docs, and agreed seams | Unreadable main paths, scattered rules, shallow interfaces, untraceable fallbacks, speculative abstractions, brittle tests |

Every finding carries a severity, code evidence, governing source when one exists, concrete impact, and smallest fix. Preferences and uncited heuristics are dropped by the coordinator.

The gate passes when no verified blocker exists on any axis. Advisories remain visible but cannot become blockers by accumulation.

## Verification mode

A verification pass consumes the previous report and finding dispositions. It checks whether those findings were resolved or rejected with evidence, then runs a full blocker-only scan of the current target. It does not search for new advisories. This catches blockers missed by the first pass while giving [lain-implement](https://aihero.dev/skills-implement) a progress-bounded convergence loop.

## Common questions

**Does it review uncommitted and untracked work?**

Yes in working-tree mode. It resolves the merge base of the fixed point and HEAD, compares that base to the working tree, and inspects every task-scope untracked file because Git diffs omit them. It lists exclusions for generated artifacts, unreadable binary content, and pre-existing baseline files. A caller can provide that baseline so unrelated user changes are excluded from findings.

**Can sub-agents recursively invoke the review again?**

The axis briefs explicitly forbid invoking `lain-code-review`, calling skills, or spawning more agents. The coordinator remains the only aggregation point.

**Why does verification scan the whole target again?**

Heuristic review is non-deterministic, so checking only the fix hunks can preserve a blocker missed on the first pass. Verification scans all task changes for blockers but excludes fresh advisories, keeping the safety check broad and the work loop bounded.

**Can I trust every finding?**

Treat findings as evidence-backed hypotheses. The coordinator verifies citations before reporting, but the human or implementing agent should still evaluate the stated impact and smallest fix.

**Should I review each ticket or only the full branch?**

Do both for multi-ticket work. Per-ticket review keeps the source contract narrow. A final fresh-session branch review catches interactions and naming drift across independently implemented slices.

## It's working if

- A bad fixed point or empty target fails before any sub-agent starts.
- HEAD mode states whether working-tree changes are excluded; working-tree mode includes all task-scope untracked files and lists exclusions.
- Cross-axis reports of the same underlying impact are counted once.
- The report has separate Standards, Spec, and Design sections.
- Every finding has accurate evidence and a concrete impact.
- The gate distinguishes blockers from advisories without blending the axes.
- Verification mode resolves the previous report and can find a missed blocker without generating a fresh advisory list.

## Where it fits

`lain-code-review` is the quality gate at the tail of the main chain:

```txt
lain-grill-with-docs → lain-to-spec → lain-to-tickets → lain-implement → lain-code-review
```

`lain-implement` invokes it before commit and enters verification mode only after blocker fixes. It also stands alone for branch and PR review. [lain-ask-matt](https://aihero.dev/skills-ask-matt) routes across the complete skill set.
