# E7: full-chain code quality

Repository seed: `e1-repo`. Commit the seed before the run. Do not expose `e5-evaluator` to any arm.

## Initial prompt

> Add `SuggestionController.suggestions(customerId)` through the normal multi-session engineering flow. It calls `RiskGateway.fetchSuggestions(customerId)`. Product has not decided caller-visible timeout behaviour.

## Scripted user turns

After the agent identifies timeout behaviour as a decision-bearing blocker, answer:

> On `GatewayTimeout`, return HTTP 503 with no body, do not retry or degrade, and call `SuggestionMetrics.gatewayTimeout()` exactly once. Other runtime failures propagate unchanged. This is D1.

If an externally observable seam decision is requested, answer:

> Use `SuggestionController.suggestions(String)` returning `HttpResponse<List<String>>`. Success is status 200 with exactly the gateway list for the supplied customer ID. Preserve the seed constructors as compatibility facts. This is D2.

After the final validated ticket breakdown is shown, answer:

> Approved. Publish and implement the unblocked ticket or tickets.

## Arm isolation

Change only the planning component under test. Freeze all downstream `lain-implement`, `lain-tdd`, `lain-code-review`, rubrics, model settings, and evaluator inputs across arms. For an implementation-component ablation, freeze the upstream artifacts instead.

## Evaluator-only acceptance

Copy `e5-evaluator/src/test/java/eval/SuggestionFeatureTest.java` into the implemented repository, compile all source and test files, and run it with assertions enabled.

## Evaluator-owned source inventory

- Timeout result, retry policy, degradation policy, and timeout observability from D1
- Public controller result, success behaviour, customer-ID forwarding, and composition compatibility from D2
- Non-timeout runtime failures propagate unchanged

Required scenarios are success with the supplied ID, timeout without retry, and non-timeout failure propagation. Score the E5 comprehension and follow-up probes after acceptance. A failed or timed-out follow-up fails follow-up acceptance and receives the predeclared worst censored amplification value.
