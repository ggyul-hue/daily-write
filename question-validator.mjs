import { fileURLToPath } from "node:url";
import { questionBank, QUESTION_CATEGORIES, DAILY_SLOTS } from "./question-bank.js";

export function normalizeQuestion(value) {
  return String(value ?? "").normalize("NFC").trim().replace(/\s+/g, " ").replace(/[?？。.!！]+$/u, "");
}

export const CATEGORY_QUOTA = {
  scene: 260, people: 200, routine: 220, senses: 180,
  place: 140, object_food: 140, emotion: 220, closing: 140,
};

function fail(message) { return { level: "error", message }; }
function warn(message) { return { level: "warning", message }; }

function nearDuplicate(a, b) {
  const grams = (value) => new Set(value.replace(/오늘|가장|무엇|어디|언제|있었나요|인가요|하나요|있나요/gu, "").match(/.{1,3}/gu) ?? []);
  const left = grams(a); const right = grams(b);
  const overlap = [...left].filter((gram) => right.has(gram)).length;
  return overlap >= 3 && overlap / Math.min(left.size, right.size) >= 0.7;
}

export function validateBank(bank, { final = false } = {}) {
  const errors = [];
  const warnings = [];
  const ids = new Map();
  const texts = new Map();
  bank.forEach((question, index) => {
    const label = `index ${index}`;
    if (!question || typeof question !== "object" || Array.isArray(question)) { errors.push(fail(`${label}: invalid data type`)); return; }
    if (typeof question.id !== "string" || !question.id.trim()) errors.push(fail(`${label}: empty ID`));
    else if (ids.has(question.id)) errors.push(fail(`${label}: duplicate ID ${question.id}`));
    else ids.set(question.id, question);
    if (typeof question.text !== "string" || !question.text.trim()) errors.push(fail(`${label}: missing text`));
    else {
      const normalized = normalizeQuestion(question.text);
      if (texts.has(normalized)) errors.push(fail(`${label}: normalized duplicate text with ${texts.get(normalized)}`));
      else texts.set(normalized, question.id);
      if (question.text.length > 70) warnings.push(warn(`${question.id}: question length ${question.text.length}`));
    }
    if (typeof question.category !== "string" || !QUESTION_CATEGORIES.includes(question.category)) errors.push(fail(`${label}: invalid category`));
    if (typeof question.dailySlot !== "string" || !DAILY_SLOTS.includes(question.dailySlot)) errors.push(fail(`${label}: invalid dailySlot`));
    if (typeof question.roomEligible !== "boolean") errors.push(fail(`${label}: missing roomEligible`));
    if (question.roomEligible) {
      if (!Array.isArray(question.roomChoices) || question.roomChoices.length !== 3) errors.push(fail(`${question.id}: roomChoices length !== 3`));
      else {
        const choices = new Set();
        question.roomChoices.forEach((choice) => {
          if (typeof choice !== "string" || !choice.trim()) errors.push(fail(`${question.id}: empty room choice`));
          const normalized = normalizeQuestion(choice);
          if (choices.has(normalized)) errors.push(fail(`${question.id}: duplicate room choice`));
          choices.add(normalized);
          if (choice.length > 8) warnings.push(warn(`${question.id}: long room choice`));
        });
      }
    } else if (question.roomChoices != null && (!Array.isArray(question.roomChoices) || question.roomChoices.length)) errors.push(fail(`${question.id}: non-room question has roomChoices`));
  });
  for (let i = 0; i < bank.length; i += 1) for (let j = i + 1; j < bank.length; j += 1) {
    const a = normalizeQuestion(bank[i]?.text); const b = normalizeQuestion(bank[j]?.text);
    if (a.length > 8 && b.length > 8 && nearDuplicate(a, b)) warnings.push(warn(`near-duplicate candidate: ${bank[i].id} / ${bank[j].id}`));
  }
  if (final) {
    if (bank.length !== 1500) errors.push(fail(`final total must be 1500, got ${bank.length}`));
    if (bank.filter((question) => question.roomEligible).length !== 500) errors.push(fail(`final roomEligible must be 500`));
    const categoryCounts = Object.fromEntries(QUESTION_CATEGORIES.map((category) => [category, 0]));
    bank.forEach((question) => { if (categoryCounts[question.category] !== undefined) categoryCounts[question.category] += 1; });
    Object.entries(CATEGORY_QUOTA).forEach(([category, quota]) => {
      if (categoryCounts[category] !== quota) errors.push(fail(`final ${category} quota must be ${quota}, got ${categoryCounts[category]}`));
    });
  }
  return { errors, warnings, ok: errors.length === 0 };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const final = process.argv.includes("--final");
  const result = validateBank(questionBank, { final });
  console.log(JSON.stringify({ mode: final ? "final" : "partial", total: questionBank.length, roomEligible: questionBank.filter((question) => question.roomEligible).length, errors: result.errors, warnings: result.warnings }, null, 2));
  if (!result.ok) process.exitCode = 1;
}
