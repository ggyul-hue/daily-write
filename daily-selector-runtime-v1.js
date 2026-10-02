import { questionBank } from "./question-bank.js";
import { growthMap } from "./question-growth-map-runtime-v1.js";
import { selectorPolicy } from "./daily-selector-policy-v1.js";

export const DAILY_SLOTS = ["light", "scene", "reflect"];
export const POLICY_ID = selectorPolicy.id;

export const rng = (seed) => {
  let state = seed >>> 0;
  return () => {
    state += 0x6D2B79F5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const shuffled = (items, random) => {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const makePairAdjacency = () => {
  const adjacency = new Map();
  const add = (a, b, source) => {
    if (!adjacency.has(a)) adjacency.set(a, []);
    adjacency.get(a).push({ a, b, source });
  };
  for (const [a, b] of selectorPolicy.validatorNearDuplicatePairs) {
    add(a, b, "VALIDATOR");
    add(b, a, "VALIDATOR");
  }
  for (const pair of selectorPolicy.manuallyApprovedManualPairs) {
    add(pair.a, pair.b, pair.source);
    add(pair.b, pair.a, pair.source);
  }
  return adjacency;
};

export const pairAdjacency = makePairAdjacency();
const questionById = new Map(questionBank.map((question) => [question.id, question]));
export const selectorPools = Object.fromEntries(["GROWTH", "MEMORY"].flatMap((role) => DAILY_SLOTS.map((slot) => [
  `${role}:${slot}`,
  questionBank.filter((question) => question.dailySlot === slot && growthMap[question.id]?.role === role),
])));

if (selectorPolicy.validatorNearDuplicatePairs.length !== 50 || questionBank.length !== 1500 || Object.keys(growthMap).length !== questionBank.length) {
  throw new Error("Daily selector runtime baseline mismatch: question bank, growth map, or validator graph count");
}

export function calendarDayDistance(a, b) {
  const parse = (value) => {
    if (typeof value === "number" && Number.isInteger(value)) return value;
    if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new TypeError(`invalid daily key: ${value}`);
    const [year, month, day] = value.split("-").map(Number);
    const stamp = Date.UTC(year, month - 1, day);
    const checked = new Date(stamp);
    if (checked.getUTCFullYear() !== year || checked.getUTCMonth() !== month - 1 || checked.getUTCDate() !== day) throw new TypeError(`invalid daily key: ${value}`);
    return stamp / 86400000;
  };
  return Math.abs(parse(a) - parse(b));
}

export function growthCategoryPenalty(history, category, policy = selectorPolicy.growthRecentCategoryPenalty) {
  if (!policy.enabled) return 0;
  const recent = history.slice(-policy.windowDays);
  let penalty = 0;
  for (let index = 0; index < recent.length; index++) {
    if (recent[index].category !== category) continue;
    const ageDays = recent.length - index;
    penalty += policy.maxPenalty * (policy.windowDays - ageDays + 1) / policy.windowDays;
  }
  return penalty;
}

export function isPairCooldownBlocked(candidateId, exposures, day, cooldownDays = selectorPolicy.nearDuplicateCooldownDays, graph = pairAdjacency) {
  const edges = graph.get(candidateId) ?? [];
  return edges.some((edge) => exposures.some((exposure) => edge.b === exposure.id
    && Math.abs(day - exposure.day) <= cooldownDays - 1));
}

export function isQuestionCooldownActive(lastDay, currentDay) {
  return lastDay !== undefined && currentDay - lastDay <= 365;
}

export function createDailySelector({ bank = questionBank, metadata = growthMap, policy = selectorPolicy } = {}) {
  const slots = DAILY_SLOTS;
  const pools = Object.fromEntries(["GROWTH", "MEMORY"].flatMap((role) => slots.map((slot) => [
    `${role}:${slot}`,
    bank.filter((question) => question.dailySlot === slot && metadata[question.id]?.role === role),
  ])));
  const pairs = makePairAdjacency();

  function selectSchedule(days, seed, { startDay = 0, keepDiagnostics = false, initialHistory = null } = {}) {
    if (!Number.isInteger(days) || days < 1) throw new RangeError("days must be a positive integer");
    const random = rng(seed);
    const used = new Map();
    const priorSelected = new Map();
    const growthSlotCounts = Object.fromEntries(slots.map((slot) => [slot, initialHistory?.growthSlotCounts?.[slot] ?? 0]));
    const prevSlotCategory = Object.fromEntries(slots.map((slot) => [slot, initialHistory?.prevSlotCategory?.[slot] ?? null]));
    const growthHistory = [...(initialHistory?.growthHistory ?? [])];
    const schedule = [];
    let prevGrowthSeed = initialHistory?.prevGrowthSeed ?? null;
    let fallbackCount = 0;
    let candidateExhaustions = 0;
    let hardFailures = 0;
    let reuseViolations = 0;
    let pairCooldownRejected = 0;
    let growthCategoryPenaltyApplied = 0;
    const minimumPoolByRoleSlot = Object.fromEntries(Object.keys(pools).map((key) => [key, Infinity]));

    for (const exposure of initialHistory?.exposures ?? []) {
      if (!questionById.has(exposure.id) || !Number.isInteger(exposure.day) || exposure.day >= startDay) {
        throw new Error("invalid initial selector exposure");
      }
      used.set(exposure.id, exposure.day);
      priorSelected.set(exposure.id, exposure.day);
    }

    for (let day = startDay; day < startDay + days; day++) {
      const least = Math.min(...slots.map((slot) => growthSlotCounts[slot]));
      const growthChoices = slots.filter((slot) => growthSlotCounts[slot] === least);
      const growthSlot = growthChoices[Math.floor(random() * growthChoices.length)];
      growthSlotCounts[growthSlot]++;
      const roleFor = Object.fromEntries(slots.map((slot) => [slot, slot === growthSlot ? "GROWTH" : "MEMORY"]));
      const selected = {};
      const todayCategories = new Set();
      const order = shuffled(slots, random);

      for (const slot of order) {
        const role = roleFor[slot];
        const baseEligible = [];
        for (const question of pools[`${role}:${slot}`]) {
          const last = used.get(question.id);
          if (!isQuestionCooldownActive(last, day)) baseEligible.push(question);
        }
        let eligible = baseEligible;
        const exposed = [...priorSelected.entries()].map(([id, exposedDay]) => ({ id, day: exposedDay }));
        for (const sameDay of Object.values(selected)) exposed.push({ id: sameDay.id, day });
        const pairEligible = eligible.filter((question) => !isPairCooldownBlocked(question.id, exposed, day, policy.nearDuplicateCooldownDays, pairs));
        pairCooldownRejected += eligible.length - pairEligible.length;
        if (pairEligible.length) eligible = pairEligible;
        else fallbackCount++;

        minimumPoolByRoleSlot[`${role}:${slot}`] = Math.min(minimumPoolByRoleSlot[`${role}:${slot}`], eligible.length);
        if (!eligible.length) {
          candidateExhaustions++;
          hardFailures++;
          throw new Error(`selector candidate exhaustion at day ${day} ${role}:${slot}`);
        }

        let candidates = eligible;
        if (candidates.some((question) => !todayCategories.has(question.category))) candidates = candidates.filter((question) => !todayCategories.has(question.category));
        if (prevSlotCategory[slot] !== null && candidates.some((question) => question.category !== prevSlotCategory[slot])) {
          candidates = candidates.filter((question) => question.category !== prevSlotCategory[slot]);
        }

        let chosen;
        if (role === "GROWTH" && prevGrowthSeed) {
          let best = Infinity;
          for (const question of candidates) {
            const meta = metadata[question.id];
            const penalty = growthCategoryPenalty(growthHistory, question.category, policy.growthRecentCategoryPenalty);
            let score = random() * 10 + (meta.seed === prevGrowthSeed ? 1 : 0);
            score += penalty;
            if (penalty > 0) growthCategoryPenaltyApplied++;
            if (score < best) {
              chosen = question;
              best = score;
            }
          }
        } else chosen = candidates[Math.floor(random() * candidates.length)];

        if (!chosen) {
          candidateExhaustions++;
          hardFailures++;
          throw new Error(`selector produced no candidate at day ${day} ${role}:${slot}`);
        }
        const meta = metadata[chosen.id];
        selected[slot] = { ...chosen, role, seed: meta.seed };
        if (!questionById.has(chosen.id) || meta.role !== role) hardFailures++;
        const previous = used.get(chosen.id);
        if (previous !== undefined && day - previous <= 365) reuseViolations++;
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
      if (keepDiagnostics) schedule.push({
        day: day + 1,
        growthSlot,
        questions: Object.fromEntries(slots.map((slot) => [slot, selected[slot]])),
        diagnostics: {
          policy: policy.id,
          pairCooldownRejected,
          growthCategoryPenaltyApplied,
          minimumEligiblePool: Math.min(...Object.values(minimumPoolByRoleSlot)),
        },
      });
      else schedule.push({ day: day + 1, growthSlot, questions: selected });
    }

    return {
      schedule,
      growthHistory,
      fallbackCount,
      candidateExhaustions,
      hardFailures,
      reuseViolations,
      growthSlotCounts,
      minimumPoolByRoleSlot: Object.fromEntries(Object.entries(minimumPoolByRoleSlot).map(([key, value]) => [key, Number.isFinite(value) ? value : 0])),
      pairCooldownRejected,
      growthCategoryPenaltyApplied,
    };
  }

  return { selectSchedule };
}

const defaultSelector = createDailySelector();
export function runtimeSchedule(days, seed, options) {
  return defaultSelector.selectSchedule(days, seed, options);
}
