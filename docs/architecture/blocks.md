# Blocks (@supertrans-transportes/blocks) â€” Camada 2

## DiferenÃ§a entre @supertrans-transportes/ui e @supertrans-transportes/blocks

`@supertrans-transportes/ui` (Camada 1) sÃ£o primitives: elementos de interface indivisÃ­veis (button, input, dialog), estilizados sobre Base UI/nativos. `@supertrans-transportes/blocks` (Camada 2) sÃ£o **composiÃ§Ãµes genÃ©ricas** desses primitives que resolvem padrÃµes recorrentes de tela (estado vazio, paginaÃ§Ã£o, cabeÃ§alho de pÃ¡gina, confirmaÃ§Ã£o). Blocks usam ui; ui nunca usa blocks.

## O que pode entrar em blocks

ComposiÃ§Ã£o sem domÃ­nio, com 2+ consumidores reais previstos nos portais, dados por props, aÃ§Ãµes por callbacks, conteÃºdo variÃ¡vel por slots (`ReactNode`).

## O que nÃ£o pode

Entidades de negÃ³cio (Cliente, Fatura, DI, Demanda...), rotas, endpoints, services, hooks de API, TanStack Query, axios/fetch, permissÃµes reais, autenticaÃ§Ã£o, Next.js, texto fixo de uma empresa.

## Regra de dados por props

Bloco nunca busca dados. `Pagination` recebe `page/limit/total` (compatÃ­vel com o envelope `{ data, total, page, limit }` da API padrÃ£o do grupo) e emite `onPageChange`. Quem chama a API Ã© a tela (Camada 3).

## Regra de slots

ConteÃºdo variÃ¡vel entra como `ReactNode` (`action` no EmptyState, `actions` no PageHeader), nunca como flag de negÃ³cio (`showExportButton`).

## Regra anti-domÃ­nio

Teste: "faria sentido num terceiro portal de outra empresa?" Textos default sÃ£o genÃ©ricos ("Nenhum registro encontrado"); textos de domÃ­nio vÃªm por props. Detalhes: `ai/rules/no-domain-in-shared-packages.md`. Enforcement automatizado: `pnpm check:pureza`.

## Blocos atuais (Sprint 2)

| Bloco | Origem | Nota |
|---|---|---|
| EmptyState, ErrorState, TableSkeletonRows | Supertrans `gestao-cadastros/shared.tsx` | generalizados (textos/aÃ§Ã£o viraram props; slate/red â†’ tokens) |
| FilterPill | API do plano (chip de filtro ativo) | o pill-dropdown do Supertrans ficarÃ¡ no futuro FilterBar |
| StatusDot | Supertrans (conceito) | tons semÃ¢nticos no lugar de Ativo/Inativo fixo |
| CodeBadge | Supertrans | tokenizado (#3caec4/#00526b â†’ primary) |
| ConfirmDialog | Aurora `ui/ConfirmDialog.tsx` | fecha sÃ³ quando onConfirm resolve; variant danger |
| Pagination | Aurora `ui/Pagination.tsx` | Select do @supertrans-transportes/ui; Intl.NumberFormat pt-BR |
| PageHeader | Aurora `ui/DataTable/PageHeader.tsx` | + eyebrow; sem breadcrumb/rota |
| SearchBar | Aurora `ui/DataTable/SearchBar.tsx` | controlada + debounce opcional (300ms) |
| StatusCards | Aurora `ui/DataTable/StatusCards.tsx` | tons semÃ¢nticos; clique/active opcionais por item |

| LoadingOverlay | Novo (Sprint 4) | compÃµe Spinner; children montados; aria-busy |

DataTable entregue na Sprint 3 (ver data-table.md). PrÃ³ximo â€” consome TableSkeletonRows, EmptyState, ErrorState e Pagination.

## Forms e Page Layouts (Sprint 5)

Form blocks: FormField, FormMessage, FormSection, FormActions, FieldGroup â€” agnÃ³sticos de form library (ver forms.md).
Page layouts: PageLayout, ListPageLayout, FormPageLayout, DetailPageLayout, DashboardPageLayout, SectionHeader, ContentCard (ver page-layouts.md).
Exemplos integrados: stories em "Blocks/Exemplos de PÃ¡gina".

## Chrome (Sprint 6)

navigation (tipos + filterNavigation), Breadcrumbs, Sidebar, AppShell â€” ver `app-shell.md`. Sem header fixo; link via renderLink; visibilidade via canAccessItem.
