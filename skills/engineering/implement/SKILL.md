---
name: implement
description: "Implement a piece of work based on a PRD or set of issues."
disable-model-invocation: true
---

Implement the work described by the user in the PRD or issues.

## Before coding

- Read the PRD or issue body in full, including comments and linked decisions.
- State the behaviour to build, the agreed seam to test, and what is out of scope.
- Use `/tdd` where possible, at pre-agreed seams. If there is no useful test seam, say why before coding.

## While coding

- Work in the smallest vertical slice that produces observable behaviour.
- Run the relevant single test file regularly, and typecheck when the change touches types or contracts.
- Keep implementation choices inside the scope of the PRD or issue; do not add speculative features.

## Before done

- Relevant tests pass, or the absence of a runnable test is explicitly documented.
- Typecheck passes if the repo has one.
- The full test suite passes once at the end, if it is practical to run.
- `/code-review` has run, and its findings are either fixed or explicitly accepted.
- Commit your work to the current branch. The commit message should state what changed and why.
