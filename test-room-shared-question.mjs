import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const app = readFileSync("app.js", "utf8");
const schema = readFileSync("supabase-schema.sql", "utf8");
const migration = readFileSync("supabase-room-shared-question-v1.sql", "utf8");
const data = readFileSync("data.js", "utf8");
const ids = ["best-food", "most-seen", "comfortable", "word", "animal-day", "weather-choice", "inside-out", "replay", "smell"];

assert.match(app, /function roomQuestionCandidate\(day\)/);
assert.doesNotMatch(app, /roomQuestionCandidate\(room\.id, day\)/);
for (const id of ids) {
  assert.match(migration, new RegExp(`'${id}'`));
  assert.match(schema, new RegExp(`'${id}'`));
}
assert.match(migration, /shared_room_question_id\(p_date date\)/);
assert.match(migration, /p_date >= date '2026-09-08'/);
assert.match(migration, /on conflict \(room_id, date\) do nothing/);
assert.match(migration, /md5\(p_date::text \|\| ':room-shared-question:v1'\)/);
assert.match(migration, /security definer set search_path = public/);
assert.match(migration, /revoke all on function public\.ensure_room_daily_question\(uuid, date, text\) from public, anon/);
assert.match(readFileSync("index.html", "utf8"), /오늘의 함께 질문/);
const roomChoiceObjects = [...data.matchAll(/roomChoices:\s*\[([^\]]+)\]/g)];
assert.equal(roomChoiceObjects.length, 9);
roomChoiceObjects.forEach((match) => assert.equal((match[1].match(/"[^"]*"/g) || []).length, 3));
assert.match(readFileSync("app.js", "utf8"), /custom\.maxLength = 30/);
assert.match(readFileSync("app.js", "utf8"), /selected === "custom"/);
console.log("room shared question v1 static checks passed");
