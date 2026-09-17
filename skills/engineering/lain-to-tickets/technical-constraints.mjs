// Optional, additive schema-v1 checks. This validates trace structure, not architecture quality.
const nonempty = (value) => typeof value === "string" && value.trim().length > 0;
const singleLine = (value) => nonempty(value) && value === value.trim() && !/[\r\n]/.test(value);
const scopedId = /^[A-Za-z0-9][A-Za-z0-9._/-]*:[A-Za-z0-9][A-Za-z0-9._:/-]*$/;
const revisionId = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;

function section(body, heading) {
  const lines = body.split(/\r?\n/);
  const start = lines.findIndex((line) => line.trim() === `## ${heading}`);
  if (start === -1) return "";
  const end = lines.findIndex((line, index) => index > start && /^## /.test(line));
  return lines.slice(start + 1, end === -1 ? undefined : end).join("\n");
}

function references(body, name, location, errors) {
  const matches = [...body.matchAll(new RegExp(`^${name}:[ \\t]*(.*)$`, "gm"))];
  if (matches.length > 1) errors.push(`${location}: duplicate ${name} field`);
  if (matches.length === 0) return [];
  const raw = matches[0][1].trim();
  if (!raw) {
    errors.push(`${location}: empty ${name} field; omit an unused field`);
    return [];
  }
  if (raw === "None") return [];
  const refs = raw.split(",").map((value) => value.trim());
  if (refs.some((value) => !value)) errors.push(`${location}: empty ${name} reference`);
  if (new Set(refs).size !== refs.length) errors.push(`${location}: duplicate ${name} reference`);
  return refs;
}

/**
 * Check optional technical_constraints against ticket ownership and exact references.
 * Call after validating schema_version and delivery_ids. No source is fetched here:
 * staleness is relative to the supplied authoritative manifest, not a live repository.
 * @param {{delivery_ids: {id: string}[], technical_constraints?: unknown}} manifest
 * @param {{id?: string, owns: string[], relative: string, body: string}[]} tickets
 * @returns {string[]}
 */
export function validateTechnicalConstraints(manifest, tickets) {
  const errors = [];
  const deliveryIds = new Set(manifest.delivery_ids.map((item) => item.id));
  const supplied = manifest.technical_constraints;
  const constraints = supplied === undefined ? [] : supplied;
  if (!Array.isArray(constraints)) return ["technical_constraints must be an array when present"];

  const seen = new Set();
  const registry = new Map();
  for (const [index, constraint] of constraints.entries()) {
    const location = `technical constraint ${index + 1}`;
    if (!constraint || typeof constraint !== "object" || Array.isArray(constraint)) {
      errors.push(`${location} must be an object`);
      continue;
    }
    const before = errors.length;
    for (const key of ["id", "revision", "definition", "source", "verified_by"]) {
      if (!singleLine(constraint[key])) errors.push(`${location}: ${key} must be a non-empty trimmed single-line string`);
    }
    if (typeof constraint.id !== "string" || !scopedId.test(constraint.id)) {
      errors.push(`${location}: id must be namespaced, for example kb:C1`);
    }
    if (typeof constraint.revision !== "string" || !revisionId.test(constraint.revision)) {
      errors.push(`${location}: revision must be a reference-safe string, for example 1`);
    }
    if (seen.has(constraint.id)) errors.push(`${location}: duplicate technical constraint ID ${constraint.id}`);
    seen.add(constraint.id);

    const affected = constraint.applies_to;
    if (!Array.isArray(affected) || affected.length === 0) {
      errors.push(`${location}: applies_to must contain affected delivery IDs`);
    } else {
      if (new Set(affected).size !== affected.length) errors.push(`${location}: duplicate IDs in applies_to`);
      for (const id of affected) {
        if (!deliveryIds.has(id)) errors.push(`${location}: unknown delivery ID ${String(id)} in applies_to`);
      }
    }
    if (!deliveryIds.has(constraint.verified_by)) errors.push(`${location}: verified_by must name a delivery ID`);
    if (Array.isArray(affected) && !affected.includes(constraint.verified_by)) {
      errors.push(`${location}: verified_by must be included in applies_to`);
    }
    if (before === errors.length) registry.set(`${constraint.id}@${constraint.revision}`, constraint);
  }

  for (const ticket of tickets) {
    const applies = references(ticket.body, "Applies", ticket.relative, errors);
    const verifies = references(ticket.body, "Verifies", ticket.relative, errors);
    const expectedApplies = new Set();
    const expectedVerifies = new Set();
    for (const [ref, constraint] of registry) {
      if (constraint.applies_to.some((id) => ticket.owns.includes(id))) expectedApplies.add(ref);
      if (ticket.owns.includes(constraint.verified_by)) expectedVerifies.add(ref);
    }
    for (const [name, actual, expected] of [
      ["Applies", applies, expectedApplies],
      ["Verifies", verifies, expectedVerifies],
    ]) {
      for (const ref of actual) {
        if (!registry.has(ref)) errors.push(`${ticket.relative}: unknown or stale ${name} reference ${ref}`);
        else if (!expected.has(ref)) errors.push(`${ticket.relative}: unexpected ${name} reference ${ref}`);
      }
      for (const ref of expected) {
        if (!actual.includes(ref)) errors.push(`${ticket.relative}: missing ${name} reference ${ref}`);
      }
    }
    const trace = section(ticket.body, "Technical trace").split(/\r?\n/).map((line) => line.trim());
    const pointers = section(ticket.body, "Context pointers");
    for (const ref of expectedApplies) {
      const constraint = registry.get(ref);
      if (!trace.includes(`- ${ref}: ${constraint.definition}`)) {
        errors.push(`${ticket.relative}: Technical trace must carry the exact definition for ${ref}`);
      }
      if (!pointers.includes(constraint.source)) {
        errors.push(`${ticket.relative}: Context pointers must include the source for ${ref}: ${constraint.source}`);
      }
    }
  }
  return errors;
}
