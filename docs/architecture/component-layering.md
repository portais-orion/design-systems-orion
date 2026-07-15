# Component Layering

Camada 0 → `@supertrans-transportes/tokens`
cores, radius, tipografia e variáveis CSS puras.

Camada 1 → `@supertrans-transportes/ui`
primitives headless estilizadas: button, input, dialog, select, tooltip, tabs, combobox, multi-select e afins.

Camada 2 → `@supertrans-transportes/blocks`
composições genéricas: DataTable, PageHeader, Pagination, ConfirmDialog, layouts de página, Sidebar, AppShell.

Camada 3 → apps/produtos
termos de negócio, telas, rotas, hooks de API, auth, permissões reais e integrações específicas.

Regra de corte: se conhece entidade de negócio, rota, endpoint ou chave de permissão real, é Camada 3.

Origem das APIs da Camada 2: padrões do Portal-Aurora (`ui/DataTable/`, `Pagination`, `ConfirmDialog`, `StatusCards`), reimplementados sobre a Camada 1.
