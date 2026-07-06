# Package Distribution

Como o N�cleo de Portais � empacotado e distribu�do como pacotes internos versionados.
Scope final: **`@portais-orion`** (org `portais-orion`). Substitui a estrat�gia tempor�ria de
aliases da Sprint 7 e os scopes intermedi�rios `@grupo`, `@mateusarcestr`, `@supertrans-transportes`.

## Decis�o

- **Modelo v0.1.0: source-based publish.** Os pacotes publicam o c�digo-fonte (`src`), sem
  build de `dist`. O consumidor transpila (Next `transpilePackages`). `pnpm publish` resolve
  `workspace:*` automaticamente. Dist compilado (tsup) = hardening da Sprint 8.
- **Lar do repo: org `portais-orion`** (scope gen�rico, reutiliz�vel por v�rios portais). O
  scope `@supertrans-transportes` foi abandonado por ser espec�fico demais (fica como legado).
- **`@portais-orion/tsconfig` e `@portais-orion/biome-config` permanecem `private`**  tooling interno.

## Registry escolhido

**GitHub Packages** (`https://npm.pkg.github.com`), privado. N�o usar npm p�blico, shadcn
registry, nem registry externo.

## Namespace

Regra do GitHub Packages: **o scope do pacote precisa ser igual ao owner do reposit�rio**.
Scope final `@portais-orion` == org `portais-orion`, ap�s transferir o repo para a org.

## Pacotes publicados (alvo)

| Pacote | Vers�o | Conte�do |
|---|---|---|
| `@portais-orion/tokens` | 0.1.0 | CSS (`base.css`, `themes/*.css`) |
| `@portais-orion/ui` | 0.1.0 | Primitivos Base UI (source `src`) |
| `@portais-orion/blocks` | 0.1.0 | Composi��es Camada 2 (source `src`), depende de `.../ui` |

Legado a documentar/depreciar (n�o apagar sem autoriza��o): `@supertrans-transportes/{tokens,ui,blocks}`.

## Build / Exports / peerDependencies

- **Build**: source-based (`files: ["src"]`); `build` = `tsc --noEmit` (gate de tipos).
- **Exports**: subpath por componente/tema, apontando para `./src/...`.
- **`ui`** peers: `react`, `react-dom`, `@base-ui/react`, `lucide-react`, `class-variance-authority`,
  `tailwind-merge`; dep `clsx`.
- **`blocks`** peers: `react`, `react-dom`, `@tanstack/react-table`, `lucide-react`; dep `@portais-orion/ui`.
- **`tokens`**: sem peers.

## `workspace:*`

`pnpm publish` substitui `workspace:*` pela vers�o real. `@portais-orion/blocks@0.1.0` publicado
depende de `@portais-orion/ui@0.1.0`. Tooling `@portais-orion/tsconfig` (devDep) n�o afeta consumidores.

## Autentica��o local

`.npmrc` **n�o � commitado** (gitignored). Modelo em `.npmrc.example`:

```bash
npm login --scope=@portais-orion --auth-type=legacy --registry=https://npm.pkg.github.com
# ou ~/.npmrc com PAT classic (read:packages / write:packages):
@portais-orion:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=SEU_PAT_AQUI
```

`publishConfig.registry` nos 3 pacotes j� direciona o `pnpm publish` para o GitHub Packages.

## GitHub Actions

`.github/workflows/release-packages.yml`  `workflow_dispatch`, dry-run por padr�o,
`permissions: packages: write`, `scope: @portais-orion`.

## Estado atual (antes do runbook 7.5.2)

- Working tree do N�cleo: **scope `@supertrans-transportes`** (57 arquivos de c�digo/config).
- `portal-supertrans`: j� consome `@supertrans-transportes/*` versionado (aliases removidos,
  `transpilePackages` + imports via `node_modules`).
- **Precisa re-scope para `@portais-orion`** + transfer�ncia do repo para a org `portais-orion`.
- � `nucleo-portais/.git/config` est� corrompido ("bad config line 18")  `git remote` falha.
  Corrigir manualmente antes de qualquer opera��o git (ver 7.5.2-resultado).

## Runbook operacional (rodar na m�quina do dev, com `gh` + pnpm + rede, locale UTF-8)

> Rodar `sed` em locale UTF-8 (`LC_ALL=C.UTF-8`) para n�o corromper acentos (mojibake).

### Passo 0  corrigir git + pr�-checagem

```bash
cd C:\projetos\nucleo-portais
git config --get remote.origin.url    # se falhar: abrir .git/config e reparar a linha quebrada
gh auth status
gh org view portais-orion --json login,name,url
gh repo view portais-orion/nucleo-portais --json nameWithOwner 2>/dev/null \
  && echo "DESTINO J� EXISTE  verificar" || echo "OK: destino livre"
# achar onde o repo est� hoje:
gh repo view SuperTrans-Transportes/nucleo-portais --json nameWithOwner 2>/dev/null || true
```

### Passo 1  transferir o repo para `portais-orion`

```bash
# ajustar o owner de origem conforme o Passo 0 (SuperTrans-Transportes ou mateusarcestr)
gh api --method POST -H "Accept: application/vnd.github+json" \
  /repos/SuperTrans-Transportes/nucleo-portais/transfer -f new_owner=portais-orion
gh repo view portais-orion/nucleo-portais --json nameWithOwner,isPrivate,url

cd C:\projetos\nucleo-portais
git remote set-url origin https://github.com/portais-orion/nucleo-portais.git
git remote -v && git fetch origin
```

Se ficar pendente de aceite, aceitar no GitHub Web. **N�o publicar enquanto o repo n�o estiver em `portais-orion`.**

### Passo 2  rename de scope `@supertrans-transportes` � `@portais-orion` (c�digo/config, N�O docs)

```bash
cd C:\projetos\nucleo-portais
export LC_ALL=C.UTF-8
grep -rl "@supertrans-transportes/" packages apps .github package.json pnpm-workspace.yaml turbo.json \
  --include=package.json --include=*.ts --include=*.tsx --include=*.json --include=*.yml --include=*.yaml --include=*.example \
  | xargs sed -i 's#@supertrans-transportes/#@portais-orion/#g'

# gate: zero scope antigo em c�digo/config
grep -rn "@supertrans-transportes/\|@grupo/\|@mateusarcestr/" packages apps .github package.json pnpm-workspace.yaml turbo.json \
  --include=package.json --include=*.ts --include=*.tsx --include=*.json --include=*.yml --include=*.yaml \
  && echo "ERRO: scope antigo em c�digo/config" || echo "OK: scope limpo"
```

### Passo 3  validar + empacotar + publicar

```bash
cd C:\projetos\nucleo-portais
pnpm install
pnpm check && pnpm typecheck && pnpm build && pnpm build:storybook && pnpm check:pureza

pnpm pack:all
tar -tf packages/ui/*.tgz   # s� package/src/** + package.json (+README); sem @supertrans-transportes; sem workspace:*

pnpm publish:packages       # ou: gh workflow run release-packages.yml --repo portais-orion/nucleo-portais
gh api /orgs/portais-orion/packages?package_type=npm   # confirmar @portais-orion/{tokens,ui,blocks}
```

### Passo 4  consumidor limpo

`.tmp/consumer-test/` j� est� em `@portais-orion`. `pnpm install && pnpm typecheck` verde antes de migrar o Supertrans.

## Como consumir no Supertrans

S� **ap�s** publish + consumer-test verdes. Detalhe em `portal-supertrans/docs/nucleo-portais-consumo.md`.
Resumo do re-scope (o Supertrans j� est� em `@supertrans-transportes` versionado):

```bash
cd C:\projetos\portal-supertrans
export LC_ALL=C.UTF-8
grep -rl "@supertrans-transportes" apps/web --include=*.ts --include=*.tsx --include=*.json --include=*.css \
  | xargs sed -i 's#@supertrans-transportes#@portais-orion#g'
# apps/web/package.json: deps @portais-orion/{tokens,ui,blocks}; next.config transpilePackages; globals @import/@source
pnpm install
grep -Rn "@supertrans-transportes\|@grupo/\|nucleo-portais" apps/web --include=*.ts --include=*.tsx --include=*.json --include=*.css \
  && echo "ERRO: res�duo" || echo "OK"
pnpm --filter @portal-supertrans/web dev   # abrir /configurador/permissions
```

## Packages legados `@supertrans-transportes`

N�o apagar nesta sprint. Inventariar (`gh api /orgs/SuperTrans-Transportes/packages?package_type=npm`),
confirmar que nenhum outro consumidor os usa, restringir/mark legacy, e s� deletar com autoriza��o expl�cita.

## O que n�o fazer

- N�o commitar `.npmrc` com token. N�o publicar em registry p�blico.
- N�o publicar com scope `@grupo`/`@mateusarcestr`/`@supertrans-transportes` (s� `@portais-orion`).
- N�o remover consumo do Supertrans antes de validar o install real de `@portais-orion`.
- N�o rodar `sed` sem `LC_ALL=C.UTF-8` (corrompe acentos). N�o sed docs (curar � m�o).
- N�o apagar os packages legados sem autoriza��o.

## Pend�ncias (Sprint 8)

1. Executar o runbook: git-fix + transfer�ncia + rename + publish + consumer-test + re-scope do Supertrans.
2. Depreciar os packages legados `@supertrans-transportes`.
3. Build de `dist` (tsup) + versionamento via changesets.
