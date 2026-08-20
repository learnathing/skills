# E3: green but difficult code

## Initial prompt

> Review the entire working tree against the contract below. Use the committed fixture seed's parent as the fixed point. Do not change code.

## Repository setup

Create an empty root commit as the fixed point, then add the `e3-repo` files and commit them as the review target. Start the model with a clean working tree at that target commit. This two-commit setup is specific to the review-only case; implementation cases commit their seed as the baseline.

## Contract

| ID | Decision |
| --- | --- |
| D1 | VIP pricing applies one 10 percent discount policy to both checkout and preview. |
| D2 | Checkout adds the fee returned by `FeeGateway`. |
| D3 | A `FeeGateway` failure is surfaced as a pricing-unavailable error. It must not become a numeric quote. |

## Test command

Run from a copy containing the `e3-repo` files:

```bash
mkdir -p build
javac -d build src/main/java/eval/FeeGateway.java src/main/java/eval/GenericFlow.java src/main/java/eval/CheckoutService.java src/test/java/eval/CheckoutServiceTest.java
java -ea -cp build eval.CheckoutServiceTest
```

## Seeded findings

| Seed | Expected axis and severity | Evidence target |
| --- | --- | --- |
| Main path hidden by a name-based generic wrapper | Design advisory | `CheckoutService.checkout` and `GenericFlow.execute` |
| VIP discount policy has two implementation owners | Design advisory | `CheckoutService.checkout` and `CheckoutService.preview` |
| Gateway failure is silently converted to zero | Spec or Design blocker | Catch block in `CheckoutService.checkout`, governed by D3 |

Score recall and severity for all three seeded findings. Additional findings count toward false-positive rate unless they cite a distinct reproducible impact. This read-only case does not score repair convergence.
