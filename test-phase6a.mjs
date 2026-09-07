import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { animalManifest } from "./animal-manifest.js";
import { adoptionCandidates, createAdoptionDraft, nextAdoptionDraft } from "./onboarding.js";
import { createRuntimePetState } from "./pet-runtime.js";

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
const css = readFileSync("styles.css", "utf8");
assert.match(app, /const isNewUser = !storedAnimalProfile && !hasLegacyUsageEvidence/);
assert.doesNotMatch(app, /if \(!animalProfile\) \{ animalProfile = createAnimalProfile\("hamster"\); localStorage\.setItem\(ANIMAL_KEY/);
assert.match(app, /function saveActiveAnimalProfile\(speciesName, variant\)/);
assert.match(app, /if \(isNewUser\) \{\s*renderAdoption\(\);\s*showView\("adoption"\);/);
assert.match(app, /else \{\s*beginNormalApp\(\);\s*\}/);
assert.match(app, /animalNameWithParticle\("과", "와", selected\.displayName\)\} 함께하기/);
assert.match(css, /\.adoption-candidates \{[^}]*grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/);
assert.doesNotMatch(css, /\.adoption-candidate:first-child \{\s*grid-column:1 \/ -1/);
assert.match(css, /@media \(max-width:599px\)/);
assert.match(css, /\.adoption-view h1 \{ margin:10px 0 8px; font-size:clamp\(29px,8vw,33px\); line-height:1\.16; \}/);
assert.match(app, /const canUseFragmentBackend = !isQaMode \|\| isOnboardingQa/);
assert.match(app, /function startFragmentLifecycle\(\) \{\s*return fragmentState\.pending\.length \? syncPendingFragments\(\) : restoreFragmentEvents\(\);\s*\}/);
assert.match(app, /await roomBackend\.initialize\(\)[\s\S]*?await restoreFragmentEvents\(\)/);
assert.match(app, /\$\("#answer-form button\[type=submit\]\"\)\.textContent = `\$\{animalName\(\)\}에게 들려주기`/);
assert.match(app, /runtimePetState = createRuntimePetState\(identity, \{ \.\.\.pet, growth_points: result\.growth_points \}\)/);
assert.match(app, /await loadRuntimePetState\(\{ force: true \}\)/);
assert.match(app, /previousState\.identity === identity && previousState\.loaded/);
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
for (const [name, subject, companion] of [["크림", "크림이", "크림과"], ["구름", "구름이", "구름과"], ["밀크", "밀크가", "밀크와"], ["모찌", "모찌가", "모찌와"], ["밤이", "밤이가", "밤이와"], ["클로버", "클로버가", "클로버와"], ["치즈", "치즈가", "치즈와"], ["귤이", "귤이가", "귤이와"]]) {
  context.animalProfile = { name };
  assert.equal(context.animalNameWithParticle("이", "가"), subject);
  assert.equal(context.animalSubjectName(), subject);
  assert.equal(context.animalNameWithParticle("과", "와"), companion);
  context.showAdoptionComplete({ displayName: name });
  assert.equal(elements.get("#adoption-complete-title").textContent, `${subject} 우리 집에 왔어요. 🌱`);
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
for (const [points, stage, trait] of [[3, "SMALL", "walker"], [7, "GROWING", "sleepy"], [14, "GROWN", "reader"]]) {
  const state = createRuntimePetState("capybara:towel", { growth_points: points, growth_stage: stage, growth_scale: 1, traits: { primary: trait } });
  assert.deepEqual({ points: state.growthPoints, stage: state.growthStage, scale: state.growthScale, trait: state.primaryTrait, loaded: state.loaded, identity: state.identity }, { points, stage, scale: 1, trait, loaded: true, identity: "capybara:towel" });
}
console.log("phase 6A onboarding, Korean particles, and refresh persistence checks passed");
