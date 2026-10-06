# Readable-artifact development evaluation

Status: protocol and development examples only. No human study or agent outcome comparison has been executed for this change. Unit tests check structure and compatibility, not comprehension.

## Question

Can a developer or other intended reader recover the important meaning and detect a consequential error without losing the agent's ability to implement the same source contract?

## Conditions

Use identical frozen source decisions with four presentations: A, current language and order; B, language changes only; C, structure changes only; D, both. Retain a no-skill generation arm when evaluating the writing skill's delta over the model. Record exact source and prompt revisions, model configuration when available, and any unavailable telemetry.

Assign readers unfamiliar with the specific example to counterbalanced conditions. Do not show one reader several versions of the same task and attribute their practice advantage to the rewrite. Use multiple task families and both Chinese and English where these are actual reader languages; repeated prompts are not new independent task families. Preserve rights and consent for any real session records.

## Tasks and outcomes

Ask readers to explain the observable behavior, conditions, quantities, exceptions, exclusions and remaining uncertainty. Include a seeded consequential error, such as an extra retry or a proposal mislabeled accepted, and record whether they find it. Record accuracy, error detection, time and unsupported assumptions before collecting preference ratings. Treat word count and readability scores as diagnostics, not success criteria. Do not choose performance thresholds after seeing results.

Keep agent handoff/implementation trials separate: use the same source and task, recover the contract and verify resulting code through independent acceptance probes. A nicer document with a lost condition fails the semantic-preservation objective even when shorter. A model cold read is not a substitute for the developer task.

## Development examples

`fixtures/readable-artifacts/spec.md` and its tickets re-present the repository's E6 required-fallback decisions. The frozen manifest is a structural denominator, not an independent semantic oracle. Check the original E6 source as well.

Questions for the E6 example: When is a retry allowed? What is the maximum number of calls? What result follows two timeouts? How many timeout and degradation observations are required? Are non-timeout exceptions swallowed? Was a check actually run, or only requested? Did the document authorize deployment?

Additional task families should include a proposed ADR, a blocked cross-session handoff, a research claim with an inaccessible source, an unrun experiment, a review with incomplete coverage, a questionnaire for a non-specialist, and a learning record without evidence of mastery. Use `examples.md` as illustration, not a test result.

## Limits and reporting

Report all failures and missing data. Distinguish code completion, validation, independent review, human comprehension and release readiness. A structural pass cannot establish source completeness: the compatibility suite intentionally demonstrates that a misleading overview can pass a field validator. Do not publish a general improvement claim from that suite or from a self-authored checklist.
