---
name: portais-orion-adoption
description: Use esta skill quando precisar migrar uma tela de portal interno para consumir o Orion @design-systems-orion (tokens/ui/blocks), preservando regras de negócio, APIs, permissões, layout e gates de validação. Não use para redesign, CRUD complexo sem build real, ou migração em massa.
---

# Portais Orion Adoption Skill

Guia operacional para migrar, com segurança, uma tela de um portal interno para consumir o
Orion `@design-systems-orion`. Baseada nas migrações reais do `portal-supertrans` (Sprints 7–9).

## 1. Quando usar

- O portal já consome (ou vai consumir) `@design-systems-orion/tokens`, `@design-systems-orion/ui`,
  `@design-systems-orion/blocks` via `node_modules` (npm público, sem token), e você vai migrar **uma**
  tela para os componentes do Orion.

## 2. Quando NÃO usar

- Redesign de UX; CRUD complexo (mutations/diálogos) sem build real para validar; fluxo
  destrutivo ou financeiro; migração de várias telas de uma vez; mexer em auth/permissões/
  backend junto com a UI. Aurora é futuro e depende de preparo próprio (Turborepo) — não é alvo.

## 3. Regra de ouro

**Migrar visual e composição, não regra de negócio.** Preserve: hooks existentes, contratos de
API, permissões, rotas, dados, validações e ações. Troque só a estrutura visual/componentes.

## 4. Ordem obrigatória

1. Baseline (`typecheck`/`build`/`dev` verdes; tela alvo funcional).
2. Auditar scopes (só `@design-systems-orion` ativo).
3. Confirmar tokens + `@source` do Tailwind.
4. Escolher tela de baixo risco (listagem).
5. Migrar componentes visuais via adaptadores locais.
6. Validar estados (loading/empty/error/busca).
7. Rodar `typecheck`/`build`/`dev`.
8. Documentar gaps do Orion (backlog).

## 5. Pré-checagem do projeto consumidor

```bash
grep -R "@grupo/\|@mateusarcestr\|@supertrans-transportes" apps/web -n   # deve dar vazio
grep -R "@design-systems-orion" apps/web -n                                      # deps + globals + adaptadores
```

Confirmar: `apps/web/package.json` tem `@design-systems-orion/{tokens,ui,blocks}`; `next.config.ts` tem
`transpilePackages` (enquanto os packages forem source-based); `tsconfig.json` **sem** aliases do
Orion; **sem** caminho local para `nucleo-portais`.

## 6. Validar tokens + `@source` do Tailwind

`apps/web/src/app/globals.css` deve ter:

```css
@import "@design-systems-orion/tokens/base.css";
@import "@design-systems-orion/tokens/themes/supertrans.css";
@source "../../node_modules/@design-systems-orion/ui/src";     /* ou /dist após hardening */
@source "../../node_modules/@design-systems-orion/blocks/src";
```

O `@source` é **relativo ao globals.css**. De `apps/web/src/app/`, `../../node_modules` =
`apps/web/node_modules` (correto). `../node_modules` aponta para `src/node_modules` (**errado**).
E `data-brand="supertrans"` deve estar no `<html>` (ativa o tema da marca).

## 7. Escolher uma tela segura

Critérios: administrativa, baixa criticidade, **listagem**, sem fluxo financeiro/destrutivo, sem
mudança de API, fácil de validar. Bom modelo real: `/configurador/permissions` (read-only).
Evitar telas grandes/CRUD (ex.: `configurador/modules` = 823 linhas com mutations → **não**).

## 8. Mapear componentes locais → Orion

| Padrão local | Preferir Orion (`@design-systems-orion/...`) |
|---|---|
| header de página manual | `blocks/page-header` → `PageHeader` |
| tabela custom simples | `blocks/data-table` → `DataTable` |
| busca simples | `blocks/search-bar` → `SearchBar` |
| badge de status | `ui/badge` → `Badge` |
| código/chave técnica | `blocks/code-badge` → `CodeBadge` |
| vazio manual | `blocks/empty-state` → `EmptyState` |
| erro manual | `blocks/error-state` → `ErrorState` |
| loading de tabela | `DataTable` (`isLoading`) / `blocks/loading-overlay` |
| cards de status | `blocks/status-cards` → `StatusCards` |
| layout de lista | `blocks/list-page-layout` / `blocks/page-layout` |
| tabs | `ui/tabs` → `Tabs/TabsList/TabsTrigger/TabsContent` |
| botão | `ui/button` → `Button` |

## 9. Usar os adaptadores locais (não importar `@design-systems-orion` direto na tela)

Importe SEMPRE dos barrels de adaptação, nunca de `@design-systems-orion/*` direto:

```tsx
import { Badge, Button, Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/grupo-ui";
import { PageHeader, SearchBar, DataTable, CodeBadge, EmptyState, type DataTableColumn }
  from "@/components/grupo-blocks";
```

Se um componente ainda não estiver no barrel, adicione o re-export lá (subpath público apenas).
Ver `portal-supertrans/docs/nucleo-adapters.md`.

## 10. Preservar hooks, APIs, permissões

- Mantenha `useQuery`/`fetchOrThrow` e o contrato da API intactos (só troque o markup).
- `DataTable` é server-first: `data`, `columns: DataTableColumn<T>[]`, `keyExtractor`, `isLoading`,
  `pagination`, `sorting`, `toolbar`, `emptyTitle/Description/Action`. Nada do TanStack vaza.
- Permissões: continue usando `usePermissions().hasPermission(PERMISSION_KEYS.X)` /
  `<PermissionGate>` como já é feito. Não crie sistema novo.

## 11. Exemplo real — DataTable (do `/configurador/permissions`)

```tsx
const columns: DataTableColumn<TechnicalPermission>[] = [
  { id: "key", header: "Chave Técnica", cell: (i) => <CodeBadge>{i.key}</CodeBadge> },
  { id: "description", header: "Descrição", cell: (i) => <span className="text-foreground">{i.description}</span> },
  { id: "category", header: "Categoria", cell: (i) => i.category
      ? <Badge variant="secondary">{i.category}</Badge>
      : <span className="text-xs italic text-muted-foreground">Sem categoria</span> },
];

<DataTable
  data={rows}
  columns={columns}
  keyExtractor={(i) => i.id}
  isLoading={isLoading}
  emptyTitle="Nenhum registro encontrado"
  toolbar={<SearchBar value={q} onChange={setQ} placeholder="Buscar..." />}
/>
```

## 12. Avaliar AppShell (opcional, controlado)

Não substitua o shell global (`AdminShell`). Se for provar o `AppShell` do Orion, faça numa
rota escondida (fora do menu). Contrato:

```tsx
import Link from "next/link";
import { AppShell } from "@design-systems-orion/blocks/app-shell";
import type { CanAccessNavigationItem, NavigationItem, RenderLink }
  from "@design-systems-orion/blocks/navigation";

const renderLink: RenderLink = ({ href, children, className, onClick, ...p }) => (
  <Link href={href} className={className} onClick={onClick} {...p}>{children}</Link>
);

const canAccessItem: CanAccessNavigationItem = (item) => {
  const req = item.meta?.requiredPermission;
  return !req || hasPermission(String(req));
};
```

Referência real: `portal-supertrans/apps/web/src/app/(admin)/configurador/app-shell-canary/page.tsx`,
`docs/app-shell-permissions-map.md`. O Orion **nunca** importa Next nem conhece permissões.

## 13. Evitar migração em massa

Uma tela por vez. Não troque todos os `components/ui` locais. Não remova o shadcn local. Não
abra escopo além da tela escolhida.

## 14. Gates obrigatórios (antes de considerar pronto)

```bash
pnpm --filter <web> run typecheck   # sem erros NOVOS nos arquivos tocados
pnpm --filter <web> build           # passa
pnpm --filter <web> dev             # sobe; validar a tela no navegador
```

Critério: build/dev verdes; estados (loading/empty/error/busca) corretos; `@design-systems-orion` único
scope ativo; nenhum caminho local para `nucleo-portais`.

## 15. Proibições

Não migrar: CRUD complexo sem build real; fluxo destrutivo; fluxo financeiro; telas com muitos
efeitos colaterais; múltiplas telas de uma vez; permissões/auth/backend junto com a UI.

## 16. Checklist final

- [ ] baseline verde antes de começar
- [ ] só `@design-systems-orion` ativo; `@source` correto; `data-brand` no `<html>`
- [ ] tela de baixo risco (listagem) escolhida
- [ ] imports via adaptadores `@/components/grupo-{ui,blocks}`
- [ ] hooks/API/permissões/rotas preservados
- [ ] estados loading/empty/error/busca revisados
- [ ] `typecheck`/`build`/`dev` verdes; tela validada no navegador
- [ ] gaps de API do Orion registrados como backlog (não alterar o package por preferência visual)

## 17. Referências reais (Supertrans, primeiro consumidor)

- Telas: `/configurador/permissions`, `/configurador/app-shell-canary`.
- Docs: `docs/nucleo-portais-consumo.md`, `docs/nucleo-adapters.md`,
  `docs/app-shell-permissions-map.md`, `docs/adoption/consumer-setup.md`.
- Setup de novos consumidores: `docs/adoption/consumer-setup.md`.
