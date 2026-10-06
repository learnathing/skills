## What it does

`lain-improve-codebase-architecture` surveys a codebase for **deepening opportunities**: places where a shallow module could hide more complexity behind a useful small interface. It produces an HTML report, then explores the candidate you choose.

This is a survey, not a refactoring implementation. The report goes outside the repository. During an authorized follow-up discussion, domain terms and qualifying ADRs can be recorded; production code changes belong to separately authorized implementation work.

## When to reach for it

You invoke `/lain-improve-codebase-architecture`; the agent does not start it automatically. Name a module, subsystem or source of friction when you have one. Otherwise the skill uses recent change history to focus on areas where improved structure could help real work.

| Situation | Direction |
| --- | --- |
| Find candidate improvements in an existing codebase | This survey |
| Design the interface of a selected module | [lain-codebase-design](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-codebase-design.md) |
| Diagnose one reported failure | [lain-diagnosing-bugs](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-diagnosing-bugs.md) |
| Resolve a large map of shared decisions | [lain-wayfinder](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-wayfinder.md) |

## Sources and report

Use glossary/map paths from `docs/agents/domain.md` when configured. Otherwise accept `GLOSSARY.md` / `GLOSSARY-MAP.md` or legacy `CONTEXT.md` / `CONTEXT-MAP.md`, following the selected map to relevant contexts. Both naming families without explicit authority require a source choice. An unreadable configured source remains a gap; it does not authorize creating a replacement glossary. Existing names are preserved, and domain modeling owns lazy creation when new terms actually need recording.

The scan looks for concrete friction: scattered knowledge, shallow interfaces, leaking seams and behavior that cannot be tested at a useful boundary. Candidates use the domain's vocabulary and the shared module/interface/depth/seam terminology. ADR conflicts are called out when the observed problem is strong enough to justify reopening a decision.

Each report card identifies files, the problem, a proposed direction, benefits, a before/after view and recommendation strength. A top recommendation explains where to start. The report lives at `<tmpdir>/architecture-review-<timestamp>.html`; the skill reports that path and asks which candidate to explore before proposing detailed interfaces.

## Common questions

**Does this automatically refactor the selected module?**

No. Selecting a candidate starts exploration of constraints and interface choices. The resulting decisions enter the appropriate authorized design or implementation workflow.

**Will it rename an old CONTEXT.md?**

No. It reads and updates the selected authoritative source through domain modeling. New naming support does not authorize migration or a second writable glossary.

**Does the report work offline?**

The existing scaffold uses Tailwind and Mermaid from CDNs. An offline or locked-down environment needs a suitable self-contained alternative; a written HTML file alone does not prove that its scripts rendered successfully.

**What happens when I reject a candidate?**

A durable, non-obvious reason can justify an ADR so a later survey does not repeat the same suggestion. Temporary priorities and self-evident reasons do not need permanent decision records.

## It's working if

- Findings identify concrete friction in relevant code rather than generic cleanup wishes.
- Candidate names follow the selected domain glossary.
- Benefits explain locality, leverage or verification improvements.
- The report is followed by a choice, not an unrequested implementation.
- Glossary or ADR changes are distinguished from the external HTML artifact and production code work.

## Where it fits

This is optional codebase maintenance. [lain-codebase-design](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-codebase-design.md) supplies its structural vocabulary, while [lain-domain-modeling](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-domain-modeling.md) owns domain updates. [lain-ask-matt](https://github.com/learnathing/skills/blob/main/docs/engineering/lain-ask-matt.md) selects a route; a small settled change does not need a survey first.
