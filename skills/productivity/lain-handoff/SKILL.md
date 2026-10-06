---
name: lain-handoff
description: Compact the current conversation into a handoff document for another agent to pick up.
argument-hint: "What will the next session be used for?"
disable-model-invocation: true
---

Call the Skill tool with "lain-writing-for-agents" in artifact mode while drafting. If unavailable, disclose once and draft directly under the existing source and format rules.

Write a handoff document summarising the current conversation so a fresh agent can continue the work. Save to the temporary directory of the user's OS - not the current workspace.

Start with the goal, current state and next authorized action. State unresolved blockers, authority limits and verification gaps alongside the relevant next step. Then give descriptive source pointers with revisions and the small amount of unsaved decision context needed to continue. A reader must not reconstruct the task from a list of paths alone.

Include a "suggested skills" section. Distinguish model-invoked skills the next agent may call from user-invoked skills that the human must start; a recommendation is not execution authority. Preserve exact definitions and origins of decisions that exist only in this conversation, without inventing acceptance or completed work.

Do not duplicate content already captured in other artifacts (specs, plans, ADRs, issues, commits, diffs). Reference them by path or URL instead.

Redact any sensitive information, such as API keys, passwords, or personally identifiable information.

If the user passed arguments, treat them as a description of what the next session will focus on and tailor the doc accordingly.
