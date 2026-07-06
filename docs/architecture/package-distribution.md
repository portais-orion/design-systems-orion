# Package Distribution

Como o Núcleo de Portais é empacotado e distribuído como pacotes internos versionados.
Scope final: **`@portais-orion`** (org `portais-orion`). Substitui a estratégia temporária de
aliases da Sprint 7 e os scopes intermediários `@grupo`, `@mateusarcestr`, `@supertrans-transportes`.

## Decisão

- **Modelo v0.1.0: source-based publish.** Os pacotes publicam o código-fonte (`src`), sem
  build de `dist`. O consumidor transpila (Next `transpilePackages`). `pnpm publish` resolve
  `workspace:*` automaticamente. Dist compilado (tsup) = hardening da Sprint 8.
- **Lar do repo: org `portais-orion`** (scope genérico, reutilizável por vários portais). O
  scope `@supertrans-transportes` foi abandonado por ser específico demais (fica como legado).
- **`@portais-orion/tsconfig` e `@portais-orion/biome-config` permanecem `private`** — tooling interno.

## Registry escolhido

**GitHub Packages** (`https://npm.pkg.github.com`), privado. Não usar npm público, shadcn
registry, nem registry externo.

## Namespace

Regra do GitHub Packages: **o scope do pacote precisa ser igual ao owner do repositório**.
Scope final `@portais-orion` == org `portais-orion`, após transferir o repo para a org.

## Pacotes publicados (alvo)

| Pacote | Versão | Conteúdo |
|---|---|---|
| `@portais-orion/tokens` | 0.1.0 | CSS (`base.css`, `themes/*.css`) |
| `@portais-orion/ui` | 0.1.0 | Primitivos Base UI (source `src`) |
| `@portais-orion/blocks` | 0.1.0 | Composições Camada 2 (source `src`), depende de `.../ui` |

Legado a documentar/depreciar (não apagar sem autorização): `@supertrans-transportes/{tokens,ui,blocks}`.

## Build / Exports / peerDependencies

- **Build**: source-based (`files: ["src"]`); `build` = `tsc --noEmit` (gate de tipos).
- **Exports**: subpath por componente/tema, apontando para `./src/...`.
- **`ui`** peers: `react`, `react-dom`, `@base-ui/react`, `lucide-react`, `class-variance-authority`,
  `tailwind-merge`; dep `clsx`.
- **`blocks`** peers: `react`, `react-dom`, `@tanstack/react-table`, `lucide-react`; dep `@portais-orion/ui`.
- **`tokens`**: sem peers.

## `workspace:*`

`pnpm publish` substitui `workspace:*` pela versão real. `@portais-orion/blocks@0.1.0` publicado
depende de `@portais-orion/ui@0.1.0`. Tooling `@portais-orion/tsconfig` (devDep) não afeta consumidores.

## Autenticação local

`.npmrc` **não é commitado** (gitignored). Modelo em `.npmrc.example`:

```bash
npm login --scope=@portais-orion --auth-type=legacy --registry=https://npm.pkg.github.com
# ou ~/.npmrc com PAT classic (read:packages / write:packages):
@portais-orion:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=SEU_PAT_AQUI
```

`publishConfig.registry` nos 3 pacotes já direciona o `pnpm publish` para o GitHub Packages.

## GitHub Actions

`.github/workflows/release-packages.yml` — `workflow_dispatch`, dry-run por padrão,
`permissions: packages: write`, `scope: @portais-orion`.

## Estado atual (antes do runbook 7.5.2)

- Working tree do Núcleo: **scope `@supertrans-transportes`** (57 arquivos de código/config).
- `portal-supertrans`: já consome `@supertrans-transportes/*` versionado (aliases removidos,
  `transpilePackages` + imports via `node_modules`).
- **Precisa re-scope para `@portais-orion`** + transferência do repo para a org `portais-orion`.
- ⚠️ `nucleo-portais/.git/config` está corrompido ("bad config line 18") — `git remote` falha.
  Corrigir manualmente antes de qualquer operação git (ver 7.5.2-resultado).

## Runbook operacional (rodar na máquina do dev, com `gh` + pnpm + rede, locale UTF-8)

> Rodar `sed` em locale UTF-8 (`LC_ALL=C.UTF-8`) para não corromper acentos (mojibake).

### Passo 0 — corrigir git + pré-checagem

```bash
cd C:\projetos\nucleo-portais
git config --get remote.origin.url    # se falhar: abrir .git/config e reparar a linha quebrada
gh auth status
gh org view portais-orion --json login,name,url
gh repo view portais-orion/nucleo-portais --json nameWithOwner 2>/dev/null \
  && echo "DESTINO JÁ EXISTE — verificar" || echo "OK: destino livre"
# achar onde o repo está hoje:
gh repo view SuperTrans-Transportes/nucleo-portais --json nameWithOwner 2>/dev/null || true
```

### Passo 1 — transferir o repo para `portais-orion`

```bash
# ajustar o owner de origem conforme o Passo 0 (SuperTrans-Transportes ou mateusarcestr)
gh api --method POST -H "Accept: application/vnd.github+json" \
  /repos/SuperTrans-Transportes/nucleo-portais/transfer -f new_owner=portais-orion
gh repo view portais-orion/nucleo-portais --json nameWithOwner,isPrivate,url

cd C:\projetos\nucleo-portais
git remote set-url origin https://github.com/portais-orion/nucleo-portais.git
git remote -v && git fetch origin
```

Se ficar pendente de aceite, aceitar no GitHub Web. **Não publicar enquanto o repo não estiver em `portais-orion`.**

### Passo 2 — rename de scope `@supertrans-transportes` → `@portais-orion` (código/config, NÃO docs)

```bash
cd C:\projetos\nucleo-portais
export LC_ALL=C.UTF-8
grep -rl "@supertrans-transportes/" packages apps .github package.json pnpm-workspace.yaml turbo.json \
  --include=package.json --include=*.ts --include=*.tsx --include=*.json --include=*.yml --include=*.yaml --include=*.example \
  | xargs sed -i 's#@supertrans-transportes/#@portais-orion/#g'

# gate: zero scope antigo em código/config
grep -rn "@supertrans-transportes/\|@grupo/\|@mateusarcestr/" packages apps .github package.json pnpm-workspace.yaml turbo.json \
  --include=package.json --include=*.ts --include=*.tsx --include=*.json --include=*.yml --include=*.yaml \
  && echo "ERRO: scope antigo em código/config" || echo "OK: scope limpo"
```

### Passo 3 — validar + empacotar + publicar

```bash
cd C:\projetos\nucleo-portais
pnpm install
pnpm check && pnpm typecheck && pnpm build && pnpm build:storybook && pnpm check:pureza

pnpm pack:all
tar -tf packages/ui/*.tgz   # só package/src/** + package.json (+README); sem @supertrans-transportes; sem workspace:*

pnpm publish:packages       # ou: gh workflow run release-packages.yml --repo portais-orion/nucleo-portais
gh api /orgs/portais-orion/packages?package_type=npm   # confirmar @portais-orion/{tokens,ui,blocks}
```

### Passo 4 — consumidor limpo

`.tmp/consumer-test/` já está em `@portais-orion`. `pnpm install && pnpm typecheck` verde antes de migrar o Supertrans.

## Como consumir no Supertrans

Só **após** publish + consumer-test verdes. Detalhe em `portal-supertrans/docs/nucleo-portais-consumo.md`.
Resumo do re-scope (o Supertrans já está em `@supertrans-transportes` versionado):

```bash
cd C:\projetos\portal-supertrans
export LC_ALL=C.UTF-8
grep -rl "@supertrans-transportes" apps/web --include=*.ts --include=*.tsx --include=*.json --include=*.css \
  | xargs sed -i 's#@supertrans-transportes#@portais-orion#g'
# apps/web/package.json: deps @portais-orion/{tokens,ui,blocks}; next.config transpilePackages; globals @import/@source
pnpm install
grep -Rn "@supertrans-transportes\|@grupo/\|nucleo-portais" apps/web --include=*.ts --include=*.tsx --include=*.json --include=*.css \
  && echo "ERRO: resíduo" || echo "OK"
pnpm --filter @portal-supertrans/web dev   # abrir /configurador/permissions
```

## Packages legados `@supertrans-transportes`

Não apagar nesta sprint. Inventariar (`gh api /orgs/SuperTrans-Transportes/packages?package_type=npm`),
confirmar que nenhum outro consumidor os usa, restringir/mark legacy, e só deletar com autorização explícita.

## O que não fazer

- Não commitar `.npmrc` com token. Não publicar em registry público.
- Não publicar com scope `@grupo`/`@mateusarcestr`/`@supertrans-transportes` (só `@portais-orion`).
- Não remover consumo do Supertrans antes de validar o install real de `@portais-orion`.
- Não rodar `sed` sem `LC_ALL=C.UTF-8` (corrompe acentos). Não sed docs (curar à mão).
- Não apagar os packages legados sem autorização.

## Pendências (Sprint 8)

1. Executar o runbook: git-fix + transferência + rename + publish + consumer-test + re-scope do Supertrans.
2. Depreciar os packages legados `@supertrans-transportes`.
3. Build de `dist` (tsup) + versionamento via changesets.
