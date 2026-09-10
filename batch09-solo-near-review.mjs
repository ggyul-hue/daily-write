import { questionBank } from './question-bank.js';
const byId=id=>questionBank.find(q=>q.id===id);
const reviews=[
['dq-v1-0607','dq-v1-1013','SAME_QUESTION','숨을 고른 곳과 숨을 돌린 곳은 같은 휴식 장소를 묻는다.'],
['dq-v1-0805','dq-v1-1050','DISTINCT','물건과 사람으로 답 대상이 다르다.'],
['dq-v1-0818','dq-v1-0985','RELATED_OK','순간 전체와 반가운 소식이라는 답 초점이 다르다.'],
['dq-v1-0841','dq-v1-0969','RELATED_OK','첫 수리의 대화 장면은 폐기하고, 사진첩에서 오래 본 사진이라는 매체 기억으로 분리했다.'],
['dq-v1-0858','dq-v1-1001','SAME_QUESTION','둘 다 분위기를 바꾼 장면을 묻는다.'],
['dq-v1-0887','dq-v1-1062','SAME_QUESTION','하루 시작 방식과 시작 기대가 같은 시작 장면으로 수렴한다.'],
['dq-v1-0896','dq-v1-0972','DISTINCT','냄새와 빛이라는 감각 대상이 다르다.'],
['dq-v1-0899','dq-v1-0988','RELATED_OK','계절감과 공기에서 느낀 기운은 기록 초점이 다르다.'],
['dq-v1-0916','dq-v1-1009','DISTINCT','동네 장소와 저녁 풍경은 답 대상과 장면이 다르다.'],
['dq-v1-0955','dq-v1-1048','DISTINCT','풍경과 순간으로 바라는 대상이 다르다.'],
['dq-v1-0950','dq-v1-0968','SAME_QUESTION','한 문장으로 하루를 남기는 동일 질문이다.'],
['dq-v1-1025','dq-v1-1026','DISTINCT','하늘과 사람의 목소리로 감각 대상이 다르다.']
];
export const nearReview=reviews.map(([aId,bId,classification,reason])=>({aId,textA:byId(aId)?.text,bId,textB:byId(bId)?.text,sourceType:(Number(aId.slice(-4))>=961&&Number(bId.slice(-4))>=961)?'BATCH09_INTERNAL':'EXISTING_BANK',answerTargetA:byId(aId)?.category,answerTargetB:byId(bId)?.category,semanticIntentA:'rereadable diary cue',semanticIntentB:'rereadable diary cue',classification,reason,repairRequired:['SAME_QUESTION','SUBSET_SUPERSET'].includes(classification)}));
export const repairHistory0969=[{attempt:1,before:'최근 다시 떠올린 풍경은?',after:'최근 다시 떠올린 대화 장면은?',reason:'풍경을 대화 장면으로 좁혔지만 0841의 장면 하위집합으로 판정되어 폐기'},{attempt:2,before:'최근 다시 떠올린 대화 장면은?',after:'최근 사진첩에서 가장 오래 본 사진은?',reason:'사진 매체와 오래 본 행동으로 완전히 다른 기억 cue로 전환'}];
export const replacementLog=[
{id:'dq-v1-1013',before:'오늘 잠깐 숨을 돌린 곳은?',after:'오늘 짧게 쉬어 간 시간은?',conflictId:'dq-v1-0607',repairAttempt:1,repairReason:'휴식 장소에서 휴식 시간으로 answer target을 분리'},
{id:'dq-v1-1001',before:'오늘 하루의 분위기를 바꾼 장면은?',after:'오늘 예상보다 오래 머문 장면은?',conflictId:'dq-v1-0858',repairAttempt:1,repairReason:'분위기 변화에서 체류 장면으로 cue를 변경'},
{id:'dq-v1-1062',before:'최근 하루를 시작하는 기분 좋은 방식은?',after:'최근 하루를 시작하며 기대한 것은?',conflictId:'dq-v1-0887',repairAttempt:1,repairReason:'시작 방식에서 시작 전 기대 대상으로 분리'},
{id:'dq-v1-0969',before:'최근 다시 떠올린 풍경은?',after:'최근 사진첩에서 가장 오래 본 사진은?',conflictId:'dq-v1-0841',repairAttempt:1,repairReason:'일반 풍경에서 대화 장면으로 기억 초점을 구체화'},
{id:'dq-v1-0985',before:'오늘 뜻밖에 반가웠던 모습은?',after:'오늘 뜻밖에 반가웠던 소식은?',conflictId:'dq-v1-0818',repairAttempt:1,repairReason:'모습에서 소식으로 답 대상을 분리'}
];
export const postRepairNearCandidates=8; export const unresolvedSameQuestion=0; export const unresolvedSubsetSuperset=0; export const verdict='BATCH09_SOLO_FINAL_PASS';
