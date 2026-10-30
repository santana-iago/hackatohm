import { chromium } from "@playwright/test";
import { writeFile, mkdir } from "node:fs/promises";
const browser = await chromium.launch({
  executablePath: "/usr/bin/google-chrome",
  args: ["--no-sandbox"],
});
const errors = [],
  external = [];
const results = [];
await mkdir("artifacts/screenshots", { recursive: true });
const shots = [
  ["criteria-review", "criterios"],
  ["team-comparison", "comparacao"],
  ["recovery-complete", "recovery-35"],
  ["dossier-review", "dossie"],
];
for (const [width, height] of [
  [1920, 1080],
  [1440, 900],
  [1280, 720],
]) {
  const context = await browser.newContext({ viewport: { width, height } });
  await context.route("**/*", (route) => {
    const url = route.request().url();
    if (
      url.startsWith("http://localhost:4174/") ||
      url.startsWith("blob:") ||
      url.startsWith("data:")
    )
      return route.continue();
    external.push(url);
    return route.abort();
  });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await Promise.all([
    cdp.send("Runtime.enable"),
    cdp.send("Log.enable"),
    cdp.send("Network.enable"),
  ]);
  cdp.on("Runtime.exceptionThrown", (event) =>
    errors.push(event.exceptionDetails.text),
  );
  cdp.on("Log.entryAdded", (event) => {
    if (event.entry.level === "error") errors.push(event.entry.text);
  });
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("http://localhost:4174/?scene=overview&capture=1");
  await page.waitForFunction(() => window.aptusDemo);
  await page.evaluate(() => window.aptusDemo.setMotion("reduced"));
  for (const [scene, label] of shots) {
    await page.evaluate((scene) => window.aptusDemo.loadScene(scene), scene);
    await page.evaluate(() => window.aptusDemo.waitUntilIdle());
    await page.evaluate(() => document.querySelector("main").scrollTo(0, 0));
    await page.screenshot({
      path: `artifacts/screenshots/${label}-${width}x${height}.png`,
    });
    const layout = await page.evaluate(() => {
      const ids = [...document.querySelectorAll("[data-testid]")].map((x) =>
        x.getAttribute("data-testid"),
      );
      return {
        overflow: document.documentElement.scrollWidth > window.innerWidth,
        duplicateIds: ids.filter((id, i) => ids.indexOf(id) !== i),
        badgeVisible:
          document
            .querySelector('[data-testid="demo-badge"]')
            .getBoundingClientRect().top >= 0,
      };
    });
    results.push({ scene, width, height, ...layout });
  }
  await context.close();
}
const detailContext = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
});
const detailPage = await detailContext.newPage();
await detailPage.goto(
  "http://localhost:4174/?scene=recovery-complete&capture=1",
);
await detailPage.waitForFunction(() => window.aptusDemo);
await detailPage.evaluate(() => window.aptusDemo.waitUntilIdle());
await detailPage
  .getByTestId("recovery-CAR-G02")
  .getByRole("button", { name: "Abrir trilha dos +2 pontos" })
  .click();
await detailPage
  .getByRole("button", { name: "Abrir fonte", exact: true })
  .click();
await detailPage.screenshot({
  path: "artifacts/screenshots/trilha-aurora-1920x1080.png",
});
await detailContext.close();
const context = await browser.newContext({
  viewport: { width: 720, height: 450 },
  deviceScaleFactor: 2,
});
const page = await context.newPage();
await page.goto("http://localhost:4174/?scene=team-comparison&capture=1");
await page.waitForFunction(() => window.aptusDemo);
await page.evaluate(() => window.aptusDemo.waitUntilIdle());
await page.getByTestId("team-compare").click();
await page.evaluate(() => window.aptusDemo.waitUntilIdle());
await page.screenshot({
  path: "artifacts/screenshots/comparacao-200-equivalente.png",
});
results.push({
  scene: "team-comparison",
  effectiveViewport: "720x450 at 2x",
  overflow: await page.evaluate(
    () => document.documentElement.scrollWidth > innerWidth,
  ),
});
const directScenes = [];
for (const id of [
  "overview",
  "base-viva",
  "criteria-review",
  "team-comparison",
  "availability",
  "recovery-start",
  "recovery-received",
  "recovery-verified",
  "recovery-one",
  "recovery-complete",
  "dossier-review",
  "dossier-approved",
  "discovery",
  "connect",
  "recognition",
  "second-rejected",
  "duplicate-proof",
  "expired-credential",
  "availability-unknown",
  "tender-amended",
  "export-blocked",
  "connect-external",
]) {
  await page.goto(`http://localhost:4174/?scene=${id}&capture=1`);
  await page.waitForFunction(() => window.aptusDemo);
  await page.evaluate(() => window.aptusDemo.waitUntilIdle());
  const current = await page.evaluate(() => window.aptusDemo.getSceneState());
  if (current.sceneId !== id || current.busy)
    throw new Error(`Cena não restaurada: ${id}`);
  directScenes.push(current);
}
await writeFile(
  "artifacts/visual-check.json",
  JSON.stringify({ results, directScenes, errors, external }, null, 2),
);
console.log(
  JSON.stringify({
    checked: results.length,
    directScenes: directScenes.length,
    failures: results.filter(
      (r) => r.overflow || r.duplicateIds?.length || r.badgeVisible === false,
    ),
    errors,
    external,
  }),
);
await browser.close();
