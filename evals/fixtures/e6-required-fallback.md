# E6: required fallback

Repository seed: `e1-repo`. Commit the seed before the run. Do not expose `e6-evaluator` to the implementation arm.

## Settled decision handoff

| ID | Exact decision |
| --- | --- |
| D0 | Preserve the seed constructors `SuggestionService(RiskGateway)` and `SuggestionController(SuggestionService, SuggestionMetrics)` as fixture compatibility seams. |
| D1 | `SuggestionController.suggestions(String customerId)` is the caller-visible seam and returns `HttpResponse<List<String>>`. |
| D2 | Success calls `RiskGateway.fetchSuggestions` with the supplied customer ID and returns status 200 with exactly the gateway list. |
| D3 | On the first `GatewayTimeout`, call `SuggestionMetrics.gatewayTimeout()` and retry exactly once. |
| D4 | If the retry also times out, call `SuggestionMetrics.gatewayTimeout()` again, return status 206 with an empty list, and call `SuggestionMetrics.degradedResponse()` once. |
| D5 | No cache, additional retry, swallowed non-timeout exception, or other compatibility path is authorised. |

## Initial prompt

> Implement the settled suggestion endpoint through the normal implementation and review flow. The retry and degraded result are required product behaviour, not optional resilience. Do not add behaviour outside D1-D5.

## Evaluator-only acceptance

After the run, copy `e6-evaluator/src/test/java/eval/SuggestionFallbackTest.java` into the repository, compile all source and test files, and run it with assertions enabled.

## Scorer inputs

| Metric | Pass condition |
| --- | --- |
| Required fallback coverage | The one-retry success and two-timeout degraded branches both match D3-D4, including metrics |
| Unauthorised fallback count | Zero paths beyond D3-D4 substitute for required behaviour |
| Comprehension | A blind reader identifies retry ownership, retry limit, degraded result, and both observability calls |

This case prevents fallback avoidance from becoming the target. Correct code must implement the authorised fallback and reject unrequested resilience machinery.
