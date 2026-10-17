## What it does

`lain-grill-me` clarifies a plan or decision through recommendations and the questions that still need your input. You can begin with a high-level goal; you do not have to supply a complete design or choose unfamiliar implementation details.

It is a stateless conversation entry point. It produces a summary, not project files, and does not authorize implementation merely because the conversation is finished.

## When to reach for it

You invoke `/lain-grill-me`; the agent does not invoke it automatically. Reuse relevant existing conversation context instead of restarting settled decisions.

| Situation | Route |
| --- | --- |
| An idea, plan or decision needs clarification | `lain-grill-me` |
| The requirement must be checked against a repository | [Grill with docs](https://aihero.dev/skills-grill-with-docs) |
| Technical choices remain after goals and constraints are clear | [Technical design](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-technical-design.md) |
| You want to learn the trade-offs in depth | State that learning goal when asking |

## Recommendations before questions

The shared [grilling discipline](https://aihero.dev/skills-grilling) uses a design tree to organize work, not to require an answer for every branch. The agent investigates facts and resolves choices within existing authority. The human-question frontier contains the consequential differences it cannot settle from evidence, intent or delegation.

Questions explain what changes for you and include a recommendation. When discussion cannot answer a technical question, the agent identifies the investigation or smallest authorized experiment rather than continuing to rephrase it. Unknown preferences and missing permissions remain your decisions, not facts an experiment can manufacture.

## Common questions

**When does the interview end?**

When this scope has no material question that still needs your input, or when you stop it. Technical work can remain after the questions end. No branch count or number of rounds proves that the requirements are aligned.

**What if I do not know a technical answer?**

The agent should take back the research or design. It must explain any remaining product choice in terms of outcomes, not require you to learn the underlying implementation first.

**Can I ask one question at a time or go deeper?**

Yes. State the rhythm or depth you need in the current conversation. There is no need to edit global instructions just to change this interview.

**Does an answer of "stop" accept the recommendations?**

No. The summary preserves unresolved choices and their consequences. Interview-only work does not authorize experiments, publication or implementation.

## It's working if

- You can start from the goal instead of preparing a technical design.
- The agent researches facts and presents a recommendation before escalating a choice.
- You can understand the remaining trade-off without a vocabulary lesson.
- The summary separates your decisions, delegated choices and open questions.
- The agent respects stopping or deepening instructions without restarting settled work.

## Where it fits

This is the user-invoked front door to [lain-grilling](https://aihero.dev/skills-grilling). [Grill with docs](https://aihero.dev/skills-grill-with-docs) is the repository-aware alternative; [Ask Matt](https://aihero.dev/skills-ask-matt) routes among both and the delivery workflows.
