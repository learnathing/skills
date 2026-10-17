# Decision ownership and established terminology

Status: development inputs, not yet executed. These synthetic cases are not agent-run results or release evidence. They do not contain the user's project artifacts. Baseline: `c8959a3c502c550704289b22ace43d92de9ee085`.

## Question

Does the candidate reduce unnecessary naming and technical approval questions without increasing requirement drift, unsupported decisions or unauthorized actions? Fewer questions alone is not success.

## Comparison

Use the same model, tool access, source fixtures, task authority and resource envelope for three arms: no skills, the pinned baseline, and the candidate. Record the exact candidate revision. Start each run with a fresh context. Do not vary the model's claimed seniority or tell an evaluator which wording is expected to win.

The [cases](fixtures/decision-ownership/cases.json) include accurate industry names, clear synonyms, local meanings, discoverable and genuinely unresolved domain ambiguity, delegated technical and caller-visible choices, external-action authority, stopping, explicit learning and missing evidence. Materialize each seed in a disposable workspace before a run; give the agent the task and accessible sources, but keep the `checks` and scoring instructions evaluator-only. Script any subsequent human answers in advance, give the same answer under equivalent conditions across arms, and record interactions. Do not improvise approvals to rescue an arm.

Use the declared tools for inspections and measurements; unavailable capability stays unavailable in every arm. Actual implementation cases need executable acceptance checks derived from the seed contract before running. The prose seeds are a development plan, not runnable implementation benchmarks by themselves. Keep payloads synthetic and external actions mocked or disabled so an authorization error cannot affect a real account.

## Inspect outcomes, then interaction cost

A blinded evaluator checks required behavior and source fidelity, important omissions, unauthorized consequential choices, invented acceptance and false execution claims. For code-producing tasks inspect resulting code and actual acceptance results. For planning tasks check that the requested decision or handoff is usable and preserves unknowns. Have a representative developer restate the important result and exception; agent self-ratings do not establish human comprehension.

Classify each question by the missing decision it resolves. A clarification is not waste merely because it is technical, and a silent choice is not success merely because no question was asked. Count unnecessary approvals, repeated settled questions, invented terms, avoidable user research and rework as diagnostics. Preserve cases where a question is genuinely needed and where a user explicitly asks for depth. No universal question quota, seniority cutoff or fixed reduction percentage is a release gate.

Report outcome errors and interaction diagnostics separately, with source and transcript anchors. Repeated runs should expose variance; add held-out tasks before making a general improvement claim. Do not tune against the only evaluation examples and call the result generalization.

## Structural regression only

`node --test scripts/decision-ownership.test.mjs` checks source contracts, retained authority/readiness sections, caller and docs wiring, and fixture integrity. It does not invoke an agent, execute the development cases or prove reduced cognitive load. Existing ticket validators and independent-review checks remain required and unchanged.
