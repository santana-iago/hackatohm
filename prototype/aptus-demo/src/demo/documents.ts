import type { Evidence } from "./types";

export const editalPages: {
  page: number;
  title: string;
  clauses: { id: string; text: string }[];
}[] = [
  {
    page: 1,
    title: "Objeto e identificação",
    clauses: [
      {
        id: "Objeto",
        text: "DEMONSTRAÇÃO ACADÊMICA — DOCUMENTO FICTÍCIO. Consórcio Horizonte Energia. Oportunidade ENE-001: Modernização de operações de energia. Este documento exemplifica a seleção da equipe-chave de uma proposta técnica. A entrega documental do cenário encerra-se em 27 de outubro de 2026, às 18h, horário de Brasília. Não se trata de edital real.",
      },
    ],
  },
  {
    page: 2,
    title: "Equipe e período",
    clauses: [
      {
        id: "Equipe e período",
        text: "A equipe conterá um Gerente de projeto e um Especialista em segurança, exercidos por pessoas distintas. O período considerado é de 2 de novembro de 2026 a 29 de janeiro de 2027. Exigem-se, respectivamente, 32 e 20 horas semanais disponíveis durante todo o período. A disponibilidade e o vínculo compatível devem ser confirmados para a indicação.",
      },
    ],
  },
  {
    page: 3,
    title: "Apresentação de provas",
    clauses: [
      {
        id: "Apresentação de provas",
        text: "As informações de currículo devem estar associadas a documentos que identifiquem o titular, a experiência ou credencial e as datas pertinentes. Atestados precisam relacionar o profissional ao projeto e à função exercida. Arquivos diferentes sobre o mesmo projeto não constituem novas experiências pontuáveis. A documentação usada na parcela da equipe deverá poder integrar o dossiê demonstrativo. Não há envio a contratante real.",
      },
    ],
  },
  {
    page: 4,
    title: "Critérios da equipe-chave",
    clauses: [
      {
        id: "7.1.1",
        text: "7.1.1. O Gerente deve apresentar PMP vigente. A credencial aceita atribui dez pontos, uma única vez.",
      },
      {
        id: "7.2.1",
        text: "7.2.1. A atuação gerencial comprovada em projetos distintos do setor de energia atribui dois pontos por projeto, limitada a oito pontos.",
      },
      {
        id: "7.2.2",
        text: "7.2.2. Pós-graduação aceita na área atribui cinco pontos; sua ausência não elimina o candidato.",
      },
      {
        id: "7.3.1",
        text: "7.3.1. O Especialista deve apresentar Security+ vigente, que atribui seis pontos.",
      },
      {
        id: "7.3.2",
        text: "7.3.2. Projetos relevantes distintos, com participação aceita para a função de Especialista, atribuem dois pontos por projeto, limitada a oito pontos.",
      },
      {
        id: "7.4",
        text: "7.4. A mesma pessoa não poderá ocupar simultaneamente as duas funções. A nota aqui descrita refere-se exclusivamente à equipe-chave.",
      },
    ],
  },
];
export interface DemoDocument {
  title: string;
  pages: { title: string; text: string; highlight?: string }[];
}
const names: Record<string, string> = {
  "p-bruno": "Bruno Almeida",
  "p-carla": "Carla Mendes",
  "p-diego": "Diego Santos",
  "p-eva": "Eva Lima",
  "p-lia": "Lia Costa",
  "p-marina": "Marina Torres",
  "p-pedro": "Pedro Rocha",
  "p-rafael": "Rafael Nunes",
};
export function getDocument(evidence: Evidence): DemoDocument {
  const person = names[evidence.personId] ?? "Profissional fictício";
  if (evidence.id === "ev-carla-aurora")
    return {
      title: evidence.filename,
      pages: [
        {
          title: "Atestado de participação · CAR-G02",
          text: "ATESTADO DEMONSTRATIVO — SEM VALIDADE DOCUMENTAL. A empresa fictícia Aurora Energia declara, exclusivamente para esta simulação, que Carla Mendes atuou como gerente do projeto Aurora — Modernização de Operações de Energia, entre 01/03/2023 e 15/12/2023. A participação compreendeu o planejamento, a coordenação da execução e o acompanhamento das entregas no setor de energia. Identificação do projeto: CAR-G02. Emissão fictícia em 26/10/2026. Responsável de exemplo: Renata Alves, coordenação de projetos. Este texto e seus nomes são dados sintéticos do protótipo APTUS.",
          highlight: "Carla Mendes atuou como gerente do projeto Aurora",
        },
      ],
    };
  if (evidence.id === "ev-carla-vale")
    return {
      title: evidence.filename,
      pages: [
        {
          title: "Atestado de participação · CAR-G03",
          text: "ATESTADO DEMONSTRATIVO — SEM VALIDADE DOCUMENTAL. A empresa fictícia Vale do Sol Energia declara, exclusivamente para esta simulação, que Carla Mendes exerceu a função de gerente no projeto Vale do Sol — Governança de Operações de Energia, de 15/01/2024 a 28/06/2024. O trabalho envolveu a organização das frentes de implantação, a coordenação de responsáveis e o acompanhamento dos resultados operacionais do projeto. Identificação do projeto: CAR-G03. Emissão fictícia em 26/10/2026. Responsável de exemplo: Paulo Vieira, gestão de operações. Documento sintético do protótipo APTUS.",
          highlight:
            "Carla Mendes exerceu a função de gerente no projeto Vale do Sol",
        },
      ],
    };
  if (evidence.id === "ev-lia-sec")
    return {
      title: evidence.filename,
      pages: [
        {
          title: "Registro de credencial · Security+",
          text: "EXEMPLO DE REGISTRO DE CREDENCIAL — DADOS FICTÍCIOS. Titular: Lia Costa. Credencial representada: Security+. Identificador demonstrativo DEMO-SEC-LIA-001. Emissão em 01/08/2026 e validade até 01/08/2029. Este registro existe apenas para exemplificar apresentação e conferência de uma credencial; não foi emitido por certificadora e não representa uma certificação real.",
          highlight: "Titular: Lia Costa. Credencial representada: Security+",
        },
      ],
    };
  if (evidence.id === "ev-marina-cloud")
    return {
      title: evidence.filename,
      pages: [
        {
          title: "Registro de qualificação · Nuvem",
          text: "EXEMPLO DE REGISTRO DE CREDENCIAL — DADOS FICTÍCIOS. Titular: Marina Torres. Qualificação representada: Arquitetura de soluções em nuvem. Instituição: Instituto Horizonte de Tecnologia — fictício. Identificador DEMO-CLOUD-MARINA-001. Emissão fictícia em 15/08/2026. Validade fictícia até 15/08/2029. Este documento sintético existe exclusivamente para a demonstração APTUS. Não é uma credencial real. A qualificação não equivale a PMP ou Security+.",
          highlight:
            "Titular: Marina Torres. Qualificação representada: Arquitetura de soluções em nuvem",
        },
      ],
    };
  if (evidence.id === "ev-rafael-sec")
    return {
      title: evidence.filename,
      pages: [
        {
          title: "Exemplo de divergência de titular",
          text: "DEMONSTRAÇÃO · DADOS FICTÍCIOS. Documento apresentado no perfil de Rafael Nunes. Titular impresso no registro de exemplo: Roberto Silva. Qualificação representada: Security+. Esta divergência impede a validação do arquivo como prova de Rafael Nunes. Motivo registrado por Beatriz Souza em 26/10/2026: titular divergente. Nenhuma qualificação ou ponto foi atribuído ao perfil.",
          highlight: "Titular impresso no registro de exemplo: Roberto Silva",
        },
      ],
    };
  const validity =
    evidence.validity === "na"
      ? "Sem prazo de validade aplicável à regra."
      : `Validade fictícia até ${evidence.validUntil ?? "não informada"}.`;
  const projectText =
    evidence.kind === "project"
      ? `O profissional ${person} exerceu a função de ${evidence.roleId === "manager" ? "Gerente de projeto" : "Especialista em segurança"} no projeto ${evidence.project}. Identificação da participação: ${evidence.unitId}. Período histórico fictício: 01/02/2024 a 30/11/2024. A atuação incluiu ${evidence.roleId === "manager" ? "planejamento e coordenação de operações no setor de energia" : "avaliação de controles, gestão de acessos e acompanhamento de segurança"}.`
      : evidence.kind === "postgraduate"
        ? `${person} concluiu a pós-graduação em Gestão de projetos de energia em 15/12/2022.`
        : `Titular: ${person}. Credencial representada: ${evidence.kind === "pmp" ? "PMP" : "Security+"}. Identificador demonstrativo: ${evidence.unitId}. Emissão fictícia em 01/01/2025.`;
  return {
    title: evidence.filename,
    pages: [
      {
        title: evidence.title,
        text: `DEMONSTRAÇÃO ACADÊMICA — DADOS FICTÍCIOS. ${projectText} ${validity} Emissão de exemplo anterior ao corte de 27/10/2026. Documento ${evidence.id}, versão ${evidence.version}. Este texto é sintético e não foi emitido por certificadora ou organização real. Conferência histórica de RH: Beatriz Souza, 26/10/2026. O aceite para cada regra do edital é uma decisão separada, registrada no Aptus.`,
        highlight:
          evidence.kind === "project"
            ? `${person} exerceu a função de ${evidence.roleId === "manager" ? "Gerente de projeto" : "Especialista em segurança"}`
            : person,
      },
    ],
  };
}
