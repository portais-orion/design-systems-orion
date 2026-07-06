# Sprint 10 — Resultado

Hardening dos packages `@portais-orion` (dist/tsup, Changesets) + skill de adoção
`portais-orion-adoption`.

## Resumo

Duas frentes: (1) **config de build distribuível preparada** (tsup para `ui`/`blocks`, cópia CSS
para `tokens`, gerador de exports dist, changeset) e (2) **skill de adoção + docs de consumo**
criadas. As etapas operacionais (build tsup, `pack`, publish 0.1.1, consumer-test, atualização do
Supertrans, depreciação de legados) **não rodam neste ambiente** (sem `pnpm`/`tsup`/`gh`/rede) e
ficam como handoff, com fluxo pronto. Nada de API pública foi alterado.

## Baseline

Não executável aqui (`pnpm`/`tsup` ausentes). `build-tokens.mjs` foi **executado com sucesso**
(node puro) gerando `dist/{base,index,themes/*}.css`. Estado herdado (Sprint 9): Supertrans consome
`@portais-orion/*`, `@source` corrigido, AppShell canário real. Núcleo já re-escopado para
`@portais-orion` (57 arquivos, aplicado pelo dev entre sprints).

## Hardening de build dos packages

Versão alvo: **0.1.1** (patch — só packaging, sem breaking change). Modelo: dev continua usando
`exports`→`src` (workspace/storybook não quebra); o publish usa `dist` via `publishConfig` (tokens
direto; `ui`/`blocks` via gerador). Assim o tree permanece verde e o dist é aplicado no release.

## Dist de tokens

`packages/tokens/scripts/build-tokens.mjs` copia `src/`→`dist/` (verificado: gera
`base.css`, `index.css`, `themes/{supertrans,aurora}.css`). `package.json`: `build`/`prepack` →
o script, `files: ["dist"]`, `publishConfig.exports`→`dist`. Top-level `exports`→`src` (dev).

## Dist de ui

`packages/ui/tsup.config.ts`: ESM + `dts`, entradas derivadas dos subpaths
(`src/index.ts` + `src/*/index.ts`), `clean`, `splitting`, `treeshake`; **externals**: react,
react-dom, @base-ui/react, lucide-react, class-variance-authority, tailwind-merge, clsx.
`package.json`: `build: tsup` + devDep `tsup`. `exports`/`files` seguem em `src` (publish source
continua válido) até rodar o gerador de exports dist (abaixo) no release.

## Dist de blocks

`packages/blocks/tsup.config.ts`: idem, **externals** incluem `@portais-orion/ui` (não bundla) +
react/react-dom/@tanstack/react-table/lucide-react; sem dependência de Next. `package.json`:
`build: tsup` + devDep `tsup`; dep interna `@portais-orion/ui: workspace:*` (resolvida no publish).

## Exports finais

`scripts/gen-dist-exports.mjs` **deriva** `publishConfig.exports`→`dist` (`{types, import}` por
subpath) + `files: ["dist"]` a partir dos `exports`→`src` existentes — sem mapa manual frágil.
Rodar no release: `node scripts/gen-dist-exports.mjs packages/ui/package.json` (e `blocks`).
Tokens já tem `publishConfig.exports`→`dist` fixo (4 entradas).

## Changesets

`.changeset/config.json` já existia (`access: restricted`, ignore storybook). Criado
`.changeset/sprint-10-dist-build.md` (patch nos 3 pacotes, descrevendo o build distribuível sem
breaking change). Fluxo: `pnpm changeset version` → `pnpm build` → `pack:all` → `publish:packages`.

## Pack e inspeção de tarballs

Handoff (`pnpm`/`tsup` ausentes). Após `gen-dist-exports` + `pnpm build`, o `tar -tf` deve mostrar
`dist/**` (não `src`), `package.json` com exports→dist, sem `.env`/`.npmrc`/token/`node_modules`,
sem scope legado, sem `workspace:*` (resolvido no publish).

## Publicação da nova versão

**Pendente** — bloqueio de ambiente documentado (critério #9 aceita "publicada **ou** bloqueio
documentado"). Fluxo pronto no runbook + workflow `release-packages.yml`
(`gh workflow run release-packages.yml --repo portais-orion/nucleo-portais`).

## Consumer-test

`.tmp/consumer-test/` já em `@portais-orion`. Execução handoff (precisa dos tarballs/publish).

## Atualização do Supertrans

**Não aplicada** (gated em publish 0.1.1 + consumer-test verdes). Quando publicar: bumpar
`@portais-orion/*`→0.1.1; **testar** `@source`→`.../dist` e **remover** `transpilePackages`
(manter só se o build ESM exigir — documentar). Ver Parte "@source e transpilePackages".

## @source e transpilePackages

Enquanto o consumo for source (0.1.0), manter `@source ".../src"` + `transpilePackages`. Após
0.1.1 dist: trocar `@source` para `.../dist` e testar remover `transpilePackages` (dist é ESM +
`.d.ts`). **Não** alterei o Supertrans agora (evita quebrar o consumo atual, que é source-based).

## Packages legados

`@supertrans-transportes/{tokens,ui,blocks}` (e `@grupo`, `@mateusarcestr`): **legado**. Não usar
em novos projetos; não apagar sem autorização. Depreciação (restrição/mark legacy/deleção)
documentada em `docs/architecture/package-distribution.md` e no `consumer-setup.md`. Inventário:
`gh api /orgs/SuperTrans-Transportes/packages?package_type=npm`.

## Skill portais-orion-adoption

Criada: `ai/skills/portais-orion-adoption/SKILL.md`. 17 seções (quando usar/não usar, pré-checagem,
tokens/@source, escolha de tela, matriz de mapeamento local→Núcleo, preservar hooks/API/permissões,
exemplo real de DataTable, AppShell/renderLink/canAccessItem, anti-migração-em-massa, gates,
checklist, referências reais). Grounded em `/configurador/permissions` e `/configurador/app-shell-canary`.

## Consumer setup docs

Criado: `docs/adoption/consumer-setup.md` (.npmrc, instalação, tokens + data-brand, `@source`,
transpilePackages, imports de Button/PageHeader/DataTable, validação de build, abrir backlog, legados).

## Validações executadas

- ✅ `build-tokens.mjs` roda e gera `dist/` (node puro).
- ✅ Configs tsup/gerador/changeset escritas; package.json build wiring aplicado (verificado via Read).
- ⚠️ `pnpm check/typecheck/build/build:storybook/pack:all`, consumer-test, publish, Supertrans build
  — não executáveis aqui (`pnpm`/`tsup`/`gh`/rede ausentes). Handoff.

## Problemas encontrados

1. `pnpm`/`tsup`/`gh`/rede ausentes → build/publish/consumer-test são handoff.
2. Docs (7.5.x, package-distribution) re-corrompidas por `sed`/linter externo em locale não-UTF-8
   (mojibake `�`); precisam de limpeza — não é `@portais-orion`-crítico.
3. `nucleo-portais/.git/config` segue corrompido (7.5.2) — reparar antes de operações git.

## Decisões tomadas

- Patch 0.1.1 (só packaging). Dev usa `exports`→src; publish usa dist via `publishConfig` (tree verde).
- Exports dist derivados por script (não manual). Tokens dist verificado localmente.
- Não alterar o Supertrans nem publicar aqui (gated + não verificável); handoff com fluxo pronto.
- Skill + consumer-setup como entregáveis duráveis desta sprint.

## O que ficou fora

Build tsup real, pack, publish 0.1.1, consumer-test, atualização do Supertrans (@source/dist +
transpilePackages), depreciação efetiva dos legados, limpeza de mojibake, reparo do `.git/config`.

## Pendências para Sprint 11

1. Rodar (dev): `gen-dist-exports` (ui/blocks) → `pnpm build` → `pack:all` → inspecionar → publish 0.1.1.
2. Consumer-test verde; atualizar Supertrans p/ 0.1.1 (@source→dist, testar remover transpilePackages).
3. Depreciar legados; reparar `.git/config`; limpar mojibake dos docs.
4. Usar a skill `portais-orion-adoption` para migrar 1 tela real adicional e refinar a skill.

## Próxima sprint recomendada

**Sprint 11 — Rollout assistido com a skill `portais-orion-adoption`** (migrar 1 tela real, medir
retrabalho, refinar a skill, iniciar depreciação controlada dos legados). Aurora segue fora do
curto prazo (depende de preparo próprio + Turborepo, outro dev).
