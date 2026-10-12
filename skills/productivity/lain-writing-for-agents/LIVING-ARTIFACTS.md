# Current truth and durable history

Read this when creating or updating an artifact that will outlive one work session. Apply it within the caller's existing authority and update step, not as another approval ceremony. A short, one-use answer needs no lifecycle register.

## Current state is not publication readiness

A ready requirement says an agent can start; it does not say implementation, integration, verification or release is complete. Use the configured tracker states and the actual evidence. Never select work from `ready-for-agent` alone: inspect its current execution state, claim owner, dependencies and unresolved review duties first.

For an implementation ticket that has started, put a compact `## Current state` after the outcome and before the acceptance criteria. In local Markdown use these literal field names, with values in the reader's language:

```text
Execution: Implemented on <revision>; not yet integrated.
Verification: Tests passed (<evidence link>); NOT INDEPENDENTLY VERIFIED.
As of: <actual checked revision or source record, and check date when known>
Remaining: <unmet duties, material limitations, and next responsible ticket or owner>
```

This is a view of observed work, not another source of requirements. On a real tracker, reuse its native state, links and existing summary rather than maintaining a competing state machine. Explain important limitations in the main reading path. Do not invent dates, owners or review exceptions. An unknown state stays unknown. `None` is appropriate only when the inspected evidence supports no remaining obligation.

`Status:` retains its configured meaning. Do not keep resetting it to a publication label after implementation. In the ticket validator, the default `publication` phase checks ready drafts. Use `--phase=tracking` for already-published local tickets with a Current state record; keep the full delivery scope and all source/ownership/graph checks. Tracking success is structural integrity, not readiness, verified completion, or permission to close work. Preserve checked acceptance evidence; never uncheck it merely to pass draft validation.

## Update current meaning before appending history

When a finding changes behavior, limitations, readiness, or the next action, identify its authoritative section and owner. Within existing authority, update that current section and its affected views, then append a dated history entry naming what changed, why, and the source/revision that supersedes it. Keep prior meanings recoverable. Do not rewrite another session's source or silently change a frozen definition.

If a consequential difference is not accepted, show it near the beginning as an unresolved difference, name the affected work, and leave the accepted source intact. A comment is evidence of an observation or decision, not automatic authority to rewrite a requirement. History must not be the only place containing a current blocker, user-visible cost or known limitation.

Distinguish requirement, accepted exception, observed implementation behavior, and open conflict. Existing code does not automatically override a requirement. A summary must be no more certain than its evidence: an untested alternative is not a failed experiment, a local check is not production verification, and an agent-operated GUI check is not human acceptance. Identify who or what performed a check when that distinction matters.

Check the current-state paragraph against the source and evidence, including the unresolved tail of the history. Updating its check date does not change a decision revision; changing a decision's meaning does.

## Make the route to the source usable

Use descriptive Markdown links with the stable ID/revision beside them, not backticked paths or bare IDs alone. For local targets, verify the file and anchor in the intended reader. An ID in a table cell is not automatically an anchor. Use a real heading or an explicit supported anchor. Do not assume every renderer makes the same heading slug.

Use the repository's existing visible index or README to point into a multi-file effort, particularly when artifacts live under a hidden directory. Keep it an index: title, purpose, and link to each authoritative artifact or current-state record, not another copy of status and requirements. Create a new index only when no suitable entry exists and the task authorizes it. Do not relocate existing artifacts merely for visibility, or modify a protected parent issue when the caller forbids that.

At a handoff, distinguish supplied files, external links and unavailable dependencies. Check local links without fetching external services merely to certify an archive. A missing attachment is not proof the source never existed. Cite the relevant section and revision rather than requiring the reader to search an entire Comments history.

For a read-only mechanical check of simple inline links/images and reference definitions, run `node <this-skill-directory>/check-local-links.mjs <repository-root> <file.md> ...`. It checks local destinations, explicit anchor elements and simple ASCII ATX heading slugs. External links are counted but not fetched; renderer-specific headings and unsupported destination syntax are reported as unverified (exit 2), and missing supported targets fail (exit 1). It is not a complete Markdown parser. A zero exit does not validate shortcut-link syntax, every renderer, or source semantics; inspect the report's checked scope and check the actual reader when needed.
