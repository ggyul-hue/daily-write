import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const migration = readFileSync("supabase-phase4c-growth-foundation.sql", "utf8");
const schema = readFileSync("supabase-schema.sql", "utf8");
const app = readFileSync("app.js", "utf8");

function expectedGrowthResult(points) {
  const stage = points >= 14 ? "GROWN" : points >= 7 ? "GROWING" : points >= 3 ? "SMALL" : "BABY";
  const milestone = [3, 7, 14, 30].includes(points) ? points : null;
  return { stage, milestone, stageChanged: [3, 7, 14].includes(points) };
}

for (const sql of [migration, schema]) {
  assert.match(sql, /returns table \(status text, fragment_id uuid, pet_id uuid, growth_points integer, consumed_at timestamptz\)/);
  assert.match(sql, /when pet_row\.growth_points >= 14 then 'GROWN'/);
  assert.match(sql, /when pet_row\.growth_points >= 7 then 'GROWING'/);
  assert.match(sql, /when pet_row\.growth_points >= 3 then 'SMALL'/);
  assert.match(sql, /when 3 then 3/);
  assert.match(sql, /when 7 then 7/);
  assert.match(sql, /when 14 then 14/);
  assert.match(sql, /when 30 then 30/);
  assert.match(sql, /'stage_changed', milestone_value in \(3, 7, 14\)/);
  assert.match(sql, /growth_result = result_json/);
  assert.match(sql, /for update/);
  assert.match(sql, /'already_consumed'/);
}
assert.match(app, /getFragmentEvent\(fragment\.id\)/);
assert.match(app, /startFragmentReaction\(growthResult\)/);
assert.deepEqual(expectedGrowthResult(3), { stage: "SMALL", milestone: 3, stageChanged: true });
assert.deepEqual(expectedGrowthResult(4), { stage: "SMALL", milestone: null, stageChanged: false });
assert.deepEqual(expectedGrowthResult(7), { stage: "GROWING", milestone: 7, stageChanged: true });
assert.deepEqual(expectedGrowthResult(14), { stage: "GROWN", milestone: 14, stageChanged: true });
assert.deepEqual(expectedGrowthResult(30), { stage: "GROWN", milestone: 30, stageChanged: false });
assert.deepEqual(expectedGrowthResult(31), { stage: "GROWN", milestone: null, stageChanged: false });
console.log("phase 4C growth foundation checks passed");
