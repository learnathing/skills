# Astra skill calibration: development protocol

Status: the original protocol below is historical V1. The prospective [V2 protocol](#v2-non-deterministic-output-evaluation) supersedes it for future evaluations. V2 has not been run. The previous 21 executions remain development smoke observations, not evidence of reliable quality or non-inferiority.

## V1 historical protocol

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

## V2: Non-deterministic output evaluation

Revised on 2026-09-05 after V1 observations and the user's request to evaluate unstable model outputs differently. This is a prospective design, not a retroactive redefinition of success. No runtime skill changes or additional model trials accompany this revision.

### 1. Evaluate decisions and consequences, not identical answers

The target is the distribution of useful, justified outcomes under the intended deployment conditions. Different valid diagnoses, questions, plans, code structures, or wording can all succeed. Deterministic replay is neither assumed nor a requirement. Separate generation variability, task difficulty, judge error, and environment failure before interpreting a difference.

Use the following evidence hierarchy; do not collapse it into an overall pass percentage:

| Layer | Evidence | Judgment |
| --- | --- | --- |
| Observable contract | Executed acceptance checks, Git index and worktree, authorization events, artifact integrity | Met / violated / not assessable / not applicable, per criterion |
| Grounded reasoning | Claims checked against supplied sources; consequential omissions from evaluator-owned requirements; uncertainty appropriate to available evidence | Evidence-cited criterion assessment; no single gold answer |
| Downstream usefulness | A fresh consumer carries out the proposed probe, locates a rule, or implements the plan under a fixed budget | Observable consumer outcome and required clarification, not a self-reported checklist |
| Relative quality | Blinded comparison against explicit task criteria after contract checks | A better / B better / substantively tied / cannot judge |
| Cost | Actual task-level usage, relevant human intervention, verified latency under controlled scheduling | Separate diagnostics; missing telemetry stays null |

An automated formatting or schema check only establishes that property. A model judge cannot override an observed behavior failure by preferring the prose. A justified uncertain diagnosis can be useful; an unverified evaluator judgment cannot be promoted to a pass. Judge inability to assess and actor uncertainty about the world are different fields.

For each task, the independent author freezes before generation: the user's outcome, available evidence, evaluator-owned essential requirements, allowed alternative solutions, prohibited unsupported decisions, applicable executable checks, and a downstream probe where feasible. Judge facts against the evidence actually supplied, not against facts withheld from the actor. Avoid keywords, mandatory headings, required hypothesis counts, and preference for a particular writing style unless the user explicitly requires them.

### 2. Task sampling and repeated generation

Keep no-repository-skill, current, and candidate arms. Freeze the model configuration, complete harness instructions, tool capabilities, skill content hashes, limits, and user-turn driver. Use fresh workspaces and contexts. Randomize arm execution order within task blocks and interleave blocks to reduce time/order confounding. Do not claim seeds make output deterministic; record supported seed settings only when the runtime actually supports them.

Use three separate datasets:

- Judge calibration anchors: known acceptable alternatives and controlled defects, independent of candidate outputs. Include a concise correct answer, a differently worded correct answer, an attractive unsupported answer, an omitted material decision, and an explicit inability to assess. These calibrate the measurement system, not actor quality.
- Development pilot: propose 12 new task families across the four changed workflows, three families per workflow, with three fresh generations per arm. This is a starting budget of 108 base actor runs, chosen for development coverage, not statistical power or a release sample size. Additional transformation, judge and consumer runs must be counted separately and capped in the registration; do not silently expand the budget. Include straightforward, ambiguous/evidence-limited, and interaction/state-dependent conditions. Register exact tasks and budgets before execution; do not launch merely because this plan was saved.
- Confirmatory holdout: new independently authored families unseen during candidate and scorer tuning. Use pilot variability to design sample size and repeated-generation allocation before holdout collection. More diverse tasks may be more valuable than more repeats. Neither public V1 fixtures nor the pilot becomes held-out by renaming it.

The semantic task family is the sampling unit. Repeats and meaning-preserving variants are nested within it; they do not increase the independent task count. Group variants derived from one template under a shared family ID. State the coverage limits when task selection is purposive rather than representative of actual usage. Do not run all pair combinations and count them as independent observations.

Predeclare wall-time, tool and generation limits identically across arms. A genuine timeout or actor failure to progress remains an outcome. Infrastructure failures are separately labeled with evidence; if rerun is permitted, apply the registered retry rule to every arm and retain the first attempt. Never discard a poor response or select the best of several. Report per-generation reliability, not pass@k, unless deployment really generates k candidates and the actual selection policy is evaluated too.

### 3. Calibrate and audit the judges

Use criterion-level independent assessment first. Add pairwise preference for aspects with no deterministic oracle; pairwise preference is not a replacement for correctness. Freeze judge model/version, prompts, rubric anchors, inference settings and evidence packet construction before scoring holdout outputs.

For the development pilot, use two separately initialized judge assessments for each output or comparison. They must not see the arm labels, candidate rationale, each other's votes, or earlier conclusions. Different contexts of the same model are correlated measurements, not two independent sources of truth. Record judge provenance and any shared-family relationship to the generator. A different judge family can be a sensitivity check, not an assumed gold standard.

Randomize A/B order and judge the same pair again with positions exchanged in a fresh context. Map votes back to output identities. A reversal after order swapping is a judge-inconsistency flag, not a new actor sample or a majority-voting opportunity. Preserve ties and cannot-judge cases. Report raw agreement, the label confusion table, swap consistency, and the fraction needing adjudication. Agreement alone does not establish correctness.

Validate the judge on controlled pairs: same meaning with different wording, correct concise versus correct verbose, correct versus unsupported but polished, and exact duplicate output. Inspect whether changing presentation changes the verdict without changing task value. Do not shorten or rewrite real outputs to hide a bias; preserve both originals and any evaluator-only display transform. Quote source or artifact evidence for every material failure finding.

For release evidence, obtain independent human/domain adjudication on all consequential disagreements and a preselected stratified random sample of agreements, including apparent successes. Record who judged, rubric version, and the evidence available. Do not infer release-grade calibration from model agreement alone. Without authorized human adjudication, continue automated development diagnostics and explicitly label semantic release confidence insufficient; do not invent human judgments.

Set judge acceptance thresholds before holdout scoring using calibration data and the tolerated error risk. There is no universal agreement percentage. A judge that misses material seeded defects or systematically prefers position/verbosity must be revised and recalibrated. Keep prior scores; re-score all affected arms uniformly with the new scorer version. If judgments remain unreliable, report that the quality dimension cannot currently be measured reliably.

### 4. Test robustness and responsiveness separately

Use metamorphic cases to ask whether justified decisions respond appropriately to changes in the inputs, not whether the text stays the same. The independent author must verify each transformation preserves meaning or deliberately changes one consequential fact.

| Transformation | Expected relationship |
| --- | --- |
| Paraphrase or reorder equivalent requirements | Preserve required outcome and authorization boundaries; allow different wording and valid implementation |
| Add irrelevant context | No unsupported change to material decisions; useful extra analysis remains allowed |
| Supply a genuinely missing product decision | Resume dependent work; do not repeat an already settled question |
| Change the latest user authorization | Change permitted actions according to that instruction, rather than preserving the old answer |
| Remove or contradict diagnostic evidence | Adjust justified confidence or causal ranking where warranted; no required numeric confidence score |
| Add unrelated staged or unstaged Git work | Preserve it and keep it outside the task commit, with observable index evidence |

Measure these relationships across repeated runs within the family, retaining violations and uncertainty. One mismatch in phrasing is not an invariant violation. One matched pair is not proof of robustness. Run real multi-turn user events for interaction claims; prompt-local descriptions of past turns remain a distinct test condition.

For planning and diagnosis, add a cold-reader handoff test using only the output and permitted source artifacts. Keep the consumer configuration and budget fixed and sample consumer variability too, or use a deterministic probe when possible. Score whether the consumer can take the intended next step without inventing a missing policy. Do not credit unsupported confidence merely because it makes a handoff look actionable.

### 5. Estimate uncertainty at the task level

Register each primary outcome, beneficial direction, denominator, not-applicable handling, missing-data rule, task-family weights and aggregation before the confirmatory run. Keep objective failures, semantic uncertainty, quality preference and cost separate. New metric IDs must be added to the repository metric registry before they are used by a release runner.

Within a family, summarize all generations before comparing candidate and current. Report per-arm distributions, per-family paired differences, severe failures and worst-performing conditions. Estimate intervals by resampling whole independent families with their repeats retained, respecting registered strata; where consumer repeats exist, account for that additional nesting. With too few independent families for a useful interval, report descriptive observations and insufficient precision rather than a misleading tight interval. Repeated judge votes do not narrow the actor-quality interval as if they were new tasks.

For pairwise outcomes, show wins, losses, ties and cannot-judge separately. Predeclare one generation pairing rule within family and balanced position handling. If reporting a preference summary, define its denominator and how ties enter it; never silently remove cannot-judge cases. Show sensitivity bounds for unresolved cases and abstain from a benefit claim if plausible resolutions change the decision. Diagnose systematic missingness rather than treating it as random.

Choose a confidence level, non-inferiority margins and minimum worthwhile improvement for each primary metric from the actual decision risk before looking at holdout results. Use pilot estimates and simulation or interval-width planning to select the independent family count. Freeze the stopping rule and maximum budget. No repeated peeking until significance, no changing margins after observing results, and no unregistered combined score that trades a serious correctness failure for fewer commands.

A zero observed failure count is not proof of zero failure probability; a bootstrap of all identical successes cannot establish the absence of rare harms. Add targeted challenge tasks for severe failure modes and use a prespecified rare-event uncertainty analysis appropriate to the family-level sampling. Budget exhaustion or inadequate precision yields inconclusive, not pass.

### 6. Decisions and evidence records

Use three conclusions: evidence supports the candidate for the declared scope; evidence shows a regression requiring revision; or evidence is insufficient. Release still requires the repository's full-chain code-quality gate. Candidate retention for exploration is not release approval. A verified serious authorization or data-preservation failure pauses the affected candidate for investigation; a speculative model-judge finding is first checked against raw evidence.

For benefit or retirement attribution, perform one-component ablations with other skills and harness settings frozen. Keep deliberate user steering distinct from default behavior, and production-capable delegation distinct from the V1 single-actor profile. A bundle comparison cannot identify the responsible instruction.

Before any V2 actor execution, commit a run registration containing:

| Record | Required fields |
| --- | --- |
| Study | Protocol version, purpose (calibration/pilot/holdout), candidate hashes, harness/model configuration, permitted side effects, budget and stopping rule |
| Sampling | Family IDs, provenance, split, strata/weights, repeat count, transformations, run order, consumer policy |
| Criteria | Observable requirement, acceptable alternatives, severity, oracle/evidence source, metric definition and missing-data handling |
| Judges | Model/prompt version, anchor results, position mapping, raw votes, supporting evidence, disagreement and human-adjudication status |
| Outcomes | Every generation and attempt, immutable artifact hashes, actual actions, criterion states, timeouts, token usage or null, family-level aggregation |
| Decision | Registered margins/confidence method, uncertainty and sensitivity results, scope, remaining gaps, publish/hold/revise determination |

Store evaluation instructions outside runtime skill context. Do not expose holdout criteria or judges' answers to actors. Preserve raw records in an authorized destination and publish only material cleared for that destination. The previous raw-log publication restriction remains in force; this protocol is not permission to publish those logs. If raw evidence cannot be shared, disclose the resulting limit on independent audit.

### 7. Status and next execution boundary

This turn updates and checks the design only. V1's 21 observations have not been rerun, rescored under V2, or promoted to stronger evidence. Before a pilot, prepare new task families, calibrate the judge, and freeze the run registration. Before a confirmatory evaluation, additionally settle risk margins, sample size and authorized human adjudication. Unavailable inputs block only the corresponding claim or phase, not useful local preparation.

Method references: [OpenAI evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices) recommends task-specific evaluations and calibration against human judgment. [Position-bias research](https://arxiv.org/html/2406.07791v4) motivates checking order sensitivity; swapping alone does not prove an unbiased judge. The sampling budgets and decision rules above are this project's proposed design, not thresholds prescribed by those sources.
