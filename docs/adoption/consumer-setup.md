# Consumer setup — adotando `@portais-orion` num novo portal

Como configurar um portal (Next.js + Tailwind v4) para consumir o Orion `@portais-orion`
(`tokens`, `ui`, `blocks`) via GitHub Packages. Referência viva: `portal-supertrans`.

## 1. `.npmrc` (autenticação)

Scope oficial: **`@portais-orion`**. Registry: **GitHub Packages** (privado). Nunca commite token.

`~/.npmrc` (ou `.npmrc` local, **gitignored**):

```ini
@portais-orion:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_PACKAGES_TOKEN}
```

PAT classic com `read:packages` (instalar) e, para publicar, `write:packages`. Alternativa:
`npm login --scope=@portais-orion --auth-type=legacy --registry=https://npm.pkg.github.com`.

> Não use os scopes legados `@grupo`, `@mateusarcestr`, `@supertrans-transportes` (ver "Legados").

## 2. Instalar os packages

```bash
pnpm add @portais-orion/tokens @portais-orion/ui @portais-orion/blocks
# peers (se ainda não existirem no app):
pnpm add react react-dom @base-ui/react @tanstack/react-table \
         class-variance-authority tailwind-merge lucide-react
```

## 3. Importar tokens + `data-brand`

Em `globals.css` (topo, após os imports do Tailwind):

```css
@import "@portais-orion/tokens/base.css";
@import "@portais-orion/tokens/themes/supertrans.css";  /* tema da marca do portal */
```

No root layout, marque a marca no `<html>`:

```tsx
<html lang="pt-BR" data-brand="supertrans">   {/* ou a marca do portal */}
```

## 4. Tailwind `@source` (v4)

O Tailwind precisa escanear o código dos packages para gerar as classes usadas. Caminho
**relativo ao `globals.css`**. Para `apps/web/src/app/globals.css`:

```css
@source "../../node_modules/@portais-orion/ui/src";     /* /dist após hardening dist */
@source "../../node_modules/@portais-orion/blocks/src";
```

`../../node_modules` = `apps/web/node_modules` (onde o pnpm instala). Ajuste a profundidade se o
`globals.css` estiver noutro nível.

## 5. `transpilePackages` (enquanto source-based)

Os packages 0.1.0 são source-based → o Next precisa transpilá-los:

```ts
// next.config.ts
transpilePackages: ["@portais-orion/ui", "@portais-orion/blocks"]
```

> Após o hardening `dist` (ESM + `.d.ts`), teste **remover** `transpilePackages` e trocar o
> `@source` para `.../dist`. Mantenha só se o build exigir; documente a decisão.

## 6. Importar componentes

```tsx
import { Button } from "@portais-orion/ui/button";

export function Example() {
  return <Button>Salvar</Button>;
}
```

```tsx
import { PageHeader } from "@portais-orion/blocks/page-header";
import { DataTable, type DataTableColumn } from "@portais-orion/blocks/data-table";
```

Recomendado: crie barrels de adaptação locais (`components/nucleo-ui`, `components/nucleo-blocks`)
que re-exportam só o que o portal usa — isola o consumo e facilita troca de versão. Ver
`portal-supertrans/docs/nucleo-adapters.md`.

## 7. Validar build

```bash
pnpm --filter <web> run typecheck
pnpm --filter <web> build
pnpm --filter <web> dev
```

Confirmar que `Button`, `PageHeader`, `DataTable` etc. renderizam estilizados (tokens aplicados).

## 8. Quando faltar API no Orion

Não altere o package por preferência visual local. Abra backlog/issue no `nucleo-portais`
(`portais-orion/nucleo-portais`) descrevendo o gap genérico. Correções no Orion seguem: fix →
story → gates → changeset → publish patch → atualizar consumidores.

## 9. Migrar telas existentes

Use a skill **`portais-orion-adoption`** (`ai/skills/portais-orion-adoption/SKILL.md`): uma tela
de baixa criticidade por vez, preservando hooks/API/permissões.

## Legados (NÃO usar)

`@grupo`, `@mateusarcestr`, `@supertrans-transportes` são scopes legados. Não instale em novos
projetos. Os packages legados publicados não devem ser apagados sem autorização (ver
`docs/architecture/package-distribution.md`).
