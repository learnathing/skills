## What it does

`lain-setup-matt-pocock-skills` records the repository's tracker, triage vocabulary and domain-document layout. It can also retain useful existing engineering policy and evidence locations. Setup discovers and confirms configuration; it does not design the system or impose a technical questionnaire.

The local-Markdown tracker convention now distinguishes publication readiness from ongoing execution and verification. It does not force every tracker to adopt new labels or a second state machine.

## When to reach for it

You invoke `/lain-setup-matt-pocock-skills`; the agent cannot invoke it for you. Use it before tracker-dependent flows or when configuration changes. A small task without an optional engineering-policy file does not require another setup run.

## Configuration and existing policy

Setup reads repository instructions, remotes, existing documents and actual commands. It presents proposed changes before writing, preserves unrelated content, and updates the selected instruction file's pointer block instead of appending duplicates.

| Artifact | Condition |
| --- | --- |
| `docs/agents/issue-tracker.md` | Tracker configuration |
| `docs/agents/domain.md` | Existing or agreed domain-document layout |
| `docs/agents/triage-labels.md` | Triage skill is installed and configured |
| `docs/agents/engineering.md` | Useful sourced engineering policy needs recording |

Optional engineering policy records known sources, verification commands and authority. Missing settings are not permission for private-data transfer, paid resources or production changes. Do not generate empty registers or guess budgets. Reuse the existing domain layout; package boundaries alone do not prove domain boundaries. `CONTEXT.md` remains vocabulary, not an architecture notebook.

## Readable local tracking

Local specs and implementation tickets remain in `.scratch/`. When work starts, Current state records execution, verification, the actual checked source/revision and remaining duties. Comments preserve history; material current limitations are not left only at the end of that history. Tracking validation permits live status and checked criteria without loosening draft publication requirements.

Reuse a visible project index or README for descriptive links into a multi-file effort. Create a small index only when it is actually missing and authorized; do not relocate files or copy a second status register. Link to a real source heading or anchor, not an ID that merely appears in a table.

Decision-map tickets keep their own open/claimed/resolved lifecycle and do not run through the implementation-ticket validator. Native remote trackers retain their existing lifecycle conventions.

## Common questions

**Must the project use GitHub or these local states?**

No. GitHub, GitLab and local Markdown have templates; other trackers can use project configuration. Existing native status and ownership rules stay authoritative.

**Must setup run again for every implementation?**

No. Reconfigure only when needed or requested. The artifact writer can use existing authority and state conventions without another setup ceremony.

**Does setup mark old work done or create remote labels?**

No. Configuration is not authority to change an issue lifecycle, create labels or infer evidence. Historical tickets need an actual source/evidence check before their current state is updated.

## It's working if

- Tracker and label mappings match the actual project workflow.
- Readiness is not mistaken for completion or a free claim.
- Current evidence gaps are easy to find without erasing their history.
- A visible entry reaches local artifacts without duplicating their contents.
- The [shared artifact writing reference](https://github.com/learnathing/skills/blob/main/docs/productivity/lain-writing-for-agents.md) keeps exact keys and authority alongside clear explanations.

## Where it fits

This is configuration for tracker-dependent flows, not a design stage. [To-spec](https://aihero.dev/skills-to-spec), [to-tickets](https://aihero.dev/skills-to-tickets) and [wayfinder](https://aihero.dev/skills-wayfinder) consume the settings. [Technical design](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-technical-design.md) can read optional engineering policy. [Ask Matt](https://aihero.dev/skills-ask-matt) routes daily work.
