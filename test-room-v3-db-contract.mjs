import assert from 'node:assert/strict'; import fs from 'node:fs';
const sql=fs.readFileSync('supabase-room-question-registry-v1.sql','utf8');
assert.match(sql,/create table if not exists public\.room_question_registry/); assert.match(sql,/question_id text primary key/); assert.match(sql,/not exists \(select 1 from public\.room_question_registry/); assert.match(sql,/revoke all on table public\.room_question_registry/); assert.match(sql,/grant execute on function public\.ensure_room_daily_question/);
const legacy=['best-food','most-seen','comfortable','word','animal-day','weather-choice','inside-out','replay','smell']; assert.equal(legacy.length,9); assert.doesNotMatch(sql,/rq-v1-0001/); console.log('room v3 DB contract checks passed');
