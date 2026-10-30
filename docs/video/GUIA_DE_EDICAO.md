# APTUS — gravação para o pitch de 4min55s

## Arquivo principal

`APTUS_Pitch_4m55_FullHD_sem_audio.mp4`

Gravação da interface real do protótipo em Chromium, montada a partir de tomadas com checkpoints completos. A execução de negócio permanece local e simulada, com dados fictícios. O trecho técnico apresenta a arquitetura proposta, sem executar seus serviços.

- Resolução: 1920 × 1080, proporção 16:9.
- Duração: 4min55s.
- Formato de edição: MP4, H.264, 25 quadros por segundo, yuv420p.
- Sem áudio, narração, música, webcam ou legendas gravadas sobre a imagem.
- Selo de demonstração preservado; arquitetura identificada como proposta.
- Cortes entre tomadas, sem acelerar os cliques dentro de cada capítulo. A montagem remove pausas iniciais de preparação e sustenta o último quadro real de 35 pontos por dois segundos adicionais para leitura.

## Como editar com a sua fala

1. Crie uma sequência de 1920 × 1080 a 25 fps no seu editor.
2. Coloque o MP4 na faixa de vídeo e sua gravação de voz/câmera em outra faixa.
3. Alinhe o início da fala “A Nexora possui...” ao tempo 00:00.
4. Se sua cadência for diferente, use os oito arquivos em `chapters/`. Eles permitem mover cortes e prolongar as pausas sem alterar a sequência causal dos pontos.
5. `GUIAS_DE_EDICAO.srt` contém marcadores opcionais de cenas e estados. As bordas dos capítulos são exatas; as ações intermediárias servem como referências aproximadas de edição. Importe como referência e desative essa faixa na exportação se quiser o fundo limpo. Não é uma transcrição de áudio.
6. Ao sobrepor sua câmera, preserve a identificação de simulação e as regras, documentos e notas que estiver explicando.

## Sincronização com o roteiro fornecido

| Tempo do pitch | Arquivo em `chapters/` | Conteúdo capturado |
|---|---|---|
| 00:00–00:30 | `01-problema.mp4` | Central Aptus/Nexora, disputa ENE-001, pendências e abertura da oportunidade. |
| 00:30–00:55 | `02-solucao.mp4` | Critérios, composição e diretório da Base Viva. |
| 00:55–01:35 | `03-descoberta.mp4` | Regra G-ENERGIA e fonte; pesquisa na amostra; experiências de Carla; revisão e aceites iniciais. |
| 01:35–02:10 | `04-comprovacao.mp4` | Participação conhecida, documento apresentado, verificação RH, uso ainda em análise e confirmação PMO. |
| 02:10–03:00 | `05-otimizacao-recovery.mp4` | Escolha isolada 30 → comparação 31 → aceite Aurora e recálculo 33 → aceite Vale do Sol e recálculo 35. |
| 03:00–03:25 | `06-dossie-base-viva.mp4` | Revisão/aprovação do dossiê, download real do PDF e exemplos de Descoberta, Connect e reconhecimento. |
| 03:25–04:35 | `07-arquitetura.mp4` | Cinco etapas da arquitetura proposta e revelação do canvas oficial completo. |
| 04:35–04:55 | `08-encerramento.mp4` | Snapshot aprovado de 35 pontos e retorno à central. |

### Arquitetura — os cinco cortes do seu plano

| Tempo | Destaque |
|---|---|
| 03:25–03:40 | Documentos → Docling/Qwen → PostgreSQL/pgvector. |
| 03:40–03:53 | Rotas SQL e vetorial; recuperação de contexto por RAG. |
| 03:53–04:10 | Jev/System One, respostas estruturadas e correspondência sob revisão. |
| 04:10–04:25 | Java, regras e pontos; OR-Tools e restrições. |
| 04:25–04:35 | Canvas oficial inteiro e retorno de provas pelo Recovery. |

## Cortes e estados que devem ser preservados

- As tomadas usam checkpoints e formam uma montagem. Não são uma única sessão ininterrupta desde o cadastro inicial.
- Na tomada principal de Recovery, os dois atestados já foram apresentados e verificados por RH. A tela mostra esse estado e os 31 pontos permanecem atuais até o aceite. O arquivo de guias identifica essa condição.
- Aurora só acrescenta pontos após o aceite de Licitações e o recálculo. O mesmo vale para Vale do Sol, que é outro projeto.
- A tomada alternativa `extras/Recovery_etapas_completas.mp4` conserva mais cliques de apresentação e verificação da segunda prova. Use-a se quiser alongar essa explicação. A apresentação/verificação de Aurora também aparece no capítulo 04.
- “Recebido”, “verificado” e “aceito” não devem ser cortados como se fossem a mesma decisão.
- A pesquisa gravada filtra a amostra local. Ela não demonstra um motor semântico executado. A busca semântica é descrita no trecho de arquitetura proposta.
- O PDF foi baixado pela própria aplicação; não houve envio a contratante.
- A atualização de Lia e a indicação de Marina não alteram o snapshot técnico de 35 pontos.

## Materiais adicionais

- `ROTEIRO_NARRACAO_FORNECIDO.txt`: cópia do texto que você anexou, para consulta.
- `GUIAS_DE_EDICAO.srt`: marcadores opcionais, sem queima na imagem.
- `SINCRONIZACAO.csv`: limites dos capítulos e ações para localizar cortes.
- `assembly-report.json`: duração, codec, dimensões e contagem de quadros conferidos pelo encoder.
- `verification.json`: conferência final de mídia e estados capturados.
- `preview-contato.jpg`: visão geral de quadros extraídos do vídeo.
- O resumo PDF exportado durante a tomada acompanha o pacote.

## Reprodução técnica

Os scripts ficam em `scripts/record-pitch.mjs` e `scripts/assemble-pitch.py`. Requerem o build em um servidor local, Chromium/Chrome e FFmpeg com H.264. Use `APTUS_DEMO_URL` para indicar o servidor e `FFMPEG_BIN` para o executável do encoder.

```bash
npm run build
npm run preview -- --port 4174
node scripts/record-pitch.mjs
FFMPEG_BIN=/caminho/ffmpeg python3 scripts/assemble-pitch.py
```

O diretório `raw/` contém gravações de trabalho com claquete magenta de sincronização. A montagem remove integralmente essas claquetes. Use os MP4 de entrega no editor.

Para a prévia local no servidor Vite, a entrega foi exposta em `/video-pitch/` com um link local de `dist/video-pitch` para `../artifacts/video-pitch`. Esse link é um artefato de prévia e pode ser recriado após outro build. O servidor deve suportar requisições HTTP Range para avançar no vídeo; abrir o MP4 diretamente em um player/editor também funciona sem servidor.
