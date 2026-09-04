import assert from "node:assert/strict";
import { dailyQuestions, dateKey, missedEvent } from "./data.js";
import { existsSync, readFileSync } from "node:fs";
import { animalManifest, getAnimalDefinition, poseKeys } from "./animal-manifest.js";
import { chooseBehavior, chooseMonthlySpecies, createAnimalProfile } from "./animal-system.js";

const cards = dailyQuestions("2026-09-03", ["best-food", "comfortable", "animal-day"]);
assert.equal(cards.length, 3);
assert.equal(new Set(cards.map((card) => card.category)).size, 3);
assert.equal(new Set(cards.map((card) => card.id)).size, 3);
assert.equal(dailyQuestions("2026-09-03")[0].id, dailyQuestions("2026-09-03")[0].id);
assert.match(missedEvent("2026-09-03"), /모찌/);
assert.equal(dateKey(new Date("2026-09-03T01:00:00Z")), "2026-09-03");
assert.equal(chooseMonthlySpecies({ disliked: ["hamster"], random: () => 0 }), "capybara");
assert.equal(chooseMonthlySpecies({ liked: ["dog"], random: () => 0.99 }), "dog");
assert.equal(createAnimalProfile("hamster", () => 0).coat, "cream");
assert.equal(chooseBehavior({ sleep: 1 }, () => 0), "sleep");
assert.equal(animalManifest.length, 16);
assert.equal(getAnimalDefinition({ species: "hamster", coat: "golden" }).variant, "mochi");
for (const animal of animalManifest) for (const pose of poseKeys) {
  const path = animal.poseAssets[pose];
  assert.ok(existsSync(path), `${animal.id} ${pose} asset exists`);
  assert.equal(readFileSync(path).at(25), 6, `${animal.id} ${pose} is RGBA PNG`);
}
console.log("data checks passed");
