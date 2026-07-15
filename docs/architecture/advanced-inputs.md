# Advanced Inputs

Decisão final da Sprint 4.1.

1. Combobox oficial do núcleo nasce sobre Base UI.
2. MultiSelect oficial do núcleo substitui `multi-select` e `GroupedMultiSelect` do Aurora.
3. Grupos são detectados pela forma de `options`.
4. Command não vira componente público nesta fase.

Combobox:
- padrão input-driven
- `Input` + `Clear` + `Trigger`
- `Portal > Positioner > Popup > Empty + List`
- API pública em `string | null`

MultiSelect:
- `Root multiple`
- chips como o próprio campo
- `ChipRemove` nativo
- popup permanece aberto durante seleção múltipla
- `+N` para excedentes de `maxDisplay`

Migração do Aurora:
- `selected` → `value`
- `onChange` → `onValueChange`
- `options` permanece compatível

Limites da versão:
- busca local/síncrona
- sem creatable
- sem `renderOption` custom
- sem virtualização
- sem integração RHF nativa
