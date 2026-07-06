# Camadas de componentes

```
Camada 0 â€” @supertrans-transportes/tokens   cores, radius, tipografia (CSS puro)
Camada 1 â€” @supertrans-transportes/ui       primitives: button, input, dialog, select...
Camada 2 â€” @supertrans-transportes/blocks   composiÃ§Ãµes genÃ©ricas: DataTable, PageHeader,
                           Pagination, ConfirmDialog, FilterBar, EmptyState,
                           StatCards, futuros templates de tela
Camada 3 â€” apps/produtos   telas, domÃ­nio, hooks de API, permissÃµes, auth
```

Regra de corte (ADR 0006): se o componente conhece entidade de negÃ³cio, rota, endpoint ou chave de permissÃ£o real, ele Ã© Camada 3 e fica no produto. `DataTable` genÃ©rico Ã© Camada 2; `TabelaDeFaturas` Ã© Camada 3 e usa o DataTable.

Regras de dependÃªncia: camada inferior nunca importa da superior; Camada 2 recebe dados por props e integraÃ§Ãµes por slots/providers (nunca faz fetch); regra dos dois usos para promover algo Ã  Camada 2.

Origem das APIs da Camada 2: padrÃµes do Portal-Aurora (`ui/DataTable/`, `Pagination`, `ConfirmDialog`, `StatusCards`), reimplementados sobre a Camada 1 â€” ver diagnÃ³stico comparativo.
