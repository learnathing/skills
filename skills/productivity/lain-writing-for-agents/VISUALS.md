# Choose a visual for a reader's question

Use this only when relationships, transitions or comparisons are costly to reconstruct from prose. A visual is an optional view of the same contract, not a mandatory artifact or evidence that the design works. Fix missing decisions, stale status and contradictory sources before drawing them more confidently.

| Reader question | Smallest useful form | Keep in nearby text |
| --- | --- | --- |
| Under this condition, what happens? | A compact decision table | Limits, exceptions and observability |
| Which actions change state or history? | A state/transition diagram or an operation-result table | Guards, self-transitions, missing targets and reset scope |
| Who calls whom, and in what order? | A sequence diagram when order matters | Error returns, concurrency and actual caller ownership |
| Which ready result blocks this ticket? | A scoped dependency graph | Edge meaning, titles and links; not invented dates or completion |
| Which module owns this rule? | A boundary/data-flow view | Authoritative definitions and direction of data ownership |
| How do measured candidates compare? | A table first; a chart for useful measured trends | Data, units, denominator, workload, uncertainty and unmeasured cells |
| What is the current verification state? | A short status/evidence table | Separate implementation, integration, tests, review and release |
| What did we decide and why? | Usually a paragraph, especially for a short ADR | Trade-off and rejected alternative when relevant |

Do not use a progress pie chart for heterogeneous tickets, a Gantt chart without agreed dates, a speculative benchmark chart, or a graph containing every source ID. More diagrams do not establish better comprehension. Split by reader question or omit the visual when labels or crossings obscure the answer; there is no universal node-count gate.

## One source, several views

Name the question above the visual. Put a descriptive source link, exact scope and revision beside it. Show the same material failure branches and limitations as the text; omissions in an illustrative subset must be explicit. A diagram must not introduce an actor, sequencing constraint, accepted choice or transition absent from the source.

Retain editable source and update it with the authoritative change. When the project keeps rendered images, retain the source and regeneration command and refresh both together. Follow existing project conventions rather than adding a renderer, website or CDN by default. Never upload private source text to a public diagram service for convenience.

## Reader and rendering

Prefer an existing supported format. GitHub supports fenced Mermaid blocks, but a project's viewer may not. Use conservative syntax and verify the actual target renderer when available. Label an unrendered example as such; syntax or regex checks alone do not establish rendering or understanding.

For Mermaid use `accTitle` and `accDescr` where the chosen diagram type supports them. Supply an adjacent text/table equivalent that preserves the behavior, not only alt text saying "diagram". Do not rely on color alone for passed/blocked/unknown states. Check labels, arrow direction, readability and error paths in the rendered view before claiming that visual verification ran. If rendering is unavailable, keep the equivalent text usable and disclose the limit.

References: [GitHub diagrams](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/creating-diagrams), [Mermaid accessibility](https://mermaid.js.org/config/accessibility). These describe tool capabilities, not evidence that a particular visual improves comprehension.
