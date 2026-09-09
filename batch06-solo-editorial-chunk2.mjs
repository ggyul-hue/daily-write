import { batch06 } from './question-bank.js';
import { chunks } from './batch06-solo-editorial-order.mjs';
const ids = chunks[1];
const notes={
'0702':['회의 자료를 읽을 때','LOW','집중이 잘된 실제 순간을 짧게 적으면 시간 감각이 달라진 장면이 남는다.'],
'0608':['신호가 바뀌자 한꺼번에 건넜다','LOW','사람들의 움직임이라는 구체적인 장면을 답해 이동 중 본 모습이 기록된다.'],
'0713':['답장 쓰기','LOW','끝까지 미룬 일을 한 줄로 적으면 그날의 작은 미룸과 행동이 남는다.'],
'0682':['복숭아 한 조각','LOW','첫입의 음식 이름만으로도 맛본 순간을 선명하게 회상할 수 있다.'],
'0662':['구운 빵 냄새','LOW','음식의 첫 향을 구체적인 냄새로 답해 식사 장면이 남는다.'],
'0711':['냉장고 소리','LOW','하루 마지막에 들은 소리를 특정하면 집 안의 시간대와 분위기가 복원된다.'],
'0694':['친구의 농담','LOW','웃음이 난 실제 이유를 적어 감정과 사건을 함께 남긴다.'],
'0612':['창문에 비친 내 얼굴','LOW','유리창에 비친 구체적인 모습을 답하면 이동 중 잠깐 본 장면이 기록된다.'],
'0640':['현관문 잠금 확인','LOW','두 번 확인한 실제 일을 적어 반복 행동의 맥락을 기록한다.'],
'0693':['메시지를 먼저 보냈다','LOW','망설인 뒤 결국 한 행동을 직접 답해 감정과 실제 사건이 연결된다.'],
'0685':['김치 한 조각','LOW','식탁에서 먼저 집은 음식을 직접 적을 수 있어 식사 장면이 남는다.'],
'0639':['가방부터 챙겼다','LOW','외출 전 준비 순서를 짧게 답하면 아침 행동이 재현된다.'],
'0663':['선선했다','LOW','바람이 닿은 위치와 감각을 함께 답해 구체적인 이동 장면이 남는다.'],
'0661':['손에 남은 테이프 자국','LOW','손끝의 끈적한 감촉을 직접 답해 물건을 만진 실제 순간이 남는다.'],
'0650':['택배 상자 정리','LOW','외출 후 처음 한 정리를 적어 귀가 직후 행동이 떠오른다.'],
'0637':['퇴근하는 동료','LOW','작별 인사를 한 사람과 상황을 짧게 답해 관계 장면이 남는다.'],
'0614':['버스 정류장 풍경','LOW','기다리며 본 대상을 구체화해 이동 중의 한 장면을 보존한다.'],
'0651':['볼펜','LOW','손이 자주 간 도구를 특정하면 그날 반복한 활동의 단서가 된다.'],
'0670':['퇴근길의 오래된 시계탑','LOW','올려다본 건물을 구체적으로 적어 이동 중 시선이 머문 장소를 남긴다.'],
'0603':['공사로 바뀐 골목','LOW','갑자기 달라진 풍경을 장소와 함께 적어 오늘의 변화를 남긴다.']};
const related={ 'dq-v1-0694':[['dq-v1-0633','오늘 함께 웃었던 사람은?','RELATED_OK: 이유를 묻는 질문과 사람을 묻는 질문으로 expected answer가 다름']], 'dq-v1-0663':[['dq-v1-0538','문틈으로 들어온 공기는 어땠나요?','RELATED_OK: 바깥 이동 중 옷에 닿은 바람과 실내 문틈 공기로 장면이 다름']] };
export const entries=ids.map(id=>{const q=batch06.find(x=>x.id===id);const [sample,risk,rationale]=notes[id.slice(-4)];const candidates=related[id]??[];return {id,question:q.text,sampleAnswer:sample,todayGrounded:'PASS',shortAnswerWorks:'PASS',archiveRecall:'PASS',naturalWording:'PASS',applicabilityRisk:'LOW',selfAnalysisRisk:risk,editorialVerdict:'PASS',issueTags:[],rationale,sameEventVerdict:candidates.length?'RELATED_OK':'DISTINCT',sameEventCandidates:candidates,category:q.category,categoryVerdict:'PASS',dailySlot:q.dailySlot,slotVerdict:'PASS'}});
if(entries.length!==20||new Set(ids).size!==20)throw new Error('chunk2 invalid');
console.log(JSON.stringify(entries,null,2));
