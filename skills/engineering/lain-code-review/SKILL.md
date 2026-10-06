---
name: lain-code-review
description: "Review committed or working-tree changes since a fixed point against Standards, Spec, and Design with one independent reviewer. Use for branches, PRs, work in progress, and implementation quality gates."
---

# Code Review

Review a change through three complementary lenses:

- **Standards**: does it follow the repository's documented rules?
- **Spec**: does it implement the originating issue or spec without omissions or scope creep?
- **Design**: is the result readable, local, explicit about failure, and testable through stable seams?

The review is read-only. One independent reviewer covers all applicable axes, then the calling agent verifies the findings as coordinator. The axes are review responsibilities, not separate agents or mandatory sequential passes.

## 1. Pin the fixed point and target

Resolve the fixed point with `git rev-parse`, then resolve the effective base with `git merge-base <fixed-point> HEAD`. Ask for the fixed point only when neither the user nor the calling skill supplied one. Fail early when either command fails.

Choose one target:

- **HEAD**: use `git diff <fixed-point>...HEAD` and `git log <effective-base>..HEAD --oneline`.
- **Working tree**: use `git diff <effective-base>`, the same commit log, and `git ls-files --others --exclude-standard`. Inspect every task-scope untracked file because Git diffs do not include it. Exclude only generated artifacts, binary content that cannot be reviewed as text, and files present in the supplied pre-existing baseline; list every exclusion.

Record `git status --short`. In HEAD mode, state whether working-tree changes are excluded. If the caller supplies a pre-existing worktree baseline, give it to the reviewer and scope findings to task changes added after that baseline. Confirm the selected target is non-empty before dispatching the reviewer.

## 2. Find sources

Find the originating spec in this order:

1. A source supplied by the user or calling skill
2. A matching file under `docs/`, `specs/`, or `.scratch/`
3. Issue references in commit messages, fetched through `docs/agents/issue-tracker.md`
4. If no spec exists, skip the Spec axis and say so. Ask only when the user explicitly requested Spec compliance and the missing source prevents that review. A supplied or identified source that cannot be read is a coverage gap, not evidence that no spec exists

Find repository standards such as `AGENTS.md`, `CLAUDE.md`, `CODING_STANDARDS.md`, and `CONTRIBUTING.md`. Use authoritative glossary/map paths from `docs/agents/domain.md` when configured; otherwise accept `GLOSSARY.md` / `GLOSSARY-MAP.md` or legacy `CONTEXT.md` / `CONTEXT-MAP.md`, following the selected map to relevant contexts. If both naming families exist without explicit authority, resolve the source choice before treating either as canonical. An unreadable configured source is a coverage gap, not absence; read-only review must not rename or create a replacement glossary. Find relevant ADRs and agreed seams. Read the Design rubric in [review-rubrics.md](review-rubrics.md). When the change affects shared technical constraints, also read their accepted source revisions, relevant design and experiment evidence, and any configured engineering policy. Load only the affected subset. A design note is not authority to invent requirements, and a structural validator pass is not architecture or benchmark evidence.

## 3. Run one independent review

Use one independent sub-agent in a fresh review context for all applicable axes. The calling agent remains the coordinator; do not spawn an aggregator. Do not add a complexity classifier or automatically switch reviewer counts. Explicit user or project requirements for additional independent or specialist review remain separate obligations; this default is not a global restriction on other sub-agent work.

If independent review is unavailable, disclose that limitation instead of simulating a reviewer. A direct review may provide findings, but cannot satisfy an explicit independent-review requirement; report `NOT INDEPENDENTLY VERIFIED` rather than PASS.

Give the reviewer the exact diff command, commit list, task-scope untracked files and exclusions, the three briefs below, and the Design rubric. Supply relevant source locations and accepted revisions, including the original requirement and verification evidence. Include conversation-only decisions with their exact definitions and origins. Do not substitute the implementer's conclusions or inherit the full implementation conversation as the review brief.

Both reviewer and coordinator should read required source material and related code on demand, rather than preload entire histories or every report. Across truncation or compaction, retain source anchors and revisions, unresolved findings, and outstanding checks. Re-read the necessary originals; a summary or truncated result is not a substitute for missing evidence. Reuse evidence only while its source and target remain applicable. Do not drop required coverage to fit a window or infer a safe capacity from file count or byte size. Missing capacity telemetry alone is not a blocker; inability to complete required reading or checks must be reported as `INCOMPLETE`, with the uncovered scope and what would enable continuation.

The review brief must say: "Perform this review directly. Do not invoke lain-code-review, call skills, or spawn additional agents. Use the required finding format. Report every blocker. Report an advisory only when its concrete impact and smallest fix fit the requested scope. Brevity must never suppress a blocker."

### Standards brief

Report every violation of an applicable documented repository rule. Cite the governing rule and changed hunk. This axis is limited to documented repository rules.

### Spec brief

Report missing or partial requirements, unrequested behaviour, and requirements implemented with the wrong observable result. When the caller supplies an implementation contract or ticket as a coverage index, first compare it with the authoritative source and report any omitted or distorted source decision. Then compare the code with the authoritative source. Quote the source scenario, invariant, or spec line for every finding. Classify a behaviour mismatch as a blocker and unsupported but harmless scope as advisory.

### Design brief

Reconstruct the main path, then inspect immediate callers and dependencies. Apply every Design rubric item. Cite the hunk and concrete impact. Pay particular attention to failure behaviour that has no source decision and abstractions that expose more knowledge than they hide. Follow affected shared contracts into relevant consumers, data migrations, deployment configuration and evidence when those are part of this change. Do not expand a local change into a whole-system audit or start a new design or experiment inside read-only review.

## 4. Verify and aggregate

Group duplicate root causes before verification. For every distinct proposed finding, inspect the cited source and current target. Drop findings with a wrong location, missing source, or impact not supported by the code. If required evidence cannot be accessed, retain the unresolved verification gap rather than treating it as a disproven finding. Verify the reviewer's declared coverage and any outstanding obligations as well as its findings; an empty report alone is not completion evidence.

Report verified findings under `## Standards`, `## Spec`, and `## Design`. Keep the axes separate. If two axes identify the same underlying impact, keep one finding under the axis that owns its governing source and note the cross-axis relevance instead of counting it twice. Multiple lenses from the same reviewer are not independent corroboration. Within each axis, list blockers before advisories.

End with a gate summary:

- **PASS**: applicable review coverage and required independent review are complete, with no verified blocker
- **FAIL**: one or more verified blockers, listed by axis
- **INCOMPLETE**: required sources, checks, or finding verification remain unfinished; name the uncovered scope and missing evidence without claiming the target is clear
- **NOT INDEPENDENTLY VERIFIED**: only a direct review was possible; report findings and unmet independent-review obligations without representing them as independent evidence

Report every applicable non-pass state; one limitation must not hide another or suppress verified blockers. Use PASS only when no non-pass state applies. A legitimately absent spec disclosed under step 2 is not itself incomplete coverage. Explicit additional review obligations must also be satisfied. Do not turn advisories into blockers by accumulation.

## Verification mode

When given a previous review report, first report each previous finding as `resolved`, `unresolved`, or `rejected with supporting evidence`. Then run a full blocker-only scan of the current target, including unchanged task hunks that the first pass may have missed. The pass scope is prior dispositions plus blockers. This is the progress-bounded repair verification used by `lain-implement`.
