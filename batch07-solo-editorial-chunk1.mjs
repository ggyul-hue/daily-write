import { batch07 } from './question-bank.js';
const ids=Array.from({length:20},(_,i)=>`dq-v1-${String(721+i).padStart(4,'0')}`);
const data={
'0721':['OBJECT','MEDIUM','골목의 새 안내 표지판','PASS','PASS','PASS','PASS','PASS','NONE','PASS','새로 나타난 표시를 구체적인 물건으로 답할 수 있다. 새로운 표시를 실제로 발견한 날에만 답할 수 있어 applicability는 MEDIUM으로 본다.'],
'0722':['ACTION','MEDIUM','손을 흔드는 동작','PASS','PASS','PASS','PASS','PASS','NONE','PASS','가까이서 본 손동작은 정적인 풍경과 달리 사람의 실제 행동을 기록하게 한다. 짧은 동작 표현만으로도 그날의 움직임과 장면을 복원할 수 있다.'],
'0723':['ACTION','MEDIUM','사람들이 한꺼번에 건넌 모습','PASS','PASS','PASS','PASS','PASS','NONE','PASS','잠시 멈춰 바라본 움직임을 행동으로 답하게 해 장면의 흐름이 남는다. 이동 중 사람들의 동작을 본 날에 짧게 답하기 좋다.'],
'0724':['SCENE','MEDIUM','낯설게 보인 익숙한 골목','PASS','PASS','PASS','PASS','PASS','NONE','PASS','익숙한 풍경이 낯설게 느껴진 순간을 장소와 모습으로 구체화한다. 평소와 다르게 보인 경험이 필요하므로 applicability는 MEDIUM이다.'],
'0725':['SCENE','LOW','창가에 불빛이 번진 장면','PASS','PASS','PASS','PASS','PASS','NONE','PASS','다시 눈이 간 장면을 한 번 더 바라본 구체적인 모습으로 남긴다. 불빛처럼 작은 시각 단서만 적어도 당시의 공간을 떠올릴 수 있다.'],
'0726':['SCENE','MEDIUM','비에 젖은 창가','PASS','PASS','PASS','PASS','PASS','NONE','PASS','시선이 머문 창가의 모습을 하나의 풍경으로 답할 수 있다. 창밖을 바라본 날에 자연스럽고, 답은 짧은 명사구로 충분하다.'],
'0727':['VISUAL_DETAIL','MEDIUM','유리창에 스친 노을빛','PASS','PASS','PASS','PASS','PASS','NONE','PASS','길에서 스친 빛을 색과 표면이 만난 세부 장면으로 기록하게 한다. 빛을 본 순간만 떠올리면 되어 짧게 답하기 쉽다.'],
'0728':['SCENE','MEDIUM','서로 자리를 비켜 준 순간','PASS','PASS','PASS','PASS','PASS','NONE','PASS','사람들 사이에서 벌어진 작은 장면을 관계 설명보다 행동이 보이는 사건으로 남긴다. 누군가와 공간을 공유한 날에 자연스럽지만 그런 장면이 필요해 MEDIUM이다.'],
'0729':['REASON','MEDIUM','창밖에서 갑자기 무언가 움직여서','PASS','PASS','PASS','PASS','PASS','NONE','PASS','고개를 돌린 까닭을 실제로 시선을 끈 변화로 답하게 한다. 이유와 장면이 함께 남아 단순한 감정 평가보다 기록 가치가 높다.'],
'0730':['CHANGE/EVENT','MEDIUM','안내문이 새로 붙은 것','PASS','PASS','PASS','PASS','PASS','NONE','PASS','처음 알아챈 변화를 새로 붙은 안내문이라는 사건으로 구체화한다. 실제로 새로운 변화가 있었던 날을 전제로 하므로 MEDIUM으로 분류한다.'],
'0731':['OBJECT','MEDIUM','책상 위의 작은 화분','PASS','PASS','PASS','PASS','PASS','NONE','PASS','한 장면을 떠올리게 한 물건을 대상 자체로 답하게 한다. 물건 하나를 적는 것만으로도 그날의 공간과 시선이 남는다.'],
'0732':['SCENE','MEDIUM','사람들이 갑자기 멈춘 장면','PASS','PASS','PASS','PASS','PASS','NONE','PASS','걸음을 늦추게 한 장면을 사람들의 행동이 보이는 사건으로 답할 수 있다. 이동 중 실제로 본 순간을 짧게 적기 좋다.'],
'0733':['VISUAL_DETAIL','LOW','벽에 길게 드리운 나무 그림자','PASS','PASS','PASS','PASS','PASS','NONE','PASS','지나며 본 그림자는 빛과 표면의 구체적인 시각 단서를 남긴다. 장소를 길게 설명하지 않아도 그림자 하나로 당시 장면을 회상할 수 있다.'],
'0734':['EXPRESSION/VISUAL_DETAIL','MEDIUM','웃으며 돌아본 표정','PASS','PASS','PASS','PASS','PASS','NONE','PASS','가까이서 본 표정을 얼굴의 구체적인 모습으로 답하게 한다. 사람을 마주친 날에 자연스럽고 감정 분석을 요구하지 않는다.'],
'0735':['MOMENT','MEDIUM','문이 천천히 닫히던 순간','PASS','PASS','PASS','PASS','PASS','NONE','PASS','움직임이 느리게 보인 시점을 순간으로 직접 답하게 한다. 그런 움직임을 실제로 본 날에 답하기 쉬워 applicability는 MEDIUM이다.'],
'0736':['PLACE','MEDIUM','예상보다 한산했던 로비','PASS','PASS','PASS','PASS','PASS','NONE','PASS','예상과 다르게 보인 곳을 실제 공간 이름으로 답할 수 있다. 장소의 분위기와 그날의 차이가 함께 남아 archive에서 떠올리기 쉽다.'],
'0737':['SCENE','LOW','창가에 놓인 작은 화분들','PASS','PASS','PASS','PASS','PASS','NONE','PASS','물건이 놓인 모습이 기억에 남은 장면을 구체적인 배치로 답하게 한다. 특별한 장소나 행동을 요구하지 않아 평범한 날에도 짧게 기록할 수 있다.'],
'0738':['REASON','MEDIUM','구름이 눈에 들어와서','PASS','PASS','PASS','PASS','PASS','NONE','PASS','잠깐 올려다본 이유를 하늘에서 눈에 들어온 장면으로 답한다. 실제로 고개를 들어 본 행동이 필요하므로 MEDIUM이다.'],
'0739':['SCENE','MEDIUM','가게 앞의 작은 화분','PASS','PASS','PASS','PASS','PASS','NONE','PASS','지나가다 돌아본 대상을 주변 장면 속 구체적인 모습으로 붙잡는다. 특별한 사건이 없어도 잠깐 시선이 머문 이유를 자연스럽게 남길 수 있다.'],
'0740':['SCENE','MEDIUM','복도 끝의 빈 의자','PASS','PASS','PASS','PASS','PASS','NONE','PASS','문틈으로 우연히 보인 장면을 안쪽 공간의 구체적인 모습으로 남긴다. 문을 열거나 지나간 경험이 필요하므로 applicability는 MEDIUM이다.']};
const byId=new Map(batch07.map(q=>[q.id,q]));
export const entries=ids.map(id=>{const q=byId.get(id),n=data[id.slice(-4)];if(!q||!n)throw Error('missing '+id);return {id,beforeText:({"0722":"오늘 눈앞에서 달라진 순서는?","0724":"오늘 평소와 달라 보인 모서리는?","0725":"오늘 한 번 더 확인한 장면은?","0732":"오늘 걸음을 늦추게 한 모양은?","0737":"오늘 서로 다른 색이 맞닿은 곳은?","0739":"오늘 지나치지 않고 본 것은?","0728":"오늘 주변에서 바뀐 소리는?","0740":"오늘 장면 속 가장 작은 것은?"}[id.slice(-4)]??q.text),finalText:q.text,category:q.category,dailySlot:q.dailySlot,answerTarget:n[0],applicabilityRisk:n[1],sampleAnswer:n[2],grammarFit:n[3],naturalness:n[4],diaryValue:n[5],random3Usability:n[6],categoryFit:n[7],slotFit:n[8],globalCollision:n[9],issueTags:[],editorialVerdict:'PASS',rationale:n[10]};});
if(entries.length!==20) throw Error('Chunk1 count');
if(entries.filter(e=>e.beforeText!==e.finalText).length!==8) throw Error('rewrite count');
console.log(JSON.stringify({count:entries.length,verdicts:Object.fromEntries(['PASS','REWRITE','REVIEW'].map(v=>[v,entries.filter(e=>e.editorialVerdict===v).length])),applicability:Object.fromEntries(['LOW','MEDIUM','HIGH'].map(v=>[v,entries.filter(e=>e.applicabilityRisk===v).length]))},null,2));
