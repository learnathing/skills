# E2: multi-session vertical feature

Repository seed: `e2-repo`. It provides inventory lookup and mutation but no reservation, transaction, release, or expiry abstraction.

Compile check:

```bash
javac -d build src/main/java/eval/InventoryStore.java src/main/java/eval/InventoryService.java
```

## Pinned decision handoff

| ID | Exact decision | Origin |
| --- | --- | --- |
| D1 | Available inventory may never become negative. | Confirmed product decision |
| D2 | Reserving one SKU and quantity is atomic and returns `ReservationResult(reservationId, remainingQuantity)`. | Confirmed product decision |
| D3 | Insufficient inventory throws `InventoryConflict` and creates no reservation. | Confirmed product decision |
| D4 | Releasing an active reservation restores its quantity and returns `released=true`; repeated release or an unknown reservation returns `released=false` and does not change inventory. | Confirmed product decision |
| D5 | Reservation expiry is out of scope for this delivery. | Confirmed product decision |
| D6 | `InventoryService.reserve(String sku, int quantity)` and `InventoryService.release(String reservationId)` are the caller-visible seams. | Confirmed technical decision |
| D7 | Reserve quantity must be positive; zero or negative quantity throws `IllegalArgumentException` without mutation. | Confirmed product decision |
| D8 | A missing SKU has zero available inventory and follows the D3 conflict behaviour. | Confirmed compatibility decision |

## Initial prompt

> Turn the pinned decision handoff into a traceable spec, then split it into implementation tickets for separate fresh sessions. The reserve and release behaviours should be independently deliverable. Do not add expiry processing.

## Required scenario facts

- One change scenario reserves available inventory.
- One change scenario rejects insufficient inventory without mutation.
- One boundary scenario rejects zero or negative quantity without mutation.
- One change scenario releases an active reservation.
- One change scenario proves repeated release does not restore inventory twice.
- One change scenario returns `released=false` for an unknown reservation without mutation.
- One preservation scenario proves `replaceAvailable` still rejects negative quantity.

Scenario IDs may vary. Their exact definitions and D1-D8 sources must not.

## Scripted user turn

After the ticket breakdown is presented, answer:

> The granularity and blocking edges are approved. Keep reserve and release as separate vertical tickets with release blocked only by the reservation seam it consumes.

## Scorer inputs

| Check | Pass condition |
| --- | --- |
| Source trace | Every decision-bearing scenario cites at least one of D1-D8 and every cited ID is defined |
| Ticket ownership | Every change scenario has exactly one primary ticket owner |
| Scenario type | Repeated release is a change scenario; existing negative-quantity rejection is preservation evidence |
| Vertical slices | Reserve and release each include contract, persistence behaviour, interface result, and verification in their owning ticket |
| Dependency graph | Acyclic; release may depend on reserve only when the current code truly lacks a reservation seam |
| Cold reader | Given only one ticket and declared pointers, asks zero product or design questions before implementation |
| Scope | No expiry worker, scheduler, cleanup, retry, or compatibility layer is added |
