# Regras de blocks (@supertrans-transportes/blocks)

- Blocks sÃ£o composiÃ§Ãµes genÃ©ricas SOBRE `@supertrans-transportes/ui` â€” nunca reimplementam primitives nem estilos de marca.
- Dados sempre por props (`data`, `columns`, `isLoading`, `isError`); block NUNCA faz fetch, nÃ£o importa axios/TanStack Query.
- ConteÃºdo via slots ReactNode (`actions`, `empty`, `footer`), nÃ£o flags (`showX`).
- Estados obrigatÃ³rios em blocks de dados: loading (skeleton), empty, error â€” com defaults e slots de override.
- APIs de referÃªncia: DataTable/Pagination/ConfirmDialog/PageHeader/StatusCards do Portal-Aurora (API sim, cÃ³digo nÃ£o â€” ver ai/context/06).
- SÃ³ entra block com 2+ consumidores reais previstos (regra dos dois usos).
- Blocks existentes desde a Sprint 2: empty-state, error-state, table-skeleton-rows, filter-pill, status-dot, code-badge, confirm-dialog, pagination, page-header, search-bar, status-cards. Use-os como referÃªncia de padrÃ£o.

## Aprendizados da Sprint 2

- Tons semÃ¢nticos padronizados nos blocks: `default | success | warning | danger | info | muted` (success=emerald, warning=amber, danger=token destructive, info=sky â€” nunca `blue-*`). Reutilize este vocabulÃ¡rio; nÃ£o invente tons novos por bloco.
- DiÃ¡logo de confirmaÃ§Ã£o: fechar SOMENTE quando `onConfirm` resolver; erro mantÃ©m aberto (quem exibe o erro Ã© o chamador).
- ComentÃ¡rio de proveniÃªncia no topo de cada block ("Origem: ..." ou "Recriado a partir de ...") Ã© obrigatÃ³rio â€” o check:pureza ignora comentÃ¡rios.
- `pnpm check:pureza` roda as verificaÃ§Ãµes de vazamento (hex, radix, marca, portais, next, data-fetching) â€” execute antes de todo commit.

## DataTable (Sprint 3)

- DataTable Ã© a referÃªncia de bloco composto: TanStack interno SEM vazar tipos; estados via blocks (TableSkeletonRows/EmptyState/ErrorState/Pagination); sorting/paginaÃ§Ã£o controlados (server-side first).
- Novas features de tabela (seleÃ§Ã£o, expansÃ£o, pinning) entram no DataTable â€” NUNCA criar segunda tabela composta.
- Telas ordenam client-side ordenando o array antes de passar `data`; o componente nÃ£o ordena.

## Forms e layouts (Sprint 5)

- FormField NUNCA importa RHF/Zod â€” erro chega por prop; conexÃ£o aria-describedby Ã© do consumidor (ids `<htmlFor>-description`/`<htmlFor>-error`).
- Layouts de pÃ¡gina: slots apenas; o `<form>` Ã© do consumidor; "Layout", nÃ£o "Template".
- Tela nova em portal: comeÃ§ar por ListPage/FormPage/Detail/DashboardPageLayout â€” nÃ£o montar pÃ¡gina Ã  mÃ£o.

## Chrome (Sprint 6)

- NavegaÃ§Ã£o Ã© dirigida por dados (NavigationItem[]); NUNCA importar next/link, router ou permissÃ£o real â€” renderLink e canAccessItem sÃ£o injetados pelo portal.
- meta.group=true (sem href) = grupo estÃ¡tico; children sem meta.group = submenu expansÃ­vel.
- Filtragem: use filterNavigation de ../navigation (pai sem href sem filhos some; pai com href fica).
- Breadcrumb pertence ao shell; page layouts nunca renderizam breadcrumb.
- Subcomponentes da Sidebar sÃ£o internos por decisÃ£o â€” nÃ£o exportar.

- Sidebar NÃƒO tem botÃ£o de colapso embutido; colapso Ã© do portal (collapsed/onCollapsedChange). Footer = slot livre (padrÃ£o: avatar+nome+sair). Visual de referÃªncia: sidebar do Supertrans, vÃ¡lido para as duas marcas via tokens.
