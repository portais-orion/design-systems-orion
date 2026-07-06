# Sprint 7.5 â€” Resultado

Transformar o NÃºcleo em pacotes internos versionados e instalÃ¡veis, substituindo a
estratÃ©gia temporÃ¡ria de aliases da Sprint 7. Guia completo em
[`architecture/package-distribution.md`](./architecture/package-distribution.md).

## Resumo

Os 3 pacotes (`tokens`, `ui`, `blocks`) foram preparados para publicaÃ§Ã£o **source-based**
v0.1.0 no **GitHub Packages**: `private` removido, `files`/`peerDependencies`/`publishConfig`
revisados, versÃ£o 0.1.0, e `workspace:*` resolvido automaticamente pelo `pnpm publish`.
Foram criados `.npmrc.example`, workflow de release (dispatch), scaffold de consumidor limpo
e o runbook de rename de scope. A **publicaÃ§Ã£o real e a migraÃ§Ã£o do Supertrans ficam como
execuÃ§Ã£o pendente** â€” este ambiente (Linux com `node_modules` de Windows, sem pnpm, sem
rede ao registry) nÃ£o roda build/pack/publish; sÃ£o passos da mÃ¡quina do dev.

## Registry escolhido

GitHub Packages (`https://npm.pkg.github.com`), privado. Configurado via
`publishConfig.registry` nos 3 pacotes + `.npmrc.example`.

## Namespace escolhido

**`@mateusarcestr`** foi o scope provisÃ³rio (owner do repo = conta pessoal).
**Superado na Sprint 7.5.1:** decidido transferir o repo para a org `SuperTrans-Transportes`
e adotar o scope final **`@supertrans-transportes`**. Ver `docs/sprint-7-5-1-resultado.md` e
`docs/architecture/package-distribution.md` (atualizados).

## Cadastro/acesso necessÃ¡rio

- PAT classic com `read:packages` (instalar) e `write:packages` (publicar) em `~/.npmrc`.
- Repo `nucleo-portais` privado (jÃ¡ existe: `github.com/mateusarcestr/nucleo-portais`).
- Conceder leitura de packages ao repo/CI do `portal-supertrans`.

## Packages preparados

`@supertrans-transportes/tokens`, `@supertrans-transportes/ui`, `@supertrans-transportes/blocks` â†’ v0.1.0, `private` removido, `files: ["src"]`,
`publishConfig` (access restricted + registry GitHub). `@supertrans-transportes/tsconfig` e
`@supertrans-transportes/biome-config` permanecem `private` (tooling).

## Build dos packages

Source-based (sem dist). `files: ["src"]` publica a fonte; consumidor transpila (Next
`transpilePackages`). `build` segue `tsc --noEmit` (gate de tipos). Dist compilado via tsup
= hardening da Sprint 8.

## Exports finais

Subpath exports por componente/tema preservados, apontando para `./src/...`
(ex.: `@supertrans-transportes/ui/button` â†’ `./src/button/index.ts`; `@supertrans-transportes/tokens/base.css` â†’ `./src/base.css`).

## peerDependencies/dependencies

- `ui`: peers `react`, `react-dom`, `@base-ui/react`, `lucide-react`,
  `class-variance-authority`, `tailwind-merge`; dep `clsx`.
- `blocks`: peers `react`, `react-dom`, `@tanstack/react-table`, `lucide-react`; dep `@supertrans-transportes/ui`.
- `tokens`: sem peers.

Os pacotes que viraram peer tambÃ©m estÃ£o em `devDependencies` (dev/build do prÃ³prio NÃºcleo).

## ResoluÃ§Ã£o de `workspace:*`

`pnpm publish` substitui `workspace:*` pela versÃ£o publicada. `@supertrans-transportes/blocks` publicado
depende de `@supertrans-transportes/ui@0.1.0` (nÃ£o de `workspace:*`). ValidaÃ§Ã£o: seÃ§Ã£o "consumidor limpo".

## .npmrc

`.npmrc` Ã© filename protegido/segredo â†’ **nÃ£o** committado (adicionado ao `.gitignore`).
Entregue `.npmrc.example` com o padrÃ£o `${GITHUB_PACKAGES_TOKEN}`. Publish nÃ£o depende de
`.npmrc` no repo (usa `publishConfig.registry` + token do ambiente/CI).

## PublicaÃ§Ã£o

**Pendente (execuÃ§Ã£o na mÃ¡quina do dev / CI).** Fluxo pronto: `pnpm pack:all` (dry-run,
inspecionar tarball) â†’ rename de scope â†’ `pnpm publish:packages` ou workflow dispatch.
NÃ£o executÃ¡vel neste ambiente (sem pnpm/rede).

## Teste em consumidor limpo

Scaffold criado em `.tmp/consumer-test/` (gitignored): `package.json`, `smoke.tsx`,
`tsconfig.json`, `README.md`. Importa `@mateusarcestr/tokens|ui|blocks` e roda `pnpm typecheck`.
**ExecuÃ§Ã£o pendente** (precisa dos pacotes publicados ou tarballs).

## Supertrans atualizado para packages reais

**NÃ£o** â€” mantidos os aliases da Sprint 7 (o sprint proÃ­be remover aliases antes de validar
o install real). Plano de swap documentado e pronto em
`portal-supertrans/docs/nucleo-portais-consumo.md`.

## ValidaÃ§Ãµes executadas

- âœ… `check:pureza` (node puro) â€” verde (NÃºcleo nÃ£o teve cÃ³digo de componente alterado).
- âœ… package.json dos 3 pacotes â€” JSON vÃ¡lido, revisado via Read (o mount bash do sandbox
  serve view truncada para arquivos recÃ©m-escritos; a fonte de verdade Ã© o host).
- âš ï¸ `pnpm install/check/typecheck/build/build:storybook/pack:all` â€” nÃ£o executÃ¡veis aqui
  (sem pnpm; binÃ¡rios nativos de Windows nÃ£o rodam sob Linux; sem rede ao registry).
  Comandos prontos em `package-distribution.md` para o dev/CI.

## Problemas encontrados

1. GitHub Packages exige scope == owner; `@supertrans-transportes` nÃ£o Ã© owner â†’ rename obrigatÃ³rio antes do publish.
2. Repo do NÃºcleo estÃ¡ sob conta pessoal, nÃ£o sob a org `SuperTrans-Transportes` do portal consumidor.
3. Ambiente nÃ£o roda pnpm/build/publish â†’ publicaÃ§Ã£o e testes de install ficam como execuÃ§Ã£o do dev.
4. Mount do sandbox cacheia comprimento antigo de arquivos recÃ©m-escritos (validaÃ§Ã£o via Read, nÃ£o bash).

## DecisÃµes tomadas

- Source-based v0.1.0 (dist/tsup adiado p/ Sprint 8).
- Scope `@mateusarcestr` (com recomendaÃ§Ã£o de migrar p/ org).
- `workspace:*` resolvido pelo `pnpm publish` (sem prepack customizado).
- `.npmrc` nÃ£o committado; `publishConfig.registry` + `.npmrc.example`.
- Rename como runbook (nÃ£o executado blind neste ambiente).
- Supertrans mantÃ©m aliases atÃ© publish validado.

## O que ficou fora

Migrar mais telas; Aurora; backend/banco/auth/permissÃµes; AppShell real; dedupe de tokens;
Chromatic prod; shadcn registry; CLI/templates; publicaÃ§Ã£o pÃºblica; build dist (tsup).

## PendÃªncias para Sprint 8

1. Decidir scope final (pessoal vs org `@supertrans-transportes`) e mover repo se for o caso.
2. Rodar rename + `pnpm build` + `pnpm pack:all` + publish real (ou via workflow dispatch).
3. Rodar o consumidor limpo (`.tmp/consumer-test`) e confirmar checklist.
4. Migrar o Supertrans para deps versionadas (remover aliases/tracingRoot/@import relativos).
5. Build de `dist` (tsup) p/ consumidores sem transpile.
6. Versionamento via changesets (v0.1.0 foi manual).

## PrÃ³xima sprint recomendada

**Sprint 8 â€” Ajustes pÃ³s-consumo**: executar publish + swap do Supertrans + dist/tsup, alÃ©m
do dedupe de tokens e AppShell jÃ¡ herdados da Sprint 7.
