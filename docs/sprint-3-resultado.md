# Sprint 3 — Resultado

## Resumo

`DataTable` implementado em `@grupo/blocks/data-table` como o primeiro componente "melhor dos dois": API `Column<T>`/`keyExtractor` do Aurora, markup/tokens do Núcleo (Table do Supertrans), TanStack Table como motor interno. 12 stories (Storybook: 99), documentação com validação contra 8 referências reais dos dois portais, todas as validações e o check de pureza verdes. Nenhum portal alterado.

## DataTable implementado

`packages/blocks/src/data-table/{data-table.tsx, data-table.types.ts, data-table.stories.tsx, index.ts}` — sem fragmentação em subarquivos (componente coube legível em um arquivo). Consome `Table/TableHeader/TableBody/TableRow/TableHead/TableCell` do `@grupo/ui` e os blocks `TableSkeletonRows`, `EmptyState`, `ErrorState`, `Pagination`.

## API pública final

Conforme proposta da sprint, com três acréscimos: `errorAction`/`emptyAction` (slots de ação nos estados, requisito visto nas views do Supertrans que têm "tentar novamente"/"novo registro") e `align`/`width`/`headerClassName` por coluna (requisito das tabelas numéricas do Aurora). `keyExtractor` vira `getRowId` do TanStack.

## Tipos exportados

`DataTableColumn<T>`, `DataTablePagination`, `DataTableSorting`, `DataTableProps<T>` — de `@grupo/blocks` e `@grupo/blocks/data-table`. Nenhum tipo do TanStack é reexportado; consumidor comum não sabe que ele existe.

## Estados suportados

Loading (header + TableSkeletonRows, respeita `loadingRows` e coluna de ações), Error (ErrorState + slots), Empty (EmptyState + slots), Success (onRowClick, rowClassName string|fn, `getRowDisabled` com aria-disabled + bloqueio de clique).

## Paginação

Opcional via block `Pagination`; estado 100% do chamador; compatível com envelope `{data,total,page,limit}` e paginação server-side. Sem paginação interna.

## Sorting

Controlado, server-side first: `sortable: true` na coluna + prop `sorting{sortBy,sortOrder,onSortChange}` → header vira botão com chevrons e `aria-sort`; clique alterna asc/desc via callback. TanStack em `manualSorting` — **o componente não ordena dados**. Sorting client-side automático ficou fora (deliberado e documentado); a story WithSorting demonstra ordenação externa.

## Ações por linha

Slot `actions(row, index)` → coluna final `w-0` alinhada à direita, header `sr-only`, `stopPropagation` na célula (clique em ação não dispara `onRowClick`). Nenhuma ação pré-definida.

## Toolbar

Slot de composição acima da tabela (SearchBar/FilterPill entram por fora). FilterBar completo permanece fora do escopo.

## Stories adicionadas

12: Default, Loading, Empty, Error, WithPagination, WithActions, WithRowClick, WithToolbar, WithSorting, DenseOperationalExample (colunas numéricas + footer de totais), SupertransInspiredExample (PageHeader + CodeBadge + StatusDot + paginação + ação de editar), AuroraInspiredExample (StatusCards clicáveis filtrando a tabela + toolbar de exportação). Dados genéricos ("Processo"), sem entidades reais.

## Validação contra telas reais

Documentada em `docs/architecture/data-table.md` (tabela com 8 linhas). Referências Aurora: `ui/DataTable/DataTable.tsx` (base de 32 telas), `TableEstoque.tsx` (alinhamento numérico + sumário → `align`/`footer`), `SupplierList.tsx` (rowClassName+onRowClick), `InspecaoContainerDashboard.tsx` (StatusCards como filtro → composição, não acoplamento), `ui/Pagination.tsx`. Referências Supertrans: `gestao-cadastros/clients-view.tsx` e views irmãs (skeleton/empty/error com ações, pills na toolbar), `configurador/modules/module-table.tsx` (sorting pt-BR, ações com stopPropagation), envelope da API padrão.

## Arquivos principais alterados

Novos: `packages/blocks/src/data-table/*` (4), `docs/architecture/data-table.md`, `docs/sprint-3-resultado.md`, changeset. Alterados: `packages/blocks/src/index.ts` (barrel), `packages/blocks/package.json` (+`@tanstack/react-table@^8.20.0`, subpath export), `ai/rules/blocks.md` (regras do DataTable).

## Documentação criada

`docs/architecture/data-table.md` completo (objetivo, princípios, API, tipos, estados, paginação, sorting, ações, toolbar, seleção futura, validação, fora de escopo, exemplos).

## Validações executadas

```
pnpm install          → Done in 5.2s (+@tanstack/react-table)
pnpm check            → Checked 124 files. No fixes applied (verde)
pnpm typecheck        → 3 successful, 3 total
pnpm build            → 3 successful, 3 total
pnpm build:storybook  → completed successfully (99 stories; 12 do DataTable)
pnpm check:pureza     → OK — nenhum vazamento encontrado
pnpm storybook (dev)  → HTTP 200
```

## Resultado do check de pureza

Verde, sem ajustes no script — as regras existentes (incl. proibição de `@tanstack/react-query`, que NÃO atinge `@tanstack/react-table`) cobriram o caso.

## Problemas encontrados

1. `noUncheckedIndexedAccess` no mock das stories (indexação por módulo retorna `T | undefined`) — resolvido com fallbacks `??`.
2. Story `Error` sombreava o global `Error` (Biome noShadowRestrictedNames) — renomeada para `ErrorStory` com `name: "Error"`.
3. Cast `as any` no adaptador de accessor flagrado pelo Biome — reescrito com accessor tipado, zero `any`.

## Decisões tomadas

1. TanStack em `manualSorting` + `enableSortingRemoval: false` — sorting nunca "some", só alterna asc/desc (casa com `QueryDto` padrão do backend).
2. `errorAction`/`emptyAction` como slots (não callbacks fixos onRetry/onNew) — coerente com a regra de slots dos blocks.
3. Coluna de ações com header `sr-only` e `stopPropagation` na célula inteira.
4. Estados vazio/erro renderizam DENTRO do container da tabela (visual consistente, como no Aurora), toolbar permanece visível no empty (usuário pode limpar busca).
5. Nada do TanStack exportado; tipos avançados só quando houver caso real (documentado como API avançada futura).

## O que ficou fora

Seleção de linhas (API futura documentada), sorting client-side automático, virtualização, column resizing/pinning, drag-and-drop, expansão de linha, FilterBar.

## Pendências

- Validação "de verdade" contra os portais acontece quando a primeira tela real for migrada (fase de consumo) — a API foi validada contra o código, não em produção.
- a11y automatizada/visual regression seguem pendentes (pré-Sprint 4 recomendado).
- Testes de interação para sorting/actions (Storybook play functions) não incluídos.

## Próxima sprint recomendada

**Sprint 4 — Supertrans consome o núcleo** (fase 2 da estratégia de migração): re-exports de `@grupo/ui` no lugar de `components/ui/*` e `@grupo/tokens` no globals.css — valida pipeline e DataTable contra uma tela real. Alternativa se preferir fechar a lib antes: Sprint 1.1 (popover, radio-group, scroll-area) + a11y/CI.
