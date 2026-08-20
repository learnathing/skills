---
name: lain-code-review
description: "Review committed or working-tree changes since a fixed point along three independent axes: Standards, Spec, and Design. Use for branches, PRs, work in progress, and implementation quality gates."
---

# Code Review

Review a change along three independent axes:

- **Standards**: does it follow the repository's documented rules?
- **Spec**: does it implement the originating issue or spec without omissions or scope creep?
- **Design**: is the result readable, local, explicit about failure, and testable through stable seams?

The review is read-only. Each axis runs in an independent sub-agent, then the coordinator verifies every cited finding before reporting it.

## 1. Pin the fixed point and target

Resolve the fixed point with `git rev-parse`, then resolve the effective base with `git merge-base <fixed-point> HEAD`. Ask for the fixed point only when neither the user nor the calling skill supplied one. Fail early when either command fails.

Choose one target:

- **HEAD**: use `git diff <fixed-point>...HEAD` and `git log <effective-base>..HEAD --oneline`.
- **Working tree**: use `git diff <effective-base>`, the same commit log, and `git ls-files --others --exclude-standard`. Inspect every task-scope untracked file because Git diffs do not include it. Exclude only generated artifacts, binary content that cannot be reviewed as text, and files present in the supplied pre-existing baseline; list every exclusion.

Record `git status --short`. In HEAD mode, state whether working-tree changes are excluded. If the caller supplies a pre-existing worktree baseline, give it to each applicable sub-agent and scope findings to task changes added after that baseline. Confirm the selected target is non-empty before dispatching sub-agents.

## 2. Find sources

Find the originating spec in this order:

1. A source supplied by the user or calling skill
2. A matching file under `docs/`, `specs/`, or `.scratch/`
3. Issue references in commit messages, fetched through `docs/agents/issue-tracker.md`
4. If no spec exists, skip the Spec axis and say so. Ask only when the user explicitly requested Spec compliance and the missing source prevents that review

Find repository standards such as `AGENTS.md`, `CLAUDE.md`, `CODING_STANDARDS.md`, and `CONTRIBUTING.md`. Find the relevant `CONTEXT.md`, ADRs, and the agreed seams. Read the Design rubric in [review-rubrics.md](review-rubrics.md).

## 3. Dispatch three independent reviews

Spawn the applicable axes in parallel. Give every sub-agent the exact diff command, commit list, untracked files and exclusions, and only the sources its axis needs. Paste the Design rubric only into the Design prompt.

Every brief must say: "Perform this review directly. Do not invoke lain-code-review, call skills, or spawn additional agents. Use the required finding format. Report every blocker. Report an advisory only when its concrete impact and smallest fix fit the requested scope. Brevity must never suppress a blocker."

### Standards brief

Report every violation of an applicable documented repository rule. Cite the governing rule and changed hunk. This axis is limited to documented repository rules.

### Spec brief

Report missing or partial requirements, unrequested behaviour, and requirements implemented with the wrong observable result. When the caller supplies an implementation contract or ticket as a coverage index, first compare it with the authoritative source and report any omitted or distorted source decision. Then compare the code with the authoritative source. Quote the source scenario, invariant, or spec line for every finding. Classify a behaviour mismatch as a blocker and unsupported but harmless scope as advisory.

### Design brief

Reconstruct the main path, then inspect immediate callers and dependencies. Apply every Design rubric item. Cite the hunk and concrete impact. Pay particular attention to failure behaviour that has no source decision and abstractions that expose more knowledge than they hide.

## 4. Verify and aggregate

For every proposed finding, inspect the cited source and current target. Drop findings with a wrong location, missing source, or impact not supported by the code.

Report verified findings under `## Standards`, `## Spec`, and `## Design`. Keep the axes separate. If two axes identify the same underlying impact, keep one finding under the axis that owns its governing source and note the corroboration instead of counting it twice. Within each axis, list blockers before advisories.

End with a gate summary:

- **PASS**: no verified blocker on any axis
- **FAIL**: one or more verified blockers, listed by axis

Do not turn advisories into blockers by accumulation.

## Verification mode

When given a previous review report, first report each previous finding as `resolved`, `unresolved`, or `rejected with supporting evidence`. Then run a full blocker-only scan of the current target, including unchanged task hunks that the first pass may have missed. The pass scope is prior dispositions plus blockers. This is the progress-bounded repair verification used by `lain-implement`.
