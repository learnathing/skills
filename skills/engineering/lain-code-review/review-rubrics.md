# Review rubrics

Every finding uses this shape:

```text
[blocker|advisory] Short title
Evidence: file and hunk, plus the governing source when one exists
Impact: the concrete correctness, maintenance, or comprehension cost
Smallest fix: the least change that resolves the impact
```

A preference without a concrete impact is not a finding. A heuristic without evidence is not a finding.

## Design rubric

Inspect the changed module, its immediate callers, and its immediate dependencies. Review the resulting design, not only the text of the diff.

- **Readable main path**: a reader can follow the primary behaviour in domain terms without first understanding fallback machinery or generic helpers.
- **Rule locality**: each invariant and business decision has one clear owner.
- **Interface depth**: the interface hides more knowledge than it exposes. New pass-through layers and test-only public seams need concrete justification.
- **Failure contract**: every new path that substitutes for missing, invalid, or failed required behaviour has a source decision, caller-visible semantics, and observability. Ordinary initial values and contract-required defaults are not fallbacks.
- **Evidence-backed abstraction**: an abstraction serves current variation or callers. Imagined future reuse is not evidence.
- **Test stability**: tests observe behaviour through agreed seams and can survive an internal refactor.
- **Change amplification**: the change does not spread one decision across unrelated modules when one owner could contain it.

Apply these additional checks only where the change touches the corresponding risk:

- **Shared contracts**: changed consumers agree on accepted identities, data ownership, interface and failure semantics. Trace any changed constraint revision to its source and affected tickets; a known-obsolete snapshot is not sufficient authority.
- **Quality evidence**: required algorithm, capacity or integration claims have actual evidence for the specified data and environment. Green behavior tests and a complete report template do not prove an unmeasured target.
- **Operational change**: changed persistence or deployment behavior respects required compatibility, migration, permissions and rollback or other recovery obligations. Distinguish implementation completion from checks explicitly deferred to release.

Missing evidence is a blocker only when an accepted source requires it for the current gate. Do not impose an unsolicited quality threshold, new architecture document, or production action on a small change.

An unsafe or untraceable failure behaviour is a blocker. Duplicated ownership is a blocker only when the target already produces inconsistent behaviour or the changed contract has a concrete correctness risk; otherwise it is advisory. Other design findings are advisory unless their impact demonstrates a contract or correctness failure.
