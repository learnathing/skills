# Technical experiment

A small executable experiment answers one technical question. It is not a UI walkthrough and not a production feature. Use for feasibility, algorithm quality, capacity, compatibility, or migration/recovery uncertainty that reading and discussion cannot settle.

## Establish the question before running

Record the source decision this experiment informs, the baseline and candidate, relevant workload or data version, metric and measurement method, authorized resource budget, and decision rule. Derive thresholds from approved requirements or label them exploratory; never invent a production quality target. Identify data permissions before using external services.

Use a disposable local or explicitly authorized environment. Do not provision paid resources, migrate production, or upload private data without authority. Missing access or data makes the result blocked or limited, not implicitly successful.

## Execute the smallest meaningful comparison

Keep setup and execution reproducible: commands, dependency/configuration versions, input hashes or durable data references, hardware/environment where material, and seeds or repetitions when meaningful. A technical experiment may need assertions, measurement checks, isolation and error handling to prevent invalid conclusions. The UI/logic rule to skip tests does not apply to measurement validity.

For retrieval or ranking, specify the evaluation unit, a fixed corpus and representative queries, relevance judgments, and the baseline. Separate tuning data from held-out evaluation when reporting generalization. Compare quality together with latency and cost under the stated workload. Do not fabricate relevance labels or describe a toy corpus as production evidence.

For migrations, verify representative data, compatibility during transition, and rollback or another approved recovery path. Do not claim reversibility for a destructive migration merely because a down script exists.

## Capture the result

Save a small reproducible runner when useful. Use the caller's artifact-mode writing reference for the report, with the answer and its limits before the reproducibility trail:

- Question, evidence status, supported conclusion and its limits; distinguish a measured result from a recommendation
- Supported decision, or the next discriminating experiment when inconclusive
- Baseline/candidate comparison, with actual values, units and conditions when measured
- Source, authorized scope, data and environment versions
- Commands and actual outputs or durable raw-result references
- Relevant uncertainty, failures and limits of applicability, beside the claims they qualify rather than hidden in raw logs

Use `measured`, `inconclusive`, or `not run` for the evidence status. A negative result is useful evidence. When tools cannot execute, provide the runner and explicitly mark the result `not run`; no measured claim or ready production contract may depend on it. Check that a source-backed decision follows from the evidence, not just that the report exists.

Keep prototype code out of production paths. Retain the experiment and evidence on an authorized branch or established experiment location, without secrets or private datasets. Do not automatically fold a candidate into real code: the decision goes back to the technical design and authoritative spec, and production implementation is separate work.
