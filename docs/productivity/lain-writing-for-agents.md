## What it does

`lain-writing-for-agents` separates runtime instructions from artifacts people must review. Instruction mode removes explanation the agent does not need. Artifact mode keeps the behavior, conclusions, exceptions and evidence a developer needs to judge the work. It does not create a second human-only contract or another approval stage.

Artifact mode now also maintains the current reading path of long-lived work: what changed, what is actually verified, what remains unresolved and where the authoritative source lives. It borrows clear actors, conditions and consistent terminology from STE without claiming ASD-STE100 conformance or forcing English on another working language.

## When to reach for it

Type `/lain-writing-for-agents`, or the agent reaches for it when writing or editing skills and repository instructions. Artifact producers use the shared artifact writing reference while they draft; developers do not need to request a second simplified copy.

| Work | Applicable guidance |
| --- | --- |
| Runtime instructions, AGENTS.md or CLAUDE.md | Context pointers, information hierarchy, completion criteria and pruning |
| Spec, ticket, research, review or decision report | Concrete behavior and evidence before trace machinery |
| Ongoing ticket or design record | Current state before history; source updates within existing authority |
| Transitions, dependencies or measured comparisons | Optional question-driven table or diagram |

## Current truth without losing history

A readiness label cannot tell you whether work is implemented, integrated, reviewed or releasable. A local implementation ticket that has started carries a compact Current state record with execution, verification, the actual checked source/revision and remaining duties. The configured tracker still owns its lifecycle; a second status table must not contradict it.

New blockers and accepted decisions update their current authoritative section before a history entry is appended. An unaccepted requirement difference stays visible without silently overwriting the accepted contract. A summary cannot turn an untested alternative into a failed experiment, or an agent-operated GUI check into human acceptance.

Descriptive source links point to real files and anchors. A multi-file effort can reuse a visible project index to reach hidden `.scratch` documents; the index links to current sources instead of copying their status. Handoffs distinguish supplied sources, external links and unavailable dependencies.

## Visuals only when they answer a question

A decision table suits conditional behavior. A state diagram can explain navigation changes; a sequence diagram can explain ordering between actors; a small dependency graph can explain why a ticket waits. A short ADR often needs only a paragraph. Verification states are not a progress percentage, and unmeasured options are not zero-valued bars.

Keep the source revision and text equivalent beside a diagram. Follow the project's existing rendering format and source/image convention. Do not introduce a website, CDN or external upload just to draw a picture. If the actual renderer was unavailable, disclose that rather than claiming visual verification.

## Common questions

**Does every artifact need a summary, state table and diagram?**

No. Use only what the reader's question needs. A new untouched ticket needs no invented execution record; a one-paragraph decision needs no executive summary. Maintenance happens inside already-authorized writing, not a mandatory extra phase.

**Can the tools prove the document is readable?**

No. The local-link helper checks a declared subset of Markdown destinations and anchors without fetching external links. Unsupported syntax or renderer-specific anchors remain unverified. Ticket and constraint checks validate structure and identity, not authority, source meaning, actual completion or reader understanding.

**Do I need to translate machine fields into the reader's language?**

No. Keep IDs, parser keys, code identifiers, quantities and evidence-state tokens exact. Write the explanation in the reader's language, keeping conditions and exceptions beside their results.

**Where did instruction pruning go?**

It remains in instruction mode: context pointers disclose only relevant references, completion criteria define observable outcomes, and each instruction must earn its context cost. Those techniques are not permission to delete an explanation a human needs or a verified copy a delivery contract requires.

## It's working if

- A developer can recover behavior and material exceptions without decoding a manifest first.
- Current limitations are visible without searching a long Comments history.
- Ready, implemented, independently reviewed and releasable are not interchangeable claims.
- A source ID leads to the relevant definition and revision.
- A diagram preserves the same failure branches and remains understandable through nearby text.
- Comprehension claims come from actual reader tasks, not a checklist or word count.

## Where it fits

This is a model-invoked reference beneath artifact producers, not a new stage between planning and implementation. [To-spec](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-to-spec.md) uses it for behavior-first contracts; [to-tickets](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-to-tickets.md) uses it for readable delivery and tracking. [Ask Matt](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-ask-matt.md) routes the set.
