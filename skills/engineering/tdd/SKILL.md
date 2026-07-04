---
name: tdd
description: Test-driven development. Use when the user wants to build features or fix bugs test-first, mentions "red-green-refactor", or wants integration tests.
---

# Test-Driven Development

TDD is the red → green loop. This skill is the reference that makes that loop produce tests worth keeping: what a good test is, where tests go, the anti-patterns, and the rules of the loop. Every section applies on every cycle — consult them before and during the loop, not after.

When exploring the codebase, read `CONTEXT.md` (if it exists) so test names and interface vocabulary match the project's domain language, and respect ADRs in the area you're touching.

## What a good test is

Tests verify behavior through public interfaces, not implementation details. Code can change entirely; tests shouldn't. A good test reads like a specification — "user can checkout with valid cart" tells you exactly what capability exists — and survives refactors because it doesn't care about internal structure.

See [tests.md](tests.md) for examples and [mocking.md](mocking.md) for mocking guidelines.

## Seams — where tests go

A **seam** is the public boundary you test at: the interface where you observe behavior without reaching inside. Tests live at seams, never against internals.

**Test only at pre-agreed seams.** Before writing any test, write down the seams under test and confirm them with the user. No test is written at an unconfirmed seam. You can't test everything — agreeing the seams up front is how testing effort lands on the critical paths and complex logic instead of every edge case.

Ask: "What's the public interface, and which seams should we test?"

## Contract before tests

Before writing any test, derive the contract at the chosen seam. The issue or PRD is input to this step, not the thing under test: translate it into stable behaviour the module promises to callers.

Write the contract down:

- **Public seam** — the method, route, command, component, or module boundary under test.
- **Caller-visible behaviour** — what the caller can rely on after the change.
- **Inputs and observable outputs** — return values, thrown errors, rendered UI, emitted events, persisted state, or calls to external system boundaries.
- **Invariants** — facts that must stay true across valid inputs.
- **Contract changes from the issue** — new or changed promises introduced by the requested work.
- **Non-contract internals** — helpers, private methods, call order, internal collaborators, branches, or data shapes the test must not assert.

No test is written until the contract is stated. If the contract cannot be stated, stop and clarify the seam or the requirement before coding.

For every test, state before writing it:

- The behaviour it protects.
- Why this behaviour belongs at this seam.
- The independent source of the expected value — a known-good literal, worked example, domain rule, or spec requirement translated into module behaviour.
- The wrong implementation this test would catch.
- The implementation details it intentionally avoids.

## Anti-patterns

- **Implementation-coupled** — mocks internal collaborators, tests private methods, or verifies through a side channel (querying the database instead of using the interface). The tell: the test breaks when you refactor but behavior hasn't changed.
- **Tautological** — the assertion recomputes the expected value the way the code does (`expect(add(a, b)).toBe(a + b)`, a snapshot derived by hand the same way, a constant asserted equal to itself), so it passes by construction and can never disagree with the code. Expected values must come from an independent source of truth — a known-good literal, a worked example, the spec.
- **Issue-shaped** — the test name or assertion mirrors the issue wording instead of the module's contract. Issues describe the requested change; tests protect the stable behaviour that change creates.
- **Horizontal slicing** — writing all tests first, then all implementation. Bulk tests verify _imagined_ behavior: you test the _shape_ of things rather than user-facing behavior, the tests go insensitive to real changes, and you commit to test structure before understanding the implementation. Work in **vertical slices** instead — one test → one implementation → repeat, each test a **tracer bullet** that responds to what the last cycle taught you.

## Rules of the loop

- **Contract before red.** State the seam contract before writing the failing test.
- **Red before green.** Write the failing test first, watch it fail for the intended reason, then only enough code to pass it. Don't anticipate future tests or add speculative features.
- **One slice at a time.** One seam, one test, one minimal implementation per cycle.
- **Refactor only after green.** Never refactor while red. After the slice is green, clean up the implementation and re-run the test before starting the next slice. Larger design review belongs to the `code-review` skill.
