# Contratos de interface — Aptus demonstrativo

A revisão muda apresentação e organização das superfícies. Tipos, reducer, avaliador, fixtures, snapshot e PDF continuam sendo as fontes de negócio existentes. Os testes de domínio e percurso preservam as causas de 30/31/33/35 e a autorização por ator.

## Canonical UI Map

| Capability      | Canonical owner                                          | Source of truth                | Allowed variants                                               | Verification                     |
| --------------- | -------------------------------------------------------- | ------------------------------ | -------------------------------------------------------------- | -------------------------------- |
| Select/Listbox  | select nativo em App/features/DemoController             | DESIGN.md e tipos de ator/cena | native; popup do sistema aceito                                | main-flow.spec.ts                |
| Form            | labels/inputs/textarea nativos das features e Inspectors | comandos do reducer            | revisão, indicação, exemplo local                              | main-flow.spec.ts                |
| Scrollbar       | src/styles/global.css                                    | DESIGN.md                      | rolagem vertical de main, horizontal de tabela, diálogo        | captura em três viewports        |
| Toast           | status compartilhado em App.tsx                          | state.message/state.error      | status persistente; erros legíveis; atividade registra decisão | main-flow.spec.ts                |
| Table Selection | SELECT_TEAM no reducer, botões da tabela semântica       | avaliação atual                | uma composição válida por vez                                  | demo.test.ts e main-flow.spec.ts |
| CRUD            | comandos locais de src/demo/reducer.ts                   | especificação do cenário       | somente operações fictícias já implementadas                   | main-flow.spec.ts                |

## Navegação, feedback e estado

Sidebar abre as seis áreas. Abas não recarregam checkpoints. `main` rola, shell permanece estável. Reset/cenas cancelam tarefas antigas; restaurar a mesma cena repõe foco/conteúdo/seleção. Todos os data-testid existentes e nomes das ações do percurso permanecem disponíveis.

Busca e filtros locais não consultam serviços; limpar filtro devolve resultados. State de filtro é transitório da cena, não se persiste em URL por decisão do modo demonstração. Datas são fixas em pt-BR e America/Sao_Paulo. Não há seletor de calendário, autenticação, operação de dinheiro ou exclusão real.

## Overlays e interação

Dialog canônico é `components/ui.tsx`, baseado no elemento nativo com showModal, título, Escape e restauração de foco. Inspeção de perfil é uma variante sheet; leitura de evidência preserva texto HTML acessível. Confirmação humana/aceite/RH continuam etapas distintas. Trocar papel não faz aprovação automática.

Foco visível e navegação por Tab/Enter/Escape. Abas adicionam setas/Home/End sem alterar as transições de negócio. Select mantém popup nativo. Não usar browser alert/confirm/prompt.

## Evidência

`tests/demo.test.ts`, `tests/controller.test.ts`, `tests/main-flow.spec.ts`, capturas reais e VERIFICACAO.md. Testes não implicam que Safari/macOS foi executado; esse limite é declarado separadamente.
