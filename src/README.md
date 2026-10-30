# Scripts exploratórios

Scripts Python usados na pesquisa inicial do projeto. A demonstração interativa fica em [`prototype/aptus-demo/`](../prototype/aptus-demo/README.md).

| Script | Entrada e saída |
| --- | --- |
| [`extract.py`](extract.py) | Lê uma pasta de currículos Word e grava texto e estatísticas em outra pasta. |
| [`analyze.py`](analyze.py) | Lê os textos extraídos e imprime contagens de perfis, termos e possíveis duplicatas. |
| [`demo_match.py`](demo_match.py) | Faz uma classificação exploratória para o exemplo de gerente de projetos. |
| [`buscar_editais_pncp.py`](buscar_editais_pncp.py) | Consulta o PNCP por período e termos e grava os candidatos em CSV. |

## Preparar o ambiente

Na raiz do repositório, com Python 3:

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
```

No Windows, ative o ambiente com `.venv\Scripts\activate` no Prompt de Comando.

## Extrair e analisar documentos

Use documentos de teste próprios ou autorizados. A base recebida no desafio não é distribuída no repositório.

```bash
python -I src/extract.py data/raw/Resumes data/raw/txt
python -I src/analyze.py data/raw/txt
python -I src/demo_match.py data/raw/txt
```

A pasta `data/raw/Resumes/` precisa existir e conter os arquivos Word antes da execução. Os relatórios podem exibir nomes dos arquivos de entrada; revise-os antes de compartilhar.

Os scripts usam dicionários e expressões regulares. Uma menção a uma certificação não verifica sua titularidade, validade ou aceitação em um edital. A pontuação exploratória é separada das regras especificadas para o produto.

## Buscar exemplos de editais

```bash
python src/buscar_editais_pncp.py --help
```

O [guia de busca](../docs/como-buscar-editais.md) descreve os parâmetros, o método de coleta e as limitações observadas. A consulta depende de acesso à internet e da disponibilidade da API do PNCP.
