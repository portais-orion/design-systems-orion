# Inventário — primitives adiados (@supertrans-transportes/ui)

Levantado na Sprint 1 (2026-07-03). Contagens = arquivos `.tsx` do Portal-Aurora que importam o componente.

| Componente | Origem (Aurora) | Usos | Dependências atuais | Complexidade | Recriar como | Sprint sugerida | Riscos |
|---|---|---|---|---|---|---|---|
| popover | `ui/popover.tsx` | 5 | `@radix-ui/react-popover` | Baixa | Base UI `@base-ui/react/popover` (Trigger/Portal/Positioner/Popup) | 1.1 | Baixo — padrão idêntico ao tooltip já existente |
| radio-group | `ui/radio-group.tsx` | 2 | `@radix-ui/react-radio-group` | Baixa | Base UI `@base-ui/react/radio-group` + `radio` | 1.1 | Baixo |
| scroll-area | `ui/scroll-area.tsx` | 7 | `@radix-ui/react-scroll-area` | Média | Base UI `@base-ui/react/scroll-area` | 1.1 | Médio — estilização de scrollbar difere entre libs; validar nas telas densas |
| command | `ui/command.tsx` | 5 | `cmdk` + `@radix-ui/react-dialog` | Alta | Base UI `@base-ui/react/autocomplete`/`combobox` (avaliar) OU manter `cmdk` como dep isolada | 2 | Alto — cmdk é maduro; recriação em Base UI precisa de spike antes de decidir (ADR curta) |
| multi-select | `ui/multi-select.tsx` | 10 | Button + Popover + Command (composição própria) | Alta | Recriar sobre Base UI Select `multiple` (recurso nativo) — API atual (options/selected/onChange) mantida | 2 | Alto — maior consumidor do grupo; depende da decisão do command/popover; validar UX de busca embutida |
| grouped-multi-select | `ui/GroupedMultiSelect.tsx` | 9 | multi-select próprio | Alta | Variante com grupos do multi-select do núcleo (mesmo componente, prop `groups`) | 2 | Alto — não criar dois componentes; unificar em um multi-select com agrupamento opcional |

Ordem recomendada: popover → radio-group → scroll-area (Sprint 1.1, mecânicos) e spike de command/combobox antes de multi-select (Sprint 2). `multi-select` + `grouped-multi-select` devem convergir para UM componente no núcleo.
