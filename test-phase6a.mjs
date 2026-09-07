import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { animalManifest } from "./animal-manifest.js";
import { adoptionCandidates, createAdoptionDraft, nextAdoptionDraft } from "./onboarding.js";

const draft = createAdoptionDraft(animalManifest, "qa-seed");
assert.equal(draft.candidates.length, 3);
assert.equal(new Set(draft.candidates.map((candidate) => candidate.species)).size, 3);
assert.deepEqual(adoptionCandidates(animalManifest, "qa-seed"), draft.candidates);
assert.deepEqual(createAdoptionDraft(animalManifest, "qa-seed"), draft);
const nextDraft = nextAdoptionDraft(animalManifest, draft);
const omittedSpecies = [...new Set(animalManifest.map((animal) => animal.species))].find((species) => !draft.candidates.some((candidate) => candidate.species === species));
assert.notDeepEqual(nextDraft.candidates, draft.candidates);
assert.ok(nextDraft.candidates.some((candidate) => candidate.species === omittedSpecies));
const app = readFileSync("app.js", "utf8");
assert.match(app, /const isNewUser = !storedAnimalProfile && !hasLegacyUsageEvidence/);
assert.doesNotMatch(app, /if \(!animalProfile\) \{ animalProfile = createAnimalProfile\("hamster"\); localStorage\.setItem\(ANIMAL_KEY/);
assert.match(app, /function saveActiveAnimalProfile\(speciesName, variant\)/);
assert.match(app, /if \(isNewUser\) \{\s*renderAdoption\(\);\s*showView\("adoption"\);/);
assert.match(app, /else \{\s*beginNormalApp\(\);\s*\}/);
// Run the production functions without starting a browser or backend.
const functionSource = (name) => app.match(new RegExp(`function ${name}\\([^]*?\\n\\}`))[0];
const elements = new Map();
const storage = new Map();
const context = {
  animalManifest, createAdoptionDraft,
  localStorage: { getItem: (key) => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value) },
  ANIMAL_KEY: "profile", ADOPTION_DRAFT_KEY: "draft",
  readJson: (key) => JSON.parse(storage.get(key) ?? "null"),
  newAdoptionSeed: () => "refresh-test-seed",
  petIdentity: (animal) => `${animal.species}:${animal.variant}`,
  createRuntimePetState: () => ({}), applyRuntimePetScale: () => {},
  $: (selector) => {
    if (!elements.has(selector)) elements.set(selector, { classList: { add() {}, remove() {} } });
    return elements.get(selector);
  },
};
runInNewContext([
  'function animalName() { return animalProfile.name; }',
  ...["animalNameWithParticle", "animalSubjectName", "showAdoptionComplete", "isValidAdoptionDraft", "currentAdoptionDraft", "profileForAnimal", "saveActiveAnimalProfile"].map(functionSource),
].join("\n"), context);
for (const [name, expected] of [["크림", "크림이"], ["구름", "구름이"], ["밀크", "밀크가"], ["모찌", "모찌가"], ["밤이", "밤이가"], ["클로버", "클로버가"]]) {
  context.animalProfile = { name };
  assert.equal(context.animalNameWithParticle("이", "가"), expected);
  assert.equal(context.animalSubjectName(), expected);
  context.showAdoptionComplete({ displayName: name });
  assert.equal(elements.get("#adoption-complete-title").textContent, `${expected} 우리 집에 왔어요. 🌱`);
}
const beforeRefresh = JSON.stringify(context.currentAdoptionDraft());
context.newAdoptionSeed = () => { throw new Error("refresh must reuse the stored draft"); };
assert.equal(JSON.stringify(context.currentAdoptionDraft()), beforeRefresh);
const chosen = JSON.parse(beforeRefresh).candidates[0];
context.saveActiveAnimalProfile(chosen.species, chosen.variant);
const restoredProfile = JSON.parse(storage.get("profile"));
assert.equal(restoredProfile.species, chosen.species);
assert.equal(restoredProfile.variant, chosen.variant);
const bootDecision = app.slice(app.lastIndexOf("if (isNewUser) {"), app.lastIndexOf('$("#feed-fragment")'));
let normalBoots = 0;
runInNewContext(`${app.match(/const isNewUser = [^;]+;/)[0]}\n${bootDecision}`, {
  storedAnimalProfile: restoredProfile, hasLegacyUsageEvidence: false,
  renderAdoption: () => assert.fail("adopted user must skip onboarding after refresh"),
  showView: () => assert.fail("onboarding must not reappear"),
  beginNormalApp: () => { normalBoots += 1; },
});
assert.equal(normalBoots, 1);
console.log("phase 6A onboarding, Korean particles, and refresh persistence checks passed");
