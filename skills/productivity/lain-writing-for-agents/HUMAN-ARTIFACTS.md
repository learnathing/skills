# Artifacts people can review

Use this while producing a document or report that a person must understand, decide from, or hand to an agent. It changes presentation, not workflow authority, required evidence, source ownership, or publication gates. Apply it during drafting; do not add a mandatory polish stage, approval round, or second human-only document.

## Reader and language

For engineering artifacts, write for a developer who knows the project but did not attend the discussion. For a questionnaire or lesson, use the recipient's actual knowledge instead. Use the reader's working language and established domain vocabulary. Do not force English on a Chinese-language project. Keep code identifiers, exact quotations, machine keys, IDs, units, and status tokens unchanged.

Start with the intended change, supported conclusion, or next authorized action and its reason. Put concrete behavior before provenance machinery. Keep material exceptions, failure behavior, exclusions, irreversible consequences, and unresolved blockers in the main reading path, not only in an appendix or collapsed block. Small artifacts need no executive summary or empty optional sections.

## Clear claims

- Name the actor, action, condition, and observable result when known. Do not invent a responsible module to obtain an active sentence.
- Keep one main assertion per sentence and a condition beside the result it governs. Use a decision table for several outcomes, not disconnected bullets that lose the condition.
- Prefer concrete verbs. Write "The service returns an empty list after the second timeout", not "Complete the bounded degradation semantics".
- Use one established term per concept. Explain necessary unfamiliar terms briefly at first use. Keep distinct concepts distinct; do not require a glossary lookup for every noun.
- Preserve obligation, permission, negation, quantities, units, order, exceptions, uncertainty, and attribution. "May retry once" is not "must retry". `not run`, `INCOMPLETE`, and `NOT INDEPENDENTLY VERIFIED` must not become success claims.

These are STE-inspired choices, not ASD-STE100 conformance. Do not enforce an English controlled dictionary, fixed word counts, or automatic synonym replacement across languages. Precision takes priority over fewer words. See the official [STE FAQ](https://asd-ste100.org/STE_faq.html) and [scope of STE](https://www.asd-ste100.org/about_STE.html).

## One contract, different reading depths

Keep substantive meaning in the authoritative source. An overview, diagram, or machine manifest must not introduce a competing requirement. Put necessary definitions beside the behavior they explain. Put full source indexes, serialization, long logs, and evidence trails after the readable contract or behind explicit pointers. Important requirements must not exist only in machine data.

Link by descriptive title with stable IDs and revision anchors. An ID alone is not an explanation. Derived tickets retain exact definitions required by their validator and enough relevant meaning to stand alone. Avoid restating one success result under several headings with subtly different conditions. Checked copies required for delivery are not permission to invent additional paraphrases.

Simplify wording before freezing a new definition. For an existing exact-match definition, preserve it or update its authoritative source within current authority and regenerate dependent copies. Never silently change a decision for style. A definition may contain multiple sentences instead of compressing all conditions into one sentence.

Use diagrams or HTML only when they help explain the same source revision. Preserve error branches and supply a text equivalent. Keep the skill's required canonical format; a separate website, video, or extra document is not a default upgrade. Do not hide a blocker behind a visual.

## Source comparison

During the existing drafting or source-review step, compare the visible prose with the original decisions, not only the generated manifest. Check that behavior, exclusions, uncertainty, and material decisions remain recoverable without decoding internal workflow fields. Repair omissions through the existing process; do not add a separate readability approval gate.

When revising an artifact, identify material changes, new assumptions, and open questions. Reuse an existing summary instead of asking people to reapprove settled decisions. A proposal is not an accepted decision, a planned check is not evidence, and an agent-authored learning note is not proof the user mastered a topic.

Structural checks verify fields, references, and exact copies, not human comprehension. An agent cold read tests agent handoff. Evaluate developer understanding separately with unseen examples and questions about behavior and exceptions; word count and self-scored readability checklists are not outcome evidence.
