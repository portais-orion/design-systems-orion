# Components

Estado atual de `@supertrans-transportes/ui`.

Extraídos do Supertrans:
- input, label, textarea, card, badge, skeleton, table
- checkbox, select, dialog, tooltip, avatar

Recriados com Base UI a partir de API do Aurora:
- alert, alert-dialog, tabs, popover, dropdown-menu, switch, radio-group, scroll-area, separator

Novos no núcleo:
- sheet, accordion, progress, spinner, combobox, multi-select

Regras de implementação:
- Base UI como primitivo headless oficial
- Tailwind v4 CSS-first
- só tokens semânticos
- sem `orange-*`, `blue-*`, `primary-600`
- sem `tailwind.config.ts`

Animações usam `tw-animate-css`; consumidores precisam importar esse CSS de entrada.
