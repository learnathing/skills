---
name: lain-retro
description: "Review a coding session and propose evidence-backed improvements to the agent's working environment."
disable-model-invocation: true
---

# Retrospective

Review the requested session, or the current session when none is named. Suggest changes to the environment, not another implementation of the feature. This invocation authorizes inspection and recommendations, not editing steering files, installing tools, adding service access, or changing CI. Implement selected changes only under separate applicable authority.

Call the Skill tool with "lain-writing-for-agents" for concise instructions and references.

## Inspect the evidence

Read the session's primary records, the originating request, relevant diffs and review findings. Inspect only the repository instructions, tool configuration and check commands relevant to an observed problem. Missing logs or unreadable sources are evidence gaps; describe the limited scope instead of reconstructing events from a confident summary. Redact secrets and private data.

Look for navigation friction, missed automated checks, ambiguous standards, oversized steering files, instructions that do not affect behavior, expensive tool use, and missing information. Treat a missing guardrail as a candidate only after inspecting the project's existing build/check commands and CI or hook wiring. An existing but unwired or broken check is a different finding from an absent one.

## Choose the smallest intervention

Classify each supported candidate before proposing a change:

- Mechanical rule: prefer a deterministic check in the repository's existing linter, test runner, hook or CI. Reuse or repair an existing check before adding another. Name an example that should fail and an allowed example that should pass.
- Judgment call: clarify the relevant standard with its scope and counterexample. Do not turn a contextual preference into a global ban.
- Information or navigation gap: point to an existing authoritative source, or propose the smallest missing observation. New external access needs explicit authorization and least privilege.
- Tool or context cost: show the observed wasted calls or repeated reading and the specific change that would avoid them. Do not infer savings from instruction length alone.

Keep standards discoverable to implementers when needed to avoid rework. Do not assume a reviewer can assess a diff without reading its source, callers, constraints and evidence. Preserve independent review and complete coverage; lighter steering is not permission to weaken either.

## Report, then stop

Order supported candidates by concrete impact. For each, report the source observation, proposed intervention, smallest affected scope and how a later run or deterministic check could verify improvement. Distinguish observed failures from hypotheses. If no candidate is supported, say what was inspected and leave the environment unchanged.

Completion means the findings are traceable to the inspected session and each proposal has a checkable outcome. Structural checks do not establish behavioral outcome lift. Retrospective completion is not a release gate, and small successful changes need no mandatory retrospective.

Adapted from the upstream `retro` skill at revision `4588b32ecab9ecc9fc8cc6b6c5e7d675b6004b0d`, with fork-specific authority and evidence boundaries.
