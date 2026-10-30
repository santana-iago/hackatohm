# Verificação da entrega — 27/10/2026

Protótipo Aptus/Nexora em `prototype/aptus-demo/`. Dados exclusivamente sintéticos. Ambiente executado: Linux, Node 24.19.0 e Chrome/Chromium local. A documentação canônica e a análise Python do repositório não foram modificadas.

## Revisão visual

O shell foi refeito como uma área de trabalho contínua: navegação neutra de 216 px, toolbar compacta, abas segmentadas, tabelas e listas com separadores. O Recovery passou a uma lista de solicitações; perfis abrem em inspetor lateral e evidências em prévia documental. Mensagens persistem na barra de estado. O azul Nexora concentra ações e vínculos; documentos mantêm sua identidade institucional.

`DESIGN.md` e `UX-CONTRACT.md` registram a direção e os componentes canônicos. A revisão preservou os comandos, os seis fluxos, os checkpoints, a separação dos estados documentais e a geração de PDF. Foram acrescentadas verificações de setas/Home/End nas abas, retorno de foco e limites do conteúdo em 720 px. Um corte causado pela largura mínima implícita do grid foi reproduzido por teste, corrigido e reconferido.

## Comandos executados e resultados

| Comando                                                                | Resultado observado                                                                                                                                             |
| ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm install --no-audit --no-fund`                                     | Dependências instaladas, versões e lockfile fixados.                                                                                                            |
| `npm run lint`                                                         | Passou, sem erros.                                                                                                                                              |
| `npm run typecheck`                                                    | Passou.                                                                                                                                                         |
| `npm run test`                                                         | 12 testes passaram: 10 de domínio e 2 do controlador.                                                                                                           |
| `npm run build`                                                        | Passou; build local em `dist/`, incluindo biblioteca PDF carregada sob demanda.                                                                                 |
| `npm run test:e2e`                                                     | 12 testes passaram: 4 casos em cada viewport 1920×1080, 1440×900 e 1280×720.                                                                                    |
| `node scripts/capture.mjs`                                             | Capturas do build, inspeção de layout e das URLs de cenas; resultado em `artifacts/visual-check.json`.                                                          |
| `APTUS_DEMO_URL=http://localhost:4174 node scripts/redesign-check.mjs` | 27 conferências/capturas do build: nove superfícies em três tamanhos; sem overflow horizontal de página/conteúdo ou erros de execução.                          |
| `APTUS_DEMO_URL=http://localhost:4174 node scripts/growth-check.mjs`   | 20 conferências de tamanho/ampliação; controles alcançáveis, filtros e teclado funcionais. Relatório final copiado para `artifacts/redesign/growth-check.json`. |
| `APTUS_DEMO_URL=http://localhost:4174 node scripts/pdf-check.mjs`      | PDF baixado pela aplicação, reexportação binariamente idêntica, bloqueios de permissão e retificação ativos; zero erros de página.                              |
| `/usr/bin/pdfinfo`, `/usr/bin/pdftotext`, `/usr/bin/pdftoppm`          | PDF de quatro páginas A4, texto selecionável e acentos corretos; páginas renderizadas e inspecionadas.                                                          |
| `git diff --check`                                                     | Sem erros de espaços/conflito.                                                                                                                                  |

## Percurso efetivamente executado

Desde o seed, sem carregar checkpoints para pular etapas: confirmação do currículo de Carla pela titular → revisão RH → matriz e cláusula G-ENERGIA → revisão das oito regras → aprovação da matriz → conferência e aceite das provas iniciais → prévia da escolha isolada 30 → comparação Carla/Diego 31 → impedimento de Bruno e de Diego em duas funções → confirmação PMO → solicitação/apresentação/verificação/aceite de Aurora → cálculo desatualizado com último 31 → recálculo 33 → segunda prova distinta Vale do Sol com as mesmas etapas → último 33 → recálculo 35 → prévia/revisão/aprovação do dossiê → download real → campanha de Lia → credencial verificada → indicação/aceite/prova/verificação de Marina → validação de Eva → reconhecimento.

A nota permaneceu 31/33 durante recebimento e verificação. O aceite deixou currentScore nulo até o recálculo. Descoberta e Connect conservaram o snapshot técnico em 35 e sua exportação aprovada.

Também foram percorridos: segundo atestado rejeitado (33), arquivo duplicado (33), PMP vencido de Pedro, agenda desconhecida de Diego (Carla/Eva 29), retificação v2 sem nota nova, permissão de exportação revogada e convite externo até aceite de Lucas com vínculo/agenda pendentes. Reset durante comando e durante revisão em lote descartou operações antigas; restaurar a mesma cena repôs o inspetor.

## Conferência visual e teclado

Capturas finais reais em `artifacts/screenshots/`, com modo gravação e movimento reduzido. `artifacts/redesign/` acrescenta nove superfícies em 1440×900 e 1280×720 no modo normal, e em 1920×1080 no modo gravação. Nas três viewports principais, as superfícies conferidas não apresentaram overflow horizontal de página/conteúdo ou testids duplicados. `main` é o proprietário da rolagem vertical; a navegação e a barra de estado permanecem estáveis. Ações inferiores permanecem acessíveis por rolagem; tabelas extensas têm sua própria rolagem horizontal em janela estreita. O selo permanece visível, inclusive dentro de diálogos.

Base Viva, Descoberta, Connect e Minha participação também foram explorados em 768×900 e 375×812. Busca sem resultado, limpeza e filtros de vencimento/agenda funcionaram. Enter abriu um perfil, Tab navegou no diálogo, Escape o fechou e o foco retornou ao controle de origem.

A ampliação foi conferida por CSS zoom 200% e por viewport lógico 720×450 a escala 2, equivalente à área útil de 1440×900 a 200%. Ajustaram-se a toolbar e a posição do selo. **Zoom nativo do navegador não foi executado.**

Contrastes dos tokens atuais, calculados pela luminância WCAG: texto/branco 15,52:1; metadados/branco 5,83:1 e metadados/sidebar 4,89:1; ação primária/branco 12,08:1; sucesso/fundo de sucesso 6,43:1; atenção/fundo de atenção 5,99:1; erro/fundo de erro 5,77:1; contorno de campo/branco 3,41:1. Isso verifica esses pares, sem substituir uma auditoria completa de acessibilidade. Controles de ação têm área mínima de 40 px, ou 44 px em gravação.

O preview do build foi operado com requisições externas bloqueadas. A captura e a exportação usaram somente recursos locais. Eventos de runtime/log foram observados pelo Chrome DevTools Protocol no helper de captura, além dos pageerrors do Playwright; não foram registrados erros.

## PDF entregue

`artifacts/APTUS_Nexora_ENE-001_Dossie_Demonstrativo_v1.pdf` — gerado por clique na aplicação, snapshot em 35, Carla Mendes/Diego Santos, 10 provas no índice, regras/universo e aprovações. O índice não afirma anexar originais. Todas as páginas têm identificação de dados fictícios.

SHA-256: `3f583a94dce00df2a39234fcfb5d3f9dd96d21b12713315b63d19fdb254071bb`.

## Limites observados

- Safari/macOS não estavam disponíveis para teste. A aparência web inspirada em macOS não equivale a compatibilidade Safari validada.
- O vídeo final não foi gravado; estão entregues aplicação operável, cenas, capturas e roteiro de três minutos.
- Convite externo termina no aceite e dados fictícios, sem qualificação/reconhecimento externo. É a variante mínima prevista.
- A retificação termina na necessidade de nova revisão; não há editor genérico de edital.
- O renderer Poppler do runtime substituiu fontes incorretamente; a inspeção visual do PDF utilizou `/usr/bin/pdftoppm`, que preservou os glifos.
- Não há persistência entre recargas, integrações reais ou validação de produção. Os checkpoints restauram os dados completos de forma determinística.
