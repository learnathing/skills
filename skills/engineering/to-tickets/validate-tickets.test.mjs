import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const validator = fileURLToPath(new URL("./validate-tickets.mjs", import.meta.url));

function ticket({ id, blockedBy = "None", owns }) {
  return `# ${id}: Ticket ${id}

Ticket: ${id}
Blocked by: ${blockedBy}
Status: ready-for-agent
Owns: ${owns.join(", ")}
What to build: Deliver ${id} end to end.

## Spec trace

${owns.map((sourceId) => `- ${sourceId}: Definition for ${sourceId}. Source: fixture.`).join("\n")}

## Contract

- **Invariants:** I1
- **Seam:** public seam
- **Success:** caller-visible result
- **Failures and degradation:** no degradation

## Context pointers

- Source spec

## Acceptance criteria

- [ ] Observable result passes

## Evidence required

- Focused command output
`;
}

function run(files, required) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "ticket-validator-"));
  for (const [name, body] of Object.entries(files)) fs.writeFileSync(path.join(directory, name), body);
  const sourceManifest = path.join(directory, "source-manifest.json");
  fs.writeFileSync(sourceManifest, JSON.stringify({
    schema_version: 1,
    delivery_ids: required.map((id) => ({ id, definition: `Definition for ${id}.`, source_ids: [`D-${id}`] })),
  }));
  return spawnSync(process.execPath, [validator, sourceManifest, directory], { encoding: "utf8" });
}

test("accepts complete uniquely owned acyclic tickets", () => {
  const result = run({
    "01.md": ticket({ id: "T1", owns: ["S1"] }),
    "02.md": ticket({ id: "T2", blockedBy: "T1", owns: ["S2"] }),
  }, ["S1", "S2"]);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Validated 2 tickets against 2 manifest delivery IDs/);
});

test("rejects duplicate source ownership", () => {
  const result = run({
    "01.md": ticket({ id: "T1", owns: ["S1"] }),
    "02.md": ticket({ id: "T2", owns: ["S1"] }),
  }, ["S1"]);

  assert.equal(result.status, 1);
  assert.match(result.stderr, /multiple owners/);
});

test("rejects a manifest delivery ID with no owner", () => {
  const result = run({
    "01.md": ticket({ id: "T1", owns: ["S1"] }),
  }, ["S1", "S2"]);

  assert.equal(result.status, 1);
  assert.match(result.stderr, /S2 has no owner/);
});

test("rejects a ticket that changes a manifest definition", () => {
  const changed = ticket({ id: "T1", owns: ["S1"] }).replace("Definition for S1.", "Different definition.");
  const result = run({ "01.md": changed }, ["S1"]);

  assert.equal(result.status, 1);
  assert.match(result.stderr, /manifest definition for S1/);
});

test("rejects invented source ownership", () => {
  const result = run({
    "01.md": ticket({ id: "T1", owns: ["S1", "S99"] }),
  }, ["S1"]);

  assert.equal(result.status, 1);
  assert.match(result.stderr, /not in the required source set/);
});

test("rejects a blocking cycle", () => {
  const result = run({
    "01.md": ticket({ id: "T1", blockedBy: "T2", owns: ["S1"] }),
    "02.md": ticket({ id: "T2", blockedBy: "T1", owns: ["S2"] }),
  }, ["S1", "S2"]);

  assert.equal(result.status, 1);
  assert.match(result.stderr, /Blocking graph cycle/);
});
