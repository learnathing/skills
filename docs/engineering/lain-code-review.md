## What it does

`lain-code-review` reviews committed or working-tree changes along Standards, Spec and Design axes. It verifies findings against the source and actual changed code before reporting them. The review is read-only; technical risk changes the relevant evidence, not the task into a new architecture project.

## When to reach for it

Type `/lain-code-review`, or the agent uses it for a branch, pull request, working tree or change from a fixed point. Per-ticket reviews cover bounded contracts; final branch review covers interactions across a multi-ticket delivery. Verification mode checks previous dispositions and current blockers without generating a new advisory backlog.

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

When supported, independent subagents review the applicable axes and the coordinator verifies their findings. Reviewers do not recursively invoke skills or spawn more reviewers.

If independent reviewers are unavailable, report `NOT INDEPENDENTLY VERIFIED`, not a synthetic PASS. Existing explicit task or project policy may permit a direct review substitute; absence of tooling does not itself grant that exception. A second reading in the same context is not independent evidence.

## Common questions

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
- Missing measurement and missing independence are disclosed accurately.
- Blockers, advisories and future release obligations remain distinct.

## Where it fits

[Implement](https://aihero.dev/skills-implement) uses this gate before committing. It also stands alone for branches and pull requests. [To-tickets](https://aihero.dev/skills-to-tickets) requires final branch review after multi-ticket delivery. [Ask Matt](https://aihero.dev/skills-ask-matt) routes the set.
