---
"lain-mattpocock-skills": patch
---

Standardize cross-skill invocation on an explicit "call the Skill tool" instruction instead of bare `/skill`-style prose, across `lain-code-review`, `lain-diagnosing-bugs`, `lain-grill-with-docs`, `lain-grill-me`, `lain-improve-codebase-architecture`, `lain-tdd`, `lain-to-spec`, `lain-to-tickets`, `lain-triage`, and `lain-wayfinder`.

- A skill that names another skill in prose ("run the `/lain-grilling` skill") does not reliably cause it to load. This is the documented rough edge behind `lain-grill-with-docs`'s most-reported problem. Naming the tool directly (`Call the Skill tool with "lain-grilling"`) is intended to raise the hit rate. Dropping the leading `/` also makes the instruction harness-neutral rather than less: it no longer assumes Claude Code's trigger syntax.
- A step needing more than one skill now says so as multiple calls ("Call the Skill tool twice, for `lain-grilling` and `lain-domain-modeling`"), not one call carrying two names.
- Documents the convention in `.agents/invocation.md` for future skills to follow.
