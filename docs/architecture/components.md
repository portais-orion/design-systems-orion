# Componentes â€” estado atual do @supertrans-transportes/ui

Atualizado na Sprint 1.

## Implementados (28 + cn)

| Componente | Origem | Base UI | ObservaÃ§Ãµes |
|---|---|---|---|
| button | Sprint 0 (Supertrans) | `button` | referÃªncia de padrÃ£o |
| input, label, textarea, card, badge, skeleton, table | ExtraÃ§Ã£o Supertrans | â€” (nativos) | badge: variants `brand`/`origin-*` removidas (domÃ­nio); `tinted`/`success`/`warning` tokenizadas |
| checkbox, select, dialog, tooltip, avatar | ExtraÃ§Ã£o Supertrans | `checkbox`, `select`, `dialog`, `tooltip`, `avatar` | `bg-white` â†’ `bg-background` |
| switch, tabs, separator, dropdown-menu, alert-dialog | RecriaÃ§Ã£o (API do Aurora) | `switch`, `tabs`, `separator`, `menu`, `alert-dialog` | nomes pÃºblicos padrÃ£o shadcn p/ facilitar migraÃ§Ã£o |
| alert | RecriaÃ§Ã£o (API do Aurora) | â€” (`role="alert"`) | variants: default, destructive, info |
| popover, radio-group, scroll-area | RecriaÃ§Ã£o (API do Aurora; Sprint 4) | `popover`, `radio-group`+`radio`, `scroll-area` | fecham o inventÃ¡rio Radix de baixo risco |
| combobox, multi-select | RecriaÃ§Ã£o (API do plano; Sprint 4.1) | `combobox` (single/multiple) | MultiSelect Ãºnico substitui multi-select + GroupedMultiSelect do Aurora; ver advanced-inputs.md |
| sheet, accordion, progress, spinner | Novos (padrÃ£o shadcn/Base UI; Sprint 4) | `dialog`, `accordion`, `progress`, â€” | sheet com side left/right/top/bottom; progress com indeterminate |

## Blocks (@supertrans-transportes/blocks)

11 blocks desde a Sprint 2 â€” ver `docs/architecture/blocks.md`.

## Adiados

InventÃ¡rio do Aurora 100% coberto. Command permanece nÃ£o-pÃºblico por decisÃ£o (advanced-inputs.md).

## ConvenÃ§Ãµes

- AnimaÃ§Ãµes usam classes do `tw-animate-css` â€” consumidores devem importar `tw-animate-css` no CSS de entrada (o Storybook do nÃºcleo jÃ¡ importa).
- Subpath exports disponÃ­veis: `@supertrans-transportes/ui/button`, `@supertrans-transportes/ui/dialog`, etc.
- Regras completas: `ai/rules/components.md`.
