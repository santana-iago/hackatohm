# APTUS: roteiro do pitch orientado à avaliação

Uso interno da equipe. Meta de montagem: 4min50s, com pausas e transições a conferir no ensaio. Ler somente as falas; as cenas são orientações de gravação. A demonstração pressupõe o mock navegável. Manter as identificações de dados sintéticos e arquitetura proposta.

## 00:00–00:30 Problema quantificado

**Cena — não ler:** Abrir com o caso Nexora e a conta 40 × 15–25 = 600–1.000 horas por ano.

A Nexora reúne mais de mil profissionais. Segundo o briefing, são cerca de quarenta disputas por ano, e os gestores gastam, juntos, de quinze a vinte e cinco horas por disputa procurando e ajustando currículos. Isso representa de seiscentas a mil horas anuais, além do risco de deixar de fora profissionais cuja experiência não foi localizada ou comprovada.

## 00:30–00:55 Contribuição da equipe

**Cena — não ler:** Exibir Aptus e o canvas completo, identificado como arquitetura proposta.

A contribuição do Aptus está na qualidade da implementação proposta. Integramos recuperação de evidências, modelos de linguagem, Jev, regras verificáveis e otimização para ligar cada recomendação às suas fontes. Essa arquitetura foi desenhada com responsabilidades claras, custo controlável e revisão humana nos pontos que exigem decisão.

## 00:55–02:00 Pipeline de funcionamento

**Cena — não ler:** Percorrer os grupos Evidências, Interpretação e Decisão; destacar a rota SQL independente.

Docling organiza os documentos e o LLM Qwen estrutura as informações. O PostgreSQL preserva fatos, fontes e versões. A recuperação híbrida localiza evidências para contextualizar o modelo pelo RAG. Jev avalia correspondências e ambiguidades entre requisitos e provas.

Licitações revisa os critérios; Java calcula elegibilidade e pontos; o OR-Tools compõe a equipe respeitando papéis e disponibilidade confirmada pelo PMO. A consulta SQL mantém candidatos conhecidos no processo, mesmo quando a similaridade textual é baixa.

Na saída, o LLM redige com fontes, Jev revisa a aderência semântica e Java confere referências. O dossiê passa por aprovação. A interpretação fica ligada a regras reproduzíveis e a responsáveis que podem revisar a decisão.

## 02:00–02:55 Demonstração da lógica

**Cena — não ler:** Exibir 30→31; em seguida 31→33→35 com duas provas distintas aceitas e novos cálculos.

O exemplo utiliza dados sintéticos e processamento simulado. Escolher os profissionais isoladamente produz trinta pontos; considerar a composição conjunta chega a trinta e um. O Recovery identifica dois projetos já realizados que ainda precisam de atestados aceitos.

Receber o documento não altera a pontuação. Depois da verificação, do aceite no edital e de novo cálculo, ela passa para trinta e três. Com a segunda prova, chega a trinta e cinco. A interface mostra a regra e a evidência de cada parcela. Essa é uma demonstração da lógica, não uma medição de resultado comercial.

## 02:55–03:30 Viabilidade e impacto

**Cena — não ler:** Mostrar arquitetura enxuta, processamento incremental e hipótese 800h × 40% = 320h, com rótulo de projeção.

O plano usa um núcleo Java e PostgreSQL, modelos locais leves e processamento incremental, com filas e limites de execução. O custo total inclui implantação, infraestrutura, APIs, manutenção e revisão humana. No cenário de quarenta disputas de vinte horas, uma redução líquida hipotética de quarenta por cento liberaria trezentas e vinte horas anuais. O piloto precisa demonstrar que o benefício compensa os custos adicionais.

## 03:30–04:10 Confiabilidade segurança e jurídico

**Cena — não ler:** Exibir permissões antes da busca, documentos isolados e caminho de revisão humana.

A arquitetura prevê permissões por papel e finalidade antes de recuperar qualquer trecho, parsers isolados e modelos sem privilégios administrativos. Falhas e ambiguidades seguem para revisão, com histórico e contingência manual. O uso de dados reais exige definição de finalidade, base legal e retenção. Serviços externos dependem de avaliação contratual e, quando aplicável, de transferência internacional. Esses controles serão testados antes de ampliar o uso.

## 04:10–04:30 Adesão e implantação

**Cena — não ler:** Mostrar confirmação de atualização e as fases Mock, Piloto e Integrações.

Eventos de projetos, campanhas e indicações geram atualizações para confirmação. RH mantém o cadastro, PMO responde pela agenda e Licitações pelos critérios. A implantação começa em uma área, medindo também a adesão e a fila de revisão.

## 04:30–04:50 Cooperação e fechamento

**Cena — não ler:** Exibir EloGroup e CEFET-MG como participantes de uma cooperação proposta.

A EloGroup contribuiria com regras e casos de negócio. O CEFET-MG agregaria desenvolvimento de software, inteligência artificial e pesquisa operacional para avaliar o piloto. O Aptus propõe uma implementação moderna, verificável e progressiva, cujo avanço depende de qualidade e viabilidade demonstradas.

## Orientações de ensaio

- O pitch cobre as duas rubricas disponíveis: qualidade/viabilidade, problema, impacto, comunicação e diferenciação do briefing; inovação, aderência, viabilidade, impacto e fundamentação da página geral.
- O bloco técnico tem 65 segundos previstos. O canvas deve permanecer legível, com destaque progressivo dos grupos. A montagem seleciona tomadas do mock sem acrescentar todo o banco de três minutos ao roteiro.
- Os valores de 600–1.000 horas são uma conta sobre as premissas do briefing; 320 horas liberadas são uma hipótese. O exemplo 30/31/33/35 é sintético. Não afirmar economia real, melhora de taxa de vitória ou integração já validada.
- O cenário econômico completo do resumo assume R$160/h: 320h × R$160 = R$51.200 de capacidade, antes das despesas adicionais. O benefício precisa superar os custos totais adicionais; capacidade liberada não é caixa garantido.
- A evolução de 31 para 35 depende de duas provas distintas, verificadas, aceitas e recalculadas. O teto do cenário é 37, não 35. Falha, ausência de documento e incerteza não autorizam a aprovação.
- A redação descreve controles projetados. Benchmark, revisão contratual, testes de segurança e validação de integração ainda são condições de avanço. Não declarar conformidade LGPD concluída.
