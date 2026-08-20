# Engineering flow evaluations

These evaluations stay outside runtime skill context. They measure whether a skill changes observable outcomes compared with the base model, rather than whether an output repeats phrases from `SKILL.md`. The checked-in fixtures are development inputs. They are not release evidence until a runner, conversation driver, scorer, raw-result schema, and independently authored held-out task set exist.

## Utility

Evaluate a skill conceptually as:

```text
outcome lift + variance reduction - context cost - runtime cost - human intervention
```

Generic guidance that produces no measurable lift is a no-op and should be removed. Project policy, tool protocols, durable artifacts, and safety gates can remain valuable even when general model capability improves.

Do not add unlike units directly. Compare the scorecard metrics first. If a team needs one aggregate, normalize each metric, publish its weight and non-inferiority margin before running the trials, and report the disaggregated results beside it.

## Protocol

For each development or release run:

1. Pin the model, effort level, harness, tool permissions, repository commit, and task prompt.
2. Compare no skill, released skill, and candidate skill on the same task and repository state.
3. Treat the independently authored task as the sampling unit. Repeated generation seeds estimate within-task variance; they do not increase the number of independent tasks.
4. Choose the held-out task count through a predeclared power or interval-width analysis. Tasks come from authors who did not write the candidate skill or see its final wording. Repeated seeds on checked-in fixtures are only a development smoke test.
5. Strip arm names. Give evaluators only artifacts needed for their metric and ask them to predict the arm after scoring. Above-chance arm identification flags subjective scores as potentially unblinded.
6. Record tokens, wall time, user turns, tool failures, repository state, and every score below. Keep raw outputs.

The runner must commit fixture seeds before the model starts, install the selected arm without exposing arm labels, replay scripted user turns at declared triggers, collect results under opaque IDs, and keep evaluator-only tests outside the model workspace. Until that runner exists, record fixture results as manual development observations only.

Choose held-out repositories from the languages, frameworks, and change shapes the skill claims to support. A dependency-free layered Java fixture can catch protocol regressions, but it cannot establish quality lift for production Spring services by itself.

### Comparison rule

For release trials, calculate candidate-minus-released deltas by held-out task and bootstrap tasks, not repeated seeds. Report the median delta and an interval at a predeclared confidence level justified by the decision risk. Non-inferiority must hold for every primary metric. A claimed improvement requires the interval to clear a predeclared minimum lift in the beneficial direction; a better point estimate is not enough. A variance claim requires its own predeclared reduction and interval. If an interval crosses a margin, the result is inconclusive.

Evaluate the full workflow first. For retirement or attribution, change one skill or rubric component at a time while freezing all other artifacts. A bundle comparison cannot identify which instruction helped.

## Scorecard

| Stage | Observable metric |
| --- | --- |
| grill-with-docs | Decision-bearing unknowns left implicit; codebase-answerable questions asked of the user; handoff fields present and source-consistent |
| to-spec | Required-decision traceability; unsupported behaviours; invariant-to-scenario coverage; scenario-to-verification coverage; implicit caller-visible failures |
| to-tickets | Source-ID coverage; duplicate or missing ownership; cycles in blocking edges; cold-reader questions required before implementation |
| implement | Acceptance tests; change-scenario cycles and preservation evidence with real command results; unauthorised fallback count; required fallback coverage; unresolved blockers; unrelated diff |
| code-review | Seeded finding recall by severity; false-positive rate; citation accuracy; blocker/advisory calibration |
| Resulting code | Acceptance pass rate; blind comprehension accuracy; time to locate each business rule; follow-up change amplification; behaviour tests surviving an internal refactor |

Raw counts such as lines, methods, tests, coverage, fallbacks, or findings are diagnostics, not targets. They become meaningful only when tied to behaviour or change cost.

### Metric definitions

[`metrics.json`](metrics.json) is the authoritative registry for metric IDs, type, calculation, beneficial direction, not-applicable policy, aggregation, and scorer. `cases.json` may reference only registered IDs. Rates record numerator and denominator. Evaluator-owned source-decision and required-scenario recall prevent an artifact from improving traceability by omitting difficult requirements. Change amplification is interpreted with acceptance and comprehension, never as a standalone raw-count target.

Before accepting a development result, pin the prompts, seeded defects, expected source IDs, comprehension questions, follow-up change, and evaluator-only tests in a versioned fixture. Release evidence additionally requires held-out tasks not visible to candidate authors. The initial inputs live under [`fixtures/`](fixtures/README.md).

## Initial cases

### E1: Failure policy is undecided

Ask for a feature that calls a remote dependency, but do not decide whether timeout means failure, retry, or degradation.

Expected observations:

- `grill-with-docs` leaves no implicit failure decision.
- `to-spec` refuses to publish ready-for-agent while the caller-visible result is unresolved.
- `implement` does not invent a default or fallback.

### E2: Multi-session vertical feature

Provide a feature with one invariant, a happy path, a boundary case, and two independently deliverable vertical slices.

Expected observations:

- Every source scenario ID has an issue owner.
- The blocking graph is acyclic.
- A fresh agent can implement each issue from its contract and pointers without asking a product question.

### E3: Green but difficult code

Seed a repository with passing tests and an implementation that hides the main path behind generic helpers, duplicates one business rule, and silently catches an external error.

Expected observations:

- The Design axis identifies all three seeded problems with accurate citations.
- Severity matches the governing contract: the swallowed failure is a blocker and the two maintainability findings are advisories.

### E4: Model capability catches up

Run component ablations on each newly adopted model. Change one component at a time with the rest of the workflow frozen.

Expected observations:

- Remove an instruction when its task-level ablation satisfies the predeclared error-risk, non-inferiority, and minimum-effect rules. Cross-model replication is additional robustness evidence when the protocol calls for it.
- Retain only the workflow state, project policy, and evidence gates that still produce measurable lift.

### E5: End-to-end code quality

Implement the settled failure-policy feature through the whole build and review flow. Score evaluator-owned acceptance tests, blind comprehension, rule-location time, and a pinned follow-up change. Process evidence is secondary; this fixture has no forced refactor probe.

### E6: Required fallback

Implement a product-authorised retry and degraded response. Score both required fallback coverage and unauthorised fallback count. This prevents a workflow from winning by avoiding every fallback, including the ones the product requires.

### E7: Full-chain code quality

Run the same unresolved request through the planning skill under test, then freeze downstream implementation and review skills across arms. Score source-decision recall, required-scenario recall, evaluator-owned acceptance, comprehension, and follow-up change cost. This ties planning artifacts to the code they cause instead of rewarding document shape alone.

## Release gate

Predeclare non-inferiority margins, minimum meaningful lift, cost budgets, and primary metrics before running trials. Every main-flow skill needs at least one full-chain ablation whose primary outcomes include acceptance and resulting-code measures. Process artifacts cannot release a candidate whose downstream code is worse or harder to understand. A candidate must be non-inferior on every primary metric and show an interval-backed improvement on the declared target without exceeding cost budgets. Checked-in fixtures and repeated seeds are smoke tests only; held-out independently authored tasks are required for release or retirement.
