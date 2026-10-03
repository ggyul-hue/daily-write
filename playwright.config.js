import { defineConfig, devices } from "@playwright/test";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { randomUUID } from "node:crypto";

const outputDir = join(tmpdir(), `daily-write-solo-smoke-${randomUUID()}`);
const port = 43179;
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: "./tests",
  testMatch: "solo-first-use-smoke.spec.js",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: "line",
  outputDir,
  use: {
    baseURL,
    locale: "ko-KR",
    timezoneId: "UTC",
    serviceWorkers: "block",
    trace: "off",
    ...devices["Desktop Chrome"],
  },
  projects: [
    { name: "desktop-1280x900", use: { viewport: { width: 1280, height: 900 } } },
    { name: "mobile-390x844", use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ],
  webServer: {
    command: "node scripts/solo-smoke-server.mjs",
    url: `${baseURL}/`,
    reuseExistingServer: false,
    timeout: 10_000,
  },
});
