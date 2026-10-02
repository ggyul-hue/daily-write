import { questionBank } from "./question-bank.js";
import { growthMap } from "./question-growth-map-runtime-v1.js";
import { DAILY_SLOTS, calendarDayDistance, createDailySelector } from "./daily-selector-runtime-v1.js";
import {
  DAILY_SELECTOR_C3_ACTIVATION_DATE,
  DAILY_SELECTOR_C3_LEGACY_HISTORY_WINDOW_DAYS,
  DAILY_SELECTOR_C3_POLICY_VERSION,
  DAILY_SELECTOR_C3_SEED,
  validateActivationDate,
} from "./daily-selector-lifecycle-config-v1.js";

const questionById = new Map(questionBank.map((question) => [question.id, question]));
const selector = createDailySelector();
const hasOwn = (object, key) => Object.prototype.hasOwnProperty.call(object, key);

function isValidDateKey(value) {
  try {
    calendarDayDistance(value, value);
    return true;
  } catch {
    return false;
  }
}

export function isValidSavedQuestionSet(ids) {
  return Array.isArray(ids) && ids.length === 3 && ids.every((id) => typeof id === "string" && questionById.has(id));
}

export function legacyDailyQuestions(dayKey, answeredQuestionIds = []) {
  if (!isValidDateKey(dayKey)) throw new TypeError(`invalid daily key: ${dayKey}`);
  let seed = 0;
  for (const character of dayKey) seed = ((seed << 5) - seed + character.charCodeAt(0)) | 0;
  seed >>>= 0;
  const groups = [
    ["best-food", "most-seen"],
    ["comfortable", "word", "replay"],
    ["animal-day", "weather-choice", "inside-out", "smell"],
  ];
  return groups.map((ids, index) => {
    const available = ids.filter((id) => !answeredQuestionIds.includes(id));
    const candidates = available.length ? available : ids;
    return questionById.get(candidates[(seed + index * 17) % candidates.length]);
  });
}

export function adaptLegacyQuestionHistory(dailyQuestionSets, activationDate) {
  const diagnostics = [];
  const source = dailyQuestionSets && typeof dailyQuestionSets === "object" && !Array.isArray(dailyQuestionSets)
    ? dailyQuestionSets
    : {};
  if (source !== dailyQuestionSets) diagnostics.push({ code: "MALFORMED_DAILY_QUESTION_SETS", count: 1 });
  const sortedEntries = Object.entries(source).sort(([a], [b]) => a.localeCompare(b));
  const validRecent = [];
  const postActivation = [];
  let malformedHistoryEntries = 0;
  let expiredHistoryDays = 0;

  for (const [date, ids] of sortedEntries) {
    if (!isValidDateKey(date)) {
      malformedHistoryEntries++;
      diagnostics.push({ code: "MALFORMED_DATE_KEY", date });
      continue;
    }
    if (!isValidSavedQuestionSet(ids)) {
      malformedHistoryEntries++;
      diagnostics.push({ code: "MALFORMED_SAVED_SET", date, idCount: Array.isArray(ids) ? ids.length : null });
      if (date >= activationDate) postActivation.push({ date, valid: false });
      continue;
    }
    if (date >= activationDate) {
      postActivation.push({ date, ids: [...ids], valid: true });
      continue;
    }
    const age = calendarDayDistance(date, activationDate);
    if (age > DAILY_SELECTOR_C3_LEGACY_HISTORY_WINDOW_DAYS) {
      expiredHistoryDays++;
      continue;
    }
    validRecent.push({ date, ids: [...ids], day: -age });
  }

  validRecent.sort((a, b) => a.date.localeCompare(b.date));
  const exposures = [];
  const growthSlotCounts = Object.fromEntries(DAILY_SLOTS.map((slot) => [slot, 0]));
  const prevSlotCategory = Object.fromEntries(DAILY_SLOTS.map((slot) => [slot, null]));
  const lastSlotDate = Object.fromEntries(DAILY_SLOTS.map((slot) => [slot, null]));
  const growthByDate = new Map();
  const slotCollisions = [];

  for (const row of validRecent) {
    const seenSlots = new Set();
    for (const id of row.ids) {
      const question = questionById.get(id);
      const meta = growthMap[id];
      const slot = question.dailySlot;
      exposures.push({ id, day: row.day });
      if (seenSlots.has(slot)) slotCollisions.push(row.date);
      seenSlots.add(slot);
      if (meta.role === "GROWTH") {
        growthSlotCounts[slot]++;
        const rows = growthByDate.get(row.date) ?? [];
        rows.push({ day: row.day, category: question.category, seed: meta.seed, id });
        growthByDate.set(row.date, rows);
      }
      if (lastSlotDate[slot] === null || row.date >= lastSlotDate[slot]) {
        prevSlotCategory[slot] = question.category;
        lastSlotDate[slot] = row.date;
      }
    }
  }

  const growthRows = [...growthByDate.values()].flat().sort((a, b) => a.day - b.day);
  const prevGrowthSeed = growthRows.at(-1)?.seed ?? null;
  const recentGrowthDateCategory = new Map();
  for (const [date, rows] of growthByDate) {
    // Legacy daily sets can use the former slot scheme. Preserve the persisted ID order;
    // if metadata classifies more than one as Growth, the last saved Growth ID is newest.
    recentGrowthDateCategory.set(date, rows.at(-1));
  }
  const growthHistory = [];
  for (let age = 5; age >= 1; age--) {
    const date = new Date(Date.UTC(
      Number(activationDate.slice(0, 4)),
      Number(activationDate.slice(5, 7)) - 1,
      Number(activationDate.slice(8, 10)) - age,
    )).toISOString().slice(0, 10);
    const row = recentGrowthDateCategory.get(date);
    growthHistory.push({ day: -age, category: row?.category ?? null, seed: row?.seed ?? null, id: row?.id ?? null });
  }
  if (slotCollisions.length) diagnostics.push({ code: "LEGACY_SLOT_COLLISIONS", count: slotCollisions.length });
  if ([...growthByDate.values()].some((rows) => rows.length > 1)) {
    diagnostics.push({ code: "MULTIPLE_LEGACY_GROWTH_IDS_ON_DATE", count: [...growthByDate.values()].filter((rows) => rows.length > 1).length });
  }

  return {
    initialHistory: { exposures, growthSlotCounts, prevSlotCategory, growthHistory, prevGrowthSeed },
    postActivation,
    diagnostics,
    metrics: {
      legacyHistoryDaysLoaded: validRecent.length,
      legacyQuestionExposuresLoaded: exposures.length,
      malformedHistoryEntries,
      expiredHistoryDays,
      activationConflicts: 0,
    },
  };
}

function compactDay(scheduleDay) {
  return Object.fromEntries(DAILY_SLOTS.map((slot) => [slot, scheduleDay.questions[slot].id]));
}

export function resolveDailyQuestionSet(dayKey, dailyQuestionSets = {}, {
  activationDate = DAILY_SELECTOR_C3_ACTIVATION_DATE,
  seed = DAILY_SELECTOR_C3_SEED,
} = {}) {
  if (!isValidDateKey(dayKey)) throw new TypeError(`invalid daily key: ${dayKey}`);
  validateActivationDate(activationDate);
  const source = dailyQuestionSets && typeof dailyQuestionSets === "object" && !Array.isArray(dailyQuestionSets)
    ? dailyQuestionSets
    : {};
  const hasCurrentSet = hasOwn(source, dayKey);
  const currentIds = source[dayKey];
  const currentSetValid = isValidSavedQuestionSet(currentIds);

  if (activationDate === null || dayKey < activationDate) {
    if (currentSetValid) return { questions: currentIds.map((id) => questionById.get(id)), questionIds: [...currentIds], shouldPersist: false, mode: "LEGACY", diagnostics: [] };
    const diagnostics = hasCurrentSet ? [{ code: "MALFORMED_SAVED_SET", date: dayKey }] : [];
    return { questions: legacyDailyQuestions(dayKey), questionIds: legacyDailyQuestions(dayKey).map((question) => question.id), shouldPersist: !hasCurrentSet, mode: "LEGACY", diagnostics };
  }

  const history = adaptLegacyQuestionHistory(source, activationDate);
  const activationOffset = calendarDayDistance(activationDate, dayKey);
  const result = selector.selectSchedule(activationOffset + 1, seed, { initialHistory: history.initialHistory });
  const expectedByDate = new Map();
  for (const row of result.schedule) {
    const key = new Date(Date.UTC(
      Number(activationDate.slice(0, 4)),
      Number(activationDate.slice(5, 7)) - 1,
      Number(activationDate.slice(8, 10)) + row.day - 1,
    )).toISOString().slice(0, 10);
    expectedByDate.set(key, compactDay(row));
  }
  let activationConflicts = 0;
  for (const saved of history.postActivation) {
    if (saved.date > dayKey) continue;
    const expected = expectedByDate.get(saved.date);
    const conflict = !saved.valid || !expected || DAILY_SLOTS.some((slot, index) => saved.ids[index] !== expected[slot]);
    if (conflict) {
      activationConflicts++;
      history.diagnostics.push({ code: "POST_ACTIVATION_SET_CONFLICT", date: saved.date });
    }
  }
  history.metrics.activationConflicts = activationConflicts;
  history.metrics.pairCooldownRejected = result.pairCooldownRejected;
  history.metrics.growthCategoryPenaltyApplied = result.growthCategoryPenaltyApplied;
  if (hasCurrentSet && !currentSetValid) {
    const generated = DAILY_SLOTS.map((slot) => questionById.get(result.schedule.at(-1).questions[slot].id));
    return { questions: generated, questionIds: generated.map((question) => question.id), shouldPersist: false, mode: "C3", diagnostics: history.diagnostics, metrics: history.metrics };
  }
  if (activationConflicts > 0) {
    const persistedCurrent = currentSetValid ? currentIds.map((id) => questionById.get(id)) : null;
    const currentQuestions = persistedCurrent ?? DAILY_SLOTS.map((slot) => questionById.get(result.schedule.at(-1).questions[slot].id));
    return { questions: currentQuestions, questionIds: currentQuestions.map((question) => question.id), shouldPersist: false, mode: "C3_CONFLICT", diagnostics: history.diagnostics, metrics: history.metrics };
  }

  const questions = DAILY_SLOTS.map((slot) => questionById.get(result.schedule.at(-1).questions[slot].id));
  const questionIds = questions.map((question) => question.id);
  if (currentSetValid) return { questions: currentIds.map((id) => questionById.get(id)), questionIds: [...currentIds], shouldPersist: false, mode: "C3_PERSISTED", diagnostics: history.diagnostics, metrics: history.metrics };
  return { questions, questionIds, shouldPersist: !hasCurrentSet, mode: "C3", diagnostics: history.diagnostics, metrics: history.metrics };
}

export function getDailySelectorRuntimeConfig() {
  return {
    policyVersion: DAILY_SELECTOR_C3_POLICY_VERSION,
    activationDateSemantics: "FIRST_DATE_GOVERNED_BY_C3",
    activationDate: DAILY_SELECTOR_C3_ACTIVATION_DATE,
    productionSeed: DAILY_SELECTOR_C3_SEED,
    legacyHistoryWindowDays: DAILY_SELECTOR_C3_LEGACY_HISTORY_WINDOW_DAYS,
    legacyHistorySource: "state.dailyQuestionSets",
    postActivationHistory: "GENERATED_DAILY_C3_SCHEDULE",
  };
}
