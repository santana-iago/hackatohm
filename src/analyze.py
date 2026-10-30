import sys, os, re, json, collections, hashlib

src = sys.argv[1]
CERTS = {
    "PMP": r"\bPMP\b",
    "CAPM": r"\bCAPM\b",
    "PMI-ACP": r"\bPMI[- ]?ACP\b",
    "PgMP": r"\bPgMP\b",
    "CSM (Scrum Master)": r"\bCSM\b|Certified Scrum ?Master",
    "PSM": r"\bPSM ?I{0,3}\b|Professional Scrum Master",
    "CSPO / PSPO": r"\bCSPO\b|\bPSPO\b|Product Owner certif|Certified (Scrum )?Product Owner",
    "SAFe": r"\bSAFe\b",
    "PRINCE2": r"PRINCE ?2",
    "ITIL": r"\bITIL\b",
    "Six Sigma": r"Six Sigma|Lean Six",
    "CBAP / CCBA / ECBA (IIBA)": r"\bCBAP\b|\bCCBA\b|\bECBA\b|\bIIBA\b",
    "ISTQB": r"ISTQB",
    "AWS Certified": r"AWS Certified|Certified Solutions Architect|AWS Solution Architect",
    "Azure / Microsoft cert": r"Microsoft Certified|\bMCP\b|\bMCSE\b|\bMCSD\b|\bMCTS\b|AZ-\d{3}",
    "Oracle Certified (OCJP/OCA/SCJP)": r"\bOCJP\b|\bSCJP\b|\bOCA\b|\bOCP\b|Oracle Certified|Sun Certified",
    "Salesforce cert": r"Salesforce Certified|Certified Salesforce|Salesforce Administrator",
    "Cloudera / Hadoop cert": r"Cloudera Certified|\bCCDH\b|\bCCA\b",
    "CISSP / Security+": r"CISSP|Security\+|\bCISA\b|\bCISM\b",
    "AHM / Healthcare (AHIP)": r"\bAHM\b|\bAHIP\b",
    "Scrum Alliance (generic)": r"Scrum Alliance",
    "SAP certified": r"SAP Certified|Certified SAP",
}
SKILLS = {
    "Java": r"\bJava\b", "Spring": r"\bSpring\b", "Python": r"\bPython\b", "SQL": r"\bSQL\b",
    "Hadoop": r"Hadoop", "Spark": r"\bSpark\b", "AWS": r"\bAWS\b", "Azure": r"\bAzure\b",
    "JIRA": r"\bJIRA\b", "Agile/Scrum": r"\bAgile\b|\bScrum\b", "Waterfall": r"Waterfall",
    "UML": r"\bUML\b", "Tableau": r"Tableau", "Power BI": r"Power ?BI", "Salesforce": r"Salesforce",
    "SAP": r"\bSAP\b", "Healthcare (HIPAA/HL7/EDI)": r"HIPAA|\bHL7\b|\bEDI\b|Medicaid|Medicare",
    "Banking/Finance": r"Banking|Mortgage|Financial Services|Capital Markets",
    "Insurance": r"Insurance|\bP&C\b", "Energy/Utilities": r"\bEnergy\b|Utilit(y|ies)|Oil|\bGas\b|Power plant|Electric",
    "Government/Public sector": r"Government|Public Sector|\bState of\b|Department of",
    "Telecom": r"Telecom", "Retail/E-commerce": r"Retail|E-?commerce",
    "PHP": r"\bPHP\b", "Angular/React": r"Angular|React", "Selenium/QA": r"Selenium|\bQA\b",
}
ROLE = [
    ("Project/Program Manager", r"project manager|program manager|\bPM\b|\bPMP\b|delivery manager"),
    ("Scrum Master", r"scrum master|\bSM\b"),
    ("Business Analyst / BSA", r"\bBA\b|business analyst|\bBSA\b|business systems analyst"),
    ("Java / Fullstack Dev", r"java|j2ee|full ?stack|fullstack"),
    ("Data / Hadoop", r"hadoop|data engineer|\bETL\b|big data"),
    ("QA / Testing", r"\bQA\b|testing|tester"),
    ("PHP / Web", r"php"),
]
YEARS = re.compile(r"(\d{1,2})\+?\s*(?:\+\s*)?(?:years|yrs)", re.I)
PII = {
    "email": r"[\w.+-]+@[\w-]+\.[\w.]+",
    "phone": r"\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}",
    "SSN/DOB/visa": r"\bSSN\b|DOB|Date of Birth|H1-?B|Green Card|\bGC\b|\bEAD\b|Work Authori[sz]ation|US Citizen",
    "linkedin": r"linkedin",
}
EXP = re.compile(r"(valid|active|expir|exp\.?)\s*(till|until|through|on|date)?\s*:?\s*(\w+\s*)?(19|20)\d{2}", re.I)
CERT_SECTION = re.compile(r"^\s*(certifications?|certificates|education\s*(/|&|and)\s*certifications?|licen[sc]es? (&|and) certifications?)\s*:?\s*$", re.I | re.M)
DATE = re.compile(r"(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s*['’]?\s*(19|20)?\d{2}|\b(19|20)\d{2}\b", re.I)

files = sorted(f for f in os.listdir(src) if f.endswith(".txt") and not f.startswith("_"))
rows = []
cert_count = collections.Counter(); skill_count = collections.Counter(); role_count = collections.Counter()
pii_count = collections.Counter(); hashes = collections.defaultdict(list)
for f in files:
    t = open(os.path.join(src, f)).read()
    name = f.rsplit(".", 2)[0]
    certs = [c for c, p in CERTS.items() if re.search(p, t, re.I if c not in ("PMP","CSM (Scrum Master)","SAFe","CAPM","PgMP","AHM / Healthcare (AHIP)","PSM") else 0)]
    skills = [s for s, p in SKILLS.items() if re.search(p, t, re.I if s not in ("SAP","PHP","SQL","AWS") else 0)]
    head = (name + " " + t[:600]).lower()
    roles = [r for r, p in ROLE if re.search(p, head, re.I)] or ["(indefinido)"]
    yrs = [int(m.group(1)) for m in YEARS.finditer(t[:3000]) if 0 < int(m.group(1)) < 45]
    pii = [k for k, p in PII.items() if re.search(p, t, re.I)]
    has_section = bool(CERT_SECTION.search(t))
    has_exp = bool(EXP.search(t))
    years_found = [int(m.group(0)[-4:]) for m in re.finditer(r"\b(19|20)\d{2}\b", t)]
    latest = max(years_found) if years_found else None
    for c in certs: cert_count[c] += 1
    for s in skills: skill_count[s] += 1
    role_count[roles[0]] += 1
    for k in pii: pii_count[k] += 1
    norm = re.sub(r"\W+", "", t.lower())[:4000]
    hashes[hashlib.md5(norm.encode()).hexdigest()].append(name)
    rows.append(dict(name=name, words=len(t.split()), certs=certs, skills=skills, role=roles[0], years=max(yrs) if yrs else None, pii=pii, cert_section=has_section, has_expiry=has_exp, latest_year=latest))

N = len(rows)
print("N =", N)
print("\n== Papel principal (heurística por nome/topo) ==")
for k, v in role_count.most_common(): print(f"  {k:28s} {v:4d}  {100*v/N:5.1f}%")
print("\n== Certificações mencionadas (nº de currículos) ==")
for k, v in cert_count.most_common(): print(f"  {k:34s} {v:4d}  {100*v/N:5.1f}%")
nocert = sum(1 for r in rows if not r["certs"])
print(f"  -> sem nenhuma certificação detectada: {nocert} ({100*nocert/N:.1f}%)")
print(f"  -> com seção explícita de certificações: {sum(r['cert_section'] for r in rows)}")
print(f"  -> mencionam validade/expiração: {sum(r['has_expiry'] for r in rows)}")
print("\n== Skills / domínios ==")
for k, v in skill_count.most_common(): print(f"  {k:30s} {v:4d}  {100*v/N:5.1f}%")
print("\n== Dados pessoais presentes ==")
for k, v in pii_count.most_common(): print(f"  {k:15s} {v:4d}  {100*v/N:5.1f}%")
ys = [r["years"] for r in rows if r["years"]]
print(f"\n== Anos de experiência declarados: {len(ys)} com valor; mediana {sorted(ys)[len(ys)//2]}, min {min(ys)}, max {max(ys)}")
ly = collections.Counter(r["latest_year"] for r in rows)
print("== Ano mais recente citado no currículo (proxy de 'última atualização') ==")
for k in sorted(k for k in ly if k): print(f"  {k}: {ly[k]}")
print("\n== Duplicatas exatas (texto normalizado) ==")
for h, ns in hashes.items():
    if len(ns) > 1: print("  ", ns)
# near-dup by name stem
stems = collections.defaultdict(list)
for r in rows:
    s = re.sub(r"[^a-z]", "", r["name"].lower().split()[0].split("_")[0].split("-")[0])
    stems[s].append(r["name"])
print("\n== Mesmo primeiro nome (possíveis versões da mesma pessoa) ==")
for s, ns in sorted(stems.items()):
    if len(ns) > 1: print(f"  {s}: {ns}")
json.dump(rows, open(os.path.join(src, "_profiles.json"), "w"), indent=1)
