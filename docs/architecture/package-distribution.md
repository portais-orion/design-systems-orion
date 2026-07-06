# Package Distribution

Como o NÃºcleo de Portais Ã© empacotado e distribuÃ­do como pacotes internos versionados
(Sprint 7.5 / 7.5.1). Substitui a estratÃ©gia temporÃ¡ria de aliases da Sprint 7.

## DecisÃ£o

- **Modelo v0.1.0: source-based publish.** Os pacotes publicam o cÃ³digo-fonte (`src`),
  sem build de `dist`. O consumidor transpila (Next `transpilePackages`). Motivo: modelo jÃ¡
  provado na Sprint 7, `pnpm publish` resolve `workspace:*` automaticamente, e nÃ£o exige um
  build de biblioteca (tsup) ainda nÃ£o validado. **Dist compilado (tsup) = hardening da Sprint 8.**
- **Lar do repo: org `SuperTrans-Transportes`** (a mesma que hospeda `portal-supertrans`).
  O repo `nucleo-portais` Ã© transferido da conta pessoal `mateusarcestr` para a org.
- **`@supertrans-transportes/tsconfig` e `@supertrans-transportes/biome-config` permanecem `private`** â€” tooling interno, nunca publicado.

## Registry escolhido

**GitHub Packages** (`https://npm.pkg.github.com`). Privado. NÃ£o usar npm pÃºblico, shadcn
registry, nem registry externo.

## Namespace

Regra do GitHub Packages: **o scope do pacote precisa ser igual ao owner do repositÃ³rio**.

- Scope final: **`@supertrans-transportes`** (== org, apÃ³s a transferÃªncia do repo).
- O working tree ainda usa o scope placeholder **`@supertrans-transportes`**; o rename para
  `@supertrans-transportes` Ã© o passo 2 do runbook abaixo (apÃ³s a transferÃªncia).

## Pacotes publicados

| Pacote (pÃ³s-rename) | VersÃ£o | ConteÃºdo |
|---|---|---|
| `@supertrans-transportes/tokens` | 0.1.0 | CSS (`base.css`, `themes/*.css`) |
| `@supertrans-transportes/ui` | 0.1.0 | Primitivos Base UI (source `src`) |
| `@supertrans-transportes/blocks` | 0.1.0 | ComposiÃ§Ãµes Camada 2 (source `src`), depende de `.../ui` |

## Build dos packages

v0.1.0 **nÃ£o tem build de dist** â€” `files: ["src"]` publica a fonte; consumidor transpila
via `transpilePackages`. O script `build` (`tsc --noEmit`) permanece como gate de tipos.

Hardening Sprint 8 (dist): adotar **tsup** em `ui`/`blocks` (ESM + `.d.ts`, external de
`react`/`react-dom`/`@base-ui/react`/`lucide-react`/`@tanstack/react-table`/`.../ui`),
trocar `files` para `["dist"]` e apontar `publishConfig.exports` para `./dist/...`.

## Exports

Subpath exports por componente/tema preservados, apontando para `./src/...`
(ex.: `.../ui/button` â†’ `./src/button/index.ts`; `.../tokens/base.css` â†’ `./src/base.css`).

## peerDependencies

- **`ui`** â€” peers: `react`, `react-dom`, `@base-ui/react`, `lucide-react`,
  `class-variance-authority`, `tailwind-merge`. Dep: `clsx`.
- **`blocks`** â€” peers: `react`, `react-dom`, `@tanstack/react-table`, `lucide-react`.
  Dep: `@supertrans-transportes/ui` (`workspace:*`, resolvido no publish).
- **`tokens`** â€” sem peers (CSS puro).

## ResoluÃ§Ã£o de `workspace:*`

`pnpm publish` **substitui `workspace:*` pela versÃ£o real** no manifesto publicado. Assim
`.../blocks@0.1.0` publicado depende de `.../ui@0.1.0` (nÃ£o de `workspace:*`).
`@supertrans-transportes/tsconfig` (devDep) nÃ£o afeta consumidores e permanece privado.

## AutenticaÃ§Ã£o local

`.npmrc` **nÃ£o Ã© commitado** (estÃ¡ no `.gitignore`). Use `.npmrc.example` como modelo.

```bash
# opÃ§Ã£o A â€” login interativo
npm login --scope=@supertrans-transportes --auth-type=legacy --registry=https://npm.pkg.github.com

# opÃ§Ã£o B â€” ~/.npmrc manual (PAT classic com read:packages / write:packages)
@supertrans-transportes:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=SEU_PAT_AQUI
```

`publishConfig.registry` nos 3 pacotes jÃ¡ direciona o `pnpm publish` para o GitHub Packages.

## GitHub Actions

`.github/workflows/release-packages.yml` â€” `workflow_dispatch`, dry-run por padrÃ£o,
`permissions: packages: write`, publica com `GITHUB_TOKEN`, `scope: @supertrans-transportes`.

## Runbook operacional (rodar na mÃ¡quina do dev, com `gh` + pnpm + rede)

### Passo 0 â€” prÃ©-checagem

```bash
gh auth status
gh repo view mateusarcestr/nucleo-portais --json nameWithOwner,isPrivate,url
gh org view SuperTrans-Transportes --json login,name
gh repo view SuperTrans-Transportes/nucleo-portais --json nameWithOwner 2>/dev/null \
  && echo "REPO DESTINO JÃ EXISTE â€” PARAR" || echo "OK: destino livre"
```

### Passo 1 â€” transferir o repo para a org

```bash
gh api --method POST -H "Accept: application/vnd.github+json" \
  /repos/mateusarcestr/nucleo-portais/transfer -f new_owner=SuperTrans-Transportes
gh repo view SuperTrans-Transportes/nucleo-portais --json nameWithOwner,isPrivate,url
```

Se ficar pendente de aceite na org, **parar** atÃ© aceitar. Alternativa manual: repo Settings â†’
Danger Zone â†’ Transfer ownership â†’ `SuperTrans-Transportes`. **NÃ£o publicar enquanto o repo
estiver em `mateusarcestr`.**

```bash
cd C:\projetos\nucleo-portais
git remote set-url origin https://github.com/SuperTrans-Transportes/nucleo-portais.git
git remote -v && git fetch origin
```

### Passo 2 â€” rename de scope `@supertrans-transportes` â†’ `@supertrans-transportes`

NÃ£o renomear docs/changesets histÃ³ricos.

```bash
cd C:\projetos\nucleo-portais
grep -rl "@supertrans-transportes/" packages apps .github ai README.md AGENTS.md package.json pnpm-workspace.yaml turbo.json \
  --include=package.json --include=*.ts --include=*.tsx --include=*.json \
  --include=*.yml --include=*.yaml --include=*.example \
  | xargs sed -i 's#@supertrans-transportes/#@supertrans-transportes/#g'

# gate: zero @supertrans-transportes/ em cÃ³digo/config ativo
grep -rn "@supertrans-transportes/" packages apps .github package.json pnpm-workspace.yaml turbo.json \
  --include=package.json --include=*.ts --include=*.tsx --include=*.json --include=*.yml --include=*.yaml \
  && echo "AINDA HÃ @supertrans-transportes/ â€” revisar" || echo "OK: scope limpo"

# espelhar no Supertrans (adaptadores + tsconfig paths) â€” sÃ³ neste passo do runbook
cd C:\projetos\portal-supertrans
grep -rl "@supertrans-transportes/" apps/web/src/components/grupo-ui apps/web/src/components/grupo-blocks apps/web/tsconfig.json \
  | xargs sed -i 's#@supertrans-transportes/#@supertrans-transportes/#g'
```

### Passo 3 â€” validar + empacotar + publicar

```bash
cd C:\projetos\nucleo-portais
pnpm install
pnpm check && pnpm typecheck && pnpm build && pnpm build:storybook && pnpm check:pureza

pnpm pack:all
tar -tf packages/ui/*.tgz   # sÃ³ package/src/** + package.json (+README); sem workspace:* no package.json

pnpm publish:packages       # ou: gh workflow run release-packages.yml --repo SuperTrans-Transportes/nucleo-portais
gh api /orgs/SuperTrans-Transportes/packages?package_type=npm   # confirmar tokens/ui/blocks
```

### Passo 4 â€” consumidor limpo

Ver `.tmp/consumer-test/README.md`. `pnpm install && pnpm typecheck` verde antes de migrar o Supertrans.

## Como consumir no Supertrans

SÃ³ **apÃ³s** publish + consumer-test verdes. Plano detalhado em
`portal-supertrans/docs/nucleo-portais-consumo.md`. Resumo:

```jsonc
// apps/web/package.json
"dependencies": {
  "@supertrans-transportes/tokens": "0.1.0",
  "@supertrans-transportes/ui": "0.1.0",
  "@supertrans-transportes/blocks": "0.1.0"
}
```

```ts
// next.config.ts â€” source-based exige transpile
transpilePackages: ["@supertrans-transportes/ui", "@supertrans-transportes/blocks", /* ...existentes */]
```

Remover os aliases `@supertrans-transportes/*` do `tsconfig.json`, o `outputFileTracingRoot` extra e trocar os
`@import`/`@source` relativos do `globals.css` por `@import "@supertrans-transportes/tokens/base.css"`
e `@source "../node_modules/@supertrans-transportes/ui/src"`. Manter os adaptadores
`components/grupo-ui`/`components/grupo-blocks` (sÃ³ troca o alvo do re-export) e `data-brand="supertrans"`.

## Como testar consumidor limpo

`.tmp/consumer-test/` (gitignored) â€” instala os pacotes (registry ou tarballs) fora do
monorepo e roda `pnpm typecheck`. Ver `.tmp/consumer-test/README.md`.

## O que nÃ£o fazer

- NÃ£o commitar `.npmrc` com token. NÃ£o publicar em registry pÃºblico.
- NÃ£o publicar com scope `@supertrans-transportes` nem `@mateusarcestr` (nÃ£o batem com o owner org â†’ falha/errado).
- NÃ£o remover os aliases do Supertrans antes de validar o install real dos pacotes.
- NÃ£o renomear scope em docs/changesets histÃ³ricos. NÃ£o publicar com o repo ainda em `mateusarcestr`.

## PendÃªncias (Sprint 8)

1. Executar o runbook (transferÃªncia + rename + publish + consumer-test) â€” requer `gh`/pnpm/rede.
2. Migrar o Supertrans para deps versionadas (remover aliases).
3. Build de `dist` (tsup) para consumidores que nÃ£o transpilam.
4. Automatizar versionamento com changesets (v0.1.0 foi bump manual).
