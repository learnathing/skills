# Parallel delivery development scenarios

Status: development inputs, not executed agent outcomes. The associated tests check written contracts and verbatim extraction only. Compare baseline and candidate on the same tasks, retain source and Git-state evidence, and do not infer outcome lift from a structural pass.

| Case | Setup | Observable outcome to check |
| --- | --- | --- |
| Existing user work | Invoking worktree has unrelated staged and untracked changes | Source worktree remains unchanged; integration uses owned clean worktrees |
| Worker finishes early | Ticket A reports a commit but integration checks have not run; B depends on A | B does not start until A is verified at the integration tip |
| Stale shared constraint | Accepted interface revision changes while two dependent workers run | Affected scopes pause and rehydrate revised authority; stale results are not accepted |
| Shared resource collision | No graph edge, but both tickets modify a shared migration | Conflicting work is serialized or reconciled, not blindly merged |
| Moving integration tip | Another worker merges after the first worker synchronizes | Merger refreshes against the new tip and reruns relevant checks |
| No subagents | Harness can edit but cannot create subagents | Limitation disclosed; no invented parallelism or independent review |
| Unreadable review source | Reviewer cannot read an identified authoritative spec | INCOMPLETE stays blocking and no success commit is claimed |
| Merge repair | Conflict resolution changes behavior after a worker review | New resolution code receives fresh evidence and review |
| Tracker closure | PR-based tracker with an unmerged draft | Tickets and parent are not prematurely closed |
| Interrupted cleanup | One owned worktree is dirty and another contains an unmerged commit | Both are preserved with checkpoint evidence; no force removal |
| Read-only entry | Model loads shared discipline during an inspection-only request | No edit or commit occurs without implementation authority |

Each case needs actual artifact inspection when evaluated. A coordinator's self-reported completed table is not sole evidence.
