# Contexto de migração � Portal-Aurora

Estado: doador das APIs de composição (DataTable com Column<T>/keyExtractor/estados embutidos, Pagination, ConfirmDialog, PageHeader, SearchBar, StatusCards, Kanban) e de ~11 primitives que o Supertrans não tem (tabs, popover, dropdown-menu, switch, radio-group, scroll-area, separator, alert, alert-dialog, command, multi-select).

Regra de ouro: APIs do Aurora são a inspiração; o C�DIGO (Radix, TW3, `bg-white`/`text-gray-*`/`primary-500` hardcoded) nunca é copiado � sempre recriado sobre `@supertrans-transportes/ui` + tokens.

Pré-requisitos de convergência (no repo DELE, fase futura): npm� pnpm, ESLint� Biome, TW3� v4, remoção da escala `primary-50..900`, saneamento de services (há mock jsonplaceholder esquecido em faturamento).

Proibido nesta fase: alterar o repositório do portal a partir de tarefas do núcleo.
