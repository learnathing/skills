## What it does

`lain-wait-what` is what you type when a message did not land. The agent re-pitches it with the missing context, accessible technical language and the project's existing domain vocabulary.

It repairs understanding rather than merely shortening sentences. It does not create a glossary, rename files or start another workflow.

## When to reach for it

You invoke `/lain-wait-what`; the agent does not decide on its own that you stopped following. Use it when an explanation assumes a premise you never saw, stacks unexplained terms or loses the point in implementation details.

## Language and existing sources

The skill reads authoritative glossary/map paths from `docs/agents/domain.md` when configured. Otherwise it accepts `GLOSSARY.md` / `GLOSSARY-MAP.md` or legacy `CONTEXT.md` / `CONTEXT-MAP.md`, following the selected map to the relevant context.

Both naming families without explicit authority are ambiguous; the agent must not confidently present one as canonical. A configured source that cannot be read is a limitation to disclose, not evidence that no glossary exists. If the project genuinely has none, the explanation still works in ordinary language without setup or invented domain terms.

## Common questions

**Do I need to rename an old CONTEXT.md?**

No. The skill uses the existing configured or discovered source. New naming support does not authorize a migration.

**Is the goal always fewer words?**

No. The re-pitch should restore the premise and relationships needed to understand the point. Removing essential context would defeat it.

**Does it change project documents?**

No. It explains the conversation using available vocabulary. Active glossary changes belong to separately authorized domain-modeling work.

## It's working if

- The re-pitch supplies the context that was missing.
- Existing domain terms replace invented jargon.
- Old, new and configured custom glossary paths remain usable.
- Missing sources and ambiguous authority are not concealed.
- No files or external resources change just to explain a message.

## Where it fits

Use it at any point in a conversation. [lain-domain-modeling](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-domain-modeling.md) maintains the underlying vocabulary, and [lain-grill-with-docs](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-grill-with-docs.md) clarifies decisions. [lain-ask-matt](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-ask-matt.md) routes the skill set.
