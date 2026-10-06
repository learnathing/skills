import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { resolveDomainDocs } from "../skills/engineering/lain-domain-modeling/resolve-domain-docs.mjs";

function fixture(t, files = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "lain-domain-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  for (const [file, body] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
    fs.writeFileSync(path.join(root, file), body);
  }
  return root;
}

for (const prefix of ["CONTEXT", "GLOSSARY"]) {
  test(`${prefix} single-context layout remains readable without mutation`, (t) => {
    const root = fixture(t, { [`${prefix}.md`]: "# Terms\n" });
    const before = fs.readdirSync(root);
    const result = resolveDomainDocs(root);
    assert.equal(result.glossary, path.join(root, `${prefix}.md`));
    assert.equal(result.status, "resolved");
    assert.deepEqual(fs.readdirSync(root), before);
    assert.equal(fs.readFileSync(result.glossary, "utf8"), "# Terms\n");
  });
  test(`${prefix} map is returned as an entry point, not flattened`, (t) => {
    const root = fixture(t, { [`${prefix}-MAP.md`]: "ordering: src/ordering/terms.md\n", "src/ordering/terms.md": "Order\n" });
    const result = resolveDomainDocs(root);
    assert.equal(result.map, path.join(root, `${prefix}-MAP.md`));
    assert.equal(result.glossary, undefined);
  });
}

test("mixed naming families require explicit authority", (t) => {
  const root = fixture(t, { "CONTEXT.md": "old", "GLOSSARY.md": "new" });
  assert.throws(() => resolveDomainDocs(root), /Ambiguous/);
  assert.equal(resolveDomainDocs(root, { glossary: "CONTEXT.md" }).authority, "configured");
  assert.equal(resolveDomainDocs(root, { glossary: "GLOSSARY.md" }).glossary, path.join(root, "GLOSSARY.md"));
});

test("a new map beside a legacy glossary is also ambiguous without configuration", (t) => {
  const root = fixture(t, { "CONTEXT.md": "old", "GLOSSARY-MAP.md": "map" });
  assert.throws(() => resolveDomainDocs(root), /Ambiguous/);
});

test("configured custom paths win and missing configured sources do not fall back", (t) => {
  const root = fixture(t, { "CONTEXT.md": "old", "docs/domain/terms.md": "configured" });
  assert.equal(resolveDomainDocs(root, { glossary: "docs/domain/terms.md" }).glossary, path.join(root, "docs/domain/terms.md"));
  assert.throws(() => resolveDomainDocs(root, { glossary: "missing.md" }), /ENOENT/);
  assert.throws(() => resolveDomainDocs(root, { glossary: "docs" }), /not a file/);
  assert.throws(() => resolveDomainDocs(root, { glossary: "" }), /non-empty/);
  assert.throws(() => resolveDomainDocs(root, { glossry: "CONTEXT.md" }), /Unknown/);
});

test("no files is a lazy creation suggestion, never a write", (t) => {
  const root = fixture(t);
  assert.deepEqual(resolveDomainDocs(root), { status: "missing", suggested_glossary: path.join(root, "GLOSSARY.md") });
  assert.deepEqual(fs.readdirSync(root), []);
});

test("a dangling conventional symlink is an unreadable source, not absence", (t) => {
  const root = fixture(t);
  fs.symlinkSync("missing.md", path.join(root, "CONTEXT.md"));
  assert.throws(() => resolveDomainDocs(root), /ENOENT/);
});

test("CLI ambiguity fails nonzero without output claiming a selection", (t) => {
  const root = fixture(t, { "CONTEXT.md": "old", "GLOSSARY.md": "new" });
  const script = fileURLToPath(new URL("../skills/engineering/lain-domain-modeling/resolve-domain-docs.mjs", import.meta.url));
  const result = spawnSync(process.execPath, [script, root], { encoding: "utf8" });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Ambiguous/);
  assert.equal(result.stdout, "");
});
