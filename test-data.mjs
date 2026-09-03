import assert from "node:assert/strict";
import { dailyQuestions, dateKey, missedEvent } from "./data.js";
import { chooseMonthlySpecies, createAnimalProfile } from "./animal-system.js";

const cards = dailyQuestions("2026-09-03", ["best-food", "comfortable", "animal-day"]);
assert.equal(cards.length, 3);
assert.equal(new Set(cards.map((card) => card.category)).size, 3);
assert.equal(new Set(cards.map((card) => card.id)).size, 3);
assert.equal(dailyQuestions("2026-09-03")[0].id, dailyQuestions("2026-09-03")[0].id);
assert.match(missedEvent("2026-09-03"), /모찌/);
assert.equal(dateKey(new Date("2026-09-03T01:00:00Z")), "2026-09-03");
assert.equal(chooseMonthlySpecies({ disliked: ["hamster"], random: () => 0 }), "cat");
assert.equal(chooseMonthlySpecies({ liked: ["rabbit"], random: () => 0.99 }), "rabbit");
assert.equal(createAnimalProfile("hamster", () => 0).coat, "cream");
console.log("data checks passed");
