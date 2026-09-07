export const questionBank = [
  { id: "best-food", text: "오늘 먹은 것 중 가장 좋았던 건 무엇이었나요?", category: "object_food", dailySlot: "light", roomEligible: true, roomChoices: ["집밥", "간식", "외식"] },
  { id: "most-seen", text: "오늘 가장 자주 본 것은 무엇이었나요?", category: "routine", dailySlot: "light", roomEligible: true, roomChoices: ["사람", "하늘", "화면"] },
  { id: "comfortable", text: "오늘 가장 편안했던 순간은 언제였나요?", category: "emotion", dailySlot: "reflect", roomEligible: true, roomChoices: ["잠깐 쉼", "익숙한 곳", "좋아하는 사람"] },
  { id: "word", text: "오늘을 가장 잘 닮은 단어는 무엇인가요?", category: "closing", dailySlot: "reflect", roomEligible: true, roomChoices: ["포근", "분주", "느긋"] },
  { id: "animal-day", text: "오늘이 동물이라면 무엇이었을까요?", category: "closing", dailySlot: "reflect", roomEligible: true, roomChoices: ["고양이", "강아지", "새"] },
  { id: "weather-choice", text: "오늘의 마음은 어느 쪽에 가까웠나요?", category: "emotion", dailySlot: "reflect", roomEligible: true, roomChoices: ["맑음", "흐림", "비"] },
  { id: "inside-out", text: "오늘은 어느 쪽이 더 좋았나요?", category: "place", dailySlot: "light", roomEligible: true, roomChoices: ["집 안", "바깥", "잘 모르겠어요"] },
  { id: "replay", text: "오늘 다시 보고 싶은 장면이 있나요?", category: "scene", dailySlot: "scene", roomEligible: true, roomChoices: ["웃었던 순간", "맛있는 순간", "조용한 순간"] },
  { id: "smell", text: "오늘에 냄새가 있다면 어떤 냄새일까요?", category: "senses", dailySlot: "light", roomEligible: true, roomChoices: ["커피 냄새", "비 냄새", "이불 냄새"] },
];

export const QUESTION_CATEGORIES = ["scene", "people", "routine", "senses", "place", "object_food", "emotion", "closing"];
export const DAILY_SLOTS = ["light", "scene", "reflect"];

