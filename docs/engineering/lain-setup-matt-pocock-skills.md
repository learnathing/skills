## What it does

`lain-setup-matt-pocock-skills` records the repository's tracker, triage vocabulary and domain-document layout. It can also retain useful existing engineering policy and evidence locations. Setup discovers and confirms project configuration; it does not design the system or impose a technical questionnaire.

## When to reach for it

You invoke `/lain-setup-matt-pocock-skills`; the agent cannot invoke it for you. Use it before tracker-dependent flows or when configuration changes. A small task without an optional engineering-policy file does not require another setup run.

## Configuration and existing policy

Setup reads repository instructions, remotes, existing documents and actual commands. It presents proposed changes before writing, preserves unrelated user content, and updates the selected instruction file's pointer block instead of appending duplicates.

| Artifact | Condition |
| --- | --- |
| `docs/agents/issue-tracker.md` | Tracker configuration |
| `docs/agents/domain.md` | Existing or agreed authoritative glossary/map paths and ADR layout |
| `docs/agents/triage-labels.md` | Triage skill is installed and configured |
| `docs/agents/engineering.md` | Useful sourced engineering policy needs recording |

The optional engineering document can point to design and experiment sources, actual verification commands, delegated technical choices and responsible human authority. Missing values are not permission for private-data transfer, paid resources or production changes. Do not generate empty registers or guess a resource budget.

Reuse the existing domain layout. Explicit configured paths take precedence; otherwise both `GLOSSARY.md` / `GLOSSARY-MAP.md` and legacy `CONTEXT.md` / `CONTEXT-MAP.md` are supported. A workspace or package boundary alone does not prove a domain boundary. A wholly new simple project may default to a lazily created `GLOSSARY.md`, while existing files are not renamed. Both naming families present without explicit authority require a source choice; an unreadable configured source is not silently ignored. The glossary stays vocabulary, not an architecture document.

## Common questions

**Must the project use GitHub?**

No. GitHub, GitLab and local Markdown have templates. Another tracker can be described in project configuration without rewriting skills.

**Must setup run again for technical design or old CONTEXT files?**

No. Engineering policy is optional and the legacy naming convention remains supported. Existing repository and task instructions still govern authority and verification.

**Does setup choose the retrieval engine or data model?**

No. It records sources and authority. Solution decisions belong to the affected task's technical design and evidence.

**Does it create remote labels or provision services?**

Not implicitly. A label mapping is configuration, not authorization to mutate the tracker or external infrastructure.

## It's working if

- Tracker and label mappings match the actual project workflow.
- Existing policy and domain filenames are preserved instead of replaced with guessed defaults.
- Only useful, sourced engineering settings are written.
- Small work does not need an empty policy document or repeated setup.
- Downstream skills can recover their authoritative sources without choosing between conflicting copies.

## Where it fits

This is configuration for tracker-dependent flows, not a design stage. [To-spec](https://aihero.dev/skills-to-spec), [to-tickets](https://aihero.dev/skills-to-tickets) and [wayfinder](https://aihero.dev/skills-wayfinder) consume the settings. [Technical design](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-technical-design.md) can read optional engineering policy. [Domain modeling](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-domain-modeling.md) owns glossary discovery and authorized migration. [Ask Matt](https://aihero.dev/skills-ask-matt) routes daily work.
