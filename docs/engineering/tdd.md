## What it does

`tdd` builds behaviour through observable red and green states at agreed public seams, followed by refactoring when a slice reveals a concrete structural improvement. Each real transition carries command evidence, so the process does not depend on the model saying it followed TDD.

The tests describe behaviour through interfaces and survive internal refactoring. The skill is a model-invoked reference that [implement](https://aihero.dev/skills-implement) drives, and it can also be invoked directly.

## When to reach for it

Type `/tdd`, or the [agent](https://www.aihero.dev/ai-coding-dictionary/agent) reaches for it when a feature, bug fix, or integration test should be built test-first.

| Your situation | Where to go |
| --- | --- |
| Concrete behaviour with an independent expected result | `tdd` |
| The behaviour or failure semantics are unsettled | [to-spec](https://aihero.dev/skills-to-spec) |
| The interface shape itself is the design question | [codebase-design](https://aihero.dev/skills-codebase-design) |
| A whole ticket needs context, validation, review, and commit | `implement` |
| Wiring with no independent behaviour to assert | Use repository validation without manufacturing a tautological test |

## Prerequisites

The source spec or issue should name the seams. When it does not, `tdd` uses an established repository seam. It waits for confirmation only when the choice changes an externally observable or hard-to-reverse interface contract, or materially different seams encode different caller behaviour. Java `public` visibility and internal test seams remain implementation choices. [codebase-design](https://aihero.dev/skills-codebase-design) supplies vocabulary when a seam needs design work.

## Red, green, refactor

| State | Completion evidence |
| --- | --- |
| Red | One focused command fails because the requested behaviour is missing |
| Green | The same command passes after the smallest implementation for that behaviour |
| Refactor | A concrete structural improvement revealed by the slice is made without changing behaviour, and the same command still passes |

One complete cycle finishes before the next test begins. When the slice reveals no concrete structural change, Green is the final focused result and no extra artifact or command run is required. General readability and rule ownership are checked once by the final Design review.

A compile failure can be valid Red evidence when the slice intentionally introduces a compile-time contract and the diagnostic is the expected one. Setup errors and unrelated compilation failures do not count.

Preservation scenarios use a different proof: the focused check is green before the related change and remains green afterwards. Deliberately breaking compatible behaviour to manufacture Red evidence would make the metric less truthful, not more rigorous.

The retained test must observe the agreed seam, use an independent expected result, and avoid mocks of internal modules. Mocks belong at true external boundaries such as payment providers, clocks, or randomness.

## Common questions

**Does every Green result need another test run?**

Only when code changes after Green. A real refactor needs a post-refactor passing result. If no code changed, rerunning the same command produces runtime cost without new evidence.

**What if the agent writes implementation before the test?**

The cycle has no red evidence and is incomplete. A test that never failed for the expected reason does not prove it can detect the missing behaviour.

**Should the first test be browser or end-to-end?**

Use the fastest agreed seam that can observe the scenario. A high-level browser seam is appropriate only when lower seams cannot prove the behaviour or the browser interaction is itself the contract.

**Does it know about sibling tickets?**

No. The source issue must carry its spec trace, exclusions, and relevant pointers. [to-tickets](https://aihero.dev/skills-to-tickets) owns that fresh-context contract.

## It's working if

- The seam comes from the source contract or an established public interface; a new public seam is confirmed before the first test.
- The same focused command produces red and green evidence, plus post-refactor evidence when code changed after Green.
- Preservation scenarios have baseline and final green evidence.
- Red fails for the expected missing behaviour, not a compile or setup error.
- Tests describe caller capabilities and survive internal renames.
- A reported refactor names a concrete structural change and its final passing result.
- Mocks appear only at external boundaries.

## Where it fits

`tdd` is the implementation engine inside the main chain:

```txt
grill-with-docs → to-spec → to-tickets → implement → code-review
```

[to-spec](https://aihero.dev/skills-to-spec) agrees verification seams, `implement` drives the cycles, and [code-review](https://aihero.dev/skills-code-review) independently checks the resulting design. [ask-matt](https://aihero.dev/skills-ask-matt) routes the complete set.
