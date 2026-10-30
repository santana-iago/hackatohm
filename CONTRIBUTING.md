# Como contribuir

Abra uma issue para relatar um problema ou discutir uma mudança. Em um pull request, descreva o comportamento alterado e os comandos usados para verificá-lo.

## Protótipo

O frontend fica em `prototype/aptus-demo/`. Depois de instalar as dependências com `npm ci`, execute os comandos relevantes à alteração:

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

Os testes de navegador precisam de Chromium disponível para o Playwright. As opções de ambiente estão no [README do protótipo](prototype/aptus-demo/README.md#verificar).

Ao alterar as regras, confira a sequência 31 → 33 → 35, a separação entre verificação e aceite da prova e a invalidação de cálculos antigos. As pessoas e os documentos da demonstração devem continuar fictícios.

## Documentação

Atualize o índice correspondente quando adicionar ou mover um material. Use links relativos para arquivos do repositório. Ao editar um Word, atualize também o PDF e confira a renderização.

Preserve as fontes, as hipóteses e a distinção entre o protótipo executável e as integrações de produção propostas. Não inclua currículos, extrações, credenciais ou outros documentos restritos na contribuição.
