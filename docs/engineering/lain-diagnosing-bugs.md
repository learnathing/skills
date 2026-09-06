## What it does

`lain-diagnosing-bugs` investigates a specific failure using code, captured evidence, and a **tight** feedback loop. It separates a provisional diagnosis from a verified fix.

The six-phase workflow retains reproduction, minimization, falsifiable hypotheses, targeted instrumentation, regression checks, and cleanup. Missing access limits verification, but does not prevent analysis of accessible evidence.

## When to reach for it

Type `/lain-diagnosing-bugs`, or the agent reaches for it when diagnosing a reported defect or performance regression.

| Situation | Approach |
| --- | --- |
| Defect with a local test seam | Reproduce and minimize the failure, then verify the fix with a regression check |
| Several plausible causes or an intermittent failure | Improve reproduction and test discriminating predictions |
| Only captured logs and source code are available | Investigate them and distinguish observations from unverified hypotheses |
| General architecture concern without a specific failure | Use [lain-improve-codebase-architecture](https://aihero.dev/skills-improve-codebase-architecture) |

## Evidence and the tight loop

A useful loop is fast enough to guide the investigation, asserts the actual symptom, and distinguishes a failure from a fix. Tests, trace replay, a targeted script, a debugger, and differential runs are possible tools. The next check depends on the evidence, not on a fixed number of hypotheses or a required reproduction percentage.

Minimize the reproduction until every remaining element is load-bearing. Keep the original captured case for final verification. A local simulation can test a mechanism without proving what happened in production, so the report identifies that boundary.

## Common questions

**Does the agent need a reproduction before explaining a likely cause?**

No. It can use code, logs, and recent changes to form provisional hypotheses and choose a probe. A plausible explanation is not a verified result.

**What if the incident environment is unavailable?**

The agent continues with accessible evidence, explains what it cannot establish, and proposes the smallest additional check that would distinguish the remaining causes. It asks for access only when that access would change the next step.

**Does diagnosis authorize changing production?**

No. Production instrumentation and consequential external changes require appropriate authorization. Captured secrets are redacted before being shown.

## It's working if

- The report distinguishes observed facts, provisional causes, and verified results.
- Checks exercise the symptom you reported.
- When reproduction is available, minimization and regression checks retain the original workflow.
- Unavailable production access does not stop useful local investigation.
- A verified fix has regression evidence and temporary instrumentation is removed.

## Where it fits

A standalone diagnosis workflow. [lain-triage](https://aihero.dev/skills-triage) can supply captured evidence, and [lain-tdd](https://aihero.dev/skills-tdd) supplies the test-first workflow for a concrete behavior. [lain-ask-matt](https://aihero.dev/skills-ask-matt) routes across the skill set.
