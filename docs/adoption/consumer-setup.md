# Consumer setup — adotando `@design-systems-orion` num novo portal

Como configurar um portal (Next.js + Tailwind v4) para consumir o Orion `@design-systems-orion`
(`tokens`, `ui`, `blocks`), publicado público no npm (registry.npmjs.org). Referência viva:
`portal-supertrans`.

## 1. Sem autenticação para instalar

Scope oficial: **`@design-systems-orion`**. Registry: **npm público** (registry.npmjs.org). Não precisa
de `.npmrc`, token ou login — instala igual qualquer pacote público do npm.

> Não use os scopes legados `@grupo`, `@mateusarcestr`, `@supertrans-transportes` (ver "Legados").
> `.npmrc`/token só é necessário para quem **publica** novas versões (mantenedores do Orion) —
> ver `.npmrc.example`.

## 2. Instalar os packages

```bash
pnpm add @design-systems-orion/tokens @design-systems-orion/ui @design-systems-orion/blocks
# peers (se ainda não existirem no app):
pnpm add react react-dom @base-ui/react @tanstack/react-table \
         class-variance-authority tailwind-merge lucide-react
```

## 3. Importar tokens + `data-brand`

Em `globals.css` (topo, após os imports do Tailwind):

```css
@import "@design-systems-orion/tokens/base.css";
@import "@design-systems-orion/tokens/themes/supertrans.css";  /* tema da marca do portal */
```

No root layout, marque a marca no `<html>`:

```tsx
<html lang="pt-BR" data-brand="supertrans">   {/* ou a marca do portal */}
```

## 4. Tailwind `@source` (v4)

O Tailwind precisa escanear o código dos packages para gerar as classes usadas. Os packages
publicam só `dist/` no npm (tarball não inclui `src/` — `"files": ["dist"]` no `package.json`),
então aponte pro `dist`. Caminho **relativo ao `globals.css`**. Para `apps/web/src/app/globals.css`:

```css
@source "../../node_modules/@design-systems-orion/ui/dist";
@source "../../node_modules/@design-systems-orion/blocks/dist";
```

`../../node_modules` = `apps/web/node_modules` (onde o pnpm instala). Ajuste a profundidade se o
`globals.css` estiver noutro nível. As classes existem como string literal dentro dos `.mjs`
compilados (`className: cn("space-y-6 p-6", ...)`), então o scanner de conteúdo do Tailwind as
encontra normalmente.

## 5. `transpilePackages`

Não é necessário. Os packages publicam ESM pré-compilado (`dist/*.mjs` + `.d.mts`), sem JSX/TS
pra transformar — o Next importa como qualquer dependência ESM comum. Só adicione
`transpilePackages` se o build reclamar de algo específico do seu setup; nesse caso, documente o
motivo.

## 6. Importar componentes

```tsx
import { Button } from "@design-systems-orion/ui/button";

export function Example() {
  return <Button>Salvar</Button>;
}
```

```tsx
import { PageHeader } from "@design-systems-orion/blocks/page-header";
import { DataTable, type DataTableColumn } from "@design-systems-orion/blocks/data-table";
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
(`portais-orion/design-systems-orion`) descrevendo o gap genérico. Correções no Orion seguem: fix →
story → gates → changeset → publish patch → atualizar consumidores.

## 9. Migrar telas existentes

Use a skill **`portais-orion-adoption`** (`ai/skills/portais-orion-adoption/SKILL.md`): uma tela
de baixa criticidade por vez, preservando hooks/API/permissões.

## Legados (NÃO usar)

`@grupo`, `@mateusarcestr`, `@supertrans-transportes`, `@portais-orion` são scopes legados. Não
instale em novos projetos. Os packages legados publicados não devem ser apagados sem autorização
(ver `docs/architecture/package-distribution.md`).
