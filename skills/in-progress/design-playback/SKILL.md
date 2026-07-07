---
name: design-playback
description: Play back the design assembled during a grilling session, section by section, until the developer confirms the whole picture. The mirror of /grilling.
disable-model-invocation: true
---

# Design Playback

After a grilling session the design exists only as fragments scattered across dozens of question-answer pairs. The next step, `/to-prd`, assembles those fragments with no interview — so the developer never sees the assembled design before it is frozen into a PRD and split into issues, where a misunderstanding gets copied into every issue and surfaces only at code review. This skill is the missing look: a **playback** of the model's assembled understanding, run after the grilling and before `/to-prd`, in the same context window.

The direction is the mirror of `/grilling`: there the model asks and the developer answers; here the model explains and the developer challenges.

## Process

Play the design back top-down, one section at a time. Wait for the developer to confirm or challenge each section before moving to the next — presenting multiple sections at once is bewildering.

1. **Problem** — what this feature solves, from the user's perspective.
2. **Shape** — the modules touched or created and how they relate, in `/codebase-design` vocabulary (modules, interfaces, seams).
3. **Data model** — the entities involved and any schema changes, in the glossary's vocabulary.
4. **Decisions** — each significant decision *and the model's understanding of why it was made*. Play back the rationale, not just the conclusion — the rationale is where misunderstanding hides.
5. **Risks and open points** — what the model believes is still unsettled.

When the developer challenges a section, switch back to grilling-style questioning until the disagreement is resolved, then re-play the corrected section before moving on.

Run `/domain-modeling` underneath: when playback resolves a term, update the glossary inline; when it exposes a decision that meets the ADR bar, offer an ADR — sparingly. Everything else stays in the conversation, to be serialized by `/to-prd`.

## Completion

Done when the developer has confirmed every section — the whole design, not just the fragments. Do not write the PRD or any other artifact (glossary and ADRs excepted); `/to-prd` normally follows immediately in the same window.
