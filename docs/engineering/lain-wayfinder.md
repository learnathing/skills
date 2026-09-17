## What it does

`lain-wayfinder` organizes a large uncertain effort as a shared map of decision tickets. The map is an index; each decision and its evidence live in the referenced ticket or artifact. It plans rather than silently delivering production features.

A ready capability may leave the map before the entire project is settled. An unresolved shared prerequisite still blocks all scopes that depend on it.

## When to reach for it

You invoke `/lain-wayfinder`; the agent does not invoke it automatically. Use it when planning itself spans sessions, not merely because implementation needs many tickets. A bounded design question uses clarification or technical design; already settled multi-session delivery goes to spec and tickets.

## Map and rolling readiness

The map names a destination for the whole effort, records Notes and a decision index, and separates in-scope fog from deliberately excluded work. Open child tickets and native dependency edges expose the unblocked, unclaimed frontier. A session claims one ticket before work and normally resolves one ticket, except supported parallel research.

Engineering maps keep a thin shared baseline and design capabilities near implementation. Non-engineering maps do not need a software architecture process. A Ready scopes index appears only when a capability has actual accepted prerequisites and evidence. It links the sources rather than copying them.

| State | Consequence |
| --- | --- |
| Independent capability is ready | Hand off its declared scope to normal delivery |
| Its critical technical question remains open | Keep dependent implementation blocked |
| A shared identity, permission or consistency decision is open | Block all dependent scopes |
| Unrelated future capability remains unclear | Continue exploration without invalidating ready independent work |

## Authority, evidence and revisions

Research investigates facts. UI/logic prototypes require the human's reaction. Technical experiments may run without another human turn only when their rule, resource envelope, data permissions and authority are settled. Prerequisite tasks enable decisions rather than bypassing the map into product implementation.

Execution outside planning requires an explicit human authorization source. Agent-authored Notes cannot grant that permission. Private-data transfer, paid resources and production changes retain their own boundaries.

When a decision changes, preserve the former meaning and revision, record the replacement and reason, locate affected scopes and tickets, and check concurrent ownership before updates. Do not erase history or continue using a known-obsolete contract. Scoped IDs and selective source loading let a fresh session work without the entire transcript.

## Common questions

**Must the whole map close before coding?**

No. A capability can hand off when its own shared prerequisites and critical evidence are ready. A partial handoff does not mean the entire destination is complete.

**Does a short risky change need a map?**

Not necessarily. Risk determines design depth; coordination determines whether a map is useful. One technical design or experiment may suffice.

**Can the agent authorize execution in Notes?**

No. Notes must point to explicit human authority. Planning artifacts are not self-issued permission to build or deploy.

**What happens when an earlier decision becomes wrong?**

Preserve and supersede it, identify its dependents, then re-establish their readiness. Only affected work is replanned.

## It's working if

- The map indexes decisions instead of duplicating every source.
- Ready and blocked scopes have explicit prerequisites and evidence.
- Independent ready work proceeds without waiting on unrelated fog.
- Shared unresolved prerequisites cannot be bypassed by parallel implementation.
- Decision revisions retain history and update affected dependencies.
- Production work is handed to its authorized delivery flow.

## Where it fits

This is a situational on-ramp, not the default first step. [Technical design](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-technical-design.md) resolves technical questions and [prototype](https://aihero.dev/skills-prototype) supplies evidence. Ready scopes move through [to-spec](https://aihero.dev/skills-to-spec) and [to-tickets](https://aihero.dev/skills-to-tickets). [Ask Matt](https://aihero.dev/skills-ask-matt) routes the set.
