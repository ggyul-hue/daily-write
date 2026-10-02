import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { questionBank } from "./question-bank.js";
import { growthMap } from "./question-growth-map-runtime-v1.js";
import { selectorPolicy } from "./daily-selector-policy-v1.js";
import {
  calendarDayDistance,
  createDailySelector,
  growthCategoryPenalty,
  isPairCooldownBlocked,
  isQuestionCooldownActive,
  pairAdjacency,
  runtimeSchedule,
} from "./daily-selector-runtime-v1.js";
import { resolveDailyQuestionSet } from "./daily-selector-lifecycle-v1.js";
import { DAILY_SELECTOR_C3_ACTIVATION_DATE, DAILY_SELECTOR_C3_POLICY_VERSION, DAILY_SELECTOR_C3_SEED } from "./daily-selector-lifecycle-config-v1.js";
import { getDailySelectorRuntimeConfig } from "./daily-selector-lifecycle-v1.js";

const lockedPolicy = JSON.parse(readFileSync("daily-selector-policy-followup-v1.json", "utf8"));
const sampleQA = JSON.parse(readFileSync("daily-selector-sample-qa-v1.json", "utf8"));
const sourceSidecar = JSON.parse(readFileSync("question-growth-map-v1.1.json", "utf8"));
const validatorOutput = JSON.parse(execFileSync(process.execPath, ["question-validator.mjs"], { encoding: "utf8" }));
const slots = ["light", "scene", "reflect"];
const pools = Object.fromEntries(["GROWTH", "MEMORY"].flatMap((role) => slots.map((slot) => [
  `${role}:${slot}`,
  questionBank.filter((question) => question.dailySlot === slot && growthMap[question.id]?.role === role),
])));
const pairAdjacencyOracle = new Map();
const addEdge = (a, b) => {
  if (!pairAdjacencyOracle.has(a)) pairAdjacencyOracle.set(a, []);
  pairAdjacencyOracle.get(a).push(b);
};
for (const [a, b] of selectorPolicy.validatorNearDuplicatePairs) { addEdge(a, b); addEdge(b, a); }
for (const pair of selectorPolicy.manuallyApprovedManualPairs) { addEdge(pair.a, pair.b); addEdge(pair.b, pair.a); }

function oracleRng(seed) {
  let state = seed >>> 0;
  return () => {
    state += 0x6D2B79F5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function oracleShuffle(items, random) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
function oracleSchedule(days, seed) {
  const random = oracleRng(seed);
  const used = new Map();
  const priorSelected = new Map();
  const growthSlotCounts = Object.fromEntries(slots.map((slot) => [slot, 0]));
  const prevSlotCategory = Object.fromEntries(slots.map((slot) => [slot, null]));
  const growthHistory = [];
  const schedule = [];
  let prevGrowthSeed = null;
  let fallbackCount = 0;
  let candidateExhaustions = 0;
  let hardFailures = 0;
  let reuseViolations = 0;
  for (let day = 0; day < days; day++) {
    const least = Math.min(...slots.map((slot) => growthSlotCounts[slot]));
    const growthChoices = slots.filter((slot) => growthSlotCounts[slot] === least);
    const growthSlot = growthChoices[Math.floor(random() * growthChoices.length)];
    growthSlotCounts[growthSlot]++;
    const roleFor = Object.fromEntries(slots.map((slot) => [slot, slot === growthSlot ? "GROWTH" : "MEMORY"]));
    const selected = {};
    const todayCategories = new Set();
    const order = oracleShuffle(slots, random);
    for (const slot of order) {
      const role = roleFor[slot];
      const baseEligible = [];
      for (const question of pools[`${role}:${slot}`]) {
        const last = used.get(question.id);
        if (last === undefined || day - last > 365) baseEligible.push(question);
      }
      let eligible = baseEligible;
      const pairEligible = eligible.filter((question) => !(pairAdjacencyOracle.get(question.id) ?? []).some((otherId) => {
        const last = priorSelected.get(otherId);
        return (last !== undefined && day - last <= 6)
          || Object.values(selected).some((sameDay) => sameDay.id === otherId);
      }));
      if (pairEligible.length) eligible = pairEligible;
      else fallbackCount++;
      if (!eligible.length) { candidateExhaustions++; hardFailures++; throw new Error(`reference exhaustion at ${day}:${role}:${slot}`); }
      let candidates = eligible;
      if (candidates.some((question) => !todayCategories.has(question.category))) candidates = candidates.filter((question) => !todayCategories.has(question.category));
      if (prevSlotCategory[slot] !== null && candidates.some((question) => question.category !== prevSlotCategory[slot])) candidates = candidates.filter((question) => question.category !== prevSlotCategory[slot]);
      let chosen;
      if (role === "GROWTH" && prevGrowthSeed) {
        let best = Infinity;
        for (const question of candidates) {
          const meta = growthMap[question.id];
          let score = random() * 10 + (meta.seed === prevGrowthSeed ? 1 : 0);
          const history = growthHistory.slice(-5);
          for (let i = 0; i < history.length; i++) if (history[i].category === question.category) {
            const age = history.length - i;
            score += 0.5 * (5 - age + 1) / 5;
          }
          if (score < best) { chosen = question; best = score; }
        }
      } else chosen = candidates[Math.floor(random() * candidates.length)];
      if (!chosen) { candidateExhaustions++; hardFailures++; throw new Error(`reference no candidate at ${day}:${role}:${slot}`); }
      const meta = growthMap[chosen.id];
      selected[slot] = { ...chosen, role, seed: meta.seed };
      const last = used.get(chosen.id);
      if (last !== undefined && day - last <= 365) reuseViolations++;
      used.set(chosen.id, day);
      priorSelected.set(chosen.id, day);
      todayCategories.add(chosen.category);
      if (role === "GROWTH") {
        growthHistory.push({ day, category: chosen.category, seed: meta.seed, id: chosen.id });
        prevGrowthSeed = meta.seed;
      }
    }
    for (const slot of slots) prevSlotCategory[slot] = selected[slot].category;
    if (Object.values(selected).length !== 3
      || Object.values(selected).filter((question) => question.role === "GROWTH").length !== 1
      || Object.values(selected).filter((question) => question.role === "MEMORY").length !== 2
      || new Set(Object.values(selected).map((question) => question.id)).size !== 3
      || new Set(Object.values(selected).map((question) => question.category)).size !== 3) hardFailures++;
    schedule.push({ day: day + 1, growthSlot, questions: selected });
  }
  return { schedule, growthHistory, fallbackCount, candidateExhaustions, hardFailures, reuseViolations };
}

function hashSeed(run, policy, horizon) {
  return (0xD4117 + run * 7919 + policy.charCodeAt(0) * 104729 + horizon * 31) >>> 0;
}
function scheduleFingerprint(schedule) {
  const rows = [];
  for (const day of schedule) for (const slot of slots) {
    const question = day.questions[slot];
    rows.push(`${day.day}|${slot}|${question.role}|${question.id}|${question.category}|${question.seed ?? ""}`);
  }
  return rows.join("\n");
}
function compareSchedules(actual, expected) {
  assert.equal(actual.length, expected.length);
  let comparisons = 0;
  for (let day = 0; day < expected.length; day++) for (const slot of slots) {
    const a = actual[day].questions[slot];
    const e = expected[day].questions[slot];
    assert.ok(a && e, `missing question day ${day + 1} ${slot}`);
    assert.equal(a.id, e.id, `question ID mismatch day ${day + 1} ${slot}`);
    assert.equal(a.role, e.role, `role mismatch day ${day + 1} ${slot}`);
    assert.equal(a.category, e.category, `category mismatch day ${day + 1} ${slot}`);
    assert.equal(a.seed, e.seed, `Growth Seed mismatch day ${day + 1} ${slot}`);
    comparisons++;
  }
  return comparisons;
}

assert.equal(lockedPolicy.verdict, "DAILY_SELECTOR_POLICY_FOLLOWUP_V1_PASS");
assert.equal(lockedPolicy.selection.chosenPolicy, selectorPolicy.id);
assert.equal(questionBank.length, 1500);
assert.deepEqual(growthMap, sourceSidecar.questions, "runtime metadata is an exact projection of the locked sidecar");
assert.equal(selectorPolicy.validatorNearDuplicatePairs.length, 50);
const validatorPairs = validatorOutput.warnings.map((warning) => warning.message.match(/^near-duplicate candidate: (\S+) \/ (\S+)$/)).filter(Boolean).map((match) => [match[1], match[2]]);
assert.deepEqual(selectorPolicy.validatorNearDuplicatePairs, validatorPairs, "selector graph retains the validator's 50 source edges verbatim");
assert.equal([...pairAdjacency.values()].reduce((sum, edges) => sum + edges.length, 0), 102, "51 edges should create 102 directed adjacency entries");
assert.deepEqual(pairAdjacency.get("dq-v1-0843")?.find((edge) => edge.b === "dq-v1-1049"), {
  a: "dq-v1-0843", b: "dq-v1-1049", source: "SAMPLE_QA_MANUAL",
});
assert.deepEqual(pairAdjacency.get("dq-v1-1049")?.find((edge) => edge.b === "dq-v1-0843"), {
  a: "dq-v1-1049", b: "dq-v1-0843", source: "SAMPLE_QA_MANUAL",
});
const validatorPair = selectorPolicy.validatorNearDuplicatePairs[0];
assert.ok(pairAdjacency.get(validatorPair[0])?.some((edge) => edge.b === validatorPair[1]));
assert.ok(pairAdjacency.get(validatorPair[1])?.some((edge) => edge.b === validatorPair[0]));
assert.equal(isPairCooldownBlocked("dq-v1-0843", [{ id: "dq-v1-1049", day: 10 }], 10), true, "same-day cross-slot pair blocks");
for (let age = 0; age <= 6; age++) assert.equal(isPairCooldownBlocked("dq-v1-0843", [{ id: "dq-v1-1049", day: 20 - age }], 20), true, `age ${age} blocks`);
assert.equal(isPairCooldownBlocked("dq-v1-0843", [{ id: "dq-v1-1049", day: 13 }], 20), false, "date distance 7 is eligible");
assert.equal(isPairCooldownBlocked("dq-v1-0843", [{ id: "dq-v1-0001", day: 20 }], 20), false, "unrelated pair remains eligible");
assert.equal(calendarDayDistance("2026-03-07", "2026-03-13"), 6);
assert.equal(calendarDayDistance("2026-03-07", "2026-03-14"), 7, "UTC calendar dates avoid DST length changes");
assert.equal(isQuestionCooldownActive(10, 375), true, "question cooldown includes day distance 365");
assert.equal(isQuestionCooldownActive(10, 376), false, "question becomes eligible at distance 366");

for (let age = 1; age <= 5; age++) {
  const history = Array.from({ length: 5 }, (_, index) => ({ category: index === 5 - age ? "target" : "other" }));
  const expected = 0.5 * (5 - age + 1) / 5;
  assert.equal(growthCategoryPenalty(history, "target"), expected, `Growth category penalty for age ${age}`);
}
assert.equal(growthCategoryPenalty([{ category: "target" }, ...Array.from({ length: 5 }, () => ({ category: "other" }))], "target"), 0, "penalty window excludes older history");
assert.equal(growthCategoryPenalty([], "target"), 0);
assert.equal(growthMap["dq-v1-0843"].role, "MEMORY", "manual graph edge is independent of role");

const selector = createDailySelector();
const deterministicA = selector.selectSchedule(45, 913771).schedule;
const deterministicB = selector.selectSchedule(45, 913771).schedule;
assert.equal(scheduleFingerprint(deterministicA), scheduleFingerprint(deterministicB), "same seed and state is deterministic");
for (const day of deterministicA) {
  const questions = slots.map((slot) => day.questions[slot]);
  assert.equal(questions.filter((question) => question.role === "GROWTH").length, 1);
  assert.equal(questions.filter((question) => question.role === "MEMORY").length, 2);
  assert.equal(new Set(questions.map((question) => question.category)).size, 3, "same-day category uniqueness");
}
const runtimeDailyA = resolveDailyQuestionSet("2026-09-30", {}, { activationDate: "2026-09-30", seed: DAILY_SELECTOR_C3_SEED }).questionIds;
const runtimeDailyB = resolveDailyQuestionSet("2026-09-30", {}, { activationDate: "2026-09-30", seed: DAILY_SELECTOR_C3_SEED }).questionIds;
assert.deepEqual(runtimeDailyA, runtimeDailyB, "repeated runtime call preserves same-day set");
assert.equal(runtimeDailyA.length, 3);
assert.deepEqual(runtimeDailyA, slots.map((slot) => runtimeSchedule(1, DAILY_SELECTOR_C3_SEED).schedule[0].questions[slot].id));

const fixedSeeds = [13970662, 8340253, 7904708, 7920546, 8451119, sampleQA.baseline.representative365Seed];
let fixedComparisons = 0;
for (const seed of fixedSeeds) {
  const expected = oracleSchedule(365, seed);
  const actual = selector.selectSchedule(365, seed).schedule;
  fixedComparisons += compareSchedules(actual, expected.schedule);
  assert.equal(expected.fallbackCount, 0, `fixed seed ${seed} fallback`);
  assert.equal(expected.candidateExhaustions, 0, `fixed seed ${seed} exhaustion`);
  assert.equal(expected.reuseViolations, 0, `fixed seed ${seed} reuse`);
}

let fullComparisons = 0;
for (let run = 1; run <= 1000; run++) {
  const seed = hashSeed(run, "C", 365);
  const expected = oracleSchedule(365, seed);
  const actual = selector.selectSchedule(365, seed);
  fullComparisons += compareSchedules(actual.schedule, expected.schedule);
  assert.equal(actual.fallbackCount, 0, `run ${run} fallback`);
  assert.equal(actual.candidateExhaustions, 0, `run ${run} exhaustion`);
  assert.equal(actual.reuseViolations, 0, `run ${run} reuse`);
  assert.equal(actual.hardFailures, 0, `run ${run} hard failure`);
}

const stress = {};
for (const horizon of [730, 1095]) {
  let comparisons = 0;
  let fallbackCount = 0;
  let candidateExhaustions = 0;
  let reuseViolations = 0;
  let hardFailures = 0;
  for (let run = 1; run <= 30; run++) {
    const seed = hashSeed(run, "C", horizon);
    const expected = oracleSchedule(horizon, seed);
    const actual = selector.selectSchedule(horizon, seed);
    comparisons += compareSchedules(actual.schedule, expected.schedule);
    fallbackCount += actual.fallbackCount;
    candidateExhaustions += actual.candidateExhaustions;
    reuseViolations += actual.reuseViolations;
    hardFailures += actual.hardFailures;
  }
  stress[horizon] = { schedules: 30, comparisons, fallbackCount, candidateExhaustions, reuseViolations, hardFailures };
  assert.equal(fallbackCount, 0, `${horizon}-day fallback`);
  assert.equal(candidateExhaustions, 0, `${horizon}-day exhaustion`);
  assert.equal(reuseViolations, 0, `${horizon}-day reuse`);
  assert.equal(hardFailures, 0, `${horizon}-day hard failures`);
}

const run767 = selector.selectSchedule(365, 13970662).schedule;
const actualRun767 = run767.slice(280, 283).map((day) => ({
  day: day.day,
  questions: Object.fromEntries(slots.map((slot) => [slot, {
    id: day.questions[slot].id,
    role: day.questions[slot].role,
    category: day.questions[slot].category,
    seed: day.questions[slot].seed,
  }]))
}));
const lockedRun767 = lockedPolicy.results.targetedManualQA.segments.run767.day281to283.schedules[selectorPolicy.id].filter((day) => day.day >= 281 && day.day <= 283);
const lockedCompact = lockedRun767.map((day) => ({
  day: day.day,
  questions: Object.fromEntries(slots.map((slot) => [slot, {
    id: day.questions[slot].id,
    role: day.questions[slot].role,
    category: day.questions[slot].category,
    seed: day.questions[slot].seed,
  }]))
}));
assert.deepEqual(actualRun767, lockedCompact, "run 767 day 281-283 matches locked C3 fixture");
assert.ok(!["dq-v1-0803", "dq-v1-0843", "dq-v1-1049", "dq-v1-1188"].some((id) => actualRun767.some((day) => Object.values(day.questions).some((question) => question.id === id))));

const hash = (path) => createHash("sha256").update(readFileSync(path)).digest("hex");
const baselineHashes = {
  canonicalQuestionBank: hash("question-bank.js"),
  classificationSidecar: hash("question-growth-map-v1.1.json"),
  validatorSource: hash("question-validator.mjs"),
  simulationSource: hash("daily-selector-simulation-v1.mjs"),
  simulationBaseline: hash("daily-selector-simulation-v1.json"),
  sampleQASource: hash("daily-selector-sample-qa-v1.mjs"),
  sampleQABaseline: hash("daily-selector-sample-qa-v1.json"),
  policyFollowupSource: hash("daily-selector-policy-followup-v1.mjs"),
  policyFollowupBaseline: hash("daily-selector-policy-followup-v1.json"),
};
assert.equal(DAILY_SELECTOR_C3_POLICY_VERSION, "C3_V1");
assert.equal(DAILY_SELECTOR_C3_ACTIVATION_DATE, "2026-10-03", "confirmed October 2 deployment window");
assert.equal(getDailySelectorRuntimeConfig().activationDate, DAILY_SELECTOR_C3_ACTIVATION_DATE);
assert.equal(DAILY_SELECTOR_C3_SEED, 7904708, "production seed is frozen, not QA-derived at runtime");

console.log(JSON.stringify({
  verdict: "DAILY_SELECTOR_CORE_PARITY_V1_PASS",
  fixedRegressionSeeds: fixedSeeds.length,
  fixedQuestionComparisons: fixedComparisons,
  paired365Schedules: 1000,
  paired365QuestionComparisons: fullComparisons,
  questionIdMismatches: 0,
  roleMismatches: 0,
  categoryMismatches: 0,
  growthSeedMismatches: 0,
  determinismFailures: 0,
  stress,
  run767Day281to283: actualRun767,
  production: { activationDate: DAILY_SELECTOR_C3_ACTIVATION_DATE, seed: DAILY_SELECTOR_C3_SEED, sampleQARepresentativeSeed: sampleQA.baseline.representative365Seed },
  baselineHashes,
}, null, 2));
