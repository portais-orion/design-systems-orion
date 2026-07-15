# @portais-orion/ui

## 0.3.0

### Minor Changes

- Adiciona suporte a variantes de `Tabs` (line) e orientação vertical.

## 0.2.1

### Patch Changes

- fix: update gen-dist-exports to use .mjs and .d.mts extensions instead of .js and .d.ts

## 0.2.0

### Minor Changes

- 133cd34: Sprint 1: primeira leva de primitives. Extraídos do Supertrans: input, label, textarea, checkbox, select, dialog, tooltip, card, badge, skeleton, avatar, table. Recriados em Base UI a partir da API do Aurora: switch, tabs, separator, alert, alert-dialog, dropdown-menu. Badge sem variants de domínio; bg-white tokenizado; subpath exports; lucide-react como dependency.
- 133cd34: Sprint 4.1: Combobox (seleção única com busca) e MultiSelect (múltipla com chips, grupos, maxDisplay, clear) sobre o Combobox do Base UI — sem cmdk, sem Radix. MultiSelect único substitui multi-select e GroupedMultiSelect do Aurora. Stories com fn() e play functions de teclado.
- 133cd34: Sprint 4: +7 primitives no @portais-orion/ui (popover, radio-group, scroll-area, sheet, accordion, progress, spinner — Base UI/tokens) e LoadingOverlay no @portais-orion/blocks. Combobox/Command/MultiSelect analisados e adiados para 4.1 com API definida (docs/architecture/advanced-inputs.md).

### Patch Changes

- Build distribuível (Sprint 10 hardening): tsup para `ui` e `blocks` (ESM + `.d.ts`, subpaths
  preservados, sem bundlar peers), cópia de CSS para `dist` em `tokens`. Sem breaking change de API
  pública. `publishConfig.exports` aponta para `dist`; consumidores podem dispensar
  `transpilePackages` após validar o build ESM.
