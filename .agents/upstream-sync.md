# Upstream synchronization ledger

Comparison baseline: fork `cbd5489e0eba55f44ca0b4eeb91faeccd1736acb`, upstream `4588b32ecab9ecc9fc8cc6b6c5e7d675b6004b0d`, common ancestor `885e2ca4d842d139e9aef4e48d366c63cb1b8013`.

This records content decisions, not a claim that all upstream commits were merged. Keep the `lain-` namespace and this fork's source authority, technical readiness, evidence and independent-review gates. Maintain fork changesets rather than copying upstream release versions.

| Batch | Upstream material | Disposition |
| --- | --- | --- |
| 1 | `pr`, including before/after evidence and merge risk | Adapted as `lain-pr`; no implied publication authority or invented evidence |
| 1 | `retro`, including deterministic checks for mechanical rules | Adapted as optional `lain-retro`; no automatic environment mutation |
| 1 | `.claude` ignore rule | Added alongside existing `.idea` rule |
| 2 | `implement-spec` task graph and integration branch | Adapted as `lain-implement-spec`, with shared `lain-implementation`, current source revisions, verified dependency release and safe worktree ownership |
| 3 | `GLOSSARY.md` and map naming | Planned: compatibility before optional migration |
| 3 | Local linking scope | Planned: explicit selection and non-destructive conflict handling |
| Retain | Upstream removal of `resolving-merge-conflicts` | Not adopted; retain the fork's ownership and stop/abort safeguards |
| Retain | Question separators, `85f83d3` | Already ported in `e2e3be7`, then adapted to user-controlled rounds |
| Defer | Experimental `chief-of-staff` | Not installed or promoted |
| Ignore | Bulk prose rewrites and upstream version metadata | No wholesale import; update only documents affected by adopted behavior |

Batch 1 is PR #5, initially committed as `942a31e2721a348bf796d3cf73e13eb2288af0df`. Batch 2 is stacked on that branch. Merge in batch order; after a predecessor lands, retarget the next PR to `main` and reconcile ancestry if the predecessor was squash-merged. Do not enable automatic merging of the stack.

Validation distinguishes structural regression checks, actual agent outcomes and independent review. A passing structural suite is not evidence of behavioral improvement or completed independent review. The batch-2 extraction regression compares the shared six-state protocol with the exact pre-extraction Git blob retained outside runtime skill context.
