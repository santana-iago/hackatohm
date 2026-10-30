# Conferência documental — Aptus 3.1, revisão de engenharia 1

Verificações de concepção e artefatos executadas em 26/10/2026. Não equivalem à execução da aplicação Java/OR-Tools ou do benchmark de IA.

## Conferências realizadas

- 18 seções preservadas, seis pipelines, três diagramas e 60 cenários de aceitação, com IDs únicos e contínuos.
- Dois exemplos JSON sintaticamente válidos.
- Parágrafo de cooperação: 170 palavras, sem o marcador bibliográfico.
- PDF do guia: 36 páginas. PDF do resumo: 2 páginas.
- Inspeção visual de todas as páginas, diagramas e tabelas; sem sobreposição ou corte identificado.
- Conferência automática de texto dentro dos limites das páginas.
- Cenário de equipe verificado por enumeração exaustiva independente, sem executar o solver de produção.

## Enumeração do exemplo

| Provas novas aceitas | Gerente | Especialista | Pontos |
|---|---|---|---:|
| 0 | Carla | Diego | 31 |
| 0 | Diego | Eva | 30 |
| 0 | Carla | Eva | 29 |
| 1 | Carla | Diego | 33 |
| 1 | Carla | Eva | 31 |
| 1 | Diego | Eva | 30 |
| 2 | Carla | Diego | 35 |
| 2 | Carla | Eva | 33 |
| 2 | Diego | Eva | 30 |

Bruno está indisponível na tabela. Se ele ficar disponível, o baseline já alcança 35, portanto não há ganho de +4 atribuível à recuperação de Carla para a melhor equipe. Nenhum profissional ocupa dois papéis na mesma composição.

## Contraexemplos conferidos aritmeticamente

- Sem disponibilidade confirmada de Diego, Carla + Eva somam 29; não 31.
- Unidade X de 6 pontos utilizada uma única vez: A+B = 6. Com Y independente de 4 pontos, A+C = 10.
- Limites [30,40] e [35,40] admitem diferença entre ótimos de −5 a 10; adição monotônica comprovada permite restringir a 0–10, não afirmar ganho exato de 5.
- Essas conferências são referências pequenas em Python e aritmética, não execução do motor Java/OR-Tools.

## Conferência econômica

- 1.000 perfis × 4 revisões × 3 minutos = 200 horas anuais.
- 40 disputas × 20 horas × R$ 160/h = R$ 128.000 anuais no exemplo hipotético.
- Redução líquida de 40% = 320 horas e R$ 51.200 de capacidade liberada.
- Trabalho restante R$ 76.800 + despesas adicionais R$ 60.000 = TCO R$ 136.800; diferença de −R$ 8.800 frente ao baseline.
- As despesas adicionais não repetem horas já consideradas no trabalho restante.

## Não executado e pendências

- Os 60 cenários de aceitação ainda exigem implementação e evidência; T58–T60 verificam protocolo de benchmark/piloto.
- Sem benchmark Qwen/Jev, teste de carga, homologação jurídica/segurança ou integração corporativa.
- Nomes/identificadores dos integrantes e link final do vídeo devem ser preenchidos antes de enviar o resumo.
- Conferir o modelo oficial, prazo, duração do vídeo e acesso público/não listado após as edições.
- GitHub e submissão ao evento não foram alterados.
