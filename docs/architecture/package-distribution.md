# Package Distribution

Como o Núcleo de Portais é empacotado e distribuído como pacotes internos versionados
(Sprint 7.5). Substitui a estratégia temporária de aliases da Sprint 7.

## Decisão

- **Modelo v0.1.0: source-based publish.** Os pacotes publicam o código-fonte (`src`),
  sem build de `dist`. O consumidor transpila (Next `transpilePackages`). Motivo: é o
  modelo já provado na Sprint 7 (Supertrans consome fonte), `pnpm publish` resolve
  `workspace:*` automaticamente, e não exige um build de biblioteca (tsup) que ainda não
  foi validado. **Dist compilado (tsup) é o hardening da Sprint 8** (seção "Pendências").
- **`@grupo/tsconfig` e `@grupo/biome-config` permanecem `private`** — tooling interno, nunca publicado.

## Registry escolhido

**GitHub Packages** (`https://npm.pkg.github.com`). Privado. Não usar npm público, shadcn
registry, nem registry externo.

## Namespace

Regra do GitHub Packages: **o scope do pacote precisa ser igual ao owner do repositório**.

- `nucleo-portais` está sob a conta pessoal **`mateusarcestr`** → scope publicável hoje: **`@mateusarcestr`**.
- O working tree ainda usa o scope placeholder **`@grupo`** (herdado das sprints anteriores).
- **`portal-supertrans` está sob a org `SuperTrans-Transportes`.** Recomendação: mover o
  repo `nucleo-portais` para essa org e usar `@supertrans-transportes` — é o lar natural de
  um design system consumido pelos portais da empresa. Enquanto isso não acontecer,
  `@mateusarcestr` é o scope funcional.

> **Antes do primeiro publish, rode o Runbook de rename de scope (abaixo).**

## Pacotes publicados

| Pacote (pós-rename) | Versão | Conteúdo |
|---|---|---|
| `@mateusarcestr/tokens` | 0.1.0 | CSS (`base.css`, `themes/*.css`) |
| `@mateusarcestr/ui` | 0.1.0 | Primitivos Base UI (source `src`) |
| `@mateusarcestr/blocks` | 0.1.0 | Composições Camada 2 (source `src`), depende de `@mateusarcestr/ui` |

## Build dos packages

v0.1.0 **não tem build de dist** — `files: ["src"]` publica a fonte. O script `build`
(`tsc --noEmit`) permanece como gate de tipos. O consumidor Next transpila via
`transpilePackages`.

Hardening Sprint 8 (dist): adotar **tsup** em `ui`/`blocks` (ESM + `.d.ts`, external de
`react`/`react-dom`/`@base-ui/react`/`lucide-react`/`@tanstack/react-table`/`@grupo/ui`),
trocar `files` para `["dist"]` e apontar `publishConfig.exports` para `./dist/...`.

## Exports

Mantidos os subpath exports por componente (`./button`, `./data-table`, `./base.css`, ...).
v0.1.0 aponta para `./src/...`. Root `exports` continua expondo o barrel + cada subpath.

## peerDependencies

- **`@grupo/ui`** — peers: `react`, `react-dom`, `@base-ui/react`, `lucide-react`,
  `class-variance-authority`, `tailwind-merge`. Dep: `clsx`. (Peers = singletons/dedupe no
  consumidor; todos já presentes no Supertrans.)
- **`@grupo/blocks`** — peers: `react`, `react-dom`, `@tanstack/react-table`, `lucide-react`.
  Dep: `@grupo/ui` (`workspace:*`, resolvido no publish).
- **`@grupo/tokens`** — sem peers (CSS puro).

## Resolução de `workspace:*`

`pnpm publish` **substitui `workspace:*` pela versão real** no manifesto publicado. Assim
`@mateusarcestr/blocks@0.1.0` publicado depende de `@mateusarcestr/ui@0.1.0` (não de
`workspace:*`). `@grupo/tsconfig` (devDep, `workspace:*`) não afeta consumidores (devDeps
não são instaladas por quem consome) e permanece privado.

## Autenticação local

`.npmrc` **não é commitado** (está no `.gitignore`). Use `.npmrc.example` como modelo.

```bash
# opção A — login interativo
npm login --scope=@mateusarcestr --auth-type=legacy --registry=https://npm.pkg.github.com

# opção B — ~/.npmrc manual (PAT classic com read:packages / write:packages)
@mateusarcestr:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=SEU_PAT_AQUI
```

`publishConfig.registry` nos 3 pacotes já direciona o `pnpm publish` para o GitHub Packages.

## GitHub Actions

`.github/workflows/release-packages.yml` — `workflow_dispatch`, dry-run por padrão,
`permissions: packages: write`, publica com `GITHUB_TOKEN`. Não publica em push.

## Runbook — rename de scope `@grupo` → `@mateusarcestr`

Fazer numa branch, na máquina do dev (FS consistente + build para validar). Não commitar
docs históricos (ADRs, sprint-results, changesets) renomeados.

```bash
cd C:\projetos\nucleo-portais

# 1. Renomear scope em package.json + código + configs (NÃO em docs/changesets históricos)
grep -rl "@grupo/" \
  packages apps \
  --include=package.json --include=*.ts --include=*.tsx --include=*.json \
  | xargs sed -i 's#@grupo/#@mateusarcestr/#g'

# 2. Gate: nenhum @grupo/ residual em código/config (docs podem manter menções históricas)
grep -rn "@grupo/" packages apps --include=package.json --include=*.ts --include=*.tsx --include=*.json \
  && echo "AINDA HÁ @grupo/ EM CÓDIGO — revisar" || echo "OK: scope limpo em código"

# 3. Relink do workspace + validar
pnpm install
pnpm check && pnpm typecheck && pnpm build && pnpm check:pureza && pnpm build:storybook

# 4. Espelhar no Supertrans (adaptadores + tsconfig paths)
cd C:\projetos\portal-supertrans
grep -rl "@grupo/" apps/web/src/components/grupo-ui apps/web/src/components/grupo-blocks apps/web/tsconfig.json \
  | xargs sed -i 's#@grupo/#@mateusarcestr/#g'
```

> `@grupo/tsconfig` e `@grupo/biome-config` também são renomeados por consistência
> (`@mateusarcestr/tsconfig`, `@mateusarcestr/biome-config`) — continuam `private`.

## Como publicar

```bash
cd C:\projetos\nucleo-portais
pnpm install
pnpm check && pnpm typecheck && pnpm build && pnpm build:storybook && pnpm check:pureza

# dry-run: inspecionar o que vai no tarball ANTES de publicar
pnpm pack:all
tar -tf packages/ui/*.tgz        # deve listar só package/src/** + package.json (+ README)

# publish (após rename + auth)
pnpm publish:packages            # pnpm -r publish --no-git-checks nos 3 pacotes
```

Confirmar pós-publish: visibilidade privada, pacotes vinculados ao repo `nucleo-portais`,
e acesso de leitura concedido ao repo/CI do `portal-supertrans`.

## Como consumir no Supertrans

Só **após** publish validado (a Sprint 7.5 mantém os aliases até lá). Ver o plano de swap
em `portal-supertrans/docs/nucleo-portais-consumo.md`. Resumo:

```jsonc
// apps/web/package.json
"dependencies": {
  "@mateusarcestr/tokens": "^0.1.0",
  "@mateusarcestr/ui": "^0.1.0",
  "@mateusarcestr/blocks": "^0.1.0"
}
```

```ts
// next.config.ts — source-based exige transpile
transpilePackages: ["@mateusarcestr/ui", "@mateusarcestr/blocks", /* ...existentes */]
```

Remover os aliases `@grupo/*` do `tsconfig.json`, o `outputFileTracingRoot` extra e os
`@import`/`@source` relativos do `globals.css` (trocar por `@import "@mateusarcestr/tokens/base.css"`
e `@source "../node_modules/@mateusarcestr/ui/src"`). Manter os adaptadores
`components/grupo-ui` e `components/grupo-blocks` (só trocam o alvo do re-export).

## Como testar consumidor limpo

`.tmp/consumer-test/` (gitignored) — ver `.tmp/consumer-test/README.md`. Instala os pacotes
(registry ou tarballs) fora do monorepo e roda `pnpm typecheck`.

## O que não fazer

- Não commitar `.npmrc` com token.
- Não publicar em registry público.
- Não publicar com scope `@grupo` (não bate com owner → falha).
- Não remover os aliases do Supertrans antes de validar o install real dos pacotes.
- Não renomear scope em docs/changesets históricos.

## Pendências (Sprint 8)

1. Decidir lar do repo: pessoal `@mateusarcestr` vs org `@supertrans-transportes` (mover repo).
2. Executar rename + publish real + teste de consumidor limpo.
3. Migrar o Supertrans para deps versionadas (remover aliases).
4. Build de `dist` (tsup) para consumidores que não transpilam.
5. Automatizar versionamento com changesets (v0.1.0 foi bump manual).
