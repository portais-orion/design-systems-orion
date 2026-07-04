# Packages

| Package | Camada | Conteúdo | Estado (Sprint 0) |
|---|---|---|---|
| `@grupo/tokens` | 0 | Mapeamento semântico (`base.css`) + temas por marca (`themes/*.css`), CSS puro | Funcional: 2 temas |
| `@grupo/ui` | 1 | Primitives (Base UI + Tailwind v4 + cva + cn), stories colocalizadas | Button implementado |
| `@grupo/blocks` | 2 | Composições genéricas (DataTable, PageHeader, Pagination, ConfirmDialog, FilterBar, EmptyState, StatCards) | 11 blocks (Sprint 2) — ver blocks.md |
| `@grupo/tsconfig` | infra | `base.json`, `react-library.json`, `nextjs.json` | Funcional |
| `@grupo/biome-config` | infra | Config Biome compartilhada (tab, 100 col, double quotes) | Funcional |

Futuro (fora da Sprint 0): `@grupo/api-client`, `@grupo/contracts`, `@grupo/nest-core`, agent-kit distribuível, templates e CLI.

Sprint 0 usa pacotes internos JIT (exports apontam para `src/`); build compilado (tsup) entra quando começarmos a publicar em registry.
