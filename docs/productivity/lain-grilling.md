## What it does

`lain-grilling` clarifies a plan or decision without asking the user to do the agent's research or technical design. The agent investigates, recommends an approach and handles choices within existing authority. Questions are reserved for material differences that evidence, intent and delegation cannot settle.

A **design tree** tracks dependencies. It is not a checklist of questions the user must answer, and finishing an interview does not prove technical readiness.

## When to reach for it

Type `/lain-grilling`, or the [agent](https://www.aihero.dev/ai-coding-dictionary/agent) uses it when an interview or pressure-test is needed. It remains model-invoked.

| Situation | Route |
| --- | --- |
| Clarify an idea without a workspace | [Grill me](https://aihero.dev/skills-grill-me) |
| Clarify a requirement against project sources | [Grill with docs](https://aihero.dev/skills-grill-with-docs) |
| The goal is clear but the implementation approach is not | [Technical design](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-technical-design.md) |
| Another skill needs a bounded interview | Use this discipline rather than copying its questions |

## A smaller human-question frontier

The **frontier** contains only decisions that still need human input. Discoverable facts and authorized technical choices remain agent work. Independent questions can share a round; questions depending on an unanswered choice come later. Each question gives a recommendation and explains what a different answer would change for the user.

A caller-visible choice need not be asked again when existing intent or delegation already supports it. Conversely, model confidence does not authorize a new cost, data transfer or irreversible operation. Recommendations, delegated choices and user decisions remain distinguishable.

Stop when no material human-owned question remains for the current scope, not when every possible design branch has been explored. Remaining evidence gaps still block the work that depends on them.

## Common questions

**Must I understand implementation details to finish the interview?**

No. The agent investigates technical questions and explains any remaining choice through outcomes and trade-offs. Saying that you do not know a technical answer should return the investigation to the agent, not produce the same question in different jargon.

**Can I ask for deeper discussion or one question at a time?**

Yes. Explicit learning and design co-creation requests can go deeper. Your latest instruction controls scope, rhythm and stopping; there is no universal question quota.

**Does ending the interview authorize building?**

No. An interview-only request ends with a summary. Already authorized work can continue when its prerequisites are settled. A stop instruction does not accept unresolved proposals.

**Do I have to make every decision myself?**

No. The agent makes choices supported by the supplied intent and authority. An unresolved preference or permission is different from an unknown fact; it cannot be settled merely by researching or experimenting.

## It's working if

- The agent uses existing sources before asking you for information.
- Questions explain consequential outcomes rather than demand technology selections.
- Harmless wording differences do not interrupt progress.
- Delegated decisions keep moving without being attributed to you.
- Stops, evidence gaps and unaccepted choices remain explicit.

## Where it fits

This is a reusable clarification discipline, not a mandatory build step. [Grill with docs](https://aihero.dev/skills-grill-with-docs) adds a source-backed handoff and conditional domain work; [grill me](https://aihero.dev/skills-grill-me) exposes a plain conversation. [Ask Matt](https://aihero.dev/skills-ask-matt) selects the route.
