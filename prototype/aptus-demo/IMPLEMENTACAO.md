# Execução — Aptus para Nexora

Protótipo demonstrativo especificado em 27/10/2026. Código em `prototype/aptus-demo`, com dados sintéticos e processamento local.

## Decisões

- React + TypeScript + Vite, CSS próprio com tokens fornecidos, Lucide e jsPDF locais. Não havia frontend aproveitável.
- O diretório do protótipo mantém a análise Python e a documentação existentes separadas do frontend.
- Implementação organizada nas oito etapas registradas abaixo.
- Estado único; comandos por ator; cálculo por unidades únicas de evidência; snapshot imutável vinculado à revisão.

## Progresso

1. Fundação/identidade/navegação: concluído.
2. Fixture/comandos/avaliação/testes: concluído.
3. Base Viva/critérios/comparação/agenda: concluído.
4. Recovery/inspetor: concluído.
5. Dossiê/PDF: concluído.
6. Descoberta/Connect/reconhecimento: concluído.
7. Checkpoints/reset/API/captura: concluído.
8. Percurso/capturas/roteiro/conferência: concluído.

## Contratos

`src/demo/types.ts` compartilhado. React usa `useDemo()` com `{state,command,navigate,inspect,setActor,loadScene,busy}`. `command(DemoCommand):Promise<void>`. Reducer valida ator. IDs: juliana, beatriz, andre, p-\* colaboradores. Records por ID. `inspect(type,id)` abre UI. Documentos: `getDocument(evidence)` e `editalPages`. PDF recebe somente DossierSnapshot.


## Fechamento e decisões de revisão

- Revisão independente identificou e corrigiu: aceite antigo reaproveitado após reenvio; lote de revisão continuando após reset; status de exportação incompleto na API; estado visual persistindo ao restaurar a mesma cena.
- Reenvio retira aceites do documento; RH não concede novo aceite de Licitações. Teste de regressão mantém 33 até novo aceite e recálculo.
- Lotes e downloads respeitam geração; inspetores e conteúdo remontam em cada restauração, incluindo a mesma cena.
- PDF carregado sob demanda e incluído em busy/waitUntilIdle; metadados determinísticos.
- Conferência final: lint/typecheck/build, 12 testes unitários e 9 E2E (três viewports) passaram. Resultados detalhados em VERIFICACAO.md.
- Limites explícitos: Safari/macOS e zoom nativo não executados; vídeo final não gravado. Nenhum recurso P0 de negócio ficou pendente.
