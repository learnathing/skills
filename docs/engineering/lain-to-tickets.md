## What it does

`lain-to-tickets` turns ready plans, specs or settled conversations into tracer-bullet vertical implementation slices. Each ticket has a source contract, blocking edges and required evidence. It publishes only the exact validated breakdown approved by the user.

## When to reach for it

You invoke `/lain-to-tickets`; the agent does not invoke it automatically. Use it when a ready delivery needs several implementation sessions. A small settled change can use [implement](https://aihero.dev/skills-implement) directly. Unresolved shared design or prerequisite evidence belongs in design or a decision map, not a ready implementation ticket.

## Ownership and shared constraints

`Owns` gives each delivery scenario exactly one owner. Shared invariants and technical decisions may apply to several tickets without duplicating delivery ownership.

| Optional field | Purpose |
| --- | --- |
| `Applies` | Exact constraint revisions affecting this ticket's owned scenarios |
| `Verifies` | Constraints whose verification scenario this ticket owns |
| `Technical trace` | Exact definitions of applicable constraints |

Relevant tickets also point to accepted design sources and describe their actual verification duties. Ordinary schema-v1 manifests and tickets stay valid without these fields. Scenario-based applicability survives changing provisional ticket names into real tracker identifiers.

## Structure, comprehension and integration

The deterministic validator checks mandatory fields, exact definitions, unique ownership, graph cycles and the optional constraint registry. It can reject missing or stale references relative to the supplied manifest. It does not fetch sources or prove their currency, semantic sufficiency, authority or experimental validity.

A fresh cold reader receives representative ticket shapes and only their declared pointers, then reconstructs the behavior and shared constraints. Missing independent sampling is disclosed. A complete template is not a substitute for understanding.

Prefer an early real end-to-end integration path and assign later quality, migration or lifecycle checks to the relevant slices. On a constraint revision, reconcile the source, update affected tickets, rerun structural validation and affected cold-reader samples, and preserve unrelated work and concurrent ownership.

## Common questions

**Does every ticket need an architecture section?**

No. Only affected tickets receive optional shared-constraint fields. Local choices and advisory ideas do not need a registry.

**Can several tickets own one scenario?**

No. `Owns` remains exclusive. `Applies` is deliberately shared, while the final verification scenario has one accountable owner.

**Is per-ticket review sufficient?**

Not for a multi-ticket delivery. Integrate and run relevant checks as slices land, then run a final [code review](https://aihero.dev/skills-code-review) from the branch point.

## It's working if

- Tickets are complete, observable vertical slices, not isolated database or API layers.
- Every source scenario has one owner and blocking edges are acyclic.
- The validator passes on the exact approved artifacts.
- Affected tickets share consistent constraint revisions and verification responsibility.
- Cold-reader limitations and missing evidence are visible.
- Unrelated work is not replanned on every design-document edit.

## Where it fits

[To-spec](https://aihero.dev/skills-to-spec) supplies the contract; this skill prepares it for implementation sessions. [Technical design](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-technical-design.md) owns readiness and shared-constraint serialization. [Ask Matt](https://aihero.dev/skills-ask-matt) routes the set.
