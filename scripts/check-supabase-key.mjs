/**
 * Tell me whether a Supabase key belongs to the project we expect — without
 * printing the key.
 *
 *   node scripts/check-supabase-key.mjs
 *
 * Reads .env.local, decodes each key's JWT payload locally (no network, and the
 * signature is never needed for this), and reports only the `ref` and `role`
 * claims plus a live reachability probe. Safe to paste the output anywhere.
 *
 * Legacy Supabase keys are JWTs of the form header.payload.signature, where the
 * payload carries { ref, role }. A key issued for a different project has a
 * different `ref` and the gateway rejects it with "Invalid API key" — which is
 * indistinguishable, from the outside, from a malformed key. Hence this script.
 */
import { readFileSync } from "node:fs";

// DiffDoc's database. It lives in Supabase org qcjmbwaqgfijmxpsjjpb — NOT in
// "SLA Team", which is a different org holding unrelated projects. Override with
// argv[2] if that ever changes.
const EXPECTED_REF = process.argv[2] ?? "pjcbkqbxajtykwfgawli";

function parseEnv(path) {
  const out = {};
  let raw;
  try {
    raw = readFileSync(path, "utf8");
  } catch {
    console.error(`Couldn't read ${path}`);
    process.exit(1);
  }
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/);
    if (m) out[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
  }
  return out;
}

/** Catch an unsubstituted placeholder instead of reporting it as a bad key. */
const PLACEHOLDER =
  /^(<.*>|PASTE.*|paste.*|YOUR.*|your[-_ ].*|xxx+|\.\.\.|TODO|CHANGEME)$/i;

/** Decode a JWT payload without verifying it — we only want the claims. */
function claims(key) {
  const parts = key.split(".");
  if (parts.length !== 3) return null;
  try {
    const pad = parts[1] + "=".repeat((-parts[1].length % 4 + 4) % 4);
    return JSON.parse(Buffer.from(pad, "base64url").toString("utf8"));
  } catch {
    return null;
  }
}

function describe(name, value) {
  if (!value) return { name, verdict: "MISSING" };
  if (PLACEHOLDER.test(value)) {
    return {
      name,
      verdict: `PLACEHOLDER NOT REPLACED ("${value}") — nothing was tested`,
    };
  }
  if (value.startsWith("sb_publishable_") || value.startsWith("sb_secret_")) {
    // New-style keys carry no readable claims; they can only be probed.
    return { name, format: "new-style", ref: "(not encoded in key)", role: "—" };
  }
  const c = claims(value);
  if (!c) return { name, verdict: "NOT A VALID JWT — probably truncated on paste" };
  return {
    name,
    format: "legacy JWT",
    ref: c.ref,
    role: c.role,
    refOk: c.ref === EXPECTED_REF,
    expired: typeof c.exp === "number" && c.exp * 1000 < Date.now(),
  };
}

// Anything already exported wins over .env.local, so a candidate value can be
// tested without writing it to disk first:
//   SUPABASE_SERVICE_ROLE_KEY='<paste>' node scripts/check-supabase-key.mjs
const fileEnv = parseEnv(".env.local");
const env = {};
for (const k of [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
]) {
  env[k] = process.env[k] || fileEnv[k];
  if (env[k] !== fileEnv[k] && process.env[k]) {
    console.log(`(${k} taken from the environment, not .env.local)`);
  }
  // A trailing newline or stray space survives a dashboard paste and reads as
  // "Invalid API key" with no other symptom. Flag it rather than trimming it
  // silently, because the copy in Vercel needs fixing too.
  if (env[k] && env[k] !== env[k].trim()) {
    console.log(`! ${k} has leading/trailing whitespace — that alone breaks it`);
    env[k] = env[k].trim();
  }
}
const url = env.NEXT_PUBLIC_SUPABASE_URL ?? "(unset)";
const urlRef = url.match(/https:\/\/([a-z0-9]+)\.supabase\.co/)?.[1];

console.log(`expecting project ref : ${EXPECTED_REF}`);
console.log(`NEXT_PUBLIC_SUPABASE_URL -> ${url}  ${urlRef === EXPECTED_REF ? "OK" : "MISMATCH"}`);
console.log("");

const rows = [
  describe("NEXT_PUBLIC_SUPABASE_ANON_KEY", env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  describe("SUPABASE_SERVICE_ROLE_KEY", env.SUPABASE_SERVICE_ROLE_KEY),
];
for (const r of rows) {
  const bits = [
    r.verdict ?? r.format,
    r.ref ? `ref=${r.ref}` : null,
    r.role ? `role=${r.role}` : null,
    r.refOk === false ? "<-- WRONG PROJECT" : null,
    r.expired ? "<-- EXPIRED" : null,
  ].filter(Boolean);
  console.log(`${r.name.padEnd(31)} ${bits.join("  ")}`);
}

// Expected roles, so a key pasted into the wrong slot is obvious.
const anon = rows[0], svc = rows[1];
if (anon.role && anon.role !== "anon") console.log(`\n! ANON slot holds a '${anon.role}' key`);
if (svc.role && svc.role !== "service_role") console.log(`\n! SERVICE slot holds a '${svc.role}' key`);

// Live probe with whatever the service slot holds.
if (env.SUPABASE_SERVICE_ROLE_KEY && urlRef) {
  const res = await fetch(`${url}/rest/v1/comparisons?select=id&limit=1`, {
    headers: {
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
    },
  }).catch((e) => ({ ok: false, status: 0, statusText: e.message }));
  console.log(
    `\nlive probe with SERVICE key -> ${res.status} ${res.ok ? "OK" : res.statusText ?? ""}`,
  );
  if (!res.ok && res.status) console.log(`  body: ${(await res.text?.())?.slice(0, 160) ?? ""}`);
}
