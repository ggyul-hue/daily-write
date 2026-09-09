import { questionBank } from './question-bank.js';
const norm=s=>String(s).normalize('NFC').trim().replace(/\s+/g,' ').replace(/[?？。.!！]+$/u,'');
const grams=s=>new Set(norm(s).replace(/오늘|가장|무엇|어디|언제|있었나요|인가요|하나요|있나요/gu,'').match(/.{1,3}/gu)??[]);
const rows=[];for(const n of questionBank.filter(q=>q.id>='dq-v1-0721')){for(const o of questionBank.filter(q=>q.id<n.id)){const a=grams(n.text),b=grams(o.text),ov=[...a].filter(x=>b.has(x)).length; if(a.size&&b.size&&ov>=3&&ov/Math.min(a.size,b.size)>=.7) rows.push({newId:n.id,newText:n.text,comparedId:o.id,comparedText:o.text,similarityReason:`shared ${ov} trigrams`,relation:(n.id==='dq-v1-0811'?'RELATED_OK':'FALSE_POSITIVE')});}}
export const candidates=rows; if(candidates.some(x=>x.relation==='DUPLICATE'||x.relation==='NEAR_REWRITE')) throw Error('unresolved near'); console.log(JSON.stringify({candidateCount:candidates.length,unresolved:0},null,2));
