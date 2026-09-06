import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { growthProfile, speciesLabel, stageLabel, traitLabel } from "./pet-profile-ui.js";

assert.equal(speciesLabel("hamster"), "햄스터");
assert.equal(speciesLabel("capybara"), "카피바라");
assert.equal(speciesLabel("cat"), "고양이");
assert.equal(speciesLabel("dog"), "강아지");
assert.equal(stageLabel("SMALL"), "작은 친구");
assert.equal(traitLabel("collector"), "수집하는 걸 좋아해요");
assert.equal(traitLabel("unknown"), "아직 어떤 성격인지 알아가는 중이에요.");

assert.deepEqual(growthProfile({ loaded: false }), { kind: "loading" });
assert.deepEqual(growthProfile({ loaded: true, growthStage: null, growthPoints: null }), { kind: "unavailable" });
assert.deepEqual(growthProfile({ loaded: true, growthStage: "SMALL", growthPoints: 3, primaryTrait: null }), {
  kind: "ready", stage: "작은 친구", points: 3, next: "다음 성장까지 4개", progress: 0, trait: "아직 어떤 성격인지 알아가는 중이에요.",
});
assert.equal(growthProfile({ loaded: true, growthStage: "SMALL", growthPoints: 4, primaryTrait: "collector" }).next, "다음 성장까지 3개");
assert.equal(growthProfile({ loaded: true, growthStage: "GROWN", growthPoints: 14, primaryTrait: "reader" }).next, "다 자랐어요.");

const html = readFileSync("index.html", "utf8");
const app = readFileSync("app.js", "utf8");
const css = readFileSync("styles.css", "utf8");
assert.match(html, /id="pet-record"/);
assert.match(html, /id="pet-record-name"/);
assert.match(html, /ADOPTION RECORD/);
assert.match(html, /id="pet-record-photo-image"/);
assert.match(html, /Nanum\+Pen\+Script/);
assert.match(html, /id="hamster"[^>]*role="img"/);
assert.doesNotMatch(html, /pet-profile-sheet/);
assert.match(app, /function renderPetRecord\(\)/);
assert.match(app, /photo\.src = imagePath\("idle"\)/);
assert.match(app, /addField\("이름", name\)/);
assert.match(app, /addField\("분류", speciesLabel/);
assert.match(app, /addField\("지금 모습", profile\.stage\)/);
assert.match(app, /addField\("함께한 조각", `\$\{profile\.points\}개`\)/);
assert.doesNotMatch(app, /openPetProfile|closePetProfile|petProfileOpen/);
assert.doesNotMatch(app.slice(app.indexOf("function renderPetRecord"), app.indexOf("function renderAnimal")), /roomBackend/);
assert.match(css, /\.pet-record \{[^}]*border-radius:8px/);
assert.match(css, /\.pet-record-progress \{[^}]*height:2px/);
assert.match(css, /\.pet-record-photo \{[^}]*width:78px[^}]*height:78px/);
assert.match(css, /Nanum Pen Script/);
assert.match(app, /오늘도 조금씩 \$\{animalNameWithParticle\("을", "를"\)\} 알아가는 중/);
console.log("phase 4D profile checks passed");
