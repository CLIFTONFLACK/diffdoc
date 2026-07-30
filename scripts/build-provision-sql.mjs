/**
 * Concatenate supabase/migrations/*.sql into one transactional script that can
 * be pasted into the Supabase SQL Editor to provision a fresh project.
 *
 *   node scripts/build-provision-sql.mjs
 *   -> supabase/provision-fresh.sql
 *
 * Generated rather than hand-written so it cannot drift from the migrations,
 * which stay the source of truth. Wrapped in BEGIN/COMMIT so a partial failure
 * rolls back instead of leaving the schema half-applied — which matters most on
 * the re-run, where `create type` throws and would otherwise abandon the rest.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const DIR = "supabase/migrations";
const OUT = "supabase/provision-fresh.sql";

const files = readdirSync(DIR)
  .filter((f) => f.endsWith(".sql"))
  .sort(); // 0001_, 0002_, … so lexical order is apply order

if (!files.length) {
  console.error(`No .sql files in ${DIR}`);
  process.exit(1);
}

const header = `-- DiffDoc — provision a FRESH Supabase project.
--
-- GENERATED FILE — do not edit. Produced by scripts/build-provision-sql.mjs
-- from ${DIR}/, which remains the source of truth. Regenerate after adding a
-- migration.
--
-- Paste the whole file into the Supabase SQL Editor and run it once. It creates
-- the 8 core tables, their enums and indexes, enables RLS on all of them, and
-- creates the private "documents" storage bucket.
--
-- It runs in a single transaction: if anything fails, nothing is applied. Note
-- that a *second* run is expected to fail on the enum creation — that means the
-- schema is already there, and the rollback leaves it untouched.
--
-- If the SQL Editor rejects the explicit transaction control, delete the lone
-- "begin;" below and the "commit;" at the very end and run it again — you then
-- lose all-or-nothing, so on a failure check what got applied before retrying.
--
-- Applies, in order: ${files.join(", ")}

begin;
`;

const body = files
  .map((f) => {
    const sql = readFileSync(join(DIR, f), "utf8").trimEnd();
    return `\n-- ─── ${f} ${"─".repeat(Math.max(0, 66 - f.length))}\n\n${sql}\n`;
  })
  .join("");

writeFileSync(OUT, `${header}${body}\ncommit;\n`, "utf8");
console.log(`wrote ${OUT} from ${files.length} migration(s): ${files.join(", ")}`);
