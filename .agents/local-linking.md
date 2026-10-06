# Local skill linking

This is a maintainer tool for a local checkout, not a replacement for the published installer. It requires Node.js 22 and a filesystem that supports symbolic links. The bash entry point delegates to `scripts/link-skills.mjs`.

```sh
bash scripts/link-skills.sh --dry-run
bash scripts/link-skills.sh
bash scripts/link-skills.sh --include-in-progress
bash scripts/link-skills.sh --include-misc
bash scripts/link-skills.sh --include-in-progress --include-misc
```

The default selects only `engineering/` and `productivity/` and links them into both `~/.claude/skills` and `~/.agents/skills`. Experimental and miscellaneous buckets require their respective opt-ins. `deprecated/` is never selected.

Changing the selected scope does not remove old links. To remove unselected links created from this exact checkout, preview and then explicitly request pruning:

```sh
bash scripts/link-skills.sh --dry-run --prune
bash scripts/link-skills.sh --prune
```

Include the same bucket options in the preview and actual command. Pruning removes only `lain-` symlinks whose targets identify a skill directory in this checkout. It does not remove real files/directories, links to another checkout or foreign links. Moving a skill between selected buckets can update that checkout-owned link. Moving the entire checkout requires an explicit ownership decision; an old link to another location is not assumed safe to replace.

Before writing, the tool checks both destinations and all selected names. A real same-name user directory, foreign link, duplicate skill name, malformed manifest or destination resolving into the repository causes an error rather than deletion. Dry-run creates no directories. Rerunning an unchanged selection is a no-op.

Run one linker at a time and do not mutate its destinations concurrently. It rechecks targets before changes, but a multi-directory update is not a transaction. An I/O failure can leave earlier successful links in place; inspect the reported operations and rerun after resolving the cause. There is no force or recursive-delete mode.
