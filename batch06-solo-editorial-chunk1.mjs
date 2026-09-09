import { batch06 } from './question-bank.js';
import { chunks } from './batch06-solo-editorial-order.mjs';

const chunk1Ids = ['dq-v1-0687','dq-v1-0602','dq-v1-0667','dq-v1-0604','dq-v1-0635','dq-v1-0712','dq-v1-0714','dq-v1-0676','dq-v1-0624','dq-v1-0628','dq-v1-0613','dq-v1-0626','dq-v1-0715','dq-v1-0616','dq-v1-0706','dq-v1-0672','dq-v1-0632','dq-v1-0634','dq-v1-0689','dq-v1-0697'];
const notes = {
'dq-v1-0687':['초코 쿠키','LOW','간식 이름만으로도 오늘 먹은 장면을 짧게 남길 수 있다.','PASS'],
'dq-v1-0602':['공사 소리에 놀라서','LOW','길모퉁이에서 멈춘 구체적인 이유를 한 줄로 답할 수 있어 장면 회상이 쉽다.','PASS'],
'dq-v1-0667':['파란 우산','LOW','선명한 색과 그때 본 대상을 함께 떠올리게 해 감각 단서가 남는다.','PASS'],
'dq-v1-0604':['창가의 고양이','LOW','시선을 빼앗긴 실제 장면을 구체적인 대상으로 기록할 수 있다.','PASS'],
'dq-v1-0635':['친구와 본 불꽃놀이','LOW','누군가와 같은 장면을 본 순간은 사람과 장소를 함께 복원하게 한다.','PASS'],
'dq-v1-0712':['식은 차 한 잔','LOW','하루 끝 식탁에 남은 물건을 짧게 적으면 그날의 식사나 휴식 장면이 구체적으로 남는다.','PASS'],
'dq-v1-0714':['짧은 장보기 메모','LOW','하루 끝에 남긴 메모는 그날의 할 일이나 생각을 구체적으로 되살린다.','PASS'],
'dq-v1-0676':['동네 도서관','LOW','조용해서 기억난 실제 장소를 짧게 답할 수 있고 공간의 분위기도 남는다.','PASS'],
'dq-v1-0624':['동료 민수','LOW','작은 부탁의 내용과 부탁한 사람을 함께 기록해 사람 사이의 장면이 살아난다.','PASS'],
'dq-v1-0628':['지하철 직원','LOW','도움을 청한 실제 상황을 짧게 적을 수 있어 추상적인 관계 평가가 아니다.','PASS'],
'dq-v1-0613':['노을 사진을 찍으려고','LOW','사진을 찍게 된 실제 이유를 짧게 적으면 그 순간의 행동과 장면이 함께 남는다.','PASS'],
'dq-v1-0626':['점심에 본 새 카페','LOW','첫 대화 주제와 만남의 맥락을 함께 떠올릴 수 있는 사람 중심 cue다.','PASS'],
'dq-v1-0715':['현관 바닥의 흙자국','LOW','오늘 남은 흔적이 있는 장소를 적으면 실제 귀가 장면이 복원된다.','PASS'],
'dq-v1-0616':['길가의 작은 화분','LOW','뜻밖에 눈에 들어온 대상을 특정해 짧은 답만으로도 장면이 남는다.','PASS'],
'dq-v1-0706':['버스 창밖','MEDIUM','감정을 묻지만 시선을 돌린 실제 장소를 함께 답하게 해 자기분석으로 흐르지 않는다.','PASS'],
'dq-v1-0672':['집 근처 세탁소','LOW','돌아오는 길에 실제로 들른 장소를 기록해 이동 경로가 떠오른다.','PASS'],
'dq-v1-0632':['팀장님','LOW','새 소식을 전한 사람과 내용이 함께 남아 구체적인 업무 장면이 된다.','PASS'],
'dq-v1-0634':['오랜 친구의 전화','LOW','반가웠던 연락의 상대를 적어 사람과 사건이 동시에 기억된다.','PASS'],
'dq-v1-0689':['내일 입을 셔츠','LOW','다음 날을 위해 챙길 실제 물건을 적으므로 답이 짧아도 생활 단서가 남는다.','PASS'],
'dq-v1-0697':['발표 직전 심호흡','LOW','긴장했다가 풀린 시점을 실제 행동과 연결해 가볍게 감정을 회상할 수 있다.','PASS']};
export const entries = chunk1Ids.map((id) => { const q = batch06.find((item) => item.id === id); const [sampleAnswer, selfAnalysisRisk, rationale, editorialVerdict] = notes[id]; return { id, question: q.text, sampleAnswer, todayGrounded: 'PASS', shortAnswerWorks: 'PASS', archiveRecall: 'PASS', naturalWording: 'PASS', applicabilityRisk: 'LOW', selfAnalysisRisk, editorialVerdict, issueTags: [], rationale, category: q.category, categoryVerdict: 'PASS', dailySlot: q.dailySlot, slotVerdict: 'PASS' }; });
if (JSON.stringify(chunk1Ids) !== JSON.stringify(chunks[0])) throw new Error('Chunk1 manifest mismatch');
if (entries.length !== 20 || entries.some((entry) => entry.editorialVerdict === 'REVIEW')) throw new Error('Chunk1 audit incomplete');
console.log(JSON.stringify(entries, null, 2));
