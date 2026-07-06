# Blocks (@supertrans-transportes/blocks) � Camada 2

## Diferença entre @supertrans-transportes/ui e @supertrans-transportes/blocks

`@supertrans-transportes/ui` (Camada 1) são primitives: elementos de interface indivisíveis (button, input, dialog), estilizados sobre Base UI/nativos. `@supertrans-transportes/blocks` (Camada 2) são **composições genéricas** desses primitives que resolvem padrões recorrentes de tela (estado vazio, paginação, cabeçalho de página, confirmação). Blocks usam ui; ui nunca usa blocks.

## O que pode entrar em blocks

Composição sem domínio, com 2+ consumidores reais previstos nos portais, dados por props, ações por callbacks, conteúdo variável por slots (`ReactNode`).

## O que não pode

Entidades de negócio (Cliente, Fatura, DI, Demanda...), rotas, endpoints, services, hooks de API, TanStack Query, axios/fetch, permissões reais, autenticação, Next.js, texto fixo de uma empresa.

## Regra de dados por props

Bloco nunca busca dados. `Pagination` recebe `page/limit/total` (compatível com o envelope `{ data, total, page, limit }` da API padrão do grupo) e emite `onPageChange`. Quem chama a API é a tela (Camada 3).

## Regra de slots

Conteúdo variável entra como `ReactNode` (`action` no EmptyState, `actions` no PageHeader), nunca como flag de negócio (`showExportButton`).

## Regra anti-domínio

Teste: "faria sentido num terceiro portal de outra empresa?" Textos default são genéricos ("Nenhum registro encontrado"); textos de domínio vêm por props. Detalhes: `ai/rules/no-domain-in-shared-packages.md`. Enforcement automatizado: `pnpm check:pureza`.

## Blocos atuais (Sprint 2)

| Bloco | Origem | Nota |
|---|---|---|
| EmptyState, ErrorState, TableSkeletonRows | Supertrans `gestao-cadastros/shared.tsx` | generalizados (textos/ação viraram props; slate/red �  tokens) |
| FilterPill | API do plano (chip de filtro ativo) | o pill-dropdown do Supertrans ficará no futuro FilterBar |
| StatusDot | Supertrans (conceito) | tons semânticos no lugar de Ativo/Inativo fixo |
| CodeBadge | Supertrans | tokenizado (#3caec4/#00526b �  primary) |
| ConfirmDialog | Aurora `ui/ConfirmDialog.tsx` | fecha só quando onConfirm resolve; variant danger |
| Pagination | Aurora `ui/Pagination.tsx` | Select do @supertrans-transportes/ui; Intl.NumberFormat pt-BR |
| PageHeader | Aurora `ui/DataTable/PageHeader.tsx` | + eyebrow; sem breadcrumb/rota |
| SearchBar | Aurora `ui/DataTable/SearchBar.tsx` | controlada + debounce opcional (300ms) |
| StatusCards | Aurora `ui/DataTable/StatusCards.tsx` | tons semânticos; clique/active opcionais por item |

| LoadingOverlay | Novo (Sprint 4) | compõe Spinner; children montados; aria-busy |

DataTable entregue na Sprint 3 (ver data-table.md). Próximo � consome TableSkeletonRows, EmptyState, ErrorState e Pagination.

## Forms e Page Layouts (Sprint 5)

Form blocks: FormField, FormMessage, FormSection, FormActions, FieldGroup � agnósticos de form library (ver forms.md).
Page layouts: PageLayout, ListPageLayout, FormPageLayout, DetailPageLayout, DashboardPageLayout, SectionHeader, ContentCard (ver page-layouts.md).
Exemplos integrados: stories em "Blocks/Exemplos de Página".

## Chrome (Sprint 6)

navigation (tipos + filterNavigation), Breadcrumbs, Sidebar, AppShell � ver `app-shell.md`. Sem header fixo; link via renderLink; visibilidade via canAccessItem.
