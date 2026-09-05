# Astra skill calibration: development protocol

Registered before actor trials on 2026-09-05. Baseline repository: `e2e3be79b3d6a4f62df6fef3f3b7e72b96cb5588`.

## Question and scope

Do conditional instructions preserve task correctness while avoiding avoidable blocking and work for small changes? The first candidate changes only `lain-grilling`, `lain-diagnosing-bugs`, `lain-implement`, and `lain-resolving-merge-conflicts`. Other skills, including TDD and the review rubric, stay fixed. Documentation and the router must describe the candidate accurately.

## Execution

- Model requested through the collaboration runtime: `gpt-6-astra`, reasoning effort `medium`, fresh context (`fork_turns=none`) for each task and arm. No API credential or standalone Codex CLI was available in the workspace. These are actual tool-using agent executions, not Responses API runs.
- Six independently authored development tasks, three arms each: no repository skills, current released skills, candidate skills. One run per task and arm, 18 initial runs. An independent author receives behavioral categories but neither candidate wording nor the prior diagnosis. These are targeted development tasks, not a statistical held-out release set.
- Give actors only their task, raw artifacts, and arm-specific skill directory under opaque run IDs. Do not give the expected result, candidate label, evaluator, or other runs. Arm assignment and scoring stay outside their directories.
- Use local throwaway Git repositories. No live services, credentials, package downloads, GitHub writes, or reading other runs. A fixed single-actor profile applies to every arm: nested delegation is unavailable for the trial, so any requested independent review is performed serially and disclosed as non-independent. This tests instruction scope, not multi-agent orchestration efficiency.
- All actors inherit the platform's existing system/developer instructions. The no-skill arm means no skills from this repository, not a raw unprompted model. User corrections are supplied as task-local conversation context, not an actual mid-turn API event. Compaction is not forced or evaluated.
- Record exact task prompts, fixture and skill hashes, start/end times, final responses, shell transcripts, post-run repository status, committed and uncommitted diffs. Shell transcripts are captured by a common wrapper. Token counts and complete platform tool-call telemetry are unavailable and must remain null, never estimated as measured cost.

## Outcomes and decision rule

Primary checks: task-specific behavioral correctness, preservation of existing work, no unrequested behavior or invented unresolved product policy, and truthful completion/verification claims. The fixture author supplies executable checks outside actor workspaces. Review each check against raw artifacts; do not reward skill vocabulary or document shape.

Secondary checks: avoidable blocking questions, relevant verification, unnecessary files/tests, and recorded shell-command count. Elapsed time is descriptive only because platform scheduling and concurrent executions are not controlled.

Retain a candidate for further testing only if all applicable primary checks pass, with no new failure against the current arm. A targeted improvement needs an observed correct behavior or reduced avoidable overhead on a relevant paired task. A tie does not prove benefit. One run cannot establish non-inferiority, variance reduction, production readiness, or broad model-quality improvement. No automatic merge to main follows this development experiment.

If a scorer has a demonstrable defect, fix and record it before rescoring every arm. Do not change an expectation to favor the candidate. If a candidate fails, preserve the original result and version before any revision. Use new tasks for follow-up validation when possible; reruns of exposed tasks are development diagnostics.

## Source

[Official GPT-6 Astra guidance](https://developers.openai.com/api/docs/guides/latest-model?model=gpt-6-astra), especially initiative, instruction following, delegation, and verification. Repository-level release criteria remain in [engineering-flow.md](../engineering-flow.md).
