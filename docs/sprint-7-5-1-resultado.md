# Sprint 7.5.1 â€” Resultado

Transferir `nucleo-portais` para a org `SuperTrans-Transportes`, adotar o scope
`@supertrans-transportes`, publicar os pacotes e migrar o Supertrans para consumo versionado.

> **Correção (Sprint 7.5.2):** o scope `@supertrans-transportes` foi abandonado (específico demais).
> Scope final = **`@portais-orion`** (org `portais-orion`). Este documento contém texto
> auto-referencial corrompido por um `sed` global em locale não-UTF-8; ver
> `docs/sprint-7-5-2-resultado.md` e `docs/architecture/package-distribution.md` (corrigidos).

## Resumo

**DecisÃ£o confirmada e configuraÃ§Ã£o alinhada; execuÃ§Ã£o operacional BLOQUEADA neste ambiente.**
As etapas que exigem GitHub/registry/pnpm ao vivo â€” transferÃªncia do repo, rename com
build-validation, `pnpm pack`/`publish`, consumer-test e migraÃ§Ã£o do Supertrans â€” **nÃ£o sÃ£o
executÃ¡veis neste sandbox** e ficam como runbook pronto para a mÃ¡quina do dev. Seguindo os
guard-rails da prÃ³pria sprint (Â§2, Â§4, Â§18), **parei antes de qualquer passo destrutivo/gated**:
nÃ£o transferi, nÃ£o renomeei o cÃ³digo, nÃ£o publiquei e nÃ£o removi os aliases do Supertrans.

## Bloqueios do ambiente (com evidÃªncia)

Sandbox Linux com `node_modules` instalado no Windows. Probe desta sprint:

| Recurso | Estado |
|---|---|
| `gh` (GitHub CLI) | **ausente** (`command not found`) â†’ sem transferÃªncia de repo |
| `pnpm` | **ausente** â†’ sem install/build/pack/publish |
| Rede `api.github.com` | **HTTP 000** (sem conectividade) |
| Rede `npm.pkg.github.com` | **HTTP 000** (sem conectividade) |
| `git remote origin` | ainda `mateusarcestr/nucleo-portais` (transfer nÃ£o feito) |

Sem `gh`, sem `pnpm` e sem rede, nenhuma etapa operacional da sprint roda aqui. NÃ£o Ã© questÃ£o
de tentar de outro jeito â€” as ferramentas e a rede nÃ£o existem no sandbox.

## TransferÃªncia do repositÃ³rio

**NÃ£o executada** (bloqueio acima). Runbook pronto em
`docs/architecture/package-distribution.md` (Passo 1): `gh api POST /repos/.../transfer` ou
transferÃªncia manual via GitHub Web (Settings â†’ Danger Zone). Regra respeitada: **nÃ£o publicar
enquanto o repo estiver em `mateusarcestr`**.

## Scope final

**`@supertrans-transportes`** (confirmado). Working tree ainda em `@supertrans-transportes` (placeholder); o
rename Ã© o Passo 2 do runbook (apÃ³s a transferÃªncia, com `sed` + gate de `grep` + `pnpm build`
para validar). **NÃ£o renomeei o cÃ³digo nesta sessÃ£o** porque: (a) o rename Ã© gated na
transferÃªncia (Â§4), (b) nÃ£o hÃ¡ como validar o build aqui, (c) o mount do sandbox serve view
truncada de arquivos recÃ©m-escritos â€” um `sed`/ediÃ§Ã£o em massa Ã s cegas poderia corromper o
repo verde. O `sed` do runbook, num shell real, Ã© mais seguro e rÃ¡pido que ~50 ediÃ§Ãµes cegas.

## Packages publicados

**Nenhum ainda** (publish bloqueado). Alvo: `@supertrans-transportes/{tokens,ui,blocks}@0.1.0`,
source-based, privados no GitHub Packages da org.

## AutenticaÃ§Ã£o GitHub Packages

Configurada nos artefatos: `publishConfig.registry` nos 3 pacotes, `.npmrc.example` com scope
`@supertrans-transportes` + `${GITHUB_PACKAGES_TOKEN}`. `.npmrc` real nÃ£o Ã© commitado
(gitignored). PAT precisa de `read:packages` + `write:packages`. Workflow usa `GITHUB_TOKEN`
com `permissions: packages: write`.

## Rename de `@supertrans-transportes` para `@supertrans-transportes`

**Config/docs/artefatos atualizados nesta sessÃ£o** para o scope final (abaixo). **CÃ³digo/manifests
dos pacotes NÃƒO renomeados** (gated + nÃ£o verificÃ¡vel â€” runbook Passo 2).

Atualizados agora para `@supertrans-transportes`:
- `.github/workflows/release-packages.yml` (scope + prÃ©-requisitos)
- `.npmrc.example`
- `.tmp/consumer-test/` (`package.json`, `smoke.tsx`, `README.md`)
- `docs/architecture/package-distribution.md` (namespace, runbook com transferÃªncia, publish, consumo)
- `docs/sprint-7-5-resultado.md` (nota de superaÃ§Ã£o do scope provisÃ³rio)
- `portal-supertrans/docs/nucleo-portais-consumo.md` (plano de swap)

Ainda em `@supertrans-transportes` (mudam no Passo 2 do runbook, na mÃ¡quina do dev):
- `packages/{tokens,ui,blocks,tsconfig,biome-config}/package.json` (names + dep interna)
- `packages/**/src/**` (imports `@supertrans-transportes/ui`), `apps/storybook/**`, `tsconfig` `extends`
- `portal-supertrans/apps/web/src/components/grupo-{ui,blocks}/index.ts` + `tsconfig.json` paths

## ValidaÃ§Ãµes do NÃºcleo

NÃ£o executÃ¡veis aqui (`pnpm` ausente). Comandos no runbook (Passo 3). `check:pureza` (node puro)
seguiu verde nas sprints anteriores; nenhum cÃ³digo de componente foi alterado.

## Tarballs

NÃ£o gerados (sem `pnpm pack`). InspeÃ§Ã£o esperada (`tar -tf`): sÃ³ `package/src/**` + `package.json`
(+README); `workspace:*` resolvido; sem `.env`/token/`node_modules`.

## PublicaÃ§Ã£o

**Pendente** â€” bloqueio de credencial/rede/ferramenta documentado (Â§8 dos critÃ©rios de aceite:
"packages publicados **ou** bloqueio documentado"). Runbook Passo 3 + workflow dispatch prontos.

## Consumer-test

Scaffold `.tmp/consumer-test/` atualizado para `@supertrans-transportes`. ExecuÃ§Ã£o pendente
(precisa dos pacotes publicados/tarballs). Checklist no `README.md` do scaffold.

## Supertrans migrado para packages versionados

**NÃ£o** â€” gated em publish + consumer-test verdes (Â§13/Â§18). Aliases da Sprint 7 **mantidos**.
Plano de swap pronto e atualizado em `portal-supertrans/docs/nucleo-portais-consumo.md`.

## Tela canÃ¡rio

Inalterada e ainda no modo aliases (`/configurador/permissions`). Migra junto com o swap.

## Commits/PRs

Nenhum commit/push feito por mim. As mudanÃ§as desta sessÃ£o (config/docs) estÃ£o no working tree;
o dev commita junto com o rename real do Passo 2, ou separadamente. SugestÃ£o de mensagem:
`chore(dist): scope @supertrans-transportes + runbook de transferÃªncia/publish`.

## Problemas encontrados

1. `gh`, `pnpm` e rede ausentes no sandbox â†’ etapas operacionais impossÃ­veis aqui.
2. Rename gated na transferÃªncia (Â§4) e nÃ£o verificÃ¡vel por build â†’ entregue como runbook.
3. Mount do sandbox trunca arquivos recÃ©m-escritos â†’ validaÃ§Ã£o via Read, nÃ£o bash; reforÃ§a nÃ£o fazer `sed` Ã s cegas.

## DecisÃµes tomadas

- Scope final `@supertrans-transportes` (org), superando o provisÃ³rio `@mateusarcestr`.
- Parar antes de transferir/renomear/publicar/migrar (guard-rails da sprint), documentando o bloqueio.
- Atualizar apenas artefatos de config/docs para o scope final (seguro, nÃ£o-gated).

## O que ficou fora

TransferÃªncia real, rename de cÃ³digo, publish, consumer-test, migraÃ§Ã£o do Supertrans, dist (tsup),
changesets â€” todos no runbook, dependentes de `gh`/pnpm/rede na mÃ¡quina do dev.

## PendÃªncias para Sprint 8

1. Rodar o runbook (`package-distribution.md`): transferÃªncia â†’ remote set-url â†’ rename (Passo 2)
   â†’ validar â†’ `pack:all` â†’ inspecionar tarballs â†’ publish â†’ consumer-test.
2. Migrar o Supertrans para deps versionadas e remover aliases/tracingRoot/@import relativos.
3. Validar a tela canÃ¡rio `/configurador/permissions` pÃ³s-migraÃ§Ã£o.
4. Build de `dist` (tsup) + versionamento via changesets.

## PrÃ³xima sprint recomendada

**Sprint 8 â€” Ajustes pÃ³s-consumo**, iniciando **somente apÃ³s** o consumo versionado estar
validado (ou o bloqueio de publicaÃ§Ã£o estar formalmente aceito). Enquanto o runbook operacional
nÃ£o rodar, a Sprint 8 nÃ£o deve comeÃ§ar.
