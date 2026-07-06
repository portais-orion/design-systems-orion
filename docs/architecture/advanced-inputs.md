# Advanced Inputs � decisão final (Sprint 4.1)

Este documento era o spike da Sprint 4; atualizado para decisão final com a entrega de Combobox e MultiSelect.

## Decisões finais

1. **Dois componentes públicos**: `Combobox` (seleção única com busca) e `MultiSelect` (seleção múltipla com busca, chips e grupos).
2. **Um único MultiSelect**: `multi-select` e `GroupedMultiSelect` do Aurora convergem para ele � grupos são detectados pela forma de `options` (presença de `{ label, options: [...] }`).
3. Ambos sobre o **Combobox do Base UI** (`@base-ui/react/combobox`), single e `multiple`.
4. **Command não é público**; **cmdk descartado**.
5. Tipos compartilhados em `packages/ui/src/_internal/options.ts` (helpers internos, fora do barrel).

## Combobox

Input-driven (o campo �0 a busca � padrão nativo do primitivo, melhor a11y): `Root(items, value, isItemEqualToValue, openOnInputClick)` �  campo com `Input` + `Clear` (clearable) + `Trigger` (chevron) �  `Portal > Positioner > Popup > Empty + List`. Grupos via `Group items + GroupLabel + Collection`. Bridge de valores: API pública fala `string | null`; internamente o item é o objeto `{ value, label }` (reconhecido nativamente pelo primitivo p/ display e filtro). `searchPlaceholder` existe na API por compatibilidade, mas o `placeholder` do campo cumpre o papel (documentado).

## MultiSelect

`Root multiple` + **`Chips` como o próprio campo**: chips com `ChipRemove` nativo (evita botão-dentro-de-botão), input de busca inline, `+N` para excedentes de `maxDisplay` (com texto sr-only), `Clear` quando `clearable`. Popup permanece aberto durante a seleção múltipla (comportamento do primitivo � desejável). Itens com `ItemIndicator` (check) e suporte a `description` e `disabled` por opção.

## Por que Command não é público

No Aurora, `command.tsx` existe apenas como motor interno do multi-select. Command-palette global é feature de produto, não do design system; reavaliar quando dois portais demandarem.

## Por que cmdk foi descartado

O Base UI 1.5 instalado cobre filtro, teclado, ARIA, chips e grupos nativamente (verificado no `.d.ts`: `items` aceita `{value,label}` e `Group{items}`, partes `Chips/Chip/ChipRemove/Clear/Empty`). cmdk duplicaria comportamento e o código do Aurora o acopla a tipos `@radix-ui/react-dialog` (proibido pela ADR 0004).

## Como migrar multi-select e grouped-multi-select do Aurora futuramente

1. `multi-select` (10 telas): trocar import por `@supertrans-transportes/ui` `MultiSelect`; mapear props: `selected`� `value`, `onChange`� `onValueChange`, `options` já compatível (`{label,value}`).
2. `GroupedMultiSelect` (9 telas): mesmo componente; converter a estrutura de grupos para `[{ label, options: [...] }]`.
3. `command.tsx`: deletar após as migrações (era só motor interno).
4. Comportamentos que mudam: busca fica inline no campo (não em popup separado); chips ganham remoção acessível nativa.

## Limitações atuais

Busca é local/síncrona; sem creatable; sem `renderOption` custom; sem virtualização (listas de ~100 itens ok � story LongList); sem integração RHF/label interno (Sprint 5); `searchPlaceholder` redundante no padrão input-driven.

## Futuro

Async/server-side search (quando a 1ª tela real exigir); virtualização se listas reais passarem de algumas centenas; integração com FormField (Sprint 5); possível `CommandPalette` de produto fora do núcleo.
