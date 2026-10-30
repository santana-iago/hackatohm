import { test, expect, type Page } from "@playwright/test";
import type { SceneId } from "../src/demo/types";
async function idle(page: Page) {
  await page.evaluate(() => window.aptusDemo.waitUntilIdle());
  await expect(page.locator("html")).toHaveAttribute("data-demo-busy", "false");
}
async function scene(page: Page, id: SceneId) {
  await page.evaluate((id) => window.aptusDemo.loadScene(id), id);
  await idle(page);
}
async function actor(page: Page, id: string) {
  await page.getByTestId("demo-role-switcher").selectOption(id);
}
async function score(page: Page, n: number) {
  await expect(page.getByTestId("team-score-current")).toHaveText(String(n));
}

test("shell de trabalho, abas por teclado e retorno de foco do inspetor", async ({
  page,
}) => {
  await page.goto("/?scene=team-comparison");
  await page.waitForFunction(() => window.aptusDemo);
  await idle(page);
  const teamTab = page.getByRole("tab", { name: "Equipe", exact: true });
  await teamTab.focus();
  await page.keyboard.press("ArrowLeft");
  await expect(
    page.getByRole("tab", { name: "Critérios", exact: true }),
  ).toBeFocused();
  await expect(
    page.getByRole("tab", { name: "Critérios", exact: true }),
  ).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("End");
  await expect(
    page.getByRole("tab", { name: "Dossiê", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Home");
  await expect(
    page.getByRole("tab", { name: "Resumo", exact: true }),
  ).toHaveAttribute("aria-selected", "true");
  await page.getByTestId("nav-people").click();
  const trigger = page.getByRole("button", {
    name: "Abrir perfil de Eva Lima",
    exact: true,
  });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await dialog.getByRole("tab", { name: "Resumo", exact: true }).focus();
  await page.keyboard.press("End");
  await expect(
    dialog.getByRole("tab", { name: "Agenda", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Home");
  await expect(
    dialog.getByRole("tab", { name: "Resumo", exact: true }),
  ).toHaveAttribute("tabindex", "0");
  const close = dialog.getByRole("button", { name: "Fechar diálogo" });
  const closeBox = await close.boundingBox();
  expect(closeBox?.width).toBeGreaterThanOrEqual(40);
  expect(closeBox?.height).toBeGreaterThanOrEqual(40);
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  expect(
    await page.locator("main").evaluate((el) => getComputedStyle(el).overflowY),
  ).toBe("auto");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.setViewportSize({ width: 720, height: 450 });
  await scene(page, "recognition");
  const mainBox = await page.locator("main").boundingBox();
  expect(mainBox!.x + mainBox!.width).toBeLessThanOrEqual(720);
});

test("percurso contínuo: Base Viva, matriz, 30/31, Recovery 33/35, PDF, Descoberta e Connect", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/?capture=1");
  await page.waitForFunction(() => window.aptusDemo);
  await page.evaluate(() => window.aptusDemo.setMotion("reduced"));
  await expect(page.getByTestId("demo-badge")).toBeVisible();
  await page.getByTestId("nav-people").click();
  await page
    .getByRole("button", { name: "Revisar atualização de Carla" })
    .click();
  await page
    .getByRole("button", { name: "Ver como Carla", exact: true })
    .click();
  await page
    .getByLabel(
      "Sou Carla nesta simulação e conferi a identidade e os campos acima.",
    )
    .check();
  await page.getByTestId("profile-confirm").click();
  await idle(page);
  await page.getByRole("button", { name: "Ver como RH", exact: true }).click();
  await page
    .getByLabel(
      "Conferi a identidade, a origem e a correspondência dos campos.",
    )
    .check();
  await page.getByTestId("profile-verify").click();
  await idle(page);
  await expect(page.getByText("Currículo v2 revisado por RH.")).toBeVisible();
  await page.getByTestId("nav-opportunities").click();
  await page.getByRole("button", { name: /ENE-001.*Modernização/ }).click();
  await page.getByRole("tab", { name: "Critérios", exact: true }).click();
  await actor(page, "juliana");
  await page.getByTestId("criterion-G-ENERGIA").click();
  await expect(page.locator(".highlight-clause")).toContainText(
    "projetos distintos",
  );
  await expect(page.getByTestId("criteria-approve")).toBeDisabled();
  await page
    .getByRole("button", { name: "Confirmar: contar projetos distintos" })
    .click();
  await idle(page);
  await page
    .getByRole("button", { name: "Revisar demais regras conferidas" })
    .click();
  await idle(page);
  await expect(page.getByTestId("criteria-approve")).toBeEnabled();
  await page.getByTestId("criteria-approve").click();
  await idle(page);
  await expect(page.getByTestId("team-score-current")).toHaveCount(0);
  await page
    .getByRole("button", { name: "Conferir provas iniciais", exact: true })
    .click();
  await page
    .getByLabel("Conferi os titulares, as regras e os documentos desta lista.")
    .check();
  await page.getByTestId("criteria-initial-evidence-approve").click();
  await idle(page);
  await page.getByRole("button", { name: "Concluir conferência" }).click();
  await page.getByRole("tab", { name: "Equipe", exact: true }).click();
  await expect(page.getByText("30 pontos na prévia")).toBeVisible();
  await page.getByTestId("team-compare").click();
  await idle(page);
  await score(page, 31);
  await expect(page.locator(".comparison-table")).toContainText(
    "Escolha isolada por função",
  );
  await expect(page.locator(".comparison-table")).toContainText("30");
  await page.getByText("Impedimentos explicáveis", { exact: false }).click();
  await page.getByTestId("availability-p-bruno").click();
  await expect(page.getByRole("dialog")).toContainText("0 h/semana");
  await page.keyboard.press("Escape");
  await page
    .getByRole("button", { name: "Tentar Diego nas duas funções" })
    .click();
  await idle(page);
  await expect(page.getByRole("alert")).toContainText("pessoas distintas");
  await score(page, 31);
  await actor(page, "andre");
  await page.getByTestId("team-confirm-pmo").click();
  await idle(page);
  await page.getByRole("tab", { name: /Recovery/ }).click();
  for (const [task, id, previous, next] of [
    ["CAR-G02", "ev-carla-aurora", 31, 33],
    ["CAR-G03", "ev-carla-vale", 33, 35],
  ] as const) {
    await actor(page, "juliana");
    const card = page.getByTestId(`recovery-${task}`);
    await card.getByRole("button", { name: /Solicitar atestado/ }).click();
    await idle(page);
    await card
      .getByRole("button", { name: "Apresentar / revisar documento" })
      .click();
    await page.getByRole("button", { name: "Ver como Carla Mendes" }).click();
    await page.getByTestId(`evidence-receive-${id}`).click();
    await page
      .getByRole("button", { name: "Usar este documento de exemplo" })
      .click();
    await idle(page);
    await expect(page.getByRole("dialog")).toContainText(
      "Documento recebido. A pontuação ainda não mudou.",
    );
    expect(
      (await page.evaluate(() => window.aptusDemo.getSceneState()))
        .currentScore,
    ).toBe(previous);
    await page
      .getByRole("button", { name: "Ver como RH", exact: true })
      .click();
    await page.getByTestId(`evidence-verify-${id}`).click();
    await idle(page);
    expect(
      (await page.evaluate(() => window.aptusDemo.getSceneState()))
        .currentScore,
    ).toBe(previous);
    await expect(page.getByRole("dialog")).toContainText(
      "Documento verificado. Uso neste edital em análise.",
    );
    await page
      .getByRole("dialog")
      .getByRole("button", { name: "Ver como Licitações", exact: true })
      .click();
    await page.getByTestId(`evidence-accept-${id}`).click();
    await idle(page);
    const stale = await page.evaluate(() => window.aptusDemo.getSceneState());
    expect(stale.currentScore).toBeNull();
    expect(stale.lastScore).toBe(previous);
    expect(stale.potentialScore).toBeNull();
    await page.keyboard.press("Escape");
    await expect(page.getByTestId("team-score-last")).toHaveText(
      String(previous),
    );
    await page.getByTestId("team-recalculate").click();
    await idle(page);
    await score(page, next);
  }
  await page.getByRole("tab", { name: "Dossiê", exact: true }).click();
  await page.getByTestId("dossier-prepare").click();
  await idle(page);
  await page.getByTestId("dossier-review-texts").click();
  await idle(page);
  await expect(page.getByTestId("dossier-approve")).toBeEnabled();
  await page.getByTestId("dossier-approve").click();
  await idle(page);
  const downloadPromise = page.waitForEvent("download");
  await page.getByTestId("dossier-export").click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe(
    "APTUS_Nexora_ENE-001_Dossie_Demonstrativo_v1.pdf",
  );
  await idle(page);
  await expect(
    page
      .getByText("Resumo do dossiê exportado. Nenhum envio foi realizado.", {
        exact: true,
      })
      .last(),
  ).toBeVisible();
  await page.getByTestId("nav-discovery").click();
  await page.getByRole("button", { name: "Ver como Lia", exact: true }).click();
  await page.getByTestId("campaign-respond").click();
  await idle(page);
  await page.getByTestId("evidence-receive-ev-lia-sec").click();
  await idle(page);
  await page.getByRole("button", { name: "Ver como RH", exact: true }).click();
  await page.getByTestId("evidence-verify-ev-lia-sec").click();
  await idle(page);
  await expect(
    page.getByText("10 pontos de reconhecimento", { exact: true }),
  ).toBeVisible();
  await page.getByTestId("nav-connect").click();
  await page
    .getByRole("button", { name: "Ver como Marina", exact: true })
    .click();
  await page.getByTestId("referral-accept").click();
  await idle(page);
  await page.getByTestId("evidence-receive-ev-marina-cloud").click();
  await idle(page);
  await page.getByRole("button", { name: "Ver como RH", exact: true }).click();
  await page.getByTestId("evidence-verify-ev-marina-cloud").click();
  await idle(page);
  await page.getByTestId("referral-validate").click();
  await idle(page);
  await page.getByTestId("nav-recognition").click();
  await expect(
    page.getByText("Reconhecimento não altera a pontuação em editais.", {
      exact: true,
    }),
  ).toBeVisible();
  expect(
    (await page.evaluate(() => window.aptusDemo.getSceneState())).currentScore,
  ).toBe(35);
  await actor(page, "juliana");
  await page.getByTestId("nav-opportunities").click();
  await page.getByRole("button", { name: /ENE-001.*Modernização/ }).click();
  await page.getByRole("tab", { name: "Dossiê", exact: true }).click();
  await expect(page.getByTestId("dossier-export")).toBeEnabled();
  expect(errors).toEqual([]);
});

test("checkpoints, exceções, reset pendente, teclado, filtros e convite externo", async ({
  page,
}) => {
  await page.goto("/?scene=recovery-verified");
  await page.waitForFunction(() => window.aptusDemo);
  await idle(page);
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await scene(page, "second-rejected");
  expect(
    (await page.evaluate(() => window.aptusDemo.getSceneState())).currentScore,
  ).toBe(33);
  await expect(page.getByRole("dialog")).toContainText("Rejeitado");
  await scene(page, "duplicate-proof");
  expect(
    (await page.evaluate(() => window.aptusDemo.getSceneState())).currentScore,
  ).toBe(33);
  await scene(page, "availability-unknown");
  await score(page, 29);
  await scene(page, "expired-credential");
  await expect(page.getByRole("dialog")).toContainText("Vencida na data");
  await scene(page, "tender-amended");
  await expect(page.getByTestId("dossier-export")).toBeDisabled();
  expect(
    (await page.evaluate(() => window.aptusDemo.getSceneState())).currentScore,
  ).toBeNull();
  await scene(page, "export-blocked");
  await expect(page.getByTestId("dossier-export")).toBeDisabled();
  await scene(page, "criteria-review");
  await page
    .getByRole("button", { name: "Confirmar: contar projetos distintos" })
    .click();
  await page.evaluate(() => window.aptusDemo.reset());
  await idle(page);
  const reset = await page.evaluate(() => window.aptusDemo.getSceneState());
  expect(reset.sceneId).toBe("overview");
  expect(reset.currentScore).toBeNull();
  await page.waitForTimeout(800);
  expect(
    (await page.evaluate(() => window.aptusDemo.getSceneState())).currentScore,
  ).toBeNull();
  await page.getByTestId("nav-people").click();
  await page
    .getByLabel("Buscar por nome ou competência")
    .fill("ninguém-com-este-nome");
  await expect(
    page.getByRole("heading", { name: "Nenhum perfil corresponde à busca" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Limpar filtros", exact: true })
    .last()
    .click();
  await expect(
    page.getByRole("button", { name: "Abrir perfil de Carla Mendes" }),
  ).toBeVisible();
  await scene(page, "connect-external");
  await expect(page.getByTestId("external-invite-accept")).toBeDisabled();
  await page
    .getByLabel(
      "Aceito participar desta demonstração com os dados fictícios apresentados.",
    )
    .check();
  await page.getByTestId("external-invite-accept").click();
  await idle(page);
  await expect(
    page.getByText("Lucas aparece como externo no diretório.", { exact: true }),
  ).toBeVisible();
  await page.getByTestId("nav-people").click();
  await expect(
    page.getByText("Lucas Azevedo", { exact: true }).first(),
  ).toBeVisible();
  await scene(page, "overview");
  await page.getByTestId("nav-people").click();
  await expect(page.getByText("Lucas Azevedo", { exact: true })).toHaveCount(0);
});

test("restaurar cancela revisão em lote e repõe o estado visual da mesma cena", async ({
  page,
}) => {
  await page.goto("/?scene=criteria-review");
  await page.waitForFunction(() => window.aptusDemo);
  await page
    .getByRole("button", { name: "Confirmar: contar projetos distintos" })
    .click();
  await idle(page);
  await page
    .getByRole("button", { name: "Revisar demais regras conferidas" })
    .click();
  await page.evaluate(() => window.aptusDemo.reset());
  await idle(page);
  await page.waitForTimeout(1500);
  await page.getByTestId("nav-opportunities").click();
  await page.getByRole("button", { name: /ENE-001.*Modernização/ }).click();
  await page.getByRole("tab", { name: "Critérios", exact: true }).click();
  await expect(
    page.getByText("0 de 8 revisadas", { exact: true }),
  ).toBeVisible();
  await scene(page, "recovery-verified");
  await page.getByRole("button", { name: "Abrir fonte", exact: true }).click();
  await expect(
    page.getByText("Texto acessível · fonte local", { exact: true }),
  ).toHaveCount(0);
  await scene(page, "recovery-verified");
  await expect(
    page.getByText("Texto acessível · fonte local", { exact: true }),
  ).toBeVisible();
});
