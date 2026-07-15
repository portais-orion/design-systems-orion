# @portais-orion/tokens

## 0.1.1

### Patch Changes

- 133cd34: Corrige troca de marca: seletores de tema passam de `:root, [data-brand]` (empate de especificidade — último import vencia sempre) para `:root:not([data-brand])` + `:root[data-brand="<marca>"]` + `[data-brand="<marca>"]`.
- Build distribuível (Sprint 10 hardening): tsup para `ui` e `blocks` (ESM + `.d.ts`, subpaths
  preservados, sem bundlar peers), cópia de CSS para `dist` em `tokens`. Sem breaking change de API
  pública. `publishConfig.exports` aponta para `dist`; consumidores podem dispensar
  `transpilePackages` após validar o build ESM.
