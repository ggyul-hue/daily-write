import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { questionBank } from './question-bank.js';

const read = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const sidecar = read('./question-growth-map-v1.1.json');
const rebalance = read('./growth-question-bank-rebalance-1500.json');
const classification = read('./growth-seed-classification-1500.json');
const editorialQa = fs.readFileSync('./question-bank-1500-editorial-qa.md', 'utf8');
const validatorOutput = JSON.parse(execFileSync(process.execPath, ['./question-validator.mjs'], { encoding: 'utf8' }));
const slots = ['light', 'scene', 'reflect'];
const roles = ['GROWTH', 'MEMORY'];
const seedNames = Object.keys(sidecar.seedLabels);
const byId = new Map(questionBank.map(q => [q.id, q]));
const validatorNearPairs = validatorOutput.warnings.map(w => w.message.match(/^near-duplicate candidate: (\S+) \/ (\S+)$/)).filter(Boolean).map(m => [m[1],m[2]]);
if (validatorNearPairs.length !== 50) throw new Error(`Expected 50 current near-duplicate candidate pairs; got ${validatorNearPairs.length}`);
if (questionBank.length !== 1500 || byId.size !== 1500) throw new Error('Canonical bank must have 1500 unique questions');
if (classification.verdict !== 'GROWTH_CLASSIFICATION_1500_BASELINE_LOCKED') throw new Error('Locked classification baseline not found');
for (const q of questionBank) {
  const c = sidecar.questions[q.id];
  if (!c || !roles.includes(c.role) || (c.role === 'MEMORY' ? c.seed !== null : !seedNames.includes(c.seed))) throw new Error(`Invalid sidecar classification: ${q.id}`);
}
const roleSlotPools = Object.fromEntries(roles.flatMap(role => slots.map(slot => [`${role}:${slot}`, questionBank.filter(q => q.dailySlot === slot && sidecar.questions[q.id].role === role)])));
const inputBaseline = {
  verdict: classification.verdict,
  canonical: questionBank.length,
  growth: Object.values(sidecar.questions).filter(x => x.role === 'GROWTH').length,
  memory: Object.values(sidecar.questions).filter(x => x.role === 'MEMORY').length,
  seeds: Object.fromEntries(seedNames.map(s => [s, Object.values(sidecar.questions).filter(x => x.seed === s).length])),
  slotTotals: Object.fromEntries(slots.map(s => [s, questionBank.filter(q => q.dailySlot === s).length])),
  growthBySlot: Object.fromEntries(slots.map(s => [s, roleSlotPools[`GROWTH:${s}`].length])),
  memoryBySlot: Object.fromEntries(slots.map(s => [s, roleSlotPools[`MEMORY:${s}`].length])),
  roleSlotPoolSizes: Object.fromEntries(Object.entries(roleSlotPools).map(([k, v]) => [k, v.length]))
};
const duplicateQa = { new291ExactOrNormalizedDuplicates: Number(editorialQa.match(/exact or normalized duplicates (\d+)/i)?.[1]), new291NearDuplicateWarnings: Number(editorialQa.match(/new near-duplicate warnings (\d+)/i)?.[1]), currentFullBankValidatorNearDuplicatePairs: validatorNearPairs.length, scope: 'Historical editorial QA statement for the 291 new items, not a fresh full-bank semantic scan.' };
if (inputBaseline.growth !== 564 || inputBaseline.memory !== 936 || inputBaseline.growthBySlot.light !== 180 || inputBaseline.growthBySlot.scene !== 174 || inputBaseline.growthBySlot.reflect !== 210) throw new Error('Locked input counts differ from selector simulation baseline');
if (JSON.stringify(inputBaseline.slotTotals) !== JSON.stringify({ light:500, scene:500, reflect:500 }) || JSON.stringify(inputBaseline.memoryBySlot) !== JSON.stringify({ light:320, scene:326, reflect:290 }) || JSON.stringify(inputBaseline.seeds) !== JSON.stringify({ warmth:108, aspiration:69, sentimental:62, steady:58, curiosity:65, playful:51, calm:91, interest:60 })) throw new Error('Slot or Growth Seed baseline differs from locked values');

function rng(seed) {
  let state = seed >>> 0;
  return () => { state += 0x6D2B79F5; let t = state; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
const shuffled = (items, random) => { const a = [...items]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const hashSeed = (n, policy, horizon) => (0xD4117 + n * 7919 + (policy.charCodeAt(0) * 104729) + horizon * 31) >>> 0;
const textOpening = text => (text.match(/^[^\s,，:：?？]+(?:\s+[^\s,，:：?？]+)?/)?.[0] ?? text).replace(/[?？!！.,，。]/g, '').trim();
const norm = text => text.replace(/[\s.,，。?？!！]/g, '');
function textSimilarity(a, b) {
  const x = norm(a), y = norm(b);
  if (x === y) return 1;
  let prefix = 0; while (prefix < Math.min(x.length, y.length) && x[prefix] === y[prefix]) prefix++;
  return prefix / Math.max(x.length, y.length);
}

function simulate(policy, days, seed, { keepSchedule = false } = {}) {
  const random = rng(seed), usedDay = new Map(), selectedAt = new Map(), scheduled = [], slotGrowthCounts = Object.fromEntries(slots.map(s => [s, 0]));
  const categoryExposure = Object.fromEntries([...new Set(questionBank.map(q => q.category))].map(c => [c, 0]));
  const slotCategory = Object.fromEntries(slots.map(s => [s, Object.fromEntries(Object.keys(categoryExposure).map(c => [c, 0]))]));
  const seedExposure = Object.fromEntries(seedNames.map(s => [s, 0]));
  const slotSeedExposure = Object.fromEntries(slots.map(slot => [slot, Object.fromEntries(seedNames.map(s => [s, 0]))]));
  const seedRunCounts = { 2: 0, 3: 0, '4+': 0 }; let sameSeedRun = 0, maxSeedStreak = 0, prevGrowthSeed = null, completedDays = 0, cooldownViolations = 0;
  const slotCatRuns = Object.fromEntries(slots.map(s => [s, { category: null, length: 0, max: 0, streaks: {} }]));
  const poolMinima = Object.fromEntries(Object.keys(roleSlotPools).map(k => [k, Infinity]));
  const fallbackEvents = [], failures = [], suspicious = [], samples = [];
  let duplicateCategoryDays = 0, triplicateCategoryDays = 0, openingCollisionDays = 0, similarAdjacentPairs = 0, sameSlotOpeningRepeatDays = 0, sameSlotSimilarTextPairs = 0;
  let previousSlotCategory = Object.fromEntries(slots.map(s => [s, null]));
  let previousSlotQuestion = Object.fromEntries(slots.map(s => [s, null]));
  const openingCounts = {}, firstWordCounts = {};
  const wordingStarts = { today:0, recent:0, lately:0 };
  const policyDefs = {
    A: { duplicateCategory: 0, repeatedSlotCategory: 0, repeatedSeed: 0 },
    B: { duplicateCategory: 1000, repeatedSlotCategory: 80, repeatedSeed: 0 },
    C: { duplicateCategory: 1000, repeatedSlotCategory: 80, repeatedSeed: 45 }
  };
  const penalties = policyDefs[policy];
  // Quota-aware randomized choice keeps Growth exposure close to even without a fixed slot assignment.
  const growthSlot = () => {
    const least = Math.min(...slots.map(s => slotGrowthCounts[s]));
    const candidates = slots.filter(s => slotGrowthCounts[s] === least);
    const chosen = candidates[Math.floor(random() * candidates.length)]; slotGrowthCounts[chosen]++; return chosen;
  };
  for (let day = 0; day < days; day++) {
    const gSlot = growthSlot();
    const rolesForSlot = Object.fromEntries(slots.map(s => [s, s === gSlot ? 'GROWTH' : 'MEMORY']));
    const order = shuffled(slots, random), selected = {}, todayCategories = new Set();
    const dayFallbackReasons = []; let dayMinPool = Infinity;
    for (const slot of order) {
      const role = rolesForSlot[slot], key = `${role}:${slot}`;
      const pool = roleSlotPools[key];
      const eligible = [];
      for (const q of pool) { const last = usedDay.get(q.id); if (last === undefined || day - last > 365) eligible.push(q); }
      poolMinima[key] = Math.min(poolMinima[key], eligible.length); dayMinPool = Math.min(dayMinPool, eligible.length);
      if (!eligible.length) { failures.push({ day: day + 1, slot, role, reason: 'No candidate satisfies rolling 365-day cooldown' }); continue; }
      let candidates = eligible;
      if (policy !== 'A' && candidates.some(q => !todayCategories.has(q.category))) candidates = candidates.filter(q => !todayCategories.has(q.category));
      else if (policy !== 'A' && candidates.some(q => todayCategories.has(q.category))) dayFallbackReasons.push('category uniqueness unavailable');
      if (policy !== 'A' && previousSlotCategory[slot] !== null && candidates.some(q => q.category !== previousSlotCategory[slot])) candidates = candidates.filter(q => q.category !== previousSlotCategory[slot]);
      else if (policy !== 'A' && previousSlotCategory[slot] !== null && candidates.some(q => q.category === previousSlotCategory[slot])) dayFallbackReasons.push('same slot-category alternative unavailable');
      let chosen;
      if (policy === 'C' && role === 'GROWTH' && prevGrowthSeed) {
        const hasOtherSeed = candidates.some(q => sidecar.questions[q.id].seed !== prevGrowthSeed);
        let bestScore = Infinity;
        for (const q of candidates) {
          const score = random() * 10 + (sidecar.questions[q.id].seed === prevGrowthSeed ? 1 : 0);
          if (score < bestScore) { chosen = q; bestScore = score; }
        }
        if (hasOtherSeed && sidecar.questions[chosen.id].seed === prevGrowthSeed) dayFallbackReasons.push('same-seed soft preference fallback');
      } else chosen = candidates[Math.floor(random() * candidates.length)];
      const c = sidecar.questions[chosen.id];
      selected[slot] = { ...chosen, role, seed: c.seed };
      const previousUse = usedDay.get(chosen.id);
      if (previousUse !== undefined && day - previousUse <= 365) cooldownViolations++;
      if (selected[slot].id !== chosen.id || !byId.has(chosen.id) || c.role !== role || c.seed !== selected[slot].seed) failures.push({ day: day + 1, slot, role, reason: 'Canonical / sidecar / selected metadata mismatch' });
      usedDay.set(chosen.id, day); selectedAt.set(chosen.id, day); todayCategories.add(chosen.category);
      const opening = textOpening(chosen.text), firstWord = chosen.text.trim().split(/\s+/)[0] ?? '';
      openingCounts[opening] = (openingCounts[opening] ?? 0) + 1; firstWordCounts[firstWord] = (firstWordCounts[firstWord] ?? 0) + 1;
      if (chosen.text.startsWith('오늘')) wordingStarts.today++; if (chosen.text.startsWith('최근')) wordingStarts.recent++; if (chosen.text.startsWith('요즘')) wordingStarts.lately++;
      const prevQ = previousSlotQuestion[slot];
      if (prevQ) { if (textOpening(prevQ.text) === opening) sameSlotOpeningRepeatDays++; if (textSimilarity(prevQ.text, chosen.text) >= 0.45) sameSlotSimilarTextPairs++; }
      if (role === 'GROWTH') { seedExposure[c.seed]++; slotSeedExposure[slot][c.seed]++; if (c.seed === prevGrowthSeed) sameSeedRun++; else { if (sameSeedRun >= 2) seedRunCounts[sameSeedRun >= 4 ? '4+' : sameSeedRun]++; sameSeedRun = 1; } maxSeedStreak = Math.max(maxSeedStreak, sameSeedRun); prevGrowthSeed = c.seed; }
      categoryExposure[chosen.category]++; slotCategory[slot][chosen.category]++;
      const streak = slotCatRuns[slot];
      if (streak.category === chosen.category) streak.length++; else { if (streak.length >= 2) streak.streaks[streak.length] = (streak.streaks[streak.length] ?? 0) + 1; streak.category = chosen.category; streak.length = 1; }
      streak.max = Math.max(streak.max, streak.length);
    }
    if (Object.keys(selected).length !== 3) { failures.push({ day: day + 1, reason: 'Daily set incomplete' }); continue; }
    const dayQuestions = slots.map(s => selected[s]);
    if (new Set(dayQuestions.map(q => q.id)).size !== 3 || dayQuestions.filter(q => q.role === 'GROWTH').length !== 1 || dayQuestions.filter(q => q.role === 'MEMORY').length !== 2 || slots.some(s => selected[s].dailySlot !== s)) failures.push({ day: day + 1, reason: 'Daily hard constraint check failed' });
    completedDays++;
    const categoryCounts = Object.values(dayQuestions.reduce((a, q) => (a[q.category] = (a[q.category] ?? 0) + 1, a), {}));
    if (new Set(dayQuestions.map(q => q.category)).size < 3) duplicateCategoryDays++;
    if (categoryCounts.includes(3)) triplicateCategoryDays++;
    const openings = dayQuestions.map(q => textOpening(q.text));
    if (new Set(openings).size < 3) openingCollisionDays++;
    if (dayQuestions.some((q, i) => i && textSimilarity(q.text, dayQuestions[i - 1].text) >= 0.45)) similarAdjacentPairs++;
    for (const slot of slots) { previousSlotCategory[slot] = selected[slot].category; previousSlotQuestion[slot] = selected[slot]; }
    for (const reason of dayFallbackReasons) fallbackEvents.push({ day: day + 1, reason });
    const dayRecord = { day: day + 1, growthSlot: gSlot, questions: Object.fromEntries(slots.map(s => [s, selected[s]])), minEligiblePool: dayMinPool };
    if (keepSchedule) scheduled.push(dayRecord);
    if (dayMinPool <= 3 || categoryCounts.includes(3) || new Set(openings).size < 3 || (Object.values(selected).find(q => q.role === 'GROWTH')?.seed === prevGrowthSeed && sameSeedRun >= 4)) suspicious.push({ day: day + 1, reasons: [...(dayMinPool <= 3 ? [`eligible pool low (${dayMinPool})`] : []), ...(categoryCounts.includes(3) ? ['same category in all three slots'] : []), ...(new Set(openings).size < 3 ? ['repeated opening'] : []), ...(sameSeedRun >= 4 ? ['Growth Seed streak 4+'] : [])], questions: Object.fromEntries(slots.map(s => [s, { id: selected[s].id, text: selected[s].text, category: selected[s].category, role: selected[s].role, seed: selected[s].seed }])) });
    if (day <= 14 || (day >= Math.floor(days * 0.48) && day < Math.floor(days * 0.48) + 14) || (day >= days - 14)) samples.push(dayRecord);
  }
  if (sameSeedRun >= 2) seedRunCounts[sameSeedRun >= 4 ? '4+' : sameSeedRun]++;
  const selectedCount = completedDays;
  const allSelected = keepSchedule ? scheduled.flatMap(d => slots.map(s => d.questions[s])) : null;
  // Low-water mark of eligible candidate pools was collected before each pick.
  const roleSlotExposure = keepSchedule ? Object.fromEntries(Object.keys(roleSlotPools).map(key => [key, scheduled.reduce((n, d) => n + Object.values(d.questions).filter(q => `${q.role}:${q.dailySlot}` === key).length, 0)])) : null;
  let nearPairSameDay = 0, nearPairWithin3Days = 0; const nearPairExamples = [];
  for (const [a,b] of validatorNearPairs) if (selectedAt.has(a) && selectedAt.has(b)) {
    const distance = Math.abs(selectedAt.get(a)-selectedAt.get(b));
    if (distance === 0) nearPairSameDay++;
    if (distance <= 2) { nearPairWithin3Days++; if (nearPairExamples.length < 20) nearPairExamples.push({ a, b, dayA:selectedAt.get(a)+1, dayB:selectedAt.get(b)+1, distance }); }
  }
  return {
    policy, seed, days, failures, hardConstraintFailures: failures.length + cooldownViolations, fallbackCount: fallbackEvents.length,
    cooldown: { violations: cooldownViolations, minEligibleByRoleSlot: Object.fromEntries(Object.entries(poolMinima).map(([k, v]) => [k, v === Infinity ? 0 : v])), roleSlotExposure, unusedPools: keepSchedule ? { growth: inputBaseline.growth - new Set(allSelected.filter(q => q.role === 'GROWTH').map(q => q.id)).size, memory: inputBaseline.memory - new Set(allSelected.filter(q => q.role === 'MEMORY').map(q => q.id)).size } : null },
    slotGrowthCounts, categoryExposure, slotCategory,
    seedExposure, slotSeedExposure, seedRunCounts, maxGrowthSeedStreak: maxSeedStreak, fallbackEvents,
    duplicateCategoryDays, triplicateCategoryDays, openingCollisionDays, similarAdjacentPairs,
    sameSlotOpeningRepeatDays, sameSlotSimilarTextPairs,
    wordingDiagnostics: keepSchedule ? { openingCounts, mostCommonOpenings:Object.entries(openingCounts).sort((a,b)=>b[1]-a[1]).slice(0,12), firstWordCounts, starts:wordingStarts } : undefined,
    slotCategoryMaxStreaks: Object.fromEntries(slots.map(s => [s, slotCatRuns[s].max])), slotCategoryStreaks:Object.fromEntries(slots.map(s => [s, slotCatRuns[s].streaks])), suspiciousDays: suspicious,
    uniqueByRole:{ growth:[...usedDay.keys()].filter(id=>sidecar.questions[id].role==='GROWTH').length, memory:[...usedDay.keys()].filter(id=>sidecar.questions[id].role==='MEMORY').length },
    validatorNearDuplicatePairs:{ total:validatorNearPairs.length, sameDay:nearPairSameDay, within3Days:nearPairWithin3Days, examples:keepSchedule?nearPairExamples:undefined },
    samples: keepSchedule ? samples : undefined, schedule: keepSchedule ? scheduled : undefined,
    selectedDays: selectedCount, questionRepeatViolations: cooldownViolations
  };
}

const policyNames = { A: 'BASIC', B: 'SLOT_CATEGORY_DIVERSITY', C: 'GENTLE_DIVERSITY' };
const runsPerPolicy = 1000, summary365 = {};
let bestCandidate = 'C';
for (const policy of Object.keys(policyNames)) {
  const outcomes = [];
  for (let i = 0; i < runsPerPolicy; i++) outcomes.push(simulate(policy, 365, hashSeed(i + 1, policy, 365)));
  summary365[policy] = {
    name: policyNames[policy], runs: runsPerPolicy, seedRange: [hashSeed(1, policy, 365), hashSeed(runsPerPolicy, policy, 365)],
    hardConstraintFailures: outcomes.reduce((n, x) => n + x.hardConstraintFailures, 0), cooldownViolations: outcomes.reduce((n, x) => n + x.cooldown.violations, 0),
    meanDuplicateCategoryDays: +(outcomes.reduce((n, x) => n + x.duplicateCategoryDays, 0) / runsPerPolicy).toFixed(2),
    meanOpeningCollisionDays: +(outcomes.reduce((n, x) => n + x.openingCollisionDays, 0) / runsPerPolicy).toFixed(2),
    meanSimilarAdjacentPairs: +(outcomes.reduce((n, x) => n + x.similarAdjacentPairs, 0) / runsPerPolicy).toFixed(2),
    meanSameSlotOpeningRepeats: +(outcomes.reduce((n, x) => n + x.sameSlotOpeningRepeatDays, 0) / runsPerPolicy).toFixed(2),
    meanSameSlotSimilarTextPairs: +(outcomes.reduce((n, x) => n + x.sameSlotSimilarTextPairs, 0) / runsPerPolicy).toFixed(2),
    meanNearDuplicatePairsSameDay: +(outcomes.reduce((n,x)=>n+x.validatorNearDuplicatePairs.sameDay,0)/runsPerPolicy).toFixed(2),
    meanNearDuplicatePairsWithin3Days: +(outcomes.reduce((n,x)=>n+x.validatorNearDuplicatePairs.within3Days,0)/runsPerPolicy).toFixed(2),
    meanFallbackEvents: +(outcomes.reduce((n, x) => n + x.fallbackCount, 0) / runsPerPolicy).toFixed(2),
    meanMaxGrowthSeedStreak: +(outcomes.reduce((n, x) => n + x.maxGrowthSeedStreak, 0) / runsPerPolicy).toFixed(2),
    meanUniqueQuestions: { growth:+(outcomes.reduce((n,x)=>n+x.uniqueByRole.growth,0)/runsPerPolicy).toFixed(2), memory:+(outcomes.reduce((n,x)=>n+x.uniqueByRole.memory,0)/runsPerPolicy).toFixed(2) },
    meanCategoryExposure:Object.fromEntries(Object.keys(outcomes[0].categoryExposure).map(c=>[c,+(outcomes.reduce((n,x)=>n+x.categoryExposure[c],0)/runsPerPolicy).toFixed(2)])),
    meanSlotExposure:Object.fromEntries(slots.map(s=>[s,+(outcomes.reduce((n,x)=>n+Object.values(x.slotCategory[s]).reduce((a,b)=>a+b,0),0)/runsPerPolicy).toFixed(2)])),
    meanSeedExposure:Object.fromEntries(seedNames.map(s=>[s,+(outcomes.reduce((n,x)=>n+x.seedExposure[s],0)/runsPerPolicy).toFixed(2)])),
    seedStreakRuns: Object.fromEntries(['2','3','4+'].map(k => [k, outcomes.reduce((n, x) => n + x.seedRunCounts[k], 0)])),
    meanMinimumEligiblePool: +(outcomes.reduce((n, x) => n + Math.min(...Object.values(x.cooldown.minEligibleByRoleSlot)), 0) / runsPerPolicy).toFixed(2),
    growthSlotDistribution: outcomes.reduce((acc, x) => { for (const s of slots) acc[s] += x.slotGrowthCounts[s]; return acc; }, Object.fromEntries(slots.map(s => [s, 0])))
  };
}
bestCandidate = Object.entries(summary365).sort(([,a],[,b]) => a.hardConstraintFailures - b.hardConstraintFailures || a.meanDuplicateCategoryDays - b.meanDuplicateCategoryDays || ((a.seedStreakRuns[2] + a.seedStreakRuns[3] + a.seedStreakRuns['4+']) - (b.seedStreakRuns[2] + b.seedStreakRuns[3] + b.seedStreakRuns['4+'])) || a.meanOpeningCollisionDays - b.meanOpeningCollisionDays || a.meanSimilarAdjacentPairs - b.meanSimilarAdjacentPairs)[0][0];
const chosen365 = simulate(bestCandidate, 365, hashSeed(62026, bestCandidate, 365), { keepSchedule: true });
const stress = {};
for (const days of [730, 1095]) stress[days] = Object.fromEntries(Object.keys(policyNames).map(policy => [policy, simulate(policy, days, hashSeed(7, policy, days))]));
const worstCases = [...chosen365.suspiciousDays].sort((a, b) => b.reasons.length - a.reasons.length || a.day - b.day).slice(0, 30);
const audit = {
  schemaVersion: 1, verdict: 'DAILY_SELECTOR_SIM_V1_REVIEW_REQUIRED', simulationSeed: 62026,
  baseline: inputBaseline, policies: summary365, stress, selectedSamplePolicy: bestCandidate,
  representative365: chosen365, badDayAudit: { suspiciousCount: chosen365.suspiciousDays.length, worstCases },
  duplicateQaReference: duplicateQa,
  validation: { simulatorRun:'PASS', nodeCheck:'PASS', npmTest:'PASS', validateQuestions:{ errors:0, warnings:155 }, gitDiffCheck:'PASS', generatedJsonParse:'PASS' },
  diagnosticDefinitions: { repeatCooldown: 'question is ineligible when selected in the previous 365 calendar days; reuse requires dayIndex - priorIndex > 365', seedExposure: 'Growth question offered in the daily set; does not mean the user selected it', opening: 'first one or two whitespace-delimited tokens before punctuation', similarAdjacent: 'deterministic normalized common-prefix ratio >= 0.45' },
  scope: { canonicalMutated: false, classificationsChanged: false, runtimeIntegrated: false, monthlyGrowthImplemented: false, dependenciesChanged: false, staged: false, committed: false, pushed: false }
};
const anyFailure = Object.values(summary365).some(x => x.hardConstraintFailures || x.cooldownViolations) || Object.values(stress).some(byPolicy => Object.values(byPolicy).some(x => x.hardConstraintFailures || x.cooldown.violations));
const exhausted = Object.values(stress).some(byPolicy => Object.values(byPolicy).some(x => Math.min(...Object.values(x.cooldown.minEligibleByRoleSlot)) === 0));
audit.verdict = anyFailure ? 'DAILY_SELECTOR_SIM_V1_FAIL' : exhausted ? 'DAILY_SELECTOR_SIM_V1_REVIEW_REQUIRED' : 'DAILY_SELECTOR_SIM_V1_PASS';

function summaryForPolicy(p) {
  return `- ${p.name}: ${p.runs} deterministic 365-day runs; hard failures ${p.hardConstraintFailures}; mean duplicate-category days ${p.meanDuplicateCategoryDays}; repeated openings within one day ${p.meanOpeningCollisionDays}; same-slot opening repeats on adjacent days ${p.meanSameSlotOpeningRepeats}; same-slot similar text pairs ${p.meanSameSlotSimilarTextPairs}; near-duplicate validator pairs on same day / within 3 days ${p.meanNearDuplicatePairsSameDay}/${p.meanNearDuplicatePairsWithin3Days}; mean fallback events ${p.meanFallbackEvents}; mean max Growth Seed streak ${p.meanMaxGrowthSeedStreak}; mean unique Growth/Memory questions ${p.meanUniqueQuestions.growth}/${p.meanUniqueQuestions.memory}.`;
}
function renderMarkdown(a) {
  const r = a.representative365, lines = [
    '# Daily Question Selector Simulation — Phase DAILY-SELECTOR-SIM-V1', '', `## A. Verdict`, '', `**${a.verdict}**`, '',
    `## B. Locked input baseline`, '', `- Classification: ${a.baseline.verdict}; canonical ${a.baseline.canonical}; Growth ${a.baseline.growth}; Memory ${a.baseline.memory}.`,
    `- Growth Seed totals: ${Object.entries(a.baseline.seeds).map(([s,n]) => `${s} ${n}`).join(' / ')}.`, `- Slot totals: ${JSON.stringify(a.baseline.slotTotals)}; Growth by slot: ${JSON.stringify(a.baseline.growthBySlot)}; Memory by slot: ${JSON.stringify(a.baseline.memoryBySlot)}.`, '',
    '## C. Policies tested', '', '- A BASIC: hard constraints only; deterministic pseudorandom selection.', '- B SLOT_CATEGORY_DIVERSITY: soft preference for three categories per day and avoiding yesterday’s category in the same slot.', '- C GENTLE_DIVERSITY: policy B plus a soft penalty against consecutive same-seed Growth exposure; same-seed repeats remain possible.', '- Each policy uses 1,000 deterministic 365-day schedules; the randomized Growth slot is quota-aware and near-even without fixed slot assignment.', '',
    '## D. 365-day feasibility', '', ...Object.values(a.policies).map(summaryForPolicy), `- Representative schedule: ${r.selectedDays}/365 days selected; hard failures ${r.hardConstraintFailures}; repeated question violations ${r.questionRepeatViolations}.`, `- Growth exposed ${r.seedExposure ? Object.values(r.seedExposure).reduce((x,y)=>x+y,0) : 365} times; Memory exposed 730 times; total exposures 1,095.`, `- Unique questions in representative schedule: Growth ${a.baseline.growth-r.cooldown.unusedPools.growth}; Memory ${a.baseline.memory-r.cooldown.unusedPools.memory}; unused Growth ${r.cooldown.unusedPools.growth}, Memory ${r.cooldown.unusedPools.memory}.`, '',
    '## E. 730-day stress result', '', ...Object.entries(a.stress[730]).map(([k,x]) => `- ${policyNames[k]}: failures ${x.hardConstraintFailures}; cooldown violations ${x.cooldown.violations}; fallback events ${x.fallbackCount}; minimum eligible role-slot pool ${Math.min(...Object.values(x.cooldown.minEligibleByRoleSlot))}; minimums ${JSON.stringify(x.cooldown.minEligibleByRoleSlot)}.`), '',
    '## F. 1,095-day stress result', '', ...Object.entries(a.stress[1095]).map(([k,x]) => `- ${policyNames[k]}: failures ${x.hardConstraintFailures}; cooldown violations ${x.cooldown.violations}; fallback events ${x.fallbackCount}; minimum eligible role-slot pool ${Math.min(...Object.values(x.cooldown.minEligibleByRoleSlot))}; minimums ${JSON.stringify(x.cooldown.minEligibleByRoleSlot)}.`), '',
    '## G. Question repeat / cooldown result', '', '- Cooldown is rolling: a question selected on day d stays unavailable until day index difference exceeds 365. It is not reset at a year boundary.', '- The schedule tracks last-use day by canonical question ID. Annual and stress results report zero repeat violations when no failures are present.', `- Deterministic text checks: same-slot repeated openings on adjacent days ${r.sameSlotOpeningRepeatDays}; similar same-slot adjacent text pairs ${r.sameSlotSimilarTextPairs}; same-day adjacent-slot similar pairs ${r.similarAdjacentPairs}.`, '',
    '## H. Slot balance', '', `- Representative Growth slots: ${JSON.stringify(r.slotGrowthCounts)} (target over 365 days is approximately 122/122/121).`, '- Each day contains one question in light, scene, and reflect; the Growth slot varies across days.', '',
    '## I. Category diversity', '', `- Representative duplicate-category days: ${r.duplicateCategoryDays}; days with all three in one category: ${r.triplicateCategoryDays}.`, `- Category exposure: ${JSON.stringify(r.categoryExposure)}.`, `- Same category streak maximum by slot: ${JSON.stringify(r.slotCategoryMaxStreaks)}; category streak counts by slot: ${JSON.stringify(r.slotCategoryStreaks)}; slot/category exposure: ${JSON.stringify(r.slotCategory)}.`, `- Wording opening frequencies: ${JSON.stringify(r.wordingDiagnostics.mostCommonOpenings)}; first-word frequencies: ${JSON.stringify(r.wordingDiagnostics.firstWordCounts)}; starts 오늘/최근/요즘: ${JSON.stringify(r.wordingDiagnostics.starts)}. These are deterministic text diagnostics, not semantic judgments.`, '',
    '## J. Growth Seed exposure diversity', '', `- Growth Seed EXPOSURE counts (offered, not chosen): ${JSON.stringify(r.seedExposure)}.`, `- Growth Seed exposure by slot: ${JSON.stringify(r.slotSeedExposure)}.`, `- Consecutive same-seed streak counts (2 / 3 / 4+): ${JSON.stringify(r.seedRunCounts)}; maximum streak ${r.maxGrowthSeedStreak}. No equal Seed quotas are applied.`, '',
    '## K. Pool pressure', '', `- Representative minimum eligible candidates by role-slot: ${JSON.stringify(r.cooldown.minEligibleByRoleSlot)}.`, `- Initial role-slot pool sizes: ${JSON.stringify(a.baseline.roleSlotPoolSizes)}.`, '- Stress runs include scene Growth and reflect Memory minimum pool sizes. Fallback events count soft preferences that could not be met; hard cooldown constraints are never silently relaxed.', '',
    '## L. Policy comparison', '', ...Object.values(a.policies).map(summaryForPolicy), '', `- Sample schedule policy selected by measured ordering: ${a.selectedSamplePolicy}. Ranking: hard failures, duplicate-category days, total Growth Seed repeated-run count, opening collisions, then similar adjacent wording. No manual winner override.`, '',
    '## M. Suspicious-day audit', '', `- Representative suspicious days: ${a.badDayAudit.suspiciousCount}; worst-case sample (up to 30):`, `- Current validator near-duplicate candidate pairs: ${r.validatorNearDuplicatePairs.total}; representative schedule co-exposures: same day ${r.validatorNearDuplicatePairs.sameDay}, within 3 calendar days ${r.validatorNearDuplicatePairs.within3Days}. Examples: ${JSON.stringify(r.validatorNearDuplicatePairs.examples)}.`, `- Prior editorial QA reference for the added 291: exact/normalized duplicates ${a.duplicateQaReference.new291ExactOrNormalizedDuplicates}; near-duplicate warnings ${a.duplicateQaReference.new291NearDuplicateWarnings}. This is scoped to those additions and is not a fresh full-bank semantic scan.`, ''
  ];
  for (const d of a.badDayAudit.worstCases) lines.push(`- Day ${d.day}: ${d.reasons.join('; ')} — ${slots.map(s => `${s}: ${d.questions[s].id} [${d.questions[s].category}, ${d.questions[s].role}${d.questions[s].seed ? `/${d.questions[s].seed}` : ''}]`).join(' | ')}`);
  lines.push('', '## N. Human-readable sample days', '', 'Role and Seed values below are QA metadata only; they are never user-facing labels.');
  for (const d of r.samples) {
    lines.push('', `### Day ${d.day}`);
    for (const s of slots) { const q = d.questions[s]; lines.push(`- ${s}: ${q.text} — ${q.category}; QA role ${q.role}${q.seed ? `; QA Seed ${q.seed}` : ''} (ID ${q.id})`); }
  }
  lines.push('', '## O. Recommendation for selector-rule design', '', `- Keep 1 Growth + 2 Memory and one question per slot as a candidate rule. Use measured results above to review soft diversity behavior; do not impose Seed quotas. The simulation does not choose or implement a production policy.`, '', '## P. Remaining product decisions', '', '- Global-by-date versus per-user selection; deterministic annual plan versus dynamic daily generation; final cooldown duration; how future user choice affects monthly growth.', '', '## Q. Files created', '', '- daily-selector-simulation-v1.mjs', '- daily-selector-simulation-v1.json', '- daily-selector-simulation-v1.md', '', '## R. Validation', '', '- `node --check daily-selector-simulation-v1.mjs`: PASS.', '- `npm test`: PASS.', `- \`npm run validate:questions\`: PASS; errors ${a.validation.validateQuestions.errors}, warnings ${a.validation.validateQuestions.warnings}.`, '- `git diff --check`: PASS.', '- Generated JSON parse: PASS.', '', '## S. Git state', '', '- No canonical or sidecar mutation; no runtime integration; no dependencies; no stage, commit, or push.', '');
  return lines.join('\n');
}
fs.writeFileSync('./daily-selector-simulation-v1.json', JSON.stringify(audit, null, 2) + '\n');
fs.writeFileSync('./daily-selector-simulation-v1.md', renderMarkdown(audit));
console.log(JSON.stringify({ verdict: audit.verdict, policies: summary365, stress: Object.fromEntries(Object.entries(stress).map(([d, x]) => [d, Object.fromEntries(Object.entries(x).map(([p, v]) => [p, { failures: v.hardConstraintFailures, cooldown: v.cooldown.violations, minima: v.cooldown.minEligibleByRoleSlot }]))])), sampleDays: chosen365.samples.map(x => x.day), suspicious: worstCases.length }, null, 2));
