# The canonical install block

One install story, one wording. `README.md`, `.changeset/*`, and every page under `docs/` must say **this** and nothing else. Change it here first, then propagate.

This fork is installed as the `lain-mattpocock-skills` plugin from its local marketplace. Its plugin and skill names use the `lain-` namespace so it can coexist with the upstream plugin.

## Claude Code: the local fork plugin

<canonical-block name="claude-code">

```bash
/plugin marketplace add /Users/lain/Documents/code/skills
/plugin install lain-mattpocock-skills@lain-skills
```

Run those commands from inside a Claude Code session. Replace the local path when the fork lives elsewhere.

</canonical-block>

## Codex, and other agents: skills.sh

The plugin is Claude Code only. Everywhere else, [skills.sh](https://skills.sh) copies editable skill files into the project. For a published fork, replace the source with that fork's repository. For this local checkout, run `bash scripts/link-skills.sh`.

<canonical-block name="skills-sh-whole-set">

```bash
npx skills@latest add <your-fork-owner>/skills
```

Pick the skills you want, and which coding agents to install them on. **The installer lets you choose which skills to take: make sure `lain-setup-matt-pocock-skills` is one of them.**

</canonical-block>

…and the single-skill form wherever one skill is named on its own. Note that **`docs/` pages are not a consumer of this block**: ai-hero renders the install widget above the body, so a page that writes the commands out duplicates it. See [writing-docs.md](./writing-docs.md).

<canonical-block name="skills-sh-one-skill">

```bash
npx skills@latest add <your-fork-owner>/skills --skill=lain-<name>
```

```bash
npx skills@latest update lain-<name>
```

</canonical-block>

`skills@latest` is the pinned spelling in all three. The pages under `docs/` used to carry their own copy of these commands; those blocks are now deleted rather than corrected, because the site renders the install commands itself.

## The two routes are exclusive

The plugin is a managed, read-only bundle you subscribe to. skills.sh writes files you own and edit. Installing both leaves the user with every skill twice: always say "pick one".

## Not the install story

`.claude-plugin/marketplace.json` makes the repo its own single-plugin marketplace (`/plugin marketplace add <path-to-fork>`, then `/plugin install lain-mattpocock-skills@lain-skills`). The prefixed names are required when this fork is installed alongside the upstream plugin.
