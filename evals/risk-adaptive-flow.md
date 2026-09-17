# Risk-adaptive engineering flow evaluations

These are development scenario specifications, not executed results and not an independent held-out task set. They extend [engineering-flow.md](engineering-flow.md); its runner, source inventories, blinding, task-level comparisons, cost budgets and release-evidence rules still apply. The [cases](fixtures/risk-adaptive-flow/cases.json) reference existing IDs from [metrics.json](metrics.json).

## Prepare executable trials

For each case, create a versioned repository seed, scripted human responses, authority envelope, evaluator-owned source inventory, acceptance checks and follow-up change. Keep evaluator-only checks and held-out data outside the agent workspace. The natural-language seed and checks fields are preparation requirements, not a runnable trial or its result.

Pin model, effort, harness, permissions, repository state and instructions. Compare no skill, the current release and candidate on the same task. Independent authors supply release holdouts. Repeated seeds of author-visible cases remain development observations. Record tool limitations, missing independence and unrun measurements explicitly.

## Outcome questions

Small-change cases evaluate correctness and overhead together. Record unnecessary user turns, planning artifacts, context and runtime as diagnostics; require predeclared non-inferiority on task outcomes. Skipping a real permission risk is not a successful shortcut.

Complex cases evaluate downstream behavior, source recall, shared contracts across fresh sessions, decision revision propagation and real experimental evidence. Evaluator-owned inventories prevent improved coverage by omission. Measure the pinned follow-up change as well as initial delivery; a polished design document is not the primary outcome.

Retrieval comparisons pin the baseline, corpus, judged queries, evaluation unit, resource envelope and selection rule before tuning. Keep development and held-out evaluation distinct. Report quality, latency and cost separately instead of inventing a universal threshold or summing unlike units.

Rolling-readiness cases contain both independent unresolved work and a genuinely shared open prerequisite. The desired result is partial progress without hidden assumptions, not maximum ticket count or every ticket marked ready.

## Deterministic checks are not outcome evidence

Run `node --test skills/engineering/lain-to-tickets/*.test.mjs` and `node scripts/check-engineering-flow.mjs` for schema, compatibility, registration and documented-example regressions. These checks do not establish that agents discover every architecture risk, honor authority in practice, improve retrieval quality or reduce human effort.

No outcome lift, variance reduction or release-readiness claim is attached to these fixtures. Apply the established task-level release comparison only after executable assets, a runner and independently authored tasks are available.
