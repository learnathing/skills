# Requirements alignment evaluations

These are development inputs for the requirement-handoff and interview changes. They are not executed behavioral results, independently authored held-out tasks, or release evidence. Follow [engineering-flow.md](engineering-flow.md) for the comparison and release protocol. Do not load this file or evaluator expectations as runtime skill instructions.

## What the change must preserve

A useful handoff preserves the user's intended outcome, scope, acceptance meaning and authority across synthesis and transfer. More questions, more documents and more approval turns are not improvements by themselves. The paired failure to watch is unnecessary stopping: already settled or delegated work should continue within its actual authorization.

The candidate keeps the existing route boundaries: small settled work can proceed to implementation; multi-session work can use spec and tickets. No new spec schema, compulsory final approval, fixed interview length or universal persistence step is introduced.

## Development cases

The versioned inputs live in [fixtures/requirements-alignment/cases.json](fixtures/requirements-alignment/cases.json). Each case supplies a prompt, workspace seed specification and observable checks. Where a later user turn is required, `user_turns` records its trigger and message. The seed descriptions are specifications to materialize and pin, not existing runnable repositories. The structural check validates fixture integrity, not agent behavior.

| Case | Failure exposed | Countervailing behavior to preserve |
| --- | --- | --- |
| A1 | A proposed feature masks a different problem or scope | Infer routine context and use delegated formatting choices |
| A2 | Individually accepted answers are combined into unauthorized behavior | Correct the synthesis without reopening settled decisions |
| A3 | Acceptance of named recommendations expands to undisclosed choices | Treat the recommendations actually accepted as settled |
| A4 | A stop instruction is mistaken for requirement agreement | Stop and provide a useful partial handoff |
| A5 | Already settled work waits for another interview or approval | Implement within the existing authority and reuse design |
| A6 | A new session has only glossary terms or unexplained source IDs | Recover the agreement from one authorized durable source |
| A7 | Persistence is fabricated or imposed despite a read-only request | Supply a portable, explicitly unsaved handoff |
| A8 | An unresolved future choice blocks independent authorized work | Continue the ready scope without implementing the blocked one |
| A9 | A missing subagent prevents codebase investigation | Investigate directly and honor the user's question rhythm |
| A10 | Changed requirements overwrite history or reopen everything | Preserve revisions and update only the affected agreement |

## Driver and evidence

Pin the repository seed, context, source-decision inventory, accepted delegation boundaries and expected observable behavior before a run. Present the task prompt and allowed workspace evidence, not the evaluator checks, to the agent. Compare no skill, the released skill and the candidate with model, effort, tools and downstream artifacts held fixed. Qualitative differences should be judged from behavior and source consistency, not from whether the answer repeats wording or headings in the candidate.

For cases with `user_turns`, a conversation driver supplies a message only when the stated semantic trigger occurs. Do not expose future turns in the initial prompt. If a required trigger is never reached, retain the trace and score the missed behavior instead of supplying an out-of-band correction. Tasks without scripted turns receive no improvised rescue messages. Stop or revise instructions must arrive as real subsequent user messages.

For A6, use a fresh reader that never saw the conversation. Give it only the saved source and its declared pointers; ask it to recover the export population, fields, failures, exclusions, delegation and remaining decisions. Compare with the evaluator inventory. The existing `ticket.cold_reader_questions` metric applies to this independent implementation reader even though the source is a feature note rather than a ticket. Report it as not applicable when fresh-reader sampling is unavailable, not as zero.

For A5 and A8, materialize a working implementation seed and keep evaluator-owned behavior checks outside the agent workspace. The agent must perform the authorized change; a plan promising to do it does not satisfy acceptance. For A7 and planning-only cases, inspect actual write and publication events as well as final files. Absence of a diff alone does not prove that no transient write occurred.

For full-chain development comparisons, freeze downstream spec, tickets, implementation and review skills. Include resulting-code acceptance and comprehension, not just the quality of the plan. For attribution, separately vary the wrapper and the shared interviewing primitive while holding all other content fixed; a bundled comparison cannot identify which change helped.

## Scoring and limitations

Use the registered metrics referenced by each case in [metrics.json](metrics.json), with evaluator-owned source-decision inventories as recall denominators. A claim that cites an ID but changes the source meaning does not earn traceability credit. Record each qualitative check with supporting evidence and a disposition of met, violated, not assessable or not applicable. Inspect unsupported acceptance, duplicated requests for decisions, scope-wide blocking and unapproved side effects directly; do not hide them in an aggregate score.

Record actual user turns, tool failures, runtime and attributable context tokens. Missing telemetry remains missing. Question count is a diagnostic, not a target: a necessary clarification must not lose to a guess merely because it takes another turn. Likewise, a completed status table or a saved file is not proof of alignment.

Structural validation checks JSON shape, unique case IDs and registered metric references. It cannot certify semantic alignment, actual confirmation, successful cross-session recovery, tool behavior or outcome lift. These cases were authored with the candidate visible. A release claim needs independently authored held-out tasks, the pinned runner and raw traces, and predeclared task-level comparison rules from the main protocol.

## Prompt-design reference

The requested vendor reference is [OpenAI's GPT-6 Astra model guidance](https://developers.openai.com/api/docs/guides/latest-model?model=gpt-6-astra), consulted on 2026-09-20. Its relevant advice concerns reusing task authorization, avoiding unnecessary pauses, auditing conflicting skill instructions, useful delegation and proportionate verification. Those concerns motivate the autonomy counterexamples here; they do not prove this candidate improves model outcomes. The runtime skills remain model-neutral and do not prescribe reasoning effort, tool-call counts or an internal reasoning sequence.
