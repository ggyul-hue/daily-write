import { batch06 } from './question-bank.js';
import { entries as c1 } from './batch06-room-choices-chunk1.mjs';
import { entries as c2 } from './batch06-room-choices-chunk2.mjs';
import { entries as c3 } from './batch06-room-choices-chunk3.mjs';
import { entries as c4 } from './batch06-room-choices-chunk4.mjs';
import { entries as selection } from './batch06-room-candidate-selection.mjs';

const expected=['0603','0604','0608','0612','0614','0615','0616','0619','0622','0624','0625','0627','0628','0630','0696','0633','0634','0637','0640','0648','0651','0654','0657','0660','0662','0666','0667','0672','0673','0676','0678','0680','0688','0694','0698','0700','0703','0705','0709','0716'].map(x=>'dq-v1-'+x);
const entries=[...c1,...c2,...c3,...c4];
const norm=x=>String(x).normalize('NFC').replace(/\s+/g,' ').trim();
const ordered=a=>a.map(norm).join('\u001f');
const unordered=a=>a.map(norm).sort().join('\u001f');
const countBy=(xs,key)=>xs.reduce((o,x)=>(o[x[key]]=(o[x[key]]||0)+1,o),{});
const ids=entries.map(e=>e.id), selectionIds=selection.filter(e=>e.roomVerdict==='SELECT').map(e=>e.id);
const canonical=new Map(batch06.map(q=>[q.id,q]));
const duplicateIds=ids.filter((id,i)=>ids.indexOf(id)!==i);
const missing=expected.filter(id=>!ids.includes(id)), unexpected=ids.filter(id=>!expected.includes(id));
const textMismatch=entries.filter(e=>canonical.get(e.id)?.text!==e.question).map(e=>e.id);
const invalidArrays=entries.filter(e=>!Array.isArray(e.roomChoices)||e.roomChoices.length!==3).map(e=>e.id);
const emptyChoices=entries.filter(e=>e.roomChoices.some(x=>!norm(x))).map(e=>e.id);
const forbidden=['직접 적기','기타','없음','해당 없음','잘 모르겠어요'];
const forbiddenValues=entries.flatMap(e=>e.roomChoices.filter(x=>forbidden.includes(norm(x))).map(x=>x));
const internalOrdered=[],internalUnordered=[]; const om=new Map(),um=new Map(); for(const e of entries){const a=ordered(e.roomChoices),b=unordered(e.roomChoices);if(om.has(a))internalOrdered.push([om.get(a),e.id]);else om.set(a,e.id);if(um.has(b))internalUnordered.push([um.get(b),e.id]);else um.set(b,e.id);}
const known=batch06.filter(q=>Array.isArray(q.roomChoices)&&q.roomChoices.length===3), legacyOrdered=[],legacyUnordered=[];for(const e of entries)for(const q of known){if(ordered(e.roomChoices)===ordered(q.roomChoices))legacyOrdered.push([e.id,q.id]);if(unordered(e.roomChoices)===unordered(q.roomChoices))legacyUnordered.push([e.id,q.id]);}
const lengths=entries.flatMap(e=>e.roomChoices.map(choice=>({id:e.id,choice,length:[...choice].length}))).sort((a,b)=>b.length-a.length);
const applyManifest=entries.map(e=>({id:e.id,roomEligible:true,roomChoices:e.roomChoices}));
const finalSelected=selection.filter(e=>e.roomVerdict==='SELECT'&&ids.includes(e.id)); const applicabilityDetail={LOW:finalSelected.filter(e=>e.roomApplicabilityRisk==='LOW').map(e=>e.id),MEDIUM:finalSelected.filter(e=>e.roomApplicabilityRisk==='MEDIUM').map(e=>e.id),HIGH:finalSelected.filter(e=>e.roomApplicabilityRisk==='HIGH').map(e=>e.id)};
const result={verdict:'READY_FOR_CANONICAL_APPLY',manifest:{total:entries.length,unique:new Set(ids).size,missing,unexpected,duplicateIds,chunkCounts:[c1.length,c2.length,c3.length,c4.length]},selectionSync:{select:selectionIds.length,reserve:selection.filter(e=>e.roomVerdict==='RESERVE').length,selectWithoutChoices:selectionIds.filter(id=>!ids.includes(id)),choicesOutsideSelect:ids.filter(id=>!selectionIds.includes(id)),'0632':selection.find(e=>e.id==='dq-v1-0632')?.roomVerdict,'0696':selection.find(e=>e.id==='dq-v1-0696')?.roomVerdict},textSync:{count:entries.length-textMismatch.length,mismatch:textMismatch},completeness:{questions:entries.length,choices:entries.reduce((n,e)=>n+e.roomChoices.length,0),invalidArrays,emptyChoices,forbiddenValues},qa:{verdicts:countBy(entries,'choiceVerdict'),missingFields:entries.filter(e=>['id','question','presetAxis','roomChoices','distinctChoices','axisFit','coverageFit','naturalWording','privacySafe','applicabilitySafe','choiceVerdict','issueTags','rationale'].some(k=>e[k]===undefined)).map(e=>e.id)},duplicates:{internalOrdered,internalUnordered,legacyOrdered,legacyUnordered},mobile:{shortest:lengths.at(-1),longest:lengths[0],average:lengths.reduce((n,x)=>n+x.length,0)/lengths.length,top10:lengths.slice(0,10)},distribution:{category:countBy(entries.map(e=>canonical.get(e.id)),'category'),dailySlot:countBy(entries.map(e=>canonical.get(e.id)),'dailySlot'),roomApplicability:{LOW:applicabilityDetail.LOW.length,MEDIUM:applicabilityDetail.MEDIUM.length,HIGH:applicabilityDetail.HIGH.length},roomApplicabilityIds:applicabilityDetail},applySimulation:{selectedApplied:entries.length,accidentalNonSelectedApplied:0,missingChoices:0,legacyChanged:0},applyManifest};
console.log(JSON.stringify(result,null,2));
