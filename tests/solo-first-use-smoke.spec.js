import { expect, test } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const backendMock = `
let fragment = null;
let pet = null;
const growthStage = (points) => points >= 14 ? "GROWN" : points >= 7 ? "GROWING" : points >= 3 ? "SMALL" : "BABY";
export function normalizeInviteCode(value) { return String(value || "").toUpperCase().replace(/[^A-HJ-NP-Z2-9]/g, ""); }
export const roomBackend = {
  isConfigured: true,
  async initialize() { return { configured: true, user: { id: "ephemeral-smoke-user" }, profile: null }; },
  async listFragmentEventsFromExistingSession() { return fragment ? [{ ...fragment }] : []; },
  async claimDailyFragment({ date, source }) {
    fragment ||= { id: "ephemeral-smoke-fragment", date, source, fragment_index: 1, pet_id: pet?.id || null, consumed_at: null, growth_result: null };
    return { ...fragment };
  },
  async getFragmentEvent(id) { return fragment?.id === id ? { ...fragment } : null; },
  async getPetStateFromExistingSession({ species, variant }) { return pet ? { ...pet } : null; },
  async ensureActivePet({ species, variant }) {
    pet ||= { id: "ephemeral-smoke-pet", species, variant, growth_stage: "BABY", growth_points: 0, growth_scale: 1, traits: {} };
    return { ...pet };
  },
  async consumeDailyFragment({ fragmentId, petId }) {
    if (!fragment || fragment.id !== fragmentId || !pet || pet.id !== petId) throw new Error("unknown smoke fixture id");
    if (fragment.consumed_at) return { status: "already_consumed", pet_id: pet.id, consumed_at: fragment.consumed_at, growth_points: pet.growth_points };
    pet.growth_points += 1;
    pet.growth_stage = growthStage(pet.growth_points);
    fragment.pet_id = pet.id;
    fragment.consumed_at = new Date().toISOString();
    fragment.growth_result = { type: "growth", growth_points: pet.growth_points };
    return { status: "consumed", pet_id: pet.id, consumed_at: fragment.consumed_at, growth_points: pet.growth_points };
  },
};
`;

test("first-use Solo flow works in an isolated browser context", async ({ page, context, baseURL }, testInfo) => {
  const externalRequests = [];
  let mockRequests = 0;
  await context.addInitScript(() => {
    const values = new Map();
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: {
        get length() { return values.size; },
        key(index) { return [...values.keys()][index] ?? null; },
        getItem(key) { return values.has(String(key)) ? values.get(String(key)) : null; },
        setItem(key, value) { values.set(String(key), String(value)); },
        removeItem(key) { values.delete(String(key)); },
        clear() { values.clear(); },
      },
    });
  });
  await page.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (url.origin !== baseURL) {
      externalRequests.push(url.href);
      if (url.hostname === "fonts.googleapis.com") {
        await route.fulfill({ status: 200, contentType: "text/css", body: "" });
      } else {
        await route.abort("blockedbyclient");
      }
      return;
    }
    if (url.pathname === "/room-backend.js") {
      mockRequests += 1;
      await route.fulfill({ status: 200, contentType: "text/javascript; charset=utf-8", body: backendMock });
      return;
    }
    await route.continue();
  });

  await page.goto("/");
  await expect(page.locator("#adoption-view")).toBeVisible();
  await page.locator("#adoption-candidates .adoption-candidate").first().click();
  await page.locator("#adoption-name").fill("Coco");
  await page.locator("#adoption-confirm").click();
  await expect(page.locator("#adoption-complete")).toBeVisible();
  await page.locator("#adoption-enter-garden").click();
  await expect(page.locator("#garden-view")).toBeVisible();
  await expect(page.locator("#first-use-guide")).toBeVisible();
  await expect(page.locator("#garden-view")).toHaveCSS("opacity", "1");
  await page.screenshot({ path: testInfo.outputPath("01-first-garden-guide.png"), fullPage: true });

  await page.locator("#first-use-guide-start").click();
  await expect(page.locator("#today-view")).toBeVisible();
  await page.locator("#question-cards .question-card").first().click();
  const answerText = page.locator('#answer-field textarea[name="answer"]');
  if (await answerText.count()) {
    await answerText.fill("오늘은 천천히 마음을 살펴봤어요.");
  } else {
    const radio = page.locator('#answer-field input[type="radio"]').first();
    await radio.check();
  }
  await page.locator('#answer-form button[type="submit"]').click();
  await expect(page.locator("#garden-view")).toBeVisible();
  const feedButton = page.locator("#feed-fragment");
  await expect(feedButton).toBeVisible();
  await expect(feedButton).toBeEnabled({ timeout: 10_000 });
  await expect(page.locator("#garden-view")).toHaveCSS("opacity", "1");
  await feedButton.evaluate((button) => button.scrollIntoView({ block: "center", inline: "nearest" }));
  await expect(feedButton).toBeInViewport();
  const ctaRect = await feedButton.boundingBox();
  const before = await page.evaluate(() => ({ width: window.innerWidth, height: window.innerHeight, documentWidth: document.documentElement.scrollWidth }));
  expect(before.documentWidth).toBeLessThanOrEqual(before.width);
  expect(ctaRect.y + ctaRect.height).toBeLessThan(before.height - 76);
  await page.screenshot({ path: testInfo.outputPath("02-actionable-feed-cta.png") });

  await feedButton.click();
  await expect(page.locator("#pet-record-content .pet-record-fields dd").nth(3)).toContainText("1개", { timeout: 10_000 });
  await expect(feedButton).toBeHidden({ timeout: 10_000 });
  await page.screenshot({ path: testInfo.outputPath("03-growth-success.png"), fullPage: true });

  const after = await page.evaluate(() => ({ width: window.innerWidth, documentWidth: document.documentElement.scrollWidth }));
  expect(after.documentWidth).toBeLessThanOrEqual(after.width);
  expect(mockRequests).toBeGreaterThan(0);
  const evidence = {
    project: testInfo.project.name,
    viewport: after.width,
    documentWidthBeforeConsume: before.documentWidth,
    documentWidthAfterConsume: after.documentWidth,
    feedCtaWasEnabled: true,
    feedCtaViewportY: ctaRect?.y ?? null,
    feedCtaViewportBottom: ctaRect ? ctaRect.y + ctaRect.height : null,
    growthPointsAfterConsume: 1,
    mockModuleRequests: mockRequests,
    externalRequestsInterceptedBeforeNetwork: externalRequests.length,
  };
  await mkdir(testInfo.outputDir, { recursive: true });
  await writeFile(testInfo.outputPath("observations.json"), `${JSON.stringify(evidence, null, 2)}\n`);
  await testInfo.attach("observations", { path: testInfo.outputPath("observations.json"), contentType: "application/json" });
});
