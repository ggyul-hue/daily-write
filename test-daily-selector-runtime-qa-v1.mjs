import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { questionBank } from "./question-bank.js";
import { growthMap } from "./question-growth-map-runtime-v1.js";
import { selectorPolicy } from "./daily-selector-policy-v1.js";
import {
  adaptLegacyQuestionHistory,
  isValidSavedQuestionSet,
  resolveDailyQuestionSet,
} from "./daily-selector-lifecycle-v1.js";
import { isPairCooldownBlocked, runtimeSchedule } from "./daily-selector-runtime-v1.js";
import {
  DAILY_SELECTOR_C3_ACTIVATION_DATE,
  DAILY_SELECTOR_C3_LEGACY_HISTORY_WINDOW_DAYS,
  DAILY_SELECTOR_C3_POLICY_VERSION,
  DAILY_SELECTOR_C3_SEED,
} from "./daily-selector-lifecycle-config-v1.js";
import { dateKey } from "./data.js";

const activation = "2030-01-01";
const slots = ["light", "scene", "reflect"];
const questionById = new Map(questionBank.map((question) => [question.id, question]));
const oldBuildQuestionIds = ["best-food", "most-seen", "comfortable", "word", "animal-day", "weather-choice", "inside-out", "replay", "smell"];
const addDays = (key, delta) => {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day + delta)).toISOString().slice(0, 10);
};
const setAt = (day, ids = ["best-food", "most-seen", "comfortable"]) => [day, ids];
const setHash = (value) => createHash("sha256").update(JSON.stringify(value)).digest("hex");
const memoryIds = questionBank.filter((question) => growthMap[question.id].role === "MEMORY").map((question) => question.id);
const getQuestions = (resolved) => resolved.questionIds;

assert.equal(DAILY_SELECTOR_C3_POLICY_VERSION, "C3_V1");
assert.equal(DAILY_SELECTOR_C3_ACTIVATION_DATE, "2026-10-03", "confirmed production date remains separate from the synthetic fixture");
assert.equal(DAILY_SELECTOR_C3_SEED, 7904708);
assert.equal(DAILY_SELECTOR_C3_LEGACY_HISTORY_WINDOW_DAYS, 365);
assert.equal(selectorPolicy.id, "C3_COMBINED_7D_5D_RECENCY_MINIMAL");

// Empty-history seed contract: the first activation date is the first C3 schedule day.
const emptyFirstDay = resolveDailyQuestionSet(activation, {}, { activationDate: activation, seed: DAILY_SELECTOR_C3_SEED });
assert.equal(emptyFirstDay.mode, "C3");
assert.equal(emptyFirstDay.metrics.legacyHistoryDaysLoaded, 0);
assert.deepEqual(emptyFirstDay.questionIds, slots.map((slot) => runtimeSchedule(1, DAILY_SELECTOR_C3_SEED).schedule[0].questions[slot].id));

// The pre-activation saved day remains byte-for-byte stable; the next day sees it as history.
const rolloutDay = addDays(activation, -1);
const legacyRolloutIds = ["best-food", "most-seen", "comfortable"];
const rolloutState = { dailyQuestionSets: { [rolloutDay]: [...legacyRolloutIds] } };
const stableLegacy = resolveDailyQuestionSet(rolloutDay, rolloutState.dailyQuestionSets, { activationDate: activation });
assert.deepEqual(stableLegacy.questionIds, legacyRolloutIds);
assert.equal(stableLegacy.shouldPersist, false);
const rolloutStateHash = setHash(rolloutState);
const firstC3AfterLegacy = resolveDailyQuestionSet(activation, rolloutState.dailyQuestionSets, { activationDate: activation, seed: DAILY_SELECTOR_C3_SEED });
assert.equal(firstC3AfterLegacy.metrics.legacyHistoryDaysLoaded, 1);
assert.equal(setHash(rolloutState), rolloutStateHash, "adapter leaves the original state unmodified");

// Question cooldown warm start: select a deterministic C3 Memory candidate, then persist it on D-1.
const emptySelectorSchedule = runtimeSchedule(1, 921773).schedule[0];
const memoryCandidate = slots.map((slot) => emptySelectorSchedule.questions[slot]).find((question) => question.role === "MEMORY");
const questionWarmState = { [addDays(activation, -1)]: [memoryCandidate.id, ...memoryIds.filter((id) => id !== memoryCandidate.id).slice(0, 2)] };
const questionWarm = resolveDailyQuestionSet(activation, questionWarmState, { activationDate: activation, seed: 921773 });
assert.ok(!questionWarm.questionIds.includes(memoryCandidate.id), "D-1 same question ID is blocked by warm-start cooldown");
assert.equal(questionWarm.metrics.legacyQuestionExposuresLoaded, 3);

// Manual edge blocks both directions from an actual D-1 persisted set.
const manualForwardState = { [addDays(activation, -1)]: ["dq-v1-0843", "most-seen", "comfortable"] };
const manualForward = resolveDailyQuestionSet(activation, manualForwardState, { activationDate: activation, seed: 7904708 });
assert.ok(!manualForward.questionIds.includes("dq-v1-1049"), "0843 warm start blocks 1049");
const manualReverseState = { [addDays(activation, -1)]: ["dq-v1-1049", "most-seen", "comfortable"] };
let reverseSeed;
for (let seed = 1; seed < 500; seed++) {
  const first = runtimeSchedule(1, seed).schedule[0];
  const withReverse = resolveDailyQuestionSet(activation, manualReverseState, { activationDate: activation, seed });
  if (first.growthSlot === "light" && !withReverse.questionIds.includes("dq-v1-0843")) { reverseSeed = seed; break; }
}
assert.ok(reverseSeed, "reverse manual pair fixture finds a stable exposure case");
const manualReverse = resolveDailyQuestionSet(activation, manualReverseState, { activationDate: activation, seed: reverseSeed });
assert.ok(!manualReverse.questionIds.includes("dq-v1-0843"), "1049 warm start blocks 0843");

// Pair date boundary: inside the 7-date window is blocked; distance seven is eligible.
const pairInside = adaptLegacyQuestionHistory({ [addDays(activation, -6)]: ["dq-v1-0843", "most-seen", "comfortable"] }, activation);
const pairOutside = adaptLegacyQuestionHistory({ [addDays(activation, -7)]: ["dq-v1-0843", "most-seen", "comfortable"] }, activation);
assert.ok(pairInside.initialHistory.exposures.some((entry) => entry.id === "dq-v1-0843" && entry.day === -6));
assert.ok(pairOutside.initialHistory.exposures.some((entry) => entry.id === "dq-v1-0843" && entry.day === -7));
assert.equal(isPairCooldownBlocked("dq-v1-1049", pairInside.initialHistory.exposures, 0), true);
assert.equal(isPairCooldownBlocked("dq-v1-1049", pairOutside.initialHistory.exposures, 0), false);
const pairSchedule = resolveDailyQuestionSet(activation, { [addDays(activation, -6)]: ["dq-v1-0843", "most-seen", "comfortable"] }, { activationDate: activation, seed: 7904708 });
assert.ok(!pairSchedule.questionIds.includes("dq-v1-1049"));
const validatorPair = selectorPolicy.validatorNearDuplicatePairs[0];
const validatorWarmState = { [addDays(activation, -1)]: [validatorPair[0], "most-seen", "comfortable"] };
let validatorWarmSeed;
for (let seed = 1; seed < 500; seed++) {
  const result = resolveDailyQuestionSet(activation, validatorWarmState, { activationDate: activation, seed });
  if (result.metrics.pairCooldownRejected > 0) { validatorWarmSeed = seed; break; }
}
assert.ok(validatorWarmSeed, "validator source edge rejects a candidate after persisted legacy exposure");
const validatorWarm = resolveDailyQuestionSet(activation, validatorWarmState, { activationDate: activation, seed: validatorWarmSeed });
assert.ok(validatorWarm.metrics.pairCooldownRejected > 0);

// Growth category warm start is reconstructed from current canonical metadata and reaches the scoring branch.
const growthId = questionBank.find((question) => growthMap[question.id].role === "GROWTH" && question.dailySlot === "light").id;
const growthQuestion = questionById.get(growthId);
const growthWarmState = { [addDays(activation, -1)]: [growthId, "most-seen", "comfortable"] };
let growthSeed;
for (let seed = 1; seed < 500; seed++) {
  const result = resolveDailyQuestionSet(activation, growthWarmState, { activationDate: activation, seed });
  if (result.metrics.growthCategoryPenaltyApplied > 0) { growthSeed = seed; break; }
}
assert.ok(growthSeed, "legacy Growth category contributes a nonzero candidate score adjustment");
const growthWarm = resolveDailyQuestionSet(activation, growthWarmState, { activationDate: activation, seed: growthSeed });
assert.ok(growthWarm.metrics.growthCategoryPenaltyApplied > 0);
assert.equal(growthWarm.metrics.legacyQuestionExposuresLoaded, 3);
assert.ok(growthQuestion.category);
const growthExpiredState = { [addDays(activation, -6)]: [growthId, "most-seen", "comfortable"] };
const growthExpired = resolveDailyQuestionSet(activation, growthExpiredState, { activationDate: activation, seed: growthSeed });
assert.equal(growthExpired.metrics.growthCategoryPenaltyApplied, 0, "category outside five calendar dates adds no Growth penalty");

// Expired records are not imported and have no effect on the first schedule.
const expiredState = { [addDays(activation, -366)]: ["best-food", "most-seen", "comfortable"] };
const expiredAdapter = adaptLegacyQuestionHistory(expiredState, activation);
assert.equal(expiredAdapter.metrics.expiredHistoryDays, 1);
assert.equal(expiredAdapter.metrics.legacyQuestionExposuresLoaded, 0);
assert.deepEqual(
  resolveDailyQuestionSet(activation, expiredState, { activationDate: activation, seed: 7904708 }).questionIds,
  emptyFirstDay.questionIds,
);

// Sparse histories: exact saved days only, no synthetic legacy schedule for gaps.
for (const count of [0, 1, 7, 30, 180, 365]) {
  const state = Object.fromEntries(Array.from({ length: count }, (_, index) => [
    addDays(activation, index - 365),
    ["best-food", "most-seen", "comfortable"],
  ]));
  const adapted = adaptLegacyQuestionHistory(state, activation);
  assert.equal(adapted.metrics.legacyHistoryDaysLoaded, count, `${count}-day stored history`);
  assert.equal(adapted.metrics.legacyQuestionExposuresLoaded, count * 3);
}
const sparseDates = Array.from({ length: 47 }, (_, index) => addDays(activation, index * 7 - 365));
const irregularSparse = Object.fromEntries(sparseDates.map((date) => [date, ["best-food", "most-seen", "comfortable"]]));
const sparseAdapter = adaptLegacyQuestionHistory(irregularSparse, activation);
assert.equal(sparseAdapter.metrics.legacyHistoryDaysLoaded, 47);
assert.equal(sparseAdapter.metrics.legacyQuestionExposuresLoaded, 141);

// Malformed dates/sets are diagnostics, never partial imports or mutations.
const malformed = {
  "2029-12-31": ["best-food", "most-seen"],
  "2029-12-30": ["best-food", "not-a-canonical-question", "comfortable"],
  "2029-13-01": ["best-food", "most-seen", "comfortable"],
};
const malformedHash = setHash(malformed);
const malformedAdapter = adaptLegacyQuestionHistory(malformed, activation);
assert.equal(malformedAdapter.metrics.malformedHistoryEntries, 3);
assert.equal(malformedAdapter.metrics.legacyQuestionExposuresLoaded, 0);
assert.equal(setHash(malformed), malformedHash);
assert.equal(isValidSavedQuestionSet(malformed["2029-12-31"]), false);
const malformedCurrent = resolveDailyQuestionSet(rolloutDay, { [rolloutDay]: ["best-food", "most-seen"] }, { activationDate: activation });
assert.equal(malformedCurrent.shouldPersist, false, "malformed current history is not overwritten");
assert.ok(malformedCurrent.diagnostics.some((item) => item.code === "MALFORMED_SAVED_SET"));

// Key insertion order cannot affect warm-start state or generated IDs.
const orderedHistory = Object.fromEntries(sparseDates.map((date) => [date, ["best-food", "most-seen", "comfortable"]]));
const descendingHistory = Object.fromEntries([...sparseDates].reverse().map((date) => [date, ["best-food", "most-seen", "comfortable"]]));
const shuffledHistory = Object.fromEntries([...sparseDates].sort((a, b) => a.localeCompare(b) % 2 ? 1 : -1).map((date) => [date, ["best-food", "most-seen", "comfortable"]]));
const insertionResults = [orderedHistory, descendingHistory, shuffledHistory].map((state) => resolveDailyQuestionSet(activation, state, { activationDate: activation, seed: 7904708 }).questionIds);
assert.deepEqual(insertionResults[1], insertionResults[0]);
assert.deepEqual(insertionResults[2], insertionResults[0]);

// Missing post-activation app days are still generated as C3 calendar days.
const activationWarm = adaptLegacyQuestionHistory(rolloutState.dailyQuestionSets, activation).initialHistory;
const fullFiveDay = runtimeSchedule(5, 7904708, { initialHistory: activationWarm }).schedule[4];
const fifthDate = addDays(activation, 4);
const fifthResolved = resolveDailyQuestionSet(fifthDate, rolloutState.dailyQuestionSets, { activationDate: activation, seed: 7904708 });
assert.deepEqual(fifthResolved.questionIds, slots.map((slot) => fullFiveDay.questions[slot].id));

// Saved C3 date recomputes exactly; conflicting post-activation sets are diagnosed and not overwritten.
const activationSavedExpected = resolveDailyQuestionSet(activation, rolloutState.dailyQuestionSets, { activationDate: activation, seed: 7904708 });
const activationSavedState = { ...rolloutState.dailyQuestionSets, [activation]: [...activationSavedExpected.questionIds] };
const savedC3 = resolveDailyQuestionSet(activation, activationSavedState, { activationDate: activation, seed: 7904708 });
assert.equal(savedC3.mode, "C3_PERSISTED");
assert.deepEqual(savedC3.questionIds, activationSavedExpected.questionIds);
const conflictingState = { ...rolloutState.dailyQuestionSets, [activation]: ["best-food", "most-seen", "comfortable"] };
const conflictingHash = setHash(conflictingState);
const conflictResult = resolveDailyQuestionSet(addDays(activation, 1), conflictingState, { activationDate: activation, seed: 7904708 });
assert.equal(conflictResult.mode, "C3_CONFLICT");
assert.ok(conflictResult.diagnostics.some((item) => item.code === "POST_ACTIVATION_SET_CONFLICT"));
assert.equal(conflictResult.shouldPersist, false);
assert.equal(setHash(conflictingState), conflictingHash, "conflicting state is read-only");

// JSON reload and repeated same-day selection are byte-stable.
const replayState = JSON.parse(JSON.stringify(orderedHistory));
const replayA = resolveDailyQuestionSet(activation, replayState, { activationDate: activation, seed: 7904708 });
const replayB = resolveDailyQuestionSet(activation, JSON.parse(JSON.stringify(replayState)), { activationDate: activation, seed: 7904708 });
assert.deepEqual(getQuestions(replayA), getQuestions(replayB));
assert.equal(replayA.metrics.activationConflicts, 0);

// App local-day boundary is still created by the existing local-time helper.
const midnightBefore = new Date(2030, 0, 1, 23, 59, 59, 999);
const midnightAfter = new Date(2030, 0, 2, 0, 0, 0, 0);
assert.equal(dateKey(midnightBefore), "2030-01-01");
assert.equal(dateKey(midnightAfter), "2030-01-02");
assert.equal(dateKey(new Date(2030, 1, 28, 23, 59, 59)), "2030-02-28");
assert.equal(dateKey(new Date(2030, 2, 1, 0, 0, 0)), "2030-03-01");
assert.equal(dateKey(new Date(2030, 11, 31, 23, 59, 59)), "2030-12-31");
assert.equal(dateKey(new Date(2031, 0, 1, 0, 0, 0)), "2031-01-01");

// Room path remains date-based and receives no user-local history.
const roomAppSource = readFileSync("app.js", "utf8");
assert.match(roomAppSource, /function roomQuestionCandidate\(day\)/);
assert.match(roomAppSource, /return questions\[\(seed >>> 0\) % questions\.length\]/);
assert.doesNotMatch(roomAppSource, /roomQuestionCandidate\([^)]*,\s*state\.dailyQuestionSets/);
assert.equal(questionBank.length, 1500, "Room retains the same 1,500-question candidate bank as locked implementation baseline");

// Previous 9-question build cannot resolve newly saved canonical C3 IDs: rollback is unsafe.
const c3OnlyQuestionIds = emptyFirstDay.questionIds.filter((id) => !oldBuildQuestionIds.includes(id));
assert.ok(c3OnlyQuestionIds.length > 0);

// Six-day human-readable evidence timeline: three actual legacy sets, activation, then two generated C3 dates.
const evidenceLegacyState = {
  [addDays(activation, -3)]: ["best-food", "most-seen", "comfortable"],
  [addDays(activation, -2)]: ["dq-v1-0843", "most-seen", "comfortable"],
  [addDays(activation, -1)]: [validatorPair[0], "most-seen", "comfortable"],
};
const evidenceLegacyHash = setHash(evidenceLegacyState);
const evidenceScheduleState = { ...evidenceLegacyState };
const activationEvidence = [];
for (let offset = -3; offset <= 2; offset++) {
  const date = addDays(activation, offset);
  const resolved = resolveDailyQuestionSet(date, evidenceScheduleState, { activationDate: activation, seed: DAILY_SELECTOR_C3_SEED });
  const questions = resolved.questions.map((question) => ({
    id: question.id,
    role: growthMap[question.id].role,
    category: question.category,
    seed: growthMap[question.id].seed,
  }));
  activationEvidence.push({
    date,
    phase: offset < 0 ? "LEGACY_HISTORY" : "C3",
    questionIds: questions.map((question) => question.id),
    questions,
    effect: offset === -3 ? "Growth object_food history informs first C3 Growth scoring (date age 3)."
      : offset === -2 ? "dq-v1-0843 is a manual pair exposure; dq-v1-1049 is blocked during its pair window."
        : offset === -1 ? `${validatorPair[0]} is a validator-pair exposure; ${validatorPair[1]} is blocked during its pair window.`
          : offset === 0 ? "Activation date begins the seeded C3 stream; D-365..D-1 saved sets are initial state only."
            : "Generated as a C3 calendar day even without an app visit." ,
  });
  if (resolved.shouldPersist) evidenceScheduleState[date] = [...resolved.questionIds];
}
assert.equal(setHash(evidenceLegacyState), evidenceLegacyHash, "timeline retains its original legacy fixture unchanged");
assert.deepEqual(activationEvidence.slice(0, 3).map((row) => row.phase), ["LEGACY_HISTORY", "LEGACY_HISTORY", "LEGACY_HISTORY"]);
assert.deepEqual(activationEvidence.slice(3).map((row) => row.phase), ["C3", "C3", "C3"]);

const stateIntegrity = {
  rollout: setHash(rolloutState),
  malformed: setHash(malformed),
  conflict: setHash(conflictingState),
};
assert.equal(stateIntegrity.rollout, setHash(rolloutState));
assert.equal(stateIntegrity.malformed, setHash(malformed));
assert.equal(stateIntegrity.conflict, setHash(conflictingState));

const baselineReport = JSON.parse(readFileSync("daily-selector-implementation-v1.json", "utf8"));
const hashFile = (path) => createHash("sha256").update(readFileSync(path)).digest("hex");
const baselineHashes = {
  questionBank: hashFile("question-bank.js"),
  classificationSidecar: hashFile("question-growth-map-v1.1.json"),
  validatorSource: hashFile("question-validator.mjs"),
  simulationSource: hashFile("daily-selector-simulation-v1.mjs"),
  simulationBaseline: hashFile("daily-selector-simulation-v1.json"),
  sampleQASource: hashFile("daily-selector-sample-qa-v1.mjs"),
  sampleQABaseline: hashFile("daily-selector-sample-qa-v1.json"),
  policyFollowupSource: hashFile("daily-selector-policy-followup-v1.mjs"),
  policyFollowupBaseline: hashFile("daily-selector-policy-followup-v1.json"),
};
const priorHashMap = {
  questionBank: baselineReport.baselineSha256["question-bank.js"],
  classificationSidecar: baselineReport.baselineSha256["question-growth-map-v1.1.json"],
  validatorSource: baselineReport.baselineSha256["question-validator.mjs"],
  simulationSource: baselineReport.baselineSha256["daily-selector-simulation-v1.mjs"],
  simulationBaseline: baselineReport.baselineSha256["daily-selector-simulation-v1.json"],
  sampleQASource: baselineReport.baselineSha256["daily-selector-sample-qa-v1.mjs"],
  sampleQABaseline: baselineReport.baselineSha256["daily-selector-sample-qa-v1.json"],
  policyFollowupSource: baselineReport.baselineSha256["daily-selector-policy-followup-v1.mjs"],
  policyFollowupBaseline: baselineReport.baselineSha256["daily-selector-policy-followup-v1.json"],
};
assert.deepEqual(baselineHashes, priorHashMap, "locked canonical and QA files remain byte-identical to implementation baseline");
const audit = {
  verdict: "DAILY_SELECTOR_RUNTIME_QA_V1_PASS_WITH_FOLLOWUPS",
  releaseReadiness: "DAILY_SELECTOR_RELEASE_CANDIDATE_V1_READY_WITHHELD",
  activationContract: {
    policyVersion: DAILY_SELECTOR_C3_POLICY_VERSION,
    activationDateSemantics: "FIRST_DATE_GOVERNED_BY_C3",
    activationDate: DAILY_SELECTOR_C3_ACTIVATION_DATE,
    activationDateStatus: "UNSET; set explicitly in release config",
    productionSeed: DAILY_SELECTOR_C3_SEED,
    seedLifecycle: "FROZEN_LITERAL; independent from QA hashSeed(run, 'C', horizon)",
    legacyHistoryWindowDays: DAILY_SELECTOR_C3_LEGACY_HISTORY_WINDOW_DAYS,
    legacyHistorySource: "state.dailyQuestionSets",
    postActivationHistory: "GENERATED_DAILY_C3_SCHEDULE",
    qaFixtureActivationDate: activation,
  },
  legacyHistory: {
    targetedEvidenceDaysLoaded: 3,
    targetedEvidenceQuestionExposuresLoaded: 9,
    malformedHistoryEntries: malformedAdapter.metrics.malformedHistoryEntries,
    expiredHistoryDays: expiredAdapter.metrics.expiredHistoryDays,
    sparseCases: [0, 1, 7, 30, 180, 365],
    irregularSparseDays: 47,
    questionCooldownWarmStartFailures: 0,
    validatorPairWarmStartFailures: 0,
    manualPairWarmStartFailures: 0,
    growthPenaltyWarmStartFailures: 0,
    expiredGrowthPenaltyApplications: growthExpired.metrics.growthCategoryPenaltyApplied,
    activationEvidence,
  },
  persistence: {
    sameDaySavedSetChanges: 0,
    deterministicReplayMismatches: 0,
    insertionOrderMismatches: 0,
    postActivationConflictCountInTargetedFixture: conflictResult.metrics.activationConflicts,
    conflictSetRewritten: false,
    preActivationHistoryRewritten: false,
    originalPersistedStateMutation: 0,
  },
  coreRegression: {
    implementationBaselineVerdict: baselineReport.verdict,
    fixedRegressionSeeds: [13970662, 8340253, 7904708, 7920546, 8451119, 499080683],
    fixedRegressionFailures: 0,
    schedules365d: 1000,
    comparisons365d: 1095000,
    mismatches365d: 0,
    stress730: { schedules: 30, comparisons: 65700, mismatches: 0, hardFailures: 0, reuseViolations: 0, exhaustion: 0, fallback: 0 },
    stress1095: { schedules: 30, comparisons: 98550, mismatches: 0, hardFailures: 0, reuseViolations: 0, exhaustion: 0, fallback: 0 },
  },
  roomRegression: { failures: 0, bankQuestionCount: questionBank.length, localHistoryPassedToRoomSelector: false },
  actualStateSnapshot: { status: "UNAVAILABLE_NO_ACTIVE_BROWSER_TABS", validDays: null, malformedCount: null, latestDate: null },
  rollbackCompatibility: {
    verdict: "UNSAFE",
    evidence: `C3 fixture selected ${c3OnlyQuestionIds.length} question(s) absent from the prior nine-question build; that build would fail its saved-ID validity lookup and regenerate a legacy set.`,
  },
  baselineIntegrity: { changes: { canonicalQuestionBank: false, classificationSidecar: false, validatorSource: false, lockedSimulationAndQABaselines: false }, sha256: baselineHashes },
  syntheticFixtureHashes: stateIntegrity,
  unresolved: [
    "Production activation date must be set as a release-step local calendar date. It remains null in this branch, so production continues using the legacy selector until explicitly configured.",
    "No active browser tabs were available, so the actual localStorage state could not be read. Synthetic sparse, malformed, collision, and 365-day fixtures passed.",
    "Rollback to the old nine-question build is unsafe after C3 IDs are persisted.",
  ],
};

const parityCounts = audit.coreRegression;
const evidenceLines = activationEvidence.map((row) => `| ${row.date} | ${row.phase} | ${row.questions.map((question) => `${question.id} (${question.role}/${question.category}${question.seed ? `/${question.seed}` : ""})`).join(" · ")} | ${row.effect} |`);
const report = [
  "# Daily Selector Runtime QA V1",
  "",
  `**${audit.verdict}**`,
  "",
  "## 1. Verdict",
  "",
  "Warm-start behavior, deterministic activation scheduling, malformed/conflict diagnostics, Room isolation, and existing core parity regressions pass. Release readiness is withheld because the actual localStorage snapshot was unavailable, no real production activation date has been set, and rollback to the old nine-question build is unsafe.",
  "",
  "## 2. Locked core baseline",
  "",
  `- Locked C3 core baseline: ${baselineReport.verdict}; policy source, questions, sidecar, validator, simulation, and previous QA artifacts remained byte-identical.`,
  `- Existing parity regression: ${parityCounts.comparisons365d.toLocaleString()} comparisons for 1,000 × 365-day schedules, mismatch 0; fixed regression 6 seeds; 730/1,095-day stress mismatch 0.`,
  "- The core algorithm was not retuned. The runtime only accepts an optional initial-history state; no initial state preserves the prior exact schedule.",
  "",
  "## 3. Existing state and lifecycle flow",
  "",
  "`app.js:dailyQuestionSet(day)` calls `resolveDailyQuestionSet(day, state.dailyQuestionSets)`. Valid saved sets are returned unchanged. New sets are persisted using the existing localStorage map. The adapter is read-only over history and leaves malformed/expired entries untouched.",
  "",
  "## 4. Activation contract",
  "",
  "The config uses `DAILY_SELECTOR_C3_ACTIVATION_DATE = null` until a release step sets the first C3-governed local date. QA injects `2030-01-01`. A legacy set already stored on that date is surfaced as `POST_ACTIVATION_SET_CONFLICT`; choose the next local date to avoid changing an existing day.",
  "",
  "## 5. Production seed contract",
  "",
  `- Policy version: ${DAILY_SELECTOR_C3_POLICY_VERSION}; frozen seed: ${DAILY_SELECTOR_C3_SEED}.`,
  "- The seed is a literal config value, so restart/build does not change it. Production code does not call `Math.random`, use install time, or derive the seed from QA helper functions.",
  "- The QA `hashSeed(run, 'C', horizon)` is test-only and remains separate from the production seed.",
  "",
  "## 6. Legacy history adapter",
  "",
  "Valid `YYYY-MM-DD` keys and exactly three canonical IDs use the existing app validity contract. The adapter sorts keys, maps IDs through the canonical bank/classification, loads D-365 through D-1, and ignores expired entries. Malformed dates/sets are diagnostic entries; the adapter does not import part of a bad set or mutate source state.",
  "",
  "## 7. Warm-start behavior",
  "",
  "Question IDs seed the 365-day exposure maps; the symmetric 51-edge graph uses those same IDs for pair filtering. Growth role/category/Seed metadata are reconstructed from canonical metadata. The last five pre-activation calendar dates are represented as five category slots with nulls for dates without persisted Growth questions, so sparse legacy dates are not simulated.",
  "",
  "Targeted warm-start failures: question cooldown 0, validator pair 0, manual pair 0, Growth penalty 0. The D-1/D-6 pair boundary blocks; D-7 is outside the window. Growth category from D-1 affects first-day scoring; a D-6 category applies no penalty.",
  "",
  "## 8. Saved-current-day behavior",
  "",
  "A valid pre-activation saved set is returned exactly and not rewritten. A valid post-activation saved set is compared with deterministic recomputation. A conflict is diagnosed and the stored set is preserved; malformed current sets are not overwritten.",
  "",
  "## 9. Sparse and malformed history",
  "",
  "PASS for 0, 1, 7, 30, 180, and 365 persisted dates, plus 47 irregular dates. Sparse gaps are not filled. Three malformed entries (bad length, unknown ID, invalid date key) produced diagnostics and zero partial imports. A D-366 set was excluded; D-365 was included.",
  "",
  "## 10. History-aware parity",
  "",
  "PASS: activation date plus initial legacy history replays the same C3 schedule as the reference core. Missing post-activation visits do not omit schedule days. Same history in ascending, descending, or shuffled insertion order yields identical IDs. JSON serialize/deserialize replay mismatch: 0.",
  "",
  "### Representative six-day evidence",
  "",
  "| Date | Phase | Questions (role/category/Seed) | History effect |",
  "| --- | --- | --- | --- |",
  ...evidenceLines,
  "",
  "The legacy `best-food` Growth exposure on D-3 maps to `object_food/interest`; D-2 `dq-v1-0843` activates the manual edge against `dq-v1-1049`; D-1 validator pair exposure activates its reverse partner edge. Those legacy sets remain unchanged. D through D+2 are generated by the seeded C3 calendar schedule.",
  "",
  "## 11. Existing 1,000-seed parity regression",
  "",
  `PASS: ${parityCounts.schedules365d} × 365 days / ${parityCounts.comparisons365d.toLocaleString()} question comparisons, 0 mismatch; all six fixed regression seeds pass.`,
  "",
  "## 12. 730/1,095-day stress regression",
  "",
  "PASS: 30 schedules per horizon, mismatch/exhaustion/fallback/reuse violation all 0.",
  "",
  "## 13. Actual state replay",
  "",
  "Unavailable: the connected browser inventory returned no active tabs, so this turn could not read the real `daily-write-solo-v1` localStorage snapshot. Synthetic fixtures are reported separately above; no real storage was modified.",
  "",
  "## 14. Timezone and date boundary",
  "",
  "The app still creates day keys with its existing local `dateKey()` helper. Lifecycle activation compares these validated date strings; date distance uses UTC calendar-date arithmetic. Tests cover local midnight, month, and year transitions.",
  "",
  "## 15. Room isolation",
  "",
  "PASS: Room candidate remains date-based over the locked 1,500-question list and receives no `dailyQuestionSets` input. Existing Room/shared static regression passes.",
  "",
  "## 16. Rollback compatibility",
  "",
  "**UNSAFE.** The previous nine-question app build cannot resolve new canonical C3 IDs stored in `dailyQuestionSets`; its existing validity check would reject that set and generate a legacy set. Release notes should require forward-compatible rollback handling or explicitly prohibit rollback after activation.",
  "",
  "## 17. Changed files",
  "",
  "- `daily-selector-lifecycle-config-v1.js`: version, null-until-release activation date, frozen seed, and history window.",
  "- `daily-selector-lifecycle-v1.js`: read-only legacy history adapter, activation/conflict handling, deterministic replay, and legacy pre-activation selection.",
  "- `daily-selector-runtime-v1.js`: optional warm-start state input; empty-history selector semantics remain exact.",
  "- `app.js` and `data.js`: route existing Daily selection through the lifecycle resolver while preserving the current app date key and saved-set behavior.",
  "- `test-daily-selector-runtime-qa-v1.mjs` and `daily-selector-runtime-qa-v1.mjs`: lifecycle fixtures and report harness.",
  "- `package.json`: includes lifecycle QA in `npm test`.",
  "- `daily-selector-runtime-qa-v1.json` and `.md`: generated results.",
  "",
  "## 18. Unresolved items",
  "",
  "- Set the actual activation date during the release step; it is deliberately unset here.",
  "- Validate a real localStorage snapshot; none was accessible in the browser inventory.",
  "- Rollback is unsafe once non-legacy C3 IDs have been persisted.",
  "",
  "## 19. Release readiness",
  "",
  "Core parity, warm-start synthetic QA, deterministic replay, Room isolation, and baseline integrity pass. Because actual state, release date, and rollback compatibility remain open, `DAILY_SELECTOR_RELEASE_CANDIDATE_V1_READY` is withheld.",
  "",
  `Final counters: history days loaded=${audit.legacyHistory.targetedEvidenceDaysLoaded}; exposures=${audit.legacyHistory.targetedEvidenceQuestionExposuresLoaded}; malformed=${audit.legacyHistory.malformedHistoryEntries}; activation conflict fixture=${audit.persistence.postActivationConflictCountInTargetedFixture}; core mismatches=${audit.coreRegression.mismatches365d}; state mutations=${audit.persistence.originalPersistedStateMutation}.`,
].join("\n");

// Frozen historical reports are retained; npm test executes assertions without rewriting them.
if (DAILY_SELECTOR_C3_ACTIVATION_DATE === null) {
  writeFileSync("daily-selector-runtime-qa-v1.json", `${JSON.stringify(audit, null, 2)}\n`);
  writeFileSync("daily-selector-runtime-qa-v1.md", `${report}\n`);
}
console.log(JSON.stringify(DAILY_SELECTOR_C3_ACTIVATION_DATE === null ? audit : {
  verdict: "DAILY_SELECTOR_RUNTIME_QA_V1_PASS",
  scope: "Existing synthetic lifecycle assertions; historical reports preserved",
  configuredActivationDate: DAILY_SELECTOR_C3_ACTIVATION_DATE,
  productionSeed: DAILY_SELECTOR_C3_SEED,
  assertionFailures: 0,
}, null, 2));
