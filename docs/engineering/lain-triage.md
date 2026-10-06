## What it does

`lain-triage` evaluates incoming issues and, when configured, external pull requests. It recommends a category and state, verifies the request, asks for missing decisions when necessary and records an agent-ready brief or another directed outcome.

It is not a second pass over tickets already produced by `lain-to-tickets`. The maintainer controls state changes; the skill recommends and waits before applying the outcome.

## When to reach for it

You invoke `/lain-triage` with a request such as "show what needs attention", "look at #42" or "move #42 to ready-for-agent". It is not model-invoked.

| Situation | Direction |
| --- | --- |
| Raw reports or untriaged incoming requests | `lain-triage` |
| Your own idea needs decisions | [lain-grill-with-docs](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-grill-with-docs.md) |
| A spec needs delivery tickets | [lain-to-tickets](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-to-tickets.md) |
| A confirmed bug needs deeper diagnosis | [lain-diagnosing-bugs](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-diagnosing-bugs.md) |

## Prerequisites and sources

Use the configured tracker and triage label vocabulary. Missing required configuration is a reason to ask the human to run setup, not to invoke that user-only skill implicitly. Whether external PRs count, and who is external, comes from the tracker configuration.

Use authoritative glossary/map paths from `docs/agents/domain.md` when configured. Otherwise accept `GLOSSARY.md` / `GLOSSARY-MAP.md` or legacy `CONTEXT.md` / `CONTEXT-MAP.md`, following the selected map. Preserve existing names. Resolve ambiguous naming families before treating either as canonical; an unreadable configured source is a coverage gap, not an absent optional glossary.

## Roles and outcomes

Each triaged item has one category (`bug` or `enhancement`) and one state. Actual tracker labels may differ from these canonical roles:

| State | Meaning |
| --- | --- |
| `needs-triage` | Maintainer evaluation is needed |
| `needs-info` | Specific information is needed from the reporter |
| `ready-for-agent` | The next work is specified in an agent brief |
| `ready-for-human` | The brief explains why human work is needed |
| `wontfix` | The request will not be actioned |

Conflicting states require a maintainer decision. For a PR, an agent-ready brief describes the remaining work on its attached code; human-ready means the next step belongs to a human.

Gather the full item and comments, prior triage notes, relevant code and any attached diff. Check for existing implementation and prior rejection by domain concept, then recommend an outcome. Verify a bug's reproduction or a PR's claim before writing a confident brief. Report failed reproduction or insufficient evidence honestly.

Already implemented requests close with a pointer to the implementation, not an entry in the rejection knowledge base. Rejected enhancements can create a sourced `.out-of-scope/` record; rejected bugs receive an explanation. Needs-info comments preserve what is established and ask specific remaining questions. Every tracker comment or issue posted by triage starts with the AI-generated disclaimer specified in the skill.

## Common questions

**Should generated delivery tickets be triaged again?**

No. Triage handles incoming work. Tickets created through the approved spec-to-ticket flow already carry their delivery contract and readiness information.

**Does the skill apply its recommendation immediately?**

No. It presents the recommendation and waits for direction. An explicit state override follows the confirmation described by the skill and need not repeat the full interview.

**Does it support PRs as well as issues?**

Yes when the tracker configuration enables them. Discovery filters for external PRs, while an explicitly named PR is handled regardless of author.

**Does changing domain naming change tracker behavior?**

No. Only source discovery changes. Existing glossary names remain valid, and triage must not create a duplicate glossary. Active terms and qualifying ADRs are maintained through domain modeling; the original request and its comments remain available to downstream implementation and review.

## It's working if

- Full item context and prior answers are read rather than inferred from a listing.
- Each outcome has exactly one category and one state, without unresolved role conflicts.
- Verification evidence supports the brief, or missing evidence is stated.
- Existing implementations and prior rejections are distinguished.
- Domain terms come from the authoritative source, not a filename preference.
- Posted comments include the required AI-generated disclaimer.

## Where it fits

This is an on-ramp for incoming requests. Ready work can move to [lain-implement](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-implement.md). When clarification is needed, the skill uses grilling and [lain-domain-modeling](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-domain-modeling.md), preserving the requirement source while recording terms and qualifying decisions in their proper documents. [lain-ask-matt](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-ask-matt.md) maps the alternatives.
