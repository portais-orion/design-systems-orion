# Sprint 7.5.1 — Resultado

Transferir `nucleo-portais` para a org `SuperTrans-Transportes`, adotar o scope
`@supertrans-transportes`, publicar os pacotes e migrar o Supertrans para consumo versionado.

> **Corre??o (Sprint 7.5.2):** o scope `@supertrans-transportes` foi abandonado (específico demais).
> Scope final = **`@portais-orion`** (org `portais-orion`). Este documento cont?m texto
> auto-referencial corrompido por um `sed` global em locale não-UTF-8; ver
> `docs/sprint-7-5-2-resultado.md` e `docs/architecture/package-distribution.md` (corrigidos).

## Resumo

**Decisão confirmada e configuração alinhada; execução operacional BLOQUEADA neste ambiente.**
As etapas que exigem GitHub/registry/pnpm ao vivo — transferência do repo, rename com
build-validation, `pnpm pack`/`publish`, consumer-test e migração do Supertrans — **não são
executáveis neste sandbox** e ficam como runbook pronto para a máquina do dev. Seguindo os
guard-rails da própria sprint (§2, §4, §18), **parei antes de qualquer passo destrutivo/gated**:
não transferi, não renomeei o código, não publiquei e não removi os aliases do Supertrans.

## Bloqueios do ambiente (com evidência)

Sandbox Linux com `node_modules` instalado no Windows. Probe desta sprint:

| Recurso | Estado |
|---|---|
| `gh` (GitHub CLI) | **ausente** (`command not found`) → sem transferência de repo |
| `pnpm` | **ausente** → sem install/build/pack/publish |
| Rede `api.github.com` | **HTTP 000** (sem conectividade) |
| Rede `npm.pkg.github.com` | **HTTP 000** (sem conectividade) |
| `git remote origin` | ainda `mateusarcestr/nucleo-portais` (transfer não feito) |

Sem `gh`, sem `pnpm` e sem rede, nenhuma etapa operacional da sprint roda aqui. Não é questão
de tentar de outro jeito — as ferramentas e a rede não existem no sandbox.

## Transferência do repositório

**Não executada** (bloqueio acima). Runbook pronto em
`docs/architecture/package-distribution.md` (Passo 1): `gh api POST /repos/.../transfer` ou
transferência manual via GitHub Web (Settings → Danger Zone). Regra respeitada: **não publicar
enquanto o repo estiver em `mateusarcestr`**.

## Scope final

**`@supertrans-transportes`** (confirmado). Working tree ainda em `@supertrans-transportes` (placeholder); o
rename é o Passo 2 do runbook (após a transferência, com `sed` + gate de `grep` + `pnpm build`
para validar). **Não renomeei o código nesta sessão** porque: (a) o rename é gated na
transferência (§4), (b) não há como validar o build aqui, (c) o mount do sandbox serve view
truncada de arquivos recém-escritos — um `sed`/edição em massa às cegas poderia corromper o
repo verde. O `sed` do runbook, num shell real, é mais seguro e rápido que ~50 edições cegas.

## Packages publicados

**Nenhum ainda** (publish bloqueado). Alvo: `@supertrans-transportes/{tokens,ui,blocks}@0.1.0`,
source-based, privados no GitHub Packages da org.

## Autenticação GitHub Packages

Configurada nos artefatos: `publishConfig.registry` nos 3 pacotes, `.npmrc.example` com scope
`@supertrans-transportes` + `${GITHUB_PACKAGES_TOKEN}`. `.npmrc` real não é commitado
(gitignored). PAT precisa de `read:packages` + `write:packages`. Workflow usa `GITHUB_TOKEN`
com `permissions: packages: write`.

## Rename de `@supertrans-transportes` para `@supertrans-transportes`

**Config/docs/artefatos atualizados nesta sessão** para o scope final (abaixo). **Código/manifests
dos pacotes NÃO renomeados** (gated + não verificável — runbook Passo 2).

Atualizados agora para `@supertrans-transportes`:
- `.github/workflows/release-packages.yml` (scope + pré-requisitos)
- `.npmrc.example`
- `.tmp/consumer-test/` (`package.json`, `smoke.tsx`, `README.md`)
- `docs/architecture/package-distribution.md` (namespace, runbook com transferência, publish, consumo)
- `docs/sprint-7-5-resultado.md` (nota de superação do scope provisório)
- `portal-supertrans/docs/nucleo-portais-consumo.md` (plano de swap)

Ainda em `@supertrans-transportes` (mudam no Passo 2 do runbook, na máquina do dev):
- `packages/{tokens,ui,blocks,tsconfig,biome-config}/package.json` (names + dep interna)
- `packages/**/src/**` (imports `@supertrans-transportes/ui`), `apps/storybook/**`, `tsconfig` `extends`
- `portal-supertrans/apps/web/src/components/grupo-{ui,blocks}/index.ts` + `tsconfig.json` paths

## Validações do Núcleo

Não executáveis aqui (`pnpm` ausente). Comandos no runbook (Passo 3). `check:pureza` (node puro)
seguiu verde nas sprints anteriores; nenhum código de componente foi alterado.

## Tarballs

Não gerados (sem `pnpm pack`). Inspeção esperada (`tar -tf`): só `package/src/**` + `package.json`
(+README); `workspace:*` resolvido; sem `.env`/token/`node_modules`.

## Publicação

**Pendente** — bloqueio de credencial/rede/ferramenta documentado (§8 dos critérios de aceite:
"packages publicados **ou** bloqueio documentado"). Runbook Passo 3 + workflow dispatch prontos.

## Consumer-test

Scaffold `.tmp/consumer-test/` atualizado para `@supertrans-transportes`. Execução pendente
(precisa dos pacotes publicados/tarballs). Checklist no `README.md` do scaffold.

## Supertrans migrado para packages versionados

**Não** — gated em publish + consumer-test verdes (§13/§18). Aliases da Sprint 7 **mantidos**.
Plano de swap pronto e atualizado em `portal-supertrans/docs/nucleo-portais-consumo.md`.

## Tela canário

Inalterada e ainda no modo aliases (`/configurador/permissions`). Migra junto com o swap.

## Commits/PRs

Nenhum commit/push feito por mim. As mudanças desta sessão (config/docs) estão no working tree;
o dev commita junto com o rename real do Passo 2, ou separadamente. Sugestão de mensagem:
`chore(dist): scope @supertrans-transportes + runbook de transferência/publish`.

## Problemas encontrados

1. `gh`, `pnpm` e rede ausentes no sandbox → etapas operacionais impossíveis aqui.
2. Rename gated na transferência (§4) e não verificável por build → entregue como runbook.
3. Mount do sandbox trunca arquivos recém-escritos → validação via Read, não bash; reforça não fazer `sed` às cegas.

## Decisões tomadas

- Scope final `@supertrans-transportes` (org), superando o provisório `@mateusarcestr`.
- Parar antes de transferir/renomear/publicar/migrar (guard-rails da sprint), documentando o bloqueio.
- Atualizar apenas artefatos de config/docs para o scope final (seguro, não-gated).

## O que ficou fora

Transferência real, rename de código, publish, consumer-test, migração do Supertrans, dist (tsup),
changesets — todos no runbook, dependentes de `gh`/pnpm/rede na máquina do dev.

## Pendências para Sprint 8

1. Rodar o runbook (`package-distribution.md`): transferência → remote set-url → rename (Passo 2)
   → validar → `pack:all` → inspecionar tarballs → publish → consumer-test.
2. Migrar o Supertrans para deps versionadas e remover aliases/tracingRoot/@import relativos.
3. Validar a tela canário `/configurador/permissions` pós-migração.
4. Build de `dist` (tsup) + versionamento via changesets.

## Próxima sprint recomendada

**Sprint 8 — Ajustes pós-consumo**, iniciando **somente após** o consumo versionado estar
validado (ou o bloqueio de publicação estar formalmente aceito). Enquanto o runbook operacional
não rodar, a Sprint 8 não deve começar.
