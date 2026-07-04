# Camadas de componentes

```
Camada 0 — @grupo/tokens   cores, radius, tipografia (CSS puro)
Camada 1 — @grupo/ui       primitives: button, input, dialog, select...
Camada 2 — @grupo/blocks   composições genéricas: DataTable, PageHeader,
                           Pagination, ConfirmDialog, FilterBar, EmptyState,
                           StatCards, futuros templates de tela
Camada 3 — apps/produtos   telas, domínio, hooks de API, permissões, auth
```

Regra de corte (ADR 0006): se o componente conhece entidade de negócio, rota, endpoint ou chave de permissão real, ele é Camada 3 e fica no produto. `DataTable` genérico é Camada 2; `TabelaDeFaturas` é Camada 3 e usa o DataTable.

Regras de dependência: camada inferior nunca importa da superior; Camada 2 recebe dados por props e integrações por slots/providers (nunca faz fetch); regra dos dois usos para promover algo à Camada 2.

Origem das APIs da Camada 2: padrões do Portal-Aurora (`ui/DataTable/`, `Pagination`, `ConfirmDialog`, `StatusCards`), reimplementados sobre a Camada 1 — ver diagnóstico comparativo.
