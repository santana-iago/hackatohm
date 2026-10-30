# Aptus para Nexora

Demonstração interativa do Aptus para o case Nexora, desafio D03 da EloGroup no HackatOhm 2026. O código deste frontend fica em `prototype/aptus-demo/`. A [apresentação do projeto](../../README.md) reúne o pitch e a documentação.

A identidade Nexora é uma proposta conceitual para a empresa fictícia do case. As cores adaptam o material do desafio. O símbolo Aptus e o wordmark Nexora são SVGs locais. A interface traduz padrões de produtividade para MacBook em uma aplicação web; não usa componentes nativos do macOS.

**Demonstração · dados fictícios.** Pessoas, documentos, contratante, agenda, decisões, prazos e pontos são sintéticos. Nenhuma ação envia mensagem, autentica usuário, executa IA, consulta RH ou publica proposta. A exportação baixa um resumo local; não envia uma licitação.

## Interface de trabalho

A apresentação segue a organização de aplicativos de produtividade do macOS: sidebar de 216 px em cinza neutro, toolbar compacta, listas com divisores e documentos em uma área de leitura. O azul Nexora identifica ações principais, links e foco. A nota e o potencial ficam em uma faixa de resumo; tarefas Recovery são linhas de solicitação, com detalhes adicionais expansíveis.

O elemento `main` concentra a rolagem vertical e conserva o shell acessível. Tabelas largas têm rolagem horizontal própria. Perfis abrem em um sheet de inspeção; evidências abrem em uma prévia de documento com seus quatro eixos de estado. As abas segmentadas da disputa e do perfil aceitam setas, Home e End; Escape fecha o inspetor e devolve o foco ao controle que o abriu.

[DESIGN.md](DESIGN.md) é a referência canônica da apresentação. [UX-CONTRACT.md](UX-CONTRACT.md) registra os componentes responsáveis por navegação, controles, overlays, rolagem e feedback. Mudanças visuais devem seguir esses arquivos e preservar os contratos de negócio e os seletores da demonstração.

## Executar

Use Node.js 22.12 ou superior e npm. Na pasta deste README:

```bash
npm ci
npm run dev
```

Abra o endereço informado pelo Vite, normalmente `http://localhost:5173`. Não é necessária conta, chave ou variável de ambiente. O modo de desenvolvimento pode escolher outra porta se 5173 estiver ocupada.

```bash
npm run build
npm run preview
```

O preview de produção usa normalmente `http://localhost:4173`. A saída estática está em `dist/`. Use um servidor HTTP estático; abrir `index.html` por `file://` não é suportado. O roteamento usa hash e não exige reescrita de rotas no servidor.

Depois da instalação e do build, scripts, marcas, ícones, documentos e exportação estão locais. A reprodução não exige internet. A tipografia usa as fontes do sistema. Não há Google Fonts, CDN ou dados externos.

## Percurso completo

O seletor **Visão** substitui permissões e login reais. Alterar a visão conserva os dados e muda o autor fictício das ações. Um comando incompatível com o papel apresenta o motivo. A navegação pode ser livre; visitar o Dossiê antes da hora mostra suas pendências.

1. **Base Viva:** abra a atualização de Carla. Como Colaborador Carla, confira os campos e confirme titularidade. Troque para RH e aprove a atualização. A pessoa continua única, com currículo v2; os projetos conhecidos continuam sem atestado aceito.
2. **Edital e equipe:** abra ENE-001, Critérios. Carregue o edital demonstrativo, selecione `G-ENERGIA` e confira a cláusula da página 4. Revise as regras, inclusive que contam projetos distintos, e aprove a matriz como Licitações. Confira e aceite separadamente a lista das provas iniciais. Compare as composições: Diego/Eva soma 30; Carla/Diego soma 31. Inspecione a agenda de Bruno e o impedimento de acumulação de Diego. Como PMO, confirme Carla/Diego no período.
3. **Recovery:** como Licitações, solicite o atestado Aurora. Como Carla, apresente o documento de exemplo. Como RH, confira e verifique. A nota continua 31. Como Licitações, aceite para `G-ENERGIA`: o último cálculo fica desatualizado. Recalcule para obter 33. Repita com Vale do Sol para chegar a 35. Cada parcela abre sua regra, pessoa, projeto, documento e aceite. Documento recebido ou verificado nunca acrescenta pontos por si só.
4. **Dossiê:** confirme PMO para a composição atual se necessário. Prepare a prévia, leia os textos e o checklist, confirme a revisão dos textos como Licitações e aprove o dossiê. Baixe o resumo PDF. O snapshot preserva a nota, os textos, as provas e as versões aprovadas.
5. **Descoberta:** Lia responde à campanha Security+, confirma a credencial e apresenta o comprovante. RH verifica. O reembolso do exame é um indício, não prova de aprovação. A credencial verificada gera +10 pontos de reconhecimento uma única vez. A agenda continua a confirmar.
6. **Connect:** Eva indica Marina para nuvem; Marina aceita e apresenta a credencial. RH valida de forma independente. Marina recebe +10 pela credencial e Eva +3 pela indicação. Em Minha participação, consulte o histórico. Reconhecimento não altera a pontuação em editais nem o snapshot fechado de 35.

O roteiro detalhado, as tomadas de três minutos e os seletores estão em [ROTEIRO_GRAVACAO.md](ROTEIRO_GRAVACAO.md).

## Cenas repetíveis

O botão **Demonstração** abre o controle de cenas, restauração, reset, modo gravação, movimento e variantes. O selo de dados fictícios permanece visível. Nenhum controle edita a nota diretamente.

Abra, por exemplo:

```text
http://localhost:5173/?scene=team-comparison&capture=1
http://localhost:5173/?scene=dossier-approved&capture=1
```

Uma URL com `scene=` sempre restaura o checkpoint solicitado. Navegar entre abas depois disso não reaplica a cena. Carregar uma cena substitui todo o estado, incluindo atores, decisões, revisão, seleção, trilha e documentos. `dossier-approved` não inicia download automaticamente.

| Cena                | Ponto de partida                                          |
| ------------------- | --------------------------------------------------------- |
| `overview`          | Hoje, critérios em revisão, sem resultado publicado       |
| `base-viva`         | Atualização de Carla aguardando titular e RH              |
| `criteria-review`   | Perfil revisado, matriz proposta, sem aceites iniciais    |
| `team-comparison`   | Matriz e provas iniciais aceitas; alternativas calculadas |
| `availability`      | 31 pontos; visão PMO, composição aguardando decisão       |
| `recovery-start`    | 31 pontos, PMO registrado, dois atestados pendentes       |
| `recovery-received` | Aurora recebido, nota 31, visão RH                        |
| `recovery-verified` | Aurora verificado, nota 31, visão Licitações              |
| `recovery-one`      | Aurora aceito e recalculado, 33 pontos                    |
| `recovery-complete` | Ambos aceitos, 35 pontos, visão PMO                       |
| `dossier-review`    | Prévia de 35 preparada, revisão final pendente            |
| `dossier-approved`  | Snapshot aprovado, nenhum download automático             |
| `discovery`         | Dossiê fechado, Lia ainda não confirmou a credencial      |
| `connect`           | Campanha de Lia concluída, Marina aguardando aceite       |
| `recognition`       | Lia e Marina verificadas, indicação validada              |

Variantes isoladas: `second-rejected` (33, Vale do Sol rejeitado), `duplicate-proof` (Aurora repetido sem pontos adicionais), `expired-credential` (Pedro), `availability-unknown` (Diego sem agenda, Carla/Eva com 29), `tender-amended` (v2 em revisão), `export-blocked` (prova usada sem permissão para exportar), `connect-external` (convite local de Lucas). Restaurar uma cena principal retoma a amostra original de dez pessoas. O ramo de retificação termina na necessidade de revisão; não há editor genérico de regras.

## API local de gravação

A API é exclusiva deste protótipo, acessível no console ou na automação do navegador:

```js
await window.aptusDemo.loadScene("recovery-verified");
await window.aptusDemo.waitUntilIdle();
window.aptusDemo.setCaptureMode(true);
window.aptusDemo.setMotion("reduced");
console.table(window.aptusDemo.getSceneState());
await window.aptusDemo.reset();
```

`getSceneState()` informa `sceneId`, `busy`, `evaluationStatus`, `currentScore`, `lastScore`, `potentialScore`, `ruleVersion` e `dossierStatus`. Em recálculo pendente, `currentScore` e o potencial são nulos, enquanto `lastScore` conserva o último resultado. A API restaura cenas completas; não oferece edição de pontos ou bypass de comandos.

O elemento `html` expõe `data-demo-ready="true"` quando a aplicação está montada, e `data-demo-busy="true"` durante operações. `waitUntilIdle()` aguarda tarefas e renderização estável com timeout. Reset e troca de cena cancelam operações da geração anterior. O reset atua somente sobre o estado do Aptus.

## Versões, pontos e documentos

- Uma única fonte de estado mantém pessoas, evidências, regras, aceites, agenda, tarefas, avaliação, dossiê e reconhecimento.
- Os quatro eixos documentais são independentes: informação, documento, vigência e uso no edital. RH verifica documentos; Licitações aceita para uma regra e versão.
- A avaliação enumera os poucos pares da fixture, exige pessoas distintas, credenciais obrigatórias aceitas e capacidade suficiente. Bruno tem 0 h disponíveis. Não se infere disponibilidade ausente.
- A trajetória é 30 na escolha isolada, 31 na composição Carla/Diego, 33 com Aurora e 35 com Vale do Sol. As provas aceitas são somadas por projeto distinto, com os tetos das regras. O máximo teórico das parcelas é 37; 35 não é nota máxima da proposta.
- A aceitação de prova relevante invalida o cálculo anterior. A interface mostra “Último cálculo” até o recálculo. Alterações de dependências bloqueiam exportação de aprovação obsoleta e preservam o snapshot histórico.
- Uma segunda prova opcional rejeitada permite fechar um dossiê válido de 33, se os demais requisitos estiverem atendidos.
- O PDF usa texto selecionável, quatro páginas e metadados estáveis. Reexportar a mesma versão preserva seu conteúdo. Nome: `APTUS_Nexora_ENE-001_Dossie_Demonstrativo_v1.pdf`. Os originais não são anexados; o PDF contém o índice demonstrativo.
- Descoberta e Connect atualizam a base para próximas oportunidades. Lia não tem agenda confirmada e a competência de Marina não pontua em ENE-001. O snapshot fechado conserva seu universo e horário.
- O relógio de negócio começa em 27/10/2026, às 10:00, America/Sao_Paulo. O prazo de 18:00 e a janela de 02/11/2026 a 29/01/2027 são fictícios.

## Verificar

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
```

A suíte E2E contém quatro casos, configurados para 1920×1080, 1440×900 e 1280×720: doze execuções ao todo. Os casos cobrem shell/abas por teclado/retorno de foco, o percurso contínuo com PDF, checkpoints/exceções/reset e restauração do estado visual durante tarefas pendentes. Essa descrição registra a estrutura da suíte; os resultados executados ficam no relatório de verificação. Ela usa Chrome local em `/usr/bin/google-chrome` quando disponível; nos demais ambientes usa Chromium instalado pelo Playwright. Para outro executável, configure `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. O teste E2E exige Chromium disponível para Playwright. Se necessário, instale o navegador com `npx playwright install chromium`. A primeira instalação das dependências ou do navegador requer acesso à internet; a aplicação produzida não requer esse acesso.

Verifique as tomadas em 1920×1080, 1440×900 e 1280×720, modo gravação e movimento reduzido. Use teclado, busca sem resultado, inspetor, documentos, rejeições e bloqueios. O relatório de execução e os artefatos de conferência acompanham a entrega; comandos aqui são instruções de reprodução e não substituem evidência de execução.

## Estrutura e limites

`src/demo/` concentra fixture, documentos, comandos, seletores, avaliação, cenas e controlador. `src/features/` contém as áreas navegáveis. `src/components/` reúne shell, inspetores e controles compartilhados. `src/export/dossierPdf.ts` produz o PDF a partir de um snapshot aprovado. `public/brand/` contém as marcas locais.

Não há backend, OCR de arquivos arbitrários, solver, RAG, integração corporativa, autenticação ou envio. Os “uploads” selecionam documentos sintéticos compatíveis. O convite externo abre uma cena local; aceite não cria vínculo empregatício nem agenda confirmada. As políticas de revisão em 90 dias, alertas e reconhecimento são didáticas. Não há benchmark, acurácia, economia ou contratação demonstrada.

As viewports são referências de projeto, não especificações de todos os MacBooks. Safari só pode ser considerado verificado se houver execução registrada em macOS; uma aparência inspirada no Mac não é evidência de teste em Safari. O [índice de vídeos](../../docs/video/README.md) reúne o pitch publicado e as fontes de gravação.

## Artefatos conferidos

- [Relatório de verificação](VERIFICACAO.md).
- [PDF gerado pela própria aplicação](artifacts/APTUS_Nexora_ENE-001_Dossie_Demonstrativo_v1.pdf).
- Capturas da revisão visual em `artifacts/redesign/`: 27 imagens, com Hoje, perfil, critérios, comparação, Recovery em 35, dossiê, Descoberta, Connect e reconhecimento nos três tamanhos de referência. Exemplos: [comparação em 1920 px](artifacts/redesign/comparacao-1920.png), [perfil em 1440 px](artifacts/redesign/perfil-1440.png) e [Recovery em 1280 px](artifacts/redesign/recovery-35-1280.png).
- Capturas tradicionais atualizadas em `artifacts/screenshots/`: critérios, comparação, Recovery em 35, dossiê, trilha de Aurora e ampliação equivalente a 200%.
- `node scripts/redesign-check.mjs`: geração das 27 capturas da revisão visual e dados de conferência em `artifacts/redesign/`.
- `node scripts/capture.mjs`: captura do build em preview na porta 4174 e verificação das 22 URLs de cenas.
- `APTUS_DEMO_URL=http://localhost:4174 node scripts/pdf-check.mjs`: download, reexportação idêntica e bloqueios do PDF. Os helpers de captura usam o Chrome local do ambiente de conferência.

O estado é mantido em memória nesta versão. Recarregar a página restaura a URL/cena solicitada ou o seed; não depende de sessão salva. A API e o painel permitem restaurar cada tomada.
