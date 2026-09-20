## What it does

`lain-grilling` is the reusable interview discipline for a plan, decision or idea. It uses a **design tree** to track which decisions depend on others and asks only for choices that still need their authorized owner. Existing answers and delegated choices do not become new approval gates.

## When to reach for it

Type `/lain-grilling`, or the [agent](https://www.aihero.dev/ai-coding-dictionary/agent) reaches for it automatically when the task calls for an interview. It is the model-invoked member of the grilling family.

| Situation | Route |
| --- | --- |
| A plain interview without a workspace | [grill-me](https://aihero.dev/skills-grill-me) |
| Requirements and decisions in a workspace | [grill-with-docs](https://aihero.dev/skills-grill-with-docs) |
| Several dependent planning scopes | [wayfinder](https://aihero.dev/skills-wayfinder) |
| A question that needs a demonstration | [prototype](https://aihero.dev/skills-prototype), within the authorized scope |
| Another [skill](https://www.aihero.dev/ai-coding-dictionary/skill) needs an interview | Invoke `lain-grilling` rather than copying the technique |

## Rounds and the frontier

The **frontier** contains unresolved decisions whose prerequisites are settled. Independent questions can share a round; a question that depends on an unanswered one comes later. Numbers and recommendations make it easy to respond without quoting every question. The grouping and presentation adapt to the user's needs, with no fixed question or round count.

Facts are investigated with available tools. Independent research can be delegated when useful; a missing delegation tool does not prevent direct investigation. Only work that depends on missing evidence waits.

The agent makes routine, reversible choices within the authority supplied by the request and conversation. It distinguishes those choices from user decisions. Recommendations outside that authority remain proposals until accepted. New evidence or changed instructions reopen the affected branches, rather than restarting the whole interview.

## Common questions

**Can I ask for one question at a time?**

Yes. Tell the agent how you want to answer. Grouped independent questions are a default, not a requirement that overrides your instructions.

**Where did `/batch-grill-me` go?**

Round-based interviewing lives in `lain-grilling`, so the wrappers use the same mechanism. There is no separate batch skill to install.

**It ran out of questions and started building.**

An interview-only request does not authorize implementation. Work already authorized can proceed once its prerequisite decisions are settled. There is no universal extra confirmation round, and ending an interview with unresolved choices must not be reported as agreement.

**Can it decide anything without asking me?**

Yes, within the authority you have supplied. Routine, reversible choices and facts it can investigate should not be sent back for approval. Consequential choices outside that authority still need their responsible owner. The summary should distinguish delegated selections from decisions you made yourself.

**Can I stop or limit the interview?**

Yes. Your latest instruction controls its scope and depth. The skill does not impose a numeric cap of its own. When you stop early, it preserves unresolved choices and their consequences instead of silently selecting answers.

**I installed a wrapper but the interview does not run.**

`grill-me` and `grill-with-docs` depend on this skill; the latter also uses [domain-modeling](https://aihero.dev/skills-domain-modeling). With a selective installation, include the dependencies. A missing dependency should be reported rather than claiming it ran.

## It's working if

- You can answer independent questions together, or use the rhythm you requested.
- A question does not require guessing an answer you have not given yet.
- The agent looks up facts instead of asking you to research them.
- Delegated choices keep moving, and recommendations are not misreported as your decisions.
- A stop instruction produces a useful summary with remaining choices visible.
- Already authorized work proceeds without duplicate approval once its prerequisites are settled.

## Where it fits

`lain-grilling` is a reusable discipline, not a mandatory build step. [Grill-with-docs](https://aihero.dev/skills-grill-with-docs) adds requirement handoffs and domain records; [grill-me](https://aihero.dev/skills-grill-me) exposes a plain interview. [Ask Matt](https://aihero.dev/skills-ask-matt) routes among these and the other workflows.
