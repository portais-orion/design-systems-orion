# InventÃ¡rio â€” primitives adiados (@supertrans-transportes/ui)

Levantado na Sprint 1 (2026-07-03). Contagens = arquivos `.tsx` do Portal-Aurora que importam o componente.

| Componente | Origem (Aurora) | Usos | DependÃªncias atuais | Complexidade | Recriar como | Sprint sugerida | Riscos |
|---|---|---|---|---|---|---|---|
| popover | `ui/popover.tsx` | 5 | `@radix-ui/react-popover` | Baixa | Base UI `@base-ui/react/popover` (Trigger/Portal/Positioner/Popup) | 1.1 | Baixo â€” padrÃ£o idÃªntico ao tooltip jÃ¡ existente |
| radio-group | `ui/radio-group.tsx` | 2 | `@radix-ui/react-radio-group` | Baixa | Base UI `@base-ui/react/radio-group` + `radio` | 1.1 | Baixo |
| scroll-area | `ui/scroll-area.tsx` | 7 | `@radix-ui/react-scroll-area` | MÃ©dia | Base UI `@base-ui/react/scroll-area` | 1.1 | MÃ©dio â€” estilizaÃ§Ã£o de scrollbar difere entre libs; validar nas telas densas |
| command | `ui/command.tsx` | 5 | `cmdk` + `@radix-ui/react-dialog` | Alta | Base UI `@base-ui/react/autocomplete`/`combobox` (avaliar) OU manter `cmdk` como dep isolada | 2 | Alto â€” cmdk Ã© maduro; recriaÃ§Ã£o em Base UI precisa de spike antes de decidir (ADR curta) |
| multi-select | `ui/multi-select.tsx` | 10 | Button + Popover + Command (composiÃ§Ã£o prÃ³pria) | Alta | Recriar sobre Base UI Select `multiple` (recurso nativo) â€” API atual (options/selected/onChange) mantida | 2 | Alto â€” maior consumidor do grupo; depende da decisÃ£o do command/popover; validar UX de busca embutida |
| grouped-multi-select | `ui/GroupedMultiSelect.tsx` | 9 | multi-select prÃ³prio | Alta | Variante com grupos do multi-select do nÃºcleo (mesmo componente, prop `groups`) | 2 | Alto â€” nÃ£o criar dois componentes; unificar em um multi-select com agrupamento opcional |

Ordem recomendada: popover â†’ radio-group â†’ scroll-area (Sprint 1.1, mecÃ¢nicos) e spike de command/combobox antes de multi-select (Sprint 2). `multi-select` + `grouped-multi-select` devem convergir para UM componente no nÃºcleo.
