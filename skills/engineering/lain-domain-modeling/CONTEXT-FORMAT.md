# CONTEXT.md Format

Use the existing project layout and names. This format records necessary project meanings, not a new controlled vocabulary for ordinary conversation.

## Structure

```md
# {Context Name}

{What this context covers, only when needed to distinguish it.}

## Language

**{Established term}**:
{The project-specific meaning or distinction that a reader cannot safely infer.}

{Optional distinguishing example, source or scope note.}
```

## Rules

- **Reuse before naming.** Prefer an accurate existing project name or established industry term. Do not replace stable product names or public symbols for style.
- **Record necessary distinctions.** Define the local meaning, not every standard concept the project uses. General timeout, API or utility definitions need no entry when their ordinary meanings suffice.
- **Keep aliases proportionate.** An optional `_Also called_` note can explain a real legacy alias. Use `_Avoid_` only for a term that would cause a material misunderstanding here, with the reason. Do not blacklist harmless synonyms or invent aliases to fill the format.
- **Explain enough to distinguish the concept.** Prefer a short definition and add an example only when it separates plausible meanings. Do not turn a glossary into a specification or implementation notebook.
- **Group only when useful.** A single cohesive context needs no subheadings or map. Preserve genuine differences between contexts instead of forcing one global definition.

## Single vs multi-context repos

**Single context (most repos):** One `CONTEXT.md` at the repo root.

**Multiple contexts:** A `CONTEXT-MAP.md` at the repo root lists the contexts, where they live, and how they relate to each other:

```md
# Context Map

## Contexts

- [Ordering](./src/ordering/CONTEXT.md): receives and tracks customer orders
- [Billing](./src/billing/CONTEXT.md): generates invoices and processes payments
- [Fulfillment](./src/fulfillment/CONTEXT.md): manages warehouse picking and shipping

## Relationships

- **Ordering → Fulfillment**: Ordering emits `OrderPlaced` events; Fulfillment consumes them to start picking
- **Fulfillment → Billing**: Fulfillment emits `ShipmentDispatched` events; Billing consumes them to generate invoices
- **Ordering ↔ Billing**: Shared types for `CustomerId` and `Money`
```

The skill infers which structure applies:

- If `CONTEXT-MAP.md` exists, read it to find contexts
- If only a root `CONTEXT.md` exists, single context
- If neither exists, create a root `CONTEXT.md` lazily when the first term is resolved

When multiple contexts exist, infer which one the current topic relates to. Inspect the map and relevant sources first. Ask only when unresolved context membership would materially change the meaning or affected work; ordinary navigation remains the agent's job.
