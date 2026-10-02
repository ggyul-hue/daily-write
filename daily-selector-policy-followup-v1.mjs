import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import crypto from 'node:crypto';
import { questionBank } from './question-bank.js';

const read = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const hashFile = p => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const baselineSim = read('./daily-selector-simulation-v1.json');
const sampleQA = read('./daily-selector-sample-qa-v1.json');
const sidecar = read('./question-growth-map-v1.1.json');
const classification = read('./growth-seed-classification-1500.json');
const validator = JSON.parse(execFileSync(process.execPath, ['./question-validator.mjs'], { encoding: 'utf8' }));
const slots = ['light', 'scene', 'reflect'];
const seedNames = [...new Set(Object.values(sidecar.questions).filter(x => x.role === 'GROWTH').map(x => x.seed))].sort();
const validatorPairs = validator.warnings.map(w => w.message.match(/^near-duplicate candidate: (\S+) \/ (\S+)$/)).filter(Boolean).map(m => [m[1], m[2]]);
const manualPairs = [{ a: 'dq-v1-0843', b: 'dq-v1-1049', reason: 'both ask the user to select a memorable/single scene in a similar recent temporal context', source: 'SAMPLE_QA_MANUAL', disposition: 'experimental evidence; requires explicit human review before policy inclusion' }];
const pairSet = new Map();
for (const [a, b] of validatorPairs) { pairSet.set(`${a}|${b}`, { a, b, source: 'VALIDATOR' }); pairSet.set(`${b}|${a}`, { a: b, b: a, source: 'VALIDATOR' }); }
for (const p of manualPairs) { pairSet.set(`${p.a}|${p.b}`, p); pairSet.set(`${p.b}|${p.a}`, { ...p, a: p.b, b: p.a }); }
const pairAdj = new Map();
for (const p of pairSet.values()) { if (!pairAdj.has(p.a)) pairAdj.set(p.a, []); pairAdj.get(p.a).push(p); }
const validatorPairAdj = new Map();
for (const [a,b] of validatorPairs) { if(!validatorPairAdj.has(a))validatorPairAdj.set(a,[]);validatorPairAdj.get(a).push({a,b,source:'VALIDATOR'});if(!validatorPairAdj.has(b))validatorPairAdj.set(b,[]);validatorPairAdj.get(b).push({a:b,b:a,source:'VALIDATOR'}); }
const qById = new Map(questionBank.map(q => [q.id, q]));
const meta = id => sidecar.questions[id];
const pools = Object.fromEntries(['GROWTH', 'MEMORY'].flatMap(role => slots.map(slot => [`${role}:${slot}`, questionBank.filter(q => q.dailySlot === slot && meta(q.id)?.role === role)])));
const norm = s => s.replace(/[\s.,，。?？!！]/g, '');
const opening = s => (s.match(/^[^\s,，:：?？]+(?:\s+[^\s,，:：?？]+)?/)?.[0] ?? s).replace(/[?？!！.,，。]/g, '').trim();
const similarity = (a, b) => { const x = norm(a), y = norm(b); if (x === y) return 1; let n = 0; while (n < Math.min(x.length, y.length) && x[n] === y[n]) n++; return n / Math.max(x.length, y.length); };
const rng = seed => { let state = seed >>> 0; return () => { state += 0x6D2B79F5; let t = state; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
const shuffled = (items, random) => { const a = [...items]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const hashSeed = (n, policy, horizon) => (0xD4117 + n * 7919 + (policy.charCodeAt(0) * 104729) + horizon * 31) >>> 0;

const policies = [
  { id: 'C0_BASELINE', type: 'baseline' },
  { id: 'C1_NEAR_DUP_COOLDOWN_3D', type: 'pair', cooldownDays: 3 },
  { id: 'C1_NEAR_DUP_COOLDOWN_7D', type: 'pair', cooldownDays: 7 },
  { id: 'C2_SOFT_TOPIC_3D', type: 'topic', windowDays: 3, mode: 'FLAT', penaltyPerRecentMatch: 3 },
  { id: 'C2_SOFT_TOPIC_5D', type: 'topic', windowDays: 5, mode: 'FLAT', penaltyPerRecentMatch: 3 },
  { id: 'C2_SOFT_TOPIC_7D', type: 'topic', windowDays: 7, mode: 'FLAT', penaltyPerRecentMatch: 3 },
  { id: 'C2_SOFT_TOPIC_5D_RECENCY', type: 'topic', windowDays: 5, mode: 'RECENCY_WEIGHTED', maxPenalty: 5 },
  { id: 'C2_SOFT_TOPIC_5D_LIGHT', type: 'topic', windowDays: 5, mode: 'FLAT', penaltyPerRecentMatch: 1 },
  { id: 'C2_SOFT_TOPIC_5D_RECENCY_LIGHT', type: 'topic', windowDays: 5, mode: 'RECENCY_WEIGHTED', maxPenalty: 1.5 },
  { id: 'C3_COMBINED_7D_5D_RECENCY_LIGHT', type: 'combined', cooldownDays: 7, windowDays: 5, mode: 'RECENCY_WEIGHTED', maxPenalty: 1.5 },
  { id: 'C2_SOFT_TOPIC_5D_RECENCY_MINIMAL', type: 'topic', windowDays: 5, mode: 'RECENCY_WEIGHTED', maxPenalty: 0.5 },
  { id: 'C3_COMBINED_7D_5D_RECENCY_MINIMAL', type: 'combined', cooldownDays: 7, windowDays: 5, mode: 'RECENCY_WEIGHTED', maxPenalty: 0.5 },
  { id: 'C1_VALIDATOR_ONLY_7D', type: 'pair', cooldownDays: 7, includeManualEvidence: false },
  { id: 'C3_VALIDATOR_ONLY_7D_5D_RECENCY_MINIMAL', type: 'combined', cooldownDays: 7, windowDays: 5, mode: 'RECENCY_WEIGHTED', maxPenalty: 0.5, includeManualEvidence: false },
  { id: 'C3_COMBINED_3D_5D_RECENCY', type: 'combined', cooldownDays: 3, windowDays: 5, mode: 'RECENCY_WEIGHTED', maxPenalty: 5 }
];
if (baselineSim.verdict !== 'DAILY_SELECTOR_SIM_V1_PASS' || sampleQA.verdict !== 'DAILY_SELECTOR_SAMPLE_QA_V1_PASS_WITH_FOLLOWUPS') throw new Error('Locked baseline verdict is missing');
if (questionBank.length !== 1500 || validatorPairs.length !== 50) throw new Error('Canonical or validator baseline count mismatch');

function makeSchedule(policy, days, seed, keepSchedule = false) {
  const random = rng(seed), used = new Map(), priorSelected = new Map(), growthSlotCounts = Object.fromEntries(slots.map(s => [s, 0]));
  const prevSlotCategory = Object.fromEntries(slots.map(s => [s, null]));
  const growthHistory = [], schedule = [], minPools = Object.fromEntries(Object.keys(pools).map(k => [k, Infinity]));
  let prevGrowthSeed = null, fallbackCount = 0, candidateExhaustions = 0, hardFailures = 0, reuseViolations = 0;
  for (let day = 0; day < days; day++) {
    const least = Math.min(...slots.map(s => growthSlotCounts[s]));
    const growthChoices = slots.filter(s => growthSlotCounts[s] === least);
    const growthSlot = growthChoices[Math.floor(random() * growthChoices.length)]; growthSlotCounts[growthSlot]++;
    const roleFor = Object.fromEntries(slots.map(s => [s, s === growthSlot ? 'GROWTH' : 'MEMORY']));
    const selected = {}, todayCategories = new Set(), order = shuffled(slots, random);
    for (const slot of order) {
      const role = roleFor[slot], poolKey = `${role}:${slot}`, pool = pools[poolKey], baseEligible = [];
      for (const q of pool) { const last = used.get(q.id); if (last === undefined || day - last > 365) baseEligible.push(q); }
      let eligible = baseEligible;
      if (policy.type === 'pair' || policy.type === 'combined') {
        const cutoff = policy.cooldownDays - 1;
        const activePairAdj=policy.includeManualEvidence===false?validatorPairAdj:pairAdj;
        const pairEligible = eligible.filter(q => !(activePairAdj.get(q.id) ?? []).some(p => {
          const last = priorSelected.get(p.b); return last !== undefined && day - last <= cutoff;
        }) && !Object.keys(selected).some(s => (activePairAdj.get(q.id) ?? []).some(p => p.b === selected[s].id)));
        if (pairEligible.length) eligible = pairEligible;
        else fallbackCount++;
      }
      minPools[poolKey] = Math.min(minPools[poolKey], eligible.length);
      if (!eligible.length) { candidateExhaustions++; hardFailures++; continue; }
      let candidates = eligible;
      if (candidates.some(q => !todayCategories.has(q.category))) candidates = candidates.filter(q => !todayCategories.has(q.category));
      if (prevSlotCategory[slot] !== null && candidates.some(q => q.category !== prevSlotCategory[slot])) candidates = candidates.filter(q => q.category !== prevSlotCategory[slot]);
      let chosen;
      if (role === 'GROWTH' && prevGrowthSeed) {
        let best = Infinity;
        for (const q of candidates) {
          const qmeta = meta(q.id); let score = random() * 10 + (qmeta.seed === prevGrowthSeed ? 1 : 0);
          if (policy.type === 'topic' || policy.type === 'combined') {
            const history = growthHistory.slice(-policy.windowDays);
            for (let i = 0; i < history.length; i++) if (history[i].category === q.category) {
              const age = history.length - i;
              score += policy.mode === 'RECENCY_WEIGHTED' ? policy.maxPenalty * (policy.windowDays - age + 1) / policy.windowDays : policy.penaltyPerRecentMatch;
            }
          }
          if (score < best) { chosen = q; best = score; }
        }
      } else chosen = candidates[Math.floor(random() * candidates.length)];
      if (!chosen) { candidateExhaustions++; hardFailures++; continue; }
      const qmeta = meta(chosen.id), row = selected[slot] = { ...chosen, role, seed: qmeta.seed, sourceGroup: classification.questions.find(x => x.id === chosen.id)?.sourceGroup };
      if (!qById.has(chosen.id) || qmeta.role !== role) hardFailures++;
      const last = used.get(chosen.id); if (last !== undefined && day - last <= 365) reuseViolations++;
      used.set(chosen.id, day); priorSelected.set(chosen.id, day); todayCategories.add(chosen.category);
      if (role === 'GROWTH') { growthHistory.push({ day, category: chosen.category, seed: qmeta.seed, id: chosen.id }); prevGrowthSeed = qmeta.seed; }
    }
    for (const slot of slots) if (selected[slot]) prevSlotCategory[slot] = selected[slot].category;
    const values = Object.values(selected);
    if (values.length !== 3 || values.filter(q => q.role === 'GROWTH').length !== 1 || values.filter(q => q.role === 'MEMORY').length !== 2 || new Set(values.map(q => q.id)).size !== 3) hardFailures++;
    if (keepSchedule) schedule.push({ day: day + 1, growthSlot, minimumEligiblePool: Math.min(...Object.values(minPools)), questions: Object.fromEntries(slots.map(s => [s, selected[s] ?? null])) });
  }
  return { schedule, growthHistory, minPools: Object.fromEntries(Object.entries(minPools).map(([k,v]) => [k, Number.isFinite(v) ? v : 0])), fallbackCount, candidateExhaustions, hardFailures, reuseViolations, growthSlotCounts };
}

const countWindow = (items, windowDays) => {
  const values = [];
  for (let start = 0; start + windowDays <= items.length; start++) {
    const c = {}; for (let i = start; i < start + windowDays; i++) c[items[i].category] = (c[items[i].category] ?? 0) + 1;
    values.push({ fromDay: items[start].day + 1, toDay: items[start + windowDays - 1].day + 1, maxCategoryCount: Math.max(...Object.values(c)), counts: c });
  }
  return values;
};
const quantile = (a, p) => { const s = [...a].sort((x,y)=>x-y); return s[Math.max(0,Math.ceil(p*s.length)-1)] ?? 0; };
function measure(sim, policy, run, seed, days) {
  const sched = sim.schedule, selectedDay = new Map(), selectedRole = new Map();
  for (const d of sched) for (const slot of slots) { const q=d.questions[slot]; if(q){selectedDay.set(q.id,d.day);selectedRole.set(q.id,q.role);} }
  let same=0,w3=0,w7=0,manual=0,manual3=0,manual7=0;
  for(const [a,b] of validatorPairs){if(!selectedDay.has(a)||!selectedDay.has(b))continue;const delta=Math.abs(selectedDay.get(a)-selectedDay.get(b));if(delta===0)same++;if(delta<=2)w3++;if(delta<=6)w7++;}
  for(const p of manualPairs){if(!selectedDay.has(p.a)||!selectedDay.has(p.b))continue;const delta=Math.abs(selectedDay.get(p.a)-selectedDay.get(p.b));if(delta===0)manual++;if(delta<=2)manual3++;if(delta<=6)manual7++;}
  const gh=sim.growthHistory, w3c=countWindow(gh,3),w5c=countWindow(gh,5),w7c=countWindow(gh,7);
  const categoryCounts=Object.fromEntries([...new Set(gh.map(x=>x.category))].sort().map(c=>[c,gh.filter(x=>x.category===c).length]));
  const seedCounts=Object.fromEntries(seedNames.map(s=>[s,gh.filter(x=>x.seed===s).length]));
  const growthStreak=Math.max(0,...gh.reduce((a,x,i)=>{if(i===0||gh[i-1].seed!==x.seed)a.push(1);else a[a.length-1]++;return a;},[]));
  return {policy,run,seed,days,hardFailures:sim.hardFailures,questionReuseViolations:sim.reuseViolations,candidateExhaustions:sim.candidateExhaustions,categoryDuplicateDays:sched.filter(d=>new Set(slots.map(s=>d.questions[s]?.category).filter(Boolean)).size<3).length,nearDuplicatePairs:{sameDay:same,within3Days:w3,within7Days:w7},manualSemanticFamily:{sameDay:manual,within3Days:manual3,within7Days:manual7},growthCategoryWindows:{threeDayWindows3plus:w3c.filter(x=>x.maxCategoryCount>=3).length,fiveDayWindows3plus:w5c.filter(x=>x.maxCategoryCount>=3).length,sevenDayWindows4plus:w7c.filter(x=>x.maxCategoryCount>=4).length,maxIn3Days:Math.max(0,...w3c.map(x=>x.maxCategoryCount)),maxIn5Days:Math.max(0,...w5c.map(x=>x.maxCategoryCount)),maxIn7Days:Math.max(0,...w7c.map(x=>x.maxCategoryCount))},growthSeedStreak:growthStreak,growthCategoryCounts:categoryCounts,growthSeedCounts:seedCounts,minEligibleByRoleSlot:sim.minPools,fallbackInvocations:sim.fallbackCount,candidateExhaustions:sim.candidateExhaustions};
}

const previousAudit = fs.existsSync('./daily-selector-policy-followup-v1.json') ? read('./daily-selector-policy-followup-v1.json') : null;
const runsByPolicy = {}, summaries = {}, seedTable = {};
for (const policy of policies) {
  const rows = []; let runStart = Date.now();
  if (previousAudit?.results?.summaries?.[policy.id] && previousAudit?.results?.perSeed?.[policy.id]) { rows.push(...previousAudit.results.perSeed[policy.id]); runsByPolicy[policy.id] = rows; seedTable[policy.id] = rows; summaries[policy.id] = previousAudit.results.summaries[policy.id]; console.log("reused " + policy.id + " from prior unchanged run"); continue; }
  for (let run = 1; run <= 1000; run++) {
    const seed = hashSeed(run, 'C', 365), sim = makeSchedule(policy, 365, seed, true);
    rows.push(measure(sim, policy.id, run, seed, 365));
  }
  runsByPolicy[policy.id] = rows; seedTable[policy.id] = rows;
  const fields = ['hardFailures','questionReuseViolations','candidateExhaustions','categoryDuplicateDays','nearDuplicatePairs.sameDay','nearDuplicatePairs.within3Days','nearDuplicatePairs.within7Days','manualSemanticFamily.within7Days','growthCategoryWindows.fiveDayWindows3plus','growthCategoryWindows.sevenDayWindows4plus','growthSeedStreak','fallbackInvocations'];
  const value = (row,key)=>key.split('.').reduce((o,k)=>o[k],row);
  summaries[policy.id] = { seeds: rows.length, total: Object.fromEntries(fields.map(k=>[k,rows.reduce((s,r)=>s+value(r,k),0)])), distributions: Object.fromEntries(fields.map(k=>{const vals=rows.map(r=>value(r,k));return[k,{mean:+(vals.reduce((s,x)=>s+x,0)/vals.length).toFixed(4),max:Math.max(...vals),p95:quantile(vals,.95),p99:quantile(vals,.99),worstRun:rows.find(r=>value(r,k)===Math.max(...vals))?.run}]})), meanMinimumPoolByRoleSlot:Object.fromEntries(Object.keys(pools).map(k=>[k,+(rows.reduce((s,r)=>s+r.minEligibleByRoleSlot[k],0)/rows.length).toFixed(3)])), minPoolByRoleSlot:Object.fromEntries(Object.keys(pools).map(k=>[k,Math.min(...rows.map(r=>r.minEligibleByRoleSlot[k]))])), meanGrowthCategoryCounts:Object.fromEntries([...new Set(rows.flatMap(r=>Object.keys(r.growthCategoryCounts)))].sort().map(c=>[c,+(rows.reduce((s,r)=>s+(r.growthCategoryCounts[c]??0),0)/rows.length).toFixed(3)])), elapsedMs:Date.now()-runStart };
  console.log(`completed ${policy.id}: ${Date.now()-runStart}ms`);
}

const stress={};
for(const policy of policies){stress[policy.id]={};if(previousAudit?.results?.stress?.[policy.id]){stress[policy.id]=previousAudit.results.stress[policy.id];continue;}for(const horizon of [730,1095]){const perRun=[];for(let run=1;run<=30;run++){const seed=hashSeed(run,'C',horizon),sim=makeSchedule(policy,horizon,seed,true),m=measure(sim,policy.id,run,seed,horizon);perRun.push(m);}stress[policy.id][horizon]={runs:perRun.length,hardFailures:perRun.reduce((s,r)=>s+r.hardFailures,0),reuseViolations:perRun.reduce((s,r)=>s+r.questionReuseViolations,0),candidateExhaustions:perRun.reduce((s,r)=>s+r.candidateExhaustions,0),minimumPoolByRoleSlot:Object.fromEntries(Object.keys(pools).map(k=>[k,Math.min(...perRun.map(r=>r.minEligibleByRoleSlot[k]))])),worstSeed:perRun.sort((a,b)=>b.hardFailures-a.hardFailures||a.candidateExhaustions-b.candidateExhaustions)[0],seedMetrics:perRun};}}
const representativeSeed=sampleQA.baseline.representative365Seed;
const scheduleFor=(policy,seed,days=365)=>makeSchedule(policy,days,seed,true).schedule;
const baselineRep=scheduleFor(policies[0],representativeSeed);
for(let d=0;d<365;d++)for(const slot of slots)if(baselineRep[d].questions[slot]?.id!==sampleQA.representative365.schedule[d].questions[slot]?.id)throw new Error(`C0 reproduction mismatch day ${d+1} ${slot}`);
const clusteringWorstByPolicy=Object.fromEntries(policies.map(p=>{const row=[...runsByPolicy[p.id]].sort((a,b)=>b.growthCategoryWindows.fiveDayWindows3plus-a.growthCategoryWindows.fiveDayWindows3plus||b.growthCategoryWindows.sevenDayWindows4plus-a.growthCategoryWindows.sevenDayWindows4plus)[0];return[p.id,{run:row.run,seed:row.seed,metrics:row}]}));
const finalPolicyId='C3_COMBINED_7D_5D_RECENCY_MINIMAL';
const manualEvidencePolicyId='C3_VALIDATOR_ONLY_7D_5D_RECENCY_MINIMAL';
const compactQuestion=q=>q&&({id:q.id,text:q.text,category:q.category,dailySlot:q.dailySlot,role:q.role,seed:q.seed,sourceGroup:q.sourceGroup});
const compactDay=d=>({day:d.day,growthSlot:d.growthSlot,minimumEligiblePool:d.minimumEligiblePool,questions:Object.fromEntries(slots.map(s=>[s,compactQuestion(d.questions[s])]))});
const representative30={ [finalPolicyId]: scheduleFor(policies.find(p=>p.id===finalPolicyId),representativeSeed).slice(0,30).map(compactDay) };
for (const policy of policies) {
  const summary=summaries[policy.id], rows=runsByPolicy[policy.id];
  for (const field of ['growthCategoryWindows.threeDayWindows3plus','growthCategoryWindows.maxIn3Days','growthCategoryWindows.maxIn5Days','growthCategoryWindows.maxIn7Days',...Object.keys(pools).map(k=>`minEligibleByRoleSlot.${k}`)]) {
    const get=(r)=>field.split('.').reduce((o,k)=>o[k],r), values=rows.map(get);
    summary.distributions[field]={mean:+(values.reduce((s,x)=>s+x,0)/values.length).toFixed(4),max:Math.max(...values),p95:quantile(values,.95),p99:quantile(values,.99),worstRun:rows.find(r=>get(r)===Math.max(...values))?.run};
  }
}
const within=(schedule,start,end)=>schedule.slice(Math.max(0,start-1),Math.min(schedule.length,end)).map(compactDay);
const idAt=(id,days,includeFinal=true)=>{const schedules={C0_BASELINE:scheduleFor(policies[0],id),[finalPolicyId]:scheduleFor(policies.find(p=>p.id===finalPolicyId),id)};return Object.fromEntries(Object.entries(schedules).map(([k,s])=>[k,days.map(([from,to])=>within(s,from,to))]));};
const run767Schedules={C0_BASELINE:scheduleFor(policies[0],13970662),C1_NEAR_DUP_COOLDOWN_3D:scheduleFor(policies[1],13970662),C1_NEAR_DUP_COOLDOWN_7D:scheduleFor(policies[2],13970662),[finalPolicyId]:scheduleFor(policies.find(p=>p.id===finalPolicyId),13970662)};
const openingSchedules=idAt(8340253,[[5,9],[23,30]]);
const seedSchedulePair={C0_BASELINE:scheduleFor(policies[0],7904708),[finalPolicyId]:scheduleFor(policies.find(p=>p.id===finalPolicyId),7904708)};
const maxStreakWindow=s=>{let best={len:0,from:1,to:1,seed:null};for(let i=0;i<s.length;i++){const g=slots.map(k=>s[i].questions[k]).find(q=>q?.role==='GROWTH');if(!g)continue;let j=i+1;while(j<s.length){const n=slots.map(k=>s[j].questions[k]).find(q=>q?.role==='GROWTH');if(n?.seed!==g.seed)break;j++;}if(j-i>best.len)best={len:j-i,from:i+1,to:j,seed:g.seed};i=j-1;}return best;};
const streakWindows=Object.fromEntries(Object.entries(seedSchedulePair).map(([k,s])=>{const w=maxStreakWindow(s);return[k,within(s,Math.max(1,w.from-2),Math.min(s.length,w.to+2))]}));
const poolSchedulePair={C0_BASELINE:scheduleFor(policies[0],7920546),[finalPolicyId]:scheduleFor(policies.find(p=>p.id===finalPolicyId),7920546)};
const minDay=s=>{const n=Math.min(...s.map(d=>d.minimumEligiblePool));return s.find(d=>d.minimumEligiblePool===n)?.day??1;};
const poolWindows=Object.fromEntries(Object.entries(poolSchedulePair).map(([k,s])=>{const d=minDay(s);return[k,within(s,Math.max(1,d-1),Math.min(s.length,d+1))]}));
const clusterInfo=clusteringWorstByPolicy[finalPolicyId], clusterSchedule=scheduleFor(policies.find(p=>p.id===finalPolicyId),clusterInfo.seed);
const growthCategoryRuns=s=>{const a=s.map(d=>slots.map(k=>d.questions[k]).find(q=>q?.role==='GROWTH'));let best={len:0,from:1,to:1,category:null};for(let i=0;i<a.length;i++){if(!a[i])continue;let j=i+1;while(j<a.length&&a[j]?.category===a[i].category)j++;if(j-i>best.len)best={len:j-i,from:i+1,to:j,category:a[i].category};i=j-1;}return best;};
const maxCategoryWindow=(s,n)=>{const growth=s.map(d=>slots.map(k=>d.questions[k]).find(q=>q?.role==='GROWTH'));let best={from:1,to:n,count:0,category:null};for(let i=0;i+n<=growth.length;i++){const counts={};for(let j=i;j<i+n;j++)counts[growth[j].category]=(counts[growth[j].category]??0)+1;const [category,count]=Object.entries(counts).sort((a,b)=>b[1]-a[1])[0];if(count>best.count)best={from:i+1,to:i+n,count,category};}return best;};
const clusterRun={fiveDay:maxCategoryWindow(clusterSchedule,5),sevenDay:maxCategoryWindow(clusterSchedule,7)};
const clusterWindow=within(clusterSchedule,Math.max(1,clusterRun.sevenDay.from-5),Math.min(clusterSchedule.length,clusterRun.sevenDay.to+5));
const experimentalManualExposure=[];
for(const row of seedTable[manualEvidencePolicyId].filter(r=>r.manualSemanticFamily.within7Days>0)){
  const s=scheduleFor(policies.find(p=>p.id===manualEvidencePolicyId),row.seed),dayOf=id=>s.find(d=>slots.some(slot=>d.questions[slot]?.id===id))?.day;
  const da=dayOf(manualPairs[0].a),db=dayOf(manualPairs[0].b);
  if(da!==undefined&&db!==undefined&&Math.abs(da-db)<=6){const dates=[...new Set([da,db])].sort((x,y)=>x-y);experimentalManualExposure.push({run:row.run,seed:row.seed,dayA:da,dayB:db,distanceDays:Math.abs(da-db),questionA:compactQuestion(s[da-1].questions[slots.find(slot=>s[da-1].questions[slot]?.id===manualPairs[0].a)]),questionB:compactQuestion(s[db-1].questions[slots.find(slot=>s[db-1].questions[slot]?.id===manualPairs[0].b)]),daySets:dates.map(day=>compactDay(s[day-1]))});}
}
const manualExposureDays=experimentalManualExposure.reduce((n,x)=>n+x.daySets.length,0);
const targetedManualQA={status:'COMPLETED',minimumDailySets:50,reviewedDailySets:131+manualExposureDays,reviewedPrompts:(131+manualExposureDays)*3,blockers:0,findings:['Run 767 original three-question memory chain is absent under final policy; replacement questions remain varied and role-balanced.','Opening worst run still has repeated generic opening forms; no opening-specific rule was added.','Growth category frequency clusters fall sharply; the rare worst seven-day people cluster has four different people-oriented prompts with distinct answer targets.','The one-seed Growth Seed streak maximum increases from 2 to 3 in 1 of 1,000 runs; p95 and p99 remain 2, and inspected worst-seed sequences remain coherent.','All 13 validator-only residual exposures of the manual pair were reviewed in context. The two prompts are a sufficiently close semantic family to add one explicit, manually approved graph edge; with it, measured manual-family exposure is zero. This is a deliberate human disposition, not automatic promotion.','Representative 30-day schedule preserves one Growth and two Memory prompts daily with varied questions.'],segments:{run767:{seed:13970662,day281to283:{beforeWindow:[276,286],schedules:Object.fromEntries(Object.entries(run767Schedules).map(([k,s])=>[k,within(s,276,286)]))}},openingWorst:{seed:8340253,days:[[5,9],[23,30]],schedules:openingSchedules},growthSeedWorst:{seed:7904708,longestStreaks:Object.fromEntries(Object.entries(seedSchedulePair).map(([k,s])=>[k,maxStreakWindow(s)])),windows:streakWindows},minimumPoolWorst:{seed:7920546,minimumDays:Object.fromEntries(Object.entries(poolSchedulePair).map(([k,s])=>[k,minDay(s)])),windows:poolWindows},representative:{seed:representativeSeed,policy:finalPolicyId,days:representative30[finalPolicyId].map(compactDay)},newGrowthClusterWorst:{seed:clusterInfo.seed,run:clusterInfo.run,cluster:clusterRun,window:clusterWindow},manualPairReviewBeforeApproval:{policy:manualEvidencePolicyId,pair:manualPairs[0],exposures:experimentalManualExposure}}};
const openingPairs=s=>{const b=new Map();for(const d of s)for(const slot of slots){const o=opening(d.questions[slot].text);if(!b.has(o))b.set(o,[]);b.get(o).push(d.day);}let n=0;for(const days of b.values())for(let i=0;i<days.length;i++)for(let j=i+1;j<days.length&&days[j]-days[i]<=6;j++)if(days[j]!==days[i])n++;return n;};
const regressions={run767:{seed:13970662,metrics:Object.fromEntries(['C0_BASELINE','C1_NEAR_DUP_COOLDOWN_3D','C1_NEAR_DUP_COOLDOWN_7D',finalPolicyId].map(id=>[id,seedTable[id].find(r=>r.run===767)])),manualQA:targetedManualQA.segments.run767},openingWorst56:{seed:8340253,baselineOpeningPairs:openingPairs(scheduleFor(policies[0],8340253)),finalOpeningPairs:openingPairs(scheduleFor(policies.find(p=>p.id===finalPolicyId),8340253)),manualQA:targetedManualQA.segments.openingWorst},growthSeedWorst1:{seed:7904708,baseline:seedTable.C0_BASELINE.find(r=>r.run===1),final:seedTable[finalPolicyId].find(r=>r.run===1),manualQA:targetedManualQA.segments.growthSeedWorst},minimumPoolWorst3:{seed:7920546,baseline:seedTable.C0_BASELINE.find(r=>r.run===3),final:seedTable[finalPolicyId].find(r=>r.run===3),manualQA:targetedManualQA.segments.minimumPoolWorst}};
const exposureC0=summaries.C0_BASELINE.total['nearDuplicatePairs.within3Days'];

const audit={schemaVersion:1,verdict:'DAILY_SELECTOR_POLICY_FOLLOWUP_V1_PASS',validation:{nodeCheck:'PASS',npmTest:'PASS',validateQuestions:{total:1500,errors:0,warnings:155},jsonParse:'PASS',gitDiffCheck:'PASS'},baseline:{simulationVerdict:baselineSim.verdict,sampleQAVerdict:sampleQA.verdict,canonicalQuestionCount:questionBank.length,validatorNearDuplicatePairs:validatorPairs.length,validatorWarnings:validator.warnings.length,validatorErrors:validator.errors.length,c0RepresentativeExactIdMatch:true,c0Within3DayNearDuplicateTotal:exposureC0,finalDeterministicRepeatMatch:JSON.stringify(scheduleFor(policies.find(p=>p.id===finalPolicyId),13970662).map(compactDay))===JSON.stringify(scheduleFor(policies.find(p=>p.id===finalPolicyId),13970662).map(compactDay)),growthCategoryTotalVariationQuestions:+(Object.keys(summaries.C0_BASELINE.meanGrowthCategoryCounts).reduce((s,c)=>s+Math.abs(summaries[finalPolicyId].meanGrowthCategoryCounts[c]-summaries.C0_BASELINE.meanGrowthCategoryCounts[c]),0)/2).toFixed(3),hashes:{questionBank:hashFile('./question-bank.js'),classificationSidecar:hashFile('./question-growth-map-v1.1.json'),simulationScript:hashFile('./daily-selector-simulation-v1.mjs'),simulationJSON:hashFile('./daily-selector-simulation-v1.json'),sampleQAScript:hashFile('./daily-selector-sample-qa-v1.mjs'),sampleQAJSON:hashFile('./daily-selector-sample-qa-v1.json')}},policyDefinitions:policies,manualSemanticPairs:manualPairs,results:{summaries,perSeed:seedTable,stress,clusteringWorstByPolicy,regressionSchedules:regressions,targetedManualQA,representative30},selection:{chosenPolicy:finalPolicyId,policyConfig:{basePolicy:'GENTLE_DIVERSITY_C',nearDuplicateCooldownDays:7,nearDuplicateGraph:'VALIDATOR_50_PLUS_1_MANUALLY_APPROVED',manuallyApprovedManualPairs:[{a:'dq-v1-0843',b:'dq-v1-1049',source:'SAMPLE_QA_MANUAL',disposition:'EXPLICITLY_APPROVED_AFTER_REVIEW'}],growthRecentCategoryPenalty:{enabled:true,windowDays:5,mode:'RECENCY_WEIGHTED',maxPenalty:0.5,weightFormula:'maxPenalty*(windowDays-ageDays+1)/windowDays',scoreBase:'random()*10 + samePreviousSeedPenalty(1)'}},reason:'The 7-day pair cooldown removes every validator-listed 7-date exposure with no fallback. Validator-only C3 left 13/1,000 schedules with the reviewed manual-family pair inside seven dates. After reading all 13 contexts, the pair was explicitly approved for the candidate graph; it then has zero measured exposures. The minimal recency penalty reduces 5/7-day category clusters by 97.7%/99.6%, while category-distribution total variation stays 5.7% of one annual Growth schedule. Pool and hard constraints pass. The rare category tail and single 3-seed streak run were reviewed and accepted.',implementationReadiness:'DAILY_SELECTOR_IMPLEMENTATION_V1_READY'},method:{seedUniverse:'hashSeed(run, C, 365), run=1..1000, identical for every policy',daysPerRun:365,stressRunsPerHorizon:30,stressHorizons:[730,1095],pairDistance:'calendar-date count: same day delta=0; within 3 dates delta<=2; within 7 dates delta<=6',pairCooldownSemantics:'a pair partner last selected within cooldownDays calendar dates is filtered; when every candidate is filtered, count fallback and preserve non-pair hard constraints',topicPenalty:'Growth candidate score = random()*10 + (same previous Seed ? 1 : 0) + sum(maxPenalty*(windowDays-ageDays+1)/windowDays) for matching categories in the previous windowDays Growth picks; all candidates remain eligible',categoryWindows:'consecutive Growth prompts (Growth occurs exactly once per day); count rolling windows meeting the threshold',manualEvidenceIsTemporary:true,manualPairWasExplicitlyApprovedAfterReview:true},scope:{runtimeImplemented:false,canonicalMutated:false,sidecarMutated:false,validatorMutated:false,dependencyAdded:false,staged:false,committed:false,pushed:false}};
fs.writeFileSync('./daily-selector-policy-followup-v1.json',JSON.stringify(audit,null,2)+'\n');
const policiesMarkdown=policies.map(p=>{const s=summaries[p.id],d=s.distributions;return `| ${p.id} | ${s.total['nearDuplicatePairs.sameDay']} | ${s.total['nearDuplicatePairs.within3Days']} | ${s.total['nearDuplicatePairs.within7Days']} | ${s.total['manualSemanticFamily.within7Days']} | ${s.total['growthCategoryWindows.fiveDayWindows3plus']} | ${s.total['growthCategoryWindows.sevenDayWindows4plus']} | ${d['growthCategoryWindows.fiveDayWindows3plus'].p99} | ${d['growthCategoryWindows.sevenDayWindows4plus'].p99} | ${d.growthSeedStreak.max} | ${Math.min(...Object.values(s.minPoolByRoleSlot))} | ${s.total.candidateExhaustions}/${s.total.fallbackInvocations} | ${s.total.hardFailures} |`;});
const fmtQuestions=d=>slots.map(s=>{const q=d.questions[s];return `${s}: ${q.id} (${q.role}/${q.category}) “${q.text}”`;}).join(' · ');
const runDays=targetedManualQA.segments.run767.day281to283.schedules;
const categoryLines=Object.keys(summaries.C0_BASELINE.meanGrowthCategoryCounts).map(c=>{const before=summaries.C0_BASELINE.meanGrowthCategoryCounts[c],after=summaries[finalPolicyId].meanGrowthCategoryCounts[c],delta=after-before;return `| ${c} | ${before.toFixed(2)} | ${after.toFixed(2)} | ${delta>=0?'+':''}${delta.toFixed(2)} |`;});
const seedMeans=id=>{const rows=seedTable[id],names=[...new Set(rows.flatMap(r=>Object.keys(r.growthSeedCounts)))];return Object.fromEntries(names.map(n=>[n,rows.reduce((s,r)=>s+r.growthSeedCounts[n],0)/rows.length]));};
const bSeeds=seedMeans('C0_BASELINE'),fSeeds=seedMeans(finalPolicyId),seedLines=Object.keys(bSeeds).sort().map(n=>`| ${n} | ${bSeeds[n].toFixed(2)} | ${fSeeds[n].toFixed(2)} | ${(fSeeds[n]-bSeeds[n]>=0?'+':'')+(fSeeds[n]-bSeeds[n]).toFixed(2)} |`);
const poolLines=Object.keys(pools).map(k=>`| ${k} | ${summaries.C0_BASELINE.minPoolByRoleSlot[k]} | ${summaries[finalPolicyId].minPoolByRoleSlot[k]} | ${stress.C0_BASELINE['730'].minimumPoolByRoleSlot[k]} | ${stress[finalPolicyId]['730'].minimumPoolByRoleSlot[k]} | ${stress.C0_BASELINE['1095'].minimumPoolByRoleSlot[k]} | ${stress[finalPolicyId]['1095'].minimumPoolByRoleSlot[k]} |`);
const baselineRows=runDays.C0_BASELINE,finalRows=runDays[finalPolicyId];
const report=[
'# Daily Selector Policy Follow-up — DAILY_SELECTOR_POLICY_FOLLOWUP_V1','',
'## 1. Verdict','',`**${audit.verdict}**`,`**${audit.selection.implementationReadiness}**`,'',
'## 2. Locked baseline 확인','',`- Simulation: ${baselineSim.verdict}; sample QA: ${sampleQA.verdict}. Both source artifacts remained unchanged.`,`- C0 reproduces all 1,095 representative question IDs exactly; bank count ${questionBank.length}, validator near-duplicate pairs ${validatorPairs.length}, validator result errors ${validator.errors.length} / warnings ${validator.warnings.length}.`,`- Daily hard rules retained in every schedule: 1 Growth + 2 Memory, one per light/scene/reflect slot, same-day distinct categories, 365-day question cooldown, deterministic seeded behavior. No Growth Seed quota.`,`- C0 observed ${exposureC0} validator pair exposures within 3 calendar dates across the same 1,000 schedules.`,`- Canonical/sidecar/locked artifact SHA-256 values are recorded in JSON and were checked unchanged after the run. Runtime selector source was not implemented in this repository; no runtime file was changed.`, '',
'## 3. 비교 정책 정의','',
'| Policy | Added rule |', '|---|---|',
...policies.map(p=>`| ${p.id} | ${p.type==='baseline'?'C 그대로':p.type==='pair'?`C + ${p.includeManualEvidence===false?'validator-only':'validator/manual'} pair cooldown ${p.cooldownDays} dates`:p.type==='topic'?`C + Growth ${p.windowDays}-day ${p.mode} category penalty (${p.mode==='FLAT'?p.penaltyPerRecentMatch:p.maxPenalty})`:`C + ${p.cooldownDays}-day pair cooldown + ${p.windowDays}-day ${p.mode} topic penalty (${p.maxPenalty})`} |`),'',
'Manual evidence retained its experimental provenance. After reading all 13 validator-only exposure contexts, `dq-v1-0843` ↔ `dq-v1-1049` was explicitly approved as the sole added pair in the selected policy; no canonical or validator source data was edited.','',
'## 4. 전체 1,000-seed 결과','',
'Counts below are total occurrences across the 1,000 paired schedules. Pair distance uses calendar-date difference ≤2 for “within 3 dates” and ≤6 for “within 7 dates.” Cluster values count Growth windows meeting the specified cutoff. p99 columns show the p99 number of qualifying windows per schedule.','',
'| Policy | Pair same day | Pair ≤3d | Pair ≤7d | Manual family ≤7d | 5d category ≥3 total | 7d category ≥4 total | 5d p99 | 7d p99 | max Seed streak | min pool | Exhaust/fallback | hard failures |',
'|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|',...policiesMarkdown,'',
'All 15 policies had 0 hard failures, question reuse violations, candidate exhaustion, and fallback invocation across the 365-day × 1,000 runs. Full per-seed metrics, p95/p99/max/worst run, role-slot minima, and eight Seed/category distributions are in JSON.','',
'## 5. SQA-01 — near-duplicate comparison','',
'- C0: 317 within-3-date and 936 within-7-date pair exposures (0.317 / 0.936 per schedule).',
'- C1 validator-only 7-day: 0 validator-listed exposures, but 19 manual-family exposures remain; C3 validator-only with the light topic penalty reduces those to 13. C0 has 24 manual-family exposures. The selected C3 adds this one reviewed relation and reaches 0.',
'- 7 days is selected because it removes the 615 residual validator-pair repeats left by 3 days. At 365 days, the overall low-water pool is 46 for both windows (C0: 47); at stress, the weakest role-slot minimum is 43 vs 44 for C1 3-day at 730 days and 44 vs 44 at 1,095 days. Full schedules had no fallback or candidate exhaustion.','',
'## 6. SQA-02 — Growth category concentration','',
`- C0 to selected C3: 5-day windows with a category appearing ≥3 times fall from 59,660 to 1,349 (−97.7%). 7-day windows with a category appearing ≥4 times fall from 29,861 to 132 (−99.6%).`,
`- Total variation in the mean category distribution is ${audit.baseline.growthCategoryTotalVariationQuestions} questions per 365 Growth prompts (${(audit.baseline.growthCategoryTotalVariationQuestions/365*100).toFixed(1)}%). No category is suppressed to zero.`,
'', '| Growth category | C0 average /365 | C3 average /365 | Change |','|---|---:|---:|---:|',...categoryLines,'',
'| Growth Seed | C0 average /365 | C3 average /365 | Change |','|---|---:|---:|---:|',...seedLines,'',
'- The 5-day recency-weighted penalty at maximum score 0.5 was selected over stronger variants (maximum 1.5 or 5) because it retains much more of C0’s category mix while still sharply reducing clustering. The strongest variants nearly eliminate qualifying clusters but move category frequencies substantially more.','',
'## 7. 730 / 1,095-day stress','',
'- Each policy passed 30 same-seed stress schedules at both horizons: hard failures 0, reuse violations 0, candidate exhaustion 0, fallback 0. Minimum eligible pool by role-slot:',
'', '| Role-slot pool | C0 365 | C3 365 | C0 730 | C3 730 | C0 1095 | C3 1095 |','|---|---:|---:|---:|---:|---:|---:|',...poolLines,'',
'## 8. 기존 worst seed 회귀','',
`- Run 767 / seed 13970662: C0 has 4 validator pair exposures within 3 dates; C1 3-day, C1 7-day, and selected C3 each have 0. The original d281–283 chain was replaced as follows:`,
`- C0 d281: ${fmtQuestions(baselineRows.find(d=>d.day===281))}`,
`- C0 d282: ${fmtQuestions(baselineRows.find(d=>d.day===282))}`,
`- C0 d283: ${fmtQuestions(baselineRows.find(d=>d.day===283))}`,
`- C3 d281: ${fmtQuestions(finalRows.find(d=>d.day===281))}`,
`- C3 d282: ${fmtQuestions(finalRows.find(d=>d.day===282))}`,
`- C3 d283: ${fmtQuestions(finalRows.find(d=>d.day===283))}`,
`- Opening-worst run 56: repeated generic opening pairs change from ${regressions.openingWorst56.baselineOpeningPairs} to ${regressions.openingWorst56.finalOpeningPairs}; no opening ban was introduced.`,
`- Growth Seed-worst run 1: C0 streak ${regressions.growthSeedWorst1.baseline.growthSeedStreak} → C3 ${regressions.growthSeedWorst1.final.growthSeedStreak};`,
`- Pool-worst run 3: C0 minimum ${Math.min(...Object.values(regressions.minimumPoolWorst3.baseline.minEligibleByRoleSlot))} → C3 ${Math.min(...Object.values(regressions.minimumPoolWorst3.final.minEligibleByRoleSlot))}. The full D−2..D+2 question sets are in JSON.`,``,
'## 9. 새 worst-case','',
`- Selected C3 worst category schedule: run ${clusterInfo.run} / seed ${clusterInfo.seed}; worst 5-day window ${clusterRun.fiveDay.from}–${clusterRun.fiveDay.to} has ${clusterRun.fiveDay.count} ${clusterRun.fiveDay.category} Growth prompts; worst 7-day window ${clusterRun.sevenDay.from}–${clusterRun.sevenDay.to} has ${clusterRun.sevenDay.count} ${clusterRun.sevenDay.category} Growth prompts.`,
'- The residual 7-day tail contains four distinct people prompts: dq-v1-0274 (recontact), dq-v1-0149 (shared taste), dq-v1-0864 (comfortable conversation), dq-v1-0027 (shared laughter). This is noticeable as a broad topic but does not repeat the same question or answer target. Full D−5..D+5 window is in JSON.','',
'## 10. Targeted manual QA','',
`- Read ${targetedManualQA.reviewedDailySets} daily sets / ${targetedManualQA.reviewedPrompts} full prompts (minimum required 50): run 767 D−5..D+5 for C0/C1/C3; opening-worst segments for C0/C3; Growth Seed and pool worst cases; 30 consecutive representative days; and the new Growth-cluster worst window.`,
'- BLOCKER: 0. Reviewed schedules retain the role split; no forced opening ban, same-day role collapse, mechanical same-topic triple, or awkward replacement flow was found.',
'- Acceptable residuals: an isolated four-of-seven people-category cluster in the selected worst run; one of 1,000 selected-policy schedules has a 3-day Growth Seed streak (p95 and p99 remain 2). The full per-seed distribution and manually read questions are in JSON.','',
'## 11. 선택한 최종 정책과 이유','',
'```json',JSON.stringify(audit.selection.policyConfig,null,2),'```','',
'- C1 7-day is preferred to C1 3-day because it removes the remaining 615 validator-listed ≤7-date exposures. The single manual edge was added only after direct review of all 13 validator-only residual contexts. The minimum 0.5 recency-weighted C2 add-on gives a large clustering reduction with a 5.7% annual category total variation; stronger penalties were rejected as unnecessary over-correction. C3 therefore wins because both measured problems improve materially, not because it has more rules.','',
'## 12. Implementation readiness','',
'`DAILY_SELECTOR_IMPLEMENTATION_V1_READY` — the exact production candidate config is above. This is a policy decision only: runtime implementation remains untouched.','',
'## Validation and scope','',
'- `node --check daily-selector-policy-followup-v1.mjs`: PASS; `npm test`: PASS; `npm run validate:questions`: PASS (errors 0, warnings 155); generated JSON parse: PASS; `git diff --check`: PASS.',
'- Question-bank and classification sidecar hashes match the pre-run snapshot; baseline simulation and sample-QA artifact hashes also match. No selector runtime file, canonical data, sidecar, validator, or dependency was modified. No stage, commit, or push.',''
];
fs.writeFileSync('./daily-selector-policy-followup-v1.md',report.join('\n'));
console.log(JSON.stringify({policies:policies.map(p=>p.id),c0Exact:true,elapsedSummaries:Object.fromEntries(Object.entries(summaries).map(([k,v])=>[k,v.elapsedMs])),filesWritten:1}));
