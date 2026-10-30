import type { DossierSnapshot } from "../demo/types";

export const DOSSIER_FILENAME =
  "APTUS_Nexora_ENE-001_Dossie_Demonstrativo_v1.pdf";

const rules: Record<string, string> = {
  "G-PMP": "PMP vigente",
  "G-POS": "Pós-graduação aceita na área",
  "G-ENERGIA": "Projetos distintos de energia - Gerente",
  "E-SEC": "Security+ vigente",
  "E-PROJETOS": "Projetos relevantes distintos - Especialista",
};
const ink: [number, number, number] = [6, 31, 50];
const blue: [number, number, number] = [12, 27, 168];
const muted: [number, number, number] = [81, 94, 110];

// All content comes from the approved snapshot. No fetch, screen capture or live state.
export async function buildDossierPdf(
  snapshot: DossierSnapshot,
): Promise<Blob> {
  if (!snapshot.approvedAt || snapshot.mode !== "simulated") {
    throw new Error("O resumo exige um snapshot demonstrativo aprovado.");
  }
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });
  pdf.setProperties({
    title: `Aptus | Nexora - ENE-001 - Dossiê demonstrativo v${snapshot.version}`,
    subject:
      "Demonstração acadêmica com dados fictícios. Escopo: equipe-chave.",
    author: "Nexora - empresa fictícia",
    creator: "Aptus - protótipo local",
    keywords: "demonstração, dados fictícios, ENE-001, equipe-chave",
  });
  // Stable metadata keeps reexports of the same approval byte-for-byte identical.
  pdf.setCreationDate("D:20261027100000-03'00'");
  const stableSource = JSON.stringify(snapshot);
  let hash = 2166136261;
  for (let i = 0; i < stableSource.length; i += 1)
    hash = Math.imul(hash ^ stableSource.charCodeAt(i), 16777619);
  pdf.setFileId((hash >>> 0).toString(16).padStart(8, "0").repeat(4));

  const width = 174;
  const text = (
    value: string,
    x: number,
    y: number,
    maxWidth = width,
    size = 11,
    color = ink,
    bold = false,
  ) => {
    pdf.setFont("helvetica", bold ? "bold" : "normal");
    pdf.setFontSize(size);
    pdf.setTextColor(...color);
    // WinAnsi's complete Portuguese accented alphabet is provided by Helvetica.
    const lines: string[] = pdf.splitTextToSize(
      value.replace(/[\u2011\u2013\u2014]/g, "-"),
      maxWidth,
    );
    pdf.text(lines, x, y, { lineHeightFactor: 1.35 });
    return y + lines.length * size * 0.3528 * 1.35;
  };
  const divider = (y: number) => {
    pdf.setDrawColor(222, 228, 235);
    pdf.line(18, y, 192, y);
  };
  const page = (number: number, section: string) => {
    if (number > 1) pdf.addPage();
    pdf.setFillColor(...ink);
    pdf.rect(0, 0, 210, 40, "F");
    text("NEXORA", 18, 17, 110, 20, [255, 255, 255], true);
    text("Propostas técnicas | Aptus", 18, 28, 174, 10, [201, 220, 242]);
    pdf.setFontSize(10);
    pdf.setTextColor(255, 255, 255);
    pdf.text("ENE-001", 192, 17, { align: "right" });
    pdf.setFillColor(234, 239, 251);
    pdf.rect(18, 47, 174, 10, "F");
    text("Demonstração · dados fictícios", 22, 53.4, 166, 10, blue, true);
    text(section, 18, 71, width, 21, ink, true);
    divider(278);
    text("Demonstração · dados fictícios", 18, 286, 130, 9, muted);
    pdf.setFontSize(9);
    pdf.text(`${number} / 4`, 192, 286, { align: "right" });
  };

  page(1, "Resumo da equipe-chave");
  let y =
    text("Modernização de operações de energia", 18, 86, width, 13, ink, true) +
    5;
  y =
    text(
      "Contratante: Consórcio Horizonte Energia - fictício",
      18,
      y,
      width,
      11,
      muted,
    ) + 10;
  pdf.setFillColor(245, 246, 250);
  pdf.roundedRect(18, y - 2, width, 39, 3, 3, "F");
  text(String(snapshot.score), 25, y + 19, 55, 34, blue, true);
  text("Pontos da equipe-chave", 59, y + 9, 125, 12, ink, true);
  text(
    "Resultado referente à amostra e às versões desta demonstração.",
    59,
    y + 18,
    123,
    10,
    muted,
  );
  y += 49;
  y = text("Composição aprovada", 18, y, width, 13, ink, true) + 5;
  y =
    text(`Gerente de projeto: ${snapshot.team.manager} | 32 h/semana`, 18, y) +
    3;
  y =
    text(
      `Especialista em segurança: ${snapshot.team.specialist} | 20 h/semana`,
      18,
      y,
    ) + 5;
  y = text(`Período: ${snapshot.window}`, 18, y) + 7;
  y = text(snapshot.texts.scope, 18, y, width, 11) + 8;
  text(
    `Regras: ${snapshot.ruleVersion}\nUniverso: ${snapshot.universeVersion}\nSnapshot: ${snapshot.id} | versão ${snapshot.version}\nAprovação: ${snapshot.approvedAt}`,
    18,
    y,
    width,
    10,
    muted,
  );
  text(
    "Amostra de dossiê. Sem envio, contratação ou validação de integração real.",
    18,
    264,
    width,
    10,
    muted,
  );

  page(2, "Memória de cálculo");
  y =
    text(
      `Total aprovado: ${snapshot.score} pontos da equipe-chave`,
      18,
      87,
      width,
      13,
      ink,
      true,
    ) + 7;
  for (const component of snapshot.components) {
    const name =
      component.roleId === "manager"
        ? snapshot.team.manager
        : snapshot.team.specialist;
    const title = `${component.ruleId} | ${rules[component.ruleId] || component.ruleId}`;
    y = text(title, 18, y, 143, 11, ink, true);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(...blue);
    pdf.setFontSize(13);
    pdf.text(`${component.points} pts`, 192, y - 5.2, { align: "right" });
    y = text(
      `${name} | Unidades: ${component.unitIds.join(", ")}`,
      18,
      y + 1,
      width,
      9.5,
      muted,
    );
    y =
      text(
        `Provas: ${component.evidenceIds.join(", ")}`,
        18,
        y + 1,
        width,
        9.5,
        muted,
      ) + 5;
    divider(y - 2);
  }
  y += 4;
  text(
    "Projetos e credenciais são contabilizados por unidade distinta. Outro arquivo do mesmo projeto não acrescenta pontos. Reconhecimento pessoal não integra esta nota.",
    18,
    y,
    width,
    10,
    muted,
  );

  page(3, "Currículos direcionados");
  y =
    text(
      `${snapshot.team.manager} | Gerente de projeto`,
      18,
      88,
      width,
      14,
      ink,
      true,
    ) + 5;
  y = text(snapshot.texts.managerCv, 18, y, width, 11) + 12;
  divider(y - 6);
  y =
    text(
      `${snapshot.team.specialist} | Especialista em segurança`,
      18,
      y,
      width,
      14,
      ink,
      true,
    ) + 5;
  y = text(snapshot.texts.specialistCv, 18, y, width, 11) + 12;
  text(
    "Conteúdo direcionado às funções de ENE-001. Somente os fatos aceitos e preservados no snapshot são apresentados como comprovados. A consulta atual da Base Viva pode conter contribuições posteriores.",
    18,
    y,
    width,
    10,
    muted,
  );

  page(4, "Índice de provas e aprovações");
  y =
    text(
      "Índice demonstrativo. Os arquivos originais não estão anexados a este resumo.",
      18,
      85,
      width,
      10,
      muted,
    ) + 7;
  for (const [index, evidence] of snapshot.evidence.entries()) {
    y = text(
      `${String(index + 1).padStart(2, "0")}  ${evidence.person} | ${evidence.title}`,
      18,
      y,
      width,
      9.5,
      ink,
      true,
    );
    y =
      text(
        `${evidence.id} | ${evidence.unitId} | v${evidence.version} | ${evidence.filename}`,
        18,
        y + 0.8,
        width,
        8.8,
        muted,
      ) + 3.5;
  }
  divider(y + 1);
  y = text("Aprovações preservadas", 18, y + 10, width, 11, ink, true) + 3;
  y = text(snapshot.approvers.join(" · "), 18, y, width, 9.5) + 3;
  text(
    `Aprovação do conteúdo: ${snapshot.approvedAt}\nRevisão de entradas: ${snapshot.inputRevision} | Escopo: KEY_TEAM\nNão houve envio a contratante real.`,
    18,
    y,
    width,
    9,
    muted,
  );
  return pdf.output("blob");
}
