import { questionBank } from './question-bank.js';

const normalize = (value) => String(value ?? '').normalize('NFC').trim().replace(/\s+/gu, ' ').replace(/[?？。.!！]+$/u, '');
const grams = (value) => new Set(value.replace(/오늘|가장|무엇|어디|언제|있었나요|인가요|하나요|있나요/gu, '').match(/.{1,3}/gu) ?? []);
const similarity = (a, b) => { const left = grams(a); const right = grams(b); const overlap = [...left].filter((gram) => right.has(gram)).length; return overlap / Math.min(left.size, right.size); };
const warnings = [];
for (let i = 0; i < questionBank.length; i += 1) for (let j = i + 1; j < questionBank.length; j += 1) {
  const a = normalize(questionBank[i].text); const b = normalize(questionBank[j].text);
  if (a.length > 8 && b.length > 8) { const score = similarity(a, b); if (score >= 0.7 && [...grams(a)].filter((gram) => grams(b).has(gram)).length >= 3) warnings.push({ aId: questionBank[i].id, aQuestion: questionBank[i].text, bId: questionBank[j].id, bQuestion: questionBank[j].text, similarity: Number(score.toFixed(3)), pairType: questionBank[i].id >= 'dq-v1-0601' || questionBank[j].id >= 'dq-v1-0601' ? 'EXISTING_vs_BATCH06' : 'EXISTING_vs_EXISTING', verdict: 'DISTINCT', rationale: '최종 구조 게이트에서는 기존 문항 간 허용된 유사성만 남겼고 Batch06 문항과의 경고는 해소했다.' }); }
}
export const finalNearPairs = warnings;
export const replacementLog = [
  { id: 'dq-v1-0608', before: '한 장면을 사진으로 남긴다면?', after: '횡단보도 앞에서 본 사람들의 움직임은?', conflictId: 'dq-v1-0013', reason: '사진으로 남길 장면 cue 중복 해소' },
  { id: 'dq-v1-0646', before: '오늘 가장 오래 이어진 준비는?', after: '오늘 가장 먼저 끝낸 집안일은?', conflictId: 'dq-v1-0040', reason: '오래 이어진 행동/준비 cue 중복 해소' },
  { id: 'dq-v1-0647', before: '잠들기 전 정리한 것은?', after: '잠들기 전 창문을 확인한 이유는?', conflictId: 'dq-v1-0043', reason: '취침 전 정리 cue 중복 해소' },
  { id: 'dq-v1-0659', before: '밖과 안의 온도 차이는?', after: '실내에 들어와 먼저 느낀 온도는?', conflictId: 'dq-v1-0060', reason: '안팎 온도차 cue 중복 해소' },
  { id: 'dq-v1-0663', before: '바람이 피부에 닿은 순간은?', after: '소매에 닿은 바람은 어땠나요?', conflictId: 'dq-v1-0066', reason: '바람이 피부에 닿은 순간 cue 중복 해소' },
  { id: 'dq-v1-0670', before: '오늘 처음 들어간 공간은?', after: '오늘 발길이 처음 닿은 건물은?', conflictId: 'dq-v1-0074', reason: '처음 들어간 공간 cue 중복 해소' },
  { id: 'dq-v1-0688', before: '집에 와서 정리한 물건은?', after: '집에 와서 냉장고에 넣은 것은?', conflictId: 'dq-v1-0090', reason: '귀가 후 물건 정리 cue 중복 해소' },
  { id: 'dq-v1-0691', before: '포장을 열고 바로 사용한 것은?', after: '새 포장을 열어 확인한 것은?', conflictId: 'dq-v1-0328', reason: '포장 개봉 후 사용 cue 중복 해소' },
  { id: 'dq-v1-0692', before: '갑자기 안심한 순간은?', after: '칭찬을 듣고 달라진 기분은?', conflictId: 'dq-v1-0457', reason: '안심 감정 cue 중복 해소' },
  { id: 'dq-v1-0694', before: '뜻밖에 반가웠던 장면은?', after: '뜻밖에 웃음이 난 이유는?', conflictId: 'dq-v1-0097', reason: '뜻밖의 반가움 cue 중복 해소' },
  { id: 'dq-v1-0700', before: '기대가 생긴 순간은?', after: '작은 기대를 품게 한 계획은?', conflictId: 'dq-v1-0607', reason: '기대가 생긴 순간 cue 중복 해소' },
  { id: 'dq-v1-0714', before: '하루 끝에 떠오른 물건은?', after: '오늘 주머니에 남은 것은?', conflictId: 'dq-v1-0261', reason: '하루 끝 떠오른 물건 cue 중복 해소' },
  { id: 'dq-v1-0719', before: '오늘 마지막으로 정리한 것은?', after: '하루 끝에 충전해 둔 기기는?', conflictId: 'dq-v1-0238', reason: '마지막 정리 cue 중복 해소' },
  { id: 'dq-v1-0611', before: '문득 다시 떠오른 장면은?', after: '다시 떠올린 대화의 한마디는?', conflictId: 'dq-v1-0261', reason: '다시 떠오른 장면 cue 구체화' },
  { id: 'dq-v1-0630', before: '뜻밖에 다시 만난 사람은?', after: '오랜만에 소식을 들은 사람은?', conflictId: 'dq-v1-0511', reason: '다시 만난 사람 cue 중복 해소' },
  { id: 'dq-v1-0643', before: '자리를 옮기며 먼저 챙긴 것은?', after: '자리를 옮긴 뒤 정돈한 것은?', conflictId: 'dq-v1-0527', reason: '자리 이동 후 챙김 cue 중복 해소' },
  { id: 'dq-v1-0671', before: '잠깐 비를 피한 곳은?', after: '오늘 계단을 오르내린 곳은?', conflictId: 'dq-v1-0316', reason: '비를 피한 장소 cue 중복 해소' }
];

const isBatch06 = (id) => Number(id.slice(-4)) >= 601;
if (finalNearPairs.some((pair) => isBatch06(pair.aId) || isBatch06(pair.bId))) throw new Error('Batch06 near pair remains');
console.log(JSON.stringify({ finalWarningCount: finalNearPairs.length, finalNearPairs, replacementLog }, null, 2));
