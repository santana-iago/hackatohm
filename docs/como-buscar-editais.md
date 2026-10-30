# Como buscar editais de técnica e preço

Registro de como os editais de `data/editais/` foram encontrados (19/10/2026) e como repetir a busca.

## O que funcionou: busca na web por PDFs publicados pelos órgãos

Os portais federais não precisam ser a fonte: muitos órgãos publicam o edital, os critérios de
pontuação e, o mais valioso, a **ata de julgamento** ou **nota técnica** com a nota de cada licitante
no próprio site. Esses documentos mostram onde as empresas perderam pontos.

Buscas que trouxeram resultados úteis (Google ou similar):

```
edital concorrência "técnica e preço" 2026 consultoria tecnologia "pontuação" "PMP" termo de referência profissional
concorrência eletrônica técnica e preço 2026 serviços consultoria energia elétrica pontuação equipe técnica certificação experiência projetos
concorrência técnica e preço consultoria gestão "Gerente de Projeto" "certificação PMP" pontuação 2026 edital
"técnica e preço" "PMP" "pontos" "ITIL" "COBIT" quesito equipe técnica edital tecnologia da informação pdf
relatório julgamento proposta técnica concorrência 2026 "técnica e preço" desclassificada pontuação equipe técnica
```

Palavras que filtram bem: `ata de julgamento`, `nota técnica`, `avaliação de proposta técnica`,
`critérios de pontuação`, `relatório de avaliação`. Adicione `filetype:pdf` para ir direto aos documentos.

Ao abrir um resultado, conferir:

1. O critério é mesmo **técnica e preço** (muitos editais são de menor preço e não servem).
2. Existe **tabela de pontuação da equipe** (às vezes está num anexo separado, ex.: Anexo IV no BRDE).
3. Se for ata/nota técnica, anotar **nota por licitante e o motivo de cada ponto não atribuído**.

Depois, transcrever as regras para JSON no formato de `data/editais/*.json`.

## O que não funcionou (e por quê)

| Fonte | Resultado | Observação |
| --- | --- | --- |
| comprasnet.gov.br/livre (consulta de resultados) | Sem acesso | Acesso indisponível no ambiente de coleta; consulta manual por órgão, a verificar localmente |
| pncp.gov.br (site e API) | Sem acesso | Acesso indisponível no ambiente de coleta; verificar a API localmente com o script abaixo |
| dadosabertos.compras.gov.br (`1_consultarContratacoes_PNCP_14133`) | Respondeu, mas sempre vazio | Testado com modalidades 4, 5 e 6 e datas de 2025–2026; não retornou registros |
| Apify "editais-licitacoes-brasil" | Não testado | Exige conta e token da Apify; é serviço pago de terceiro |

## Script para rodar localmente: `src/buscar_editais_pncp.py`

Usa a API pública de consulta do PNCP (sem login). **Não foi testado** porque o PNCP estava
indisponível no ambiente de coleta. Execute localmente e confira os nomes dos campos retornados.

```bash
python src/buscar_editais_pncp.py --inicio 2026-09-01 --fim 2026-10-19 \
  --termos consultoria projeto software "tecnologia da informação" energia \
  --checar-criterio --saida data/editais/pncp_candidatos.csv
```

O que ele faz:

1. Lista contratações publicadas no período na modalidade Concorrência eletrônica (código 4).
2. Filtra pelo objeto contendo algum dos termos.
3. Com `--checar-criterio`, abre os itens de cada contratação e mantém só as que têm critério
   de julgamento "Técnica e Preço".
4. Salva CSV com órgão, objeto, valor, link do PNCP e link para os arquivos (edital e anexos).

Depois é só abrir os links, baixar o Termo de Referência e transcrever a tabela de pontuação.
