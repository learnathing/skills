---
name: lain-domain-modeling
description: Build and sharpen a project's domain model. Use when discussing codebase terminology, writing or editing a GLOSSARY.md or legacy CONTEXT.md, or recording or editing an ADR.
---

# Domain Modeling

Actively build and sharpen the project's domain model as you design. This is the active discipline: challenging terms, inventing edge-case scenarios, and writing the glossary and decisions down the moment they crystallise. Merely reading a glossary for vocabulary is not this skill. Use it when changing the model, not just consuming it.

## Resolve the domain sources

Read explicit glossary and map paths from `docs/agents/domain.md` or applicable repository instructions first. Preserve those paths, including custom names. A configured source that cannot be read is a coverage gap, not an absent optional file; recover it or report the affected limitation rather than switching sources silently.

Without explicit configuration, accept either `GLOSSARY.md` / `GLOSSARY-MAP.md` or legacy `CONTEXT.md` / `CONTEXT-MAP.md`. Follow the selected map to the glossary for each relevant domain context. A map can point to custom filenames. If both naming families exist, resolve which sources are authoritative before writing or presenting their definitions as canonical; do not silently prefer a spelling or create parallel glossaries.

The co-located read-only helper checks root entry points:

```sh
node <this-skill-directory>/resolve-domain-docs.mjs <repository-root>
node <this-skill-directory>/resolve-domain-docs.mjs <repository-root> --glossary <configured-path>
node <this-skill-directory>/resolve-domain-docs.mjs <repository-root> --map <configured-map>
```

Read configuration before using the helper and pass its selected paths explicitly. The helper does not parse prose configuration, follow map contents, decide domain boundaries or authorize writes. A zero exit establishes readable, unambiguous entry points only. If Node is unavailable, inspect the same paths directly and disclose any unresolved source gap instead of guessing.

## File structure and creation

For an existing project, retain its actual glossary and map names. An entirely new simple project may create `GLOSSARY.md` when its first term is resolved. Create `docs/adr/` only when a qualifying ADR is needed. For multiple contexts, use the accepted map and the existing per-context glossary and ADR locations; package count alone does not establish domain boundaries. Do not create a root glossary when the selected map already routes the domain elsewhere.

This compatibility change does not authorize renaming files. An explicitly requested migration must preserve unrelated work, update the relevant map, configuration and active references together, and verify that each affected reader reaches the same definitions. Leave historical changelogs, frozen evaluation fixtures and commit-pinned external links unchanged. Do not maintain two writable copies of the same glossary.

## During the session

### Challenge against the glossary

When the user uses a term that conflicts with the selected glossary, call it out immediately. "Your glossary defines 'cancellation' as X, but you seem to mean Y. Which is it?"

### Sharpen fuzzy language

When the user uses vague or overloaded terms, propose a precise canonical term. "You're saying 'account': do you mean the Customer or the User? Those are different things."

### Discuss concrete scenarios

When domain relationships are being discussed, stress-test them with specific scenarios. Invent scenarios that probe edge cases and force the user to be precise about the boundaries between concepts.

### Cross-reference with code

When the user states how something works, check whether the code agrees. If you find a contradiction, surface it: "Your code cancels entire Orders, but you just said partial cancellation is possible. Which is right?"

### Update the selected glossary inline

When a term is resolved, update the authoritative glossary right there. Don't batch these up: capture them as they happen. Use the content format in [CONTEXT-FORMAT.md](./CONTEXT-FORMAT.md) for either naming convention; its legacy filename is not a requirement to create `CONTEXT.md`.

The glossary should be totally devoid of implementation details. Do not treat it as a spec, a scratch pad, or a repository for implementation decisions. It is a glossary and nothing else.

### Offer ADRs sparingly

Only offer to create an ADR when all three are true:

1. Hard to reverse: the cost of changing your mind later is meaningful.
2. Surprising without context: a future reader will wonder why it was done this way.
3. The result of a real trade-off: there were genuine alternatives and a reason for the choice.

If any is missing, skip the ADR. Use the format in [ADR-FORMAT.md](./ADR-FORMAT.md), respecting applicable project conventions.
