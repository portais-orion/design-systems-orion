# Sprint 4 — Resultado

## Resumo

Cobertura do `@grupo/ui` ampliada de 19 para **26 primitives** (+popover, radio-group, scroll-area, sheet, accordion, progress, spinner), `LoadingOverlay` criado no `@grupo/blocks`, e spike de inputs avançados concluído com decisão documentada. Storybook: **133 stories** (+34). Todas as validações e o check de pureza verdes. Nenhum portal alterado.

## Componentes implementados em @grupo/ui

| Componente | Primitivo Base UI | Notas |
|---|---|---|
| Popover | `popover` (Positioner+Popup) | `render` prop (não asChild); align/sideOffset |
| RadioGroup | `radio-group` + `radio` | superfície shadcn (RadioGroup+RadioGroupItem); controlado |
| ScrollArea | `scroll-area` | vertical+horizontal, thumb tokenizado, Corner |
| Sheet | `dialog` (reuso) | cva `side`: right/left/top/bottom; overlay; esc/click-fora |
| Accordion | `accordion` | `type="single"|"multiple"` → prop `multiple`; chevron via `data-panel-open` |
| Progress | `progress` | ARIA pelo primitivo; `value={null}` = indeterminate |
| Spinner | — (Loader2 + cva) | com label → `role="status"`; sem → `aria-hidden` |

## Blocks implementados em @grupo/blocks

**LoadingOverlay** — compõe `Spinner`; children permanecem montados; `aria-busy`; overlay com `bg-background/60` + blur; interação livre quando `loading=false`. Story WithTable demonstra sobre o DataTable.

## Componentes avançados analisados / Decisão

`docs/architecture/advanced-inputs.md`: **nenhum implementado nesta sprint** (deliberado — MultiSelect é o componente com mais estados da lib e merece sprint dedicada; custo de espera baixo pois nenhum portal consome o núcleo ainda). Decisões travadas: **MultiSelect único** (multi-select + grouped-multi-select convergem — 19 telas do Aurora migram para o mesmo componente, grupos detectados pela forma de `options`); **Combobox** como irmão de popup compartilhado; **Command NÃO vira componente público** por ora (no Aurora é só motor interno do multi-select); **cmdk descartado** (Base UI 1.5 tem `combobox`/`autocomplete`/`Select multiple` nativos; o command do Aurora acopla cmdk a tipos Radix). Plano da Sprint 4.1: Combobox → MultiSelect → stories com os 3 maiores casos reais do Aurora.

## Estrutura final adicionada

```
packages/ui/src/{popover,radio-group,scroll-area,sheet,accordion,progress,spinner}/
packages/blocks/src/loading-overlay/
docs/architecture/advanced-inputs.md
```

Subpath exports adicionados nos dois package.json; barrels atualizados.

## Stories adicionadas

34 novas (total 133): Popover (Default, WithForm, WithCustomWidth, SupertransBrand, AuroraBrand), RadioGroup (Default, Disabled, Horizontal, WithDescriptions), ScrollArea (Vertical, Horizontal, LongList, InsideCard), Sheet (Right, Left, Bottom, WithFormContent, ScrollableContent), Accordion (Single, Multiple, WithLongContent, DisabledItem), Progress (Default, DifferentValues, Indeterminate, WithLabel), Spinner (Default, Sizes, WithLabel, InsideButton), LoadingOverlay (Default, WithCard, WithTable, WithoutLabel).

## Documentação criada/atualizada

`advanced-inputs.md` (novo), `components.md` (26 primitives), `blocks.md` (+LoadingOverlay), `ai/rules/components.md` (aprendizados Base UI: radio module, prop `multiple`, `data-panel-open`, spinner a11y), README (nota "rode `pnpm install` após cada sync de sprint"), changeset minor duplo.

## Validações executadas

```
pnpm install          → Done in 1s (sem deps novas)
pnpm check            → Checked 148 files. No fixes applied (verde)
pnpm typecheck        → 3 successful, 3 total
pnpm build            → 3 successful, 3 total
pnpm build:storybook  → completed successfully (133 stories)
pnpm check:pureza     → OK — nenhum vazamento encontrado
pnpm storybook (dev)  → HTTP 200
```

## Problemas encontrados

1. Accordion: a prop desta versão do Base UI é `multiple`, não `openMultiple` (docs internas divergiam) — corrigido e registrado na rule.
2. `className` do Root do Base UI aceita função `(state) => string`, conflitando com `cn()` — wrapper tipa `className?: string`.
3. Biome useSemanticElements no `role="status"` do Spinner — suprimido com justificativa (não existe elemento nativo para live region de status).

## Decisões tomadas

Sheet reusa o Dialog primitivo (nunca criar drawer paralelo); Spinner sem label é `aria-hidden`; Progress indeterminate por `value` ausente; stories de marca explícitas no Popover conforme pedido (as demais usam a toolbar).

## O que ficou fora

Combobox/Command/MultiSelect/GroupedMultiSelect (Sprint 4.1, plano pronto); FormField/FormSection, AppShell/Sidebar/Breadcrumb, templates (sprints posteriores conforme roadmap).

## Pendências

a11y automatizada e visual regression (recorrente desde a Sprint 0 — recomendo resolver ANTES da adoção pelo Supertrans); CI para check:pureza; validação de teclado dos novos overlays feita manualmente via stories.

## Próxima sprint recomendada

**Sprint 4.1 (curta) — Combobox + MultiSelect** seguindo `advanced-inputs.md`, fechando 100% do inventário de primitives do Aurora. Em seguida, **Sprint 5 — Supertrans consome o núcleo**, que é o primeiro teste real de tudo que foi construído.
