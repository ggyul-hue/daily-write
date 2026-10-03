import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  completeFirstUseGuide,
  normalizeFirstUseGuideState,
  shouldAutoShowFirstUseGuide,
  skipFirstUseGuide,
  startFirstUseGuide,
} from "./solo-first-use-guide.js";

const app = readFileSync("app.js", "utf8");
const html = readFileSync("index.html", "utf8");

assert.equal(normalizeFirstUseGuideState({ status: "unknown" }), null);
assert.equal(shouldAutoShowFirstUseGuide(null), false);
assert.equal(shouldAutoShowFirstUseGuide({ status: "eligible" }), true);

// Adoption completion keeps eligibility across a reload before the first Solo entry.
const afterAdoption = { status: "eligible" };
const afterReload = normalizeFirstUseGuideState(JSON.parse(JSON.stringify(afterAdoption)));
assert.equal(shouldAutoShowFirstUseGuide(afterReload), true);
assert.match(app, /if \(isNewUser\) saveFirstUseGuideState\(\{ status: "eligible" \}\)/);
assert.match(app, /if \(shouldAutoShowFirstUseGuide\(firstUseGuideState\)\) showFirstUseGuide\(\)/);

// Starting or skipping prevents automatic re-show after reload; successful feed completes a started guide.
const started = startFirstUseGuide(afterReload);
assert.deepEqual(started, { status: "active" });
assert.equal(shouldAutoShowFirstUseGuide(JSON.parse(JSON.stringify(started))), false);
assert.deepEqual(completeFirstUseGuide(started), { status: "completed" });
const skipped = skipFirstUseGuide(afterReload);
assert.deepEqual(skipped, { status: "skipped" });
assert.equal(shouldAutoShowFirstUseGuide(JSON.parse(JSON.stringify(skipped))), false);
assert.match(app, /setFirstUseGuideHintState\("complete"\)/);

// Existing profiles/records do not receive eligibility; Garden always exposes a manual re-entry point.
assert.match(app, /const isNewUser = !storedAnimalProfile && !hasLegacyUsageEvidence/);
assert.match(html, /id="first-use-guide-reopen"[^>]*>사용 방법<\/button>/);
assert.match(app, /\$\("#first-use-guide-reopen"\)\.addEventListener\("click", showFirstUseGuide\)/);

// Guidance stays contextual: pending has one line, growth is explained only for an actionable feed CTA.
assert.match(app, /답변은 저장됐어요\. 조각은 준비가 끝나면 이어서 만날게요\./);
assert.match(app, /detail\.textContent = ""/);
assert.match(app, /!button\.disabled && stateName !== "PET_LOAD_ERROR"\s*\? "조각을 건네면 오늘의 기록이 아이의 성장으로 이어져요\."/);
assert.match(app, /답변은 이 브라우저에 저장되며 다른 기기와 자동 동기화되지 않아요\./);

console.log("first-use guide v1 checks passed");
