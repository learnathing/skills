---
name: lain-setup-matt-pocock-skills
description: "Configure this repo for the engineering skills: issue tracker, triage labels, domain docs, and optional existing engineering policy."
disable-model-invocation: true
---

# Setup Matt Pocock's Skills

Scaffold the per-repo configuration that the engineering skills assume:

- **Issue tracker**: where issues live, with GitHub, GitLab, local Markdown, and custom trackers supported.
- **Triage labels**: the strings used for the five canonical triage roles.
- **Domain docs**: where `CONTEXT.md` and ADRs live and how consumers find them.
- **Engineering policy, optional**: existing technical-source locations, decision authority and verification commands, not a blanket architecture questionnaire.

This is a prompt-driven skill, not a deterministic script. Explore, present what you found, confirm with the user, then write.

## Process

### 1. Explore

Read the existing repository before proposing configuration:

- `git remote -v` and `.git/config` for the real repository and tracker.
- `AGENTS.md`, `CLAUDE.md`, and any existing `## Agent skills` block.
- `CONTEXT.md`, `CONTEXT-MAP.md`, and relevant ADR locations.
- `docs/agents/` and `.scratch/` for existing tracker or domain conventions.
- Whether `lain-triage` is installed, which determines whether label configuration is needed.
- Evidence of several domain contexts, such as an existing context map or independently named domains. Workspace/package layout can be a clue, not proof that each package is a bounded context.
- Existing design/experiment documents, actual build and verification commands, and project authority rules. Preserve a current `docs/agents/engineering.md`; its absence is not a blocker.

### 2. Present findings and ask

Summarize what exists and what is missing. Lead with the recommended answer, skip questions already settled by discovery, and do not repeat existing approvals.

**Section A: Issue tracker.** Propose the tracker matching the remote. Otherwise ask where the user actually tracks work. GitHub uses its Issues through `gh`; GitLab uses `glab`; local files live under `.scratch/<feature>/`; another tracker can be described in a short project-specific workflow.

Record the choice in `docs/agents/issue-tracker.md`. The GitHub and GitLab templates keep "PRs as a request surface" off by default; do not turn it on or raise it without need.

**Section B: Triage label vocabulary.** Skip when `lain-triage` is not installed. Otherwise offer the existing defaults: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. Collect overrides only when the tracker uses other names. This configures a mapping, not permission to create or alter remote labels.

**Section C: Domain docs.** Reuse an existing layout. Default to a single `CONTEXT.md` and `docs/adr/` for a new simple project. When the repository has real multiple domain contexts, confirm the context map and per-context locations; do not infer domain boundaries solely from package count.

**Section D: Engineering policy, optional.** When existing policy or the current task needs a durable pointer, propose only known technical-source locations, permitted agent choices, responsible human authority and actual verification commands using [engineering.md](engineering.md). Ask only for an unresolved authorization or constraint relevant to this scope. Never infer approval for external costs, private-data transfer, production changes or irreversible choices. Skip this section when there is nothing useful to record; technical design does not require a setup rerun.

### 3. Confirm and edit

Show the draft `## Agent skills` pointer block and the applicable documents before writing. Include `docs/agents/engineering.md` only when Section D produces useful sourced policy. Preserve existing user preferences and surrounding instructions; this is project configuration, not a rewrite of the skills themselves.

### 4. Write

**Pick the instruction file:** edit `CLAUDE.md` if it exists; otherwise `AGENTS.md`; if neither exists, ask which to create. Never create both or overwrite unrelated content. Update an existing `## Agent skills` block rather than appending a duplicate.

Use concise pointers for the actual files:

```markdown
## Agent skills

### Issue tracker

[Actual tracker summary]. See `docs/agents/issue-tracker.md`.

### Triage labels

[Existing label mapping summary]. See `docs/agents/triage-labels.md`.

### Domain docs

[Single-context or context-map summary]. See `docs/agents/domain.md`.
```

Omit the triage pointer and file when Section B was skipped. Add a `### Engineering decisions and verification` pointer to `docs/agents/engineering.md` only when Section D ran; write confirmed or discovered values, not empty registers or guessed defaults.

Use the co-located seed templates without duplicating them into skill instructions:

- [issue-tracker-github.md](issue-tracker-github.md)
- [issue-tracker-gitlab.md](issue-tracker-gitlab.md)
- [issue-tracker-local.md](issue-tracker-local.md)
- [triage-labels.md](triage-labels.md), only when installed and configured
- [domain.md](domain.md)
- [engineering.md](engineering.md), optional

For a custom tracker, write the project-specific workflow from the user's description. Do not change remote settings, provision services, or edit a `SKILL.md` as a setup side effect.

### 5. Done

Report the actual files written and which skills consume them. They remain editable project policy. Re-running setup is unnecessary for ordinary technical design or small implementation changes; use it when configuration has changed or the user asks to reconfigure.
