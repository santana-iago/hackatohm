# Aptus Matriz de critérios e premissas

Material de trabalho da equipe, atualizado em 27/10/2026. O resumo de duas páginas é o arquivo de submissão; esta matriz explica as decisões de redação e ajuda a preparar respostas à banca.

## Tese que organiza a apresentação

A contribuição do Aptus está na qualidade da arquitetura de implementação proposta: integrar IA aplicada a documentos, recuperação de evidências, julgamentos semânticos delimitados, cálculo reproduzível e composição de equipes, com controle de acesso, revisão humana e implantação economicamente verificável.

O argumento é sustentado pela divisão de responsabilidades, pelas transições entre evidência e decisão e pelo plano de validação. A atualidade dos componentes, isoladamente, não demonstra novidade, correção ou viabilidade. O protótipo visual representa o fluxo com dados sintéticos; a integração de produção não foi validada.

## Duas rubricas encontradas nas fontes

O briefing EloGroup, página 18, apresenta os pesos abaixo. A página geral do HackatOhm apresenta cinco critérios de pesos iguais. Não foi localizada uma determinação de precedência para o D03. O material foi redigido para cobrir ambas; não atribuímos autoridade definitiva a uma distribuição conflitante.

### Rubrica específica da EloGroup

| Critério do briefing | Peso | Resposta incorporada ao resumo | Onde aparece |
|---|---:|---|---|
| Qualidade e viabilidade da solução | 25% | Papéis de cada componente, provas aceitas antes de pontuar, custo total, limites computacionais, responsáveis e implantação gradual | Síntese, solução, fundamentação, canvas e cooperação |
| Entendimento e quantificação do problema | 20% | Dispersão, desatualização, ausência de provas e 600–1.000 horas anuais sobre premissas do case | Problema e objetivo |
| Estimativa de impacto bem fundamentada | 20% | Efeito de composição separado de recuperação de prova; unidade em pontos; hipótese econômica com parâmetros explícitos | Resultados e piloto |
| Comunicação e pitch | 20% | Texto organizado, canvas com rotas distinguíveis, cenário causal e roteiro cronometrável | Documento completo e roteiro |
| Criatividade e diferenciação | 15% | Interpretação ligada a regras verificáveis, busca exata preservada, otimização conjunta e realimentação após aceite | Síntese, solução e canvas |

### Correspondência com a rubrica geral

| Critério geral | Cobertura prevista |
|---|---|
| Inovação e originalidade | Engenharia da integração e contribuição concreta da equipe |
| Aderência ao desafio | Encontrar profissionais, apresentar experiências e manter a base atualizada |
| Viabilidade técnica | Arquitetura enxuta, limites de execução, responsáveis, piloto e contingência |
| Potencial de impacto | Horas, custo total, qualidade documental e pontuação verificável |
| Apresentação e fundamentação | Clareza do canvas, referências, hipóteses delimitadas e cooperação empresa–CEFET |

Essa matriz é uma interpretação de cobertura, não uma previsão de nota. A clareza e a duração do vídeo só podem ser avaliadas depois de uma gravação real.

## Quatro pontos de atenção expressos no case

| Ponto | Resposta operacional |
|---|---|
| Comprovação | RH verifica titular, vigência e origem; o uso da prova precisa ser aceito para a regra do edital. Receber um arquivo não concede pontos. |
| Privacidade | Permissões por papel e finalidade são aplicadas antes da recuperação e da inferência. Exportação recebe autorização própria; um usuário poder consultar não significa poder divulgar. |
| Veracidade | Redação mantém fatos, versões e referências. Jev sinaliza problemas semânticos; Java verifica referências e regras; Licitações aprova. Concordância entre modelos não autentica documentos. |
| Adesão | Eventos e campanhas geram tarefas curtas de confirmação. RH responde pelo cadastro, PMO pela agenda, Licitações pelos critérios. O piloto mede adesão, horas e fila para evitar deslocar o trabalho para outra área. |

## Premissas econômicas e limites do argumento

### O que vem do briefing

- Mais de 1.000 profissionais.
- Aproximadamente 40 disputas anuais.
- 15–25 horas **conjuntas** de 2–3 gestores em cada disputa.
- Portanto, 40 × 15–25 = **600–1.000 horas de trabalho por ano**. As próprias premissas do case precisam de validação.

### O que a equipe usa apenas para explorar viabilidade

O cenário do resumo toma 20 horas por disputa, o centro do intervalo fornecido, e utiliza **R$ 160 por hora** e **40% de redução líquida** como parâmetros ilustrativos. O custo-hora não é uma cotação nem uma medição de folha; os 40% não são resultado observado nem promessa de desempenho.

| Cálculo | Resultado |
|---|---:|
| 40 disputas × 20 horas | 800 horas anuais na referência |
| 800 horas × R$ 160/h | R$ 128.000 de capacidade mobilizada |
| 800 horas × 40% | 320 horas potencialmente liberadas |
| 320 horas × R$ 160/h | R$ 51.200 de capacidade antes das despesas adicionais |

Sensibilidade sobre a mesma referência, ainda hipotética:

| Redução líquida de esforço | Horas liberadas | Valor de capacidade a R$ 160/h |
|---:|---:|---:|
| 25% | 200 h/ano | R$ 32.000/ano |
| 40% | 320 h/ano | R$ 51.200/ano |
| 60% | 480 h/ano | R$ 76.800/ano |

O benefício calculado deve ser confrontado com implantação amortizada, infraestrutura, APIs, manutenção, segurança e trabalho de todas as áreas. Horas de revisão já descontadas na redução líquida não podem ser descontadas novamente. Com R$ 60 mil de despesas adicionais anuais e o cenário de 40%, o benefício por capacidade ficaria **R$ 8.800 abaixo** dessas despesas. R$ 60 mil é um teste de sensibilidade, não um orçamento do Aptus.

**Critério de decisão:** expandir somente com benefício líquido positivo, qualidade suficiente e riscos aceitáveis, segundo limites fixados antes do piloto. Não chamar capacidade liberada de redução automática de caixa. Não atribuir ao Aptus a receita integral de um contrato, nem converter pontos sintéticos em taxa de vitória.

## Como tornar a viabilidade verificável

1. **Mock sintético:** demonstrar o fluxo, os estados da evidência e a memória de cálculo. Sem integrações reais de IA.
2. **Piloto supervisionado:** uma área, 50–100 profissionais, 3–5 editais históricos e um ciclo em modo sombra, sob política aprovada. O processo vigente continua sendo a referência.
3. **Integrações graduais:** ampliar após conferir qualidade, custo total, privacidade, segurança, latência, capacidade humana e benefício líquido. A aprovação de uma pequena amostra permite expansão controlada, não comprova desempenho geral.

O desenho mantém núcleo Java/Spring e PostgreSQL, Docling em worker isolado, modelos Qwen locais e Jev externo somente nas condições aprovadas. A tarefa usa processamento incremental, cache versionado com revalidação de permissões, limites de execução e retentativas. Não há especificação validada de CPU/GPU/RAM nem orçamento operacional cotado; o dimensionamento depende de medir carga e qualidade no ambiente disponível.

Comparar busca estruturada/textual com revisão, depois a contribuição de Qwen, Jev e recuperação semântica, conservando as mesmas regras, fontes autorizadas e restrições do solver. Isso permite verificar o benefício de cada componente. Medir erro residual, cobertura, tempo humano e de máquina, custo por proposta válida e oportunidades que não foram concluídas. Incluir esforço de implantação e saneamento inicial.

## Respostas para perguntas prováveis

As perguntas abaixo são preparação da equipe, não subcritérios oficiais.

**Qual é a inovação se a ideia de organizar currículos já existe?** A contribuição defendida está na engenharia aplicada: separar recuperação, interpretação, comprovação, cálculo e otimização, ligando os componentes por fontes, estados, versões e decisões verificáveis. A proposta será comparada com alternativas mais simples.

**Por que usar Jev além do LLM?** A arquitetura atribui ao LLM extração e redação e a Jev julgamentos semânticos delimitados com saída tipada. O piloto compara a configuração com e sem essa etapa para medir se a contribuição justifica o custo e a complexidade.

**Por que não deixar a IA dar a nota?** A pontuação depende de regras aprovadas, datas, unidades de contagem e provas aceitas. Java calcula esses elementos de forma reproduzível. Os modelos fornecem sugestões estruturadas, revisáveis.

**E se o modelo errar ou o serviço sair do ar?** Pendências críticas permanecem bloqueadas e seguem à revisão. Há fila, timeout, retentativas limitadas, histórico e contingência manual. A falta de resposta não é aprovação nem prova de que a competência inexiste.

**O que impede o RAG de esconder um profissional elegível?** A consulta exata mantém no universo os candidatos já estruturados. A busca semântica amplia a descoberta; um corte de similaridade não pode excluir alguém que atende a um requisito objetivo conhecido.

**Como surgem os quatro pontos adicionais?** No cenário, dois projetos distintos passam a ter provas aceitas. Cada projeto vale dois pontos pela regra sintética. O aceite e o novo cálculo levam de 31 a 33 e depois a 35. Duplicar um arquivo não gera outro projeto nem outro ganho.

**Como impedir exageros no currículo?** O dossiê usa fatos e trechos identificados, com revisão semântica, verificação de referências e aprovação de Licitações. A autenticidade da prova exige conferência própria; um modelo não a garante.

**O serviço externo recebe currículos completos?** O desenho restringe o envio a trechos necessários e autorizados. Antes de usar dados reais, devem ser avaliados finalidade, base legal, contrato, retenção, terceiros e transferência internacional aplicável. Se o fluxo não for aprovado, o adaptador permanece desativado e existe encaminhamento manual/interno.

**O sistema está de acordo com a LGPD?** O projeto especifica controles e condições de tratamento. Conformidade concreta depende do contexto de implantação, das decisões do controlador, dos contratos e da validação dos controles. Não há homologação jurídica concluída.

**Como vocês impedem instruções maliciosas dentro dos documentos?** Documentos entram como dados não confiáveis; parsers e modelos são isolados e não recebem ferramentas administrativas. Saídas passam por contratos e verificações determinísticas. Serão realizados testes adversariais; RAG por si só não elimina prompt injection.

**Por que alguém manteria o cadastro atualizado?** Eventos corporativos, campanhas dirigidas e indicações reduzem o esforço a confirmações e apresentação de provas. Há responsáveis por cadastro e agenda. A adesão e a fila de revisão são métricas do piloto; o plano não pressupõe atualização espontânea permanente.

**O que já foi demonstrado?** A arquitetura, contratos e cenário sintético foram documentados e a aritmética foi conferida. O mock foi planejado para demonstrar os estados. Não foram validados integração de produção, benchmark, segurança operacional ou economia real.

## Fontes

- EloGroup. `case-hackathon.pdf`, páginas 14–19, especialmente entregáveis na página 17 e avaliação na página 18. Material fornecido à equipe.
- CEFET-MG. https://www.eng-eletrica.bh.cefetmg.br/hackatohm/acompanhe/
- Arquitetura da equipe. `APTUS_3_1_Blueprint.md`, seções 2, 5–6, 8–13 e 17.
- TypeSafe. https://docs.typesafe.ai/models
- Qwen. https://huggingface.co/Qwen/Qwen3.5-4B e https://huggingface.co/Qwen/Qwen3-Embedding-0.6B
- RAG. https://ai.meta.com/research/publications/retrieval-augmented-generation-for-knowledge-intensive-nlp-tasks/
- OR-Tools. https://developers.google.com/optimization/cp/cp_solver
- OWASP. https://genai.owasp.org/llmrisk/llm01-prompt-injection/
- LGPD. https://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-787077-normaatualizada-pl.html
- ANPD. https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/resolucao-cd-anpd-no-19-de-23-de-agosto-de-2024

## Identificação confirmada e pendências de entrega

**Equipe: Quatro e meio.** Identificação informada pelo líder: Iago Soares Santana (líder, 5º período), Gabriel Galvão dos Reis Bandeira (5º), Bernardo Vieira Rocha (5º), Lucas Francischetti Alvarenga (6º) e Arthur de Oliveira Torres (5º). Todos cursam Engenharia de Computação. O nome da equipe e os dados dos integrantes não estão mais pendentes; os nomes atuais dos entregáveis permanecem preservados.

O conteúdo e o limite de páginas foram revistos. Permanecem duas pendências: publicar o vídeo e inserir/testar seu link definitivo no PDF; confrontar a diagramação com o modelo DOCX oficial. Esse modelo permaneceu inacessível, com respostas HTTP 502/503, portanto a diagramação é uma reconstrução editorial e não foi validada como reprodução do original. O limite de duas páginas deve ser conferido novamente após as alterações finais.
