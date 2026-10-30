import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
const address = process.env.APTUS_DEMO_URL || "http://localhost:4173";
const browser = await chromium.launch({
  executablePath: "/usr/bin/google-chrome",
  args: ["--no-sandbox"],
});
await mkdir("artifacts/redesign", { recursive: true });
const errors = [],
  checks = [];
const shots = [
  ["overview", "hoje"],
  ["team-comparison", "comparacao"],
  ["criteria-review", "criterios"],
  ["recovery-complete", "recovery-35"],
  ["dossier-review", "dossie"],
  ["base-viva", "perfil"],
  ["discovery", "descoberta"],
  ["connect", "connect"],
  ["recognition", "reconhecimento"],
];
for (const [width, height, capture] of [
  [1440, 900, false],
  [1280, 720, false],
  [1920, 1080, true],
]) {
  const page = await browser.newPage({ viewport: { width, height } });
  page.on("pageerror", (e) => errors.push(e.message));
  for (const [scene, label] of shots) {
    await page.goto(`${address}/?scene=${scene}${capture ? "&capture=1" : ""}`);
    await page.waitForFunction(() => window.aptusDemo);
    await page.evaluate(() => window.aptusDemo.setMotion("reduced"));
    await page.evaluate(() => window.aptusDemo.waitUntilIdle());
    await page.screenshot({ path: `artifacts/redesign/${label}-${width}.png` });
    const layout = await page.evaluate(() => {
      const main = document.querySelector("main");
      return {
        rootOverflow: document.documentElement.scrollWidth > innerWidth,
        mainOverflow: main.scrollWidth > main.clientWidth,
        mainHeight: main.clientHeight,
        toolbarHeight: document.querySelector(".toolbar").clientHeight,
        scrollOwner: getComputedStyle(main).overflowY,
      };
    });
    checks.push({ scene, width, height, capture, ...layout });
  }
  await page.close();
}
await writeFile(
  "artifacts/redesign/check.json",
  JSON.stringify({ checks, errors }, null, 2),
);
console.log(
  JSON.stringify({
    checked: checks.length,
    errors,
    failures: checks.filter((c) => c.rootOverflow || c.mainOverflow),
  }),
);
await browser.close();
