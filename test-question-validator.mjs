import assert from "node:assert/strict";
import { questionBank } from "./question-bank.js";
import { duplicateRoomTriplets, normalizeQuestion, validateBank } from "./question-validator.mjs";

const partial = validateBank(questionBank);
assert.equal(partial.ok, true);
assert.equal(partial.errors.length, 0);
assert.equal(questionBank.length, 249);
assert.equal(questionBank.filter((question) => question.roomEligible).length, 89);
assert.equal(normalizeQuestion(" 오늘은 괜찮았나요?  "), "오늘은 괜찮았나요");

const base = { id: "dq-v1-0001", text: "오늘의 질문", category: "scene", dailySlot: "scene", roomEligible: false };
assert.equal(validateBank([base, { ...base, id: "dq-v1-0002" }]).errors.some(({ message }) => message.includes("normalized duplicate")), true);
assert.equal(validateBank([{ ...base, category: "unknown" }]).errors.some(({ message }) => message.includes("invalid category")), true);
assert.equal(validateBank([{ ...base, dailySlot: "unknown" }]).errors.some(({ message }) => message.includes("invalid dailySlot")), true);
assert.equal(validateBank([{ ...base, roomEligible: true, roomChoices: ["하나", "하나", "셋"] }]).errors.some(({ message }) => message.includes("duplicate room choice")), true);
assert.equal(validateBank([{ ...base, roomEligible: true, roomChoices: ["하나", "둘"] }]).errors.some(({ message }) => message.includes("roomChoices length")), true);
const duplicateTripletBank = [{ ...base, roomEligible: true, roomChoices: ["친구", "가족", "동료"] }, { ...base, id: "dq-v1-0002", roomEligible: true, roomChoices: ["친구", "가족", "동료"] }];
assert.equal(duplicateRoomTriplets(duplicateTripletBank).length, 1);
assert.equal(validateBank(duplicateTripletBank).warnings.some(({ message }) => message.includes("duplicate room choice triplet")), true);
assert.equal(validateBank([base], { final: true }).ok, false);
assert.equal(validateBank(Array.from({ length: 1500 }, (_, index) => ({ ...base, id: `dq-v1-${String(index).padStart(4, "0")}` })), { final: true }).errors.some(({ message }) => message.includes("scene quota")), true);
console.log("question validator tests passed");
