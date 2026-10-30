# Materiais do HackatOhm 2026

Resumo, diagramas e documentos de apoio da equipe Quatro e meio para o desafio D03 da EloGroup. O [pitch final](https://github.com/santana-iago/hackatohm/releases/tag/pitch-v4) está disponível nas releases, e o [protótipo](../../prototype/aptus-demo/README.md) pode ser executado localmente.

## Resumo e apresentação

| Material | Acesso |
| --- | --- |
| Resumo no modelo do evento | [PDF](revisao-modelo-oficial/D03_Quatro_e_meio_Resumo.pdf) · [Word editável](revisao-modelo-oficial/D03_Quatro_e_meio_Resumo.docx) · [Notas](revisao-modelo-oficial/README.md) |
| Diagrama completo | [PNG](pipeline-obsidian/APTUS_Pipeline_Obsidian.png) · [SVG](pipeline-obsidian/APTUS_Pipeline_Obsidian.svg) · [Canvas](pipeline-obsidian/APTUS_Pipeline_Obsidian.canvas) · [Como editar](pipeline-obsidian/README.md) |
| Critérios e hipóteses | [Matriz de critérios e premissas](APTUS_Matriz_Criterios_e_Premissas.md) |
| Briefing da empresa | [Páginas 14 a 19 do material do desafio](referencias/Briefing_EloGroup_paginas_14_a_19.pdf) |
| Vídeos, tomadas e narração | [Índice de gravação](../video/README.md) |

## Versões e registros de preparação

| Material | Conteúdo |
| --- | --- |
| [Resumo anterior em PDF](D03_APTUS_Resumo_2026_PREENCHER.pdf) · [Word](D03_APTUS_Resumo_2026_PREENCHER.docx) · [Markdown](APTUS_Texto_Resumo_Revisado.md) | Versão anterior à adaptação ao modelo oficial. |
| [Pacote de preparação](APTUS_Pacote_Resumo_HackatOhm_2026_PREENCHER.zip) · [Guia](LEIA_ME_Pacote_APTUS.md) | Resumo anterior, fontes, diagramas, roteiro e plano do protótipo. |
| [Contexto da equipe](CONTEXTO_E_REVISAO_DA_EQUIPE.md) | Decisões e tarefas registradas em 27/10. |
| [Checklist do evento](APTUS_Checklist_Entrega_Oficial.md) | Instruções e conferências feitas durante a preparação. |
| [Canvas anterior](canvas_premium/LEIA_ME_Canvas.md) | Figura completa em PNG, SVG, PDF e formato editável. |
| [Representação em Mermaid](APTUS_Pipeline_Obsidian.md) | Outra forma de consultar os fluxos. |

Os nomes com `PREENCHER` e as pendências nos registros indicam a etapa em que esses arquivos foram preparados. O vídeo disponível atualmente está no link do pitch acima.

## Editar os materiais

A versão no modelo do evento deve ser editada pelo Word em `revisao-modelo-oficial/`. Depois de uma alteração, exporte o PDF e confira as duas páginas.

`build_aptus_banca.py` gera o resumo anterior; `canvas_premium/build_canvas.py` gera o respectivo diagrama. Os geradores usam bibliotecas Python e não reproduzem automaticamente a revisão no modelo oficial. A [especificação de produção](../aptus-3.1/README.md) e o [plano do protótipo](../prototipo/README.md) têm índices próprios.
