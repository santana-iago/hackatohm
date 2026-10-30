# APTUS para Nexora — Plano de implementação do MVP demonstrativo

Este documento especifica o comportamento, os dados de exemplo, a interface e os critérios de aceite do protótipo navegável. A implementação segue as etapas descritas nas seções 13–15.

**Objetivo:** demonstrar visualmente todos os fluxos do APTUS em uma aplicação interna da Nexora, com interações funcionais, dados inteiramente fictícios e processamento simulado, preparada para operação manual e captura automatizada.

**Abordagem:** aplicação web para uso em MacBook, com linguagem de interface do macOS, estado local determinístico e documentos de exemplo. A interface deve executar as transições descritas; a arquitetura de produção do APTUS não faz parte deste trabalho.

**Stack sugerida:** React + TypeScript + Vite, CSS com tokens, ícones SVG de uma única família e jsPDF para o PDF demonstrativo local. Se já existir um frontend compatível no ambiente, aproveite-o. Não adicione backend ou troque a stack existente apenas para seguir esta sugestão.

**Especificação:** as seções 1–12 deste próprio arquivo constituem o design; as seções 13–15 são o plano de execução e aceite. A documentação APTUS 3.1 é a referência de comportamento, transcrita aqui no que é necessário para construir o mock.

**Versão:** 1.2 — 27/10/2026. Revisão de narrativa: qualidade da arquitetura, critérios da banca, viabilidade e canvas técnico. **Idioma:** português do Brasil. **Entrega:** código do protótipo, instruções de execução, roteiro de gravação e imagens de conferência. **Natureza:** demonstração acadêmica com dados sintéticos; não é sistema implantado ou validado.

## Restrições globais

- Nome do produto: **Aptus**, com `APTUS` permitido em títulos institucionais. Empresa do cenário: **Nexora**. Não usar Lastro na interface nova.
- Preservar os seis fluxos: Base Viva, Edital/equipe, Recovery, Descoberta, Connect e Dossiê. Reconhecimento apoia a atualização da base.
- Alvo principal: aplicação web em **macOS/MacBook**, operada com teclado, mouse e trackpad. A referência visual é o macOS; o protótipo web não depende de Swift ou Xcode.
- Interface de operação, sem landing page, página de vendas ou carrossel de slides como substituto da aplicação.
- Toda a experiência de negócio é local e simulada. Não integrar Java, Spring, banco, OCR, RAG, Qwen, Jev, OR-Tools, e-mail, sistemas de RH ou autenticação real.
- A lógica mínima em TypeScript deve manter dados, estados, pontuações e documentos coerentes. Isso serve à demonstração; não é implementação do motor de produção.
- Manter o selo visível **“Demonstração · dados fictícios”**, inclusive no modo de gravação e nos arquivos exportados.
- Mostrar **30 → 31 → 33 → 35**, pelas causas descritas neste arquivo. Nunca atribuir o ganho a um upload ainda não aceito.
- Não inventar métricas de acurácia, economia obtida, contratos ganhos, integração executada ou desempenho de IA.
- Todos os recursos essenciais devem ser locais depois do build. Não depender de Google Fonts, imagens remotas, serviços externos ou conexão para a reprodução do fluxo.
- Não enviar mensagens nem publicar proposta. Exportar um arquivo não significa enviar a uma licitação.
- A construção do mock não deve alterar as decisões de arquitetura ou a documentação canônica do produto real.

## Foco da revisão

1. Documento recebido ou verificado pelo RH não pode aumentar pontos antes da aceitação no edital e do recálculo.
2. Cliques repetidos, troca de cena e tarefas pendentes não podem duplicar provas, reconhecimento ou atualizações tardias.
3. Alterar uma entrada relevante não pode manter um resultado antigo apresentado como atual nem permitir exportar uma aprovação obsoleta.
4. A descoberta e as indicações não podem modificar acidentalmente a demonstração fechada de 35 pontos.
5. A versão de gravação deve conservar legibilidade, foco, contexto e a identificação de simulação em todos os tamanhos previstos.

---

## 1. Experiência que queremos construir

### 1.1 O que a banca deve compreender

Ao acompanhar uma única disputa, a pessoa deve entender que o Aptus organiza conhecimento sobre profissionais, relaciona exigências a provas, compara equipes respeitando restrições, recupera documentação faltante e prepara um dossiê verificável. Depois, deve enxergar como campanhas, indicações e reconhecimento mantêm a base atualizada.

A ação visual que identifica o produto é **clicar em uma parcela da pontuação e ver a regra, o profissional, o projeto e o documento que a sustentam**. Esse vínculo deve existir no comparador, no Recovery e no dossiê.

O momento principal da demonstração é observar **31 pontos confirmados e 35 condicionados**, acompanhar a aceitação de duas provas distintas e obter, após recálculos, **33 e 35 pontos**. A interface deve tornar a causa de cada mudança compreensível. No pitch, esse exemplo deve ser conectado explicitamente à arquitetura técnica.

**Tese que orienta a apresentação:** a contribuição técnica do APTUS está na arquitetura de um pipeline que integra RAG, LLMs, Jev, regras determinísticas e otimização matemática para transformar documentos dispersos em equipes e dossiês sustentados por evidências rastreáveis. A proposta de gerir competências contextualiza o problema; a inovação defendida está na engenharia da implementação, nos contratos entre etapas e na preservação de fontes, versões, decisões e memória de cálculo.

O vídeo deve reservar um trecho próprio para um diagrama identificado como **“Arquitetura proposta”**, com as seguintes responsabilidades:

| Etapa de produção proposta | O que a apresentação deve explicar |
|---|---|
| Docling + Qwen | Extração de texto e tabelas, normalização de fatos e preservação da origem. |
| PostgreSQL + pgvector + RAG | Base versionada e recuperação estruturada, textual e vetorial; uso dos trechos recuperados como contexto do LLM. |
| Jev | Julgamentos semânticos delimitados, com saídas tipadas e sinalização de ambiguidades. |
| Java + OR-Tools CP-SAT | Aplicação dos critérios aprovados e cálculo dos pontos; composição de equipes sob restrições, respectivamente. |
| LLM + Jev + Java | Redação do dossiê com fontes, conferência semântica e validação de referências. |
| Recovery e revisão humana | Nova prova verificada e aceita realimenta a base e provoca recálculo; RH, Licitações e PMO mantêm suas decisões. |

Esse trecho é uma explicação técnica para a montagem do vídeo. Pode ser um diagrama externo à aplicação, sem acrescentar painéis técnicos ao fluxo do usuário. O implementador deve manter todas as integrações simuladas, sem telas que aleguem chamadas reais a Jev, RAG ou Qwen. O mock demonstra os efeitos visíveis da arquitetura proposta; não comprova seu desempenho. Não afirmar ineditismo global, economia medida ou correção garantida pela simples combinação dessas tecnologias.

**Critérios que orientam a apresentação:** o briefing EloGroup atribui 25% a qualidade/viabilidade, 20% a entendimento/quantificação do problema, 20% a impacto fundamentado, 20% a comunicação/pitch e 15% a criatividade/diferenciação. A página geral do evento traz cinco critérios de pesos iguais; a precedência não foi esclarecida. Cobrir ambas as orientações. O case destaca comprovação, privacidade, veracidade e adesão: os estados e responsáveis da aplicação devem tornar esses aspectos visíveis.

**Apresentação do plano real:** usar um canvas inspirado no Obsidian, com grupos de evidências, interpretação e decisão, rota SQL independente, retorno do Recovery e fases de implantação. Ele representa a arquitetura proposta. Explicar que processamento incremental, limites de execução, permissões antes da recuperação, contingência manual e teste de custo total são decisões do plano de produção. Elas não devem ser mostradas como integrações ou controles de segurança reais já implementados no mock. Arquivos fornecidos com o material revisado: `APTUS_Canvas_Premium.svg`, `.png`, `.pdf` e `APTUS_Pipeline_e_Plano.canvas`.

### 1.2 Escolha de implementação para este protótipo

| Caminho considerado | Adequação ao objetivo |
|---|---|
| Telas estáticas ou protótipo só de cliques | Rápido para ilustrar, mas insuficiente para explorar estados, repetir cenas e demonstrar as consequências das ações. |
| **Aplicação web com estado local — direção adotada neste plano** | Permite navegação, revisão de provas, recálculo didático, downloads e captura automatizada da apresentação. |
| Aplicativo nativo ou pipeline de produção | Acrescenta integração e infraestrutura fora do escopo desta entrega. |

A escolha de React/Vite é uma recomendação de execução, não um requisito do projeto real. O contrato obrigatório é o comportamento e a experiência descritos aqui.

### 1.3 Quem utiliza a interface

- **Licitações — Juliana Ramos:** revisa critérios, aceita o uso de provas no edital e aprova o dossiê.
- **RH — Beatriz Souza:** confere identidade, informações e documentos; valida contribuições.
- **PMO — André Costa:** confirma participação e disponibilidade para o período exigido.
- **Colaborador:** vê suas informações, confirma fatos, apresenta documentos e aceita indicações.

Essas identidades são fictícias. Um seletor **“Visão: Licitações”**, com descrição de que a troca é demonstrativa, substitui login e permissões reais. Mudar de visão deve conservar o estado e oferecer as ações compatíveis com aquele papel. Não construir telas de cadastro, senha, MFA ou gestão de usuários.

### 1.4 O que fica explicitamente fora

Não construir negociação comercial, preço da proposta, contratação, envio à entidade licitante, calendários corporativos reais, gestão completa de escalas, chat genérico com IA, treinamento de modelos ou extração de arquivos arbitrários. Não criar telas decorativas para essas funções. O fluxo cobre a **parcela técnica referente à equipe-chave**.

---

## 2. Identidade visual: Aptus dentro da Nexora

### 2.1 Origem e honestidade da identidade

O case fornecido apresenta a Nexora como empresa fictícia e utiliza a identidade da **EloGroup**. Nas páginas do desafio não há um manual ou logotipo independente da Nexora. Portanto, esta aplicação adotará uma **identidade conceitual da Nexora criada para a demonstração**, inspirada na linguagem gráfica do material do desafio. Não buscar na internet uma empresa homônima e utilizar sua marca.

As cores `#0C1BA8`, `#061F32`, `#C9DCF2`, `#F9F9F9` e `#272727` foram observadas no PDF do case, nas páginas 13–19. Elas pertencem ao material de referência; a combinação abaixo é uma proposta para o protótipo, não um manual oficial da Nexora.

### 2.2 Hierarquia de marcas

- No alto da barra lateral: símbolo simples do produto + **Aptus**.
- Logo abaixo: wordmark **NEXORA** e rótulo **“Workspace corporativo”**.
- Na abertura da disputa e nos documentos: **“Nexora · Propostas técnicas”**.
- No painel “Sobre”: **“Protótipo APTUS para o case Nexora · HackatOhm 2026 · Desafio EloGroup”**.
- EloGroup aparece como empresa do desafio, não como se fosse a marca da Nexora ou a proprietária de um produto já implantado.

Criar um símbolo vetorial original e discreto para Aptus: uma letra A geométrica construída com duas hastes e uma pequena travessa que lembra a ligação entre requisito e evidência. O wordmark Nexora pode ser tipográfico, em peso semibold, sem copiar o símbolo da EloGroup. Entregar SVG local. Ícones devem continuar identificáveis a 20–24 px.

### 2.3 Tokens obrigatórios da proposta

| Token | Valor | Aplicação |
|---|---|---|
| `brand.primary` | `#0C1BA8` | Ação principal, seleção, links e pequenos destaques da Nexora. |
| `brand.ink` | `#061F32` | Títulos e cabeçalho do dossiê. |
| `brand.pale` | `#C9DCF2` | Destaques suaves e relações entre evidências. |
| `surface.canvas` | `#F5F6FA` | Fundo geral proposto para o aplicativo. |
| `surface.content` | `#FFFFFF` | Tabelas, documentos e área principal. |
| `surface.subtle` | `#F9F9F9` | Seções e linhas alternadas discretas. |
| `text.primary` | `#272727` | Texto principal. |
| `text.secondary` | `#5B6472` | Metadados; conferir contraste no fundo final. |
| `border.subtle` | `#E7E7EA` | Separadores decorativos. Não usar como único limite de campo que precisa de contraste. |
| `border.control` | `#8B94A5` | Contorno de controles quando necessário para identificação. |
| `status.success` | `#166534` | Aceito, confirmado e válido. |
| `status.warning` | `#8A4B08` | Condicionado, pendente ou atenção. |
| `status.error` | `#B42318` | Impedimento ou rejeição. |

Estados usam **texto + ícone + cor**. Um ponto âmbar sozinho não comunica que uma prova está pendente. Não usar o mesmo verde para “documento recebido” e “prova aceita no edital”.

### 2.4 Linguagem Apple adequada ao MacBook

Aplicar os princípios de uma ferramenta de produtividade para Mac: barra lateral persistente, toolbar contextual, tabelas legíveis, inspeção lateral e poucos níveis de navegação. As referências da Apple estão ao final do arquivo. O protótipo web traduz esses padrões; não declara usar componentes nativos do sistema.

- Tipografia: `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`. Não redistribuir arquivos de fonte Apple nem depender de download remoto.
- Texto normal: **15–16 px**; metadados: **13 px**; títulos de página: **26–28 px**; seções: **18–20 px**; números principais: **44–48 px**.
- Modo gravação: texto principal **18 px**, metadados **14 px**, número principal **52 px**. Reduzir informação visível antes de reduzir a fonte.
- Escala de espaçamento: 4, 8, 12, 16, 24 e 32 px.
- Controles: altura visual mínima de 36 px no desktop; área acionável de pelo menos 40 px, ou 44 px no modo gravação. Valores são decisões desta interface web, não conversão de pontos nativos para pixels.
- Raios: 8 px em campos, 10 px em botões, 12–16 px em painéis e diálogos. Não transformar todos os controles em cápsulas.
- Sombras leves; hierarquia principalmente por espaço, contraste e separadores.
- Translucidez discreta apenas na navegação, toolbar e popovers. Texto, memória de cálculo e documentos ficam em superfícies opacas. Sem efeito de vidro sobre todas as tabelas.
- Caso `backdrop-filter` ou preferências de transparência não sejam suportados, usar fundo opaco equivalente. A legibilidade é a mesma.
- Ícones SVG monocromáticos, mesma família e espessura. Pode usar Lucide; não misturar emojis, ícones 3D e famílias diferentes.
- Foco visível, navegação por Tab, Enter para ação focada e Escape para fechar diálogos.
- Atalho opcional `⌘K` abre busca interna; botão visível equivalente obrigatório. Não interceptar `⌘L`, `⌘W`, `⌘R` ou atalhos essenciais do navegador.
- Sem barra de menus macOS desenhada dentro da página, Dock fictício, moldura de MacBook ou botões vermelho/amarelo/verde que não controlam uma janela real.
- Aparência clara é P0. Tema escuro não é necessário para cumprir a entrega.

### 2.5 Elementos visuais distintivos

1. **Trilha do ponto:** ao selecionar “+2 · Projeto Aurora”, abrir um inspetor com quatro blocos: regra, participação, documento e aceite. Uma linha fina conecta os blocos; todos são legíveis e navegáveis.
2. **Comparador de composição:** dois espaços de função, Gerente e Especialista, com pessoas e parcelas da nota. As alternativas ficam em linhas comparáveis, não em um gráfico abstrato.
3. **Recovery:** pontuação confirmada em destaque e potencial em área separada com o rótulo “Condicionado a provas”. Ao aceitar e recalcular, a mudança aparece junto à evidência correspondente.
4. **Dossiê Nexora:** prévia editorial clara, cabeçalho institucional azul, tipografia sóbria, sumário de provas e selo de demonstração.

---

## 3. Navegação, componentes e enquadramento

### 3.1 Estrutura da aplicação

| Área principal | Rota lógica | Conteúdo |
|---|---|---|
| Hoje | `/inicio` | Disputa em destaque, próximas ações, eventos e vencimentos. |
| Base Viva | `/pessoas` | Diretório de dez perfis, busca, filtros e inspetor de pessoa. |
| Oportunidades | `/oportunidades` | Uma disputa principal e acesso ao seu espaço de trabalho. |
| Disputa ENE-001 | `/oportunidades/ENE-001` | Abas Resumo, Critérios, Equipe, Recovery e Dossiê. |
| Descoberta | `/descoberta` | Campanha Security+, resposta, documento e verificação. |
| Connect | `/connect` | Indicação interna completa e variante de convite externo. |
| Minha participação | `/participacao` | Contribuições validadas, reconhecimento e atualização do perfil. |

O inspetor de evidência, a fila de revisão e o histórico são componentes compartilhados, não novas áreas no menu. O painel de demonstração também não é um módulo comercial: fica acessível por um botão discreto “Demonstração”.

### 3.2 Composição da janela

- Barra lateral: **232 px**, recolhível por botão.
- Toolbar superior: aproximadamente **64 px**, com breadcrumb/título, busca, visão atual e ação contextual.
- Conteúdo: ocupa o restante, com até 24–32 px de margem interna.
- Inspetor: **360–400 px** quando houver espaço. Em telas menores, abre sobreposto, com botão Fechar e retorno de foco.
- Cada tela tem uma ação principal evidente. Ações secundárias usam botões neutros ou menu de mais opções.
- Usar rolagem na área de conteúdo e, quando necessário, dentro do documento. Evitar três áreas de rolagem simultâneas.
- A tabulação da disputa deve conservar o contexto, a versão do edital e a pontuação da última avaliação válida.

### 3.3 Tamanhos e captura

| Contexto | Viewport de referência | Comportamento |
|---|---|---|
| Captura principal | **1920 × 1080, 16:9** | Conteúdo ampliado, até três regiões legíveis e controles de produção escondidos. |
| MacBook | **1440 × 900** | Barra lateral, conteúdo e inspetor quando couberem sem comprimir texto. |
| Janela compacta | **1280 × 720** | Inspetor sobreposto; colunas secundárias recolhidas; ação principal visível. |
| Tela estreita | Abaixo de 1024 px | Menu recolhido e conteúdo utilizável em uma coluna. Não há necessidade de um aplicativo móvel separado. |

Não prometer que todo MacBook possui essas resoluções: elas são viewports de projeto e verificação. Para o vídeo, gravar a área da aplicação ou um navegador em fullscreen; o próprio navegador/sistema fornece o ambiente real.

### 3.4 Componentes a reutilizar

`AppShell`, `Sidebar`, `ContextToolbar`, `DemoBadge`, `RoleSwitcher`, `DataTable`, `PersonInspector`, `EvidenceInspector`, `MockDocumentViewer`, `ScoreBreakdown`, `TeamComparison`, `RecoveryTaskPanel`, `ReviewChecklist`, `AuditTimeline`, `DemoController` e `StatusMessage`.

Tabelas são tabelas semânticas; botões são elementos `button`; campos têm labels; abas expõem estado ativo. Diálogos têm título acessível, foco inicial previsível e devolvem foco ao elemento que os abriu. Nenhuma ação obrigatória depende só de hover, arrastar ou clique direito.

---

## 4. Dados do cenário: uma única fonte de verdade

### 4.1 Relógio e oportunidade fictícia

| Campo | Valor fixado para a demonstração |
|---|---|
| Empresa | Nexora — consultoria fictícia. |
| Oportunidade | **ENE-001 · Modernização de operações de energia**. |
| Contratante | **Consórcio Horizonte Energia — fictício**. |
| Edital | `ENE-001-v1`, conjunto de regras `RULES-ENE-001-v1`. |
| Relógio inicial | **27/10/2026, 10:00**, fuso `America/Sao_Paulo`. |
| Prazo de provas e da proposta do cenário | **27/10/2026, 18:00**, explicitamente fictício. Não confundir com prazo do HackatOhm. |
| Prazo interno das tarefas Recovery | **27/10/2026, 15:00**. |
| Período de execução exigido | **02/11/2026 a 29/01/2027**, inclusive. |
| Funções | Uma pessoa Gerente de projeto e uma pessoa Especialista em segurança. |
| Acumulação | Mesma pessoa não pode ocupar as duas funções. |
| Carga na demonstração | Gerente 32 h/semana; Especialista 20 h/semana; conferir todo o intervalo. |
| Universo mostrado | Dez perfis sintéticos; quatro perfis centrais com qualificação modelada para a comparação inicial. |
| Estado inicial | Critérios ainda em revisão; nenhuma nota atual publicada. Documentos centrais existentes já têm revisão histórica de RH. |

O relógio não usa `Date.now()` para prazos de negócio. Comandos podem acrescentar um minuto ao horário fictício para ordenar a trilha, sem ultrapassar os prazos no percurso principal. “Atualizado há dois minutos” deve ser calculado pelo relógio da demonstração, ou substituído por horário absoluto.

**Dois marcos distintos:** “inicial” nas tabelas de pontuação significa o início da comparação, depois de aprovar a matriz e aceitar as provas centrais para suas regras. Na primeira abertura da aplicação, os documentos centrais já estão verificados pelo RH, mas seu uso na matriz em revisão ainda não está aceito. Esse aceite é uma ação explícita de Licitações; não surge automaticamente da aprovação das regras.

### 4.2 Regras do edital didático

| ID | Função | Regra | Natureza |
|---|---|---|---|
| `G-PMP` | Gerente | PMP vigente e aceito na data de corte; vale **10 pontos**. | Obrigatória; os pontos são atribuídos uma única vez pela mesma credencial. |
| `G-POS` | Gerente | Pós-graduação aceita na área: **5 pontos**. | Opcional/pontuável. Ausência não elimina. |
| `G-ENERGIA` | Gerente | **2 pontos por projeto distinto de energia**, com atuação gerencial comprovada; teto **8**. | Pontuável. |
| `E-SEC` | Especialista | Security+ vigente e aceita: **6 pontos**. | Obrigatória. |
| `E-PROJETOS` | Especialista | **2 pontos por projeto relevante distinto** com prova aceita; teto **8**. | Pontuável. |
| `EQ-PAPEIS` | Equipe | Duas pessoas distintas, uma por função. | Obrigatória. |
| `EQ-AGENDA` | Equipe | Disponibilidade e capacidade confirmadas pelo PMO em todo o período. | Obrigatória. |
| `EQ-DOCS` | Equipe | Provas identificadas, vigentes quando aplicável, aceitas para a regra e exportáveis quando exigidas na entrega. | Obrigatória. |

O máximo teórico dessas parcelas é **37**, mas o melhor resultado do universo principal, após o Recovery, é **35**. Mostrar **“35 pontos da equipe-chave”**. Não usar “35/35”, “100%”, “nota máxima da proposta” ou “vitória garantida”.

### 4.3 Perfis centrais

| ID / pessoa | Gerente | Especialista | Agenda confirmada | Papel narrativo |
|---|---:|---:|---|---|
| `p-bruno` · Bruno Almeida | 21 | Não qualificado | **Indisponível**; capacidade restante 0 h/semana. | Um currículo forte pode não ser alocável. |
| `p-carla` · Carla Mendes | **17 → 19 → 21** | Não qualificada | 40 h/semana disponíveis. | Dois projetos ainda carecem de provas aceitas. |
| `p-diego` · Diego Santos | 18 | 14 | 32 h/semana disponíveis. | Atende às duas funções, mas ocupa apenas uma. |
| `p-eva` · Eva Lima | Não qualificada | 12 | 20 h/semana disponíveis. | Alternativa válida para Especialista. |

Composição dos valores iniciais:

- Bruno: PMP 10 + pós 5 + três projetos × 2 = **21**; indisponibilidade impede seleção confirmada.
- Carla: PMP 10 + pós 5 + um projeto × 2 = **17**.
- Diego Gerente: PMP 10 + quatro projetos × 2 = **18**; sem pós pontuável.
- Diego Especialista: Security+ 6 + quatro projetos × 2 = **14**.
- Eva: Security+ 6 + três projetos × 2 = **12**.

No cadastro de Diego, usar participações identificadas por função: `DG-G01` a `DG-G04` para gerência e `DG-E01` a `DG-E04` para especialidade. São experiências históricas fictícias distintas. Não inferir duas funções só porque um texto diz que ele participou de um projeto.

### 4.4 Perfis de apoio

| ID / pessoa | Dado demonstrativo | Tratamento |
|---|---|---|
| `p-lia` · Lia Costa | Security+ ausente do currículo; há reembolso de exame a confirmar. | Campanha revela credencial; agenda ainda desconhecida e nenhuma experiência relevante aceita para o cenário principal. |
| `p-marina` · Marina Torres | Conhecimento de nuvem não registrado; será indicada por Eva. | Confirma e apresenta certificação de nuvem; atualização útil para oportunidades futuras, sem regra pontuável em ENE-001. |
| `p-rafael` · Rafael Nunes | Arquivo de certificação com divergência de titular. | Documento rejeitado, motivo visível, sem pontos. |
| `p-pedro` · Pedro Rocha | PMP com validade encerrada em 30/09/2026. | Documento pode ter sido verificado, mas está vencido na data exigida. |
| `p-ana` · Ana Ribeiro | Análise de dados e projetos de saúde. | Perfil íntegro, sem os requisitos das funções desta disputa. |
| `p-tiago` · Tiago Martins | Experiência em segurança declarada sem certificado exigido. | Qualificação pendente, sem ocupar função confirmada. |

Esses dez registros são toda a amostra inicial. Os “mais de mil profissionais” do case podem aparecer somente em uma nota de contexto, nunca como quantidade processada pelo protótipo. Não usar resultados da antiga análise de 228 currículos como dados desta fixture.

### 4.5 Comparações fechadas

| Equipe | Inicial | Após primeiro atestado de Carla | Após ambos | Condição |
|---|---:|---:|---:|---|
| Diego Gerente + Eva Especialista | 30 | 30 | 30 | Válida. |
| Carla Gerente + Diego Especialista | **31** | **33** | **35** | Melhor composição do universo principal demonstrado. |
| Carla Gerente + Eva Especialista | 29 | 31 | 33 | Válida. |
| Bruno Gerente + Diego Especialista | 35 aritméticos | 35 aritméticos | 35 aritméticos | **Bloqueada** por indisponibilidade de Bruno. |
| Diego nas duas funções | 32 aritméticos | 32 aritméticos | 32 aritméticos | **Bloqueada** por acumulação de papéis. |

Valores bloqueados aparecem apenas em explicação de impedimento, fora do ranking de alternativas válidas. A seleção inicial de 30 é chamada **“Escolha isolada por função”**, não “resultado histórico real da Nexora”.

### 4.6 Provas e projetos de Carla

| ID | Projeto | Estado inicial | Efeito possível |
|---|---|---|---|
| `CAR-G01` / `ev-carla-serra` | Serra Norte — integração de operações de energia | Participação gerencial e prova já aceitas. | 2 pontos já incluídos nos 17. |
| `CAR-G02` / `ev-carla-aurora` | Aurora — modernização de operações de energia | Participação conhecida; atestado ainda não recebido/aceito. | +2 após verificação, aceite e recálculo. |
| `CAR-G03` / `ev-carla-vale` | Vale do Sol — governança de operações de energia | Participação conhecida; atestado ainda não recebido/aceito. | +2 após verificação, aceite e recálculo. |

Todos são projetos diferentes. A lista mostra três participações conhecidas e apenas uma comprovada inicialmente. Não transformar conhecimento prévio do projeto em pontuação.

Documentos centrais adicionais: `ev-carla-pmp`, `ev-carla-pos`, `ev-diego-sec`, `ev-diego-pmp`; e provas dos projetos aceitos de Bruno, Diego e Eva. Todos os certificados centrais têm titular coerente e validade suficiente até o fim do período requerido; usar vencimento em **31/12/2027** nos exemplos centrais. Pós-graduação e atestados mostram “Sem prazo de validade aplicável à regra”.

O certificado vencido de Pedro e o documento rejeitado de Rafael são exemplos separados; não contam para a nota dos quatro perfis centrais.

---

## 5. Telas e interações: especificação por superfície

### T01 — Hoje / Central Nexora

**Pergunta respondida:** o que precisa acontecer agora para esta equipe ser apresentada com provas?

Conteúdo inicial: marca Aptus/Nexora; disputa ENE-001; prazo fictício; etapa atual; responsáveis; lista curta de próximas ações. Exibir contagens derivadas do estado: dez perfis da amostra, documentos em revisão, tarefas Recovery abertas e campanhas ativas. Não inventar gráficos de crescimento.

Antes da aprovação dos critérios, o espaço da nota mostra **“Aguardando critérios aprovados”**. Após cálculo, mostra nota da equipe e potencial condicionado. Ação principal: **“Continuar análise da disputa”**. Cada tarefa abre diretamente a tela ou o inspetor correspondente.

Um evento de exemplo, **“Nova versão de currículo de Carla”**, leva à Base Viva. Um alerta separado mostra o certificado de Pedro vencido. Esses elementos precisam abrir conteúdo, não funcionar como cartões sem ação.

### T02 — Base Viva e perfil

Diretório com nome, área, última revisão, pendências e disponibilidade. Busca por nome e competência; filtros “Com pendências”, “Documento vencido” e “Agenda a confirmar”. Lista vazia de um filtro mostra explicação e botão “Limpar filtros”.

O perfil de Carla tem abas **Resumo, Experiências, Documentos e Agenda**. Mostrar PMP, pós-graduação, três participações e seus vínculos documentais. A nova versão do currículo contém os dois projetos já conhecidos em outras fontes; confirmar a atualização muda a revisão do perfil, mas não adiciona provas aceitas ou pontos.

Fluxo demonstrado: **“Revisar atualização” → comparar campos → confirmar titular/identidade → aprovar atualização como RH**. Consequência: currículo v2, origem e revisão registradas, contador da fila reduzido; nenhum profissional duplicado. A confirmação do titular é uma resposta simulada separada da verificação do RH.

O documento abre no inspetor com os quatro eixos de estado da seção 6. Perfil não deve exibir “100% confiável”. Campos ausentes aparecem “Não informado” ou “A confirmar”.

### T03 — Oportunidade e resumo da disputa

Lista de oportunidades com a única disputa principal. Ao abrir: título, contratante fictício, prazo, funções, período, versão e abas **Resumo / Critérios / Equipe / Recovery / Dossiê**.

Uma faixa de etapas informa: **Critérios → Composição → Provas → Aprovação**. Ela representa progresso; não é um assistente que bloqueia toda a navegação. Visitar Dossiê cedo deve mostrar pendências reais.

Mostrar a origem documental “Edital demonstrativo ENE-001-v1” e a última conferência de peças como **“Conferência de exemplo”**. Não afirmar consulta a portal oficial.

### T04 — Critérios e origem documental

Layout de duas regiões: matriz de regras e documento de exemplo. Cada regra mostra ID, função, tipo, regra em português, pontos/teto, página/cláusula e estado de revisão. Ao selecionar `G-ENERGIA`, o leitor abre a página 4 e destaca a cláusula correspondente.

A matriz é uma extração simulada pré-definida. Botão **“Carregar edital demonstrativo”** abre uma folha com os arquivos do cenário e a ação “Usar este exemplo”. O processamento visual dura no máximo 800 ms e termina em regras sugeridas; não exibir tokens, modelo, confiança arbitrária ou benchmark.

Há uma pendência didática de revisão: confirmar que “projeto distinto” conta projeto, não quantidade de arquivos. Licitações confirma esse entendimento e revisa as demais regras. **“Aprovar matriz”** fica indisponível com pendência crítica, e o motivo é visível. Após aprovação, a versão é fixada e a próxima ação é **“Conferir provas iniciais”**. A primeira comparação só publica resultados depois dos aceites dessa revisão.

Antes da primeira comparação, abrir **“Conferir provas iniciais”**: a lista das credenciais e projetos centrais mostra documento, regra e titular. A ação separada **“Aceitar provas revisadas para esta matriz”** confirma somente essa lista explicitamente conferida. O botão Comparar pode abrir essa revisão quando ela ainda estiver pendente; não publica resultado até concluí-la. Aurora e Vale do Sol não estão nessa lista, pois ainda carecem de atestados.

Não usar um editor de DSL, campos JSON ou uma janela de código no fluxo do usuário. Um painel “Detalhes da regra” pode expor ID e versão, suficientes para explicar a origem.

### T05 — Equipe e comparação

Exibir dois espaços de função com candidatos selecionados. A primeira alternativa demonstrada é Diego/Eva, 30 pontos. O comando **“Comparar composições”** revela Carla/Diego, 31 pontos, com a explicação **“Diego contribui mais na função de Especialista para esta composição”**.

Cada nota abre a memória por critério. Ao selecionar Carla, seus 17 pontos devem se decompor em 10 + 5 + 2. Abrir “Por que Bruno não entrou?” mostra sua agenda; tentar Diego nas duas funções mostra bloqueio e mantém a seleção anterior válida.

Texto do resultado: **“Composição sugerida no cenário demonstrativo”** e **“Universo analisado: amostra desta demonstração”**. Não exibir “OR-Tools executado”, precisão ou selo de ótimo de produção. A comparação local pode enumerar os poucos pares da fixture.

Mostrar duas ou três alternativas válidas e uma seção recolhível de impedimentos. Critérios e datas precisam ser os mesmos em toda comparação. Reconhecimento pessoal não aparece como coluna de ranking técnico.

### T06 — Disponibilidade e decisão do PMO

Painel acessível a partir de qualquer pessoa/equipe. Mostrar faixa do período exigido, capacidade disponível, carga proposta, confirmação, validade e responsável.

Bruno: compromisso existente cobre o período, capacidade restante 0. Carla: 40 disponíveis, 32 exigidas. Diego: 32 disponíveis, 20 exigidas como Especialista. Eva: 20 disponíveis, 20 exigidas. Não é necessário desenhar todos os dias: uma faixa de período e resumo semanal bastam.

Separar **agenda individual já conferida** de **aprovação desta composição pelo PMO**. O botão “Confirmar esta equipe” registra a decisão para Carla/Diego e a versão atual. Uma alteração relevante posterior exige nova conferência. Não chamar reserva de proposta de contratação ou alocação definitiva em um contrato ganho.

### T07 — Recovery e duas provas de Carla

Cabeçalho com **31 confirmados**, **até 35 condicionados** e duas tarefas nomeadas. Após uma recuperação, **33 confirmados** e **+2 ainda condicionados**. Após ambas, **35 confirmados** e nenhuma lacuna dessas duas tarefas.

Cada tarefa possui projeto, critério, prova requerida, pessoa, responsável, prazo, fonte possível, estado e impacto condicionado. Usar uma lista com etapas e inspetor de tarefa; não exigir arrastar cartões.

Percurso por tarefa:

1. Juliana atribui a tarefa a Carla: “Solicitar atestado” registra uma solicitação local; nenhum e-mail sai.
2. Na visão Colaborador, “Apresentar documento de exemplo” associa o atestado correto. Nota permanece 31 ou 33.
3. Na visão RH, Beatriz confere identidade, participação e documento. Nota permanece igual.
4. Na visão Licitações, Juliana lê a regra e escolhe **“Aceitar prova para este critério”**. A aplicação mostra **“Prova aceita · recálculo necessário”**.
5. “Recalcular equipe” atualiza memória e comparação: primeiro 33, depois 35.

O mesmo fluxo pode ser repetido em ambas as tarefas. Na gravação, a segunda pode começar em um checkpoint com documento já recebido e verificado, desde que a cena indique essa etapa; não fingir que os documentos surgiram sem responsável.

Rejeitar a segunda prova mantém a primeira. Reenviar outro PDF do mesmo projeto não conta como projeto adicional. A nota exibida nunca é atualizada por um botão genérico “Aplicar +4”.

### T08 — Inspetor de evidência / trilha do ponto

Topo: título do documento, pessoa e projeto. Depois os quatro estados independentes; trecho relevante; vínculo com o critério; versão; autor e data da conferência; possibilidade de exportar.

Ao abrir a parcela “+2 · Aurora”, o inspetor deve responder, sem trocar de tela: **qual exigência**, **quem cumpriu**, **em qual projeto**, **qual documento** e **quem aceitou o uso**.

O leitor usa texto HTML acessível, paginação e destaques, mesmo que visualmente pareça um PDF. Não rasterizar todo o conteúdo. “Abrir fonte” navega ao trecho de um documento sintético local, nunca a um link quebrado.

### T09 — Dossiê da equipe-chave

Prévia com identidade Nexora; equipe Carla/Diego; nota; escopo; versão; currículos direcionados; memória de cálculo; índice de evidências e checklist.

Checklist: matriz aprovada; composição atual; aprovação PMO; provas usadas aceitas; documentos obrigatórios presentes; permissão para exportar; revisão final dos textos por Licitações. Os itens refletem o estado; não são todos verdes por decoração.

**“Preparar dossiê”** compõe textos fixos a partir de fatos aceitos. Um currículo de Carla só menciona os projetos recuperados como comprovados depois de sua aceitação. **“Aprovar dossiê da equipe”** cria um snapshot imutável da versão revisada. Alterações posteriores não reescrevem esse snapshot.

Botão principal final: **“Baixar resumo do dossiê (.pdf)”**. Gerar localmente um PDF real, curto, de aproximadamente quatro páginas, com o mesmo conteúdo demonstrativo aprovado: (1) equipe/escopo; (2) memória de cálculo; (3) currículos direcionados; (4) índice de provas e aprovações. É uma amostra do dossiê, não um pacote oficial de licitação. Não alegar que anexou todos os originais quando exportou apenas o índice.

Nome: `APTUS_Nexora_ENE-001_Dossie_Demonstrativo_v1.pdf`. Todas as páginas têm “Demonstração · dados fictícios”. Após iniciar o download, registrar **“Resumo do dossiê exportado”**. Não registrar envio ou recebimento externo. Reexportar a mesma versão preserva o conteúdo.

### T10 — Descoberta

Campanha: **“Ampliar a base de especialistas com Security+”**. Não dizer que ninguém na empresa possui a certificação: Diego e Eva já a têm.

Na visão colaborador, Lia vê o convite e um indício de reembolso de exame. “Confirmar certificação” registra sua declaração; “Apresentar comprovante” adiciona `ev-lia-sec`; RH verifica. A descrição do evento esclarece que pagamento do exame não comprova aprovação.

Resultado: competência antes não registrada passa a ter prova verificada; perfil e campanha atualizados; contribuição de +10 pontos de reconhecimento uma única vez. Agenda de Lia continua “A confirmar”. Seu certificado novo não altera automaticamente o dossiê fechado de ENE-001.

### T11 — Connect

Percurso principal: Eva indica **Marina Torres** para a competência de nuvem. Indicação aguarda aceite; Marina confirma, fornece documento e RH verifica. Eva não aprova a própria indicação. Resultado: perfil de Marina atualizado, indicação validada, reconhecimento de Eva +3 e de Marina +10 pela nova credencial, em registros separados.

Nenhuma dessas ações pontua na disputa ENE-001, cujas regras não incluem essa credencial. Mensagem: **“Perfil atualizado para novas oportunidades”**.

Variante externa navegável: criar um convite local de exemplo; abrir a visão do convidado **Lucas Azevedo**; ele aceita participar da demonstração e fornece dados fictícios. Antes do aceite, não há um cadastro profissional de Lucas no diretório. Depois, ele aparece como **“Externo · vínculo e agenda pendentes”**. Aceite não equivale a contratação. Reconhecimento da indicação externa só existe após qualificação verificada; caso essa verificação não seja percorrida, não gerar pontos.

Usar “Copiar convite de demonstração”, com alternativa de selecionar/copiar o texto se Clipboard API estiver indisponível. O convite aponta para uma cena local; não envia mensagem real. A variante externa fica fora do vídeo principal e isolada do estado base para não mudar suas contagens.

### T12 — Minha participação e manutenção contínua

Exibir o participante selecionado, contribuições validadas, reconhecimento do mês e próximas atualizações. Não usar ranking nominal público ou remuneração.

Política didática: certificação comprovada +10; experiência antes ausente com prova aceita +5; indicação interna confirmada +3; externa aceita com qualificação verificada +8; correção relevante comprovada +3; teto 30 no mês. Não atribuir pontos só por abrir tela, enviar arquivo ou responder campanha. As duas experiências de Carla já eram conhecidas, portanto o Recovery não deve gerar automaticamente +5 por “nova experiência”.

O título da métrica é **“Pontos de reconhecimento”**. A nota técnica usa **“Pontos da equipe-chave”**. Mostrar a frase **“Reconhecimento não altera a pontuação em editais”**.

Incluir um lembrete de revisão de perfil e um exemplo de alerta de vencimento. Os intervalos de revisão em 90 dias e alertas de 90/30 dias são políticas demonstrativas configuradas, não exigências legais. Não implementar um sistema de agendamento; os alertas são calculados a partir da data fixa e dos registros.

---

## 6. Estados e transições que o mock deve executar

### 6.1 Quatro perguntas independentes sobre uma evidência

| Eixo | Valores da interface | Exemplo importante |
|---|---|---|
| Informação | Detectada / Declarada / Confirmada pelo titular / Contestada | Lia confirma a certificação; isso não prova a aprovação no exame. |
| Documento | Ausente / Recebido / Em verificação / Verificado / Rejeitado | RH verificou um atestado; seu uso no edital ainda pode estar pendente. |
| Vigência | Válida na data / Vencida na data / Não se aplica / Desconhecida | Documento de Pedro verificado, mas certificado vencido. |
| Uso neste edital | Em análise / Aceito / Não aceito | Aceitação é para uma regra e versão específicas. |

Os códigos de implementação podem ser em inglês; o texto para o usuário será em português. Não utilizar um único `approved: true` para responder às quatro perguntas.

### 6.2 Pontuação e atualidade

Estados da avaliação: **Não calculada**, **Atual**, **Recálculo necessário** e **Sem equipe confirmada**. Guardar separadamente o último resultado e a revisão das entradas que o produziu.

- Antes dos critérios e dos aceites iniciais: nenhuma nota publicada.
- Após aprovação/revisão inicial e avaliação: Carla/Diego = 31.
- Receber Aurora: continua 31.
- RH verificar Aurora: continua 31.
- Licitações aceitar Aurora: marcar cálculo desatualizado. Mostrar **“Último cálculo: 31 · Recalcular”**, não “31 confirmados atuais”.
- Recalcular: 33 atuais; restam até +2 condicionados a Vale do Sol.
- Repetir para Vale do Sol: último 33 desatualizado, depois 35 atuais.

Quando houver recálculo pendente, recolher o cartão de potencial e informar que a comparação será atualizada. Não misturar potencial de uma versão com nota de outra. Um resultado anterior permanece na trilha histórica.

### 6.3 Tabela de comandos

| Comando | Pré-condição | Consequência local |
|---|---|---|
| Confirmar atualização do currículo | Titular identificado, dados de exemplo revisados | Atualiza a versão do perfil sem criar outra pessoa nem prova. |
| Aprovar matriz | Licitações, nenhuma cláusula crítica sem revisão | Fixa versão das regras; ainda requer conferir as correspondências documentais iniciais. |
| Aceitar provas iniciais | Matriz aprovada, documentos centrais verificados, Licitações revisou lista | Registra aceites específicos para `RULES-ENE-001-v1`; habilita a avaliação. |
| Comparar/recalcular equipes | Regras aprovadas; conjunto de entradas consistente | Reavalia os pares da fixture e publica memória atual. |
| Confirmar composição | PMO; resultado atual; agenda suficiente | Registra aprovação do uso de Carla/Diego no período e versão atuais. |
| Solicitar atestado | Tarefa aberta, responsável definido | Abre tarefa e registra pedido demonstrativo. |
| Apresentar documento | Tarefa existente, documento de exemplo compatível | `Recebido`; pontos não mudam. |
| Verificar documento | RH; arquivo recebido; titular/projeto/participação coerentes | `Verificado`; uso no edital ainda em análise. |
| Aceitar prova no critério | Licitações; verificação válida; vigência e pertinência conferidas | Registra aceite e invalida o cálculo anterior. |
| Rejeitar prova | Revisor competente; motivo informado | Registra motivo, não concede pontos, preserva outras provas válidas. |
| Preparar dossiê | Existe equipe válida atual | Gera prévia; itens ainda ausentes ficam apontados no checklist. |
| Aprovar dossiê | Licitações; checklist obrigatório completo; resultado atual | Congela conteúdo, provas, nota, versões e aprovadores. |
| Exportar resumo | Snapshot aprovado, atual para suas dependências e exportável | Cria PDF local a partir do snapshot; registra exportação. |
| Responder campanha | Colaborador escolhido na visão demonstrativa | Registra declaração; só a prova verificada torna a competência comprovada. |
| Validar contribuição | RH, evento elegível ainda não recompensado | Pontos de reconhecimento uma única vez; não altera nota técnica. |
| Aceitar indicação | Próprio indicado na visão demonstrativa | Habilita apresentação dos dados e verificação. |
| Validar indicação | RH independente do indicador | Atualiza indicação e reconhecimento, sem selecionar equipe. |

Toda ação indevida explica o motivo e não muda silenciosamente o estado. Duplo clique em comando já aplicado é idempotente. Durante uma ação, desabilitar sua repetição até a conclusão.

### 6.4 Fonte de verdade e rastreabilidade simplificadas

Utilizar um único estado de aplicação com seletores derivados. Não guardar `score=35` independentemente das provas; não copiar dados divergentes em cada página.

Estrutura mínima conceitual:

```ts
type EvidenceState = 'missing' | 'received' | 'reviewing' | 'verified' | 'rejected';
type RuleDecision = 'unknown' | 'accepted' | 'rejected';
type EvaluationStatus = 'not_calculated' | 'current' | 'stale' | 'no_confirmed_team';

type Acceptance = {
  evidenceId: string;
  personId: string;
  roleId: 'manager' | 'specialist';
  ruleId: string;
  ruleVersion: string;
  decision: RuleDecision;
  reviewerId: string;
  decidedAt: string;
  reason: string;
};

type ScoreComponent = {
  ruleId: string;
  personId: string;
  roleId: 'manager' | 'specialist';
  points: number;
  unitIds: string[];       // Projetos/credenciais, não nomes de arquivos.
  evidenceIds: string[];
};

type TeamResult = {
  inputRevision: number;
  ruleVersion: string;
  status: EvaluationStatus;
  managerId: string | null;
  specialistId: string | null;
  score: number | null;
  components: ScoreComponent[];
  blockers: string[];
  mode: 'simulated';
};
```

Não é necessário copiar contratos Java ou reconstruir o modelo de dados de produção. Esses tipos apenas fixam os vínculos que a interface precisa preservar. Completar os tipos simples de pessoa, tarefa, campanha e indicação a partir das tabelas deste arquivo.

Cada ação relevante acrescenta um evento com ID sequencial estável, autor fictício, ação, objeto, horário da demonstração e versão. O painel de atividade mostra essa trilha; não é preciso um log de infraestrutura.

### 6.5 Dependências, versões e fechamento

O conjunto inicial de comparação tem versão `UNIVERSE-ENE-001-v1`. O cálculo registra as provas, regras, perfis e disponibilidade que utilizou. Uma prova usada que seja rejeitada, uma mudança de agenda ou retificação deixa a decisão dependente em revisão.

O dossiê aprovado guarda uma cópia do conteúdo e dos IDs/versões usados. Não é uma visualização ao vivo da base. Se uma dependência usada mudar, o snapshot antigo fica no histórico e sua exportação atual é bloqueada até nova revisão.

Descoberta e Connect ocorrem depois do fechamento, como **atualização para próximas oportunidades**, ou em uma cena isolada. Lia não possui agenda confirmada e Marina não satisfaz regras adicionais de ENE-001; ambas não substituem ninguém no percurso principal. O dossiê fechado continua identificado com o universo e horário da aprovação. Não apresentá-lo como uma nova avaliação de toda a base depois de cada contribuição.

Uma pendência opcional de Recovery não torna a equipe automaticamente inválida. É possível aprovar um dossiê de 33 pontos se a segunda prova não for aceita, desde que os requisitos obrigatórios da equipe escolhida estejam atendidos e o conteúdo reflita apenas os 33 pontos.

### 6.6 Comportamentos de exceção

As variantes devem ser acionáveis pelo painel de demonstração, sem aparecer aleatoriamente no vídeo:

| Variante | Base do checkpoint | Resultado esperado |
|---|---|---|
| Segundo atestado rejeitado | Primeiro já aceito e recalculado | 33 pontos; motivo da rejeição; primeira prova permanece válida. Sem novo potencial confirmado para o documento recusado. |
| Arquivo duplicado | Primeiro já aceito | Outro arquivo de Aurora não cria projeto novo nem eleva os 33. |
| Certificado vencido | Perfil de Pedro | Documento verificado; vigência vencida; não satisfaz PMP obrigatório. |
| Agenda de Diego desconhecida | Antes do Recovery | Carla/Diego deixa de ser equipe confirmada; alternativa Carla/Eva = **29**. |
| Retificação recebida | Após fechamento em 35 | Nova versão `v2` em revisão; resultado v1 histórico; nova aprovação/exportação bloqueadas até revisão. Não calcular uma nova nota inventada. |
| Exportação não permitida | Documento usado em 35 perde permissão para o destinatário | Consulta interna continua permitida; exportação bloqueada; explicar a dependência. |

O ramo de retificação pode terminar na necessidade de revisão, com **“Restaurar cenário principal”**. Não implementar uma linguagem geral para qualquer edital. Essa limitação precisa estar clara no painel de demonstração.

---

## 7. Conteúdo documental pronto para implementar

### 7.1 Como representar documentos

Todos os documentos são locais, sintéticos e acessíveis por texto. O visual do leitor pode ter páginas, zoom simples, cabeçalho e indicação “página 4 de 4”. Para o fluxo principal, um modelo HTML com paginação determinística é suficiente. Não é necessário OCR nem biblioteca de renderização de PDFs.

O catálogo é a fonte única do texto exibido, dos destaques e das referências do dossiê. Os documentos restantes devem ser gerados a partir dos mesmos registros, sem contradizer nomes, datas, funções ou quantidades. Não usar lorem ipsum ou telas de arquivo vazio.

### 7.2 Edital demonstrativo ENE-001-v1

**Nome exibido:** `Edital_ENE-001_v1_DEMONSTRATIVO.pdf`.

**Página 1 — objeto e identificação**

> DEMONSTRAÇÃO ACADÊMICA — DOCUMENTO FICTÍCIO. Consórcio Horizonte Energia. Oportunidade ENE-001: Modernização de operações de energia. Este documento exemplifica a seleção da equipe-chave de uma proposta técnica. A entrega documental do cenário encerra-se em 27 de outubro de 2026, às 18h, horário de Brasília. Não se trata de edital real.

**Página 2 — equipe e período**

> A equipe conterá um Gerente de projeto e um Especialista em segurança, exercidos por pessoas distintas. O período considerado é de 2 de novembro de 2026 a 29 de janeiro de 2027. Exigem-se, respectivamente, 32 e 20 horas semanais disponíveis durante todo o período. A disponibilidade e o vínculo compatível devem ser confirmados para a indicação.

**Página 3 — apresentação de provas**

> As informações de currículo devem estar associadas a documentos que identifiquem o titular, a experiência ou credencial e as datas pertinentes. Atestados precisam relacionar o profissional ao projeto e à função exercida. Arquivos diferentes sobre o mesmo projeto não constituem novas experiências pontuáveis. A documentação usada na parcela da equipe deverá poder integrar o dossiê demonstrativo. Não há envio a contratante real.

**Página 4 — critérios**

> 7.1.1. O Gerente deve apresentar PMP vigente. A credencial aceita atribui dez pontos, uma única vez. 7.2.1. A atuação gerencial comprovada em projetos distintos do setor de energia atribui dois pontos por projeto, limitada a oito pontos. 7.2.2. Pós-graduação aceita na área atribui cinco pontos; sua ausência não elimina o candidato. 7.3.1. O Especialista deve apresentar Security+ vigente, que atribui seis pontos. 7.3.2. Projetos relevantes distintos, com participação aceita para a função de Especialista, atribuem dois pontos por projeto, limitada a oito pontos. 7.4. A mesma pessoa não poderá ocupar simultaneamente as duas funções. A nota aqui descrita refere-se exclusivamente à equipe-chave.

Mapear: `G-PMP`→p4/7.1.1; `G-ENERGIA`→p4/7.2.1; `G-POS`→p4/7.2.2; `E-SEC`→p4/7.3.1; `E-PROJETOS`→p4/7.3.2; `EQ-PAPEIS`→p4/7.4; `EQ-AGENDA`→p2; `EQ-DOCS`→p3. O destaque deve corresponder exatamente ao texto visível.

### 7.3 Atestado Aurora

**ID:** `ev-carla-aurora`. **Arquivo:** `Atestado_Carla_Aurora_DEMO.pdf`. **Projeto:** `CAR-G02`. **Emissão:** 26/10/2026.

> ATESTADO DEMONSTRATIVO — SEM VALIDADE DOCUMENTAL. A empresa fictícia Aurora Energia declara, exclusivamente para esta simulação, que Carla Mendes atuou como gerente do projeto Aurora — Modernização de Operações de Energia, entre 01/03/2023 e 15/12/2023. A participação compreendeu o planejamento, a coordenação da execução e o acompanhamento das entregas no setor de energia. Identificação do projeto: CAR-G02. Emissão fictícia em 26/10/2026. Responsável de exemplo: Renata Alves, coordenação de projetos. Este texto e seus nomes são dados sintéticos do protótipo APTUS.

Trecho destacado: **“Carla Mendes atuou como gerente do projeto Aurora”** e o setor. Não adicionar assinatura digital, QR code de verificação real, CNPJ real ou selo de órgão público.

### 7.4 Atestado Vale do Sol

**ID:** `ev-carla-vale`. **Arquivo:** `Atestado_Carla_ValeDoSol_DEMO.pdf`. **Projeto:** `CAR-G03`. **Emissão:** 26/10/2026.

> ATESTADO DEMONSTRATIVO — SEM VALIDADE DOCUMENTAL. A empresa fictícia Vale do Sol Energia declara, exclusivamente para esta simulação, que Carla Mendes exerceu a função de gerente no projeto Vale do Sol — Governança de Operações de Energia, de 15/01/2024 a 28/06/2024. O trabalho envolveu a organização das frentes de implantação, a coordenação de responsáveis e o acompanhamento dos resultados operacionais do projeto. Identificação do projeto: CAR-G03. Emissão fictícia em 26/10/2026. Responsável de exemplo: Paulo Vieira, gestão de operações. Documento sintético do protótipo APTUS.

### 7.5 Credencial descoberta de Lia

**ID:** `ev-lia-sec`. **Arquivo:** `Credencial_SecurityPlus_Lia_DEMO.pdf`. **Titular:** Lia Costa. **Emissão fictícia:** 01/08/2026. **Validade fictícia:** 01/08/2029. **Identificador:** `DEMO-SEC-LIA-001`.

> EXEMPLO DE REGISTRO DE CREDENCIAL — DADOS FICTÍCIOS. Titular: Lia Costa. Credencial representada: Security+. Identificador demonstrativo DEMO-SEC-LIA-001. Emissão em 01/08/2026 e validade até 01/08/2029. Este registro existe apenas para exemplificar apresentação e conferência de uma credencial; não foi emitido por certificadora e não representa uma certificação real.

Não copiar o certificado ou a assinatura de uma certificadora real. A interface pode mencionar o nome da qualificação do case, com o documento claramente demonstrativo.

### 7.6 Credencial de Marina e documentos de apoio

`ev-marina-cloud`: registro fictício “Arquitetura de soluções em nuvem”, emitido por **Instituto Horizonte de Tecnologia — fictício**, em 15/08/2026, válido até 15/08/2029. Titular Marina Torres; identificador `DEMO-CLOUD-MARINA-001`. Deve conter o mesmo aviso de demonstração. Não confundir essa qualificação com PMP ou Security+.

Para as demais provas iniciais, usar templates sintéticos com: ID; titular; tipo; projeto/função quando aplicável; data de emissão anterior ao corte; vigência definida ou não aplicável; verificador RH; decisão específica da regra. Preencher nomes de projetos distintos e manter os IDs fechados das tabelas. O perfil de Bruno contém três unidades de projeto; Diego quatro por função; Eva três. As provas que sustentam cada parcela devem ser consultáveis, mesmo que usem um template visual comum.

### 7.7 Textos de interface que não devem ser substituídos por slogans

| Situação | Texto |
|---|---|
| Resultado principal | “31 pontos da equipe-chave”. |
| Recovery inicial | “Até 35 pontos, condicionados à aceitação de dois atestados”. |
| Documento recebido | “Documento recebido. A pontuação ainda não mudou.” |
| RH concluiu | “Documento verificado. Uso neste edital em análise.” |
| Aceite concluído | “Prova aceita para este critério. Recalcule a equipe.” |
| Primeiro recálculo | “33 pontos. O projeto Aurora acrescentou 2 pontos à composição.” |
| Segundo recálculo | “35 pontos. Os dois projetos recuperados têm provas aceitas.” |
| Diego duplicado | “Diego já ocupa outra função. Este edital exige pessoas distintas.” |
| Bruno | “Indisponível no período de execução exigido.” |
| Arquivo duplicado | “Este projeto já foi considerado. Outro arquivo não acrescenta pontos.” |
| Falta de prova | “Informação pendente de comprovação.” |
| Exportação concluída | “Resumo do dossiê exportado. Nenhum envio foi realizado.” |
| Limite de conhecimento | “Resultado referente à amostra e às versões desta demonstração.” |

---

## 8. Modo demonstração e captura automatizada

### 8.1 Dois usos da mesma aplicação

**Explorar:** navegação livre, filtros, documentos, exceções e inspeção de estados. **Gravar:** interface ampliada, cenas estáveis e controles de produção recolhidos. O modo gravar não substitui a aplicação por uma animação ou vídeo pré-renderizado.

Botão “Demonstração” abre um painel com: cena, restaurar cena, reiniciar tudo, modo gravação, movimento normal/reduzido, notas do apresentador e variantes de exceção. Não permitir edição direta da nota.

O selo de dados fictícios continua visível quando esse painel é fechado. Não oferecer uma opção para ocultá-lo.

### 8.2 Checkpoints obrigatórios

Cada checkpoint restaura **o estado completo**, incluindo dados, revisões, aceites, trilha, ator, seleção, documentos e posição da interface. Não é apenas uma rota com um número diferente. Preferir construir checkpoints reaplicando uma sequência determinística de comandos ao seed, em vez de manter várias cópias independentes dos dados.

| ID da cena | Estado restaurado | Superfície / visão |
|---|---|---|
| `overview` | Estado inicial; critérios em revisão; sem resultado atual | Hoje / Licitações. |
| `base-viva` | Currículo v2 de Carla aguardando titular e RH | Base Viva / Colaborador Carla. |
| `criteria-review` | Perfil revisado; matriz proposta; documentos centrais verificados, ainda sem aceites desta matriz | Critérios / Licitações. |
| `team-comparison` | Matriz e provas iniciais aceitas; alternativas 30/31/29 calculadas | Equipe / Licitações. |
| `availability` | Resultado 31; agenda individual conferida; composição ainda pede aprovação PMO | Equipe / PMO. |
| `recovery-start` | Equipe 31 conferida; dois atestados pendentes | Recovery / Licitações. |
| `recovery-received` | Aurora recebido, sem verificação; 31 atuais | Documento Aurora / RH. |
| `recovery-verified` | Aurora verificado; aceitação no edital pendente; 31 atuais | Documento Aurora / Licitações. |
| `recovery-one` | Aurora aceito e cálculo 33; Vale do Sol pendente | Recovery / Licitações. |
| `recovery-complete` | Ambos aceitos; cálculo 35 atual; confirmar composição atual se necessário | Recovery / PMO. |
| `dossier-review` | 35 atuais, PMO confirmado, prévia preparada; revisão final pendente | Dossiê / Licitações. |
| `dossier-approved` | Snapshot aprovado em 35, PDF ainda não baixado nesta sessão | Dossiê / Licitações. |
| `discovery` | Dossiê fechado; campanha aberta; Lia ainda não confirmou indício | Descoberta / Colaborador Lia. |
| `connect` | Campanha de Lia concluída; indicação de Marina aguardando aceite | Connect / Colaborador Marina. |
| `recognition` | Lia e Marina verificadas; indicação interna validada | Minha participação / Eva. |

Os seis cenários de exceção da seção 6.6 também têm IDs estáveis: `second-rejected`, `duplicate-proof`, `expired-credential`, `availability-unknown`, `tender-amended`, `export-blocked`. A variante externa usa `connect-external` e não altera o percurso principal quando restaurado.

Carregar `dossier-approved` não deve disparar um download sem clique. O botão continua funcionando. O registro de exportação só é criado quando a ação de exportar ocorre naquela sessão.

### 8.3 Controle por URL e API local de gravação

Aceitar entradas como `/?scene=team-comparison&capture=1`. O carregamento inicial lê a cena e escolhe sua rota. Para navegação interna, um roteador por hash é suficiente e evita exigir configuração de servidor. Navegar entre abas não reaplica automaticamente o checkpoint da URL.

Expor apenas nesta aplicação demonstrativa:

```ts
window.aptusDemo = {
  loadScene: (sceneId: string) => Promise<void>,
  reset: () => Promise<void>,
  setCaptureMode: (enabled: boolean) => void,
  setMotion: (mode: 'normal' | 'reduced') => void,
  waitUntilIdle: () => Promise<void>,
  getSceneState: () => ({
    sceneId: string,
    busy: boolean,
    evaluationStatus: string,
    currentScore: number | null,
    lastScore: number | null,
    potentialScore: number | null,
    ruleVersion: string,
    dossierStatus: string
  })
};
```

Esse bloco descreve a interface; ao implementar TypeScript, definir tipos e funções válidos. `currentScore` será `null` quando não houver avaliação atual. `lastScore` preserva o histórico, inclusive durante recálculo. A API não pode editar diretamente pontos nem contornar as pré-condições dos comandos de negócio. `loadScene` é o único atalho para restaurar snapshots completos.

Após estabilizar os dados, fontes, documentos e layout, aplicar `data-demo-ready="true"`. Durante ações, usar `data-demo-busy="true"`; ao terminar a atualização visual e as transições, mudar para `false`. `waitUntilIdle()` deve esperar todas as tarefas da cena e a renderização estável, com timeout definido, sem polling infinito.

Reset cancela timers e operações pendentes, remove somente a persistência do Aptus e restaura `overview`. Um contador de geração da cena impede que callbacks de uma cena antiga alterem a nova. Não usar `localStorage.clear()` para apagar dados de outras aplicações.

### 8.4 Seletores mínimos para gravação

Priorizar nomes acessíveis dos controles. Acrescentar os seguintes `data-testid` para estabilidade:

| Elemento | Identificador |
|---|---|
| Navegação principal | `nav-home`, `nav-people`, `nav-opportunities`, `nav-discovery`, `nav-connect`, `nav-recognition` |
| Identificação da demo | `demo-badge`, `demo-controller`, `demo-role-switcher` |
| Matriz | `criteria-approve`, `criteria-initial-evidence-approve`, `criterion-G-ENERGIA` |
| Comparação | `team-compare`, `team-score-current`, `team-score-last`, `team-score-potential` |
| Agenda | `availability-p-bruno`, `team-confirm-pmo` |
| Recovery | `recovery-CAR-G02`, `recovery-CAR-G03`, `team-recalculate` |
| Ações por prova | `evidence-receive-ev-carla-aurora`, `evidence-verify-ev-carla-aurora`, `evidence-accept-ev-carla-aurora`; repetir padrão para Vale do Sol |
| Dossiê | `dossier-prepare`, `dossier-approve`, `dossier-export`, `dossier-checklist` |
| Campanha | `campaign-security`, `campaign-respond`, `evidence-verify-ev-lia-sec` |
| Connect | `referral-marina`, `referral-accept`, `referral-validate` |
| Reconhecimento | `recognition-points`, `recognition-history` |

Não reutilizar o mesmo ID para vários elementos simultâneos. A captura deve localizar controles pelo nome/ID, nunca apenas pela posição ou pela cor.

### 8.5 Movimento e estabilidade

- Hover/foco: 120–160 ms; abertura de painel: 180–240 ms; mudança de estado: até 300 ms.
- Processamentos simulados, quando úteis ao entendimento: duração fixa de 600–800 ms. Não exibir tempo como benchmark de uma IA real.
- Respeitar `prefers-reduced-motion`; no modo reduzido, transições instantâneas ou de até 80 ms, mantendo o mesmo estado final.
- Sem brilho pulsante infinito, partículas, carrosséis automáticos, contagem animada atravessando números falsos ou cursor falso dentro do produto.
- Destacar por até um segundo a parcela que mudou; o novo número e sua explicação permanecem disponíveis depois.
- Mensagens importantes persistem na tela ou na atividade, mesmo se houver toast. Não depender de ler um aviso de dois segundos.
- Não mudar a ordem das linhas automaticamente durante a interação. Reordenar somente ao finalizar uma ação explícita.

### 8.6 Gravação do vídeo

O vídeo deve registrar a **interface implementada**, com navegação, cliques e resultados reais do protótipo. As tomadas podem ser capturadas manualmente ou com automação de navegador.

A entrega da aplicação e do roteiro é independente da gravação. Um script de captura pode usar os nomes acessíveis e os seletores acima; a gravação concluída deve ser conferida separadamente.

Não há necessidade de gerar voz, música ou um vídeo final nesta implementação. O produto deve entregar as cenas que permitirão produzi-lo.

---

## 9. Banco de tomadas visuais para o pitch

A sequência abaixo organiza **três minutos de tomadas da aplicação**. Ela é um banco de cenas para edição. O pitch completo tem meta de **4min50s**, incluindo cerca de **65 segundos para explicar o pipeline técnico**; selecionar e encurtar as tomadas para caber nesse roteiro, preservando a ordem causal. Os três minutos desta tabela não devem ser somados ao pitch completo. O vídeo final não precisa mostrar todos os cliques em tempo real; pode combinar tomadas que deixem claro quando uma etapa foi concluída.

Distribuição de referência do vídeo completo: problema, 30s; contribuição técnica, 25s; pipeline, 65s; composição e Recovery, 55s; viabilidade e impacto, 35s; confiabilidade, segurança e jurídico, 40s; adesão e implantação, 20s; cooperação e fechamento, 20s. O roteiro precisa ser ensaiado: esses tempos são metas, não uma medição de gravação concluída. Exibir o diagrama da arquitetura junto da explicação, e preservar o selo de dados fictícios nas cenas do mock.

| Tempo | Cena e ação | Evidência visual | Fala sugerida |
|---|---|---|---|
| 0:00–0:10 | `overview`: abrir a disputa Nexora | Marca, oportunidade, prazo e pendências | “O Aptus reúne pessoas, critérios e comprovações para preparar a equipe de cada disputa.” |
| 0:10–0:25 | `base-viva`: revisar currículo de Carla e confirmar atualização | Perfil único, origem, experiências e provas separadas | “A base incorpora atualizações, mas uma informação declarada ainda precisa de prova.” |
| 0:25–0:45 | `criteria-review`: abrir `G-ENERGIA`, conferir fonte, aprovar matriz e correspondências iniciais | Cláusula destacada e regra aprovada | “Cada critério fica ligado ao edital e passa pela revisão de Licitações.” |
| 0:45–1:10 | `team-comparison` e `availability`: comparar 30/31; abrir Bruno e confirmar equipe | Carla/Diego, 31; impedimento de Bruno; Diego em um papel | “Escolher os melhores nomes isoladamente dá 30. Considerar a equipe inteira chega a 31, respeitando agenda e funções.” |
| 1:10–1:55 | `recovery-start` até `recovery-complete`: receber/verificar/aceitar Aurora, recalcular; repetir aceite e cálculo de Vale do Sol | 31 → 33 → 35; prova associada a cada +2 | “Há dois projetos de Carla sem atestado aceito. O potencial só vira ponto quando a documentação é conferida e aceita para este edital.” |
| 1:55–2:15 | `dossier-review`: abrir trilha de um ponto, aprovar e baixar resumo | Memória, prova, checklist, versão e exportação | “O dossiê da equipe preserva a origem de cada ponto e o conteúdo aprovado.” |
| 2:15–2:35 | `discovery`: resposta de Lia e verificação de documento | Reembolso como indício; certificado fornecido; agenda pendente | “Campanhas revelam competências ausentes dos currículos, com confirmação e comprovação.” |
| 2:35–2:50 | `connect`: Marina aceita indicação e RH valida | Indicação, aceite e perfil atualizado | “As indicações ampliam o conhecimento da empresa, sem garantir uma vaga ou alterar a nota técnica.” |
| 2:50–3:00 | `recognition`: reconhecimento e retorno ao painel | +3 de Eva e resultado de 35 identificado como snapshot do caso | “O reconhecimento incentiva a atualização. A seleção continua apoiada nas exigências e nas provas.” |

Para a tomada do Recovery, preservar pelo menos: **31 antes**, **documento verificado sem mudança de nota**, **aceite**, **recálculo para 33**, **segunda prova distinta**, **recálculo para 35**. O caminho completo deve existir mesmo quando a montagem do vídeo comprimir as etapas.

### 9.1 Plano de tomadas

Cada tomada começa com `loadScene(id)`, espera `waitUntilIdle()`, fecha o painel de demonstração e usa a ação visível. Manter 1–2 segundos de interface estável antes e depois da ação para facilitar a edição.

| Tomada | Controle/seleção | Verificação antes de encerrar |
|---|---|---|
| Regra com origem | `criterion-G-ENERGIA` | Texto destacado corresponde à regra; não é um trecho aleatório. |
| Equipe recomendada | `team-compare` | Nota atual 31 e alternativa 30; pessoas distintas. |
| Indisponibilidade | `availability-p-bruno` | Período e 0 h restantes legíveis. |
| Prova recebida | `evidence-receive-ev-carla-aurora` | Documento recebido; nota ainda 31. |
| Prova verificada | `evidence-verify-ev-carla-aurora` | RH concluiu; uso no edital ainda pendente. |
| Primeiro aceite | `evidence-accept-ev-carla-aurora` | Estado desatualizado; “Último cálculo: 31”. |
| Primeiro recálculo | `team-recalculate` | Atual 33; potencial adicional +2. |
| Segundo recálculo | Aceite de Vale do Sol e `team-recalculate` | Atual 35; duas provas distintas aceitas. |
| Dossiê | `dossier-approve`, depois `dossier-export` | Arquivo local gerado; status de exportação, sem envio. |
| Base continua viva | `campaign-respond`, verificação RH e `referral-validate` | Perfis atualizados, reconhecimento distinto de nota técnica. |

Entregar `ROTEIRO_GRAVACAO.md` com essas tomadas adaptadas aos controles realmente implementados. Se entregar um script automatizado, o roteiro textual continua necessário para operação manual.

---

## 10. Implementação do frontend: o mínimo necessário para sustentar a experiência

### 10.1 Organização recomendada

Se estiver trabalhando no repositório `hackatohm`, manter o protótipo isolado em `prototype/aptus-demo/`. Se estiver em um projeto novo, usar essa estrutura na raiz. Se houver um frontend aproveitável, adaptar os caminhos a ele e registrar o mapeamento no README, preservando os contratos abaixo.

| Arquivo/grupo | Responsabilidade |
|---|---|
| `src/app/App.tsx`, `src/app/routes.tsx` | Shell, roteamento e visões. |
| `src/styles/tokens.css`, `src/styles/global.css` | Identidade Nexora/Aptus, tipografia, espaçamento, estados e responsividade. |
| `src/demo/types.ts` | Tipos simples compartilhados da demonstração. |
| `src/demo/seed.ts` | Dez pessoas, oportunidade, regras, provas, atores, agenda e datas fixas. |
| `src/demo/documents.ts` | Conteúdo das páginas e trechos dos documentos sintéticos. |
| `src/demo/reducer.ts` | Comandos, pré-condições, transições, auditoria e idempotência. |
| `src/demo/selectors.ts` | Contagens, filtros, checklists, métricas de UI e estados derivados. |
| `src/demo/evaluate.ts` | Aritmética didática, pares de funções, bloqueios e potencial condicionado. |
| `src/demo/scenes.ts` | Checkpoints construídos a partir do seed e comandos. |
| `src/demo/controller.ts` | Carregamento/reset de cenas, cancelamento de timers e API `aptusDemo`. |
| `src/demo/context.tsx` | Estado compartilhado, comandos da interface e persistência opcional. |
| `src/components/` | Componentes reutilizados da seção 3.4. |
| `src/features/people/` | Diretório, perfil e revisão de atualizações. |
| `src/features/tender/` | Resumo, critérios, comparação e agenda. |
| `src/features/recovery/` | Tarefas, evidências e recálculo. |
| `src/features/dossier/` | Prévia, checklist, snapshot e exportação. |
| `src/features/discovery/` | Campanha Security+ e resposta de Lia. |
| `src/features/connect/` | Indicação de Marina e variante externa. |
| `src/features/recognition/` | Reconhecimento e manutenção do perfil. |
| `src/export/dossierPdf.ts` | PDF local gerado do snapshot aprovado. |
| `public/brand/` | Símbolo Aptus e wordmark Nexora em SVG. |
| `tests/demo.test.ts` | Comportamentos determinísticos essenciais. |
| `tests/main-flow.spec.ts` | Percurso principal e gravação automatizável, se houver ambiente de navegador. |
| `README.md`, `ROTEIRO_GRAVACAO.md` | Execução, limites, cenas e instruções de captura. |

Não criar um arquivo por cada pequena linha visual; também não concentrar a aplicação inteira em um componente enorme. Usar os componentes existentes quando adequados.

### 10.2 Interfaces entre partes

Fixar estes nomes ou manter um mapeamento explícito se o projeto já possuir convenções:

```ts
createInitialState(): DemoState
applyDemoCommand(state: DemoState, envelope: CommandEnvelope): DemoState
evaluateDemoTeams(state: DemoState): EvaluationSnapshot
calculateConditionalPotential(state: DemoState): PotentialResult
getDossierChecklist(state: DemoState): ChecklistItem[]
createDossierSnapshot(state: DemoState): DossierSnapshot
buildDossierPdf(snapshot: DossierSnapshot): Promise<Blob>
createScene(sceneId: SceneId): DemoState
```

- `DemoState` agrega `demo`, `actors`, `people`, `claims`, `evidence`, `acceptances`, `tender`, `availability`, `recoveryTasks`, `evaluation`, `dossier`, `campaigns`, `referrals`, `engagement` e `audit`.
- `CommandEnvelope` contém `commandId`, `actorId` e `command`; o horário vem do relógio da demonstração. O reducer valida a visão e o objeto envolvidos.
- `EvaluationSnapshot` contém revisão das entradas, regras, equipes válidas, bloqueios e memória de cálculo da equipe selecionada. Seu resultado atual usa `TeamResult` da seção 6.4.
- `PotentialResult` contém `currentScore`, `potentialScore`, `remainingGain`, `assumptions` e `status`. Com resultado desatualizado, os três valores atuais são `null` e o status informa revisão necessária.
- `ChecklistItem` contém `id`, `label`, `required`, `status` e `reason`. Itens opcionais não bloqueiam aprovação por si só.
- `DossierSnapshot` contém ID/versão, escopo `KEY_TEAM`, cópias dos textos e componentes de nota, IDs/versões das provas, equipe, janela, aprovadores, horário e modo `simulated`.
- `SceneId` é a união dos IDs das seções 8.2 e 6.6.

Implementar esses tipos com dados simples. Eles não precisam reproduzir a arquitetura de domínio de produção.

### 10.3 Comandos de estado a implementar

| Nome de comando | Parâmetros específicos |
|---|---|
| `CONFIRM_PROFILE_UPDATE` | `personId` |
| `VERIFY_PROFILE_UPDATE` | `personId` |
| `REVIEW_RULE` | `ruleId`, `decision` |
| `APPROVE_RULES` | `ruleVersion` |
| `ACCEPT_INITIAL_EVIDENCE` | `ruleVersion`, `evidenceIds` explicitamente revisados |
| `EVALUATE_TEAMS` | Sem parâmetro de pontuação. |
| `SELECT_TEAM` | `managerId`, `specialistId`; só pares válidos. |
| `CONFIRM_TEAM_PMO` | Chave da composição e revisão da disponibilidade. |
| `REQUEST_PROOF` | `taskId` |
| `RECEIVE_EVIDENCE` | `evidenceId`, `documentFixtureId` |
| `VERIFY_EVIDENCE` | `evidenceId`, `result`, `reason` |
| `ACCEPT_EVIDENCE_FOR_RULE` | `evidenceId`, `ruleId`, `ruleVersion` |
| `REJECT_EVIDENCE_FOR_RULE` | `evidenceId`, `ruleId`, `reason` |
| `PREPARE_DOSSIER` | Sem texto inventado pelo usuário. |
| `APPROVE_DOSSIER` | Versão da prévia revisada. |
| `RECORD_DOSSIER_EXPORT` | `snapshotId`, `filename` |
| `RESPOND_TO_CAMPAIGN` | `campaignId`, `personId`, `documentFixtureId` |
| `ACCEPT_REFERRAL` | `referralId`, `personId` |
| `VALIDATE_REFERRAL` | `referralId` |
| `ACCEPT_EXTERNAL_INVITE` | ID do convite e dados fictícios pré-definidos. |
| `VALIDATE_CONTRIBUTION` | `eventKey`, `personId`, `kind` |

`VERIFY_EVIDENCE` verifica o arquivo, não o uso em edital. A verificação positiva de Lia e Marina habilita a contribuição correspondente; sua contabilização pode ocorrer automaticamente no mesmo comando com `eventKey` estável, ou por uma ação explícita do RH. Escolher **uma** forma e usá-la consistentemente. Para este plano, preferir contabilização automática após a validação elegível, sem um clique extra que não acrescenta entendimento.

O PMO confirma pessoa/função/período/capacidade. A confirmação do cenário é registrada em 26/10/2026 e válida até 27/10/2026 às 18h; o uso pela composição é aprovado durante a demonstração. A aprovação pode ser reutilizada após receber uma prova se esse conjunto permanecer idêntico e dentro da validade; mudança de pessoa, janela, capacidade ou condição exige nova confirmação. A revisão final do dossiê volta a verificar essas condições.

### 10.4 Avaliação local simples

Enumerar pares dos candidatos conhecidos, sem serviço externo. Para cada par: pessoas diferentes, credenciais obrigatórias aceitas, vigência e agenda; depois somar componentes aceitos com tetos. O código didático pode ser pequeno. Ele não precisa gerar uma DSL, rodar solver, fazer busca semântica ou explicar cláusulas não previstas.

O potencial considera exclusivamente `CAR-G02` e `CAR-G03` ainda recuperáveis, sem contar documento duplicado. Reaplicar as mesmas regras e a mesma agenda ao cenário condicionado. Assim, o ganho restante deriva das provas disponíveis, não de um número gravado no cartão.

Não contabilizar a nota de uma função cujo requisito obrigatório falhou. A pontuação parcial pode aparecer no detalhe como informação, mas aquela pessoa não entra em uma equipe confirmada. “Não informado” não equivale a “não possui”.

O conjunto de dados cabe em memória. Não exigir banco, worker, fila, transação distribuída ou API REST fictícia só para parecer uma arquitetura completa.

### 10.5 Documentos, uploads e exportação

“Adicionar documento” abre um seletor de **documentos de exemplo disponíveis para aquela tarefa**. O atestado correto precisa estar visível e selecionável. Não é obrigatório oferecer upload de arquivos do computador.

Se um seletor de arquivo real já existir, ele deve rejeitar formatos/conteúdos não suportados com uma mensagem: **“Esta demonstração usa os documentos de exemplo disponíveis abaixo.”** Não fingir que um arquivo arbitrário foi interpretado. Nenhum arquivo real deve ser enviado a servidor ou modelo.

Para exportação, usar jsPDF ou a biblioteca local equivalente já presente. O PDF deve ser produzido a partir do snapshot, com texto legível, margens e quebras de página verificadas. Evitar captura rasterizada da tela inteira. Acentos, nomes e símbolos precisam sair corretamente. Não exigir fonte externa para abrir a demonstração.

Se não for possível exportar PDF no ambiente, implementar uma saída HTML local identificada como HTML e relatar a limitação; não renomear HTML para `.pdf` nem declarar o requisito PDF concluído. O PDF real continua sendo o aceite desejado.

### 10.6 Persistência e funcionamento sem internet

Pode usar `localStorage` com chave própria e versão de schema, por exemplo `aptus-demo-v1`. Estado incompatível restaura o seed com aviso. Uma URL com `scene=` sempre restaura o checkpoint solicitado, independentemente de uma sessão anterior.

O build deve funcionar com servidor estático local e sem internet. Isso não exige funcionar ao abrir `index.html` por `file://`, nem requer service worker/PWA. Dependências devem estar empacotadas; documentos, ícones e marcas devem ser locais. Não fazer chamadas de dados externas na gravação.

### 10.7 Conteúdo que pode ficar à escolha do implementador

Pode decidir detalhes menores de componentes, nomes dos projetos de apoio, biblioteca de ícones, pequenas transições, formato interno do estado e organização de arquivos compatível com a base existente. Não pode alterar os seis fluxos, a causalidade, as notas fechadas, os quatro eixos documentais, a distinção Nexora/EloGroup, o alvo MacBook, a identificação de simulação ou os papéis humanos.

---

## 11. Acessibilidade, legibilidade e qualidade de uso

- Contraste mínimo de projeto: 4,5:1 em texto normal; 3:1 em texto grande e elementos de controle que necessitem contraste. Verificar cores em seus fundos reais, inclusive na transparência.
- Aumentar a página para 200% não pode impedir a operação; permitir rolagem e adaptação. Não diminuir o texto para preservar um layout de três colunas.
- Foco visível, ordem de tabulação previsível, mensagens anunciadas quando apropriado e diálogos sem aprisionamento indevido de teclado.
- Tabelas com cabeçalhos; seleção distinguível; ícones com rótulo quando forem ações; data e hora formatadas em pt-BR.
- A ação de voltar/fechar conserva contexto e posição. Não perder a seleção da tarefa de Recovery ao revisar um documento.
- Busca deve filtrar dados reais da fixture. Filtro sem resultado oferece limpeza. Nome longo não cobre botão. Ausência de informação aparece explicitamente.
- Não usar “clique aqui”, botão “IA” genérico ou ícones sem significado como ações primárias. Preferir verbos do trabalho: revisar, confirmar, aceitar, recalcular, comparar, baixar.
- Estados de carregamento são curtos e têm término determinístico; estados de erro são controláveis e acionáveis, sem tela travada.
- Chrome/Chromium deve ser verificado no ambiente disponível. Safari em macOS deve ser testado se houver acesso; se não houver, informar que não foi testado, sem alegar compatibilidade validada.

O objetivo visual é uma ferramenta sóbria e legível em gravação. Evitar gradientes, brilhos, animações ou grandes cartões que dificultem comparar documentos e números.

---

## 12. Prioridade e limite de escopo

### P0 — necessário para considerar entregue

1. Identidade Aptus/Nexora aplicada ao shell e ao dossiê.
2. Dez perfis sintéticos coerentes e documentos de exemplo legíveis.
3. Um percurso completo de cada um dos seis fluxos, com reconhecimento como apoio.
4. Matriz com origem, revisão e aprovação; comparação 30/31; restrições de agenda/função.
5. Recovery completo com estados e 31/33/35 derivados das provas.
6. Dossiê com checklist, snapshot e exportação local demonstrativa.
7. Campanha de Lia e indicação interna de Marina, incluindo aceite/verificação.
8. Checkpoints, reset, modo gravação, API de cenas e seletores estáveis.
9. Variantes principais de documento recusado/duplicado, vigência, agenda, retificação e exportação.
10. Roteiro e verificação funcional/visual nos tamanhos definidos.

### P1 — acabamento complementar, depois do percurso completo

Convite externo completo com qualificação, atalhos adicionais, pequenos refinamentos de movimento, roteiro de captura automatizado e tomadas extras. O convite externo mínimo navegável ainda deve demonstrar que aceite não cria vínculo; sua verificação e reconhecimento completos podem ser uma cena extra.

### P2 — fora desta entrega

Tema escuro completo, app de iPhone, instalação nativa, microsserviços, integrações reais, agentes de IA, banco de produção, editor de regras genérico, benchmark e pipeline de vídeo generativo. Não substituir partes P0 por esses trabalhos.

Se houver restrição de tempo, simplificar detalhes secundários e reutilizar inspetores/templates. Não cortar um fluxo inteiro, esconder controles sem implementação ou antecipar pontos para encurtar o Recovery. O progresso deve ser reportado por entregáveis concluídos; não prometer uma quantidade de horas sem conhecer o ambiente.

---

## 13. Plano de execução em tarefas verificáveis

### Tarefa 1 — Fundação, identidade e navegação

**Arquivos:** `src/app/*`, `src/styles/*`, `public/brand/*`, componentes de shell e configuração do frontend.

**Consome:** direção visual e rotas das seções 2–3. **Produz:** shell reutilizável e navegação para todas as áreas, sem páginas finais vazias na entrega.

- [ ] Inspecionar o frontend existente; registrar o que será reutilizado e os caminhos adotados.
- [ ] Se necessário, iniciar a estrutura React/TypeScript e fixar dependências em lockfile; configurar comandos de desenvolvimento/build.
- [ ] Implementar tokens, símbolo Aptus e wordmark Nexora locais; aplicar a identidade ao shell.
- [ ] Implementar sidebar, toolbar, selo demonstrativo, seletor de visão e estrutura de inspetores.
- [ ] Conferir 1440×900 e 1280×720: nenhuma ação essencial cortada, foco visível, sem falsa janela macOS.

**Aceite:** a navegação tem linguagem visual consistente e componentes prontos para receber os dados; a aparência não depende de recursos remotos.

### Tarefa 2 — Fixture, estados e cálculo didático

**Arquivos:** `src/demo/types.ts`, `seed.ts`, `documents.ts`, `reducer.ts`, `selectors.ts`, `evaluate.ts`, `context.tsx`; `tests/demo.test.ts`.

**Consome:** dados e invariantes das seções 4 e 6. **Produz:** funções da seção 10.2, comando por autor e seletores usados por todas as telas.

- [ ] Criar os dez perfis, atores, regras, agenda, evidências e textos documentais, todos com IDs estáveis.
- [ ] Implementar os quatro eixos documentais, histórico e revisão das entradas.
- [ ] Implementar os comandos iniciais de revisão/aprovação e a avaliação local.
- [ ] Verificar: resultado inicial após aceites =31; alternativa de 30; Bruno bloqueado; Diego não duplicado; pós-graduação ausente não elimina.
- [ ] Implementar Recovery e verificar: receber/verificar não pontua; aceite deixa cálculo desatualizado; recálculo produz 33 e 35.
- [ ] Verificar rejeição da segunda prova e deduplicação por projeto; notas ficam em 33.

**Aceite:** os valores derivam dos mesmos registros exibidos. Não há “score mágico” independente dos documentos.

### Tarefa 3 — Base Viva, edital e comparação visual

**Arquivos:** `src/features/people/*`, `src/features/tender/*`, `PersonInspector`, `MockDocumentViewer`, `ScoreBreakdown`, `TeamComparison`.

**Consome:** estado/seletores da Tarefa 2 e shell da Tarefa 1. **Produz:** T01–T06 completos e operáveis.

- [ ] Implementar diretório com busca/filtros, perfil e revisão de Carla v2 sem duplicar pessoa.
- [ ] Implementar documento paginado, cláusulas e destaques coerentes.
- [ ] Implementar revisão da matriz e aceites documentais iniciais como decisões distintas.
- [ ] Implementar comparação 30/31/29, decomposição por regra e impedimentos explicáveis.
- [ ] Implementar agenda e confirmação PMO para o período exigido.
- [ ] Conferir navegação por teclado, campo vazio/sem resultados e nomes longos.

**Aceite:** um usuário compreende por que Carla/Diego é a escolha do cenário e pode verificar as fontes da conclusão.

### Tarefa 4 — Recovery e trilha do ponto

**Arquivos:** `src/features/recovery/*`, `EvidenceInspector`, `RecoveryTaskPanel`, `AuditTimeline`.

**Consome:** estados/comandos de evidência e cálculo. **Produz:** T07–T08, principal sequência do vídeo.

- [ ] Implementar tarefas Aurora e Vale do Sol com pessoas, prazos e documentos próprios.
- [ ] Implementar solicitar, receber, verificar, aceitar/rejeitar e recalcular nas respectivas visões.
- [ ] Exibir separado o último cálculo desatualizado e a nota atual; corrigir potencial restante após cada recálculo.
- [ ] Ligar cada parcela da nota à regra, participação, documento e decisão correspondente.
- [ ] Verificar idempotência e preservação do primeiro atestado ao rejeitar o segundo.

**Aceite:** toda a sequência 31 → 33 → 35 funciona por ações visíveis, e o percurso inverso de rejeição não fabrica pontos.

### Tarefa 5 — Dossiê e exportação

**Arquivos:** `src/features/dossier/*`, `src/export/dossierPdf.ts`, `ReviewChecklist`.

**Consome:** resultado atual, evidências aceitas, confirmação PMO e versões. **Produz:** T09 e PDF local do snapshot.

- [ ] Implementar checklist derivado e prévia de currículo direcionado a fatos aceitos.
- [ ] Implementar aprovação de conteúdo exato, com escopo equipe-chave e versão.
- [ ] Implementar PDF local com conteúdo da prévia aprovada e avisos de demonstração.
- [ ] Verificar exportação bloqueada quando falta aprovação, há versão relevante alterada ou documento sem permissão.
- [ ] Abrir o PDF gerado e conferir nomes, acentos, nota, evidências, quebras e legibilidade.

**Aceite:** o arquivo baixado corresponde ao que foi aprovado; a interface registra exportação, sem alegar envio.

### Tarefa 6 — Descoberta, Connect e reconhecimento

**Arquivos:** `src/features/discovery/*`, `src/features/connect/*`, `src/features/recognition/*`; comandos complementares no reducer.

**Consome:** pessoas, documentos, atores e política de contribuição. **Produz:** T10–T12 e atualização da base para próximas oportunidades.

- [ ] Implementar campanha de Lia: indício, declaração, prova e revisão RH.
- [ ] Implementar indicação de Marina por Eva: aceite, prova, validação independente e atualização.
- [ ] Implementar reconhecimento idempotente: Lia+10, Marina+10, Eva+3; teto mensal e separação de pontuação técnica.
- [ ] Implementar caminho mínimo do convite externo até estado de vínculo/agenda pendentes.
- [ ] Verificar que o dossiê fechado e sua memória permanecem identificados pelo snapshot e não ganham pontos por engajamento.

**Aceite:** os três mecanismos de atualização são compreensíveis e operáveis, sem contratação ou pontuação automática indevida.

### Tarefa 7 — Cenas, reset e captura

**Arquivos:** `src/demo/scenes.ts`, `controller.ts`, `DemoController`; atributos de teste e captura nos componentes.

**Consome:** comandos e telas completas. **Produz:** checkpoints, controle por URL, API `aptusDemo`, modo gravação e variantes.

- [ ] Construir checkpoints por replay determinístico e associar rota, visão e painel inicial.
- [ ] Implementar reset, cancelamento de timers e proteção contra callback de uma cena anterior.
- [ ] Implementar modo gravação, movimento reduzido e sinais de prontidão/conclusão.
- [ ] Implementar os seletores estáveis e as seis variantes de exceção.
- [ ] Verificar abrir cada checkpoint direto em nova aba, retornar ao inicial e navegar sem reexecutar a cena indevidamente.
- [ ] Verificar que modo gravação conserva o selo e que `waitUntilIdle()` termina.

**Aceite:** é possível repetir uma tomada específica sem reconstruir manualmente todas as ações anteriores.

### Tarefa 8 — Conferência final e handoff

**Arquivos:** `tests/main-flow.spec.ts`, `README.md`, `ROTEIRO_GRAVACAO.md`, imagens locais de conferência.

**Consome:** aplicação completa. **Produz:** entrega demonstrável, com limites reais descritos.

- [ ] Executar um percurso completo desde reset, passando pelos seis fluxos e gerando o PDF.
- [ ] Verificar o percurso em viewport de gravação 1920 × 1080, MacBook 1440 × 900 e compacto 1280 × 720.
- [ ] Fazer uma rodada visual conjunta: sobreposição, texto cortado, contraste, ações, foco e leitura dos documentos. Corrigir os problemas encontrados em um lote e confirmar as correções.
- [ ] Executar testes focados da seção 14 e build de produção; registrar exatamente o que rodou.
- [ ] Entregar screenshots das telas principais reais, pelo menos: critérios, comparação, Recovery com 35 e dossiê.
- [ ] Documentar comandos, cena inicial, API de gravação, reset, dados sintéticos e recursos não implementados/testados.
- [ ] Entregar código/projeto executável e roteiro; não substituir o produto por um relato de que foi planejado.

**Aceite:** outra pessoa consegue iniciar, operar, restaurar e gravar o protótipo sem depender de explicações fora dos arquivos entregues.

---

## 14. Verificação focada

### 14.1 Testes automatizados úteis

Não criar uma suíte extensa que apenas reproduza os componentes. Priorizar os comportamentos que sustentam o vídeo:

| Teste | Asserções essenciais |
|---|---|
| `initial_team_is_31` | Matriz e aceites iniciais aprovados; Carla/Diego com 31; alternativa Diego/Eva de 30; Bruno excluído por agenda; nenhum par repete pessoa. |
| `receive_and_verify_do_not_score` | Aurora recebido e depois RH verificado; resultado continua31 e uso no edital permanece pendente. |
| `accept_requires_recalculation` | Aceite marca `stale`, `currentScore=null`, `lastScore=31`; recálculo produz 33; segunda prova produz 35. |
| `reject_or_duplicate_does_not_add_points` | Segunda rejeitada mantém 33; repetir arquivo/projeto Aurora mantém 33; repetir comando não duplica eventos de efeito. |
| `availability_changes_team` | No checkpoint inicial sem agenda de Diego, Carla/Eva com 29 é a alternativa confirmada; Diego não fica “livre” por ausência de dados. |
| `dossier_export_is_version_bound` | Sem checklist/aceite não exporta; snapshot aprovado gera arquivo; alteração de dependência bloqueia nova exportação; snapshot histórico permanece intacto. |
| `recognition_does_not_change_technical_score` | Lia+10, Marina+10 e Eva+3 uma vez por evento; não altera os 35 do dossiê do caso; sem ranking técnico por reconhecimento. |
| `scene_reset_cancels_pending_work` | Trocar cena durante ação descarta callback antigo; reset retorna estado inicial sem timers, aceites ou recompensas residuais. |

Comando esperado em projeto novo: `npm run test`. Configurar o script para a ferramenta adotada. Build: `npm run build`. Para um teste de navegador disponível, `npm run test:e2e` deve percorrer: matriz →30/31 → prova recebida/verificada → 33 → 35 → aprovação → download.

Se um ambiente não suportar executar testes de navegador, entregar o roteiro manual e declarar a limitação. Não afirmar que Safari, teclado ou downloads foram testados sem execução.

### 14.2 Checklist manual de aceite

- [ ] Aptus e Nexora estão identificados em todas as áreas principais.
- [ ] A marca é descrita como conceitual do case quando sua origem é explicada.
- [ ] Existe uma ação funcional em cada item visível do menu.
- [ ] Todos os seis fluxos têm pelo menos um percurso completo.
- [ ] Critérios apontam para o trecho certo do edital demonstrativo.
- [ ] Nota técnica e reconhecimento usam nomes e lugares diferentes.
- [ ] Documento recebido, verificado, vigente e aceito aparecem como estados distintos.
- [ ] A aprovação inicial das regras e das correspondências documentais é explícita.
- [ ] Nota 31, nota 33 e nota 35 correspondem aos documentos e à memória mostrados.
- [ ] Não há “35/35” ou claim de nota máxima/contrato ganho.
- [ ] Bruno permanece bloqueado, e Diego nunca ocupa as duas funções.
- [ ] Duplicidade de arquivo não vira nova experiência.
- [ ] Segunda prova recusada preserva a primeira.
- [ ] Dossiê não aprova com requisito obrigatório faltante nem por uma versão antiga.
- [ ] Dossiê pode refletir 33 quando essa é a equipe válida aprovada, sem exigir documento opcional para fingir 35.
- [ ] PDF abre e contém a mesma nota, nomes, versão e índices do snapshot aprovado.
- [ ] Descoberta não diz que a empresa desconhecia todas as pessoas com Security+.
- [ ] Aceite de convite externo não cria empregado nem disponibilidade confirmada.
- [ ] Busca, filtro vazio, rejeição e bloqueio têm retorno compreensível.
- [ ] Os controles são localizáveis por nome acessível/ID.
- [ ] Reset e restauração de cenas deixam tudo consistente.
- [ ] Nada essencial depende de acesso externo à internet durante a gravação.
- [ ] Em1920×1080,1440×900 e1280×720 não há texto/ação principal inacessível.
- [ ] Modo gravação e movimento reduzido conservam a identificação de simulação.
- [ ] O README contém as instruções necessárias para reproduzir o percurso.

---

## 15. Entregáveis

Ao concluir, fornecer:

1. **Projeto executável**, com dependências fixadas, scripts de desenvolvimento, build e preview, e sem necessidade de chave/API/conta externa.
2. **Aplicação navegável** com os estados e todas as áreas P0.
3. **README** com comando de instalação, execução, abertura da cena principal e informação precisa do que é simulado.
4. **ROTEIRO_GRAVACAO.md**, com as tomadas, ações, seletores e resultados esperados.
5. **PDF demonstrativo** gerado pela própria aplicação e conferido.
6. **Capturas reais da aplicação** para avaliar identidade, legibilidade e continuidade visual.
7. **Relatório curto de verificação**, com comandos executados, resultados e limitações observadas. Sem métricas fictícias de cobertura, desempenho ou segurança.

Critério final: **a interface deve mostrar o produto em ação, com consequências coerentes e cenas repetíveis, embora todos os serviços e dados corporativos sejam simulados**.

Todos os itens P0 devem estar implementados. Eventuais impedimentos devem ser registrados com o impacto, as partes concluídas e os passos necessários para reprodução.

## 16. Referências e decisões desta especificação

As fontes fundamentam o produto e a direção. Nenhum link externo é necessário para construir o protótipo: os requisitos de implementação estão neste arquivo.

1. **Case fornecido pela EloGroup — “Gestão inteligente de currículos”, Case B, Nexora.** Arquivo `case-hackathon.pdf`, especialmente páginas 13–19. Fonte do problema, caráter fictício da empresa, contexto de equipe-chave e referência visual. O uso das cores é uma adaptação proposta, não uma afirmação de manual oficial da Nexora.
2. **APTUS 3.1 — Blueprint canônico**, seções 3, 5, 7.1, 8, 9 e 13. Documento consultado em 27/10/2026; blob GitHub `57570a3e2371fcad26060430db084041083c496c`. [Documentação do projeto](https://github.com/santana-iago/hackatohm/blob/main/docs/aptus-3.1/APTUS_3_1_Blueprint.md). Referência das regras, dos seis fluxos e do exemplo numérico. O pipeline de produção está fora do escopo deste protótipo.
3. **Apple — Designing for macOS.** [Guia](https://developer.apple.com/design/human-interface-guidelines/designing-for-macos). Referência para uso de tela ampla, teclado/ponteiro e interação de produtividade.
4. **Apple — Sidebars e Toolbars.** [Sidebars](https://developer.apple.com/design/human-interface-guidelines/sidebars) · [Toolbars](https://developer.apple.com/design/human-interface-guidelines/toolbars). Referências de navegação e comandos contextuais.
5. **Apple — Materials.** [Guia](https://developer.apple.com/design/human-interface-guidelines/materials). Referência para uso contido de materiais na navegação e separação da camada de conteúdo. A implementação será uma aproximação web.
6. **Apple — Typography, Motion e Accessibility.** [Typography](https://developer.apple.com/design/human-interface-guidelines/typography) · [Motion](https://developer.apple.com/design/human-interface-guidelines/motion) · [Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility). Referências gerais de legibilidade, movimento e operação acessível. Dimensões e tempos deste plano são escolhas do protótipo.
7. **Vite — Getting Started.** [Documentação](https://vite.dev/guide/). Opção de ferramenta para frontend; não impõe migração de uma base compatível já existente.
8. **jsPDF — projeto oficial.** [Repositório](https://github.com/parallax/jsPDF). Opção de geração de PDF local, sem backend.

**Decisões de concepção assumidas neste plano:** identidade conceitual da Nexora baseada no case; web para macOS; tema claro; um cenário principal; dez perfis; documentos e atores fictícios; datas congeladas; captura em 1920 × 1080; três minutos de demonstração; frontend local; PDF resumido do dossiê; exceções acionadas manualmente. Essas escolhas delimitam o protótipo e preservam a arquitetura de produção do Aptus.


