# AppShell

## Princípio

O núcleo sabe **como renderizar** a navegação; o portal sabe **para onde cada item aponta e quem pode vê-lo**. O shell não conhece Next.js, React Router, sessão, CASL, Better Auth, Keycloak nem permissões reais — links entram por `renderLink`, visibilidade por `canAccessItem`. Sem header/topbar fixo: o padrão do grupo é sidebar + barra de breadcrumbs + miolo (origem: AdminShell do Supertrans).

## Relação entre Shell e PageLayout

Shell é o **chrome** da aplicação (navegação, marca, breadcrumbs); PageLayout e derivados (Sprint 5) são o **miolo** e entram como `children`. Breadcrumb pertence ao chrome, nunca aos page layouts.

## NavigationItem

`{ id, label, href?, icon?, badge?, disabled?, children?, meta? }`. Sem href = agrupador; com children = grupo ou submenu; `meta` é espaço livre do portal (ex.: chave de permissão) que o núcleo **não interpreta**. Regra de forma: `meta.group === true` (sem href) → **grupo estático** (label de seção, filhos sempre visíveis); children sem `meta.group` → **submenu expansível** (aria-expanded, auto-open aditivo quando um filho está ativo).

## Breadcrumbs

`<nav aria-label="Breadcrumb">` + `<ol>`; item atual com `aria-current="page"` (explícito via `current` ou o último por default); separador customizável; `renderLink` opcional (fallback `<a>`). Desacoplado do breadcrumbs do Supertrans, que calculava trilha por rota/permissão — aqui a trilha vem pronta por dados.

## Sidebar

Tokens `sidebar-*` (cada marca define os seus); larguras w-64/w-16; colapso controlado e não controlado; tooltip nos itens quando collapsed; badges (ocultos em collapsed); disabled; item ativo com `aria-current="page"`; grupos e submenus conforme regra acima; **sem botão de colapso embutido** (decisão pós-Sprint 6, alinhada à referência visual do Supertrans): o colapso é controlado pelo portal via `collapsed`/`onCollapsedChange`, se ele quiser oferecer o gesto. O rodapé é slot livre — padrão recomendado: avatar + nome/cargo + ação de sair (ver story WithFooter).

**Decisões**: `SidebarItem/SidebarGroup/SidebarSubmenu/SidebarCollapseButton` são **internos** — a API é dirigida por dados; exportar peças soltas incentivaria montagens divergentes. **Submenu em collapsed (versão conservadora)**: clicar no pai expande a sidebar e abre o submenu; flyout em collapsed fica para a Sprint 8.

## AppShell

Compõe Sidebar (desktop) + barra de breadcrumbs (h-12, onde também vive o botão mobile) + `<main>` rolável com canvas `bg-muted/30`. Aceita os page layouts da Sprint 5 como children; repassa collapsed/renderLink/canAccessItem.

## renderLink

```tsx
const renderLink: RenderLink = ({ href, children, className, ...props }) => (
  <a href={href} className={className} {...props}>{children}</a>
);
```

## canAccessItem

Filtro puro sobre a árvore (`filterNavigation`): item negado some; **grupo/submenu sem href que ficar sem filhos some**; pai com href e filhos filtrados permanece como link simples. O núcleo nunca lê a permissão — só chama a função.

## Responsividade

Desktop (md+): sidebar lateral fixa. Abaixo de md: sidebar some, botão minimalista na barra de breadcrumbs abre a MESMA navegação num `Sheet` (drawer esquerdo, fecha ao clicar num link). Limitação documentada: sem gesto de swipe e sem persistência do estado do drawer.

## O que fica fora

UserMenu real, notificações, busca global, rotas, providers de auth/permissão, layouts específicos de produto (Configurador/Cliente/Aurora).

## Exemplo com link nativo

Ver stories `Blocks/Chrome/AppShell` — todas usam `<a>` via renderLink default.

## Exemplo futuro com Next Link (código do portal)

```tsx
import Link from "next/link";
const renderLink: RenderLink = ({ href, children, className, ...props }) => (
  <Link href={href} className={className} {...props}>{children}</Link>
);
```

## Exemplo futuro com permissões do portal (código do portal)

```tsx
const { hasPermission } = usePermissions();
<AppShell
  canAccessItem={(item) =>
    !item.meta?.requiredPermission || hasPermission(String(item.meta.requiredPermission))
  }
  activeItemId={findActiveId(pathname, navigation)}
  ...
/>
```
