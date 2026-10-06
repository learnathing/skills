## What it does

`lain-code-review` uses one independent reviewer for Standards, Spec and Design, with the calling agent verifying the findings against the original sources and changed code. Three review responsibilities do not require three agents. The review is read-only; technical risk changes the relevant evidence, not the task into a new architecture project.

## When to reach for it

Type `/lain-code-review`, or the [agent](https://www.aihero.dev/ai-coding-dictionary/agent) uses it for a branch, pull request, working tree or change from a fixed point. Per-ticket reviews cover bounded contracts; final branch review covers interactions across a multi-ticket delivery. Verification mode checks previous dispositions and current blockers without generating a new advisory backlog.

## Three axes and relevant evidence

| Axis | Governing question |
| --- | --- |
| Standards | Does the change obey applicable documented repository rules? |
| Spec | Does it satisfy the originating behavior and binding constraints without omissions? |
| Design | Are responsibilities local, failures explicit, interfaces useful and shared contracts coherent? |

The fixed point must resolve and the target must contain reviewable changes. The original issue or spec is authoritative; the reconstructed implementation contract is only a coverage index. A missing source is disclosed rather than invented.

Where the change affects technical risk, inspect accepted constraint revisions, data identity and lifecycle, algorithm evaluation, and assigned integration, migration or recovery evidence. Do not require an unsolicited architecture document, quality threshold or production action for an ordinary local change.

An unrun measurement does not prove a required target. Evidence is a blocker only when the accepted source requires it for the current gate, not merely for a later release. Every finding still needs accurate code evidence, concrete impact and a smallest fix. Preferences and duplicated impacts are not independent blockers.

## Independent review and limitations

One independent [subagent](https://www.aihero.dev/ai-coding-dictionary/subagent) reviews all applicable axes from a fresh review context. The calling agent is the coordinator, not another newly spawned reviewer. The review does not add a complexity score or automatic one-versus-three routing. Explicit project or user requirements for specialist or additional review still apply; this default does not restrict other subagent tasks.

The reviewer and coordinator read relevant originals on demand. They preserve source revisions and outstanding checks across truncation or compaction, then recover the evidence still needed. A large [context window](https://www.aihero.dev/ai-coding-dictionary/context-window) and a short final report are not proof that every required check was completed.

| Result | Meaning |
| --- | --- |
| `PASS` | Applicable coverage and required independent review are complete, with no verified blocker |
| `FAIL` | At least one verified blocker remains |
| `INCOMPLETE` | Required reading, checks or verification remain unfinished, with the uncovered scope identified |
| `NOT INDEPENDENTLY VERIFIED` | Only a direct review was possible; independent review has not been established |

More than one non-pass state can apply. Existing explicit task or project policy may permit a direct review substitute; it does not waive incomplete coverage. Absence of tooling does not itself grant an exception. A second reading in the same context is not independent evidence.

## Common questions

**Does one reviewer mean dropping Standards or Design?**

No. The reviewer covers all applicable responsibilities, including original-source comparison and the same Design rubric. Cross-axis observations of one root cause are counted once, not presented as independent confirmations.

**What happens when the material does not fit?**

The reviewer reads relevant sources as needed and restores missing originals after truncation or compaction. Required checks that still cannot be completed are reported as `INCOMPLETE`, not silently omitted or turned into PASS. Unknown capacity telemetry alone does not stop an otherwise complete review.

**Are uncommitted and untracked files included?**

Yes in working-tree mode, with the declared pre-existing baseline and recorded exclusions removed. HEAD mode states when the working tree is excluded.

**Does every algorithm change require a full benchmark?**

Only evidence required by the accepted scope and gate. Existing applicable evidence can be reused; behavior tests alone cannot establish a new empirical quality claim.

**Can a read-only review run experiments or rewrite the design?**

No. It inspects evidence and reports missing obligations. Design and implementation changes remain separate authorized work.

## It's working if

- Findings cite the authoritative requirement and actual code.
- Shared sources are inspected only where relevant to the change.
- Local work does not trigger a ceremonial whole-system audit.
- Duplicate cross-axis impacts are counted once.
- Missing measurement, unfinished checks and missing independence are disclosed accurately.
- Blockers, advisories and future release obligations remain distinct.

- Finding titles name affected behavior, with concrete impact and evidence; every required review axis and non-pass state remains visible. See the [shared artifact writing reference](https://github.com/learnathing/skills/blob/main/docs/productivity/lain-writing-for-agents.md).

## Where it fits

[Implement](https://aihero.dev/skills-implement) uses this gate before committing. It also stands alone for branches and pull requests. [To-tickets](https://aihero.dev/skills-to-tickets) requires final branch review after multi-ticket delivery. [Ask Matt](https://aihero.dev/skills-ask-matt) routes the set.
