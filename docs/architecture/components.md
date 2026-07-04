# Componentes — estado atual do @grupo/ui

Atualizado na Sprint 1.

## Implementados (28 + cn)

| Componente | Origem | Base UI | Observações |
|---|---|---|---|
| button | Sprint 0 (Supertrans) | `button` | referência de padrão |
| input, label, textarea, card, badge, skeleton, table | Extração Supertrans | — (nativos) | badge: variants `brand`/`origin-*` removidas (domínio); `tinted`/`success`/`warning` tokenizadas |
| checkbox, select, dialog, tooltip, avatar | Extração Supertrans | `checkbox`, `select`, `dialog`, `tooltip`, `avatar` | `bg-white` → `bg-background` |
| switch, tabs, separator, dropdown-menu, alert-dialog | Recriação (API do Aurora) | `switch`, `tabs`, `separator`, `menu`, `alert-dialog` | nomes públicos padrão shadcn p/ facilitar migração |
| alert | Recriação (API do Aurora) | — (`role="alert"`) | variants: default, destructive, info |
| popover, radio-group, scroll-area | Recriação (API do Aurora; Sprint 4) | `popover`, `radio-group`+`radio`, `scroll-area` | fecham o inventário Radix de baixo risco |
| combobox, multi-select | Recriação (API do plano; Sprint 4.1) | `combobox` (single/multiple) | MultiSelect único substitui multi-select + GroupedMultiSelect do Aurora; ver advanced-inputs.md |
| sheet, accordion, progress, spinner | Novos (padrão shadcn/Base UI; Sprint 4) | `dialog`, `accordion`, `progress`, — | sheet com side left/right/top/bottom; progress com indeterminate |

## Blocks (@grupo/blocks)

11 blocks desde a Sprint 2 — ver `docs/architecture/blocks.md`.

## Adiados

Inventário do Aurora 100% coberto. Command permanece não-público por decisão (advanced-inputs.md).

## Convenções

- Animações usam classes do `tw-animate-css` — consumidores devem importar `tw-animate-css` no CSS de entrada (o Storybook do núcleo já importa).
- Subpath exports disponíveis: `@grupo/ui/button`, `@grupo/ui/dialog`, etc.
- Regras completas: `ai/rules/components.md`.
