# Package Distribution

Como o Núcleo de Portais é empacotado e distribuído como pacotes internos versionados
(Sprint 7.5 / 7.5.1). Substitui a estratégia temporária de aliases da Sprint 7.

## Decisão

- **Modelo v0.1.0: source-based publish.** Os pacotes publicam o código-fonte (`src`),
  sem build de `dist`. O consumidor transpila (Next `transpilePackages`). Motivo: modelo já
  provado na Sprint 7, `pnpm publish` resolve `workspace:*` automaticamente, e não exige um
  build de biblioteca (tsup) ainda não validado. **Dist compilado (tsup) = hardening da Sprint 8.**
- **Lar do repo: org `SuperTrans-Transportes`** (a mesma que hospeda `portal-supertrans`).
  O repo `nucleo-portais` é transferido da conta pessoal `mateusarcestr` para a org.
- **`@grupo/tsconfig` e `@grupo/biome-config` permanecem `private`** — tooling interno, nunca publicado.

## Registry escolhido

**GitHub Packages** (`https://npm.pkg.github.com`). Privado. Não usar npm público, shadcn
registry, nem registry externo.

## Namespace

Regra do GitHub Packages: **o scope do pacote precisa ser igual ao owner do repositório**.

- Scope final: **`@supertrans-transportes`** (== org, após a transferência do repo).
- O working tree ainda usa o scope placeholder **`@grupo`**; o rename para
  `@supertrans-transportes` é o passo 2 do runbook abaixo (após a transferência).

## Pacotes publicados

| Pacote (pós-rename) | Versão | Conteúdo |
|---|---|---|
| `@supertrans-transportes/tokens` | 0.1.0 | CSS (`base.css`, `themes/*.css`) |
| `@supertrans-transportes/ui` | 0.1.0 | Primitivos Base UI (source `src`) |
| `@supertrans-transportes/blocks` | 0.1.0 | Composições Camada 2 (source `src`), depende de `.../ui` |

## Build dos packages

v0.1.0 **não tem build de dist** — `files: ["src"]` publica a fonte; consumidor transpila
via `transpilePackages`. O script `build` (`tsc --noEmit`) permanece como gate de tipos.

Hardening Sprint 8 (dist): adotar **tsup** em `ui`/`blocks` (ESM + `.d.ts`, external de
`react`/`react-dom`/`@base-ui/react`/`lucide-react`/`@tanstack/react-table`/`.../ui`),
trocar `files` para `["dist"]` e apontar `publishConfig.exports` para `./dist/...`.

## Exports

Subpath exports por componente/tema preservados, apontando para `./src/...`
(ex.: `.../ui/button` → `./src/button/index.ts`; `.../tokens/base.css` → `./src/base.css`).

## peerDependencies

- **`ui`** — peers: `react`, `react-dom`, `@base-ui/react`, `lucide-react`,
  `class-variance-authority`, `tailwind-merge`. Dep: `clsx`.
- **`blocks`** — peers: `react`, `react-dom`, `@tanstack/react-table`, `lucide-react`.
  Dep: `@supertrans-transportes/ui` (`workspace:*`, resolvido no publish).
- **`tokens`** — sem peers (CSS puro).

## Resolução de `workspace:*`

`pnpm publish` **substitui `workspace:*` pela versão real** no manifesto publicado. Assim
`.../blocks@0.1.0` publicado depende de `.../ui@0.1.0` (não de `workspace:*`).
`@grupo/tsconfig` (devDep) não afeta consumidores e permanece privado.

## Autenticação local

`.npmrc` **não é commitado** (está no `.gitignore`). Use `.npmrc.example` como modelo.

```bash
# opção A — login interativo
npm login --scope=@supertrans-transportes --auth-type=legacy --registry=https://npm.pkg.github.com

# opção B — ~/.npmrc manual (PAT classic com read:packages / write:packages)
@supertrans-transportes:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=SEU_PAT_AQUI
```

`publishConfig.registry` nos 3 pacotes já direciona o `pnpm publish` para o GitHub Packages.

## GitHub Actions

`.github/workflows/release-packages.yml` — `workflow_dispatch`, dry-run por padrão,
`permissions: packages: write`, publica com `GITHUB_TOKEN`, `scope: @supertrans-transportes`.

## Runbook operacional (rodar na máquina do dev, com `gh` + pnpm + rede)

### Passo 0 — pré-checagem

```bash
gh auth status
gh repo view mateusarcestr/nucleo-portais --json nameWithOwner,isPrivate,url
gh org view SuperTrans-Transportes --json login,name
gh repo view SuperTrans-Transportes/nucleo-portais --json nameWithOwner 2>/dev/null \
  && echo "REPO DESTINO JÁ EXISTE — PARAR" || echo "OK: destino livre"
```

### Passo 1 — transferir o repo para a org

```bash
gh api --method POST -H "Accept: application/vnd.github+json" \
  /repos/mateusarcestr/nucleo-portais/transfer -f new_owner=SuperTrans-Transportes
gh repo view SuperTrans-Transportes/nucleo-portais --json nameWithOwner,isPrivate,url
```

Se ficar pendente de aceite na org, **parar** até aceitar. Alternativa manual: repo Settings →
Danger Zone → Transfer ownership → `SuperTrans-Transportes`. **Não publicar enquanto o repo
estiver em `mateusarcestr`.**

```bash
cd C:\projetos\nucleo-portais
git remote set-url origin https://github.com/SuperTrans-Transportes/nucleo-portais.git
git remote -v && git fetch origin
```

### Passo 2 — rename de scope `@grupo` → `@supertrans-transportes`

Não renomear docs/changesets históricos.

```bash
cd C:\projetos\nucleo-portais
grep -rl "@grupo/" packages apps .github ai README.md AGENTS.md package.json pnpm-workspace.yaml turbo.json \
  --include=package.json --include=*.ts --include=*.tsx --include=*.json \
  --include=*.yml --include=*.yaml --include=*.example \
  | xargs sed -i 's#@grupo/#@supertrans-transportes/#g'

# gate: zero @grupo/ em código/config ativo
grep -rn "@grupo/" packages apps .github package.json pnpm-workspace.yaml turbo.json \
  --include=package.json --include=*.ts --include=*.tsx --include=*.json --include=*.yml --include=*.yaml \
  && echo "AINDA HÁ @grupo/ — revisar" || echo "OK: scope limpo"

# espelhar no Supertrans (adaptadores + tsconfig paths) — só neste passo do runbook
cd C:\projetos\portal-supertrans
grep -rl "@grupo/" apps/web/src/components/grupo-ui apps/web/src/components/grupo-blocks apps/web/tsconfig.json \
  | xargs sed -i 's#@grupo/#@supertrans-transportes/#g'
```

### Passo 3 — validar + empacotar + publicar

```bash
cd C:\projetos\nucleo-portais
pnpm install
pnpm check && pnpm typecheck && pnpm build && pnpm build:storybook && pnpm check:pureza

pnpm pack:all
tar -tf packages/ui/*.tgz   # só package/src/** + package.json (+README); sem workspace:* no package.json

pnpm publish:packages       # ou: gh workflow run release-packages.yml --repo SuperTrans-Transportes/nucleo-portais
gh api /orgs/SuperTrans-Transportes/packages?package_type=npm   # confirmar tokens/ui/blocks
```

### Passo 4 — consumidor limpo

Ver `.tmp/consumer-test/README.md`. `pnpm install && pnpm typecheck` verde antes de migrar o Supertrans.

## Como consumir no Supertrans

Só **após** publish + consumer-test verdes. Plano detalhado em
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
// next.config.ts — source-based exige transpile
transpilePackages: ["@supertrans-transportes/ui", "@supertrans-transportes/blocks", /* ...existentes */]
```

Remover os aliases `@grupo/*` do `tsconfig.json`, o `outputFileTracingRoot` extra e trocar os
`@import`/`@source` relativos do `globals.css` por `@import "@supertrans-transportes/tokens/base.css"`
e `@source "../node_modules/@supertrans-transportes/ui/src"`. Manter os adaptadores
`components/grupo-ui`/`components/grupo-blocks` (só troca o alvo do re-export) e `data-brand="supertrans"`.

## Como testar consumidor limpo

`.tmp/consumer-test/` (gitignored) — instala os pacotes (registry ou tarballs) fora do
monorepo e roda `pnpm typecheck`. Ver `.tmp/consumer-test/README.md`.

## O que não fazer

- Não commitar `.npmrc` com token. Não publicar em registry público.
- Não publicar com scope `@grupo` nem `@mateusarcestr` (não batem com o owner org → falha/errado).
- Não remover os aliases do Supertrans antes de validar o install real dos pacotes.
- Não renomear scope em docs/changesets históricos. Não publicar com o repo ainda em `mateusarcestr`.

## Pendências (Sprint 8)

1. Executar o runbook (transferência + rename + publish + consumer-test) — requer `gh`/pnpm/rede.
2. Migrar o Supertrans para deps versionadas (remover aliases).
3. Build de `dist` (tsup) para consumidores que não transpilam.
4. Automatizar versionamento com changesets (v0.1.0 foi bump manual).
