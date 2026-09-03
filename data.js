export const questions = [
  { id: "best-food", category: "light", text: "오늘 먹은 것 중 가장 좋았던 건 무엇이었나요?", type: "text" },
  { id: "most-seen", category: "light", text: "오늘 가장 자주 본 것은 무엇이었나요?", type: "text" },
  { id: "comfortable", category: "reflective", text: "오늘 가장 편안했던 순간은 언제였나요?", type: "text" },
  { id: "word", category: "reflective", text: "오늘을 가장 잘 닮은 단어는 무엇인가요?", type: "text" },
  { id: "animal-day", category: "playful", text: "오늘이 동물이라면 무엇이었을까요?", type: "text" },
  { id: "weather-choice", category: "playful", text: "오늘의 마음은 어느 쪽에 가까웠나요?", type: "choice", options: ["맑음", "흐림", "비"] },
  { id: "inside-out", category: "playful", text: "오늘은 어느 쪽이 더 좋았나요?", type: "choice", options: ["집 안", "바깥", "잘 모르겠어요"] },
  { id: "replay", category: "reflective", text: "오늘 다시 보고 싶은 장면이 있나요?", type: "text" },
  { id: "smell", category: "playful", text: "오늘에 냄새가 있다면 어떤 냄새일까요?", type: "text" }
];

const categories = ["light", "reflective", "playful"];

export function dateKey(date = new Date()) {
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
}

function seedFor(value) {
  return [...value].reduce((seed, character) => ((seed << 5) - seed + character.charCodeAt(0)) | 0, 0) >>> 0;
}

function pick(items, seed) {
  return items[seed % items.length];
}

export function dailyQuestions(day, answeredQuestionIds = []) {
  const seed = seedFor(day);
  return categories.map((category, index) => {
    const eligible = questions.filter((question) => question.category === category && !answeredQuestionIds.includes(question.id));
    return pick(eligible.length ? eligible : questions.filter((question) => question.category === category), seed + index * 17);
  });
}

export function idleEvent(day) {
  const events = [
    "모찌는 작은 돌멩이를 주머니에 모으고 있어요.",
    "모찌는 풀잎 사이에서 낮잠 자리를 찾았어요.",
    "모찌는 구름이 몇 개인지 세고 있어요.",
    "모찌는 꽃잎으로 편지를 접고 있어요."
  ];
  return pick(events, seedFor(day));
}

export function missedEvent(day) {
  const events = [
    "모찌는 기다리다 지쳐 치즈를 공부하기 시작했어요.",
    "모찌는 오늘 본 구름에 이름을 붙이고 있어요.",
    "모찌는 꽃 옆에서 단추를 세고 있어요.",
    "모찌는 민들레 뒤에서 아주 오래 멍하니 있었어요."
  ];
  return pick(events, seedFor(day));
}
