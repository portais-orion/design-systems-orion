# Prompt — Release @portais-orion (dist 0.1.1 + blocos CRUD 0.2.0) e consumo no Supertrans

Cole este prompt num agente (ou execute você) numa máquina com `pnpm`, `gh` autenticado e rede.
Não é para rodar em sandbox sem rede.

---

Você é release engineer de um design system em pnpm workspaces + Changesets + tsup, publicado
privado no **GitHub Packages** sob o scope **`@portais-orion`** (org `portais-orion`, repo
`portais-orion/nucleo-portais`). Objetivo: **buildar, versionar e publicar** os pacotes do Núcleo
e depois atualizar o consumidor `portal-supertrans`.

## Contexto (estado atual do working tree, ainda NÃO publicado)

- Publicado hoje no registry: `@portais-orion/{tokens,ui,blocks}@0.1.0` (source-based).
- No working tree há mudanças não publicadas:
  - **Hardening dist** (tsup para `ui`/`blocks`, cópia CSS para `tokens`) — changeset patch.
  - **3 blocos novos** em `@portais-orion/blocks`: `CrudModalHeader`, `FiltersCard`, `LauncherCard`
    (com stories) — changeset minor.
- Dois changesets pendentes em `.changeset/` → após `changeset version`: **tokens 0.1.1, ui 0.1.1, blocks 0.2.0**.
- `scripts/gen-dist-exports.mjs` gera `publishConfig.exports`→dist (`.mjs` + `.d.mts`) e `files:["dist"]`.
- `tsup.config.ts` (ui/blocks) emite `.mjs`/`.d.mts` (`outExtension`). `packages/tokens` copia src→dist via `scripts/build-tokens.mjs`.

## Guardrails (obrigatório)

- **Nunca** commitar `.npmrc` com token (está no `.gitignore`). Token só em `~/.npmrc` ou CI.
- **Não publique** se `check`/`typecheck`/`build`/`build:storybook`/`check:pureza`, `pack` ou o
  consumer-test falharem. Pare e reporte o erro exato.
- Scope válido é só `@portais-orion` — não publicar `@grupo`/`@mateusarcestr`/`@supertrans-transportes`.
- Não mexer no Aurora. Não migrar telas do Supertrans além do necessário para o consumo.
- Rodar `sed` sempre com `LC_ALL=C.UTF-8` (evita mojibake).

## Passos

### 0. Reparar git do Núcleo (pendência conhecida)

```bash
cd C:\projetos\nucleo-portais
git config --get remote.origin.url || (copy .git\config .git\config.backup & notepad .git\config)
# garantir remote = https://github.com/portais-orion/nucleo-portais.git e o bloco [branch "main"] íntegro
git remote -v && git status && git branch --show-current
git checkout -b chore/release-crud-blocks
```

### 1. Validar o Núcleo

```bash
pnpm install
pnpm check && pnpm typecheck && pnpm build && pnpm build:storybook && pnpm check:pureza
```

Se algo falhar, corrigir antes de seguir. (As 3 stories novas devem aparecer no Storybook em
`Blocks/CrudModalHeader`, `Blocks/FiltersCard`, `Blocks/LauncherCard`.)

### 2. Versionar (Changesets)

```bash
pnpm changeset version    # consome os 2 changesets → tokens/ui 0.1.1, blocks 0.2.0
pnpm install              # atualiza o lockfile
```

Conferir: `packages/{tokens,ui}/package.json` = 0.1.1; `packages/blocks/package.json` = 0.2.0.

### 3. Gerar exports de dist + build

```bash
node scripts/gen-dist-exports.mjs packages/ui/package.json
node scripts/gen-dist-exports.mjs packages/blocks/package.json
pnpm build                # tsup gera dist/**/*.mjs + *.d.mts (ui/blocks); tokens copia CSS p/ dist
```

Conferir que existe `packages/blocks/dist/crud-modal-header/index.mjs` (+ `.d.mts`),
`filters-card`, `launcher-card`, e que `publishConfig.exports` de blocks lista esses 3 subpaths.

### 4. Pack + inspeção dos tarballs

```bash
pnpm pack:all
tar -tf packages/tokens/*.tgz
tar -tf packages/ui/*.tgz
tar -tf packages/blocks/*.tgz
```

Verificar em cada tarball: só `dist/**` + `package.json` (+README); `exports` apontando para
`dist/*.mjs`/`*.d.mts`; **sem** `src`, `.env`, `.npmrc`, token, `node_modules`, scope legado, nem
`workspace:*` no `package.json` empacotado (o `pnpm publish` resolve `@portais-orion/ui: workspace:*`
para a versão real).

### 5. Publicar

```bash
pnpm publish:packages
# ou: gh workflow run release-packages.yml --repo portais-orion/nucleo-portais
gh api /orgs/portais-orion/packages/npm/blocks/versions | head   # confirmar 0.2.0
gh api /orgs/portais-orion/packages?package_type=npm
```

### 6. Consumer-test (fora do monorepo)

```bash
cd C:\projetos\nucleo-portais\.tmp\consumer-test
# apontar para as novas versões (0.1.1 / 0.2.0) e importar um dos blocos novos, ex.:
#   import { CrudModalHeader } from "@portais-orion/blocks/crud-modal-header";
pnpm install
pnpm typecheck
```

Se falhar, **não** atualize o Supertrans — corrija exports/build primeiro.

### 7. Atualizar o Supertrans

```bash
cd C:\projetos\portal-supertrans
git checkout -b chore/nucleo-0.2.0
# As deps estão pinadas exatas ("0.1.0") — pnpm update NÃO bumpa. Use add com versão:
pnpm add --filter @portal-supertrans/web \
  @portais-orion/tokens@0.1.1 @portais-orion/ui@0.1.1 @portais-orion/blocks@0.2.0
```

Ajustar (só se o build passar):

- `apps/web/src/app/globals.css`: `@source ".../@portais-orion/ui/dist"` e `.../blocks/dist`
  (era `/src`). Manter os `@import` de `@portais-orion/tokens/*.css` e `data-brand="supertrans"`.
- `apps/web/next.config.ts`: **testar remover** `transpilePackages: ["@portais-orion/ui","@portais-orion/blocks"]`.
  Se o build ESM passar sem, remover; senão, manter e anotar o motivo.
- Expor os blocos novos no barrel quando uma tela usar:
  ```ts
  // apps/web/src/components/grupo-blocks/index.ts
  export { CrudModalHeader } from "@portais-orion/blocks/crud-modal-header";
  export { FiltersCard } from "@portais-orion/blocks/filters-card";
  export { LauncherCard } from "@portais-orion/blocks/launcher-card";
  export { StatusCards } from "@portais-orion/blocks/status-cards";
  ```

Validar:

```bash
pnpm install
pnpm --filter @portal-supertrans/web run typecheck
pnpm --filter @portal-supertrans/web build
pnpm --filter @portal-supertrans/web dev   # abrir /configurador/permissions e /configurador/app-shell-canary
```

### 8. Commits / PRs

```bash
# Núcleo
cd C:\projetos\nucleo-portais && git add . && git commit -m "chore(release): dist 0.1.1 + blocos CRUD (blocks 0.2.0)"
git push origin chore/release-crud-blocks
gh pr create --repo portais-orion/nucleo-portais --title "release: dist + blocos CRUD (blocks 0.2.0)" --body "tsup dist, CrudModalHeader/FiltersCard/LauncherCard."
# Supertrans
cd C:\projetos\portal-supertrans && git add . && git commit -m "chore: consume @portais-orion blocks 0.2.0 (dist)"
git push origin chore/nucleo-0.2.0
gh pr create --title "chore: consume @portais-orion 0.2.0" --body "Atualiza para dist + novos blocos CRUD."
```

## Critérios de aceite

- Núcleo: `check/typecheck/build/build:storybook/check:pureza` verdes; tarballs com `dist` (sem `src`/token/`workspace:*`).
- Publicado: `@portais-orion/tokens@0.1.1`, `@portais-orion/ui@0.1.1`, `@portais-orion/blocks@0.2.0`.
- Consumer-test instala e tipa importando um bloco novo.
- Supertrans: `typecheck`/`build`/`dev` verdes; `/configurador/permissions` e `/configurador/app-shell-canary` OK; `@source`→dist; `transpilePackages` removido ou mantido com justificativa.
- Nenhum token/secret commitado.

## Se algo falhar

- Build/pack falha → não publicar; reportar erro. Publish falha → não atualizar Supertrans.
- Consumer-test falha → corrigir `exports`/dist antes do Supertrans.
- Supertrans build falha → manter commit separado; documentar; não ampliar migração.
