# Packages

| Package | Camada | ConteÃºdo | Estado (Sprint 0) |
|---|---|---|---|
| `@supertrans-transportes/tokens` | 0 | Mapeamento semÃ¢ntico (`base.css`) + temas por marca (`themes/*.css`), CSS puro | Funcional: 2 temas |
| `@supertrans-transportes/ui` | 1 | Primitives (Base UI + Tailwind v4 + cva + cn), stories colocalizadas | Button implementado |
| `@supertrans-transportes/blocks` | 2 | ComposiÃ§Ãµes genÃ©ricas (DataTable, PageHeader, Pagination, ConfirmDialog, FilterBar, EmptyState, StatCards) | 11 blocks (Sprint 2) â€” ver blocks.md |
| `@supertrans-transportes/tsconfig` | infra | `base.json`, `react-library.json`, `nextjs.json` | Funcional |
| `@supertrans-transportes/biome-config` | infra | Config Biome compartilhada (tab, 100 col, double quotes) | Funcional |

Futuro (fora da Sprint 0): `@supertrans-transportes/api-client`, `@supertrans-transportes/contracts`, `@supertrans-transportes/nest-core`, agent-kit distribuÃ­vel, templates e CLI.

Sprint 0 usa pacotes internos JIT (exports apontam para `src/`); build compilado (tsup) entra quando comeÃ§armos a publicar em registry.
