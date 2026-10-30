# APTUS — teleprompter | Equipe Quatro e meio

A Nexora reúne mais de mil profissionais. Segundo o briefing, são cerca de quarenta disputas por ano, e os gestores gastam, juntos, de quinze a vinte e cinco horas por disputa procurando e ajustando currículos. Isso representa de seiscentas a mil horas anuais, além do risco de deixar de fora profissionais cuja experiência não foi localizada ou comprovada.

A contribuição do Aptus está na qualidade da implementação proposta. Integramos recuperação de evidências, modelos de linguagem, Jev, regras verificáveis e otimização para ligar cada recomendação às suas fontes. Essa arquitetura foi desenhada com responsabilidades claras, custo controlável e revisão humana nos pontos que exigem decisão.

Docling organiza os documentos e o LLM Qwen estrutura as informações. O PostgreSQL preserva fatos, fontes e versões. A recuperação híbrida localiza evidências para contextualizar o modelo pelo RAG. Jev avalia correspondências e ambiguidades entre requisitos e provas.

Licitações revisa os critérios; Java calcula elegibilidade e pontos; o OR-Tools compõe a equipe respeitando papéis e disponibilidade confirmada pelo PMO. A consulta SQL mantém candidatos conhecidos no processo, mesmo quando a similaridade textual é baixa.

Na saída, o LLM redige com fontes, Jev revisa a aderência semântica e Java confere referências. O dossiê passa por aprovação. A interpretação fica ligada a regras reproduzíveis e a responsáveis que podem revisar a decisão.

O exemplo utiliza dados sintéticos e processamento simulado. Escolher os profissionais isoladamente produz trinta pontos; considerar a composição conjunta chega a trinta e um. O Recovery identifica dois projetos já realizados que ainda precisam de atestados aceitos.

Receber o documento não altera a pontuação. Depois da verificação, do aceite no edital e de novo cálculo, ela passa para trinta e três. Com a segunda prova, chega a trinta e cinco. A interface mostra a regra e a evidência de cada parcela. Essa é uma demonstração da lógica, não uma medição de resultado comercial.

O plano usa um núcleo Java e PostgreSQL, modelos locais leves e processamento incremental, com filas e limites de execução. O custo total inclui implantação, infraestrutura, APIs, manutenção e revisão humana. No cenário de quarenta disputas de vinte horas, uma redução líquida hipotética de quarenta por cento liberaria trezentas e vinte horas anuais. O piloto precisa demonstrar que o benefício compensa os custos adicionais.

A arquitetura prevê permissões por papel e finalidade antes de recuperar qualquer trecho, parsers isolados e modelos sem privilégios administrativos. Falhas e ambiguidades seguem para revisão, com histórico e contingência manual. O uso de dados reais exige definição de finalidade, base legal e retenção. Serviços externos dependem de avaliação contratual e, quando aplicável, de transferência internacional. Esses controles serão testados antes de ampliar o uso.

Eventos de projetos, campanhas e indicações geram atualizações para confirmação. RH mantém o cadastro, PMO responde pela agenda e Licitações pelos critérios. A implantação começa em uma área, medindo também a adesão e a fila de revisão.

A EloGroup contribuiria com regras e casos de negócio. O CEFET-MG agregaria desenvolvimento de software, inteligência artificial e pesquisa operacional para avaliar o piloto. O Aptus propõe uma implementação moderna, verificável e progressiva, cujo avanço depende de qualidade e viabilidade demonstradas.
