---
name: lain-grilling
description: Clarify or stress-test a plan, decision, or idea. Use when the user wants an interview, wants to pressure-test their thinking, or uses 'grill' trigger phrases.
---

Reach a shared understanding of the requested scope. Use a **design tree** to track decisions and dependencies, not as a questionnaire the user must complete. Keep agent investigation and authorized design work separate from questions that need a human answer. Revisit only affected branches when evidence or instructions change.

## Investigate and recommend first

Finding facts is your job, never the user's. Read relevant code, documents and available primary sources before asking. Delegate independent exploration when useful; investigate directly when delegation is unavailable or unhelpful. Missing tools do not turn a guess into a fact. Name a consequential evidence gap and the work it blocks, while continuing independent authorized work.

Use the intent, constraints, settled decisions and authority already supplied. Recommend a coherent approach rather than sending the user a menu of unfamiliar technical choices. Make routine, reversible choices within that authority and verify them at an appropriate seam. A caller-visible choice does not automatically require a question when existing intent or delegation already settles it. Preserve binding requirements; do not disguise a changed limit, error behavior or permission as an implementation detail.

## Ask only for a decision the user must supply

The human-question **frontier** contains material unresolved choices whose prerequisites are settled and which available evidence, existing intent and applicable delegation cannot resolve. Unknown technical details stay with agent investigation or design. Ask for unavailable local knowledge only after checking accessible sources; ask for new authority before acting beyond it.

Work in **rounds** when questions remain. Group independent questions into an answerable round, with a number, your recommendation and its consequence for the user. Keep dependent questions for later. Explain a choice in terms of observable outcomes, cost or reversibility, not a prerequisite lesson in implementation terminology. Use the reader's language and established project terms. A default format:

```
Q1: <Outcome or trade-off that still needs your decision>
Recommendation: <Proposed answer and why it fits the stated goal>
Consequence: <What would differ if another option were chosen>
```

If the user does not know a technical answer, take back the investigation or propose the smallest authorized experiment. Do not repeat the same question in different jargon. If the missing answer is their preference or permission, retain that uncertainty instead of pretending an experiment can authorize it. Model confidence and the user's seniority are not decision authority.

## Stop when the current scope no longer needs an answer

End the interview when no material human-owned question remains for the current scope; do not continue just to exhaust the design tree. Agent work may still require investigation, design, implementation or verification. An empty question frontier is not evidence that these are complete or that the combined understanding matches the request.

Honor the user's latest instruction to stop, limit, deepen or change the interview. An explicit request for learning or design co-creation can justify deeper discussion, but it is not the default for a delivery request. Adapt grouping without fixed question counts or invented round quotas. If the user stops with unresolved choices, summarize them and their consequences instead of claiming agreement.

Keep recommendations, agent choices under delegated authority, and user decisions distinct. A recommendation is not accepted merely because it was presented. An interview-only request ends with a summary; it does not authorize experiments or implementation. If subsequent work is already authorized, continue once its prerequisites are settled, without requesting the same approval again. A real unresolved choice blocks only the work that depends on it.
