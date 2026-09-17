import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const validator = fileURLToPath(new URL("./validate-tickets.mjs", import.meta.url));
const constraint = {
  id: "kb:C1",
  revision: "1",
  definition: "Search results reference the indexed document revision.",
  source: "docs/design/kb.md#c1",
  applies_to: ["S1", "S2"],
  verified_by: "S2",
};

function fixture() {
  const manifest = {
    schema_version: 1,
    delivery_ids: ["S1", "S2", "S3"].map((id) => ({
      id, definition: `Definition for ${id}.`, source_ids: [`D-${id}`],
    })),
    technical_constraints: [structuredClone(constraint)],
  };
  const tickets = Object.fromEntries(["S1", "S2", "S3"].map((id, index) => {
    const applies = id !== "S3";
    return [`T${index + 1}.md`, `# T${index + 1}: Deliver ${id}

Ticket: T${index + 1}
Blocked by: None
Status: ready-for-agent
Owns: ${id}
${applies ? "Applies: kb:C1@1\n" : ""}${id === "S2" ? "Verifies: kb:C1@1\n" : ""}What to build: Deliver ${id} end to end.

## Spec trace

- ${id}: Definition for ${id}.

## Contract

- **Invariants:** I1
- **Seam:** search interface
- **Success:** caller-visible result
- **Failures and degradation:** no degradation

## Context pointers

- Source spec
${applies ? `- ${constraint.source}\n\n## Technical trace\n\n- kb:C1@1: ${constraint.definition}\n` : ""}
## Acceptance criteria

- [ ] Observable result passes

## Evidence required

- Focused command output${id === "S2" ? " and revision identity assertion" : ""}
`];
  }));
  return { manifest, tickets };
}

function run({ manifest, tickets }) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "technical-ticket-"));
  try {
    const drafts = path.join(root, "drafts");
    fs.mkdirSync(drafts);
    for (const [name, text] of Object.entries(tickets)) fs.writeFileSync(path.join(drafts, name), text);
    const source = path.join(root, "source.json");
    fs.writeFileSync(source, JSON.stringify(manifest));
    return spawnSync(process.execPath, [validator, source, drafts], { encoding: "utf8", timeout: 10000 });
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

function rejects(name, mutate, expected) {
  test(name, () => {
    const value = fixture();
    mutate(value);
    const result = run(value);
    assert.equal(result.status, 1, result.stderr || result.stdout);
    assert.match(result.stderr, expected);
    assert.doesNotMatch(result.stderr, /TypeError|ReferenceError|SyntaxError/);
  });
}

test("shared constraints preserve unique delivery ownership and leave unrelated tickets light", () => {
  const result = run(fixture());
  assert.equal(result.status, 0, result.stderr);
});

test("legacy schema v1 needs no new fields or sections", () => {
  const value = fixture();
  delete value.manifest.technical_constraints;
  value.tickets = { "T3.md": value.tickets["T3.md"] };
  value.manifest.delivery_ids = value.manifest.delivery_ids.slice(2);
  assert.equal(run(value).status, 0);
});

test("an empty optional constraint array remains compatible", () => {
  const value = fixture();
  value.manifest.technical_constraints = [];
  value.tickets = { "T3.md": value.tickets["T3.md"] };
  value.manifest.delivery_ids = value.manifest.delivery_ids.slice(2);
  assert.equal(run(value).status, 0);
});

rejects("missing applicability is rejected", ({ tickets }) => {
  tickets["T1.md"] = tickets["T1.md"].replace("Applies: kb:C1@1\n", "");
}, /missing Applies.*kb:C1@1/);

rejects("stale constraint revisions are rejected", ({ tickets }) => {
  tickets["T1.md"] = tickets["T1.md"].replaceAll("kb:C1@1", "kb:C1@0");
}, /unknown or stale.*kb:C1@0/);

rejects("invented applicability is rejected", ({ tickets }) => {
  tickets["T3.md"] = tickets["T3.md"].replace("Owns: S3", "Owns: S3\nApplies: kb:C99@1");
}, /unknown or stale.*kb:C99@1/);

rejects("unrelated tickets cannot acquire an undeclared constraint", ({ tickets }) => {
  tickets["T3.md"] = tickets["T3.md"].replace("Owns: S3", "Owns: S3\nApplies: kb:C1@1");
}, /unexpected Applies.*kb:C1@1/);

rejects("a missing verification owner is rejected", ({ tickets }) => {
  tickets["T2.md"] = tickets["T2.md"].replace("Verifies: kb:C1@1\n", "");
}, /missing Verifies.*kb:C1@1/);

rejects("verification responsibility cannot move to an arbitrary ticket", ({ tickets }) => {
  tickets["T1.md"] = tickets["T1.md"].replace("Applies: kb:C1@1", "Applies: kb:C1@1\nVerifies: kb:C1@1");
}, /unexpected Verifies.*kb:C1@1/);

rejects("changed constraint definitions are rejected", ({ tickets }) => {
  tickets["T1.md"] = tickets["T1.md"].replace(constraint.definition, "Search can reference any revision.");
}, /Technical trace.*kb:C1@1/);

rejects("missing durable sources are rejected", ({ tickets }) => {
  tickets["T1.md"] = tickets["T1.md"].replace(constraint.source, "Some conversation");
}, /Context pointers.*kb:C1@1/);

rejects("duplicate constraint IDs are rejected even across revisions", ({ manifest }) => {
  manifest.technical_constraints.push({ ...constraint, revision: "2" });
}, /duplicate technical constraint ID/);

rejects("unknown affected delivery IDs are rejected", ({ manifest }) => {
  manifest.technical_constraints[0].applies_to.push("S99");
}, /unknown delivery ID S99/);

rejects("unknown verification delivery IDs are rejected", ({ manifest }) => {
  manifest.technical_constraints[0].verified_by = "S99";
}, /verified_by/);

rejects("verification must be assigned to an affected delivery scenario", ({ manifest }) => {
  manifest.technical_constraints[0].verified_by = "S3";
}, /verified_by.*applies_to/);

rejects("null constraint records are rejected without crashing", ({ manifest }) => {
  manifest.technical_constraints = [null];
}, /technical constraint.*object/);

rejects("null constraint collections are rejected", ({ manifest }) => {
  manifest.technical_constraints = null;
}, /technical_constraints must be an array/);

for (const key of ["id", "revision", "definition", "source", "verified_by"]) {
  rejects(`empty ${key} is rejected`, ({ manifest }) => {
    manifest.technical_constraints[0][key] = "";
  }, new RegExp(key));
}

rejects("unscoped constraint IDs are rejected", ({ manifest }) => {
  manifest.technical_constraints[0].id = "C1";
}, /namespaced/);

rejects("ambiguous constraint references are rejected", ({ manifest }) => {
  manifest.technical_constraints[0].revision = "1,2";
}, /revision/);

rejects("duplicate applies_to entries are rejected", ({ manifest }) => {
  manifest.technical_constraints[0].applies_to.push("S1");
}, /duplicate.*applies_to/);

rejects("empty applies_to is rejected", ({ manifest }) => {
  manifest.technical_constraints[0].applies_to = [];
}, /applies_to/);

rejects("duplicate ticket fields are rejected", ({ tickets }) => {
  tickets["T1.md"] = tickets["T1.md"].replace("Applies: kb:C1@1", "Applies: kb:C1@1\nApplies: kb:C1@1");
}, /duplicate Applies field/);

rejects("empty declared fields are rejected", ({ tickets }) => {
  tickets["T1.md"] = tickets["T1.md"].replace("Applies: kb:C1@1", "Applies:");
}, /empty Applies field/);

rejects("duplicate references are rejected", ({ tickets }) => {
  tickets["T1.md"] = tickets["T1.md"].replace("Applies: kb:C1@1", "Applies: kb:C1@1, kb:C1@1");
}, /duplicate Applies reference/);

rejects("technical references cannot bypass a missing manifest registry", ({ manifest }) => {
  delete manifest.technical_constraints;
}, /unknown or stale/);

rejects("a registry update invalidates only mismatching references", ({ manifest }) => {
  manifest.technical_constraints[0].revision = "2";
}, /unknown or stale.*kb:C1@1/);

rejects("technical trace cannot be omitted", ({ tickets }) => {
  tickets["T1.md"] = tickets["T1.md"].replace("## Technical trace", "## Notes");
}, /Technical trace.*kb:C1@1/);

test("updated definitions and references pass after a registry revision", () => {
  const value = fixture();
  value.manifest.technical_constraints[0].revision = "2";
  for (const name of ["T1.md", "T2.md"]) value.tickets[name] = value.tickets[name].replaceAll("kb:C1@1", "kb:C1@2");
  assert.equal(run(value).status, 0);
});

test("tracker IDs can change without changing scenario-based applicability", () => {
  const value = fixture();
  for (const name of Object.keys(value.tickets)) value.tickets[name] = value.tickets[name].replace(/^Ticket: T(\d)$/m, "Ticket: #10$1");
  assert.equal(run(value).status, 0);
});
