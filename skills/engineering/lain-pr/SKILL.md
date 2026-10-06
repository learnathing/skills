---
name: lain-pr
description: "Write or revise a pull request body using source-linked intent, actual verification evidence and merge risk. Use when preparing a PR description or explaining a completed change for review."
metadata:
  credits:
    skill: show-me
    author: Dex Horthy
    organisation: Humanlayer
    url: "https://github.com/humanlayer/skills/blob/main/plugins/show-me/skills/show-me/SKILL.md"
---

# PR body

Organize the evidence already available for a change. This is a format reference, not authority to push, open or merge a PR, close an issue, change files, or deploy. Take those actions only when separately authorized.

Read the originating request or spec and the intended diff. Use authoritative glossary/map paths from `docs/agents/domain.md` when configured. Otherwise accept `GLOSSARY.md` / `GLOSSARY-MAP.md` or legacy `CONTEXT.md` / `CONTEXT-MAP.md`, following the selected map for the affected context. If both naming families exist without explicit authority, report the ambiguity rather than silently choosing or creating a second glossary. An unreadable configured source is a coverage gap, not absence.

## Format

```markdown
## Summary

<source-linked purpose and smallest useful view of the change>

## Evidence

<claim or acceptance ID>: <actual command or artifact and observed result>
Before: <recorded baseline, or not captured>
After: <recorded result, or not run>

## Merge risk

Door: <one-way or two-way, with the reason>
Blast radius: <affected callers, data, interfaces or operational scope>
Rollback: <known reversal path and any limitations>

## Remaining obligations

<unmet verification, integration, independent review or release duties, when any>
```

## Summary

Describe intent from the authoritative source, not by inferring requirements from the diff. Use a small pseudocode sketch for logic, a call tree for execution, a component or file tree for boundaries, a Mermaid diagram for interactions, or a diff sketch when the surrounding shape is already known. Use only the view that helps this reviewer; a one-line change need not acquire a diagram. Place each view beside the statement it explains. The visual vocabulary is adapted from `show-me`; attribution is in [CREDITS.md](CREDITS.md).

## Evidence

Reuse actual implementation and review evidence with its source, target revision and acceptance IDs when present. Distinguish changed behavior from preserved behavior: a preservation check may pass both before and after. Do not manufacture a failing baseline for it.

For a changed behavior, prefer a recorded before/after pair when available. Missing Before evidence stays `not captured`; missing execution stays `not run`. A suggested command, pseudocode, screenshot mockup or completed checklist is not an execution result. Pseudocode can explain a test but must not replace its actual command and result. Redact secrets and private data in any quoted output.

Choose evidence by the claim. Visual changes benefit from screenshots; transactions, error semantics, capacity, migration and algorithm quality need their corresponding checks. A green test suite does not substitute for an unrun required benchmark or release check. Do not reclassify `INCOMPLETE` or `NOT INDEPENDENTLY VERIFIED` review as a pass.

## Merge risk and completion

Explain reversibility, not a risk adjective alone. Code rollback may not restore migrated or deleted data. Name the actual affected consumers and operations rather than forcing the blast radius into one word.

The body is ready when every success claim is supported by identified evidence or explicitly marked unverified, the originating scope is recoverable, and remaining obligations are visible. Body completion is not code, integration, review or release approval.
