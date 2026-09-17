---
name: lain-wayfinder
description: Plan a large uncertain effort as a shared map of decision tickets, resolve them across sessions, and hand off independently ready scopes without freezing the entire project.
disable-model-invocation: true
---

# Wayfinder

A loose idea is too large for one planning session, and the way to the **destination** is not visible. Chart a shared **map** of **decision tickets**, then resolve them one at a time. A decision ticket answers a question; it is not a production implementation slice.

The destination belongs to the whole map, not the current session. It may be a buildable spec, a decision needed before planning, or another explicitly scoped result. Naming it fixes the boundary of the effort.

## Plan, don't do

Planning is the default. Produce decisions and evidence, not the production deliverable. An execution exception in the map's Notes must point to explicit human authorization and its scope. Agent-authored Notes cannot grant authority. Research, prototypes and prerequisite tasks do not authorize paid resources, private-data transfer or production changes beyond the actual task permission.

## Rolling readiness for engineering work

Technical risk determines design depth; session count determines coordination. For engineering maps, call the Skill tool with "lain-technical-design" to establish the minimum shared baseline and capability-scoped decisions within the authorized planning work. Non-engineering maps do not need an architecture process.

Keep the system baseline thin and detail each capability near implementation. A ready capability may hand off to `/lain-to-spec` and `/lain-to-tickets` while independent scopes remain foggy. Tell the human which scope to pass to those user-invoked skills; never invoke them. A shared unresolved identity, permission or consistency decision blocks every dependent scope, even when each has a local plan.

When a scope becomes ready, add a short **Ready scopes** index to the map: scope name, accepted decision revisions and evidence pointers, and downstream source pointer once published. Do not duplicate the whole decision or treat a completed table as readiness evidence. The full destination is complete only when its in-scope decisions are resolved; a partial handoff is not global completion.

On a revised decision, preserve the old meaning, record the replacement and reason, identify affected scopes and tickets, check concurrent ownership, and re-establish their readiness. Do not automatically invalidate unrelated work, erase decision history, or implement against a known-obsolete contract.

## Refer by name

Refer to maps and tickets by title in human-readable discussion, with identifiers inside their links rather than bare numbers. A session loads the low-resolution map and zooms into only relevant sources. Qualify stable source IDs by their originating scope so two documents' `D1` entries are not confused.

## The Map

The canonical map is one issue labelled `wayfinder:map`, with decision tickets as children. It is an **index, not a store**: detail lives once in the decision ticket or linked artifact.

Use the configured tracker's Wayfinding operations for child issues, claims, native dependencies and frontier queries. If required tracker configuration is missing, tell the user to run `/lain-setup-matt-pocock-skills`; do not guess remote operations. An explicitly selected local-Markdown tracker is supported.

### Map body

```markdown
## Destination

The result this map is finding a way to, covering the whole effort.

## Notes

Domain, authorized working constraints, model-invoked disciplines, and source-backed execution exceptions if any.

## Decisions so far

- [Decision title](link): one-line gist, with the detail at the source.

## Not yet specified

In-scope questions too uncertain to phrase as tickets yet.

## Out of scope

Work deliberately excluded from this destination, with reasons.
```

Add **Ready scopes** only when a scope has actually become ready. Open tickets are found as open child issues, not duplicated as a second list in the map body.

### Tickets and frontier

Each ticket contains the question it resolves, sized to one bounded session with room for relevant sources and verification. Use actual harness capacity when available, not a fixed token assumption.

```markdown
## Question

The precise decision or investigation to resolve.
```

Labels remain `wayfinder:research`, `wayfinder:prototype`, `wayfinder:grilling`, or `wayfinder:task`. A session claims a ticket by assigning it to its driving developer before work. An open, unassigned ticket is unclaimed. The **frontier** contains open, unblocked, unclaimed tickets. Prefer the tracker's native blocking relationship; only use the documented body convention when native dependencies are unavailable.

Record resolution as a comment and link created assets instead of pasting all their detail. Decision dependencies are not a replacement for runtime architecture or data contracts.

## Ticket types

- **Research** (AFK): establish facts from primary sources outside the working directory. Use a subagent that calls the Skill tool with "lain-research" when supported. Disclose unavailable background/subagent execution instead of claiming it ran.
- **Prototype**: call the Skill tool with "lain-prototype". UI and logic reactions are HITL, and the human selects the result. A technical experiment can be AFK only when the evaluation rule, data permissions, resource envelope and decision authority are already settled. Its closure records actual evidence and its limitations, not a fabricated benchmark.
- **Grilling** (HITL): call the Skill tool twice, for "lain-grilling" and "lain-domain-modeling". The human speaks for their own decisions; never simulate their answers.
- **Task** (HITL or AFK): bounded prerequisite work that unblocks a decision, such as obtaining access or preparing an authorized sample. It earns its place by enabling a decision, not by delivering production behavior. Record actual work and resulting facts, without secrets.

## Fog of war and scope

Do not chart what cannot yet be stated. A precise question is a ticket even when blocked; a suspected question that cannot yet be phrased belongs in **Not yet specified**. When an answer reveals the next question, graduate that patch of fog into tickets and remove its duplicate from the fog section.

Fog only gathers toward the named destination. Deliberately excluded work belongs in **Out of scope**, not unresolved fog. If a ticket proves out of scope, close it with a reason and a link from that section rather than presenting it as a decision that advanced the route. Changing the destination is an explicit scope decision, not a shortcut for removing difficult requirements.

## Invocation

Resolve no more than one ticket per session, except parallel research where supported. Planning execution and source updates must remain inside their current authority and ownership.

### Chart the map

1. **Name the destination.** Call the Skill tool twice, for "lain-grilling" and "lain-domain-modeling", to establish the result and boundary.
2. **Map the frontier.** Explore breadth-first rather than exhaustively designing one branch. Identify shared technical prerequisites and independent capabilities. If the path is already clear and fits a session, recommend the normal flow instead of creating a map.
3. **Create the map.** Record the destination, Notes, empty decision index, current fog and deliberate exclusions.
4. **Create precise decision tickets.** Create their identities first, then wire real dependency edges in a second pass. Do not prematurely split uncertain future deliverables into implementation tasks.
5. **Run authorized research.** Where supported, dispatch bounded research subagents and retain their evidence on authorized research branches with source pointers. Report unavailable execution honestly.
6. Stop after charting; do not hand-resolve unrelated tickets or start production implementation.

### Work through the map

1. Load the map, then the selected ticket. If the user did not name one, select an unblocked, unclaimed frontier ticket.
2. Claim it before work, respecting other sessions.
3. Resolve the question with relevant sources. Call only model-invoked skills named in Notes. A user-invoked step is a recommendation for the human, not an implicit tool call.
4. Record the evidence-backed resolution comment, close the ticket, and append a source pointer to Decisions so far. Preserve unresolved authority or evidence as a blocker instead of forcing closure.
5. Graduate newly precise questions, update real dependencies, and preserve the history of superseded decisions. Recheck only scopes affected by a changed decision, after checking ownership.
6. Hand off any independently ready capability with its accepted prerequisites and evidence. The production flow happens outside the planning map unless an explicit human authorization says otherwise.

Expect concurrent sessions. Do not overwrite another session's work or rewrite every ticket merely because one source changed.
