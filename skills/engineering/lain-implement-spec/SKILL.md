---
name: lain-implement-spec
description: "Coordinate approved implementation tickets into one verified integration branch, using parallel worktrees only when the available harness supports them."
disable-model-invocation: true
---

# Implement a spec

Coordinate an already-authorized delivery scope. Tickets form a task graph, not a list to dispatch all at once. Preserve the fork's single-ticket execution gates and add integration evidence; parallelism does not weaken either. Adapted from upstream `implement-spec` at `4588b32ecab9ecc9fc8cc6b6c5e7d675b6004b0d`.

## 1. Establish scope and ownership

Read the originating spec, approved tickets and comments, their source manifest when present, and the configured tracker. If tracker configuration is missing, tell the user to run `/lain-setup-matt-pocock-skills`. Do not default to GitHub or invent a tracker lifecycle.

Recover exact source IDs and definitions, `Owns`, blocking edges, and applicable `Applies` / `Verifies` constraint revisions. Confirm coverage, unique ownership, valid references and an acyclic graph against the authoritative approved artifacts. An unreadable source is not an absent requirement. Do not drop a difficult scenario to make the graph ready. Reuse current technical assessments or call the Skill tool with "lain-technical-design" in assessment-only mode for the affected scope. A dependency-free ticket with unresolved technical prerequisites is not ready.

Record the invoking worktree's `HEAD`, branch, staged and unstaged diffs, and untracked files. Preserve that baseline. Create a uniquely named integration branch and a separate clean worktree from the agreed base commit. Never reset or clean the user's worktree. Reusing a prior run requires verifying its recorded ownership, refs, sources and actual Git state first; a name match alone is insufficient.

Keep a durable coordinator checkpoint in the configured scratch area, excluded from implementation commits. Record source anchors and revisions, the fixed integration base, branch and worktree ownership, ticket states, evidence references and unresolved obligations. Store references instead of duplicating entire conversations. Do not store secrets. A checkpoint is an index; actual source, Git state and check results remain authoritative.

## 2. Dispatch the ready frontier

A ticket can start only when every prerequisite is integrated at a recorded integration tip with its required prerequisite checks passed, its source and shared-constraint revisions remain accepted, and its work has one owner. A worker's claim that it is done does not release a dependent ticket.

Use real implementer subagents in separate worktrees when the harness supports them. Bound concurrency by available execution capacity and shared-resource conflicts, not a fixed assumed agent count. Two tickets with no declared blocking edge can still contend on a shared interface, migration or generated file. Serialize their conflicting work or reconcile the missing source constraint; do not invent a product decision to keep workers busy.

Each worker receives the original source pointers and exact revisions, its owned IDs, applicable verification duties, permitted actions, worktree ownership and the integration commit it must start from. It verifies that base before editing. A wrong or dirty base is corrected only after ownership is established; no unconditional reset, checkout over user changes or deletion is allowed.

Tell each worker to call the Skill tool with "lain-implementation" and perform its complete six-state protocol. Do not call a user-invoked skill from this workflow, and do not replace the shared discipline with a call to TDD alone. The worker reports its actual commit, source revisions, tests and other evidence, fallback entries, reviewer coverage, dispositions and remaining obligations. Missing required independent review or incomplete coverage blocks completion exactly as it does for a single ticket.

If subagents are unavailable, disclose the limitation. Continue serially with the shared discipline only within existing authority and with complete source recovery; do not claim concurrency, fresh-context review or independence that did not occur. If the remaining scope cannot be completed with available context or review capability, preserve the checkpoint and report the blocked scopes.

## 3. Integrate serially and revalidate

Only one merger writes the integration branch at a time. Before each merge, inspect the worker commit and evidence against its declared source and base; verify the worktree is owned and clean and the required review gate is complete. Re-read changed source revisions before accepting stale worker results.

Synchronize against the current integration tip, not a tip observed before another worker merged. If the integration tip changes between synchronization and merge, synchronize again. Resolve conflicts from both sides' original intent within authority; pause affected work when a consequential source decision is unresolved. Do not use force updates or overwrite a branch to manufacture a fast-forward.

Run relevant combined tests and assigned integration, migration, quality or recovery checks after each merge. Any new merge-resolution or repair code must pass the same shared implementation and review gates before it is accepted. Earlier review evidence covers only the earlier target; refresh review and checks when the relevant target changes. Do not mark the ticket integrated or release its dependents while these checks remain unmet.

Preserve the last verified integration point. If a merge fails validation, keep the failing state and evidence isolated for authorized repair; do not dispatch dependents from it or reset away another owner's work. A changed shared constraint stops all affected pending or running scopes until the source is reconciled, affected tickets are updated under authority and readiness is restored. Unaffected scopes may continue.

## 4. Verify the whole scope

When all approved tickets are integrated, run the relevant full validation on the actual integration tip. Check the originating spec's complete delivery coverage and all assigned verification obligations, not only each worker's local report.

Call the Skill tool with "lain-code-review" against the original integration base and current integration HEAD, supplying the original spec and accepted technical sources as authority. Keep Standards, Spec and Design coverage with one independent reviewer and coordinator verification. Do not impose one reviewer for the entire project's lifetime; explicit extra-review obligations still apply.

Fix blockers within scope through the shared implementation discipline, rerun affected integration validation, then run blocker-only review verification against the updated full integration target. Stop for a surviving blocker, a source/authority decision or an exhausted caller budget. `INCOMPLETE` and `NOT INDEPENDENTLY VERIFIED` remain non-pass states. A direct-review substitute requires explicit task or project policy and never waives missing coverage. An empty finding list does not prove completion.

## 5. Report and clean up safely

Report code completion, integrated completion, review status and release readiness separately. A draft PR may be opened only under applicable publication authority and after the integration branch has a real diff. Call the Skill tool with "lain-pr" for its body when needed; the formatting skill grants no additional authority. Mark a draft ready only after the applicable gates complete. Resolve tickets only when both authorization and the configured tracker lifecycle permit it; code completion alone must not prematurely close tickets or their parent spec. Production actions need separate authority.

Remove only this run's explicitly recorded worker worktrees after confirming they are clean and their commits are reachable from the accepted integration tip. Use non-forcing removal. Never remove the invoking worktree, a foreign worktree, uncommitted work or unmerged recovery work. Leave blocked worktrees and evidence recoverable, and retain the integration branch and checkpoint for review or resume. Honor a later stop or abort instruction without destroying unrelated work.

Suggest `/lain-retro` only as an optional user-invoked follow-up, not a prerequisite to completing a small delivery.
