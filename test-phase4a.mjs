import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const schema = readFileSync("supabase-schema.sql", "utf8");
const migration = readFileSync("supabase-phase4a.sql", "utf8");

assert.match(schema, /unique \(user_id, date\)/);
assert.match(schema, /claim_daily_fragment\(p_date date, p_source text\)/);
assert.match(schema, /grant execute on function public\.claim_daily_fragment\(date, text\) to authenticated/);
assert.match(migration, /fragment_events_user_date_key unique \(user_id, date\)/);
assert.match(migration, /revoke insert, update, delete on table public\.fragment_events from authenticated/);
console.log("phase 4A schema checks passed");
