---
name: lain-grilling
description: Grill the user relentlessly about a plan, decision, or idea. Use when the user wants to stress-test their thinking, or uses any 'grill' trigger phrases.
---

Interview the user to settle the decisions needed for their requested outcome. Map this as a **design tree**: every decision branches into the decisions that hang off it. Focus on choices that materially change the outcome, scope, domain invariants, public contracts, or hard-to-reverse commitments. Use existing decisions and discoverable facts; routine implementation choices do not require an interview.

Work the tree in **rounds**. The **frontier** is every decision whose prerequisites are already settled: the questions you can ask _now_ without guessing at answers you haven't heard yet. Ask the whole frontier in one round: number each question and give your recommended answer. Then wait for the user's answers before the next round.

Format a round like so:

```
❓ **Q1** - **<question title>**: <question body, might be multiple paragraphs, including multiple choices>

➡️ <your recommended answer>

---

❓ **Q2** - **<question title>**: <question body, might be multiple paragraphs, including multiple choices>

➡️ <your recommended answer>
```

Each round the user answers reshapes the tree: settled decisions push the frontier outward and unblock questions that depended on them. Recompute the frontier and ask the next round. A question whose answer depends on another question still open in this round belongs to a _later_ round, not this one.

Finding _facts_ is your job. Look up readily available facts directly. Delegate a substantial independent investigation when tools support it and there is useful work to do while it runs. Only questions downstream of an unsettled fact wait. Ask the user for consequential decisions that the existing request and context do not settle; do not supply their preferences yourself.

The interview is complete when the decisions needed for the requested outcome are settled or explicitly left open. Summarize material decisions and remaining dependencies. An interview-only request ends here. When the user already authorized implementation or another action, continue the authorized work without asking for the same approval again; an open decision blocks only work that depends on it. Honor an explicit request to stop, limit, or deepen the interview.
