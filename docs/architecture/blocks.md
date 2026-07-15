# Blocks (@supertrans-transportes/blocks)

Camada 2 do núcleo: composições genéricas construídas sobre `@supertrans-transportes/ui`.

Princípios:
- sem domínio
- sem rotas e permissões reais
- dados por props
- composição por slots
- stories obrigatórias

Catálogo atual:
- EmptyState, ErrorState, TableSkeletonRows
- FilterPill, StatusDot, CodeBadge
- ConfirmDialog, Pagination, PageHeader, SearchBar, StatusCards
- DataTable
- FormField, FormMessage, FormSection, FormActions, FieldGroup
- PageLayout, ListPageLayout, FormPageLayout, DetailPageLayout, DashboardPageLayout, SectionHeader, ContentCard
- Breadcrumbs, Sidebar, AppShell

Referências de origem:
- Supertrans: estrutura visual, tokens e vários estados compartilháveis
- Aurora: desenho de APIs compostas, especialmente DataTable, paginação e blocos de chrome/layout

Navegação (`navigation`, `Breadcrumbs`, `Sidebar`, `AppShell`) vive aqui: sem header fixo, link via `renderLink`, visibilidade via `canAccessItem`.
