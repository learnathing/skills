# Upstream synchronization ledger

Comparison baseline: fork `cbd5489e0eba55f44ca0b4eeb91faeccd1736acb`, upstream `4588b32ecab9ecc9fc8cc6b6c5e7d675b6004b0d`, common ancestor `885e2ca4d842d139e9aef4e48d366c63cb1b8013`.

This records content decisions, not a claim that all upstream commits were merged. Keep the `lain-` namespace and this fork's source authority, technical readiness, evidence and independent-review gates. Maintain fork changesets rather than copying upstream release versions.

| Batch | Upstream material | Disposition |
| --- | --- | --- |
| 1 | `pr`, including before/after evidence and merge risk | Adapted as `lain-pr`; no implied publication authority or invented evidence |
| 1 | `retro`, including deterministic checks for mechanical rules | Adapted as optional `lain-retro`; no automatic environment mutation |
| 1 | `.claude` ignore rule | Added alongside existing `.idea` rule |
| 2 | `implement-spec` task graph and integration branch | Adapted as `lain-implement-spec`, with shared `lain-implementation`, current source revisions, verified dependency release and safe worktree ownership |
| 3 | `GLOSSARY.md` and map naming | Adapted as dual-name discovery with explicit source authority; preserve existing files, lazy new-project default and separately authorized migration |
| 3 | Local linking scope | Adapted with promoted-only default, explicit experimental/miscellaneous selection, preview and checkout-owned pruning; never replace real user directories or foreign links |
| Retain | Upstream removal of `resolving-merge-conflicts` | Not adopted; retain the fork's ownership and stop/abort safeguards |
| Retain | Question separators, `85f83d3` | Already ported in `e2e3be7`, then adapted to user-controlled rounds |
| Defer | Experimental `chief-of-staff` | Not installed or promoted |
| Ignore | Bulk prose rewrites and upstream version metadata | No wholesale import; update only documents affected by adopted behavior |

## Delivery branches

| Batch | Branch | Base | Initial commit / PR |
| --- | --- | --- | --- |
| 1 | `feat/upstream-batch-1-pr-retro` | `main` | `942a31e2721a348bf796d3cf73e13eb2288af0df`, PR #5 |
| 2 | `feat/upstream-batch-2-parallel-delivery` | Batch 1 | `c0933ce791977a7cdf2d329bd0002e09751d2059`, PR #6 |
| 3 | `feat/upstream-batch-3-domain-linking` | Batch 2 | This branch; PR records its actual commits and checks |

Merge in batch order. After a predecessor lands, retarget the next PR to `main` and reconcile ancestry if the predecessor was squash-merged. Do not enable automatic merging of the stack or delete a base branch still needed by an open successor.

## Evidence limits

Validation distinguishes structural regression checks, deterministic filesystem behavior, actual agent outcomes and independent review. A passing structural suite is not evidence of behavioral improvement or completed independent review. The batch-2 extraction regression compares the shared six-state protocol with the exact pre-extraction Git blob retained outside runtime skill context. Batch 3 leaves that frozen fixture and review brief digests unchanged.

The domain resolver checks readable root entry points, not map semantics or natural-language authority. The linker tests exercise temporary filesystems, not live user installations or concurrent adversarial writers. CI results belong to the exact PR revision. Prospective scenarios under `evals/` are not execution reports.
