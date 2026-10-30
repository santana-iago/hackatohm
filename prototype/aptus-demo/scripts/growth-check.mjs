import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
const address = process.env.APTUS_DEMO_URL || "http://localhost:4173";
const browser = await chromium.launch({
  executablePath: "/usr/bin/google-chrome",
  headless: true,
  args: ["--no-sandbox"],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await fs.mkdir("tmp/growth", { recursive: true });
const results = [];
for (const size of [
  { width: 1440, height: 900 },
  { width: 1280, height: 720 },
  { width: 768, height: 900 },
  { width: 375, height: 812 },
]) {
  await page.setViewportSize(size);
  for (const scene of ["base-viva", "discovery", "connect", "recognition"]) {
    await page.goto(`${address}/?scene=${scene}`);
    await page.waitForFunction(() => window.aptusDemo);
    await page.evaluate(() => window.aptusDemo.waitUntilIdle());
    const result = await page.evaluate(() => ({
      rootOverflow: document.documentElement.scrollWidth > window.innerWidth,
      bodyOverflow: document.body.scrollWidth > window.innerWidth,
      viewport: innerWidth,
      documentWidth: document.documentElement.scrollWidth,
      mainWidth: document.querySelector("main").clientWidth,
      mainRight: document.querySelector("main").getBoundingClientRect().right,
      badge: !!document.querySelector('[data-testid="demo-badge"]'),
    }));
    await page.screenshot({
      path: `tmp/growth/${scene}-${size.width}.png`,
    });
    results.push({ scene, ...size, ...result });
  }
}
await page.setViewportSize({ width: 1440, height: 900 });
for (const scene of ["base-viva", "discovery", "connect", "recognition"]) {
  await page.goto(`${address}/?scene=${scene}`);
  await page.waitForFunction(() => window.aptusDemo);
  await page.evaluate(() => window.aptusDemo.waitUntilIdle());
  await page.evaluate(() => {
    document.documentElement.style.zoom = "2";
  });
  const metrics = await page.evaluate(() => ({
    rootOverflow: document.documentElement.scrollWidth > window.innerWidth,
    bodyOverflow: document.body.scrollWidth > window.innerWidth,
    viewport: innerWidth,
    documentWidth: document.documentElement.scrollWidth,
  }));
  await page.screenshot({ path: `tmp/growth/${scene}-zoom200.png` });
  results.push({ scene, zoom: "CSS 200%", ...metrics });
}
await page.goto(`${address}/?scene=base-viva`);
await page.waitForFunction(() => window.aptusDemo);
await page.evaluate(() => window.aptusDemo.waitUntilIdle());
if (await page.getByRole("dialog").count()) await page.keyboard.press("Escape");
const search = page.getByLabel("Buscar por nome ou competência");
await search.fill("zzzz-sem-pessoa");
const empty = await page
  .getByRole("heading", { name: "Nenhum perfil corresponde à busca" })
  .isVisible();
await page
  .getByRole("button", { name: "Limpar filtros", exact: true })
  .last()
  .click();
await page.getByLabel("Filtrar perfis").selectOption("expired");
const expiredRows = await page
  .locator('section[aria-labelledby="directory-title"] .data-table tbody tr')
  .allTextContents();
await page.getByLabel("Filtrar perfis").selectOption("availability");
const pendingRows = await page
  .locator('section[aria-labelledby="directory-title"] .data-table tbody tr')
  .allTextContents();
await page.getByLabel("Filtrar perfis").selectOption("all");
const trigger = page.getByRole("button", {
  name: "Abrir perfil de Eva Lima",
  exact: true,
});
await trigger.focus();
await page.keyboard.press("Enter");
const dialogOpened = await page.getByRole("dialog").isVisible();
const dialogFocus = await page.evaluate(() =>
  document.activeElement?.outerHTML.slice(0, 240),
);
await page.keyboard.press("Tab");
const afterTab = await page.evaluate(() => ({
  inDialog: !!document.activeElement?.closest("dialog"),
  tag: document.activeElement?.tagName,
  text: document.activeElement?.textContent,
}));
await page.keyboard.press("Escape");
const dialogClosed = (await page.getByRole("dialog").count()) === 0;
const focusReturned = await trigger.evaluate(
  (el) => document.activeElement === el,
);
await page.getByTestId("demo-role-switcher").focus();
await page.keyboard.press("Tab");
const tabContinues = await page.evaluate(() =>
  document.activeElement?.getAttribute("aria-label"),
);
const reachability = [];
for (const size of [
  { width: 1440, height: 900 },
  { width: 1280, height: 720 },
  { width: 720, height: 450 },
]) {
  await page.setViewportSize(size);
  for (const [scene, id] of [
    ["base-viva", "profile-confirm"],
    ["discovery", "campaign-respond"],
    ["connect", "referral-accept"],
    ["recognition", "recognition-points"],
  ]) {
    await page.goto(`${address}/?scene=${scene}`);
    await page.waitForFunction(() => window.aptusDemo);
    await page.evaluate(() => window.aptusDemo.waitUntilIdle());
    if (scene === "base-viva") {
      if (await page.getByRole("dialog").count())
        await page.keyboard.press("Escape");
    }
    const target = page.getByTestId(id);
    await target.scrollIntoViewIfNeeded();
    const box = await target.boundingBox();
    reachability.push({
      scene,
      ...size,
      id,
      visible: await target.isVisible(),
      withinViewport:
        !!box &&
        box.x >= 0 &&
        box.x + box.width <= size.width &&
        box.y >= 0 &&
        box.y + box.height <= size.height,
      box,
    });
  }
}
const equivalent = await browser.newPage({
  viewport: { width: 720, height: 450 },
  deviceScaleFactor: 2,
});
for (const scene of ["base-viva", "discovery", "connect", "recognition"]) {
  await equivalent.goto(`${address}/?scene=${scene}`);
  await equivalent.waitForFunction(() => window.aptusDemo);
  await equivalent.evaluate(() => window.aptusDemo.waitUntilIdle());
  await equivalent.screenshot({
    path: `tmp/growth/${scene}-zoom-equivalent200.png`,
  });
}
await equivalent.close();
const final = {
  results,
  reachability,
  filters: { empty, expiredRows, pendingRows },
  keyboard: {
    dialogOpened,
    dialogFocus,
    afterTab,
    dialogClosed,
    focusReturned,
    tabContinues,
  },
  pageErrors: errors,
};
await fs.writeFile("tmp/growth/review.json", JSON.stringify(final, null, 2));
console.log(JSON.stringify(final, null, 2));
await browser.close();
