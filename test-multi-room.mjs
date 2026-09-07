import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const app = readFileSync("app.js", "utf8");
const sql = readFileSync("supabase-multi-room-v1.sql", "utf8");
const html = readFileSync("index.html", "utf8");

assert.doesNotMatch(app, /activeRooms\[0\]/);
assert.match(app, /let activeRoomId = null/);
assert.match(app, /activeRooms\.find\(\(item\) => item\.id === roomId\)/);
assert.match(app, /Promise\.all\(activeRooms\.map/);
assert.match(app, /activeRooms\.length >= 10/);
assert.match(app, /ROOM_FULL/);
assert.match(app, /ROOM_LIMIT_REACHED/);
assert.match(html, /id="room-list" class="room-list"/);
assert.match(html, /id="room-shared-question-text"/);
assert.match(html, /오늘의 함께 질문/);
assert.match(sql, /perform 1 from public\.users where id = auth\.uid\(\) for update/);
assert.match(sql, /member_count >= 5/);
assert.match(sql, /ROOM_FULL/);
assert.match(sql, /count\(\*\) from public\.room_members where user_id = auth\.uid\(\)/);
assert.match(sql, /ROOM_LIMIT_REACHED/);
assert.match(sql, /if exists \(select 1 from public\.room_members where room_id = room_row\.id and user_id = auth\.uid\(\)\) then return room_row/);
assert.doesNotMatch(sql, /alter table|create table|update public\.room_answers|delete from/i);
console.log("multi-room v1 static checks passed");
