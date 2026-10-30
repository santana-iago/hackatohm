# Pacote de documentação Aptus 3.1

> **Atualização de entrega em 27/10/2026:** consultar [Entrega 2026](../entrega-2026/README.md) e [Vídeo](../video/PLANO_DE_GRAVACAO.md). Equipe Quatro e meio identificada; vídeo e modelo oficial pendentes. Este guia descreve o pacote histórico de arquitetura de 26/10; suas contagens e observações sobre o resumo não são o estado atual da submissão. O resumo atual tem duas páginas e cooperação com 181 palavras.

Data editorial: 26/10/2026. Revisão de engenharia 1, dentro da arquitetura 3.1 existente. Desafio D03 — EloGroup — HackatOhm 2026.

## Arquivos

- `APTUS_3_1_Blueprint.md`: referência normativa da especificação completa, com as correções já integradas. Inclui regras, modelo de dados, IA, otimização, Recovery, segurança, custos, telas, APIs, prioridades, 60 cenários de aceitação e roteiro de vídeo.
- `APTUS_3_1_Correcoes_Engenharia.md`: registro dos problemas encontrados, decisões corrigidas, módulos responsáveis e testes associados. Não é uma arquitetura alternativa nem substitui o blueprint.
- `APTUS_3_1_Resumo_HackatOhm.md`: fonte do resumo. Antes da submissão, preencher integrantes e link do vídeo, conferir o modelo oficial e revisar a paginação após qualquer alteração.
- `APTUS_3_1_arquitetura.png`, `APTUS_3_1_fluxos.png` e `APTUS_3_1_recovery.png`: diagramas de precisão usados no guia, reutilizáveis pela equipe.
- `APTUS_3_1_Conferencia.md`: verificações executadas nesta revisão e limites dessas verificações.

Os arquivos Word e PDF são entregues separadamente. O PDF do resumo possui duas páginas na versão entregue; edições podem alterar esse resultado. O parágrafo de parceria tem 170 palavras, desconsiderada a referência bibliográfica.

## Estado real

Esta entrega é documentação de concepção e implementação. Não contém uma aplicação homologada. As contas do cenário sintético e contraexemplos foram conferidas independentemente; os 60 casos são critérios a implementar/verificar, não testes já aprovados no Aptus. Integrações, modelos, segurança, desempenho e custo empresarial dependem dos gates descritos. Os casos T58–T60 verificam o protocolo de avaliação/piloto; não são testes de uma API.

## Orientação à equipe

1. Ler o sumário, o cenário sintético e a ordem de construção.
2. Ler o registro de correções e implementar os contratos definidos no blueprint; dúvida nova deve ser resolvida na regra e no respectivo teste, sem criar comportamento implícito na interface.
3. Construir o núcleo de regras/estados e a demonstração; indicar os adaptadores simulados.
4. Registrar os testes efetivamente executados e seus resultados.
5. Gravar o vídeo, concluir identificação e link, conferir a entrega oficial.

Não houve alteração de repositório, envio de e-mail ou submissão ao hackathon nesta revisão. Preservar o trabalho existente e usar uma branch específica se o pacote for incorporado ao GitHub posteriormente.
