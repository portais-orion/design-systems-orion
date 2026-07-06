# Sprint 6 â€” Resultado

## Resumo

Chrome oficial dos portais entregue no `@supertrans-transportes/blocks`: tipos de navegaÃ§Ã£o, `Breadcrumbs`, `Sidebar` e `AppShell` â€” estrutura visual do Supertrans (tokens `sidebar-*`, tooltips em collapsed) + UX de colapso/submenu do Aurora, com link e visibilidade 100% injetados (`renderLink`/`canAccessItem`). 24 stories novas de chrome, incluindo as 4 integradas com os layouts da Sprint 5, e 4 play functions. Storybook: 215 â†’ **239 stories**. Zero Next.js/router/permissÃ£o real no nÃºcleo; nenhum portal alterado; validaÃ§Ãµes e pureza verdes. Com esta sprint, o nÃºcleo estÃ¡ completo para a **Sprint 7 â€” Supertrans consome**.

## Tipos de navegaÃ§Ã£o criados

`packages/blocks/src/navigation/`: `NavigationItem` (id, label, href?, icon?, badge?, disabled?, children?, meta livre nÃ£o interpretado), `BreadcrumbItem`, `RenderLinkProps`/`RenderLink`, `CanAccessNavigationItem` + helpers pÃºblicos `filterNavigation` (regras de filtragem da seÃ§Ã£o 12 do plano) e `containsActiveItem`.

## Breadcrumbs

`<nav aria-label="Breadcrumb">` + `<ol>`; `aria-current="page"` no atual (prop `current` ou Ãºltimo por default); separador customizÃ¡vel (chevron default); `renderLink` com fallback `<a>`; truncamento com `min-w-0`. 5 stories.

## Sidebar

w-64/w-16 com transiÃ§Ã£o; colapso controlado e nÃ£o controlado (`useControllableCollapsed`); brand/footer por slots; grupos estÃ¡ticos (`meta.group === true`, label de seÃ§Ã£o uppercase) e submenus expansÃ­veis (`aria-expanded`, chevron, **auto-open aditivo** quando um filho estÃ¡ ativo â€” padrÃ£o do Supertrans); item ativo com `aria-current` e `bg-sidebar-primary`; disabled; badges (ocultos em collapsed); tooltip por item quando collapsed; botÃ£o de colapso integrado (Recolher/Expandir com aria-label). 9 stories.

## AppShell

Sidebar (desktop, `hidden md:block`) + barra h-12 com breadcrumbs (e o botÃ£o mobile) + `<main>` rolÃ¡vel com canvas `bg-muted/30`. **Sem header/topbar fixo** (regra 21). Children = page layouts da Sprint 5. 10 stories.

## API final

Conforme seÃ§Ãµes 7â€“10 do plano, sem desvios de assinatura. `SidebarItem/SidebarGroup/SidebarSubmenu/SidebarCollapseButton` ficaram **internos** (decisÃ£o documentada: API dirigida por dados; exportar peÃ§as soltas incentivaria montagens divergentes entre portais).

## renderLink / canAccessItem

`renderLink` com fallback `<a>`; exemplos com Next Link e com permissÃµes do portal documentados em `app-shell.md` (cÃ³digo do portal, nunca do nÃºcleo). `canAccessItem` aplicado via `filterNavigation`: item negado some; grupo/submenu sem href que ficar vazio some; pai com href e filhos filtrados permanece como link.

## Responsividade

Desktop: sidebar fixa. Abaixo de `md`: sidebar some e um botÃ£o minimalista na barra de breadcrumbs abre a mesma navegaÃ§Ã£o num `Sheet` esquerdo (fecha ao clicar em link). Story `MobileNavigation` com viewport mobile do Storybook. LimitaÃ§Ãµes documentadas: sem flyout de submenu em collapsed (clicar no pai expande a sidebar â€” Sprint 8) e sem swipe no drawer.

## Stories adicionadas (24)

Breadcrumbs (5): Default, WithLinks, LongTrail, CurrentOnly, CustomSeparator. Sidebar (9): Default, Collapsed, WithGroups, WithSubmenus, WithBadges, WithDisabledItems, WithFilteredItems, WithFooter, ControlledCollapsed. AppShell (10): Default, WithBreadcrumbs, Collapsed, WithFilteredNavigation, ControlledCollapsed, MobileNavigation + 4 integradas.

## Stories integradas

AppShellWithListPage (StatusCards + SearchBar funcional + DataTable paginado + sidebarFooter), AppShellWithFormPage (FormSection/FieldGroup/FormField/FormActions), AppShellWithDetailPage (summary + DataTable), AppShellWithDashboardPage (StatusCards + grid de ContentCards).

## Play functions adicionadas (4/4 do plano)

- Sidebar/ControlledCollapsed: clica em Recolher/Expandir e assere `onCollapsedChange(true/false)` via `fn()`.
- Sidebar/WithSubmenus: abre/fecha "Cadastros" asserindo `aria-expanded` e visibilidade do filho.
- Breadcrumbs/WithLinks: assere `aria-current="page"` no item atual e o `nav` nomeado.
- AppShell/WithFilteredNavigation: assere que "UsuÃ¡rios" (meta.requiredPermission=admin.only) estÃ¡ ausente.

## DocumentaÃ§Ã£o criada/atualizada

`app-shell.md` (novo, com todas as seÃ§Ãµes do plano); `page-layouts.md` (relaÃ§Ã£o com shell marcada como entregue); `blocks.md` (+seÃ§Ã£o Chrome); `ai/rules/blocks.md` (+5 regras); `ai/context/02-current-decisions.md`; changeset minor.

## Arquivos principais alterados

Novos: `packages/blocks/src/{navigation,breadcrumbs,sidebar,app-shell}/` (12 arquivos). Alterados: barrel, package.json (4 subpaths), docs citados.

## ValidaÃ§Ãµes executadas

```
pnpm install          â†’ Done in 1s (zero deps novas)
pnpm check            â†’ Checked 210 files. No fixes applied (verde)
pnpm typecheck        â†’ 3 successful, 3 total
pnpm build            â†’ 3 successful, 3 total
pnpm build:storybook  â†’ completed successfully (239 stories)
pnpm check:pureza     â†’ OK â€” nenhum vazamento encontrado
pnpm storybook (dev)  â†’ HTTP 200
pnpm test:storybook   â†’ nÃ£o roda no sandbox (sem browsers Playwright);
                        localmente: playwright install chromium + pnpm test:storybook
```

## Resultado do check de pureza

Verde â€” confirma zero `next/`, zero portais, zero data-fetching nos packages.

## Problemas encontrados

Nenhum bloqueio; typecheck verde na primeira execuÃ§Ã£o.

## DecisÃµes tomadas

1. Subcomponentes da Sidebar internos (nÃ£o exportados) â€” documentado.
2. Grupo vs submenu pela forma: `meta.group === true` sem href = grupo estÃ¡tico; children sem meta.group = submenu.
3. Collapsed conservador: clicar num pai de submenu expande a sidebar (flyout â†’ Sprint 8).
4. Auto-open de submenu Ã© aditivo (nunca fecha sozinho) â€” comportamento herdado do Supertrans.
5. BotÃ£o mobile vive na barra de breadcrumbs (sem topbar novo); drawer reusa a MESMA Sidebar dentro do Sheet.
6. Em collapsed, grupos viram separadores visuais com os filhos em Ã­cone.

## O que ficou fora

Flyout de submenu em collapsed (Sprint 8); UserMenu/notificaÃ§Ãµes/busca global; persistÃªncia do estado de colapso (Ã© do portal, via collapsed controlado).

## PendÃªncias

`pnpm test:storybook` local (6 play functions acumuladas); auditoria a11y contÃ­nua.

## PrÃ³xima sprint recomendada

**Sprint 7 â€” Supertrans consome o NÃºcleo**: primeiro consumo real â€” re-exports de `@supertrans-transportes/ui` em `components/ui/*`, `@supertrans-transportes/tokens` no globals.css e, oportunisticamente, o AppShell com `renderLink` de Next Link e `canAccessItem` sobre o `usePermissions` existente.
