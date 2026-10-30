import { chromium } from "@playwright/test";
const browser = await chromium.launch({
  executablePath: "/usr/bin/google-chrome",
  args: ["--no-sandbox"],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on("pageerror", (e) => console.error("PAGEERROR", e.message));
await page.goto("http://localhost:4173/?scene=team-comparison");
await page.waitForFunction(() => window.aptusDemo);
await page.evaluate(() => window.aptusDemo.waitUntilIdle());
await page.screenshot({
  path: "artifacts/primeira-comparacao.png",
  fullPage: true,
});
console.log(await page.evaluate(() => window.aptusDemo.getSceneState()));
await browser.close();
