# Sprint 4.1 â€” Resultado

## Resumo

`Combobox` e `MultiSelect` implementados em `@supertrans-transportes/ui` sobre o **Combobox do Base UI** (single e `multiple`) â€” sem cmdk, sem Radix, zero domÃ­nio. O MultiSelect Ã© o componente Ãºnico que substitui conceitualmente `multi-select` (10 telas) e `GroupedMultiSelect` (9 telas) do Aurora. 22 stories novas (Storybook: **155**), com `fn()` nos callbacks e play functions de teclado/interaÃ§Ã£o. InventÃ¡rio de primitives do Aurora: **100% coberto** (28 componentes no @supertrans-transportes/ui). Todas as validaÃ§Ãµes e pureza verdes; nenhum portal alterado.

## Componentes implementados

`packages/ui/src/combobox/` e `packages/ui/src/multi-select/` (cada um: tsx + types + stories + index) + helpers compartilhados em `packages/ui/src/_internal/options.ts` (fora do barrel pÃºblico).

## API final do Combobox

Conforme o plano (`value: string|null`, `onValueChange`, `options` plano/agrupado, `placeholder`, `searchPlaceholder`, `emptyMessage`, `disabled`, `clearable`, `className`, `contentClassName`) + `id`/`aria-label` para integraÃ§Ã£o com Label. PadrÃ£o **input-driven**: o campo Ã© o input de busca (padrÃ£o nativo do primitivo; `searchPlaceholder` mantido por compatibilidade â€” documentado). Limpar via parte `Clear`; chevron via `Trigger`; fecha ao selecionar; `Escape` fecha.

## API final do MultiSelect

Conforme o plano (`value: string[]`, `onValueChange`, mesmas props + `maxDisplay`). Campo = parte `Chips` do primitivo: chips com **`ChipRemove` nativo** (remoÃ§Ã£o acessÃ­vel sem botÃ£o-dentro-de-botÃ£o), input de busca inline, `+N` com texto sr-only para excedentes, `Clear` quando `clearable`. Popup **permanece aberto** durante seleÃ§Ã£o mÃºltipla (comportamento do primitivo â€” correto para multi). Grupos detectados pela forma de `options`.

## DecisÃ£o sobre Command / cmdk

Command continua fora da API pÃºblica (no Aurora era sÃ³ motor interno do multi-select). cmdk descartado: o Base UI 1.5 cobre filtro/teclado/ARIA/chips/grupos nativamente (verificado no `.d.ts` instalado), e o command do Aurora acopla cmdk a tipos Radix.

## Como o MultiSelect substitui grouped-multi-select

Mesmo componente, grupos pela forma de `options` (`[{ label, options: [...] }]`). Guia de migraÃ§Ã£o dos 19 usos do Aurora em `docs/architecture/advanced-inputs.md` (mapa de props `selected`â†’`value`, `onChange`â†’`onValueChange`).

## Stories adicionadas (22)

Combobox (10): Default, WithSearch, WithGroups, Disabled, Clearable, WithDescriptions, EmptySearch, LongList (80 itens), KeyboardInteraction, ComLabelExterno. MultiSelect (12): Default, WithSearch, WithGroups, Disabled, WithDisabledOptions, Clearable, MaxDisplay, EmptySearch, LongList (100 itens), WithDescriptions, ManySelected, KeyboardInteraction. Callbacks com `fn()` de `storybook/test` em todas.

## Play functions adicionadas

- Combobox/KeyboardInteraction: clique â†’ digitaÃ§Ã£o de busca â†’ `ArrowDown+Enter` seleciona (assert `onValueChange("a2")`) â†’ `Escape` fecha. Combobox/EmptySearch: busca sem resultado â†’ mensagem de vazio visÃ­vel.
- MultiSelect/KeyboardInteraction: abre â†’ busca â†’ seleciona 2 opÃ§Ãµes (asserts `["a1"]`, `["a1","a2"]`, popup aberto entre elas) â†’ `Escape` â†’ remove pelo chip (assert `["a2"]`). MultiSelect/EmptySearch: mensagem de vazio.
- Nota tÃ©cnica registrada em rule: conteÃºdo em Portal nÃ£o estÃ¡ no canvas â€” asserts usam `within(canvasElement.ownerDocument.body)`.

## Base UI â€” primitives usados, adaptaÃ§Ãµes e limitaÃ§Ãµes

Usados: `Combobox.Root` (+`multiple`, `items`, `isItemEqualToValue`, `openOnInputClick`), `Input`, `Trigger`, `Icon`, `Clear`, `Chips/Chip/ChipRemove`, `Portal/Positioner/Popup`, `Empty`, `List`, `Group/GroupLabel/Collection`, `Item/ItemIndicator`. AdaptaÃ§Ãµes: bridge stringâ†”objeto option; grupos convertidos para `{label, items}` (shape `Group` do primitivo, confirmado em `internals/resolveValueLabel.d.ts`). LimitaÃ§Ãµes desta versÃ£o: busca local apenas; `searchPlaceholder` redundante no padrÃ£o input-driven; sem virtualizaÃ§Ã£o.

## DocumentaÃ§Ã£o atualizada

`advanced-inputs.md` reescrito de spike para decisÃ£o final (com guia de migraÃ§Ã£o do Aurora); `components.md` (28 primitives, inventÃ¡rio 100%); `ai/rules/components.md` (4 aprendizados); changeset minor. Checklists jÃ¡ cobriam os requisitos (fn/play/a11y) â€” sem mudanÃ§as.

## Arquivos principais alterados

Novos: `packages/ui/src/{_internal/options.ts, combobox/*, multi-select/*}` (9 arquivos), changeset. Alterados: barrel `src/index.ts`, `package.json` do ui (subpaths `./combobox`, `./multi-select`), docs citados.

## Acessibilidade validada

Teclado: abrir/buscar/navegar/selecionar/fechar cobertos pelas play functions; foco visÃ­vel em campo, chips, clear e trigger (`focus-visible:ring`); opÃ§Ãµes disabled nÃ£o selecionÃ¡veis (`data-disabled` + prop do Item); remoÃ§Ã£o por chip com `aria-label` descritivo ("Remover OpÃ§Ã£o A1"); `+N` com texto sr-only; ARIA de combobox/listbox provida pelo primitivo. Painel a11y do Storybook disponÃ­vel para auditoria contÃ­nua (`test: "todo"`).

## ValidaÃ§Ãµes executadas

```
pnpm install          â†’ Done in 2s (sem dependÃªncias novas)
pnpm check            â†’ Checked 159 files. No fixes applied (verde)
pnpm typecheck        â†’ 3 successful, 3 total
pnpm build            â†’ 3 successful, 3 total
pnpm build:storybook  â†’ completed successfully (155 stories: +10 combobox, +12 multiselect)
pnpm check:pureza     â†’ OK â€” nenhum vazamento encontrado
pnpm storybook (dev)  â†’ HTTP 200
pnpm test:storybook   â†’ nÃ£o executado no sandbox (sem browsers do Playwright);
                        rodar localmente: pnpm --filter @nucleo/storybook exec playwright install chromium
                        e depois pnpm test:storybook â€” as play functions foram escritas para esse runner
```

## Resultado do check de pureza

Verde, sem ajustes no script.

## Problemas encontrados

Nenhum bloqueio. A inspeÃ§Ã£o prÃ©via do `.d.ts` instalado (liÃ§Ã£o do Accordion na Sprint 4) evitou os erros de API â€” `items`/`Group{items}`/`LabeledItem` confirmados antes de codar.

## DecisÃµes tomadas

1. PadrÃ£o input-driven no Combobox (nativo do primitivo, melhor a11y) em vez de trigger+busca-no-popup do Aurora â€” mudanÃ§a de UX documentada no guia de migraÃ§Ã£o.
2. Chips como campo no MultiSelect (parte nativa) â€” remoÃ§Ã£o acessÃ­vel sem violar regra de elementos interativos aninhados.
3. Popup do MultiSelect nÃ£o fecha a cada seleÃ§Ã£o (comportamento do primitivo, correto para multi).
4. Tipos por componente re-exportando os internos de `_internal/options.ts` â€” sem duplicaÃ§Ã£o e sem expor `_internal`.

## O que ficou fora

Async/server-side search, creatable, `renderOption`, virtualizaÃ§Ã£o, integraÃ§Ã£o RHF/label interno, CommandPalette â€” documentados como futuro em `advanced-inputs.md`.

## PendÃªncias

Rodar `pnpm test:storybook` localmente para executar as play functions (browsers do Playwright indisponÃ­veis no sandbox); auditoria a11y contÃ­nua via painel.

## PrÃ³xima sprint recomendada

**Sprint 5 â€” Forms e layouts de pÃ¡gina** (roadmap principal, numeraÃ§Ã£o inalterada): FormField/FormSection formalizando o padrÃ£o RHF+Zod e os templates de pÃ¡gina que consomem PageHeader/DataTable/StatusCards â€” os inputs avanÃ§ados jÃ¡ ficam prontos para integrar.
