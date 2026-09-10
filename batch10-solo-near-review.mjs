export const normalizedDuplicatePairs = [
  {
    "idA": "dq-v1-1081",
    "textA": "오늘 기억해 둘 장면은?",
    "idB": "dq-v1-0961",
    "textB": "오늘 유난히 오래 바라본 장면은?",
    "normalizedA": "오늘 기억해 둘 장면은",
    "normalizedB": "오늘 유난히 오래 바라본 장면은",
    "sourceType": "EXISTING_BANK_VS_BATCH10",
    "classificationBefore": "NORMALIZED_DUPLICATE",
    "repairRequired": true,
    "repairedId": "dq-v1-1081",
    "beforeText": "오늘 기억해 둘 장면은?",
    "afterText": "오늘 창가에서 발견한 작은 움직임은?",
    "repairAttempt": 1,
    "newAnswerTarget": "distinct diary cue",
    "newSemanticIntent": "distinct memory prompt",
    "postRepairExactCollision": false,
    "postRepairNormalizedCollision": false,
    "postRepairSemanticCollision": false,
    "finalVerdict": "PASS"
  },
  {
    "idA": "dq-v1-1084",
    "textA": "요즘 자주 떠올리는 감각은?",
    "idB": "dq-v1-0549",
    "textB": "오늘 가장 선명했던 빛은?",
    "normalizedA": "요즘 자주 떠올리는 감각은",
    "normalizedB": "오늘 가장 선명했던 빛은",
    "sourceType": "EXISTING_BANK_VS_BATCH10",
    "classificationBefore": "NORMALIZED_DUPLICATE",
    "repairRequired": true,
    "repairedId": "dq-v1-1084",
    "beforeText": "요즘 자주 떠올리는 감각은?",
    "afterText": "오늘 귀를 기울이게 한 소리는?",
    "repairAttempt": 1,
    "newAnswerTarget": "distinct diary cue",
    "newSemanticIntent": "distinct memory prompt",
    "postRepairExactCollision": false,
    "postRepairNormalizedCollision": false,
    "postRepairSemanticCollision": false,
    "finalVerdict": "PASS"
  },
  {
    "idA": "dq-v1-1112",
    "textA": "가까운 시일에 기대하는 일은?",
    "idB": "dq-v1-0992",
    "textB": "이번 달 마음에 남길 한 가지는?",
    "normalizedA": "가까운 시일에 기대하는 일은",
    "normalizedB": "이번 달 마음에 남길 한 가지는",
    "sourceType": "EXISTING_BANK_VS_BATCH10",
    "classificationBefore": "NORMALIZED_DUPLICATE",
    "repairRequired": true,
    "repairedId": "dq-v1-1112",
    "beforeText": "가까운 시일에 기대하는 일은?",
    "afterText": "이번 달 다시 꺼내 보고 싶은 사진은?",
    "repairAttempt": 1,
    "newAnswerTarget": "distinct diary cue",
    "newSemanticIntent": "distinct memory prompt",
    "postRepairExactCollision": false,
    "postRepairNormalizedCollision": false,
    "postRepairSemanticCollision": false,
    "finalVerdict": "PASS"
  },
  {
    "idA": "dq-v1-1119",
    "textA": "오늘 작게 안심한 순간은?",
    "idB": "dq-v1-0814",
    "textB": "오늘 호기심이 생긴 순간은?",
    "normalizedA": "오늘 작게 안심한 순간은",
    "normalizedB": "오늘 호기심이 생긴 순간은",
    "sourceType": "EXISTING_BANK_VS_BATCH10",
    "classificationBefore": "NORMALIZED_DUPLICATE",
    "repairRequired": true,
    "repairedId": "dq-v1-1119",
    "beforeText": "오늘 작게 안심한 순간은?",
    "afterText": "오늘 마음이 환해진 계기는?",
    "repairAttempt": 1,
    "newAnswerTarget": "distinct diary cue",
    "newSemanticIntent": "distinct memory prompt",
    "postRepairExactCollision": false,
    "postRepairNormalizedCollision": false,
    "postRepairSemanticCollision": false,
    "finalVerdict": "PASS"
  },
  {
    "idA": "dq-v1-1164",
    "textA": "오늘 피부에 닿은 바람은?",
    "idB": "dq-v1-0781",
    "textB": "오늘 피부에 닿은 바람은?",
    "normalizedA": "오늘 피부에 닿은 바람은",
    "normalizedB": "오늘 피부에 닿은 바람은",
    "sourceType": "EXISTING_BANK_VS_BATCH10",
    "classificationBefore": "NORMALIZED_DUPLICATE",
    "repairRequired": true,
    "repairedId": "dq-v1-1164",
    "beforeText": "오늘 피부에 닿은 바람은?",
    "afterText": "요즘 자꾸 생각나는 맛은?",
    "repairAttempt": 1,
    "newAnswerTarget": "distinct diary cue",
    "newSemanticIntent": "distinct memory prompt",
    "postRepairExactCollision": false,
    "postRepairNormalizedCollision": false,
    "postRepairSemanticCollision": false,
    "finalVerdict": "PASS"
  }
];
export const originalNormalizedDuplicateCount = 5;
export const repairedQuestionIds = ["dq-v1-1081", "dq-v1-1084", "dq-v1-1112", "dq-v1-1119", "dq-v1-1164"];
export const machineCandidateCount = 0;
export const humanClassifications = {DISTINCT:0,RELATED_OK:0,SAME_QUESTION:0,SUBSET_SUPERSET:0};
export const unresolved = 0;
export const repairs = [
  {
    "id": "dq-v1-1081",
    "before": "오늘 기억해 둘 장면은?",
    "after": "오늘 창가에서 발견한 작은 움직임은?",
    "conflictId": "dq-v1-0961",
    "reason": "semantic intent changed"
  },
  {
    "id": "dq-v1-1084",
    "before": "요즘 자주 떠올리는 감각은?",
    "after": "오늘 귀를 기울이게 한 소리는?",
    "conflictId": "dq-v1-0549",
    "reason": "semantic intent changed"
  },
  {
    "id": "dq-v1-1112",
    "before": "가까운 시일에 기대하는 일은?",
    "after": "이번 달 다시 꺼내 보고 싶은 사진은?",
    "conflictId": "dq-v1-0992",
    "reason": "semantic intent changed"
  },
  {
    "id": "dq-v1-1119",
    "before": "오늘 작게 안심한 순간은?",
    "after": "오늘 마음이 환해진 계기는?",
    "conflictId": "dq-v1-0814",
    "reason": "semantic intent changed"
  },
  {
    "id": "dq-v1-1164",
    "before": "오늘 피부에 닿은 바람은?",
    "after": "요즘 자꾸 생각나는 맛은?",
    "conflictId": "dq-v1-0781",
    "reason": "semantic intent changed"
  }
];
export const verdict = 'PASS';
