"""Busca contratações de técnica e preço no PNCP (API pública de consulta).

NÃO TESTADO: escrito num ambiente sem acesso ao pncp.gov.br. Rode localmente e ajuste os
nomes de campos se a API devolver algo diferente.

Exemplo:
  python src/buscar_editais_pncp.py --inicio 2026-09-01 --fim 2026-10-19 \
    --termos consultoria projeto software energia --checar-criterio \
    --saida data/editais/pncp_candidatos.csv
"""
import argparse
import csv
import json
import sys
import time
import unicodedata
import urllib.parse
import urllib.request

CONSULTA = "https://pncp.gov.br/api/consulta/v1/contratacoes/publicacao"
ITENS = "https://pncp.gov.br/api/pncp/v1/orgaos/{cnpj}/compras/{ano}/{seq}/itens"
ARQUIVOS = "https://pncp.gov.br/api/pncp/v1/orgaos/{cnpj}/compras/{ano}/{seq}/arquivos"
SITE = "https://pncp.gov.br/app/editais/{cnpj}/{ano}/{seq}"

# Códigos de modalidade do PNCP (manual de integração): 4 = Concorrência eletrônica,
# 5 = Concorrência presencial, 6 = Pregão eletrônico.
MODALIDADES = {"concorrencia_eletronica": 4, "concorrencia_presencial": 5}


def norm(s):
    s = unicodedata.normalize("NFKD", s or "").encode("ascii", "ignore").decode()
    return s.lower()


def get_json(url, tentativas=3):
    for i in range(tentativas):
        try:
            req = urllib.request.Request(url, headers={"Accept": "application/json", "User-Agent": "hackatohm-lastro/0.1"})
            with urllib.request.urlopen(req, timeout=30) as r:
                body = r.read()
                return json.loads(body) if body else None
        except Exception as e:  # noqa: BLE001
            if i == tentativas - 1:
                print(f"  falhou: {url} ({e})", file=sys.stderr)
                return None
            time.sleep(2 * (i + 1))


def listar(inicio, fim, modalidade, max_paginas):
    pagina = 1
    while pagina <= max_paginas:
        q = urllib.parse.urlencode({
            "dataInicial": inicio.replace("-", ""),
            "dataFinal": fim.replace("-", ""),
            "codigoModalidadeContratacao": modalidade,
            "pagina": pagina,
            "tamanhoPagina": 50,
        })
        dados = get_json(f"{CONSULTA}?{q}")
        if not dados or not dados.get("data"):
            break
        yield from dados["data"]
        if pagina >= dados.get("totalPaginas", pagina):
            break
        pagina += 1
        time.sleep(0.3)


def criterio_tecnica_preco(cnpj, ano, seq):
    itens = get_json(ITENS.format(cnpj=cnpj, ano=ano, seq=seq)) or []
    nomes = {norm(i.get("criterioJulgamentoNome", "")) for i in itens}
    return any("tecnica" in n and "preco" in n for n in nomes), sorted(nomes)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--inicio", required=True, help="AAAA-MM-DD")
    ap.add_argument("--fim", required=True, help="AAAA-MM-DD")
    ap.add_argument("--termos", nargs="+", default=["consultoria", "projeto", "software", "tecnologia da informacao", "energia"])
    ap.add_argument("--modalidade", type=int, default=MODALIDADES["concorrencia_eletronica"])
    ap.add_argument("--max-paginas", type=int, default=40)
    ap.add_argument("--checar-criterio", action="store_true", help="abre os itens e mantém só técnica e preço")
    ap.add_argument("--saida", default="pncp_candidatos.csv")
    a = ap.parse_args()

    termos = [norm(t) for t in a.termos]
    linhas, vistos = [], 0
    for c in listar(a.inicio, a.fim, a.modalidade, a.max_paginas):
        vistos += 1
        objeto = c.get("objetoCompra", "")
        if not any(t in norm(objeto) for t in termos):
            continue
        org = c.get("orgaoEntidade") or {}
        cnpj, ano, seq = org.get("cnpj"), c.get("anoCompra"), c.get("sequencialCompra")
        criterio = ""
        if a.checar_criterio and cnpj:
            ok, nomes = criterio_tecnica_preco(cnpj, ano, seq)
            if not ok:
                continue
            criterio = "; ".join(nomes)
        linhas.append({
            "orgao": org.get("razaoSocial", ""),
            "uf": (c.get("unidadeOrgao") or {}).get("ufSigla", ""),
            "numero_controle_pncp": c.get("numeroControlePNCP", ""),
            "objeto": objeto.replace("\n", " ")[:300],
            "criterio_itens": criterio,
            "valor_estimado": c.get("valorTotalEstimado", ""),
            "publicacao": c.get("dataPublicacaoPncp", ""),
            "encerramento_propostas": c.get("dataEncerramentoProposta", ""),
            "link_pncp": SITE.format(cnpj=cnpj, ano=ano, seq=seq) if cnpj else "",
            "link_arquivos_api": ARQUIVOS.format(cnpj=cnpj, ano=ano, seq=seq) if cnpj else "",
            "link_sistema_origem": c.get("linkSistemaOrigem", ""),
        })
        print(f"+ {linhas[-1]['orgao'][:50]} | {objeto[:80]}")

    if linhas:
        with open(a.saida, "w", newline="", encoding="utf-8") as fh:
            w = csv.DictWriter(fh, fieldnames=list(linhas[0].keys()))
            w.writeheader()
            w.writerows(linhas)
    print(f"\n{vistos} contratações lidas, {len(linhas)} candidatas salvas em {a.saida}")


if __name__ == "__main__":
    main()
