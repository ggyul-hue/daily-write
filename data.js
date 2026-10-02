import { questionBank } from "./question-bank.js";
import { legacyDailyQuestions, resolveDailyQuestionSet } from "./daily-selector-lifecycle-v1.js";
export { resolveDailyQuestionSet };

const legacyQuestionTypes = new Map([
  ["weather-choice", { type: "choice", options: ["맑음", "흐림", "비"] }],
  ["inside-out", { type: "choice", options: ["집 안", "바깥", "잘 모르겠어요"] }],
]);

export const questions = questionBank.map((question) => ({
  ...question,
  type: legacyQuestionTypes.get(question.id)?.type || "text",
  ...(legacyQuestionTypes.get(question.id)?.options ? { options: legacyQuestionTypes.get(question.id).options } : {}),
}));

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
  const resolved = resolveDailyQuestionSet(day);
  if (resolved.mode === "LEGACY") return legacyDailyQuestions(day, answeredQuestionIds);
  return resolved.questions.map((question) => questions.find((entry) => entry.id === question.id));
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
