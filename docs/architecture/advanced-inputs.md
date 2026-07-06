# Advanced Inputs â€” decisÃ£o final (Sprint 4.1)

Este documento era o spike da Sprint 4; atualizado para decisÃ£o final com a entrega de Combobox e MultiSelect.

## DecisÃµes finais

1. **Dois componentes pÃºblicos**: `Combobox` (seleÃ§Ã£o Ãºnica com busca) e `MultiSelect` (seleÃ§Ã£o mÃºltipla com busca, chips e grupos).
2. **Um Ãºnico MultiSelect**: `multi-select` e `GroupedMultiSelect` do Aurora convergem para ele â€” grupos sÃ£o detectados pela forma de `options` (presenÃ§a de `{ label, options: [...] }`).
3. Ambos sobre o **Combobox do Base UI** (`@base-ui/react/combobox`), single e `multiple`.
4. **Command nÃ£o Ã© pÃºblico**; **cmdk descartado**.
5. Tipos compartilhados em `packages/ui/src/_internal/options.ts` (helpers internos, fora do barrel).

## Combobox

Input-driven (o campo Ã‰ a busca â€” padrÃ£o nativo do primitivo, melhor a11y): `Root(items, value, isItemEqualToValue, openOnInputClick)` â†’ campo com `Input` + `Clear` (clearable) + `Trigger` (chevron) â†’ `Portal > Positioner > Popup > Empty + List`. Grupos via `Group items + GroupLabel + Collection`. Bridge de valores: API pÃºblica fala `string | null`; internamente o item Ã© o objeto `{ value, label }` (reconhecido nativamente pelo primitivo p/ display e filtro). `searchPlaceholder` existe na API por compatibilidade, mas o `placeholder` do campo cumpre o papel (documentado).

## MultiSelect

`Root multiple` + **`Chips` como o prÃ³prio campo**: chips com `ChipRemove` nativo (evita botÃ£o-dentro-de-botÃ£o), input de busca inline, `+N` para excedentes de `maxDisplay` (com texto sr-only), `Clear` quando `clearable`. Popup permanece aberto durante a seleÃ§Ã£o mÃºltipla (comportamento do primitivo â€” desejÃ¡vel). Itens com `ItemIndicator` (check) e suporte a `description` e `disabled` por opÃ§Ã£o.

## Por que Command nÃ£o Ã© pÃºblico

No Aurora, `command.tsx` existe apenas como motor interno do multi-select. Command-palette global Ã© feature de produto, nÃ£o do design system; reavaliar quando dois portais demandarem.

## Por que cmdk foi descartado

O Base UI 1.5 instalado cobre filtro, teclado, ARIA, chips e grupos nativamente (verificado no `.d.ts`: `items` aceita `{value,label}` e `Group{items}`, partes `Chips/Chip/ChipRemove/Clear/Empty`). cmdk duplicaria comportamento e o cÃ³digo do Aurora o acopla a tipos `@radix-ui/react-dialog` (proibido pela ADR 0004).

## Como migrar multi-select e grouped-multi-select do Aurora futuramente

1. `multi-select` (10 telas): trocar import por `@supertrans-transportes/ui` `MultiSelect`; mapear props: `selected`â†’`value`, `onChange`â†’`onValueChange`, `options` jÃ¡ compatÃ­vel (`{label,value}`).
2. `GroupedMultiSelect` (9 telas): mesmo componente; converter a estrutura de grupos para `[{ label, options: [...] }]`.
3. `command.tsx`: deletar apÃ³s as migraÃ§Ãµes (era sÃ³ motor interno).
4. Comportamentos que mudam: busca fica inline no campo (nÃ£o em popup separado); chips ganham remoÃ§Ã£o acessÃ­vel nativa.

## LimitaÃ§Ãµes atuais

Busca Ã© local/sÃ­ncrona; sem creatable; sem `renderOption` custom; sem virtualizaÃ§Ã£o (listas de ~100 itens ok â€” story LongList); sem integraÃ§Ã£o RHF/label interno (Sprint 5); `searchPlaceholder` redundante no padrÃ£o input-driven.

## Futuro

Async/server-side search (quando a 1Âª tela real exigir); virtualizaÃ§Ã£o se listas reais passarem de algumas centenas; integraÃ§Ã£o com FormField (Sprint 5); possÃ­vel `CommandPalette` de produto fora do nÃºcleo.
