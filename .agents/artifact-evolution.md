# Artifact evolution: current state, exact sources and optional visuals

Baseline: `8b6a047a2a876bfd8479208fb831db97600ece16`. This change builds on the shared artifact writing mode, not on an unmerged implementation branch. It changes skill rules, local tracker templates, validators and synthetic examples; it does not rewrite a user's project or decide its unresolved product exceptions.

## What changes

| Observed class of problem | Change |
| --- | --- |
| Ready labels used for both fresh and implemented work | Preserve publication validation; add explicit tracking validation and compact current state |
| A spec reads like one large test-script matrix | Organize rules by reader question, then place paired verification examples beside them |
| New limitations exist only in Comments | Update the current authoritative section within authority before appending history |
| Same constraint ID/revision has multiple definitions | Compare relevant current manifests; keep explanations separate from exact normative copies |
| Bare paths and table IDs are mistaken for usable links | Descriptive links, visible entry points and a scoped read-only link checker |
| More diagrams are assumed to mean clearer documents | Choose a representation by question, preserve source revision and a text equivalent |

## Validation and boundaries

```sh
node --test skills/engineering/lain-to-tickets/*.test.mjs scripts/*.test.mjs
node scripts/check-engineering-flow.mjs
```

New runtime tools have no package dependencies:

```sh
node skills/engineering/lain-to-tickets/validate-tickets.mjs source-manifest.json tickets
node skills/engineering/lain-to-tickets/validate-tickets.mjs source-manifest.json tickets --phase=tracking
node skills/engineering/lain-technical-design/check-constraint-revisions.mjs scope-a.json scope-b.json
node skills/productivity/lain-writing-for-agents/check-local-links.mjs . path/to/index.md
```

Default publication rules, schema v1, exact definitions, unique ownership, dependency cycles and per-scope technical-constraint checks remain. Tracking strips fenced examples and appended Comments/History from its active contract checks; it requires one current-state record, not a new completion gate. Do not discard completed tickets from the validator's declared scope or reset checkboxes to appease draft validation.

The cross-manifest tool checks supplied definition identity, not semantic equivalence, authority or freshness. The link checker supports simple inline links/images, standalone reference definitions, explicit anchor elements and simple ASCII ATX heading slugs. It does not fetch external links or claim a full Markdown parse; unsupported destinations and renderer-specific anchors remain unverified. See each command's output scope rather than calling its pass universal link validity.

The [synthetic examples](../evals/fixtures/artifact-evolution/README.md) demonstrate a visible entry into hidden documents, a rules-first navigation contract, a diagram with its failure branch, separate verification status, and a comparison that retains an untested alternative. They contain no uploaded private project files or actual execution claims.

Mermaid source and text equivalents are supplied. Rendering and human comprehension are separate checks; do not report them as done from syntax/presence tests. [The evaluation plan](../evals/artifact-evolution.md) compares matched content with and without targeted visuals and includes no-skill generation, rather than rewarding shorter prose or more diagrams.

## Integration

No new user-invoked skill, plugin registration, mandatory review stage, automatic tracker mutation, or renderer dependency is added. Existing artifact-mode consumers reach the current-state and visual references conditionally through the same shared writer. If the implementation discipline is later extracted into `lain-implementation`, retain that source's gates and its artifact-mode pointer; do not recreate an obsolete full implementation entry point.
