# Upstream synchronization ledger

Comparison baseline: fork `c4286349371137d178ef933c7f7563406b74cabe`, upstream `4ae2317ddb22b046e26455e4f9c9b3aaaf62212d`, common ancestor `885e2ca4d842d139e9aef4e48d366c63cb1b8013`. Batch 1 compared fork `cbd5489e0eba55f44ca0b4eeb91faeccd1736acb` with upstream `4588b32ecab9ecc9fc8cc6b6c5e7d675b6004b0d`.

This records content decisions, not a claim that all upstream commits were merged. Keep the `lain-` namespace and this fork's source authority, technical readiness, evidence and independent-review gates. Maintain fork changesets rather than copying upstream release versions.

| Batch | Upstream material | Disposition |
| --- | --- | --- |
| 1 | `pr`, including before/after evidence and merge risk | Adapted as `lain-pr`; no implied publication authority or invented evidence |
| 1 | `retro`, including deterministic checks for mechanical rules | Adapted as optional `lain-retro`; no automatic environment mutation |
| 1 | `.claude` ignore rule | Added alongside existing `.idea` rule |
| Fixes | GitHub and GitLab tracker templates: own-repo issue target in a fork, comment-then-close, JSON reads with labels, REST pull listing, native `gh` 2.94 dependency and sub-issue flags, `glab -O json`, GitLab wayfinder links | Adopted with `lain-` names; the guard names this fork and its upstream |
| Fixes | Setup: reachable repository check and creation of missing triage labels | Adopted; label creation runs only after user confirmation |
| Fixes | Subagents start with a fresh context window, `7739eae` | Adopted as a repo rule and in research, grilling, wayfinder, architecture review and design-it-twice; code review and ticket cold reads already required it |
| Fixes | Wayfinder: only `wayfinder:` labels, real cross-reference ids, no research PRs, resolve by label type, `8295b8e` | Adopted |
| Fixes | Wizard template: quoted `.env` values, mode 0600, Readline input, EOF failure, `run_wizard` wrapper | Adopted except the generator comment, plus a fix upstream lacks: single-quote decoding replaces through a variable because bash 3.2 (macOS) kept the backslash of `\'` |
| Fixes | Single-line fixes in diagnosing-bugs, implement, tdd, grilling, handoff, claude-handoff and teach | Adopted, worded to keep this fork's authority and recommendation rules |
| Fixes | `to-tickets` sub-issues of a source issue | Adopted |
| Retain | `to-tickets` omitting `Blocked by` when native edges exist | Not adopted; the ticket validator requires the field |
| Retain | `ask-matt` reading a skill before asserting its steps | Already covered by the fork's route-reading rule |
| Defer | Experimental `software-factory` | Not installed or promoted |
| 2 | `implement-spec` task graph and integration branch | Planned: adapt to shared implementation and review gates |
| 3 | `GLOSSARY.md` and map naming | Planned: compatibility before optional migration |
| 3 | Local linking scope | Planned: explicit selection and non-destructive conflict handling |
| Retain | Upstream removal of `resolving-merge-conflicts` | Not adopted; retain the fork's ownership and stop/abort safeguards. Made user-invoked after session logs showed no real use, so it costs no context until typed |
| Retain | Question separators, `85f83d3` | Already ported in `e2e3be7`, then adapted to user-controlled rounds |
| Local | Unused `misc/` skills and in-progress writing and experiment skills | Moved to `deprecated/`, which is not linked; usage evidence came from Codex and Claude Code session logs |
| Defer | Experimental `chief-of-staff` | Not installed or promoted |
| Ignore | Bulk prose rewrites and upstream version metadata | No wholesale import; update only documents affected by adopted behavior |

Validation distinguishes structural regression checks, actual agent outcomes and independent review. A passing structural suite is not evidence of behavioral improvement or completed independent review.
