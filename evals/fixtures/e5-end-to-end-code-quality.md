# E5: end-to-end code quality

Repository seed: `e1-repo`. Commit the seed before the run. Do not expose `e5-evaluator` to the implementation arm.

This dependency-free layered Java seed is a fast development check, not a substitute for held-out tasks in real Spring repositories.

## Settled decision handoff

| ID | Exact decision |
| --- | --- |
| D0 | Preserve the seed constructors `SuggestionService(RiskGateway)` and `SuggestionController(SuggestionService, SuggestionMetrics)` as fixture compatibility seams. |
| D1 | `SuggestionController.suggestions(String customerId)` is the caller-visible seam and returns `HttpResponse<List<String>>`. |
| D2 | Success calls `RiskGateway.fetchSuggestions` with the supplied customer ID exactly once and returns status 200 with exactly its list. |
| D3 | `GatewayTimeout` returns status 503 with no body. |
| D4 | Timeout is not retried or degraded, and calls `SuggestionMetrics.gatewayTimeout()` exactly once. |
| D5 | A non-timeout runtime failure propagates unchanged. |

## Initial prompt

> Implement the settled suggestion endpoint through the normal implementation and review flow. Keep the main path readable to a Spring service maintainer. Do not add behaviour outside D0-D5.

## Evaluator-only acceptance

After the run, copy `e5-evaluator/src/test/java/eval/SuggestionFeatureTest.java` into the repository, compile all source and test files, and run it with assertions enabled.

## Blind comprehension tasks

Give a fresh evaluator only the resulting repository:

1. State the caller-visible timeout result and identify its authoritative implementation location.
2. State whether the gateway is retried and cite the code that determines it.
3. Identify where timeout observability is owned.

Record accuracy and time to the first correct authoritative location.

## Follow-up probe

- Follow-up: change only the timeout status from 503 to 504. First score follow-up acceptance. Then count production modules and independently owned rule locations changed. A timeout or failed follow-up receives the predeclared worst censored amplification value instead of `not applicable`.

Process artifacts are diagnostics. Acceptance, comprehension, and follow-up amplification are primary. Refactor survival remains a portfolio metric, but this development fixture does not force an artificial refactor action.
