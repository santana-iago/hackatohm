export const tenderPath = "/oportunidades/ENE-001";
export const tenderTabs = [
  ["resumo", "Resumo"],
  ["criterios", "Critérios"],
  ["equipe", "Equipe"],
  ["recovery", "Recovery"],
  ["dossie", "Dossiê"],
] as const;
export const routeTitle = (path: string) =>
  path.startsWith(tenderPath)
    ? "Propostas técnicas"
    : ({
        "/inicio": "Hoje",
        "/pessoas": "Base Viva",
        "/oportunidades": "Oportunidades",
        "/descoberta": "Descoberta",
        "/connect": "Connect",
        "/participacao": "Minha participação",
      }[path] ?? "Hoje");
