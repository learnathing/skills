# Productivity

General workflow tools, not code-specific.

## User-invoked

Reachable only when you type them (Claude Code: `disable-model-invocation: true`; Codex: `policy.allow_implicit_invocation: false` in `agents/openai.yaml`).

- **[lain-grill-me](./lain-grill-me/SKILL.md)**: Clarify a plan or decision with recommendations and only the questions that need your input.
- **[lain-handoff](./lain-handoff/SKILL.md)**: Compact the current conversation into a handoff document so another agent can continue the work.
- **[lain-teach](./lain-teach/SKILL.md)**: Teach the user a new skill or concept over multiple sessions, using the current directory as a stateful teaching workspace.
- **[lain-to-questionnaire](./lain-to-questionnaire/SKILL.md)**: Turn a decision you can't answer alone into a Markdown questionnaire for the one person who can (filled in async, or together over a meeting).
- **[lain-wait-what](./lain-wait-what/SKILL.md)**: Fire this the moment a message doesn't land. The agent re-pitches it with the context you're missing, in plain English, using your `CONTEXT.md` vocabulary.

## Model-invoked

Model- or user-reachable (rich trigger phrasing so the model can reach for them).

- **[lain-grilling](./lain-grilling/SKILL.md)**: Investigate and recommend before asking for material choices that evidence, intent and delegation cannot resolve.
- **[lain-writing-for-agents](./lain-writing-for-agents/SKILL.md)**: Writing documents for agents: skills, AGENTS.md/CLAUDE.md, and any doc an agent reaches by a pointer.
