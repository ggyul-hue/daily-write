import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const schema = readFileSync("supabase-schema.sql", "utf8");
const migration = readFileSync("supabase-phase4b.sql", "utf8");
const app = readFileSync("app.js", "utf8");

assert.match(schema, /unique \(user_id, species, variant\)/);
assert.match(migration, /add constraint pets_user_species_variant_key unique \(user_id, species, variant\)/);
assert.match(schema, /ensure_active_pet\(p_species text, p_variant text\)/);
assert.match(schema, /consume_daily_fragment\(p_fragment_id uuid, p_pet_id uuid\)/);
assert.match(schema, /for update/);
assert.match(schema, /'already_consumed'/);
assert.match(migration, /revoke insert, update, delete on table public\.pets from authenticated/);
assert.match(migration, /grant execute on function public\.consume_daily_fragment\(uuid, uuid\) to authenticated/);
assert.match(app, /consumeTodayFragment/);
console.log("phase 4B schema checks passed");
