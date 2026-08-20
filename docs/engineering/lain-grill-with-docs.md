## What it does

`lain-grill-with-docs` interviews you about a plan or design while sharpening the repository's domain language and recording durable decisions. It delegates the interview to [lain-grilling](https://aihero.dev/skills-grilling) and the writing discipline to [lain-domain-modeling](https://aihero.dev/skills-domain-modeling).

It works only the **decision-bearing frontier**: choices that change observable behaviour, a domain invariant, a public interface or error mode, or a hard-to-reverse decision. It finishes with a concise decision handoff, so the next skill receives more than a long conversation and a few ADRs.

## When to reach for it

You invoke this by typing `/lain-grill-with-docs`; the [agent](https://www.aihero.dev/ai-coding-dictionary/agent) will not reach for it on its own.

| What you have | Reach for |
| --- | --- |
| No working directory | [lain-grill-me](https://aihero.dev/skills-grill-me) |
| A repository and a change that fits one [session](https://www.aihero.dev/ai-coding-dictionary/session) | `lain-grill-with-docs` |
| An effort too large to settle in one session | [lain-wayfinder](https://aihero.dev/skills-wayfinder) |
| A decision blocked on knowledge in someone else's head | [lain-to-questionnaire](https://aihero.dev/skills-to-questionnaire) |

## Prerequisites

The skill writes into the repository. Terms go to the relevant `CONTEXT.md`; qualifying architectural decisions go under `docs/adr/`. Both files and folders are created lazily. The `lain-grilling` and `lain-domain-modeling` skills must also be installed.

## The decision handoff

The session produces three different artifacts:

| Resolved knowledge | Destination |
| --- | --- |
| Canonical domain vocabulary | `CONTEXT.md` |
| A hard-to-reverse, surprising trade-off | An ADR |
| Stable decision IDs, outcomes, invariants, caller-visible failures, exclusions, and open decisions | A decision handoff in the conversation |

The handoff stays out of `CONTEXT.md`, which remains a glossary. Every confirmed decision receives a stable ID and exact statement; open branches receive separate IDs. This gives [lain-to-spec](https://aihero.dev/skills-to-spec) a bounded source to cite instead of treating "the conversation" as an unauditable source category.

Implementation details the codebase can answer later are not forced into the design tree. An open question blocks the next step only when it can change behaviour, an invariant, an interface, or an error mode.

## Common questions

**Where did all the decisions go?**

The glossary and ADRs hold only durable domain knowledge. The final decision handoff carries feature-specific outcomes and constraints into the next step. Keep the same [context window](https://www.aihero.dev/ai-coding-dictionary/context-window) for `lain-to-spec`; use [lain-handoff](https://aihero.dev/skills-handoff) if the work must cross a real session boundary.

**It ran, but no `CONTEXT.md` or ADR appeared.**

That can be correct when no new term or qualifying architectural decision was discovered. The decision handoff should still appear. If neither the files nor the handoff appear, the delegated skills probably did not load.

**Should I use this or `lain-wayfinder`?**

Use this when the decision tree fits one session. Use `lain-wayfinder` when resolving the path itself requires several sessions and a shared map of decision tickets.

## It's working if

- Codebase-answerable facts are investigated instead of asked of you.
- Questions stay on decision-bearing branches rather than expanding every hypothetical edge case.
- `CONTEXT.md` contains vocabulary only, and ADRs remain rare.
- The final handoff assigns stable IDs to outcomes, invariants, failure decisions, exclusions, and any open decision.
- The skill explicitly says when an open decision prevents `lain-to-spec`.

## Where it fits

`lain-grill-with-docs` is the head of the main build chain:

```txt
lain-grill-with-docs → lain-to-spec → lain-to-tickets → lain-implement → lain-code-review
```

It does the deciding that [lain-to-spec](https://aihero.dev/skills-to-spec) records. [lain-ask-matt](https://aihero.dev/skills-ask-matt) routes across the full set when the starting point is unclear.
