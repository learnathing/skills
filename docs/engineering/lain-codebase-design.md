## What it does

`lain-codebase-design` helps reason about **deep modules**: useful behavior behind an interface that callers can understand. It supplies design concepts, not a replacement dictionary for the project. Accurate names such as service, component, API and boundary remain valid.

It is a reference within the caller's authorized task, not a workflow that starts an unrelated redesign, interview or parallel search for alternatives.

## When to reach for it

Type `/lain-codebase-design`, or the agent uses it when an affected module's shape needs design work.

| Problem | Route |
| --- | --- |
| An interface exposes too much implementation knowledge | Use this design reference |
| Domain meanings conflict and would change behavior | [Domain modeling](https://aihero.dev/skills-domain-modeling) |
| You need to find which area deserves redesign | [Architecture survey](https://aihero.dev/skills-improve-codebase-architecture) |
| System constraints or technical evidence remain unsettled | [Technical design](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-technical-design.md) |
| A settled behavior needs tests and implementation | [TDD](https://aihero.dev/skills-tdd), within the implementation task |

## Concepts without vocabulary policing

A module has an interface and an implementation. The interface includes what callers must know: not just types, but ordering, failures, configuration and other relevant constraints. An existing API can be that interface; a signature alone may not express all of it.

Depth concerns how much capability callers get for what they must learn. Leverage describes the benefit to callers; locality describes keeping related rules, changes and verification together. A seam is a point where behavior can vary, while adapter names a concrete role that satisfies an interface there.

Use these distinctions when they help reason about the design. A security boundary is not automatically a seam, and calling an existing service a module does not improve its design by itself. Do not rename stable symbols to satisfy the vocabulary.

## Preserve the design discipline

The existing deletion test, interface-oriented tests, dependency handling and actual-variation checks still apply. Consider whether an extraction hides complexity or only adds indirection. Module shape is not a prescribed directory layout, and interface depth is not a reward for adding implementation lines.

The [deepening reference](https://github.com/learnathing/skills/blob/main/skills/engineering/lain-codebase-design/DEEPENING.md) and [alternative-interface reference](https://github.com/learnathing/skills/blob/main/skills/engineering/lain-codebase-design/DESIGN-IT-TWICE.md) remain available when the actual task calls for them. Do not manufacture alternatives for an already settled change.

## Common questions

**Must I stop saying service, API or boundary?**

No. Use the established word that accurately names the thing. Explain a distinction only when it affects the reasoning, and preserve actual API and product names.

**Does this change the architecture rules?**

No. The change separates analysis vocabulary from forced renaming. Existing depth, locality and testability principles remain the design reference.

**Does invoking this start a whole redesign?**

No. It supports the scope already authorized by its caller. Interface comparisons are useful for a genuine unresolved choice, not as a compulsory workflow for every task.

**Is a deep module a folder convention?**

No. The interface and responsibilities determine the design. A function, service, package or cross-layer slice can be considered at the appropriate scale without moving files just to fit a diagram.

## It's working if

- The design becomes easier to use without forcing new terminology on the team.
- Interface discussion covers important caller obligations beyond types.
- Proposed extractions have a concrete reason rather than hypothetical reuse.
- A reference does not turn a small task into an unrelated design project.

## Where it fits

This is a reusable reference beneath [technical design](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-technical-design.md), [TDD](https://aihero.dev/skills-tdd) and architecture work. [Domain modeling](https://aihero.dev/skills-domain-modeling) handles necessary product meanings. [Ask Matt](https://aihero.dev/skills-ask-matt) routes the set.
