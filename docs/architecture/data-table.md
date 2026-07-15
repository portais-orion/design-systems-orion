# Data Table

Bloco oficial do grupo para listagens administrativas e operacionais. Une API inspirada no Aurora com markup e tokens do núcleo.

Exports públicos:
- `DataTableColumn<T>`
- `DataTablePagination`
- `DataTableSorting`
- `DataTableProps<T>`

Capacidades:
- loading, empty, error embutidos
- paginação controlada
- sorting controlado, server-side first
- toolbar e footer por slots
- actions por linha
- `onRowClick`
- alinhamento por coluna

Motor interno:
- TanStack Table
- `manualSorting`
- sem vazamento de tipos avançados para API pública

Princípio: o DataTable não conhece busca nem filtros. Isso entra por composição externa.
