import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const schema = readFileSync("supabase-schema.sql", "utf8");
const migration = readFileSync("supabase-phase4a.sql", "utf8");
const app = readFileSync("app.js", "utf8");
const index = readFileSync("index.html", "utf8");
const styles = readFileSync("styles.css", "utf8");

assert.match(schema, /unique \(user_id, date\)/);
assert.match(schema, /claim_daily_fragment\(p_date date, p_source text\)/);
assert.match(schema, /grant execute on function public\.claim_daily_fragment\(date, text\) to authenticated/);
assert.match(migration, /fragment_events_user_date_key unique \(user_id, date\)/);
assert.match(migration, /revoke insert, update, delete on table public\.fragment_events from authenticated/);
assert.match(app, /button\.textContent = `\$\{animalName\(\)\}에게 주기`/);
assert.match(app, /async function recoverTodaySoloFragment/);
assert.match(app, /claimDailyFragment\(\{ date: day, source: "solo" \}\)/);
assert.match(app, /recovery-pending/);
assert.match(app, /fragment\.consumed_at\)\) return null/);
assert.match(app, /animalSubjectName\(\)\} 오늘의 이야기를 품고 있어요/);
assert.match(app, /fragmentState\.claimed\.find\(\(entry\) => entry\.date === day && !entry\.consumed_at\)/);
assert.match(styles, /\.fragment-cta\.is-hidden \{ display:none; \}/);
assert.match(index, /id="fragment-detail"/);
assert.doesNotMatch(index, /친구에게 건넬 수 있어요/);
console.log("phase 4A schema checks passed");
