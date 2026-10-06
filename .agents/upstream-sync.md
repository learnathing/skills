# Upstream synchronization ledger

Comparison baseline: fork `cbd5489e0eba55f44ca0b4eeb91faeccd1736acb`, upstream `4588b32ecab9ecc9fc8cc6b6c5e7d675b6004b0d`, common ancestor `885e2ca4d842d139e9aef4e48d366c63cb1b8013`.

This records content decisions, not a claim that all upstream commits were merged. Keep the `lain-` namespace and this fork's source authority, technical readiness, evidence and independent-review gates. Maintain fork changesets rather than copying upstream release versions.

| Batch | Upstream material | Disposition |
| --- | --- | --- |
| 1 | `pr`, including before/after evidence and merge risk | Adapted as `lain-pr`; no implied publication authority or invented evidence |
| 1 | `retro`, including deterministic checks for mechanical rules | Adapted as optional `lain-retro`; no automatic environment mutation |
| 1 | `.claude` ignore rule | Added alongside existing `.idea` rule |
| 2 | `implement-spec` task graph and integration branch | Planned: adapt to shared implementation and review gates |
| 3 | `GLOSSARY.md` and map naming | Planned: compatibility before optional migration |
| 3 | Local linking scope | Planned: explicit selection and non-destructive conflict handling |
| Retain | Upstream removal of `resolving-merge-conflicts` | Not adopted; retain the fork's ownership and stop/abort safeguards |
| Retain | Question separators, `85f83d3` | Already ported in `e2e3be7`, then adapted to user-controlled rounds |
| Defer | Experimental `chief-of-staff` | Not installed or promoted |
| Ignore | Bulk prose rewrites and upstream version metadata | No wholesale import; update only documents affected by adopted behavior |

Validation distinguishes structural regression checks, actual agent outcomes and independent review. A passing structural suite is not evidence of behavioral improvement or completed independent review.
