---
name: tdd
description: Test-driven development. Use when the user wants to build features or fix bugs test-first, mentions "red-green-refactor", or wants integration tests.
---

# Test-Driven Development

TDD advances through observable red and green states, followed by refactoring when a slice reveals a concrete structural improvement. It produces tests worth keeping without requiring a ceremonial third state.

When exploring the codebase, read `CONTEXT.md` (if it exists) so test names and interface vocabulary match the project's domain language, and respect ADRs in the area you're touching.

## What a good test is

Tests verify behavior through public interfaces, not implementation details. Code can change entirely; tests shouldn't. A good test reads like a specification: "user can checkout with valid cart" tells you exactly what capability exists, and it survives refactors because it doesn't care about internal structure.

See [tests.md](tests.md) for examples and [mocking.md](mocking.md) for mocking guidelines.

## Seams: where tests go

A **seam** is the public boundary you test at: the interface where you observe behavior without reaching inside. Tests live at seams, never against internals.

Use source-agreed seams when they exist. Otherwise prefer an established repository seam and record it in the cycle evidence. Ask the user only when the choice changes an externally observable or hard-to-reverse interface contract, or when materially different seams encode different caller behaviour. Internal Java visibility or a test seam alone does not make the choice a user decision.

When the shape of that interface is itself in question (how deep the module is, where the seam belongs, what the interface should expose), call the Skill tool with "codebase-design" for the vocabulary. It is the shared source of the module, interface, depth, seam, adapter, leverage and locality terms, and it is a reference to consult, not a session to run.

## Anti-patterns

- **Implementation-coupled**: mocks internal collaborators, tests private methods, or verifies through a side channel (querying the database instead of using the interface). The tell: the test breaks when you refactor but behavior hasn't changed.
- **Tautological**: the assertion recomputes the expected value the way the code does (`expect(add(a, b)).toBe(a + b)`, a snapshot derived by hand the same way, a constant asserted equal to itself), so it passes by construction and can never disagree with the code. Expected values must come from an independent source of truth: a known-good literal, a worked example, the spec.
- **Horizontal slicing**: writing all tests first, then all implementation. Bulk tests verify _imagined_ behavior: you test the _shape_ of things rather than user-facing behavior, the tests go insensitive to real changes, and you commit to test structure before understanding the implementation. Work in **vertical slices** instead: one test → one implementation → repeat, each test a **tracer bullet** that responds to what the last cycle taught you.

## Rules of the loop

- **Change scenario, Red.** Write one failing behaviour test. Run it and keep the command plus the failure that proves the requested behaviour is missing. A compile failure is valid only when the slice intentionally introduces a compile-time contract and the diagnostic is the expected one. Setup and unrelated failures are not red evidence.
- **Green.** Write only enough implementation to pass that test. Run the same command and keep the passing result.
- **Refactor when the slice reveals a concrete improvement.** Change structure without changing observable behaviour, then rerun the focused command and keep the passing result. If no code changes after Green, the Green result is the final focused result. General design inspection belongs to the final Design review, not to a repeated refactor checklist in every cycle.
- **One slice at a time.** Complete Red and Green, plus any Refactor actually performed, before starting the next test.
- **Preservation scenario.** Run its focused check before the related implementation and keep the passing baseline. Run it again after the change. Do not fabricate a Red state by breaking behaviour that already works.

## Cycle evidence

For every change scenario, report:

- The seam and scenario or acceptance criterion
- The focused command
- The red failure and why it was the expected failure
- The green result
- The refactor and final passing result when code changed after Green

For every preservation scenario, report the focused command plus its baseline and final passing results.

TDD is complete when every change scenario has cycle evidence, every preservation scenario has baseline and final evidence, and the relevant broader test suite passes.
