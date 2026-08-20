# E4: model capability catches up

Run the full workflow and one-component ablations on the released model and every candidate model. Freeze all non-ablated skill files, rubrics, repository commits, prompts, and harness settings.

## Pinned decision rule

- Smoke test: three paired trials per arm and case.
- Release or retirement evidence: an independently authored held-out task count chosen by predeclared power or interval-width analysis; repeated seeds estimate within-task variance only.
- Primary outcomes: every metric named in `cases.json` for E1-E3 and E5-E7.
- Cost outcomes: input tokens, output tokens, wall time, user turns, and tool failures.
- Non-inferiority margins are declared before runs and stored with raw results.
- Apply the task-level paired interval rule from `../engineering-flow.md`.
- An inconclusive interval cannot justify release or retirement.
- Decide whether cross-model replication is required from the predeclared error risk and task-level interval. Record cross-model results as robustness evidence, not as a fixed-generation-count gate.
- Preserve project policy, source trace, workflow state, tool protocol, and safety gates unless their own ablation is also non-inferior.
