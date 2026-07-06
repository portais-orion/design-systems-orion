# DataTable

## Objetivo

Bloco oficial do grupo para listagens administrativas e operacionais � o primeiro componente "melhor dos dois": API e requisitos do Portal-Aurora, markup/tokens do Núcleo (origem Supertrans), TanStack Table como motor.

## Princípios

Dados por props (nunca busca); estados embutidos com defaults e slots; nada do TanStack vaza para o consumidor comum; sorting/paginação pensados server-side first (envelope `{ data, total, page, limit }`); zero domínio.

## API pública

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

`DataTableColumn<T>` (id, header, accessorKey | accessorFn | cell, align, width, className, headerClassName, sortable), `DataTablePagination`, `DataTableSorting`, `DataTableProps<T>` � exportados de `@supertrans-transportes/blocks/data-table`. Tipos do TanStack não são reexportados; se um caso avançado precisar, será exposto futuramente como API avançada documentada.

## Estados suportados

- **Loading**: header + `TableSkeletonRows` (respeita nº de colunas, coluna de ações e `loadingRows`).
- **Error**: `ErrorState` com `errorTitle/errorDescription/errorAction`.
- **Empty**: `EmptyState` com `emptyTitle/emptyDescription/emptyAction` (só quando não está loading/error).
- **Success**: linhas com `onRowClick`, `rowClassName` (string ou fn), `getRowDisabled` (opacity + sem clique + aria-disabled).

## Paginação

Opcional; renderiza o block `Pagination` abaixo do container quando presente. Estado 100% do chamador; compatível com paginação server-side e com o envelope padrão do grupo.

## Sorting

Controlado e **server-side first**: coluna com `sortable: true` ganha header clicável (ícones chevron, `aria-sort`); o clique chama `onSortChange(sortBy, sortOrder)` alternando asc/desc; o DataTable **não ordena dados internamente** (TanStack em `manualSorting`). Sorting client-side automático ficou fora desta sprint (deliberado) � quem quiser ordenar no cliente ordena o array antes de passar (ver story WithSorting).

## Ações por linha

Slot `actions(row, index)` adiciona coluna final (header `sr-only`, alinhada à direita, `w-0`); cliques na célula de ações fazem `stopPropagation` e não disparam `onRowClick`. Nenhuma ação pré-definida.

## Toolbar

`toolbar` é área de composição acima da tabela (borda inferior própria) � SearchBar/FilterPills/botões entram por fora; o DataTable não conhece busca nem filtros. FilterBar completo é sprint futura.

## Seleção futura

Não implementada (escopo). Caminho previsto (o motor TanStack já suporta):

```tsx
selection={{ selectedRowIds, onSelectionChange, getRowId }}
```

Coluna de checkbox à esquerda usando o Checkbox do @supertrans-transportes/ui, `aria-selected` na linha e integração com `getRowDisabled`.

## Validação contra os portais atuais

| Portal | Tela/arquivo | Requisito observado | Coberto na Sprint 3? | Observação |
|---|---|---|---|---|
| Aurora | `ui/DataTable/DataTable.tsx` (base de 32 telas) | `Column<T>` com render, `keyExtractor`, loading/erro/vazio embutidos, paginação com `limitOptions`, `onRowClick`, `rowClassName`, `align` | Sim | API pública espelha e amplia (accessorKey/Fn, width, sortable) |
| Aurora | `pages/estoque/components/TableEstoque.tsx` | colunas numéricas alinhadas à direita; formatação pt-BR; linha de sumário/totais | Sim | `align: "right"` + `footer` slot (story DenseOperationalExample) |
| Aurora | `pages/fornecedor/listaFornecedores/SupplierList.tsx` | `rowClassName` condicional + `onRowClick` para detalhe | Sim | ambos com variante fn |
| Aurora | `pages/inspecao-container/InspecaoContainerDashboard.tsx` | cards de status filtram a listagem acima da tabela | Sim (composição) | StatusCards + DataTable compostos na tela (story AuroraInspiredExample) � não acoplado |
| Aurora | `ui/Pagination.tsx` | "Exibir N / Mostrando X a Y de Z"; reset p/ página 1 ao trocar limite | Sim | herdado do block Pagination (Sprint 2) |
| Supertrans | `gestao-cadastros/clients-view.tsx` (+4 views irmãs) | skeleton de linhas no loading; empty com ação; error com retry; pills de filtro acima da tabela | Sim | TableSkeletonRows/EmptyState(+emptyAction)/ErrorState(+errorAction)/toolbar |
| Supertrans | `configurador/modules/module-table.tsx` | ordenação (localeCompare pt-BR); ações por linha com stopPropagation; badges/status por célula | Parcial/Sim | sorting controlado (client-side = chamador ordena); actions com stopPropagation nativo |
| Supertrans | envelope da API (`{data,total,page,limit}` + HateoasInterceptor) | paginação server-side com sortBy/sortOrder | Sim | pagination + sorting controlados casam 1:1 com `QueryDto` padrão |

## O que ficou fora

Sorting client-side automático; seleção de linhas; virtualização; column resizing/pinning; drag-and-drop; expansão de linha; FilterBar. Todos possíveis sem quebra de API (motor TanStack já presente).

## Exemplos

12 stories em `Blocks/DataTable` � incluindo os exemplos compostos inspirados nas telas reais dos dois portais (dados genéricos "Processo").
