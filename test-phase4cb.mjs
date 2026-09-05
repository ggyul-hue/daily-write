import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const migration = readFileSync("supabase-phase4cb-personality-foundation.sql", "utf8");
const schema = readFileSync("supabase-schema.sql", "utf8");
const traits = ["walker", "sleepy", "collector", "reader"];

function traitForSeed(seed) {
  return traits[createHash("md5").update(`${seed}primary-trait:v1`).digest()[0] % traits.length];
}

for (const sql of [migration, schema]) {
  assert.match(sql, /coalesce\(btrim\(pet_row\.growth_seed\), ''\) = ''/);
  assert.match(sql, /set growth_seed = encode\(gen_random_bytes\(16\), 'hex'\)/);
  assert.match(sql, /pet_row\.growth_points >= 3 and pet_row\.traits ->> 'primary' is null/);
  assert.match(sql, /md5\(pet_row\.growth_seed \|\| 'primary-trait:v1'\)/);
  assert.match(sql, /when 0 then 'walker'/);
  assert.match(sql, /when 1 then 'sleepy'/);
  assert.match(sql, /when 2 then 'collector'/);
  assert.match(sql, /else 'reader'/);
  assert.match(sql, /'assigned_at_points', pet_row\.growth_points/);
  assert.match(sql, /set growth_stage = next_stage,\s+traits = traits_json/);
  assert.match(sql, /'already_consumed'/);
}

for (const seed of ["alpha", "cream-001", "pet-seed-4", "same-seed"]) {
  assert.equal(traitForSeed(seed), traitForSeed(seed));
  assert.ok(traits.includes(traitForSeed(seed)));
}
assert.ok(new Set(["alpha", "bravo", "charlie", "delta", "echo", "foxtrot"].map(traitForSeed)).size >= 2);
console.log("phase 4C-B personality checks passed");
