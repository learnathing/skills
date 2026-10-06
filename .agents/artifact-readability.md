# Shared artifacts: developer-readable, agent-usable

## Scope

Generated artifacts, not just specs and tickets, should let their intended reader understand behavior, question assumptions and decide what happens next. The writing owner is `lain-writing-for-agents` in artifact mode. Its co-located `HUMAN-ARTIFACTS.md` is the single writing reference. No new skill, mandatory polish stage or second source of truth is introduced.

## Covered producers

| Producer | Artifacts | Visible reading improvement |
| --- | --- | --- |
| `lain-to-spec` | Specifications and delivery manifests | A developer sees outcomes, failure cases and exclusions before source indexes and JSON, without losing the original decisions. |
| `lain-to-tickets` | Tickets and proposed delivery breakdown | A developer sees the outcome, acceptance conditions and dependency reasons before the machine fields; exact source definitions remain available. |
| `lain-grill-with-docs` | Grilling decision handoff | The handoff makes the agreement and unresolved choices understandable before its full source index, without another approval ritual. |
| `lain-technical-design` | Technical design notes, accepted decisions and readiness reports | A design note explains the choice, reason, consequence and blockers before its revision register. |
| `lain-wayfinder` | Decision maps, decision tickets and resolution comments | The map shows what decisions matter and what each unresolved question blocks, without duplicating every child ticket. |
| `lain-prototype` | UI/logic walkthroughs and technical experiment reports | A walkthrough says what to try and observe; an experiment report gives its supported answer and limits before raw results. |
| `lain-research` | Cited research notes | The note answers the research question with citations and uncertainty before the search trail, distinguishing facts from recommendations. |
| `lain-domain-modeling` | Domain glossaries, context maps and ADRs | A term is understandable without a chain of undefined terms; an ADR explains the choice and consequence while keeping acceptance status explicit. |
| `lain-code-review` | Standards/Spec/Design review and repair-verification reports | Finding titles name affected behavior, with concrete impact and evidence; every required review axis and non-pass state remains visible. |
| `lain-implement` | Implementation contracts and completion reports | The completion report says what changed and what remains unverified before the command evidence, without weakening the commit gate. |
| `lain-tdd` | TDD cycle and preservation evidence | Cycle evidence starts from the tested behavior and keeps actual Red/Green results distinct from preservation checks. |
| `lain-diagnosing-bugs` | Diagnosis notes, hypotheses and fix reports | The diagnosis starts from the symptom and supported cause or hypothesis, with uncertainty visible rather than buried in logs. |
| `lain-triage` | Agent briefs, triage notes, information requests and rejection records | After the required disclaimer, the brief makes current versus desired behavior and material exceptions clear; missing-information questions explain what is needed. |
| `lain-to-questionnaire` | Discovery questionnaires | The recipient can answer each question using the supplied context, with no assumed decision or invented deadline. |
| `lain-teach` | MISSION, RESOURCES, NOTES, learning records, lessons and reference HTML | Learning materials explain the idea before its terms, and records distinguish demonstrated learning from topics merely discussed. |
| `lain-setup-matt-pocock-skills` | Project configuration and instruction-file pointer blocks | A configuration note says what a setting controls and where its source lives, while preserving exact keys, paths and authority. |
| `lain-improve-codebase-architecture` | Architecture survey HTML reports | Each visual has a readable explanation of the concrete friction, proposed difference, impact and uncertainty. |
| `lain-pr` | PR descriptions | The PR body explains the user-visible purpose before dense trace data and keeps evidence gaps and rollback limitations visible. |
| `lain-handoff` | Cross-session or cross-agent handoff | The next reader can identify the goal, current state and authorized next step without reconstructing the task from a list of paths. |
| `lain-retro` | Session retrospective and environment-improvement proposals | A proposed environment change is tied to an observed problem and a verification plan, not presented as an already measured improvement. |

## Compatibility

Specs put the readable contract before their source index and Delivery Manifest. Tickets put the outcome, acceptance and human-readable dependency reasons before metadata and exact trace. Existing schema-v1 machine keys and section names remain literal; prose may use the reader's working language. Preserve old exact definitions or reconcile the source before regenerating copies. Reformatting never grants authority or turns missing evidence into PASS.

One short paragraph is still sufficient for an eligible ADR. Glossaries remain terminology, not specifications. HTML reports and lessons keep their required formats; optional diagrams explain the same revision. Raw logs, code, commands, machine records and historical artifacts are not bulk-rewritten.

## Verification

Run `node --test scripts/readable-artifacts.test.mjs` for real validator compatibility checks with Chinese prose and multi-sentence definitions. Run `node --test scripts/artifact-wiring.test.mjs` to check the declared producer/reference/doc wiring in a complete checkout. Existing ticket, review and engineering-flow checks remain required. Mechanical checks do not establish human comprehension or agent task quality.

`evals/readable-artifacts.md` defines a separate human-understanding evaluation. Its examples are development inputs, not executed human trials. Do not publish readability or performance uplift without that evidence.

## Integration boundary

Prepared against main `cf935302dca2adba1a37003923f8ddeb20fa517c`. Separate upstream integration work may have extracted `lain-implement` into a shared `lain-implementation` skill. When that work reaches the integration branch, place the same report-writing pointer at the shared implementation owner, rather than duplicating its six-state contract or restoring the old entry-point body. Reconcile changed domain-document discovery rules instead of overwriting them.
