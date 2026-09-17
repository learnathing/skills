## What it does

`lain-prototype` writes throwaway code that answers one question. It separates interactive UI/logic demonstrations from reproducible technical experiments. Throwaway code does not mean disposable decision evidence, and a prototype does not silently become production.

## When to reach for it

Type `/lain-prototype`, or the agent uses it within an authorized task when a runnable answer is needed.

| Question | Artifact |
| --- | --- |
| Does a state model or rule behave as intended? | An interactive shareable HTML demonstration |
| What should the interface look like? | Radically different UI alternatives |
| Will an approach meet a technical constraint? | A reproducible feasibility, quality, capacity or migration experiment |
| The design is settled and needs production code | Use implement instead |

## Different branches, different evidence

UI and logic prototypes stay minimal, visible and easy for a non-developer to drive. They avoid production polish and tests unrelated to the interactive question. Human preference remains a human decision; the agent cannot choose for an absent reviewer and call it approval.

Technical experiments record the question, source decision, baseline, candidate, environment and data versions, executable commands, measurement method, decision rule, actual result and limitations. Assertions and measurement checks are appropriate here; the UI/logic instruction to skip tests does not apply to validity of evidence.

Retrieval experiments fix the corpus, representative queries, relevance judgments and evaluation unit, and separate tuning from held-out reporting where appropriate. Migration experiments inspect compatibility and an approved recovery path in a disposable environment. A down script alone does not prove reversibility.

## Authority and retained results

Use only permitted data, services and resource budgets. Missing authority does not license paid infrastructure, production changes or private-data transfer. Mark evidence as measured, inconclusive or not run. A proposed command is not a measured result.

Retain useful runners, configurations, raw results and the answer at an authorized durable source. Return accepted conclusions to the design or spec; applying them to production code is separate work. Do not keep secrets or private datasets in a public experiment branch.

## Common questions

**Should technical experiments also have no tests?**

No. Measurement validity can require assertions, fixtures and error handling. Those are evidence safeguards, not premature production hardening.

**Does a plausible proposed experiment count as verification?**

No. It remains unrun until executed. Limited data or an unsuitable environment restrict what the result supports.

**Should the whole application be prototyped first?**

Not with this skill by default. Keep one bounded question and stopping condition. A full-product demonstration is a separately scoped artifact, not permission to ship untested prototype code.

## It's working if

- One explicit question determines the artifact and stopping point.
- Interactive behavior can be inspected directly.
- Technical conclusions have reproducible commands and real results.
- Evidence limitations, permissions and resource constraints are visible.
- Decisions return to the authoritative source without silently shipping throwaway code.

## Where it fits

This model-invoked capability supplies evidence to [grill with docs](https://aihero.dev/skills-grill-with-docs), [wayfinder](https://aihero.dev/skills-wayfinder) and [technical design](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-technical-design.md). [To-spec](https://aihero.dev/skills-to-spec) can cite accepted conclusions. [Ask Matt](https://aihero.dev/skills-ask-matt) routes the set.
