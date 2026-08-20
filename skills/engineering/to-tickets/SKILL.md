---
name: to-tickets
description: Break a plan, spec, or the current conversation into a set of tracer-bullet tickets, each declaring its blocking edges, published to the configured tracker (edges as text in one file per ticket locally, or native blocking links on a real tracker).
disable-model-invocation: true
---

# To Tickets

Break a plan, spec, or conversation into a set of **tickets**: tracer-bullet vertical slices, each declaring the tickets that **block** it.

The issue tracker and triage label vocabulary should have been provided to you. If not, tell the user to run `/setup-matt-pocock-skills`.

## Process

### 1. Gather context

Work from whatever is already in the conversation context. If the user passes a reference (a spec path, an issue number or URL) as an argument, fetch it and read its full body and comments.

Use the authoritative spec's Delivery Manifest when it exists. If another source already has stable scenario or requirement IDs, stage those exact IDs, definitions, and source IDs as `source-manifest.json` using the same schema. When a conversation or plan has no stable IDs, assign them in that manifest and show the exact definitions in the final approval breakdown. The manifest becomes the structural coverage denominator; semantic source-decision recall remains a downstream evaluation concern.

When the source exists only in conversation, each published ticket must inline the relevant source-index rows. IDs without definitions are not a durable trace. When a durable source issue or spec exists, link it and still summarize the owned definitions.

### 2. Explore the codebase

If you have not already explored the codebase, do so to understand the current state of the code. Ticket titles and descriptions should use the project's domain glossary vocabulary, and respect ADRs in the area you're touching.

Look for prefactoring only where current code presents concrete friction to a required slice. A prefactor needs a named blocker, a bounded blast radius, and its own observable completion condition. Do not create cleanup work from a hypothetical future need.

### 3. Draft vertical slices

Break the work into **tracer bullet** tickets.

<vertical-slice-rules>

- Each slice cuts a narrow but COMPLETE path through every layer (schema, API, UI, tests): vertical, NOT a horizontal slice of one layer
- A completed slice is demoable or verifiable on its own
- Each slice is sized to fit in a single fresh context window
- A fresh agent can recover the outcome, invariants, interface, error semantics, and verification from the issue and its pointers

</vertical-slice-rules>

Give each ticket its **blocking edges**: the other tickets that must complete before it can start. A ticket with no blockers can start immediately.

When a required mechanical change cannot land green as a vertical slice, read [wide-refactors.md](wide-refactors.md) and use its expand-contract sequence. Do not load that exception for ordinary feature work.

### 4. Validate, then ask for approval

Stage every draft as Markdown using [ticket-template.md](ticket-template.md). Extract or stage the authoritative Delivery Manifest as JSON without changing its IDs or definitions. Run the co-located validator:

```bash
node <this-skill-directory>/validate-tickets.mjs <source-manifest.json> <draft-directory>
```

The command checks required fields, exact manifest definitions and unique ownership, acceptance-checkbox presence, blocking-edge references, and graph cycles. It does not judge whether prose is semantically sufficient. A mechanical pass exists only when this command exits zero; keep that output as evidence. Rewrite drafts until it passes.

Then run a cold-reader check in a fresh sub-agent for the highest-risk or largest ticket and one representative of each materially different ticket shape. Give it only the ticket and its declared pointers. It must restate the contract and list any product or design question that prevents implementation. Rewrite or split the affected shape, rerun the validator, and repeat the affected cold-reader sample.

If the harness cannot create a fresh sub-agent, mark the sampled cold-reader result `not independently verified` and disclose that limitation in the breakdown. Label the validator output as deterministic structure evidence, not independent comprehension evidence.

When the harness exposes the model's context capacity, estimate the ticket plus required source material with the available tokenizer. Use bytes divided by four only as a labelled rough estimate. Treat size as a diagnostic for comparing tickets, not as a fixed-percentage publication gate. Split when a ticket owns more than one outcome, has an unbounded change surface, or the cold reader cannot recover its contract with room to explore and verify. When capacity is unavailable, do not claim a numeric fit.

Only after validation and any rewrites, present the final proposed breakdown as a numbered list. For each ticket, show its title, blockers, end-to-end outcome, and owned source IDs. Ask whether the granularity and split or merge choices fit the intended delivery, and whether any declared blocker misrepresents a real sequencing constraint. Source coverage remains the validator's job. If the user requests a change, validate and sample the changed shape again before asking approval of the new final breakdown.

Publish only the exact breakdown the user approved. Before publishing, rerun the validator against those artifacts and confirm that every sampled cold-reader check passes or is disclosed as unavailable.

### 5. Publish the tickets to the configured tracker

Publish the approved tickets. **How** depends on the tracker `/setup-matt-pocock-skills` configured; the tickets are the same either way, only the shape of the blocking edges changes:

- **Local files**: write one file per ticket under `.scratch/<feature-slug>/issues/<NN>-<slug>.md`, numbered from `01` in dependency order. Each file's `Ticket` and `Blocked by` fields use those exact identifiers.
- **A real issue tracker**: publish one issue per ticket in dependency order so blocking edges can reference real identifiers. Use native blocking relationships where available, otherwise keep the `Blocked by` field. Apply the `ready-for-agent` triage label unless instructed otherwise.

Publish the validated staged artifacts. Map provisional identifiers to final tracker identifiers, update only `Ticket` and `Blocked by`, and rerun the validator on the final staged bodies before sending them to the tracker. Encode the same edges as native relationships where supported.

Work the **frontier**: any ticket whose blockers are all done. For a purely linear chain that means top to bottom.

Do NOT close or modify any parent issue.

Specific paths may appear only as non-normative discovery anchors. Behaviour, interfaces, and acceptance criteria must remain meaningful if those paths move. If a prototype produced a snippet that encodes a decision more precisely than prose can (state machine, reducer, schema, type shape), inline the decision-rich part and identify its source.

For work split across more than one implementation issue, tell the user to run one final `code-review` against the branch point after the frontier is complete. Per-issue review catches local defects; branch-level review catches interactions and vocabulary drift across independently implemented slices.
