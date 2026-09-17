# Optional shared technical constraints

Schema version 1 remains valid without additional fields. Omit this extension for work with no binding shared technical constraints. Do not add empty headings to every ticket.

Add `technical_constraints` to the authoritative Delivery Manifest only after design decisions have accepted sources. Example:

```json
{
  "schema_version": 1,
  "delivery_ids": [
    { "id": "S1", "definition": "Imported content can be retrieved with its source revision.", "source_ids": ["D1"] },
    { "id": "S2", "definition": "A result resolves to the same indexed source revision after an update.", "source_ids": ["D2"] }
  ],
  "technical_constraints": [
    {
      "id": "kb:C1",
      "revision": "1",
      "definition": "Search results reference the indexed document revision.",
      "source": "docs/design/kb.md#c1",
      "applies_to": ["S1", "S2"],
      "verified_by": "S2"
    }
  ]
}
```

`id` is namespaced and stable; `revision` changes only when that constraint's meaning changes. Both form an exact reference such as `kb:C1@1`. IDs allow letters, digits, `.`, `_`, `/`, `-`, and the namespace colon; revisions allow letters, digits, `.`, `_`, and `-`. Definitions and source anchors are non-empty single-line strings. Use a durable source and retain its accepted revision, not an unqualified conversation label.

`applies_to` lists affected delivery IDs, not ticket IDs. `verified_by` is one of those affected IDs whose owner must produce the constraint's verification evidence. This preserves references when provisional tickets become tracker IDs. Use an existing relevant delivery scenario; do not invent behavior just to fill the registry. If necessary, obtain a source-backed verification scenario before publishing.

Each affected ticket adds only the fields it needs:

```markdown
Applies: kb:C1@1
Verifies: kb:C1@1

## Technical trace

- kb:C1@1: Search results reference the indexed document revision.
```

`Applies` is the union of constraints affecting the ticket's `Owns` IDs. `Verifies` contains only constraints whose `verified_by` ID it owns. An affected ticket that does not own verification omits `Verifies`. Include exact definitions in `Technical trace`, their exact source anchors under `Context pointers`, and the actual required checks under `Evidence required`. `Owns` remains unique across tickets; shared `Applies` references are not duplicate ownership.

The existing two-argument validator checks the optional registry, exact definitions and revisions, applicability, verification ownership and source-pointer presence. It rejects references when the manifest has no corresponding registry. It does not fetch sources or prove that the manifest is current, the source supports the claim, evidence is sufficient, or an approver exists. The cold reader and design/source review still own those judgments.

On a constraint revision, re-establish the source, find affected delivery IDs and tickets, update only affected references, rerun validation and affected cold-reader checks. Known-obsolete contracts cannot be implemented just because an old snapshot passes. Unrelated document edits do not invalidate a constraint revision.
