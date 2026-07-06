# Page Layouts

## PrincÃ­pios

O layout sabe **como montar** a tela; nunca **o que ela significa**. Tudo por slots (`ReactNode`); zero dados, fetch, rotas ou domÃ­nio. Nome "Layout" (nÃ£o "Template") para nÃ£o confundir com geraÃ§Ã£o de projeto/CLI. Origem: esqueleto repetido em 30+ telas do Aurora (header+stats+busca+tabela) e nas views/forms do Supertrans (max-w-3xl, space-y-6).

## PageLayout

Base: `header` + conteÃºdo (pilha space-y-6, padding p-6) + `footer`; `maxWidth: none | screen-xl | screen-2xl`. Todos os demais layouts compÃµem este.

## ListPageLayout

`header` â†’ `stats` â†’ `toolbar` + `filters` â†’ `content` (DataTable) â†’ `footer`. A tela liga buscaâ†’dados; o layout sÃ³ posiciona.

## FormPageLayout

`form` (slot Ãºnico â€” o `<form>` Ã© do consumidor) contido em max-w-3xl, ou grid com `aside` (20rem) quando presente.

## DetailPageLayout

`summary` â†’ `tabs` â†’ `content`, com `aside` opcional. CompatÃ­vel com Tabs do @supertrans-transportes/ui.

## DashboardPageLayout

`stats` â†’ `content` (grid livre) + `aside` opcional. Sem chart especÃ­fico (lib de grÃ¡ficos ainda nÃ£o decidida â€” ADR pendente).

## Auxiliares

`SectionHeader` (h2 + descriÃ§Ã£o + aÃ§Ãµes) e `ContentCard` (Card com tÃ­tulo/descriÃ§Ã£o/aÃ§Ãµes padronizados).

## O que fica fora

AppShell/Sidebar/Breadcrumb (Sprint 6); rotas e navegaÃ§Ã£o; permissÃµes; charts.

## RelaÃ§Ã£o com AppShell/Sidebar/Breadcrumb

Entregue na Sprint 6 (`app-shell.md`). Os layouts renderizam **dentro** do AppShell: shell cuida de navegaÃ§Ã£o/chrome, layout cuida do miolo da pÃ¡gina. Breadcrumb entrarÃ¡ como slot do shell (nÃ£o dos layouts).

## Exemplos

Stories integradas em `Blocks/Exemplos de PÃ¡gina`: ListPageExample, FormPageExample (com validaÃ§Ã£o de erro + play function), DetailPageExample (Tabs + DataTable), DashboardPageExample.
