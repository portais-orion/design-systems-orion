# Contexto de migraÃ§Ã£o â€” Portal-Aurora

Estado: doador das APIs de composiÃ§Ã£o (DataTable com Column<T>/keyExtractor/estados embutidos, Pagination, ConfirmDialog, PageHeader, SearchBar, StatusCards, Kanban) e de ~11 primitives que o Supertrans nÃ£o tem (tabs, popover, dropdown-menu, switch, radio-group, scroll-area, separator, alert, alert-dialog, command, multi-select).

Regra de ouro: APIs do Aurora sÃ£o a inspiraÃ§Ã£o; o CÃ“DIGO (Radix, TW3, `bg-white`/`text-gray-*`/`primary-500` hardcoded) nunca Ã© copiado â€” sempre recriado sobre `@supertrans-transportes/ui` + tokens.

PrÃ©-requisitos de convergÃªncia (no repo DELE, fase futura): npmâ†’pnpm, ESLintâ†’Biome, TW3â†’v4, remoÃ§Ã£o da escala `primary-50..900`, saneamento de services (hÃ¡ mock jsonplaceholder esquecido em faturamento).

Proibido nesta fase: alterar o repositÃ³rio do portal a partir de tarefas do nÃºcleo.
