---
"lain-mattpocock-skills": minor
---

Support configured domain sources and both GLOSSARY and legacy CONTEXT naming families without forced migration. Detect ambiguous or unreadable sources instead of silently selecting or duplicating a glossary. Add a read-only resolver and filesystem regression tests.

Make local linking default to promoted skills, with explicit experimental/miscellaneous selection and optional checkout-owned link pruning. Refuse to replace user files, directories or foreign symlinks. The maintainer linker now requires Node.js 22; previously installed links remain until explicitly pruned.
