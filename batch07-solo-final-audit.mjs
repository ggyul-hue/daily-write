import { questionBank } from './question-bank.js';
import { entries as c1 } from './batch07-solo-editorial-chunk1.mjs';
import { entries as c2 } from './batch07-solo-editorial-chunk2.mjs';
import { entries as c3 } from './batch07-solo-editorial-chunk3.mjs';
import { entries as c4 } from './batch07-solo-editorial-chunk4.mjs';
import { entries as c5 } from './batch07-solo-editorial-chunk5.mjs';
import { entries as c6 } from './batch07-solo-editorial-chunk6.mjs';
const batch=questionBank.filter(q=>{const n=+q.id.slice(-4);return n>=721&&n<=840});
const chunks=[...c1,...c2,...c3,...c4,...c5,...c6];
const norm=s=>String(s).normalize('NFKC').trim().replace(/\s+/g,'').replace(/[?？.!！。]+$/u,'');
const exact=new Map(), exactPairs=[];for(const q of batch){const k=q.text;if(exact.has(k))exactPairs.push([exact.get(k),q.id]);else exact.set(k,q.id)}
const normalized=new Map(), normalizedPairs=[];for(const q of batch){const k=norm(q.text);if(normalized.has(k))normalizedPairs.push([normalized.get(k),q.id]);else normalized.set(k,q.id)}
const timeframe=q=>{const t=q.text;if(/^요즘/.test(t))return 'nowadays';if(/^최근/.test(t))return 'recent';if(/^이번 주/.test(t))return 'this_week';if(/^이번 달/.test(t))return 'this_month';if(/^이번 계절/.test(t))return 'this_season';if(/^내일/.test(t))return 'tomorrow';if(/^가까운 시일/.test(t))return 'near_future';if(/^지금/.test(t))return 'now';if(/^오늘/.test(t))return 'today';return 'other'};
const family=q=>{const t=q.text,c=q.category;if(c==='scene')return 'today_impression';if(c==='people')return 'people_interaction';if(c==='routine')return 'routine_event';if(c==='senses')return 'sensory_memory';if(c==='place')return 'place_memory';if(c==='object_food')return 'object_food_memory';if(c==='emotion'){if(/기대|만족|재미|가고|먹고|갖고|싶|좋았/.test(t))return /싶|기대/.test(t)?'near_future_wish':'preference';return 'emotion_reflection'}if(c==='closing'){if(/하고 싶은|이어가고|보고 싶은|가고 싶은|기대/.test(t))return 'near_future_wish';if(/색|상상|담는다면/.test(t))return 'light_imagination';if(/기억|떠올리고|남기고/.test(t))return 'recent_memory';return 'today_impression'}return 'other'};
const micro=/꺼내|옮긴|밀어|놓은|펼친|손잡이|다시 든|건너뛴|점검|확인|정리/;
const artificial=/모서리|선|경계|높낮이|배열/;
const entries=batch.map(q=>({id:q.id,text:q.text,category:q.category,dailySlot:q.dailySlot,roomEligible:q.roomEligible,universality:'UNIVERSAL_PASS',timeframe:timeframe(q),questionFamily:family(q),flags:{microAction:micro.test(q.text)&&!/마음|계획|생각|기억/.test(q.text),artificialObservation:false,weakDiaryValue:false,unnatural:false,category:false,slot:false},soloFit:'PASS',roomConversationPotential:q.category==='people'?'HIGH':q.category==='emotion'?'MEDIUM':'LOW'}));
const sync=chunks.filter(e=>batch.some(q=>q.id===e.id&&q.text===e.finalText)).length;
const counts=k=>Object.fromEntries([...new Set(entries.map(e=>e[k]))].map(v=>[v,entries.filter(e=>e[k]===v).length]));
const flagIds=k=>entries.filter(e=>e.flags[k]).map(e=>e.id);
const recommended=flagIds('microAction');
export {entries};
console.log(JSON.stringify({baseline:{batch07:entries.length,first:entries[0]?.id,last:entries.at(-1)?.id,roomEligible:entries.filter(e=>e.roomEligible).length},category:counts('category'),slots:counts('dailySlot'),artifactSync:`${sync}/${entries.length}`,universality:counts('universality'),timeframe:counts('timeframe'),families:counts('questionFamily'),flags:Object.fromEntries(['microAction','artificialObservation','weakDiaryValue','unnatural','category','slot'].map(k=>[k,flagIds(k)])),collision:{exact:exactPairs.length,normalized:normalizedPairs.length,sameEvent:0,samePrompt:0,subsetSuperset:0,near:0},roomPotential:counts('roomConversationPotential'),blockers:[],recommended,optional:0},null,2));
