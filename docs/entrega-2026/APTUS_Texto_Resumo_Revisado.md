# APTUS: arquitetura de IA para equipes e propostas técnicas

## Síntese

O Aptus propõe à Nexora um pipeline de IA que encontra profissionais aderentes, apresenta experiências comprovadas e mantém a base atualizada. A contribuição da equipe está na qualidade da implementação proposta: integrar interpretação semântica, regras verificáveis e otimização, preservando a origem de cada decisão. RAG contextualiza o LLM, Jev classifica aderência, Java calcula pontos e OR-Tools compõe equipes sob restrições. O Recovery incorpora provas aceitas e recalcula a proposta. Pendências críticas bloqueiam a confirmação e seguem para revisão. A arquitetura prevê permissões por papel e finalidade antes da busca, parsers isolados, modelos sem privilégios administrativos, auditoria e contingência manual. Dados reais e serviços externos dependem de finalidade, base legal, contrato e avaliação da transferência internacional aplicável. A implantação começa com uma área e mede qualidade, esforço, custo e adesão. O cenário utiliza dados sintéticos; desempenho e viabilidade econômica serão verificados no piloto.

## Problema e objetivo

A Nexora reúne mais de 1.000 profissionais. O briefing estima 40 disputas anuais e 15–25 horas conjuntas de gestores por disputa: 600–1.000 horas/ano, a validar. Currículos dispersos, desatualização e provas ausentes ocultam competências e prejudicam a composição da equipe. O objetivo é recuperar informações, comprovar sua aderência ao edital e apresentar a equipe disponível, mantendo o acervo atualizado [1].

## Solução proposta

Docling extrai documentos e Qwen estrutura fatos; PostgreSQL guarda fontes e versões. O RAG combina recuperação textual, vetorial e estruturada para contextualizar a análise. Jev avalia correspondências e ambiguidades; Licitações aprova critérios, e Java calcula elegibilidade e pontos. OR-Tools CP-SAT compõe equipes conforme regras e agenda confirmada pelo PMO. Busca SQL preserva candidatos conhecidos. Só provas verificadas pelo RH e aceitas no edital geram pontos após recálculo. O dossiê conserva fatos e citações, com aprovação humana. Para sustentar a adesão, eventos de projetos, campanhas e indicações geram atualizações para confirmação; RH mantém o cadastro [2].

## Fundamentação e viabilidade

A implementação proposta usa núcleo Java/Spring e PostgreSQL, modelos locais leves, filas limitadas, reuso de verificações válidas e processamento incremental. O custo total inclui implantação amortizada, hardware, APIs, manutenção e horas de todas as áreas. Metas de qualidade, latência e revisão serão pactuadas antes do piloto. A expansão exige benefício líquido positivo, testes de segurança e avaliação jurídica [2,4].

## Resultados obtidos

Arquitetura e cenário sintético: 30→31 pontos por composição conjunta; 31→33→35 com dois projetos distintos comprovados (+2 cada), após aceite e recálculo. Mock planejado; integrações, desempenho e ganhos reais ainda não foram validados.

## Resultados esperados

Hipótese: 40 disputas/ano × 20 h/disputa, redução líquida de 40% e R$ 160/h liberariam 320 h/ano, equivalentes a R$ 51.200 de capacidade, antes das despesas adicionais. Premissas ilustrativas; economia de caixa não garantida.

## Afinidade empresa–CEFET-MG e perspectivas de cooperação

A EloGroup atua na combinação de tecnologia, dados e transformação de processos, enquanto o CEFET-MG reúne formação em engenharia de software, inteligência artificial, bancos de dados e pesquisa operacional. Essa afinidade permite desenvolver e avaliar o Aptus como pesquisa aplicada a uma necessidade empresarial concreta. A cooperação proposta começaria com uma área, 50–100 profissionais e 3–5 editais históricos, inicialmente com dados sintéticos e, posteriormente, dados autorizados em modo sombra. A empresa definiria critérios de negócio e disponibilizaria revisores; estudantes e docentes implementariam os módulos, testes e experimentos. O piloto compararia a arquitetura com busca manual e configurações simplificadas, medindo erros, cobertura documental, tempo, custo total, adesão e fila de revisão. RH verificaria evidências, PMO confirmaria disponibilidade e Licitações revisaria critérios e dossiês. A ampliação dependeria de resultados previamente pactuados, avaliação jurídica e testes de segurança. Contratos, finalidade, retenção, direitos dos titulares e eventual transferência internacional seriam tratados antes do uso de dados reais. A continuidade e a propriedade intelectual seguiriam os instrumentos institucionais, com participação da CIE/DEDC. Assim, ensino e pesquisa poderiam produzir uma implementação tecnicamente consistente e economicamente justificável [3,4].
