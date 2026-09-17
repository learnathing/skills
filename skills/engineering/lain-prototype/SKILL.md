---
name: lain-prototype
description: Build a throwaway prototype to answer a design question. Use when the user wants to sanity-check a state model or logic, explore UI alternatives, or measure technical feasibility, algorithm quality, capacity, or migration safety.
---

# Prototype

A prototype is **throwaway code that answers a question**. The question decides the shape.

## Pick a branch

Identify which question is being answered from the authorized task and relevant context:

- **"Does this logic / state model feel right?"** → [LOGIC.md](LOGIC.md). Build a shareable HTML file with free-play controls and guided walkthroughs that a non-developer can drive.
- **"What should this look like?"** → [UI.md](UI.md). Generate radically different UI variations on a single route, switchable by URL parameter and a floating control.
- **"Will this technical approach meet the constraint?"** → [TECHNICAL.md](TECHNICAL.md). Run a bounded, reproducible feasibility, quality, performance, or migration experiment with an explicit baseline and evidence status.

Choose by the question, not by whether the code is frontend or backend. For an ambiguous interaction question, state a limited assumption. For missing evidence, data permissions, or external-action authority, do not manufacture a result or take that action. Technical experiments follow their measurement and safety protocol, not the UI/logic shortcuts below.

## Rules for UI and logic prototypes

1. **Throwaway from day one, clearly marked.** Keep the prototype close to its relevant module or page when appropriate, and use the project's existing route conventions. Do not make it look like production code.
2. **Trivial to run.** A UI prototype starts from one task-runner command. A logic demo is a shareable HTML file. Document the exact entry point.
3. **No persistence by default.** Use in-memory state. When the question explicitly involves persistence, use an authorized scratch database or disposable local file, clearly marked as a prototype.
4. **Skip production polish.** No tests, abstractions or error handling beyond what makes this interactive question runnable. This shortcut does not apply to technical measurement validity.
5. **Surface the state.** Render the relevant state after actions and on each UI variant. Human feedback remains human feedback; do not choose for an absent reviewer and claim they approved.
6. **Capture the answer and source.** Return the validated decision to the authoritative design or spec. Production implementation is separate authorized work. Preserve the prototype on an authorized throwaway branch outside main, with a durable pointer from its source issue. Retain the question and verdict; do not silently merge prototype code into production.
