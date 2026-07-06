# DataTable

## Objetivo

Bloco oficial do grupo para listagens administrativas e operacionais â€” o primeiro componente "melhor dos dois": API e requisitos do Portal-Aurora, markup/tokens do NÃºcleo (origem Supertrans), TanStack Table como motor.

## PrincÃ­pios

Dados por props (nunca busca); estados embutidos com defaults e slots; nada do TanStack vaza para o consumidor comum; sorting/paginaÃ§Ã£o pensados server-side first (envelope `{ data, total, page, limit }`); zero domÃ­nio.

## API pÃºblica

```tsx
<DataTable
  data={items}
  columns={columns}               // DataTableColumn<T>[]
  keyExtractor={(r) => r.id}
  isLoading={q.isPending}
  isError={q.isError}
  pagination={{ page, limit, total, onPageChange, onLimitChange, limitOptions }}
  sorting={{ sortBy, sortOrder, onSortChange }}
  toolbar={<SearchBar ... />}
  footer={<Totais ... />}
  actions={(row) => <DropdownMenu ... />}
  onRowClick={(row) => abrirDetalhe(row)}
  rowClassName={(row) => row.destacado ? "bg-primary/5" : undefined}
  getRowDisabled={(row) => row.bloqueado}
/>
```

## Tipos

`DataTableColumn<T>` (id, header, accessorKey | accessorFn | cell, align, width, className, headerClassName, sortable), `DataTablePagination`, `DataTableSorting`, `DataTableProps<T>` â€” exportados de `@supertrans-transportes/blocks/data-table`. Tipos do TanStack nÃ£o sÃ£o reexportados; se um caso avanÃ§ado precisar, serÃ¡ exposto futuramente como API avanÃ§ada documentada.

## Estados suportados

- **Loading**: header + `TableSkeletonRows` (respeita nÂº de colunas, coluna de aÃ§Ãµes e `loadingRows`).
- **Error**: `ErrorState` com `errorTitle/errorDescription/errorAction`.
- **Empty**: `EmptyState` com `emptyTitle/emptyDescription/emptyAction` (sÃ³ quando nÃ£o estÃ¡ loading/error).
- **Success**: linhas com `onRowClick`, `rowClassName` (string ou fn), `getRowDisabled` (opacity + sem clique + aria-disabled).

## PaginaÃ§Ã£o

Opcional; renderiza o block `Pagination` abaixo do container quando presente. Estado 100% do chamador; compatÃ­vel com paginaÃ§Ã£o server-side e com o envelope padrÃ£o do grupo.

## Sorting

Controlado e **server-side first**: coluna com `sortable: true` ganha header clicÃ¡vel (Ã­cones chevron, `aria-sort`); o clique chama `onSortChange(sortBy, sortOrder)` alternando asc/desc; o DataTable **nÃ£o ordena dados internamente** (TanStack em `manualSorting`). Sorting client-side automÃ¡tico ficou fora desta sprint (deliberado) â€” quem quiser ordenar no cliente ordena o array antes de passar (ver story WithSorting).

## AÃ§Ãµes por linha

Slot `actions(row, index)` adiciona coluna final (header `sr-only`, alinhada Ã  direita, `w-0`); cliques na cÃ©lula de aÃ§Ãµes fazem `stopPropagation` e nÃ£o disparam `onRowClick`. Nenhuma aÃ§Ã£o prÃ©-definida.

## Toolbar

`toolbar` Ã© Ã¡rea de composiÃ§Ã£o acima da tabela (borda inferior prÃ³pria) â€” SearchBar/FilterPills/botÃµes entram por fora; o DataTable nÃ£o conhece busca nem filtros. FilterBar completo Ã© sprint futura.

## SeleÃ§Ã£o futura

NÃ£o implementada (escopo). Caminho previsto (o motor TanStack jÃ¡ suporta):

```tsx
selection={{ selectedRowIds, onSelectionChange, getRowId }}
```

Coluna de checkbox Ã  esquerda usando o Checkbox do @supertrans-transportes/ui, `aria-selected` na linha e integraÃ§Ã£o com `getRowDisabled`.

## ValidaÃ§Ã£o contra os portais atuais

| Portal | Tela/arquivo | Requisito observado | Coberto na Sprint 3? | ObservaÃ§Ã£o |
|---|---|---|---|---|
| Aurora | `ui/DataTable/DataTable.tsx` (base de 32 telas) | `Column<T>` com render, `keyExtractor`, loading/erro/vazio embutidos, paginaÃ§Ã£o com `limitOptions`, `onRowClick`, `rowClassName`, `align` | Sim | API pÃºblica espelha e amplia (accessorKey/Fn, width, sortable) |
| Aurora | `pages/estoque/components/TableEstoque.tsx` | colunas numÃ©ricas alinhadas Ã  direita; formataÃ§Ã£o pt-BR; linha de sumÃ¡rio/totais | Sim | `align: "right"` + `footer` slot (story DenseOperationalExample) |
| Aurora | `pages/fornecedor/listaFornecedores/SupplierList.tsx` | `rowClassName` condicional + `onRowClick` para detalhe | Sim | ambos com variante fn |
| Aurora | `pages/inspecao-container/InspecaoContainerDashboard.tsx` | cards de status filtram a listagem acima da tabela | Sim (composiÃ§Ã£o) | StatusCards + DataTable compostos na tela (story AuroraInspiredExample) â€” nÃ£o acoplado |
| Aurora | `ui/Pagination.tsx` | "Exibir N / Mostrando X a Y de Z"; reset p/ pÃ¡gina 1 ao trocar limite | Sim | herdado do block Pagination (Sprint 2) |
| Supertrans | `gestao-cadastros/clients-view.tsx` (+4 views irmÃ£s) | skeleton de linhas no loading; empty com aÃ§Ã£o; error com retry; pills de filtro acima da tabela | Sim | TableSkeletonRows/EmptyState(+emptyAction)/ErrorState(+errorAction)/toolbar |
| Supertrans | `configurador/modules/module-table.tsx` | ordenaÃ§Ã£o (localeCompare pt-BR); aÃ§Ãµes por linha com stopPropagation; badges/status por cÃ©lula | Parcial/Sim | sorting controlado (client-side = chamador ordena); actions com stopPropagation nativo |
| Supertrans | envelope da API (`{data,total,page,limit}` + HateoasInterceptor) | paginaÃ§Ã£o server-side com sortBy/sortOrder | Sim | pagination + sorting controlados casam 1:1 com `QueryDto` padrÃ£o |

## O que ficou fora

Sorting client-side automÃ¡tico; seleÃ§Ã£o de linhas; virtualizaÃ§Ã£o; column resizing/pinning; drag-and-drop; expansÃ£o de linha; FilterBar. Todos possÃ­veis sem quebra de API (motor TanStack jÃ¡ presente).

## Exemplos

12 stories em `Blocks/DataTable` â€” incluindo os exemplos compostos inspirados nas telas reais dos dois portais (dados genÃ©ricos "Processo").
