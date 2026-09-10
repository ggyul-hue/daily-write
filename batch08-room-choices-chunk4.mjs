export const chunk4 = [
  {
    "id": "dq-v1-0928",
    "question": "이번 달 누군가와 나눈 음식은?",
    "finalChoices": [
      "과일",
      "빵",
      "음료"
    ],
    "choiceDesignBlocked": false,
    "verdict": "PASS"
  },
  {
    "id": "dq-v1-0929",
    "question": "최근 선물하고 싶은 것은?",
    "finalChoices": [
      "꽃다발",
      "책",
      "간식 꾸러미"
    ],
    "choiceDesignBlocked": false,
    "verdict": "PASS"
  },
  {
    "id": "dq-v1-0927",
    "question": "최근 특별한 기억이 얽힌 물건은?",
    "finalChoices": [
      "사진",
      "편지",
      "기념품"
    ],
    "choiceDesignBlocked": true,
    "qualityFloorDrop": true,
    "blockers": [
      "LEVEL_MISMATCH",
      "COMMON_OVERLAP"
    ],
    "verdict": "CHOICE_DESIGN_BLOCKED_0927"
  }
];
export const activeChunk4 = ["dq-v1-0928","dq-v1-0929"];
export const summary = {activeCount:2,blockedCount:1,blockedIds:["dq-v1-0927"]};
