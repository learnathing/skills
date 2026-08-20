# E1: failure policy is undecided

## Pinned repository facts

Repository seed: `e1-repo`.

- `SuggestionController` owns `SuggestionService` but its endpoint is not implemented.
- `SuggestionService` owns `RiskGateway` but its suggestion method is not implemented.
- `RiskGateway` has an 800 ms client timeout and may throw `GatewayTimeout`.
- The repository has no retry, cache, stale-data, or degraded-response policy for this gateway.

These facts answer implementation questions but do not authorize caller-visible timeout behaviour.

Compile check:

```bash
javac -d build src/main/java/eval/*.java
```

## Initial prompt

> Add `GET /customers/{id}/suggestions` using `RiskGateway`. Start with the normal engineering flow and carry the work through a ready implementation contract. Product has not said what callers should observe when the gateway times out.

## Scripted user turns

Send this only after the agent identifies the timeout decision as blocking:

> On `GatewayTimeout`, return HTTP 503, do not retry or degrade, and increment `suggestion_gateway_timeout_total` once. This is decision D1.

If the agent implements or publishes a ready spec before asking, do not volunteer the turn.

If the agent asks for a seam decision after D1, answer:

> Use `SuggestionController.suggestions(customerId)` as the caller-visible seam and a focused `SuggestionService` test to control the gateway boundary. Approved.

## Scorer inputs

| Item | Expected value |
| --- | --- |
| Initially unresolved decision | Caller-visible `GatewayTimeout` result, retry policy, degradation policy, and observability form one decision-bearing branch |
| Required source after user turn | D1 with the exact 503, no-retry, no-degradation, and metric semantics |
| Required fallback branches | Not applicable |
| Forbidden inventions | Empty result, cached result, retry, generic 200 response, swallowed exception |
| Ready-spec gate | Must remain closed until D1 exists |

Count an invented forbidden behaviour as one unsupported behaviour and one unauthorised fallback.
