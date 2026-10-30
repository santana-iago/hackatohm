import { chromium } from "@playwright/test";
import { mkdir, readFile, unlink } from "node:fs/promises";
import { createHash } from "node:crypto";

const address = process.env.APTUS_DEMO_URL || "http://localhost:4173";
const filename = "APTUS_Nexora_ENE-001_Dossie_Demonstrativo_v1.pdf";
await mkdir("artifacts", { recursive: true });
await mkdir("tmp/pdfs", { recursive: true });
const browser = await chromium.launch({
  executablePath: "/usr/bin/google-chrome",
  args: ["--no-sandbox"],
});
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  acceptDownloads: true,
});
const errors = [];
await page.route('**/*',route=>new URL(route.request().url()).origin===new URL(address).origin?route.continue():route.abort());
page.on("pageerror", (error) => errors.push(error.message));
try {
  await page.goto(`${address}/?scene=dossier-approved&capture=1`);
  await page.waitForFunction(() => window.aptusDemo);
  await page.evaluate(() => window.aptusDemo.waitUntilIdle());
  const before = await page.evaluate(() => window.aptusDemo.getSceneState());
  if (before.currentScore !== 35 || before.dossierStatus !== "approved")
    throw new Error(`Unexpected approval: ${JSON.stringify(before)}`);
  const exportButton = page.getByTestId("dossier-export");
  if (!(await exportButton.isEnabled()))
    throw new Error("Approved PDF export is disabled.");
  const downloadPromise = page.waitForEvent("download");
  await exportButton.click();
  const download = await downloadPromise;
  if (download.suggestedFilename() !== filename)
    throw new Error("Unexpected filename.");
  await download.saveAs(`artifacts/${filename}`);
  await page.evaluate(() => window.aptusDemo.waitUntilIdle());
  await page
    .getByText("Resumo do dossiê exportado. Nenhum envio foi realizado.", {
      exact: true,
    })
    .first()
    .waitFor();
  const repeatPromise = page.waitForEvent("download");
  await exportButton.click();
  const repeat = await repeatPromise;
  const repeatedFile = "tmp/pdfs/dossier-reexport.pdf";
  await repeat.saveAs(repeatedFile);
  await page.evaluate(() => window.aptusDemo.waitUntilIdle());
  const [firstBytes, secondBytes] = await Promise.all([
    readFile(`artifacts/${filename}`),
    readFile(repeatedFile),
  ]);
  if (!firstBytes.equals(secondBytes))
    throw new Error("Repeated export changed PDF bytes.");
  await unlink(repeatedFile);
  await page.evaluate(async () => {
    await window.aptusDemo.loadScene("export-blocked");
    await window.aptusDemo.waitUntilIdle();
  });
  if (await page.getByTestId("dossier-export").isEnabled())
    throw new Error("Revoked document permission did not block export.");
  await page.evaluate(async () => {
    await window.aptusDemo.loadScene("tender-amended");
    await window.aptusDemo.waitUntilIdle();
  });
  if (await page.getByTestId("dossier-export").isEnabled())
    throw new Error("Amended tender did not block export.");
  if (errors.length) throw new Error(`Browser errors: ${errors.join("; ")}`);
  console.log(
    JSON.stringify(
      {
        file: `artifacts/${filename}`,
        bytes: firstBytes.length,
        sha256: createHash("sha256").update(firstBytes).digest("hex"),
        repeatedExportIdentical: true,
        revokedPermissionBlocked: true,
        amendedTenderBlocked: true,
        browserErrors: errors,
      },
      null,
      2,
    ),
  );
} finally {
  await browser.close();
}
