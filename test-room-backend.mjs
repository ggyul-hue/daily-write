import assert from "node:assert/strict";
import { normalizeInviteCode } from "./room-backend.js";

assert.equal(normalizeInviteCode("m7-k4pq"), "M7K4PQ");
assert.equal(normalizeInviteCode("O0I1"), "");
assert.equal(normalizeInviteCode(" ab 29 "), "AB29");
console.log("room backend checks passed");
