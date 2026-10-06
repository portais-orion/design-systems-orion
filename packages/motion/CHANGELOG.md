# @design-systems-orion/motion

## 0.2.0

### Minor Changes

- Adiciona política compartilhada de movimento e tokens nas três marcas. MotionProvider
  ativa transições dos Accordion, Dialog, Popover, Sheet, FiltersCard e LauncherCard
  existentes, com respeito a movimento reduzido, foco e modo desativado. Instala Motion
  14 e Anime.js 4.5; Anime não é importado pelos componentes desta entrega.

  Preserva entrypoints cliente na distribuição e mantém o resolver puro separado
  das engines. Consumidores devem atualizar os packages e ativar o provider central.

### Patch Changes

- Updated dependencies [b3b7576]
- Updated dependencies
  - @design-systems-orion/tokens@0.4.0
