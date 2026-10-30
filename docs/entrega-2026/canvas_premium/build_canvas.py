#!/usr/bin/env python3
"""Render the Aptus architecture as an exact SVG / vector PDF / PNG canvas.

This is the proposed production architecture, not executed AI infrastructure.
The .canvas companion uses the public JSON Canvas schema and remains editable.
"""
from __future__ import annotations

import json
import math
from pathlib import Path
from xml.sax.saxutils import escape

import fitz
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

ROOT = Path(__file__).parent
W, H = 2040, 1180
SCALE = (17 / 2.54 * 72) / W
FONT_DIR = Path('/usr/share/fonts/truetype/dejavu')
pdfmetrics.registerFont(TTFont('AptusSans', str(FONT_DIR / 'DejaVuSans.ttf')))
pdfmetrics.registerFont(TTFont('AptusSansBold', str(FONT_DIR / 'DejaVuSans-Bold.ttf')))

COLORS = {
    'bg': '#17191F', 'panel': '#1D2028', 'card': '#252932',
    'line': '#424957', 'text': '#F4F5FA', 'muted': '#C1C8D6',
    'faint': '#8E98A9', 'violet': '#B9A5FA', 'blue': '#91C3F4',
    'mint': '#87D9B9', 'white': '#FFFFFF',
}

class Painter:
    def __init__(self):
        self.svg = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">']
        self.pdf = canvas.Canvas(str(ROOT / 'APTUS_Canvas_Premium.pdf'), pagesize=(W*SCALE,H*SCALE))
        self.pdf.setTitle('APTUS Pipeline técnico e plano de implantação')
        self.pdf.setAuthor('Equipe Aptus')
        self.pdf.scale(SCALE,SCALE)

    @staticmethod
    def rgb(c):
        return tuple(int(c[i:i+2],16)/255 for i in (1,3,5))

    def rect(self,x,y,w,h,fill,stroke=None,r=0,sw=1):
        self.svg.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" stroke="{stroke or "none"}" stroke-width="{sw}"/>')
        self.pdf.setFillColorRGB(*self.rgb(fill))
        if stroke:
            self.pdf.setStrokeColorRGB(*self.rgb(stroke))
        self.pdf.setLineWidth(sw)
        self.pdf.roundRect(x,H-y-h,w,h,r,stroke=bool(stroke),fill=1)

    def circle(self,x,y,r,fill):
        self.svg.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{fill}"/>')
        self.pdf.setFillColorRGB(*self.rgb(fill))
        self.pdf.circle(x,H-y,r,stroke=0,fill=1)

    def text(self,x,y,s,size=34,color=None,bold=False,anchor='start'):
        color=color or COLORS['text']
        weight=700 if bold else 400
        self.svg.append(f'<text x="{x}" y="{y}" font-family="DejaVu Sans, sans-serif" font-size="{size}" font-weight="{weight}" text-anchor="{anchor}" fill="{color}">{escape(s)}</text>')
        self.pdf.setFillColorRGB(*self.rgb(color))
        self.pdf.setFont('AptusSansBold' if bold else 'AptusSans',size)
        fn={'start':self.pdf.drawString,'middle':self.pdf.drawCentredString,'end':self.pdf.drawRightString}[anchor]
        fn(x,H-y,s)

    def path(self,segments,color,sw=4,dashed=False,arrow=None):
        d=[]; p=self.pdf.beginPath()
        for kind,*pts in segments:
            d.append(kind+' '+' '.join(str(v) for v in pts))
            if kind=='M':p.moveTo(pts[0],H-pts[1])
            elif kind=='L':p.lineTo(pts[0],H-pts[1])
            elif kind=='C':p.curveTo(pts[0],H-pts[1],pts[2],H-pts[3],pts[4],H-pts[5])
        dash=' stroke-dasharray="12 10"' if dashed else ''
        self.svg.append(f'<path d="{" ".join(d)}" fill="none" stroke="{color}" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round"{dash}/>')
        self.pdf.setStrokeColorRGB(*self.rgb(color)); self.pdf.setLineWidth(sw)
        self.pdf.setLineCap(1); self.pdf.setLineJoin(1); self.pdf.setDash([12,10] if dashed else [])
        self.pdf.drawPath(p,stroke=1,fill=0); self.pdf.setDash([])
        if arrow:
            x,y,direction=arrow
            angle={'right':0,'down':math.pi/2,'left':math.pi,'up':-math.pi/2}[direction]
            size=17
            pts=[(x,y),(x-size*math.cos(angle)-size*.57*math.sin(angle),y-size*math.sin(angle)+size*.57*math.cos(angle)),(x-size*math.cos(angle)+size*.57*math.sin(angle),y-size*math.sin(angle)-size*.57*math.cos(angle))]
            self.svg.append(f'<polygon points="{" ".join(f"{a},{b}" for a,b in pts)}" fill="{color}"/>')
            q=self.pdf.beginPath();q.moveTo(pts[0][0],H-pts[0][1]);q.lineTo(pts[1][0],H-pts[1][1]);q.lineTo(pts[2][0],H-pts[2][1]);q.close()
            self.pdf.setFillColorRGB(*self.rgb(color));self.pdf.drawPath(q,stroke=0,fill=1)

    def save(self):
        self.svg.append('</svg>')
        (ROOT / 'APTUS_Canvas_Premium.svg').write_text('\n'.join(self.svg),encoding='utf-8')
        self.pdf.showPage();self.pdf.save()


def render():
    p=Painter()
    c=COLORS
    p.rect(0,0,W,H,c['bg'],r=0)
    # Sparse graph paper, low contrast. Diagram content stays in opaque cards.
    for x in range(24,W,32):
        for y in range(20,H,32):
            p.circle(x,y,1.35,'#2B303A')

    p.text(58,72,'APTUS',size=53,bold=True)
    p.text(283,70,'Pipeline e plano de implantação',size=39,color=c['muted'])
    p.text(58,119,'Arquitetura proposta · demonstração simulada',size=34,color=c['muted'])
    p.rect(1790,45,195,58,'#282634',stroke='#48405E',r=18)
    p.text(1887,85,'D03',size=34,color=c['violet'],bold=True,anchor='middle')

    xs=[56,716,1376]
    # Lane frames express distinct engineering responsibilities.
    for x in xs:
        p.rect(x-13,151,634,535,c['panel'],stroke='#353A46',r=27,sw=2)
    for i,(label,color) in enumerate([('01  EVIDÊNCIAS',c['blue']),('02  INTERPRETAÇÃO',c['violet']),('03  DECISÃO',c['mint'])]):
        p.text(xs[i]+22,196,label,size=34,color=color,bold=True)

    top,bottom,h,cw=224,490,174,608
    nodes=[
      (xs[0],top,'Docling + LLM Qwen',['editais, currículos e eventos','fatos com origem'],c['blue']),
      (xs[0],bottom,'PostgreSQL + pgvector',['fatos · fontes · versões','busca híbrida'],c['blue']),
      (xs[1],top,'RAG + Qwen',['contexto recuperado','critérios propostos'],c['violet']),
      (xs[1],bottom,'Jev',['aderência e ambiguidades','respostas tipadas'],c['violet']),
      (xs[2],top,'Java + OR-Tools',['regras e pontos · CP-SAT','equipe sob restrições'],c['mint']),
      (xs[2],bottom,'Dossiê com fontes',['Qwen redige; Jev revisa','Java valida referências'],c['mint']),
    ]

    # Exact path is independent of semantic retrieval.
    p.path([('M',580,bottom),('L',580,462),('C',580,448,588,442,604,442),('L',1434,442),('C',1453,442,1460,434,1460,418),('L',1460,top+h)],c['blue'],sw=4,dashed=True,arrow=(1460,top+h,'up'))
    p.rect(1095,415,268,52,c['panel'],r=16)
    p.text(1229,452,'SQL exato',size=34,color=c['blue'],bold=True,anchor='middle')

    # Main semantic path with slight bridge at the exact-route crossing.
    p.path([('M',360,top+h),('L',360,bottom)],c['blue'],sw=4,arrow=(360,bottom,'down'))
    p.path([('M',664,bottom+87),('C',692,bottom+87,688,top+87,716,top+87)],c['violet'],sw=4,arrow=(716,top+87,'right'))
    p.path([('M',1020,top+h),('L',1020,425),('C',1040,430,1040,452,1020,458),('L',1020,bottom)],c['violet'],sw=4,arrow=(1020,bottom,'down'))
    p.path([('M',1324,bottom+87),('C',1353,bottom+87,1348,top+87,1376,top+87)],c['violet'],sw=4,arrow=(1376,top+87,'right'))
    p.path([('M',1680,top+h),('L',1680,bottom)],c['mint'],sw=4,arrow=(1680,bottom,'down'))

    # Recovery is a first-class loop: accepted proof changes the versioned base.
    p.rect(56,736,1928,94,'#1E302E',stroke='#42685C',r=25,sw=2)
    p.circle(92,783,8,c['mint'])
    p.text(118,795,'Recovery',size=37,color=c['mint'],bold=True)
    p.text(349,795,'prova verificada + aceita → recálculo e recomposição',size=34,color='#D8F0E6')
    p.path([('M',1984,top+87),('C',2012,top+87,2012,330,2012,355),('L',2012,755),('C',2012,775,2004,783,1984,783)],c['mint'],sw=4,arrow=(1984,783,'left'))
    p.path([('M',360,736),('L',360,bottom+h)],c['mint'],sw=4,arrow=(360,bottom+h,'up'))
    p.text(1018,884,'RH verifica provas · Licitações aprova · PMO confirma agenda',size=34,color=c['muted'],anchor='middle')

    # Main cards are drawn last, letting arrows meet cleanly at their edge.
    for x,y,title,lines,color in nodes:
        p.rect(x,y,cw,h,c['card'],stroke='#4B5363',r=20,sw=2)
        p.rect(x+18,y+25,5,124,color,r=2)
        p.text(x+42,y+52,title,size=37,bold=True)
        for j,body in enumerate(lines):
            p.text(x+42,y+101+j*43,body,size=34,color=c['muted'])

    p.text(58,954,'PLANO DE IMPLANTAÇÃO',size=34,color=c['faint'],bold=True)
    phases=[('01  MOCK','Fluxo sintético',c['violet']),('02  PILOTO','Qualidade, tempo e custo',c['blue']),('03  INTEGRAÇÕES','Expansão aprovada',c['mint'])]
    for i,(title,body,color) in enumerate(phases):
        x=xs[i]
        p.rect(x,983,cw,135,'#20242C',stroke='#4A5261',r=20,sw=2)
        p.text(x+30,1032,title,size=35,color=color,bold=True)
        p.text(x+30,1083,body,size=34,color=c['muted'])
        if i<2:
            p.path([('M',x+cw+7,1050),('L',xs[i+1]-9,1050)],'#9BA9BE',sw=4,arrow=(xs[i+1]-9,1050,'right'))
    p.save()
    d=fitz.open(ROOT / 'APTUS_Canvas_Premium.pdf')
    d[0].get_pixmap(matrix=fitz.Matrix(4080/d[0].rect.width,4080/d[0].rect.width),alpha=False).save(ROOT / 'APTUS_Canvas_Premium.png')


def make_obsidian():
    # Standard JSON Canvas; native rendering follows the user's Obsidian theme.
    nodes=[
        {'id':'group_base','type':'group','x':30,'y':130,'width':660,'height':560,'label':'01 Evidências','color':'5'},
        {'id':'group_semantics','type':'group','x':700,'y':130,'width':660,'height':560,'label':'02 Interpretação','color':'6'},
        {'id':'group_decisions','type':'group','x':1370,'y':130,'width':660,'height':560,'label':'03 Decisão','color':'4'},
        {'id':'title','type':'text','x':30,'y':-75,'width':2000,'height':150,'text':'# APTUS\n## Pipeline e plano de implantação\nArquitetura proposta · demonstração simulada'},
    ]
    texts=[
      ('extract',56,224,608,174,'## Docling + LLM Qwen\nEditais, currículos e eventos\n\nExtração e estruturação com origem.','5'),
      ('base',56,490,608,174,'## PostgreSQL + pgvector\nFatos · fontes · versões\n\nRecuperação estruturada, textual e vetorial.','5'),
      ('rag',716,224,608,174,'## RAG + Qwen\nContexto recuperado → critérios propostos.','6'),
      ('jev',716,490,608,174,'## Jev\nAderência e ambiguidades\n\nJulgamentos semânticos com respostas tipadas.','6'),
      ('rules',1376,224,608,174,'## Java + OR-Tools\nJava aplica regras e calcula pontos.\n\nCP-SAT compõe a equipe sob restrições.','4'),
      ('dossier',1376,490,608,174,'## Dossiê com fontes\nQwen redige · Jev revisa\n\nJava valida referências; Licitações aprova.','4'),
      ('recovery',56,760,1928,150,'## Recovery\nProva verificada pelo RH + aceita para o edital → base atualizada → nova execução das regras e da composição.','4'),
      ('approvals',56,945,1928,120,'**Decisões humanas:** RH verifica provas; Licitações aprova critérios e dossiê; PMO confirma a disponibilidade.\n\nO recebimento de arquivo, isoladamente, não muda a pontuação.',''),
      ('mock',56,1140,608,155,'## 01 Mock\nFluxo sintético e transições coerentes.','6'),
      ('pilot',716,1140,608,155,'## 02 Piloto\nMedir qualidade, tempo, revisão humana e custo.','5'),
      ('integration',1376,1140,608,155,'## 03 Integrações\nExpansão gradual após aprovação dos critérios de avanço.','4'),
    ]
    for nid,x,y,w,h,text,color in texts:
        n={'id':nid,'type':'text','x':x,'y':y,'width':w,'height':h,'text':text}
        if color:n['color']=color
        nodes.append(n)
    def edge(i,a,b,as_,bs_,label='',color=''):
        d={'id':i,'fromNode':a,'fromSide':as_,'toNode':b,'toSide':bs_,'toEnd':'arrow'}
        if label:d['label']=label
        if color:d['color']=color
        return d
    edges=[
        edge('e1','extract','base','bottom','top',color='5'),
        edge('e2','base','rag','right','left',color='6'),
        edge('e3','rag','jev','bottom','top',color='6'),
        edge('e4','jev','rules','right','left','critérios revisados','6'),
        edge('e5','base','rules','top','bottom','SQL exato preserva candidatos conhecidos','5'),
        edge('e6','rules','dossier','bottom','top',color='4'),
        edge('e7','rules','recovery','right','right','lacuna documental','4'),
        edge('e8','recovery','base','top','bottom','prova aceita; recalcular','4'),
        edge('e9','mock','pilot','right','left','plano','5'),
        edge('e10','pilot','integration','right','left','plano','4'),
    ]
    (ROOT / 'APTUS_Pipeline_e_Plano.canvas').write_text(json.dumps({'nodes':nodes,'edges':edges},ensure_ascii=False,indent=2),encoding='utf-8')
    (ROOT / 'LEIA_ME_Canvas.md').write_text('''# Aptus Canvas técnico

O SVG, o PNG e o PDF apresentam a mesma figura editorial. O arquivo `.canvas` preserva os nós e ligações em JSON Canvas para edição no Obsidian; o visual dentro do aplicativo segue o tema instalado.

## Dimensões e inserção

- Canvas: 2040 × 1180 unidades.
- PNG: 4080 × 2360 px.
- PDF vetorial: 17 × 9,833 cm.
- Inserir no resumo com **17 cm de largura**, sem esticar; altura resultante de 9,833 cm.
- Texto de conteúdo: 34 unidades ou mais, equivalente a 8 pt ou mais na largura recomendada.

## Leitura

Azul identifica a base e a rota SQL. Lavanda identifica a interpretação semântica. Verde identifica decisão, dossiê e recuperação de provas. A rota SQL conserva candidatos estruturados. Recovery representa nova prova verificada e aceita, seguida de recálculo. A faixa inferior é o plano de implantação.

A arquitetura de produção está proposta. A demonstração utiliza dados sintéticos e processamento simulado. Jev não substitui o cálculo em Java nem o otimizador CP-SAT. As aprovações humanas permanecem na operação.

Fonte de arquitetura: `APTUS_3_1_Blueprint.md`, especialmente seções 2, 6, 8, 10, 11 e 12. Este arquivo não altera as decisões arquiteturais.

Para reproduzir, executar `build_canvas.py` com o runtime Python primário que contém ReportLab e PyMuPDF.
''',encoding='utf-8')

if __name__=='__main__':
    render();make_obsidian()
    print('Rendered', ROOT)
