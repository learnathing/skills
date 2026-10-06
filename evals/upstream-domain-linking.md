# Domain compatibility and local linking development checks

The executable resolver and linker tests use temporary filesystems and exercise actual file operations. They do not run on user installations. The compatibility-source checks inspect written skill contracts, not agent comprehension. These prospective agent scenarios remain unexecuted:

| Scenario | Expected observation |
| --- | --- |
| Old single-context project | Reads and updates the existing CONTEXT.md, without creating GLOSSARY.md |
| New naming only | Finds GLOSSARY.md without requiring a setup rerun |
| Map with custom per-context targets | Reads only relevant mapped definitions and writes back to those sources |
| Both naming families | Resolves authority before canonical use; no silent filename preference |
| Explicit custom configuration | Uses the configured path instead of a convenient conventional file |
| Unreadable configured source | Reports the affected gap instead of treating the source as absent |
| No glossary and passive task | Continues with ordinary language; creates no document |
| Authorized rename | Updates maps, configuration and active readers together, preserving definitions and unrelated work |
| Historical records | Leaves frozen evaluation fixtures, changelog history and pinned external filenames unchanged |

Retain before/after source and Git-state evidence when evaluating these with an agent. A written success table is not sole evidence. Filesystem tests establish their tested deterministic behavior only, not domain-model quality, live installation safety under concurrent writers, or behavioral outcome lift.
