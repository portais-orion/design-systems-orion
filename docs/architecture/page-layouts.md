# Page Layouts

## Princípios

O layout sabe **como montar** a tela; nunca **o que ela significa**. Tudo por slots (`ReactNode`); zero dados, fetch, rotas ou domínio. Nome "Layout" (não "Template") para não confundir com geração de projeto/CLI. Origem: esqueleto repetido em 30+ telas do Aurora (header+stats+busca+tabela) e nas views/forms do Supertrans (max-w-3xl, space-y-6).

## PageLayout

Base: `header` + conteúdo (pilha space-y-6, padding p-6) + `footer`; `maxWidth: none | screen-xl | screen-2xl`. Todos os demais layouts compõem este.

## ListPageLayout

`header` �  `stats` �  `toolbar` + `filters` �  `content` (DataTable) �  `footer`. A tela liga busca� dados; o layout só posiciona.

## FormPageLayout

`form` (slot único � o `<form>` é do consumidor) contido em max-w-3xl, ou grid com `aside` (20rem) quando presente.

## DetailPageLayout

`summary` �  `tabs` �  `content`, com `aside` opcional. Compatível com Tabs do @supertrans-transportes/ui.

## DashboardPageLayout

`stats` �  `content` (grid livre) + `aside` opcional. Sem chart específico (lib de gráficos ainda não decidida � ADR pendente).

## Auxiliares

`SectionHeader` (h2 + descrição + ações) e `ContentCard` (Card com título/descrição/ações padronizados).

## O que fica fora

AppShell/Sidebar/Breadcrumb (Sprint 6); rotas e navegação; permissões; charts.

## Relação com AppShell/Sidebar/Breadcrumb

Entregue na Sprint 6 (`app-shell.md`). Os layouts renderizam **dentro** do AppShell: shell cuida de navegação/chrome, layout cuida do miolo da página. Breadcrumb entrará como slot do shell (não dos layouts).

## Exemplos

Stories integradas em `Blocks/Exemplos de Página`: ListPageExample, FormPageExample (com validação de erro + play function), DetailPageExample (Tabs + DataTable), DashboardPageExample.
