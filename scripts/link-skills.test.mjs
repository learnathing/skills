import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { linkSkills } from "./link-skills.mjs";

function fixture(t) {
  const base = fs.mkdtempSync(path.join(os.tmpdir(), "lain-link-"));
  t.after(() => fs.rmSync(base, { recursive: true, force: true }));
  const repo = path.join(base, "repo");
  const home = path.join(base, "home");
  fs.mkdirSync(home);
  for (const [bucket, name] of [["engineering", "lain-build"], ["productivity", "lain-note"], ["in-progress", "lain-beta"], ["misc", "lain-extra"], ["deprecated", "lain-old"]]) {
    const dir = path.join(repo, "skills", bucket, name);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "SKILL.md"), "test");
  }
  const destination = path.join(home, ".claude", "skills");
  const run = (options = {}) => linkSkills({ repo, home, log() {}, ...options });
  return { base, repo, home, destination, run };
}

test("defaults select promoted skills in both harnesses and are idempotent", (t) => {
  const f = fixture(t);
  assert.equal(f.run().length, 4);
  for (const harness of [".claude", ".agents"]) {
    const dest = path.join(f.home, harness, "skills");
    assert.deepEqual(fs.readdirSync(dest).sort(), ["lain-build", "lain-note"]);
    assert.equal(fs.readlinkSync(path.join(dest, "lain-build")), path.join(f.repo, "skills/engineering/lain-build"));
  }
  assert.deepEqual(f.run(), []);
});

test("experimental and miscellaneous skills require separate opt-ins", (t) => {
  const f = fixture(t);
  f.run({ includeInProgress: true });
  assert.ok(fs.existsSync(path.join(f.destination, "lain-beta")));
  assert.ok(!fs.existsSync(path.join(f.destination, "lain-extra")));
  f.run({ includeMisc: true });
  assert.ok(fs.existsSync(path.join(f.destination, "lain-extra")));
  assert.ok(!fs.existsSync(path.join(f.destination, "lain-old")));
});

test("dry run creates no harness directories", (t) => {
  const f = fixture(t);
  assert.equal(f.run({ dryRun: true }).length, 4);
  assert.deepEqual(fs.readdirSync(f.home), []);
});

test("a user directory blocks the complete plan before any links are written", (t) => {
  const f = fixture(t);
  const conflict = path.join(f.home, ".agents", "skills", "lain-note");
  fs.mkdirSync(conflict, { recursive: true });
  fs.writeFileSync(path.join(conflict, "user.txt"), "keep");
  assert.throws(() => f.run(), /Refusing to replace user/);
  assert.ok(!fs.existsSync(f.destination));
  assert.equal(fs.readFileSync(path.join(conflict, "user.txt"), "utf8"), "keep");
});

test("foreign and dangling symlinks are preserved", (t) => {
  const f = fixture(t);
  fs.mkdirSync(f.destination, { recursive: true });
  const target = path.join(f.destination, "lain-build");
  fs.symlinkSync(path.join(f.base, "foreign-missing"), target);
  assert.throws(() => f.run(), /foreign symlink/);
  assert.equal(fs.readlinkSync(target), path.join(f.base, "foreign-missing"));
});

test("a destination or ancestor symlink into the repo is refused", (t) => {
  const f = fixture(t);
  fs.symlinkSync(f.repo, path.join(f.home, ".claude"), "dir");
  assert.throws(() => f.run(), /resolves into this repository/);
  assert.ok(!fs.existsSync(path.join(f.home, ".agents")));
});

test("previously selected links remain unless prune is explicit", (t) => {
  const f = fixture(t);
  f.run({ includeInProgress: true, includeMisc: true });
  f.run();
  assert.ok(fs.existsSync(path.join(f.destination, "lain-beta")));
  const foreign = path.join(f.destination, "lain-foreign");
  fs.symlinkSync(f.home, foreign, "dir");
  const actual = path.join(f.destination, "lain-user");
  fs.mkdirSync(actual);
  const preview = f.run({ prune: true, dryRun: true });
  assert.equal(preview.filter(({ action }) => action === "prune").length, 4);
  assert.ok(fs.existsSync(path.join(f.destination, "lain-beta")));
  f.run({ prune: true });
  assert.ok(!fs.existsSync(path.join(f.destination, "lain-beta")));
  assert.ok(fs.lstatSync(foreign).isSymbolicLink());
  assert.ok(fs.statSync(actual).isDirectory());
});

test("an owned link follows a skill moved between selected buckets", (t) => {
  const f = fixture(t);
  f.run();
  fs.renameSync(path.join(f.repo, "skills/engineering/lain-build"), path.join(f.repo, "skills/productivity/lain-build"));
  assert.equal(f.run().filter(({ action }) => action === "replace").length, 2);
  assert.equal(fs.readlinkSync(path.join(f.destination, "lain-build")), path.join(f.repo, "skills/productivity/lain-build"));
});

test("duplicate selected names are detected before writing", (t) => {
  const f = fixture(t);
  const duplicate = path.join(f.repo, "skills/productivity/lain-build");
  fs.mkdirSync(duplicate);
  fs.writeFileSync(path.join(duplicate, "SKILL.md"), "duplicate");
  assert.throws(() => f.run(), /Duplicate/);
  assert.deepEqual(fs.readdirSync(f.home), []);
});

test("two harness paths sharing the same real directory are deduplicated", (t) => {
  const f = fixture(t);
  fs.mkdirSync(f.destination, { recursive: true });
  fs.mkdirSync(path.join(f.home, ".agents"));
  fs.symlinkSync(f.destination, path.join(f.home, ".agents", "skills"), "dir");
  assert.equal(f.run().length, 2);
  assert.deepEqual(f.run(), []);
});


test("non-file skill manifests fail before mutation", (t) => {
  const f = fixture(t);
  const manifest = path.join(f.repo, "skills/engineering/lain-build/SKILL.md");
  fs.unlinkSync(manifest);
  fs.mkdirSync(manifest);
  assert.throws(() => f.run(), /SKILL.md is not a file/);
  assert.deepEqual(fs.readdirSync(f.home), []);
});
