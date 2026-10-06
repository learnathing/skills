// Check discovery instructions, not model comprehension or semantic domain accuracy.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = fileURLToPath(new URL("../", import.meta.url));
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
for (const bucket of ["engineering", "productivity"]) {
  for (const entry of fs.readdirSync(path.join(root, "skills", bucket), { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const relative = `skills/${bucket}/${entry.name}/SKILL.md`;
    const body = read(relative);
    if (!body.includes("CONTEXT.md") && !body.includes("CONTEXT-MAP.md")) continue;
    test(`${entry.name}: legacy references have explicit dual-name discovery`, () => {
      for (const term of ["GLOSSARY.md", "GLOSSARY-MAP.md", "docs/agents/domain.md"]) {
        assert.ok(body.includes(term), `${relative}: missing ${term}`);
      }
    });
  }
}

test("setup preserves existing names and new-project creation is lazy", () => {
  const skill = read("skills/engineering/lain-domain-modeling/SKILL.md");
  assert.match(skill, /retain its actual glossary and map names/);
  assert.match(skill, /does not authorize renaming files/);
  assert.match(skill, /does not parse prose configuration/);
  const setup = read("skills/engineering/lain-setup-matt-pocock-skills/SKILL.md");
  assert.match(setup, /Default to a single `GLOSSARY.md`/);
  assert.match(setup, /Do not rename existing domain files/);
});

test("linker wrapper delegates arguments and contains no destructive replacement", () => {
  const wrapper = read("scripts/link-skills.sh");
  assert.match(wrapper, /exec node/);
  assert.ok(wrapper.includes('"$@"'));
  assert.doesNotMatch(wrapper, /rm\s+-rf/);
});
