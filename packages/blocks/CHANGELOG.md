# @portais-orion/blocks

## 0.3.1

### Patch Changes

- Updated dependencies
  - @portais-orion/ui@0.3.0

## 0.3.0

### Minor Changes

- Novos blocos para o padrão visual CRUD (gaps documentados na adoção do Supertrans):

  - `CrudModalHeader` — cabeçalho de modal (ícone tonalizado + título + subtítulo + badges) para criar/editar/detalhe.
  - `FiltersCard` — card de filtros colapsável (título + toggle Mostrar/Ocultar + slot de controles + footer "Limpar filtros").
  - `LauncherCard` — card de lançador de módulo (ícone + título + descrição + CTA), com estado clicável opcional.

  Presentational, sem domínio/rota/Next. `StatusCards` (faixa de resumo) já existia; `CrudTableFooter`
  não foi criado (coberto pela paginação embutida do `DataTable`).

## 0.2.1

### Patch Changes

- fix: update gen-dist-exports to use .mjs and .d.mts extensions instead of .js and .d.ts
- Updated dependencies
  - @portais-orion/ui@0.2.1

## 0.2.0

### Minor Changes

- 133cd34: Sprint 2: primeira leva de blocks. Do Supertrans (shared.tsx, generalizados): EmptyState, ErrorState, TableSkeletonRows, FilterPill, StatusDot, CodeBadge. Do Aurora (APIs recriadas sobre @portais-orion/ui): ConfirmDialog, Pagination, PageHeader, SearchBar, StatusCards. Tons semânticos padronizados; subpath exports; script check:pureza no repo.
- 133cd34: Sprint 3: DataTable � bloco oficial de listagem ("melhor dos dois"): API Column<T>/keyExtractor do Aurora, markup/tokens do Núcleo, TanStack Table interno (manualSorting), estados loading/empty/error embutidos, paginação e sorting controlados, actions por linha com stopPropagation, toolbar/footer slots.
- 133cd34: Sprint 4: +7 primitives no @portais-orion/ui (popover, radio-group, scroll-area, sheet, accordion, progress, spinner â€” Base UI/tokens) e LoadingOverlay no @portais-orion/blocks. Combobox/Command/MultiSelect analisados e adiados para 4.1 com API definida (docs/architecture/advanced-inputs.md).
- 133cd34: Sprint 5: form blocks (FormField, FormMessage, FormSection, FormActions, FieldGroup � agnósticos de RHF/Zod) e page layouts (PageLayout, ListPageLayout, FormPageLayout, DetailPageLayout, DashboardPageLayout, SectionHeader, ContentCard). Stories integradas de página completa com play function de validação.
- 133cd34: Sprint 6: chrome oficial � tipos de navegação (NavigationItem, RenderLink, canAccessItem, filterNavigation), Breadcrumbs (nav/ol/aria-current), Sidebar (tokens sidebar-\*, colapso controlado/não controlado, grupos, submenus com auto-open, badges, disabled, filtro injetado, tooltips em collapsed) e AppShell (sidebar + barra de breadcrumbs + miolo, mobile via Sheet). Sem Next.js, sem permissões reais.

### Patch Changes

- Build distribuível (Sprint 10 hardening): tsup para `ui` e `blocks` (ESM + `.d.ts`, subpaths
  preservados, sem bundlar peers), cópia de CSS para `dist` em `tokens`. Sem breaking change de API
  pública. `publishConfig.exports` aponta para `dist`; consumidores podem dispensar
  `transpilePackages` após validar o build ESM.
- Updated dependencies [133cd34]
- Updated dependencies
- Updated dependencies [133cd34]
- Updated dependencies [133cd34]
  - @portais-orion/ui@0.2.0
