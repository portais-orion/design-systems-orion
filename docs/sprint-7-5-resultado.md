# Sprint 7.5 — Resultado

Transformar o Núcleo em pacotes internos versionados e instaláveis, substituindo a
estratégia temporária de aliases da Sprint 7. Guia completo em
[`architecture/package-distribution.md`](./architecture/package-distribution.md).

## Resumo

Os 3 pacotes (`tokens`, `ui`, `blocks`) foram preparados para publicação **source-based**
v0.1.0 no **GitHub Packages**: `private` removido, `files`/`peerDependencies`/`publishConfig`
revisados, versão 0.1.0, e `workspace:*` resolvido automaticamente pelo `pnpm publish`.
Foram criados `.npmrc.example`, workflow de release (dispatch), scaffold de consumidor limpo
e o runbook de rename de scope. A **publicação real e a migração do Supertrans ficam como
execução pendente** — este ambiente (Linux com `node_modules` de Windows, sem pnpm, sem
rede ao registry) não roda build/pack/publish; são passos da máquina do dev.

## Registry escolhido

GitHub Packages (`https://npm.pkg.github.com`), privado. Configurado via
`publishConfig.registry` nos 3 pacotes + `.npmrc.example`.

## Namespace escolhido

**`@mateusarcestr`** foi o scope provisório (owner do repo = conta pessoal).
**Superado na Sprint 7.5.1:** decidido transferir o repo para a org `SuperTrans-Transportes`
e adotar o scope final **`@supertrans-transportes`**. Ver `docs/sprint-7-5-1-resultado.md` e
`docs/architecture/package-distribution.md` (atualizados).

## Cadastro/acesso necessário

- PAT classic com `read:packages` (instalar) e `write:packages` (publicar) em `~/.npmrc`.
- Repo `nucleo-portais` privado (já existe: `github.com/mateusarcestr/nucleo-portais`).
- Conceder leitura de packages ao repo/CI do `portal-supertrans`.

## Packages preparados

`@supertrans-transportes/tokens`, `@supertrans-transportes/ui`, `@supertrans-transportes/blocks` → v0.1.0, `private` removido, `files: ["src"]`,
`publishConfig` (access restricted + registry GitHub). `@supertrans-transportes/tsconfig` e
`@supertrans-transportes/biome-config` permanecem `private` (tooling).

## Build dos packages

Source-based (sem dist). `files: ["src"]` publica a fonte; consumidor transpila (Next
`transpilePackages`). `build` segue `tsc --noEmit` (gate de tipos). Dist compilado via tsup
= hardening da Sprint 8.

## Exports finais

Subpath exports por componente/tema preservados, apontando para `./src/...`
(ex.: `@supertrans-transportes/ui/button` → `./src/button/index.ts`; `@supertrans-transportes/tokens/base.css` → `./src/base.css`).

## peerDependencies/dependencies

- `ui`: peers `react`, `react-dom`, `@base-ui/react`, `lucide-react`,
  `class-variance-authority`, `tailwind-merge`; dep `clsx`.
- `blocks`: peers `react`, `react-dom`, `@tanstack/react-table`, `lucide-react`; dep `@supertrans-transportes/ui`.
- `tokens`: sem peers.

Os pacotes que viraram peer também estão em `devDependencies` (dev/build do próprio Núcleo).

## Resolução de `workspace:*`

`pnpm publish` substitui `workspace:*` pela versão publicada. `@supertrans-transportes/blocks` publicado
depende de `@supertrans-transportes/ui@0.1.0` (não de `workspace:*`). Validação: seção "consumidor limpo".

## .npmrc

`.npmrc` é filename protegido/segredo → **não** committado (adicionado ao `.gitignore`).
Entregue `.npmrc.example` com o padrão `${GITHUB_PACKAGES_TOKEN}`. Publish não depende de
`.npmrc` no repo (usa `publishConfig.registry` + token do ambiente/CI).

## Publicação

**Pendente (execução na máquina do dev / CI).** Fluxo pronto: `pnpm pack:all` (dry-run,
inspecionar tarball) → rename de scope → `pnpm publish:packages` ou workflow dispatch.
Não executável neste ambiente (sem pnpm/rede).

## Teste em consumidor limpo

Scaffold criado em `.tmp/consumer-test/` (gitignored): `package.json`, `smoke.tsx`,
`tsconfig.json`, `README.md`. Importa `@mateusarcestr/tokens|ui|blocks` e roda `pnpm typecheck`.
**Execução pendente** (precisa dos pacotes publicados ou tarballs).

## Supertrans atualizado para packages reais

**Não** — mantidos os aliases da Sprint 7 (o sprint proíbe remover aliases antes de validar
o install real). Plano de swap documentado e pronto em
`portal-supertrans/docs/nucleo-portais-consumo.md`.

## Validações executadas

- ?S& `check:pureza` (node puro) — verde (Núcleo não teve código de componente alterado).
- ?S& package.json dos 3 pacotes — JSON válido, revisado via Read (o mount bash do sandbox
  serve view truncada para arquivos recém-escritos; a fonte de verdade é o host).
- ?a?️ `pnpm install/check/typecheck/build/build:storybook/pack:all` — não executáveis aqui
  (sem pnpm; binários nativos de Windows não rodam sob Linux; sem rede ao registry).
  Comandos prontos em `package-distribution.md` para o dev/CI.

## Problemas encontrados

1. GitHub Packages exige scope == owner; `@supertrans-transportes` não é owner → rename obrigatório antes do publish.
2. Repo do Núcleo está sob conta pessoal, não sob a org `SuperTrans-Transportes` do portal consumidor.
3. Ambiente não roda pnpm/build/publish → publicação e testes de install ficam como execução do dev.
4. Mount do sandbox cacheia comprimento antigo de arquivos recém-escritos (validação via Read, não bash).

## Decisões tomadas

- Source-based v0.1.0 (dist/tsup adiado p/ Sprint 8).
- Scope `@mateusarcestr` (com recomendação de migrar p/ org).
- `workspace:*` resolvido pelo `pnpm publish` (sem prepack customizado).
- `.npmrc` não committado; `publishConfig.registry` + `.npmrc.example`.
- Rename como runbook (não executado blind neste ambiente).
- Supertrans mantém aliases até publish validado.

## O que ficou fora

Migrar mais telas; Aurora; backend/banco/auth/permissões; AppShell real; dedupe de tokens;
Chromatic prod; shadcn registry; CLI/templates; publicação pública; build dist (tsup).

## Pendências para Sprint 8

1. Decidir scope final (pessoal vs org `@supertrans-transportes`) e mover repo se for o caso.
2. Rodar rename + `pnpm build` + `pnpm pack:all` + publish real (ou via workflow dispatch).
3. Rodar o consumidor limpo (`.tmp/consumer-test`) e confirmar checklist.
4. Migrar o Supertrans para deps versionadas (remover aliases/tracingRoot/@import relativos).
5. Build de `dist` (tsup) p/ consumidores sem transpile.
6. Versionamento via changesets (v0.1.0 foi manual).

## Próxima sprint recomendada

**Sprint 8 — Ajustes pós-consumo**: executar publish + swap do Supertrans + dist/tsup, além
do dedupe de tokens e AppShell já herdados da Sprint 7.
