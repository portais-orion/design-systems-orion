# Regras de blocks (@grupo/blocks)

- Blocks são composições genéricas SOBRE `@grupo/ui` — nunca reimplementam primitives nem estilos de marca.
- Dados sempre por props (`data`, `columns`, `isLoading`, `isError`); block NUNCA faz fetch, não importa axios/TanStack Query.
- Conteúdo via slots ReactNode (`actions`, `empty`, `footer`), não flags (`showX`).
- Estados obrigatórios em blocks de dados: loading (skeleton), empty, error — com defaults e slots de override.
- APIs de referência: DataTable/Pagination/ConfirmDialog/PageHeader/StatusCards do Portal-Aurora (API sim, código não — ver ai/context/06).
- Só entra block com 2+ consumidores reais previstos (regra dos dois usos).
- Blocks existentes desde a Sprint 2: empty-state, error-state, table-skeleton-rows, filter-pill, status-dot, code-badge, confirm-dialog, pagination, page-header, search-bar, status-cards. Use-os como referência de padrão.

## Aprendizados da Sprint 2

- Tons semânticos padronizados nos blocks: `default | success | warning | danger | info | muted` (success=emerald, warning=amber, danger=token destructive, info=sky — nunca `blue-*`). Reutilize este vocabulário; não invente tons novos por bloco.
- Diálogo de confirmação: fechar SOMENTE quando `onConfirm` resolver; erro mantém aberto (quem exibe o erro é o chamador).
- Comentário de proveniência no topo de cada block ("Origem: ..." ou "Recriado a partir de ...") é obrigatório — o check:pureza ignora comentários.
- `pnpm check:pureza` roda as verificações de vazamento (hex, radix, marca, portais, next, data-fetching) — execute antes de todo commit.

## DataTable (Sprint 3)

- DataTable é a referência de bloco composto: TanStack interno SEM vazar tipos; estados via blocks (TableSkeletonRows/EmptyState/ErrorState/Pagination); sorting/paginação controlados (server-side first).
- Novas features de tabela (seleção, expansão, pinning) entram no DataTable — NUNCA criar segunda tabela composta.
- Telas ordenam client-side ordenando o array antes de passar `data`; o componente não ordena.

## Forms e layouts (Sprint 5)

- FormField NUNCA importa RHF/Zod — erro chega por prop; conexão aria-describedby é do consumidor (ids `<htmlFor>-description`/`<htmlFor>-error`).
- Layouts de página: slots apenas; o `<form>` é do consumidor; "Layout", não "Template".
- Tela nova em portal: começar por ListPage/FormPage/Detail/DashboardPageLayout — não montar página à mão.

## Chrome (Sprint 6)

- Navegação é dirigida por dados (NavigationItem[]); NUNCA importar next/link, router ou permissão real — renderLink e canAccessItem são injetados pelo portal.
- meta.group=true (sem href) = grupo estático; children sem meta.group = submenu expansível.
- Filtragem: use filterNavigation de ../navigation (pai sem href sem filhos some; pai com href fica).
- Breadcrumb pertence ao shell; page layouts nunca renderizam breadcrumb.
- Subcomponentes da Sidebar são internos por decisão — não exportar.

- Sidebar NÃO tem botão de colapso embutido; colapso é do portal (collapsed/onCollapsedChange). Footer = slot livre (padrão: avatar+nome+sair). Visual de referência: sidebar do Supertrans, válido para as duas marcas via tokens.
