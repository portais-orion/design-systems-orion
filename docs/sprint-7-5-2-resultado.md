# Sprint 7.5.2 — Resultado

Rehome do Núcleo para a org genérica `portais-orion` e re-scope dos pacotes de
`@supertrans-transportes` para **`@portais-orion`**.

## Resumo

**Decisão aplicada nos artefatos/docs; execução operacional BLOQUEADA neste ambiente.**
As etapas que exigem GitHub/registry/pnpm ao vivo — transferência do repo, rename com
build-validation, `pnpm pack`/`publish`, consumer-test e re-scope do Supertrans com `install` —
**não rodam neste sandbox**. Segui os guard-rails da sprint (§5 pré-check, §7 não publicar antes
da transferência, §17 migrar só após publish+consumer-test) e **parei antes dos passos gated**.
Atualizei o que é seguro (config/docs/artefatos → `@portais-orion`), consertei a documentação
corrompida e sinalizei dois danos colaterais de execuções anteriores.

## Motivo da troca de scope

`@supertrans-transportes` é específico demais para uma empresa. O Núcleo será consumido por
vários portais → scope genérico **`@portais-orion`** (org `portais-orion`). Scopes anteriores
(`@grupo`, `@mateusarcestr`, `@supertrans-transportes`) ficam como legado/histórico.

## Organização final / Repositório final / Scope final

- Org: **`portais-orion`** — Repo alvo: **`portais-orion/nucleo-portais`** — Scope: **`@portais-orion`**.

## Estado real encontrado no disco (importante)

As sprints 7.5/7.5.1 foram **de fato executadas** pelo dev na máquina real (não só preparadas):

- Núcleo: **todo o código/config está em `@supertrans-transportes`** (57 arquivos; nomes de
  pacote, `extends` de tsconfig, imports internos, adaptadores). Zero `@grupo`/`@mateusarcestr` ativo.
- `portal-supertrans`: **já migrado para consumo versionado** de `@supertrans-transportes` —
  aliases removidos do `tsconfig` (só resta `@/*`), `transpilePackages` adicionado ao
  `next.config.ts`, e `globals.css` importando de `node_modules/@supertrans-transportes/...`.
  Ou seja, os packages `@supertrans-transportes` foram publicados e instalados.

## Danos colaterais detectados (precisam de correção)

1. **`nucleo-portais/.git/config` corrompido**: `git remote get-url origin` falha com
   "bad config line 18" (linha `[bran` truncada). `git remote`/`fetch`/`push` não funcionam até
   reparar a linha quebrada no `.git/config` à mão.
2. **Mojibake por `sed` em locale não-UTF-8**: comentários/docs ficaram com `â€"`, `NÃºcleo`, etc.
   (ex.: adaptadores `grupo-ui/grupo-blocks`, workflow, sprint-7-5-1-resultado.md,
   package-distribution.md). Corrigi os arquivos que reescrevi; os demais precisam de limpeza.
3. **Docs auto-referenciais quebradas**: o `sed` global replicou o scope no lugar do texto
   (ex.: "rename de `@supertrans-transportes` para `@supertrans-transportes`"). `package-distribution.md`
   foi reescrito; `sprint-7-5-1-resultado.md` recebeu nota de correção.

## Bloqueios do ambiente (com evidência)

| Recurso | Estado |
|---|---|
| `gh` (GitHub CLI) | **ausente** → sem transferência de repo |
| `pnpm` | **ausente** → sem install/build/pack/publish |
| Rede `api.github.com` | **HTTP 000** |
| Rede `npm.pkg.github.com` | **HTTP 000** |

## Rename no Núcleo

**Não executado no código nesta sessão** (mesma disciplina das sprints anteriores: 57 arquivos,
não verificável por build aqui, e `sed` do sandbox arrisca truncar por causa do mount). Entregue
como Passo 2 do runbook (`package-distribution.md`), com `LC_ALL=C.UTF-8` para evitar mojibake e
gate de `grep`. **Artefatos e docs foram re-escopados para `@portais-orion` nesta sessão**:
- `.github/workflows/release-packages.yml` (scope + repo + pré-requisitos, mojibake limpo)
- `.npmrc.example`
- `.tmp/consumer-test/` (`package.json`, `smoke.tsx`, `README.md`)
- `docs/architecture/package-distribution.md` (reescrito para `@portais-orion` + runbook)
- `portal-supertrans/docs/nucleo-portais-consumo.md` (plano de re-scope)

Ainda em `@supertrans-transportes` (mudam no Passo 2 do runbook): os 57 arquivos de código/config
do Núcleo e os arquivos ativos do Supertrans (`apps/web/package.json`, `next.config.ts`,
`globals.css`, adaptadores `grupo-ui`/`grupo-blocks`).

## Validações do Núcleo / Tarballs / Publicação / Consumer-test

Não executáveis aqui (`pnpm`/rede ausentes). Comandos prontos no runbook. Alvo do consumer-test
(`.tmp/consumer-test`) já está em `@portais-orion`.

## Migração do Supertrans

**Não** — gated em publish `@portais-orion` verde. O Supertrans hoje consome `@supertrans-transportes`;
o re-scope está no runbook (Passo "Como consumir no Supertrans"), incluindo o `sed` UTF-8-safe.

## Tela canário

`/configurador/permissions` — segue funcional no Supertrans com `@supertrans-transportes` (por
consumo versionado). Re-valida após o re-scope.

## Typecheck e débitos pré-existentes

Não medível aqui. O typecheck global do Supertrans mantém erros pré-existentes fora de escopo
(documentado desde a Sprint 7). O re-scope não deve criar erros novos nos arquivos tocados.

## Commits/PRs

Nenhum commit/push por mim (e `git` está quebrado no Núcleo, ver danos colaterais). Sugestões:
Núcleo `chore: move packages to @portais-orion scope`; Supertrans `chore: consume @portais-orion packages`.

## Problemas encontrados

1. `gh`/`pnpm`/rede ausentes → operações impossíveis no sandbox.
2. `.git/config` do Núcleo corrompido → git inoperante até reparo manual.
3. Mojibake e docs auto-referenciais de `sed` em locale ruim → runbook agora exige `LC_ALL=C.UTF-8`.

## Decisões tomadas

- Scope final `@portais-orion` (org genérica), abandonando `@supertrans-transportes` (legado).
- Parar antes de transferir/renomear-código/publicar/migrar (gated + não verificável).
- Re-escopar apenas artefatos/docs; consertar docs corrompidas; sinalizar `.git/config` e mojibake.
- Runbook passa a exigir `sed` em UTF-8 e escopo restrito a código/config (não docs).

## O que ficou fora

Transferência real, rename de código, publish, consumer-test, re-scope do Supertrans, depreciação
dos packages legados, dist (tsup), changesets — todos no runbook.

## Pendências para Sprint 8

1. Reparar `nucleo-portais/.git/config` (linha 18 quebrada).
2. Rodar o runbook: transferência → rename `@supertrans-transportes`→`@portais-orion` (UTF-8) →
   validar → publish → consumer-test → re-scope do Supertrans.
3. Depreciar packages legados `@supertrans-transportes`.
4. Limpar mojibake residual nos comentários/docs não reescritos.
5. Build de `dist` (tsup) + changesets.

## Próxima sprint recomendada

**Sprint 8 — Ajustes pós-consumo**, apenas após o Supertrans consumir `@portais-orion/*` com a
tela canário validada (ou o bloqueio de publicação formalmente aceito).
