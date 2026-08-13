# GitHub Pages Docs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Exportar e publicar `apps/docs` em `https://portais-orion.github.io/design-systems-orion/` via GitHub Pages.

**Architecture:** Next.js gera `apps/docs/out` com `output: "export"`, `trailingSlash` e `basePath` configurável. Fumadocs pré-renderiza MDX, índice de busca, Markdown, LLMs e OG; GitHub Actions publica o diretório estático.

**Tech Stack:** Next.js 16, Fumadocs 16, MDX, Node test runner, pnpm, GitHub Actions, GitHub Pages, gh CLI.

## Global Constraints

- URL pública: `https://portais-orion.github.io/design-systems-orion/`.
- Base path de produção: `/design-systems-orion`; desenvolvimento local permanece sem prefixo.
- Nenhum runtime Next.js no Pages; sem proxy, rewrites, ISR ou Server Actions.
- Busca usa `staticGET` e `oramaStaticClient`.
- Publicar `apps/docs/out` por Actions oficiais do Pages.
- Preservar `.agents/mcp_config.json`, arquivo externo não rastreado.
- Trabalho autorizado diretamente em `main`.

---

### Task 1: Configuração de URL e export estático

**Files:**
- Create: `apps/docs/src/lib/base-path.ts`
- Create: `apps/docs/src/lib/base-path.test.ts`
- Modify: `apps/docs/next.config.mjs`
- Modify: `apps/docs/src/lib/source.ts`
- Modify: `apps/docs/src/app/layout.tsx`

**Interfaces:**
- Produces: `normalizeBasePath(value?: string): string`, `withBasePath(pathname: string): string` e `basePath: string`.
- Consumes: `NEXT_PUBLIC_BASE_PATH`, `NEXT_PUBLIC_SITE_URL`.

- [x] **Step 1: Escrever teste RED**

Cobrir base vazia, normalização de `/design-systems-orion/`, prefixo único de caminho interno e
preservação de URL externa em `base-path.test.ts`.

- [x] **Step 2: Executar RED**

Run: `node --test apps/docs/src/lib/base-path.test.ts`
Expected: FAIL porque `base-path.ts` não existe.

- [x] **Step 3: Implementar helper e configuração**

Implementar normalização e prefixo. Configurar:

```js
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, '') ?? '';
const config = {
  output: 'export',
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  reactStrictMode: true,
};
```

Aplicar `withBasePath()` somente às URLs manuais de Markdown/OG e usar URL pública completa em
`metadataBase`. Manter `source.loader({ baseUrl: '/docs' })`, pois Next Link aplica `basePath`.

- [x] **Step 4: Executar GREEN**

Run: `node --test apps/docs/src/lib/base-path.test.ts`
Expected: 4 testes PASS.

- [x] **Step 5: Commit**

```bash
git add apps/docs/src/lib/base-path.ts apps/docs/src/lib/base-path.test.ts apps/docs/next.config.mjs apps/docs/src/lib/source.ts apps/docs/src/app/layout.tsx
git commit -m "feat(docs): enable static export"
```

---

### Task 2: Busca e conteúdo totalmente estáticos

**Files:**
- Create: `apps/docs/src/components/search.tsx`
- Create: `apps/docs/src/components/provider.tsx`
- Modify: `apps/docs/src/app/api/search/route.ts`
- Modify: `apps/docs/src/app/layout.tsx`
- Delete: `apps/docs/proxy.ts`

**Interfaces:**
- Consumes: `withBasePath('/api/search')`.
- Produces: `Provider({ children })` com diálogo baseado em `oramaStaticClient`.

- [x] **Step 1: Executar build RED de export**

Run:

```powershell
$env:NEXT_PUBLIC_BASE_PATH='/design-systems-orion'
$env:NEXT_PUBLIC_SITE_URL='https://portais-orion.github.io/design-systems-orion'
pnpm --filter docs build
```

Expected: FAIL apontando busca/proxy/recurso server-only ainda incompatível.

- [x] **Step 2: Implementar busca estática**

Trocar rota para:

```ts
export const revalidate = false;
export const { staticGET: GET } = createFromSource(source, { language: 'english' });
```

Criar diálogo Fumadocs usando `useDocsSearch({ client: oramaStaticClient({ from: withBasePath('/api/search') }) })`
e provider client que passa `SearchDialog` ao `RootProvider`.

- [x] **Step 3: Remover proxy**

Excluir `apps/docs/proxy.ts`. Markdown continuará acessível pelas rotas pré-geradas apontadas por
`getPageMarkdownUrl()`.

- [x] **Step 4: Executar GREEN integrado**

Executar typecheck, lint e build com as variáveis Pages. Confirmar em `apps/docs/out`:

```powershell
Test-Path apps/docs/out/index.html
Test-Path apps/docs/out/docs/index.html
Test-Path apps/docs/out/api/search
Test-Path apps/docs/out/llms.txt
rg -n "/design-systems-orion/_next|/design-systems-orion/docs" apps/docs/out/index.html
```

- [x] **Step 5: Commit**

```bash
git add apps/docs/src apps/docs/proxy.ts
git commit -m "feat(docs): make Fumadocs routes static"
```

---

### Task 3: Publicação no GitHub Pages

**Files:**
- Create: `.github/workflows/deploy-docs-pages.yml`
- Modify: `apps/docs/README.md`
- Modify: `docs/superpowers/plans/2026-08-13-github-pages-docs.md`

**Interfaces:**
- Consumes: `apps/docs/out` da Task 2.
- Produces: workflow Pages em push para `main` e `workflow_dispatch`.

- [x] **Step 1: Criar workflow oficial**

Usar checkout v4, pnpm/action-setup v4, setup-node v4, `pnpm install --frozen-lockfile`, build com
as duas variáveis públicas, configure-pages v5, upload-pages-artifact v4 e deploy-pages v4.
Separar jobs build/deploy; environment `github-pages`; permissões mínimas e concurrency `pages`.

- [x] **Step 2: Documentar deploy**

Registrar URL, comando local equivalente, diretório `out` e limitação do export estático no README
do app.

- [x] **Step 3: Gates finais**

Run: `pnpm check`, `pnpm typecheck`, `pnpm build`, `git diff --check`.
Se `pnpm check` falhar somente por `.agents/mcp_config.json`, registrar como arquivo externo e
executar verificações específicas dos arquivos da mudança.

- [x] **Step 4: Commit e push**

```bash
git add .github/workflows/deploy-docs-pages.yml apps/docs/README.md docs/superpowers/plans/2026-08-13-github-pages-docs.md
git commit -m "ci: deploy docs to GitHub Pages"
git push origin main
```

- [x] **Step 5: Habilitar e acompanhar Pages**

Consultar `gh api repos/portais-orion/design-systems-orion/pages`. Se ausente, criar com
`POST` e `{"build_type":"workflow"}`; se existente, atualizar para `workflow`. Acompanhar
workflow com `gh run list`/`gh run watch`, então consultar Pages e testar URL pública.
