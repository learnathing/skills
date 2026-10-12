# Issue tracker: Local Markdown

Issues and specs for this repo live as markdown files in `.scratch/`.

## Conventions

- One feature per directory: `.scratch/<feature-slug>/`
- The spec is `.scratch/<feature-slug>/spec.md`
- Implementation issues are one file per ticket at `.scratch/<feature-slug>/issues/<NN>-<slug>.md`, numbered from `01`, never a single combined tickets file
- Triage state is recorded as a `Status:` line (see `triage-labels.md` for the role strings). Publication readiness is not execution or verification completion.
- Once implementation starts, keep a short `## Current state` after the outcome, with `Execution:`, `Verification:`, `As of:` and `Remaining:`. Use actual source/revision/evidence links, preserve unavailable review and integration duties, and do not infer completion from `ready-for-agent`.
- Comments and history append under `## Comments`, after updating any current authoritative section affected by an accepted change or new observation. Preserve earlier decisions and mark replacements. Unresolved differences stay visible rather than silently changing the accepted contract.

Reuse existing project status conventions; these record fields do not create new remote labels or bypass completion gates. Native tracker lifecycle state, when configured instead, remains authoritative. Reading history is still required when it contains relevant sources, not a substitute for keeping the present state readable.

## When a skill says "publish to the issue tracker"

Create a new file under `.scratch/<feature-slug>/` (creating the directory if needed). Validate ready drafts using the ticket validator's default publication mode. For already-published implementation records, `--phase=tracking` preserves current status and checked criteria while retaining source, ownership and dependency checks. It never certifies completion or resets tickets to ready.

Where a multi-file effort otherwise has no visible entry, add descriptive links to the existing project index or README within the authorized scope. Only create a small new index if no suitable entry exists. Link into `.scratch/` rather than relocating sources or copying their status. Do not modify a parent issue when the calling skill forbids that. Verify local target paths and actual anchors; IDs in tables do not create anchors.

## When a skill says "fetch the relevant ticket"

Read the file at the referenced path, its current state, and relevant history and evidence. The user will normally pass the path or issue number. Before claiming work, check whether it has already started or completed and whether another session owns it. Release a dependency only from the evidence and gate required for that dependency, not a readiness label alone.

## Wayfinding operations

Used by `/lain-wayfinder`. The **map** is a file with one **child** file per ticket. Decision tickets are not implementation tickets and do not use the implementation-ticket validator.

- **Map**: `.scratch/<effort>/map.md` (the Notes / Decisions-so-far / Fog body).
- **Child ticket**: `.scratch/<effort>/issues/NN-<slug>.md`, numbered from `01`, with the question in the body. A `Type:` line records `research`/`prototype`/`grilling`/`task`. A `Status:` line records `open`, `claimed` or `resolved`; an older absent status is unknown, not an automatic claim.
- **Blocking**: a `Blocked by: NN, NN` line. A ticket is unblocked when every listed decision has an evidence-backed resolution under the map's authority.
- **Frontier**: open, unblocked and unclaimed children; first by number wins. Do not treat claimed or resolved work as fresh.
- **Claim**: set `Status: claimed` and record the driving developer before work, respecting existing ownership.
- **Resolve**: update the current `## Answer`, retain any superseded answer in history, set `Status: resolved` only when the decision gate is satisfied, then append a descriptive source link to Decisions so far. An implementation action still needs separate authority.
