# Sprint 4 â€” Resultado

## Resumo

Cobertura do `@supertrans-transportes/ui` ampliada de 19 para **26 primitives** (+popover, radio-group, scroll-area, sheet, accordion, progress, spinner), `LoadingOverlay` criado no `@supertrans-transportes/blocks`, e spike de inputs avanÃ§ados concluÃ­do com decisÃ£o documentada. Storybook: **133 stories** (+34). Todas as validaÃ§Ãµes e o check de pureza verdes. Nenhum portal alterado.

## Componentes implementados em @supertrans-transportes/ui

| Componente | Primitivo Base UI | Notas |
|---|---|---|
| Popover | `popover` (Positioner+Popup) | `render` prop (nÃ£o asChild); align/sideOffset |
| RadioGroup | `radio-group` + `radio` | superfÃ­cie shadcn (RadioGroup+RadioGroupItem); controlado |
| ScrollArea | `scroll-area` | vertical+horizontal, thumb tokenizado, Corner |
| Sheet | `dialog` (reuso) | cva `side`: right/left/top/bottom; overlay; esc/click-fora |
| Accordion | `accordion` | `type="single"|"multiple"` â†’ prop `multiple`; chevron via `data-panel-open` |
| Progress | `progress` | ARIA pelo primitivo; `value={null}` = indeterminate |
| Spinner | â€” (Loader2 + cva) | com label â†’ `role="status"`; sem â†’ `aria-hidden` |

## Blocks implementados em @supertrans-transportes/blocks

**LoadingOverlay** â€” compÃµe `Spinner`; children permanecem montados; `aria-busy`; overlay com `bg-background/60` + blur; interaÃ§Ã£o livre quando `loading=false`. Story WithTable demonstra sobre o DataTable.

## Componentes avanÃ§ados analisados / DecisÃ£o

`docs/architecture/advanced-inputs.md`: **nenhum implementado nesta sprint** (deliberado â€” MultiSelect Ã© o componente com mais estados da lib e merece sprint dedicada; custo de espera baixo pois nenhum portal consome o nÃºcleo ainda). DecisÃµes travadas: **MultiSelect Ãºnico** (multi-select + grouped-multi-select convergem â€” 19 telas do Aurora migram para o mesmo componente, grupos detectados pela forma de `options`); **Combobox** como irmÃ£o de popup compartilhado; **Command NÃƒO vira componente pÃºblico** por ora (no Aurora Ã© sÃ³ motor interno do multi-select); **cmdk descartado** (Base UI 1.5 tem `combobox`/`autocomplete`/`Select multiple` nativos; o command do Aurora acopla cmdk a tipos Radix). Plano da Sprint 4.1: Combobox â†’ MultiSelect â†’ stories com os 3 maiores casos reais do Aurora.

## Estrutura final adicionada

```
packages/ui/src/{popover,radio-group,scroll-area,sheet,accordion,progress,spinner}/
packages/blocks/src/loading-overlay/
docs/architecture/advanced-inputs.md
```

Subpath exports adicionados nos dois package.json; barrels atualizados.

## Stories adicionadas

34 novas (total 133): Popover (Default, WithForm, WithCustomWidth, SupertransBrand, AuroraBrand), RadioGroup (Default, Disabled, Horizontal, WithDescriptions), ScrollArea (Vertical, Horizontal, LongList, InsideCard), Sheet (Right, Left, Bottom, WithFormContent, ScrollableContent), Accordion (Single, Multiple, WithLongContent, DisabledItem), Progress (Default, DifferentValues, Indeterminate, WithLabel), Spinner (Default, Sizes, WithLabel, InsideButton), LoadingOverlay (Default, WithCard, WithTable, WithoutLabel).

## DocumentaÃ§Ã£o criada/atualizada

`advanced-inputs.md` (novo), `components.md` (26 primitives), `blocks.md` (+LoadingOverlay), `ai/rules/components.md` (aprendizados Base UI: radio module, prop `multiple`, `data-panel-open`, spinner a11y), README (nota "rode `pnpm install` apÃ³s cada sync de sprint"), changeset minor duplo.

## ValidaÃ§Ãµes executadas

```
pnpm install          â†’ Done in 1s (sem deps novas)
pnpm check            â†’ Checked 148 files. No fixes applied (verde)
pnpm typecheck        â†’ 3 successful, 3 total
pnpm build            â†’ 3 successful, 3 total
pnpm build:storybook  â†’ completed successfully (133 stories)
pnpm check:pureza     â†’ OK â€” nenhum vazamento encontrado
pnpm storybook (dev)  â†’ HTTP 200
```

## Problemas encontrados

1. Accordion: a prop desta versÃ£o do Base UI Ã© `multiple`, nÃ£o `openMultiple` (docs internas divergiam) â€” corrigido e registrado na rule.
2. `className` do Root do Base UI aceita funÃ§Ã£o `(state) => string`, conflitando com `cn()` â€” wrapper tipa `className?: string`.
3. Biome useSemanticElements no `role="status"` do Spinner â€” suprimido com justificativa (nÃ£o existe elemento nativo para live region de status).

## DecisÃµes tomadas

Sheet reusa o Dialog primitivo (nunca criar drawer paralelo); Spinner sem label Ã© `aria-hidden`; Progress indeterminate por `value` ausente; stories de marca explÃ­citas no Popover conforme pedido (as demais usam a toolbar).

## O que ficou fora

Combobox/Command/MultiSelect/GroupedMultiSelect (Sprint 4.1, plano pronto); FormField/FormSection, AppShell/Sidebar/Breadcrumb, templates (sprints posteriores conforme roadmap).

## PendÃªncias

a11y automatizada e visual regression (recorrente desde a Sprint 0 â€” recomendo resolver ANTES da adoÃ§Ã£o pelo Supertrans); CI para check:pureza; validaÃ§Ã£o de teclado dos novos overlays feita manualmente via stories.

## PrÃ³xima sprint recomendada

**Sprint 4.1 (curta) â€” Combobox + MultiSelect** seguindo `advanced-inputs.md`, fechando 100% do inventÃ¡rio de primitives do Aurora. Em seguida, **Sprint 5 â€” Supertrans consome o nÃºcleo**, que Ã© o primeiro teste real de tudo que foi construÃ­do.
