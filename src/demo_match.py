"""Prova de conceito: edital de exemplo do briefing aplicado à base.
Edital fictício:
  - Gerente de projeto: obrigatório perfil PM; PMP = +10 pts
  - Experiência comprovada em projetos do setor de energia: 2 pts/projeto, máx 8
  - Bônus: certificação ágil (CSM/PSM/SAFe) = +3 pts
"""
import sys, os, re, json
src = sys.argv[1]
profiles = {p["name"]: p for p in json.load(open(os.path.join(src, "_profiles.json")))}
ENERGY = re.compile(r"\b(energy|utilit(y|ies)|electric(al)? (company|utility)|power (generation|company|utility)|oil (and|&) gas|nuclear)\b", re.I)
CLIENT_LINE = re.compile(r"^(client|employer|company|project)\s*[:\-]|\b(Inc|LLC|Corp|Ltd)\b|\|", re.I)
out = []
for f in os.listdir(src):
    if not f.endswith(".txt") or f.startswith("_"): continue
    name = f.rsplit(".", 2)[0]; p = profiles[name]
    if p["role"] not in ("Project/Program Manager", "Scrum Master"): continue
    t = open(os.path.join(src, f)).read()
    # conta blocos de experiência (linhas de cabeçalho de cliente) que mencionam energia
    lines = t.splitlines()
    proj = set()
    for i, l in enumerate(lines):
        if CLIENT_LINE.search(l) and ENERGY.search(" ".join(lines[i:i+3])):
            proj.add(l.strip()[:60])
    pmp = "PMP" in p["certs"]
    agil = any(c in p["certs"] for c in ("CSM (Scrum Master)", "PSM", "SAFe"))
    score = (10 if pmp else 0) + min(2 * len(proj), 8) + (3 if agil else 0)
    out.append((score, name, pmp, len(proj), agil, p["years"]))
out.sort(reverse=True)
print(f"{len(out)} candidatos com perfil PM/SM\n")
print(f"{'pts':>3}  {'currículo':40s} PMP  proj.energia  ágil  anos")
for s, n, pmp, pe, ag, y in out[:10]:
    print(f"{s:3d}  {n:40s} {'sim' if pmp else 'não':4s} {pe:>6d}        {'sim' if ag else 'não':4s} {y}")
print("\nCom PMP:", sum(1 for o in out if o[2]), "| com >=1 projeto energia:", sum(1 for o in out if o[3]), "| PMP e energia:", sum(1 for o in out if o[2] and o[3]))
