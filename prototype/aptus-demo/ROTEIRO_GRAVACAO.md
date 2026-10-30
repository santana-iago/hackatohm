# Roteiro de captura — Aptus para Nexora

**Duração do trecho: 3 minutos.** Grave a interface real do navegador, com o selo **Demonstração · dados fictícios** sempre legível. O vídeo completo pode acrescentar contexto e encerramento fora destes três minutos. Não é necessário gerar voz, música ou vídeo nesta entrega.

## Preparação

1. Na pasta do protótipo, rode `npm ci`, `npm run build` e `npm run preview`.
2. Abra `http://localhost:4173/?scene=overview&capture=1` na porta exibida pelo Vite. Use viewport 1920×1080, navegador em tela cheia ou capture apenas a aplicação.
3. Ative movimento reduzido se necessário. Feche o painel Demonstração antes de cada tomada; o selo permanece visível.
4. Evite zoom que reduza a legibilidade. A versão de gravação amplia texto e controles. Posicione o ponteiro fora do texto ao pausar.
5. Antes e depois de cada ação, deixe 1–2 segundos estáveis para edição. Não introduza um cursor falso no produto.

O enquadramento inclui a sidebar cinza neutra de 216 px, a toolbar compacta e a área de trabalho. A rolagem vertical pertence a `main`; mantenha o shell como referência ao percorrer listas e documentos. Abra perfis no sheet de inspeção e evidências na prévia documental, conservando o contexto da tarefa. As abas segmentadas podem ser acionadas por clique ou pelas setas, Home e End. A direção visual e os contratos de interação estão em [DESIGN.md](DESIGN.md) e [UX-CONTRACT.md](UX-CONTRACT.md).

Uma tomada pode começar por checkpoint, mas a montagem deve preservar a causalidade. Ao pular uma etapa, identifique a condição já cumprida, por exemplo: “Vale do Sol: documento apresentado por Carla e verificado por RH”. Nunca mostre upload como causa de aumento de nota.

```js
await window.aptusDemo.loadScene("overview");
window.aptusDemo.setCaptureMode(true);
window.aptusDemo.setMotion("reduced");
await window.aptusDemo.waitUntilIdle();
```

Use `waitUntilIdle()` depois de cada comando e antes de capturar. A navegação interna não reaplica a cena que consta na URL. Para repetir uma tomada, use `loadScene()` ou Restaurar cena.

## Montagem principal

| Tempo     | Checkpoint e ação                                                                                | Imagem que deve permanecer legível                                                | Fala sugerida                                                                                                                           |
| --------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 0:00–0:10 | `overview`; Continuar análise da disputa                                                         | Aptus/Nexora, ENE-001, prazo fictício e pendências                                | “O Aptus reúne pessoas, critérios e comprovações para preparar a equipe de cada disputa.”                                               |
| 0:10–0:25 | `base-viva`; Carla confirma os campos; RH aprova a atualização                                   | Mesmo perfil, currículo v2, informação e prova em estados distintos               | “A base incorpora atualizações, mas uma informação declarada ainda precisa de prova.”                                                   |
| 0:25–0:45 | `criteria-review`; abrir G-ENERGIA, revisar regras, aprovar matriz e provas iniciais             | Página 4, cláusula 7.2.1, projetos distintos, dois aceites separados              | “Cada critério fica ligado ao edital e passa pela revisão de Licitações.”                                                               |
| 0:45–1:10 | `team-comparison`; Comparar composições; abrir Bruno; `availability`, confirmar equipe           | Escolha isolada 30, Carla/Diego 31, Bruno 0 h, pessoas distintas                  | “Escolher os melhores nomes isoladamente dá 30. Considerar a equipe inteira chega a 31, respeitando agenda e funções.”                  |
| 1:10–1:55 | `recovery-start`; solicitar, receber, verificar, aceitar Aurora; recalcular. Repetir Vale do Sol | 31 antes e após RH; último cálculo 31 após aceite; 33; segunda prova distinta; 35 | “Há dois projetos de Carla sem atestado aceito. O potencial só vira ponto quando a documentação é conferida e aceita para este edital.” |
| 1:55–2:15 | `dossier-review`; abrir trilha, conferir textos, aprovar, baixar PDF                             | Checklist, snapshot, cálculo, origem de um ponto e download local                 | “O dossiê da equipe preserva a origem de cada ponto e o conteúdo aprovado.”                                                             |
| 2:15–2:35 | `discovery`; Lia confirma a credencial e fornece documento; RH verifica                          | Reembolso como indício, documento verificado, agenda a confirmar                  | “Campanhas revelam competências ausentes dos currículos, com confirmação e comprovação.”                                                |
| 2:35–2:50 | `connect`; Marina aceita, apresenta credencial, RH valida                                        | Indicação de Eva, aceite de Marina, validação independente                        | “As indicações ampliam o conhecimento da empresa, sem garantir uma vaga ou alterar a nota técnica.”                                     |
| 2:50–3:00 | `recognition`; consultar Eva e histórico; retornar ao painel                                     | +3 de Eva, reconhecimento separado da nota, snapshot de 35                        | “O reconhecimento incentiva a atualização. A seleção continua apoiada nas exigências e nas provas.”                                     |

## Tomadas e controles estáveis

Os identificadores abaixo são `data-testid`. Priorize também os nomes acessíveis dos botões. Não dependa de posição, cor ou texto de toast temporário.

| Tomada                | Cena de partida                         | Papel e controles                                                                                                     | Conferência antes de cortar                                                           |
| --------------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Atualização da base   | `base-viva`                             | Carla: conferir checkbox e `profile-confirm`; RH: conferir checkbox e `profile-verify`                                | Currículo v2, dez perfis, atestados ainda pendentes                                   |
| Regra com origem      | `criteria-review`                       | Licitações; `criterion-G-ENERGIA`                                                                                     | Destaque exato de 7.2.1 na página 4                                                   |
| Aprovações iniciais   | `criteria-review`                       | Revisar regras, `criteria-approve`, conferir lista, `criteria-initial-evidence-approve`                               | Matriz aprovada e aceites iniciais registrados separadamente                          |
| Equipe recomendada    | `team-comparison`                       | Licitações; `team-compare`                                                                                            | 31 atuais e alternativa de 30, sem repetir pessoa                                     |
| Indisponibilidade     | `team-comparison` ou `availability`     | `availability-p-bruno`                                                                                                | 02/11/2026 a 29/01/2027, capacidade restante 0 h/semana                               |
| Confirmação da equipe | `availability`                          | PMO; `team-confirm-pmo`                                                                                               | Decisão para Carla/Diego e período correto                                            |
| Documento recebido    | `recovery-start`                        | Licitações solicita Aurora; Carla usa `evidence-receive-ev-carla-aurora`                                              | “Documento recebido. A pontuação ainda não mudou.”; 31 atuais                         |
| Verificação RH        | `recovery-received`                     | RH; `evidence-verify-ev-carla-aurora`                                                                                 | Documento verificado, uso no edital em análise, 31 atuais                             |
| Primeiro aceite       | `recovery-verified`                     | Licitações; `evidence-accept-ev-carla-aurora`                                                                         | Recálculo necessário; `team-score-last` mostra 31; sem nota atual                     |
| Primeiro recálculo    | Após primeiro aceite                    | Licitações; `team-recalculate`                                                                                        | `team-score-current` = 33; até +2 condicionados a Vale do Sol                         |
| Segunda prova         | `recovery-one`                          | Tarefa `recovery-CAR-G03`; solicitar, Carla apresenta, RH verifica, Licitações aceita `evidence-accept-ev-carla-vale` | CAR-G03 diferente de CAR-G02; último cálculo 33 após aceite                           |
| Segundo recálculo     | Após segundo aceite                     | Licitações; `team-recalculate`                                                                                        | 35 atuais, ambas as provas aceitas, sem lacuna destes dois projetos                   |
| Trilha de um ponto    | `recovery-complete` ou `dossier-review` | Abrir parcela/prova Aurora                                                                                            | Regra G-ENERGIA, Carla, CAR-G02, documento e Juliana no aceite                        |
| Dossiê aprovado       | `dossier-review`                        | Licitações; `dossier-review-texts`, `dossier-approve`                                                                 | Checklist completo e snapshot aprovado, sem reescrever a base                         |
| PDF                   | `dossier-approved`                      | `dossier-export`                                                                                                      | Download real, quatro páginas, 35 pontos, selo em todas; “Nenhum envio foi realizado” |
| Descoberta            | `discovery`                             | Lia: `campaign-respond` e apresentar comprovante; RH: `evidence-verify-ev-lia-sec`                                    | Lia +10 uma vez, agenda a confirmar, snapshot técnico preservado                      |
| Indicação interna     | `connect`                               | Marina: `referral-accept`, apresentar documento; RH: `referral-validate`                                              | Perfil atualizado para novas oportunidades; Eva +3, Marina +10                        |
| Reconhecimento        | `recognition`                           | `recognition-points`, `recognition-history`                                                                           | “Reconhecimento não altera a pontuação em editais”                                    |

Na tomada de recebimento, a tarefa deve ter sido solicitada. As cenas `recovery-received` e `recovery-verified` já incluem as etapas anteriores em sua trilha. Não apresentam um documento sem responsável.

## Percurso contínuo para conferência

Use esta ordem para verificar o fluxo inteiro sem restaurar checkpoints no meio:

1. `reset()`. Em Base Viva, revisar atualização de Carla, confirmar como Carla e aprovar como RH.
2. Como Licitações, abrir oportunidade, carregar exemplo, revisar as regras, aprovar matriz e conferir/aceitar as provas iniciais.
3. Comparar. Verificar Diego/Eva = 30, Carla/Diego = 31 e Carla/Eva = 29. Inspecionar Bruno e a vedação a Diego em dois papéis.
4. Como PMO, confirmar Carla/Diego. Abrir Recovery.
5. Solicitar Aurora como Licitações, receber como Carla, verificar como RH. Conferir 31. Aceitar como Licitações. Conferir estado desatualizado. Recalcular: 33.
6. Repetir solicitação, recebimento, verificação, aceite e recálculo com Vale do Sol. Conferir 35 e as duas unidades distintas.
7. Conferir PMO se solicitado. Preparar dossiê, revisar textos, aprovar, baixar e abrir o PDF. Conferir nomes, acentos, nota, regras, evidências e as quatro páginas.
8. Abrir Descoberta. Como Lia, declarar e apresentar a credencial. Como RH, verificar. Conferir +10 e agenda a confirmar.
9. Abrir Connect. Como Marina, aceitar a indicação e apresentar documento. Como RH, validar. Conferir Marina +10 e Eva +3.
10. Consultar Minha participação e retornar ao Dossiê. O snapshot fechado permanece em 35 e não incorpora reconhecimento.

## Conferências extras fora do vídeo

| Cena                   | O que demonstrar                                                                                                                               |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `second-rejected`      | Vale do Sol rejeitado com motivo; Aurora preservado; 33 pontos. É possível revisar e aprovar um dossiê coerente com 33.                        |
| `duplicate-proof`      | Outro arquivo de Aurora não acrescenta projeto nem pontos.                                                                                     |
| `expired-credential`   | Pedro: documento verificado e vigência vencida são estados diferentes.                                                                         |
| `availability-unknown` | Diego sem agenda não entra como disponível; Carla/Eva = 29.                                                                                    |
| `tender-amended`       | Retificação v2 em revisão; resultado v1 histórico, novas aprovação/exportação bloqueadas.                                                      |
| `export-blocked`       | Consulta interna preservada; documento usado sem permissão impede exportação.                                                                  |
| `connect-external`     | Copiar convite local; Lucas aceita. Só depois aparece externo, com vínculo e agenda pendentes. Sem reconhecimento sem qualificação verificada. |

Verifique também duplo clique em ações, troca de cena durante processamento e reset. Nenhum callback antigo pode alterar a cena nova; nenhum efeito deve ser duplicado.

## Enquadramento e operação acessível

Repita as telas principais em 1920×1080, 1440×900 e 1280×720. No compacto, o inspetor pode sobrepor o conteúdo e deve fechar com retorno ao controle de origem. Abaixo de 1024 px, a navegação recolhe e o conteúdo segue operável. Faça a rolagem na área de trabalho; não reduza o texto para enquadrar todo o conteúdo em uma única tomada.

Confira Tab, Shift+Tab, Enter, Escape em diálogos, foco visível, busca sem resultado com Limpar filtros e página a 200%. Nas abas da disputa e do perfil, confira setas, Home e End. Depois de fechar um sheet ou a prévia de evidência, confira o retorno do foco ao controle de origem. O modo gravação nunca oculta o selo de simulação. Capture critérios, comparação, Recovery em 35 e dossiê, além das páginas do PDF para conferência.

As referências visuais da revisão ficam em `artifacts/redesign/`: nove cenas nos três tamanhos, totalizando 27 capturas. Elas incluem Hoje, perfil, critérios, comparação, Recovery em 35, dossiê, Descoberta, Connect e reconhecimento. As capturas tradicionais em `artifacts/screenshots/` também acompanham a entrega. Use as imagens para conferir enquadramento, mantendo os estados e as ações da aplicação como fonte da gravação.

Safari/macOS só deve constar como testado se houver execução real nesse ambiente. Registre navegador, comandos, resultados e limitações no relatório de verificação. Uma tomada planejada não equivale a uma gravação realizada.
