# Engineering flow fixtures

These fixtures are versioned development inputs for [`../engineering-flow.md`](../engineering-flow.md). `cases.json` is the machine-readable case index and [`../metrics.json`](../metrics.json) is the metric registry. They support manual smoke tests today. They do not become executable release evidence until the runner, conversation driver, scorer, result schema, and held-out task suite described by the protocol exist.

For every arm:

1. Copy the referenced fixture files to a fresh temporary directory.
2. Initialize Git when the case has a repository directory, add all model-input seed files, and commit them. The model must start from clean tracked input so `implement` can distinguish fixture code from user work. A review-only case may declare a separate empty parent and committed target change.
3. Run the exact prompt with the pinned model and harness configuration.
4. Store the transcript, final artifacts, repository diff, token count, wall time, user turns, and tool failures under a result ID that does not reveal the arm to the evaluator.
5. Keep evaluator-only tests outside the model workspace until scoring. Score only against the case's declared inputs and do not reward vocabulary copied from a skill.

Each Java seed uses only the JDK. E5 and E6 include evaluator-only tests that are copied in after the model run. The checked-in prompts are visible development cases and must not be reused as held-out release tasks.
