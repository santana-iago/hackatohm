# Aptus — contexto para colaboração da equipe

Registro da preparação do evento, em 27/10/2026. Para os materiais consolidados, consulte o [índice](README.md).

**Atualizado em 27/10/2026.** Este documento reúne as decisões e o estado do resumo para que os integrantes continuem a revisão a partir das decisões registradas. Os links deste arquivo apontam para materiais do repositório.

## 1. Identificação confirmada

**Solução:** Aptus, anteriormente Lastro. **Equipe inscrita:** Quatro e meio. **Desafio:** D03 / EloGroup. **Empresa fictícia do case:** Nexora. Todos os integrantes cursam Engenharia de Computação.

| Integrante | Período | Papel confirmado |
|---|---:|---|
| Iago Soares Santana | 5º | Líder |
| Gabriel Galvão dos Reis Bandeira | 5º | Integrante |
| Bernardo Vieira Rocha | 5º | Integrante |
| Lucas Francischetti Alvarenga | 6º | Integrante |
| Arthur de Oliveira Torres | 5º | Integrante |

Mentores registrados: Daniel Hasan Dalip e Poliana Aparecida Corrêa de Oliveira. A identificação já foi preenchida no DOCX e no PDF. O vídeo ainda será gravado e publicado; não há URL definitiva conhecida.

## 2. Tese que deve permanecer no resumo e no pitch

**A contribuição está na qualidade da implementação proposta: integrar interpretação semântica, regras verificáveis e otimização, preservando a origem de cada decisão.**

O argumento apresenta a engenharia da integração: confiabilidade, viabilidade financeira/computacional, segurança, condições jurídicas e participação humana. A defesa precisa explicar o papel e a necessidade de cada componente. A atualidade do nome de uma ferramenta não comprova, sozinha, inovação ou correção.

O protótipo é uma demonstração visual com dados sintéticos e funcionamento mockado. O produto de produção teria o pipeline especificado; a interface demonstrativa não precisa executar RAG, LLM, Jev, solver, integrações ou backend Java reais. A decisão do mock não altera a arquitetura proposta.

## 3. O que já foi concluído

- Resumo reescrito para responder aos critérios do briefing e aos temas da avaliação geral.
- Texto de problema, solução, fundamentação, resultados e cooperação consolidado.
- Equipe, curso, períodos e liderança preenchidos.
- DOCX exportado para PDF e ambas as páginas inspecionadas após o preenchimento.
- Canvas redesenhado com fundo grafite, grade discreta, cartões, rotas distintas e fases de implantação.
- Figura entregue em PNG/SVG/PDF e estrutura editável `.canvas` para Obsidian; Mermaid complementar preservado.
- Matriz de critérios, premissas econômicas, sensibilidade e respostas prováveis à banca preparada.
- Roteiro de pitch com oito blocos e meta de 4min50s; as durações são planejamento, não gravação aferida.
- Plano de implementação do mock atualizado para a mesma narrativa, mantendo processamento simulado.
- Principais papéis técnicos, cálculo do exemplo e limitações de validação conferidos.

**Ainda não concluídos:** adequação conferida ao DOCX oficial; gravação/publicação do vídeo; implantação do pipeline real; benchmarks; orçamento operacional cotado; testes de segurança de produção; validação jurídica da implantação.

## 4. Quais critérios foram considerados

O [briefing da EloGroup](referencias/Briefing_EloGroup_paginas_14_a_19.pdf), página original 18, apresenta qualidade/viabilidade (25%), entendimento/quantificação (20%), impacto fundamentado (20%), comunicação/pitch (20%) e criatividade/diferenciação (15%). Os pontos de atenção explícitos são **comprovação, privacidade, veracidade e adesão**.

A página geral do evento apresenta cinco critérios de pesos iguais: inovação, aderência, viabilidade técnica, impacto e apresentação/fundamentação. A regra de precedência para a divergência não foi confirmada nas fontes recuperadas. O texto cobre os temas das duas orientações. A [matriz](APTUS_Matriz_Criterios_e_Premissas.md) explica onde cada tema é respondido.

## 5. Decisões técnicas que não podem ser trocadas no texto

| Etapa | Responsabilidade proposta |
|---|---|
| Docling / Qwen | Extrair e estruturar fatos mantendo documento e origem. |
| PostgreSQL / pgvector | Fonte de fatos e versões; recuperação estruturada, textual e vetorial. |
| RAG | Recuperar evidências para contextualizar o LLM; não é garantia de verdade. |
| Jev | Avaliações semânticas delimitadas e respostas tipadas; sinalização de ambiguidades. |
| Java | Elegibilidade, datas, regras aprovadas, pontuação, contratos e validação de referências. |
| OR-Tools CP-SAT | Composição da equipe sob restrições; uma solução viável pode não ter otimalidade comprovada. |
| RH | Verificação das provas e manutenção do cadastro. |
| PMO | Disponibilidade e agenda. |
| Licitações | Critérios, admissibilidade da prova para o edital e aprovação do dossiê. |

A busca SQL mantém candidatos estruturados conhecidos mesmo que uma busca por similaridade não os retorne. O Recovery identifica lacunas documentais e leva provas verificadas e aceitas de volta à base, provocando novo cálculo. Receber um arquivo, verificar no RH e aceitar no edital são estados diferentes.

O cenário sintético compara 30 pontos por composição isolada com 31 por composição conjunta. Dois projetos distintos podem acrescentar dois pontos cada, resultando em 33 e depois 35, somente após prova aceita e recálculo. **O teto do cenário é 37.** Não exibir 35/35, 100% ou ganho automático por upload. Pontos de engajamento não entram na nota técnica.

## 6. Premissas financeiras e limites

O briefing estima mais de mil profissionais, 40 disputas anuais e 15–25 horas conjuntas de gestores por disputa. Isso equivale a 600–1.000 horas/ano; não multiplicar de novo pelo número de gestores.

O resumo usa um cenário ilustrativo: 40 × 20h = 800h/ano; redução líquida hipotética de 40% = 320h; a R$160/h = R$51.200 de capacidade antes das despesas adicionais. **40% e R$160/h são parâmetros a validar**, não resultados observados. Capacidade liberada não é economia automática de caixa nem receita de novos contratos.

O custo total deve incluir implantação amortizada, infraestrutura, APIs, manutenção, segurança e esforço de todas as áreas. Não descontar duas vezes horas já consideradas na redução líquida. A expansão deve depender de benefício líquido, qualidade e risco aceitáveis. O plano computacional usa núcleo Java/PostgreSQL, modelos locais leves, processamento incremental, reutilização válida e limites; não há dimensionamento de hardware ou benchmark comprovado.

## 7. Segurança, privacidade e uso de IA

Os controles descritos são projetados: permissões antes da recuperação/inferência, tratamento de documentos como entrada não confiável, parsers isolados, modelos sem privilégios administrativos, contratos de saída, auditoria, histórico e contingência manual. Incerteza ou indisponibilidade não gera aprovação automática.

Antes de dados reais: definir finalidade, base legal, minimização, retenção, direitos dos titulares e condições contratuais. Serviços externos exigem avaliar o compartilhamento e eventual transferência internacional. O projeto ainda não tem conformidade jurídica homologada. Os dados do mock são fictícios; não versionar currículos corporativos brutos ou credenciais.

Os scripts de análise e diagramação estão incluídos no repositório para permitir a manutenção dos materiais. A equipe é responsável pela revisão do conteúdo.

## 8. Modelo oficial e pontos de conferência restantes

Foram confirmados na página oficial recuperada: PDF de duas páginas, parceria em um parágrafo de 150–200 palavras, vídeo de até cinco minutos com link no PDF e prazo de 27/10/2026 às 23h, horário de Brasília. O checklist contém os destinatários e a forma de envio apurada.

Os arquivos oficiais abaixo responderam HTTP 503 em nova tentativa de 27/10. Nenhum arquivo de erro foi salvo como modelo válido:

- [Modelo DOCX](https://www.eng-eletrica.bh.cefetmg.br/wp-content/uploads/sites/191/2026/10/Modelo_resumo_HackatOhm2026-1.docx)
- [Guia de entrega e vídeo](https://www.eng-eletrica.bh.cefetmg.br/wp-content/uploads/sites/191/2026/10/Guia_entrega_video_HackatOhm2026.pdf)
- [Regulamento](https://www.eng-eletrica.bh.cefetmg.br/wp-content/uploads/sites/191/2026/10/regulamento-hackatohm-2026.pdf)
- [Página de comunicados](https://www.eng-eletrica.bh.cefetmg.br/hackatohm/acompanhe/)

Uma apuração anterior do repositório menciona figura de até 1/6 de página e fontes em até quatro itens. **Essas especificações não foram reconfirmadas nos originais** e não devem ser apresentadas como verificadas. Quem conseguir acessar o modelo/guia deve conferir esses pontos, além da fonte, margens, campos e ordem. Se o limite da figura for confirmado, ajustar a versão de submissão e manter o canvas completo como material complementar; o canvas pode continuar em tamanho amplo no vídeo.

A figura atual ocupa aproximadamente a metade superior da segunda página. O PDF tem duas páginas, e a cooperação tem 181 palavras. Isso não equivale a comprovação de conformidade integral com o modelo.

## 9. Como dividir a revisão sem depender do líder

| Frente | Próxima ação concreta | Entrega da revisão |
|---|---|---|
| Documento e modelo | Recuperar o original, confrontar campos/estilo/figura e ajustar o Word | DOCX e PDF atualizados, até duas páginas |
| Argumento técnico | Conferir papéis do pipeline, limites do mock e cenário de pontuação | Correções justificadas no texto e na matriz |
| Viabilidade e privacidade | Questionar premissas, custo total, esforço humano e condições de dados | Premissas e riscos explicitados sem promessas não medidas |
| Vídeo | Seguir o plano de tomadas, gravar voz, montar e cronometrar | Arquivo final até cinco minutos e URL acessível |

Essas frentes são sugestões de organização, não atribuições já aceitas por integrantes. Registrar alterações por commit/PR e evitar trabalhar sobre versões antigas do resumo. O conteúdo editável principal está no DOCX; a fonte de geração e o Markdown devem acompanhar mudanças antes de nova geração automática.

## 10. Foco atual: vídeo

Começar pelo [plano de gravação](../video/PLANO_DE_GRAVACAO.md) e pelo [teleprompter](../video/ROTEIRO_TELEPROMPTER.md). O pipeline fica visível durante o bloco técnico, enquanto o mock mostra os estados e a prova antes do recálculo. A URL ou execução do mock ainda precisa ser confirmada; não há vídeo concluído ou publicado.

Depois da publicação: testar o link, inseri-lo no DOCX, exportar novamente o PDF, conferir as duas páginas e concluir o checklist. Publicar os arquivos no GitHub não representa submissão ao HackatOhm nem envio aos mentores.
