---
version: alpha
name: Aptus para Nexora
description: Ferramenta de trabalho para MacBook com listas, documentos e inspetores.
colors:
  primary: "#0C1BA8"
  ink: "#061F32"
  canvas: "#F5F5F4"
  content: "#FFFFFF"
  sidebar: "#EBEBEA"
  text: "#242424"
  secondary: "#656565"
  border: "#DEDEDD"
typography:
  sans:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
  mono:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace"
rounded:
  DEFAULT: "8px"
  sm: "5px"
  lg: "12px"
spacing:
  section-gap: "16px"
  page-padding: "24px"
components:
  button: {}
  table: {}
  dialog: {}
  sidebar: {}
  toolbar: {}
---

# Aptus para Nexora — sistema visual

## Overview

A interface segue padrões de aplicativos de produtividade do macOS. Referências: organização do [Finder](https://support.apple.com/guide/mac-help/mchlp2605/mac), [sidebars](https://developer.apple.com/design/human-interface-guidelines/sidebars) e [toolbars](https://developer.apple.com/design/human-interface-guidelines/toolbars) da Apple. É uma tradução web, sem janelas, menus do sistema ou botões fictícios de controle da janela.

Público: Licitações, RH, PMO e colaboradores fictícios. Trabalho: conferir pessoas, exigências e documentos. Idioma pt-BR. MacBook, teclado e mouse. Registro de produto interno, não marketing. A assinatura é a trilha da prova vinculada à parcela da pontuação.

Evitar: dashboard de cartões grandes, slogans, fundos lavanda, sombras por toda parte, todas as ações azuis, cabeçalhos sucessivos, títulos de landing page e documentos dentro de múltiplas caixas.

## Colors

Os tokens canônicos ficam em `src/styles/tokens.css`; este arquivo espelha a direção e os valores principais (modelo B). Componentes consomem variáveis CSS diretamente, sem segundo adaptador ou tema. Azul Nexora é reservado a ação principal, link e foco; seleção lateral cinza e linhas de tabela azul muito claro. Superfícies neutras distinguem navegação, área de trabalho e mesa de documento. Estados usam texto e ícone além da cor.

## Typography

Fonte de sistema, com SF quando disponível em macOS. Texto de operação 15 px, metadados 13 px; títulos de área 20 px e seções de 15–17 px. Modo gravação: 18 px, metadados 14 px e número 52 px. Reduzir repetições e espaços antes de reduzir texto. Números com tabular-nums. Não baixar nem redistribuir fontes Apple.

## Layout

Shell contínuo: sidebar de 216 px, toolbar de aproximadamente 60 px, identificação de simulação compacta, conteúdo e status inferior. `main` é o proprietário da rolagem vertical da aplicação. Navegação e barra de estado ficam acessíveis. Tabelas largas mantêm rolagem horizontal interna. Critérios dividem lista e leitor; Recovery é lista de solicitações; dossiê é documento com inspeção lateral. Em janela estreita a navegação recolhe e as regiões divididas viram uma coluna.

## Elevation & Depth

Bordas e tons separam áreas. Sem sombra em cada seção. Controles têm relevo de 1 px; documentos têm sombra discreta na mesa cinza; diálogos têm elevação própria. Transparência contida na navegação e toolbar, com fundo opaco equivalente.

## Shapes

Controles com raio de 5 px, grupos de 8 px, diálogos de 12 px. Avatares discretos e ícones sem bloco colorido decorativo. Não usar todas as superfícies como cápsulas. A área acionável dos controles usa no mínimo 40 px, ou 44 px em gravação.

## Components

`App.tsx` é dono de sidebar/toolbar/status. `components/ui.tsx` é dono de Panel, Dialog, Status, CommandButton e PageHeading. `Inspectors.tsx` contém as variantes de pessoa, evidência e agenda. `global.css` define o sistema e scrollbar global. As features usam esses componentes; não introduzir bibliotecas de UI ou fontes externas.

Botões: primário sólido Nexora; secundário branco/cinza, borda discreta. Foco explícito; hover, pressionado, disabled e busy definidos. Native selects mantêm geometria e popup do sistema por decisão desta interface. Tabelas são semânticas. Abas segmentadas conservam o estado e possuem navegação por teclado.

Diálogos: `dialog.showModal`, título acessível, Escape e foco devolvido. Perfil usa sheet de inspeção; evidência usa visualização de documento com metadados. Selo de demonstração permanece dentro de qualquer superfície sobreposta. Estado de negócio continua nos reducers, sem alteração visual da nota.

## Motion

Somente feedback curto de hover/foco e abertura. `prefers-reduced-motion` e modo reduzido removem movimento. Nenhuma animação de números, decoração automática ou efeito de cursor.

## Accessibility

Manter nomes acessíveis, contraste, foco, ações por teclado e leituras completas. Uma descrição longa pode ser recolhida quando houver controle visível de expansão; nenhuma ação obrigatória fica dependente de hover. Todas as telas principais são conferidas em 1920×1080, 1440×900 e 1280×720.
