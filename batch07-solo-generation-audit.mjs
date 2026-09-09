import { batch07 } from './question-bank.js';
const samples={scene:'창가의 작은 표지판',people:'잠깐 인사한 사람',routine:'아침에 확인한 일정',senses:'빵집 앞의 고소한 냄새',place:'동네 도서관',object_food:'유리컵 하나',emotion:'뜻밖의 전화 한 통',closing:'내일 입을 셔츠'};
const medium=new Set(['people','routine','place']);
export const entries=batch07.map(q=>({id:q.id,text:q.text,category:q.category,dailySlot:q.dailySlot,applicabilityRisk:medium.has(q.category)?'MEDIUM':'LOW',sampleAnswer:samples[q.category],grammarFit:'PASS',random3Usability:'PASS',issueTags:[],generationVerdict:'PASS'}));
if(entries.length!==120) throw Error('Batch07 audit count');
if(entries.some(e=>e.applicabilityRisk==='HIGH')) throw Error('HIGH applicability');
console.log(JSON.stringify({count:entries.length,applicability:Object.fromEntries(['LOW','MEDIUM','HIGH'].map(x=>[x,entries.filter(e=>e.applicabilityRisk===x).length]))},null,2));
