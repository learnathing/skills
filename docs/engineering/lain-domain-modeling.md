## What it does

`lain-domain-modeling` builds and sharpens a project's ubiquitous language while you design: challenging conflicting terms, proposing precise names and testing domain relationships against concrete scenarios and code.

It is the active discipline, not a requirement for reading existing vocabulary. Resolved terms are written into the authoritative glossary as they settle. Implementation details belong in their proper sources, not the glossary.

## When to reach for it

Type `/lain-domain-modeling`, or the agent reaches for it when terminology or a qualifying architectural decision needs work. Other workflows can invoke it explicitly.

| Situation | Direction |
| --- | --- |
| One word refers to two different domain concepts | Clarify and record the canonical terms |
| Code and the stated domain rule disagree | Surface the discrepancy before changing either |
| A hard-to-reverse decision needs its rationale preserved | Offer an ADR if it also involves a real trade-off and would surprise a future reader |
| You only need to use the vocabulary | Read the selected glossary; do not start a modeling session |
| A module's interface shape is the question | [lain-codebase-design](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-codebase-design.md) |

## Domain names and source authority

Read explicit paths from `docs/agents/domain.md` or applicable repository instructions first. Otherwise accept `GLOSSARY.md` / `GLOSSARY-MAP.md` and legacy `CONTEXT.md` / `CONTEXT-MAP.md`. Follow the selected map to the relevant context, including custom target names.

An existing project retains its names. When both naming families exist without explicit authority, resolve the source choice before using one as canonical; do not maintain parallel writable glossaries. A configured or mapped source that cannot be read is a coverage gap, not a reason to switch silently to another file.

For an entirely new simple project, the first resolved term can create `GLOSSARY.md`. Files are lazy: no empty glossary, map or ADR directory merely to run another skill. A package boundary alone does not justify splitting the domain.

## Read-only path checks

The skill includes `resolve-domain-docs.mjs`, requiring Node.js 22. It can check conventional root entry points or explicit glossary/map paths and fails on ambiguity or unreadable selected files. It does not parse prose configuration, follow map contents or verify domain semantics. The agent reads those sources itself. Direct inspection is possible without Node; missing evidence must still be disclosed.

## Common questions

**Must I rename my CONTEXT.md?**

No. Legacy projects continue using it. New spelling is an available convention, not a migration requirement or setup prerequisite.

**Both names exist. Does GLOSSARY.md automatically win?**

No. Explicit project configuration determines authority. Without it, the affected source choice must be resolved before canonical definitions are used or changed.

**Can I request a migration?**

Yes. An authorized migration updates the selected files, maps, configuration and active readers together, preserves unrelated work, and verifies that the same definitions remain reachable. Historical changelogs, frozen evaluation fixtures and commit-pinned external links are not mechanically renamed.

**What belongs in a glossary or an ADR?**

The glossary defines domain concepts and rejected synonyms, not a specification or implementation journal. An ADR is offered only when a decision is hard to reverse, surprising without context and the result of a real trade-off. Existing project conventions still apply.

## It's working if

- Resolved terms update the selected source, not a second glossary with a newer filename.
- The skill distinguishes reading vocabulary from changing the domain model.
- Code contradictions and conflicting meanings are surfaced explicitly.
- Missing configured sources remain visible as gaps.
- An ADR records a meaningful decision rather than every local choice.

## Where it fits

This discipline runs beneath [lain-grill-with-docs](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-grill-with-docs.md), triage, decision mapping and architecture exploration. [Setup](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-setup-matt-pocock-skills.md) records project paths. [lain-ask-matt](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-ask-matt.md) selects the workflow; domain modeling does not replace its specification or authorization boundaries.
