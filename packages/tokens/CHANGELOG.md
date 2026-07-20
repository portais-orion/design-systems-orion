# @portais-orion/tokens

## 0.2.0

### Minor Changes

- b0c4e69: Adiciona o tema da marca Grupo Orion ao catálogo de marcas.

  - Nova marca `orion` (label "Grupo Orion") em `brands.json`, repositório `portal-orion`.
  - Tema `themes/orion.css`: primária teal `#29A699` (HSL 175 60% 40%), acento de marca laranja queimado `#D95A11` (HSL 22 85% 45%) em `--brand-accent`, sidebar teal escura e `--radius: 0.5rem`.
  - `index.css` e os exports de tema do `package.json` derivados via `sync:brands`.
  - Toolbar do Storybook e o comparativo de marcas passam a incluir Orion automaticamente.

## 0.1.1

### Patch Changes

- 133cd34: Corrige troca de marca: seletores de tema passam de `:root, [data-brand]` (empate de especificidade — último import vencia sempre) para `:root:not([data-brand])` + `:root[data-brand="<marca>"]` + `[data-brand="<marca>"]`.
- Build distribuível (Sprint 10 hardening): tsup para `ui` e `blocks` (ESM + `.d.ts`, subpaths
  preservados, sem bundlar peers), cópia de CSS para `dist` em `tokens`. Sem breaking change de API
  pública. `publishConfig.exports` aponta para `dist`; consumidores podem dispensar
  `transpilePackages` após validar o build ESM.
