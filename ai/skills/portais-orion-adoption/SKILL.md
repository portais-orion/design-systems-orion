---
name: portais-orion-adoption
description: Use esta skill para migrar gradualmente uma tela de aplicação React existente (Next.js ou Vite) de shadcn/Radix, MUI, Chakra ou biblioteca interna para o Orion @design-systems-orion, preservando contratos de negócio, APIs, permissões e layout.
---

# Portais Orion Adoption Skill

Guia operacional para migrar, com segurança, uma fatia vertical de uma aplicação React existente
para o Orion `@design-systems-orion`. O [manual canônico de adoção](../../../docs/adoption/consumer-setup.md)
define instalação, compatibilidade, CSS, temas e exports públicos; siga-o em vez de duplicar esse contrato.

## 1. Quando usar

- A aplicação React existente usa Next.js ou Vite e você migrará **uma** tela ou fluxo pequeno.
- A tela usa shadcn/Radix, MUI, Chakra ou uma biblioteca interna que será substituída gradualmente.

## 2. Quando NÃO usar

- Redesign de UX; CRUD complexo (mutations/diálogos) sem build real para validar; fluxo
  destrutivo ou financeiro; migração de várias telas de uma vez; mexer em auth/permissões/
  backend junto com a UI.

## 3. Regra de ouro

**Migrar visual e composição, não regra de negócio.** Preserve: hooks existentes, contratos de
API, permissões, rotas, dados, validações e ações. Troque só a estrutura visual/componentes.

## 4. Ordem obrigatória

1. Pré-checar stack, package manager, React/React DOM e Tailwind contra o manual canônico.
2. Fazer baseline de `typecheck`, testes e `build`, e capturar a tela alvo no navegador.
3. Inventariar imports da biblioteca anterior e classificá-los em primitive, block ou domínio.
4. Criar a matriz comportamento atual → subpath Orion → adaptação local necessária.
5. Configurar Orion pelo manual e criar adaptadores neutros em `components/orion/*`.
6. Migrar uma fatia vertical de baixo risco e validar estados/acessibilidade.
7. Manter coexistência; buscar consumidores restantes antes de desinstalar a biblioteca anterior.
8. Fazer rollback revertendo a fatia, sem alterar contratos de negócio.

## 5. Pré-checagem do projeto consumidor

Confirme se o portal usa Next.js ou Vite, qual package manager já está em uso, as versões de
React/React DOM e a configuração de Tailwind. Siga o manual canônico para peers, instalação e
CSS. Não recrie o projeto nem introduza aliases locais para o repositório Orion.

## 6. Validar tokens + `@source` do Tailwind

No CSS global, importe Tailwind, tokens e o tema conforme o manual. Cada `@source` é relativo ao
arquivo CSS e deve apontar para `ui/dist` e `blocks/dist`; alinhe `data-brand` ao tema selecionado.
Em Vite, confirme o plugin `@tailwindcss/vite`. Para Next.js, acrescente configuração extra somente
se houver um erro concreto que a justifique.

## 7. Escolher uma tela segura

Critérios: administrativa, baixa criticidade, **listagem**, sem fluxo financeiro/destrutivo, sem
mudança de API, fácil de validar. Bom modelo real: `/configurador/permissions` (read-only).
Evitar telas grandes/CRUD (ex.: `configurador/modules` = 823 linhas com mutations → **não**).

## 8. Mapear componentes locais → Orion

Antes de editar, faça inventário de todos os imports de shadcn/Radix, MUI, Chakra ou biblioteca
interna usados pela tela e classifique-os em primitives, blocks e domínio. Preserve hooks, queries,
permissões, formatters específicos e ações como código do portal. A tabela é a matriz mínima de
comportamento atual → subpath Orion → adaptação necessária; compare estados, eventos e
acessibilidade, não só nomes ou aparência.

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

Crie adaptadores neutros em `components/orion/*` e importe-os nas telas:

```tsx
// components/orion/ui.ts
export { Badge } from "@design-systems-orion/ui/badge";
export { Button } from "@design-systems-orion/ui/button";
export { Tabs, TabsList, TabsTrigger, TabsContent } from "@design-systems-orion/ui/tabs";

// components/orion/blocks.ts
export { PageHeader } from "@design-systems-orion/blocks/page-header";
export { SearchBar } from "@design-systems-orion/blocks/search-bar";
export { DataTable } from "@design-systems-orion/blocks/data-table";
export { CodeBadge } from "@design-systems-orion/blocks/code-badge";
export { EmptyState } from "@design-systems-orion/blocks/empty-state";
```

Use subpaths públicos reais nos adaptadores. Eles podem normalizar detalhes pequenos de API ou
expor aliases temporários, mas não devem copiar código Orion, esconder lógica de negócio ou
substituir integrações do portal.

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
rota escondida (fora do menu). Crie também o adaptador de navegação abaixo. O exemplo de
`renderLink` com `next/link` é **somente Next.js**; em Vite, implemente `RenderLink` com o
roteador já adotado pelo portal, sem importar `next/link`.

```tsx
// components/orion/navigation.ts
export { AppShell } from "@design-systems-orion/blocks/app-shell";
export type { CanAccessNavigationItem, NavigationItem, RenderLink }
  from "@design-systems-orion/blocks/navigation";

// Somente Next.js: uso do adaptador na rota canário.
import Link from "next/link";
import { AppShell, type CanAccessNavigationItem, type NavigationItem, type RenderLink }
  from "@/components/orion/navigation";

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

## 13. Coexistência, remoção e rollback

Uma tela por vez. Não remova shadcn/Radix, MUI, Chakra ou biblioteca interna durante a primeira
fatia: as bibliotecas podem coexistir enquanto houver consumidores. Antes de desinstalar, busque
todos os imports e usos restantes — inclusive em adaptadores, stories e testes — e só remova a
dependência quando a busca estiver vazia e os gates passarem. Se a validação falhar, reverta apenas
os commits da fatia migrada; não altere contratos de negócio para contornar incompatibilidades de UI.

## 14. Gates obrigatórios (antes de considerar pronto)

```bash
pnpm --filter <web> run typecheck   # sem erros NOVOS nos arquivos tocados
pnpm --filter <web> test            # ou o comando de testes já adotado pelo portal
pnpm --filter <web> build           # passa
pnpm --filter <web> dev             # sobe; validar a tela no navegador
```

Critério: estados (loading/empty/error/busca) corretos, foco e teclado acessíveis, e baseline
recuperado sem erros novos. Compare também a captura visual de referência com a tela migrada.

## 15. Proibições

Não migrar: CRUD complexo sem build real; fluxo destrutivo; fluxo financeiro; telas com muitos
efeitos colaterais; múltiplas telas de uma vez; permissões/auth/backend junto com a UI.

## 16. Checklist final

- [ ] baseline verde antes de começar
- [ ] stack, package manager, React e Tailwind conferidos contra o manual canônico
- [ ] baseline de typecheck/testes/build e captura visual registrados
- [ ] imports anteriores inventariados e classificados em primitive, block ou domínio
- [ ] matriz comportamento atual → subpath Orion → adaptação necessária preenchida
- [ ] `@source` para `dist` correto; `data-brand` no `<html>`
- [ ] tela de baixo risco (listagem) escolhida
- [ ] imports via adaptadores neutros em `components/orion/*`
- [ ] hooks/API/permissões/rotas preservados
- [ ] estados loading/empty/error/busca revisados
- [ ] `typecheck`/testes/`build`/`dev` verdes; tela validada no navegador
- [ ] coexistência mantida; consumidores restantes buscados antes de desinstalar a biblioteca anterior
- [ ] rollback possível pela reversão da fatia; gaps de API registrados como backlog

## 17. Referências reais (Supertrans, primeiro consumidor)

- Telas: `/configurador/permissions`, `/configurador/app-shell-canary`.
- Docs: `docs/nucleo-portais-consumo.md`, `docs/nucleo-adapters.md`,
  `docs/app-shell-permissions-map.md`, `docs/adoption/consumer-setup.md`.
- Setup de novos consumidores: `docs/adoption/consumer-setup.md`.
