# Sprint 6 — Resultado

## Resumo

Chrome oficial dos portais entregue no `@supertrans-transportes/blocks`: tipos de navegação, `Breadcrumbs`, `Sidebar` e `AppShell` — estrutura visual do Supertrans (tokens `sidebar-*`, tooltips em collapsed) + UX de colapso/submenu do Aurora, com link e visibilidade 100% injetados (`renderLink`/`canAccessItem`). 24 stories novas de chrome, incluindo as 4 integradas com os layouts da Sprint 5, e 4 play functions. Storybook: 215 → **239 stories**. Zero Next.js/router/permissão real no núcleo; nenhum portal alterado; validações e pureza verdes. Com esta sprint, o núcleo está completo para a **Sprint 7 — Supertrans consome**.

## Tipos de navegação criados

`packages/blocks/src/navigation/`: `NavigationItem` (id, label, href?, icon?, badge?, disabled?, children?, meta livre não interpretado), `BreadcrumbItem`, `RenderLinkProps`/`RenderLink`, `CanAccessNavigationItem` + helpers públicos `filterNavigation` (regras de filtragem da seção 12 do plano) e `containsActiveItem`.

## Breadcrumbs

`<nav aria-label="Breadcrumb">` + `<ol>`; `aria-current="page"` no atual (prop `current` ou último por default); separador customizável (chevron default); `renderLink` com fallback `<a>`; truncamento com `min-w-0`. 5 stories.

## Sidebar

w-64/w-16 com transição; colapso controlado e não controlado (`useControllableCollapsed`); brand/footer por slots; grupos estáticos (`meta.group === true`, label de seção uppercase) e submenus expansíveis (`aria-expanded`, chevron, **auto-open aditivo** quando um filho está ativo — padrão do Supertrans); item ativo com `aria-current` e `bg-sidebar-primary`; disabled; badges (ocultos em collapsed); tooltip por item quando collapsed; botão de colapso integrado (Recolher/Expandir com aria-label). 9 stories.

## AppShell

Sidebar (desktop, `hidden md:block`) + barra h-12 com breadcrumbs (e o botão mobile) + `<main>` rolável com canvas `bg-muted/30`. **Sem header/topbar fixo** (regra 21). Children = page layouts da Sprint 5. 10 stories.

## API final

Conforme seções 7-10 do plano, sem desvios de assinatura. `SidebarItem/SidebarGroup/SidebarSubmenu/SidebarCollapseButton` ficaram **internos** (decisão documentada: API dirigida por dados; exportar peças soltas incentivaria montagens divergentes entre portais).

## renderLink / canAccessItem

`renderLink` com fallback `<a>`; exemplos com Next Link e com permissões do portal documentados em `app-shell.md` (código do portal, nunca do núcleo). `canAccessItem` aplicado via `filterNavigation`: item negado some; grupo/submenu sem href que ficar vazio some; pai com href e filhos filtrados permanece como link.

## Responsividade

Desktop: sidebar fixa. Abaixo de `md`: sidebar some e um botão minimalista na barra de breadcrumbs abre a mesma navegação num `Sheet` esquerdo (fecha ao clicar em link). Story `MobileNavigation` com viewport mobile do Storybook. Limitações documentadas: sem flyout de submenu em collapsed (clicar no pai expande a sidebar — Sprint 8) e sem swipe no drawer.

## Stories adicionadas (24)

Breadcrumbs (5): Default, WithLinks, LongTrail, CurrentOnly, CustomSeparator. Sidebar (9): Default, Collapsed, WithGroups, WithSubmenus, WithBadges, WithDisabledItems, WithFilteredItems, WithFooter, ControlledCollapsed. AppShell (10): Default, WithBreadcrumbs, Collapsed, WithFilteredNavigation, ControlledCollapsed, MobileNavigation + 4 integradas.

## Stories integradas

AppShellWithListPage (StatusCards + SearchBar funcional + DataTable paginado + sidebarFooter), AppShellWithFormPage (FormSection/FieldGroup/FormField/FormActions), AppShellWithDetailPage (summary + DataTable), AppShellWithDashboardPage (StatusCards + grid de ContentCards).

## Play functions adicionadas (4/4 do plano)

- Sidebar/ControlledCollapsed: clica em Recolher/Expandir e assere `onCollapsedChange(true/false)` via `fn()`.
- Sidebar/WithSubmenus: abre/fecha "Cadastros" asserindo `aria-expanded` e visibilidade do filho.
- Breadcrumbs/WithLinks: assere `aria-current="page"` no item atual e o `nav` nomeado.
- AppShell/WithFilteredNavigation: assere que "Usuários" (meta.requiredPermission=admin.only) está ausente.

## Documentação criada/atualizada

`app-shell.md` (novo, com todas as seções do plano); `page-layouts.md` (relação com shell marcada como entregue); `blocks.md` (+seção Chrome); `ai/rules/blocks.md` (+5 regras); `ai/context/02-current-decisions.md`; changeset minor.

## Arquivos principais alterados

Novos: `packages/blocks/src/{navigation,breadcrumbs,sidebar,app-shell}/` (12 arquivos). Alterados: barrel, package.json (4 subpaths), docs citados.

## Validações executadas

```
pnpm install          → Done in 1s (zero deps novas)
pnpm check            → Checked 210 files. No fixes applied (verde)
pnpm typecheck        → 3 successful, 3 total
pnpm build            → 3 successful, 3 total
pnpm build:storybook  → completed successfully (239 stories)
pnpm check:pureza     → OK — nenhum vazamento encontrado
pnpm storybook (dev)  → HTTP 200
pnpm test:storybook   → não roda no sandbox (sem browsers Playwright);
                        localmente: playwright install chromium + pnpm test:storybook
```

## Resultado do check de pureza

Verde — confirma zero `next/`, zero portais, zero data-fetching nos packages.

## Problemas encontrados

Nenhum bloqueio; typecheck verde na primeira execução.

## Decisões tomadas

1. Subcomponentes da Sidebar internos (não exportados) — documentado.
2. Grupo vs submenu pela forma: `meta.group === true` sem href = grupo estático; children sem meta.group = submenu.
3. Collapsed conservador: clicar num pai de submenu expande a sidebar (flyout → Sprint 8).
4. Auto-open de submenu é aditivo (nunca fecha sozinho) — comportamento herdado do Supertrans.
5. Botão mobile vive na barra de breadcrumbs (sem topbar novo); drawer reusa a MESMA Sidebar dentro do Sheet.
6. Em collapsed, grupos viram separadores visuais com os filhos em ícone.

## O que ficou fora

Flyout de submenu em collapsed (Sprint 8); UserMenu/notificações/busca global; persistência do estado de colapso (é do portal, via collapsed controlado).

## Pendências

`pnpm test:storybook` local (6 play functions acumuladas); auditoria a11y contínua.

## Próxima sprint recomendada

**Sprint 7 — Supertrans consome o Núcleo**: primeiro consumo real — re-exports de `@supertrans-transportes/ui` em `components/ui/*`, `@supertrans-transportes/tokens` no globals.css e, oportunisticamente, o AppShell com `renderLink` de Next Link e `canAccessItem` sobre o `usePermissions` existente.
