# Sprint 4.1 — Resultado

## Resumo

`Combobox` e `MultiSelect` implementados em `@supertrans-transportes/ui` sobre o **Combobox do Base UI** (single e `multiple`) — sem cmdk, sem Radix, zero domínio. O MultiSelect é o componente único que substitui conceitualmente `multi-select` (10 telas) e `GroupedMultiSelect` (9 telas) do Aurora. 22 stories novas (Storybook: **155**), com `fn()` nos callbacks e play functions de teclado/interação. Inventário de primitives do Aurora: **100% coberto** (28 componentes no @supertrans-transportes/ui). Todas as validações e pureza verdes; nenhum portal alterado.

## Componentes implementados

`packages/ui/src/combobox/` e `packages/ui/src/multi-select/` (cada um: tsx + types + stories + index) + helpers compartilhados em `packages/ui/src/_internal/options.ts` (fora do barrel público).

## API final do Combobox

Conforme o plano (`value: string|null`, `onValueChange`, `options` plano/agrupado, `placeholder`, `searchPlaceholder`, `emptyMessage`, `disabled`, `clearable`, `className`, `contentClassName`) + `id`/`aria-label` para integração com Label. Padrão **input-driven**: o campo é o input de busca (padrão nativo do primitivo; `searchPlaceholder` mantido por compatibilidade — documentado). Limpar via parte `Clear`; chevron via `Trigger`; fecha ao selecionar; `Escape` fecha.

## API final do MultiSelect

Conforme o plano (`value: string[]`, `onValueChange`, mesmas props + `maxDisplay`). Campo = parte `Chips` do primitivo: chips com **`ChipRemove` nativo** (remoção acessível sem botão-dentro-de-botão), input de busca inline, `+N` com texto sr-only para excedentes, `Clear` quando `clearable`. Popup **permanece aberto** durante seleção múltipla (comportamento do primitivo — correto para multi). Grupos detectados pela forma de `options`.

## Decisão sobre Command / cmdk

Command continua fora da API pública (no Aurora era só motor interno do multi-select). cmdk descartado: o Base UI 1.5 cobre filtro/teclado/ARIA/chips/grupos nativamente (verificado no `.d.ts` instalado), e o command do Aurora acopla cmdk a tipos Radix.

## Como o MultiSelect substitui grouped-multi-select

Mesmo componente, grupos pela forma de `options` (`[{ label, options: [...] }]`). Guia de migração dos 19 usos do Aurora em `docs/architecture/advanced-inputs.md` (mapa de props `selected`→`value`, `onChange`→`onValueChange`).

## Stories adicionadas (22)

Combobox (10): Default, WithSearch, WithGroups, Disabled, Clearable, WithDescriptions, EmptySearch, LongList (80 itens), KeyboardInteraction, ComLabelExterno. MultiSelect (12): Default, WithSearch, WithGroups, Disabled, WithDisabledOptions, Clearable, MaxDisplay, EmptySearch, LongList (100 itens), WithDescriptions, ManySelected, KeyboardInteraction. Callbacks com `fn()` de `storybook/test` em todas.

## Play functions adicionadas

- Combobox/KeyboardInteraction: clique → digitação de busca → `ArrowDown+Enter` seleciona (assert `onValueChange("a2")`) → `Escape` fecha. Combobox/EmptySearch: busca sem resultado → mensagem de vazio visível.
- MultiSelect/KeyboardInteraction: abre → busca → seleciona 2 opções (asserts `["a1"]`, `["a1","a2"]`, popup aberto entre elas) → `Escape` → remove pelo chip (assert `["a2"]`). MultiSelect/EmptySearch: mensagem de vazio.
- Nota técnica registrada em rule: conteúdo em Portal não está no canvas — asserts usam `within(canvasElement.ownerDocument.body)`.

## Base UI — primitives usados, adaptações e limitações

Usados: `Combobox.Root` (+`multiple`, `items`, `isItemEqualToValue`, `openOnInputClick`), `Input`, `Trigger`, `Icon`, `Clear`, `Chips/Chip/ChipRemove`, `Portal/Positioner/Popup`, `Empty`, `List`, `Group/GroupLabel/Collection`, `Item/ItemIndicator`. Adaptações: bridge string? objeto option; grupos convertidos para `{label, items}` (shape `Group` do primitivo, confirmado em `internals/resolveValueLabel.d.ts`). Limitações desta versão: busca local apenas; `searchPlaceholder` redundante no padrão input-driven; sem virtualização.

## Documentação atualizada

`advanced-inputs.md` reescrito de spike para decisão final (com guia de migração do Aurora); `components.md` (28 primitives, inventário 100%); `ai/rules/components.md` (4 aprendizados); changeset minor. Checklists já cobriam os requisitos (fn/play/a11y) — sem mudanças.

## Arquivos principais alterados

Novos: `packages/ui/src/{_internal/options.ts, combobox/*, multi-select/*}` (9 arquivos), changeset. Alterados: barrel `src/index.ts`, `package.json` do ui (subpaths `./combobox`, `./multi-select`), docs citados.

## Acessibilidade validada

Teclado: abrir/buscar/navegar/selecionar/fechar cobertos pelas play functions; foco visível em campo, chips, clear e trigger (`focus-visible:ring`); opções disabled não selecionáveis (`data-disabled` + prop do Item); remoção por chip com `aria-label` descritivo ("Remover Opção A1"); `+N` com texto sr-only; ARIA de combobox/listbox provida pelo primitivo. Painel a11y do Storybook disponível para auditoria contínua (`test: "todo"`).

## Validações executadas

```
pnpm install          → Done in 2s (sem dependências novas)
pnpm check            → Checked 159 files. No fixes applied (verde)
pnpm typecheck        → 3 successful, 3 total
pnpm build            → 3 successful, 3 total
pnpm build:storybook  → completed successfully (155 stories: +10 combobox, +12 multiselect)
pnpm check:pureza     → OK — nenhum vazamento encontrado
pnpm storybook (dev)  → HTTP 200
pnpm test:storybook   → não executado no sandbox (sem browsers do Playwright);
                        rodar localmente: pnpm --filter @nucleo/storybook exec playwright install chromium
                        e depois pnpm test:storybook — as play functions foram escritas para esse runner
```

## Resultado do check de pureza

Verde, sem ajustes no script.

## Problemas encontrados

Nenhum bloqueio. A inspeção prévia do `.d.ts` instalado (lição do Accordion na Sprint 4) evitou os erros de API — `items`/`Group{items}`/`LabeledItem` confirmados antes de codar.

## Decisões tomadas

1. Padrão input-driven no Combobox (nativo do primitivo, melhor a11y) em vez de trigger+busca-no-popup do Aurora — mudança de UX documentada no guia de migração.
2. Chips como campo no MultiSelect (parte nativa) — remoção acessível sem violar regra de elementos interativos aninhados.
3. Popup do MultiSelect não fecha a cada seleção (comportamento do primitivo, correto para multi).
4. Tipos por componente re-exportando os internos de `_internal/options.ts` — sem duplicação e sem expor `_internal`.

## O que ficou fora

Async/server-side search, creatable, `renderOption`, virtualização, integração RHF/label interno, CommandPalette — documentados como futuro em `advanced-inputs.md`.

## Pendências

Rodar `pnpm test:storybook` localmente para executar as play functions (browsers do Playwright indisponíveis no sandbox); auditoria a11y contínua via painel.

## Próxima sprint recomendada

**Sprint 5 — Forms e layouts de página** (roadmap principal, numeração inalterada): FormField/FormSection formalizando o padrão RHF+Zod e os templates de página que consomem PageHeader/DataTable/StatusCards — os inputs avançados já ficam prontos para integrar.
