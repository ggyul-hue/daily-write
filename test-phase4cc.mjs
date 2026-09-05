import assert from "node:assert/strict";
import { createRuntimePetState, effectiveGrowthScale, primaryTraitFrom, runtimeBehaviorWeights } from "./pet-runtime.js";
import { readFileSync } from "node:fs";

const base = { idle: 2, "walk-a": 2, "walk-b": 2, sleep: 1, sit: 2, read: 1, carry: 2 };

assert.deepEqual(runtimeBehaviorWeights(base, null), base);
assert.deepEqual(runtimeBehaviorWeights(base, "unknown"), base);
assert.equal(runtimeBehaviorWeights(base, "walker")["walk-a"], 2.6);
assert.equal(runtimeBehaviorWeights(base, "walker")["walk-b"], 2.6);
assert.equal(runtimeBehaviorWeights(base, "sleepy").sleep, 1.3);
assert.equal(runtimeBehaviorWeights(base, "sleepy").sit, 2.3);
assert.equal(runtimeBehaviorWeights(base, "collector").carry, 2.8);
assert.equal(runtimeBehaviorWeights(base, "reader").read, 1.4);
assert.deepEqual(base, { idle: 2, "walk-a": 2, "walk-b": 2, sleep: 1, sit: 2, read: 1, carry: 2 });

assert.equal(primaryTraitFrom([]), null);
assert.equal(primaryTraitFrom(null), null);
assert.equal(primaryTraitFrom({ primary: "unknown" }), null);
assert.equal(primaryTraitFrom({ primary: "collector" }), "collector");

assert.equal(effectiveGrowthScale(createRuntimePetState("none")), 1);
assert.equal(effectiveGrowthScale(createRuntimePetState("baby", { growth_stage: "BABY", growth_scale: 1 })), 0.96);
assert.equal(effectiveGrowthScale(createRuntimePetState("small", { growth_stage: "SMALL", growth_scale: 1 })), 1);
assert.equal(effectiveGrowthScale(createRuntimePetState("growing", { growth_stage: "GROWING", growth_scale: 1 })), 1.04);
assert.equal(effectiveGrowthScale(createRuntimePetState("grown", { growth_stage: "GROWN", growth_scale: 1 })), 1.08);
assert.equal(effectiveGrowthScale(createRuntimePetState("small-custom", { growth_stage: "SMALL", growth_scale: 1.02 })), 1.02);
assert.equal(effectiveGrowthScale(createRuntimePetState("grown-invalid", { growth_stage: "GROWN", growth_scale: -1 })), 1.08);

const app = readFileSync("app.js", "utf8");
const backend = readFileSync("room-backend.js", "utf8");
const petRead = backend.slice(backend.indexOf("async getPetStateFromExistingSession"), backend.indexOf("async ensureActivePet"));
assert.match(app, /loadId !== runtimePetLoadId \|\| runtimePetIdentity\(\) !== identity/);
assert.match(app, /runtimePetState = createRuntimePetState\(identity\);/);
assert.match(petRead, /auth\.getSession\(\)/);
assert.doesNotMatch(petRead, /signInAnonymously/);
console.log("phase 4C-C runtime checks passed");
