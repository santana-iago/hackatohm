# Aptus 3.1 — Registro das correções de engenharia

Revisão 1 · 26/10/2026 · Referência: `APTUS_3_1_Blueprint.md`.

## Escopo e estado

Esta revisão preserva os 18 capítulos, os três diagramas, os seis pipelines, os módulos e a escolha de tecnologias do Aptus. Corrige semântica de regras, contratos entre módulos, transações, métricas e condições de aprovação. Não cria produto, módulo ou integração adicional.

**Estado:** correções incorporadas à especificação. A implementação correspondente e os 60 critérios de aceitação ainda precisam de execução e evidência pela equipe. Conferência aritmética e revisão documental não são homologação de software.

## Correções e critérios verificáveis

| ID | Lacuna concreta e decisão incorporada | Local e módulos existentes | Aceite |
|---|---|---|---|
| C01 | Condições de experiências distintas poderiam ser unidas. Cada regra declara vínculos de pessoa, participação, projeto, função e período; documentos complementares só compõem a mesma experiência quando consistentes. | §§4–5; TenderCompiler, EligibilityEngine | T39–T40 |
| C02 | Somar notas individuais poderia usar a mesma unidade duas vezes. ScoringEngine entrega unidades e restrições; TeamOptimizer resolve seu uso conjunto. Mínimos que dependem da composição também são conjuntos. | §§5 e 7; ScoringEngine, TeamOptimizer | T41–T42 |
| C03 | Preferência interna poderia vencer desempate do edital. Ordem explícita: eliminatórias, nota técnica, desempates editalícios aplicáveis, preferências internas. | §7; TeamOptimizer | T43 |
| C04 | OPTIMAL bruto poderia ser apresentado como prova da maior nota. Registrar objetivo, escala, fase, parâmetros, solução e limite; certificar cada objetivo separadamente. | §7; TeamOptimizer, ScoringEngine | T44–T46 |
| C05 | Melhora da solução encontrada poderia virar ganho de Recovery. Comparar ótimos demonstrados ou intervalos; mesma versão, universo e condições; baseline sem solução não vira zero. | §8.1; RecoveryService, TeamOptimizer | T19–T21, T47–T48 |
| C06 | Horas semanais e duas reservas pendentes poderiam esconder conflito. Conferir granularidade, coexistência, exclusividade, validade pelo relógio e capacidade no momento da decisão. | §§7 e 11; AvailabilityService, WorkflowService | T16–T17, T24, T51–T53 |
| C07 | Revogação conhecida hoje poderia invalidar indiscriminadamente o passado. Separar data de conhecimento, emissão, vigência e efeito; revisar usos alcançados e manter histórico. | §§3–4; EvidenceService, EligibilityEngine | T02, T13, T26, T49 |
| C08 | Ausência de fonte, prazo encerrado e emissão posterior estavam misturados. Competência desconhecida é distinta de falha documental conclusiva; admissibilidade depende da fase e eventual diligência autorizada. | §§3–5; TenderCompiler, EvidenceService | T38, T50 |
| C09 | Manifesto interno completo poderia significar edital atualizado. Registrar consulta à fonte oficial, responsável, horário e resultado; indisponibilidade não confirma atualidade. | §5.2; TenderCompiler, WorkflowService | T10, T23, T54 |
| C10 | Dossiê da equipe aprovado poderia parecer proposta integral enviada. Estado parcial explícito, aprovação dos artefatos finais, exportação com hash e eventual registro externo com protocolo. | §8/F; DossierService, AuditService | T31, T36, T55–T56 |
| C11 | Retentativa ou worker atrasado poderia duplicar/reescrever resultados. Idempotência vinculada ao payload e versão; token vigente para publicar; autorização no servidor e cache sujeito a política atual. | §§10–11; WorkflowService, AuditService, adaptadores | T23, T25, T27, T30 |
| C12 | Ações manuais na indisponibilidade poderiam desaparecer após restauração. Conciliar compromissos/documentos antes de liberar decisões afetadas; sem repetição de entrega. | §11.1; WorkflowService, AuditService | T57 |
| C13 | Conferência de autenticidade poderia aprovar uso em qualquer edital. Revisão E3 dispara avaliação específica; E4 depende da regra e condições daquela disputa. DTOs carregam versões e testemunhas entre módulos. | §§3, 8 e 13; EvidenceService, EligibilityEngine | T28, T31, T40 |
| C14 | Avaliação de IA poderia misturar fontes de treino/teste e medir somente pares já selecionados. Partições agrupadas, corte histórico, documentos completos e comparação com mesmos componentes objetivos; medir erros e esforço humano por etapa. | §§10.2 e 12.3; responsáveis pelo benchmark | T58–T59 |
| C15 | Custo/tempo poderia omitir preparação, colaboradores ou oportunidades abandonadas. Coorte única, TCO completo, primeira utilização versus reuso, denominadores explícitos e critérios de avanço fixados antes dos resultados. | §12; responsáveis pelo piloto | T60 |

## Contrato de passagem entre os módulos

1. **TenderCompiler/RuleValidator:** regra aprovada com fonte, versão, fase, datas, unidade, vínculos, teto e reutilização.
2. **EligibilityEngine:** condição individual decidida com evidência; condição conjunta identificada para o modelo; UNKNOWN nunca tratado como prova aceita.
3. **ScoringEngine:** componentes pontuáveis e restrições de uso; nenhuma soma individual que esconda dependência entre funções.
4. **TeamOptimizer:** pessoas, papéis, unidades utilizadas, objetivo por fase, status bruto, limite e motivo de encerramento.
5. **ScoringEngine/AvailabilityService:** conferência independente do resultado e das condições atuais; divergência impede publicação.
6. **DossierService:** textos e anexos finais, permissões, aprovações e hash; exportar não significa protocolar uma proposta.

O mesmo manifesto identifica todas essas etapas. Reprocessamento não pode juntar regra nova, prova antiga e agenda desatualizada como se fossem uma execução coerente.

## Prioridade de implementação

**Antes de confirmar resultados do protótipo:** C01–C13, no escopo demonstrado. Adaptadores podem simular serviços e verificações, desde que identificados; regras e transições exibidas devem obedecer aos contratos. Se uma condição não for implementada, ela não pode aparecer como controle já validado.

**Antes de usar métricas para justificar expansão:** C14–C15 e o protocolo de piloto. Mostrar 31→35 em dados sintéticos prova a coerência daquele exemplo; não prova redução de horas, custo viável nem aumento de vitórias.

## Conferências executadas e limites

O arquivo `APTUS_3_1_Conferencia.md` registra as verificações realmente realizadas: estrutura documental, exemplos JSON, contas, enumeração da fixture, resumo de duas páginas e inspeção visual. A matriz T01–T60 é uma especificação de aceite; não deve ser marcada como aprovada sem execução na aplicação ou conferência do protocolo correspondente.

## Como tratar um novo defeito

Registrar contraexemplo, regra afetada, comportamento correto, módulos envolvidos e teste que o reproduz. Corrigir a seção existente e as dependências. Uma correção necessária continua permitida após o congelamento de escopo; alterações de arquitetura exigem justificativa própria e não fazem parte desta revisão.

**Critério de encerramento desta revisão:** nenhuma contradição material identificada fica apenas como recomendação vaga; cada achado tem comportamento especificado e teste associado. Isso não equivale à prova de inexistência de defeitos futuros.
