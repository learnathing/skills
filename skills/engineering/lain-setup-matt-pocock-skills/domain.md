# Domain Docs

How engineering skills consume this repository's domain documentation. During setup, replace this explanation with the confirmed concrete glossary/map paths and ADR locations where those are already known; preserve existing project-specific conventions. Do not write unresolved placeholder paths as configuration.

## Before exploring, read these

Use explicitly configured glossary and map paths first. If no source paths are configured, discover `GLOSSARY.md` / `GLOSSARY-MAP.md` or legacy `CONTEXT.md` / `CONTEXT-MAP.md` at the repository root. Follow the selected map to the glossary of each relevant domain context; its targets may have custom names.

When both naming families exist without an explicit authoritative selection, resolve which sources govern the affected domain rather than silently choosing or creating another glossary. A configured or map-referenced source that cannot be read is a coverage gap, not an absent optional file. Recover it or report the affected limitation. Merely reading these files does not require active domain modeling.

Read relevant ADRs under the configured decision locations, commonly `docs/adr/` for system-wide decisions and per-context `docs/adr/` for scoped decisions.

When no optional glossary, map or ADR exists and none is identified as a required source, proceed without creating paperwork. `lain-domain-modeling` creates files lazily when terms or qualifying decisions are resolved. Preserve the existing naming family; a wholly new simple project can default to `GLOSSARY.md`. Do not rename or duplicate existing sources without a separate migration request.

## Use the glossary's vocabulary

When output names a domain concept, use the term in the authoritative glossary. Do not drift to synonyms it explicitly avoids. A missing term is either invented language to reconsider or a genuine modeling gap to surface, not permission to manufacture a domain decision.

The glossary defines domain concepts only. It is not a spec, architecture notebook or implementation log. Multi-context layouts preserve scoped definitions instead of merging them merely because filenames differ.

## Flag ADR conflicts

If an output contradicts an existing ADR, surface the specific conflict instead of silently overriding it:

> Contradicts ADR-0007 (event-sourced orders), but worth reopening because...
