import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = fileURLToPath(new URL("../", import.meta.url));
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const { skills } = JSON.parse(read("scripts/upstream-skills.json"));
const plugin = JSON.parse(read(".claude-plugin/plugin.json"));
const headings = ["What it does", "When to reach for it", "Common questions", "It's working if", "Where it fits"];

test("upstream additions have unique names", () => {
  assert.equal(new Set(skills.map(({ name }) => name)).size, skills.length);
});

for (const { name, bucket, user_invoked: userInvoked } of skills) {
  test(`${name}: packaging, invocation, documentation and routing`, () => {
    const dir = `skills/${bucket}/${name}`;
    const skill = read(`${dir}/SKILL.md`);
    const agent = read(`${dir}/agents/openai.yaml`);
    assert.match(skill, new RegExp(`^name: ${name}$`, "m"));
    assert.equal(/^disable-model-invocation: true$/m.test(skill), userInvoked);
    assert.equal(/allow_implicit_invocation:\s*false/.test(agent), userInvoked);
    assert.equal(plugin.skills.filter((entry) => entry === `./${dir}`).length, 1);
    for (const file of ["README.md", `skills/${bucket}/README.md`]) {
      const text = read(file);
      const label = userInvoked ? "User-invoked" : "Model-invoked";
      const section = text.split(/(?:^## |^\*\*)(?:User-invoked|Model-invoked)(?:\*\*)?\s*$/m);
      assert.ok(section.some((part) => part.includes(`[${name}](`)), `${file}: missing skill link`);
      const position = text.indexOf(`[${name}](`);
      const before = text.slice(0, position);
      const matches = [...before.matchAll(/(?:^## |^\*\*)(User-invoked|Model-invoked)(?:\*\*)?\s*$/gm)];
      assert.equal(matches.at(-1)?.[1], label, `${file}: wrong invocation group`);
    }
    const doc = read(`docs/${bucket}/${name}.md`);
    assert.doesNotMatch(doc, /^# /m);
    assert.doesNotMatch(doc, /\]\((?!https:\/\/)[^)]+\)/);
    let previous = -1;
    for (const heading of headings) {
      const index = doc.indexOf(`## ${heading}\n`);
      assert.ok(index > previous, `${name}: missing or misordered ${heading}`);
      previous = index;
    }
    assert.ok(!skill.includes("\u2014") && !doc.includes("\u2014"));
    assert.ok(read("skills/engineering/lain-ask-matt/SKILL.md").includes(name));
  });
}

test("operative calls in added skills never invoke a user-only skill", () => {
  const userOnly = new Set();
  for (const bucket of ["engineering", "productivity"]) {
    for (const entry of fs.readdirSync(path.join(root, "skills", bucket), { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const file = `skills/${bucket}/${entry.name}/SKILL.md`;
      if (fs.existsSync(path.join(root, file)) && /^disable-model-invocation: true$/m.test(read(file))) userOnly.add(entry.name);
    }
  }
  for (const { bucket, name } of skills) {
    const body = read(`skills/${bucket}/${name}/SKILL.md`);
    for (const [, target] of body.matchAll(/call the Skill tool with ["`']([^"`']+)["`']/gi)) {
      assert.ok(!userOnly.has(target), `${name} implicitly invokes ${target}`);
      assert.ok(plugin.skills.some((entry) => entry.endsWith(`/${target}`)), `${name}: missing dependency ${target}`);
    }
  }
});

test("PR evidence and retrospective authority remain explicit", () => {
  const pr = read("skills/engineering/lain-pr/SKILL.md");
  assert.match(pr, /not captured/);
  assert.match(pr, /not run/);
  assert.match(pr, /preservation/i);
  assert.match(pr, /NOT INDEPENDENTLY VERIFIED/);
  assert.match(pr, /not authority to push/);
  const retro = read("skills/engineering/lain-retro/SKILL.md");
  assert.match(retro, /separate applicable authority/);
  assert.match(retro, /Reuse or repair an existing check/);
  assert.match(retro, /independent review and complete coverage/);
  assert.match(retro, /no mandatory retrospective/);
});
