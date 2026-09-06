---
name: lain-resolving-merge-conflicts
description: "Use when you need to resolve an in-progress git merge/rebase conflict."
---

1. **See the current state** of the merge/rebase. Record HEAD, the operation in progress, unresolved paths, and staged, unstaged, and untracked changes. Separate pre-existing user work from the merge or rebase result before editing. Check git history and the conflicting files.

2. **Find the primary sources** for each conflict. Understand deeply why each change was made, and what the original intent was. Read the commit messages, check the PRs, check original issues/tickets.

3. **Resolve each hunk.** Preserve both intents where possible. Where incompatible, use the user's stated goal and existing source decisions. If they do not settle a consequential choice, explain the specific conflict and pause only the affected operation. Do not invent new behaviour. Continue an authorized merge when it can be resolved correctly; honor a later instruction to stop or abort, preserving existing user work and explaining any risk of losing resolution work.

4. Discover the project's **automated checks** and run them, typically typecheck, then tests, then format. Fix anything the merge broke.

5. **Finish the merge/rebase.** Stage only resolved operation paths. Preserve non-conflicting changes already belonging to the operation and keep unrelated user changes out of its commit. Inspect the index before committing or continuing, and verify the remaining worktree against the recorded baseline. If ownership cannot be separated, ask before changing it. If rebasing, continue until all intended commits are rebased or a concrete blocker is reached.
