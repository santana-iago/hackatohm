import { defineConfig } from "@playwright/test";
import { existsSync } from "node:fs";
const executablePath =
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ||
  (existsSync("/usr/bin/google-chrome") ? "/usr/bin/google-chrome" : undefined);
export default defineConfig({
  testDir: "tests",
  testMatch: "**/*.spec.ts",
  projects: [
    {name:'captura-1920',use:{viewport:{width:1920,height:1080}}},
    {name:'macbook-1440',use:{viewport:{width:1440,height:900}}},
    {name:'compacto-1280',use:{viewport:{width:1280,height:720}}},
  ],
  fullyParallel: false,
  workers: 1,
  timeout: 90000,
  expect: { timeout: 10000 },
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://localhost:4173",
    viewport: { width: 1440, height: 900 },
    headless: true,
    launchOptions: { executablePath, args: ["--no-sandbox"] },
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "npm run dev -- --port 4173",
    url: "http://localhost:4173",
    reuseExistingServer: true,
  },
});
