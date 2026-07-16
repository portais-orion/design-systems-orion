# Deepening da Distribuição dos Packages

**Data:** 2026-07-15

**Status:** implementado e verificado

## Objetivo

Aprofundar distribuição de `@portais-orion/ui` e `@portais-orion/blocks` sem alterar subpaths públicos. `package.json.exports` de desenvolvimento será fonte canônica. Build, `publishConfig.exports`, validação de `dist` e inspeção de tarball derivarão dessa interface.

## Decisões confirmadas

- Preservar todos subpaths públicos atuais; nenhuma breaking change.
- Tratar `package.json.exports` como catálogo canônico e explícito.
- Manter `publishConfig.exports` gerado e commitado.
- Bloquear divergência em `pnpm check`.
- Validar artefatos em `pnpm build`.
- Inspecionar tarballs no workflow antes de publicar.
- Implementar module compartilhado em `scripts/`, não novo package interno.
- Manter tokens como adapter CSS; UI e Blocks usam adapter tsup.
- Integrar mudanças diretamente em `main` após gates obrigatórios.

## Arquitetura

### Deep module

`scripts/lib/package-distribution.mjs` concentra regras hoje espalhadas por manifests, configs tsup, script gerador, workflow e runbook.

Responsabilidades:

1. Ler e validar catálogo `exports` de um package TypeScript.
2. Derivar targets publicados `.mjs` e `.d.mts`.
3. Derivar entradas tsup a partir dos source targets.
4. Comparar mapa derivado com `publishConfig.exports` commitado.
5. Validar existência dos source targets.
6. Validar artefatos esperados em `dist` após build.
7. Validar inventário e conteúdo crítico do tarball.

Module será in-process. Funções puras recebem manifest/dados de inventário e retornam resultados ou diagnostics. Filesystem fica atrás de adapter interno usado por CLI e configs.

### CLI adapter

`scripts/gen-dist-exports.mjs` permanece como adapter compatível, porém fino:

- `--check`: valida sem escrever.
- `--write`: atualiza somente `files`, campos de entrada publicados e `publishConfig.exports` derivados.
- Sem modo: mantém comportamento atual de sincronização para caminho informado, evitando quebra de runbooks existentes.

CLI aceitará caminhos explícitos e terá comando raiz para UI e Blocks. Diagnostics sempre identificarão package, subpath, valor atual e valor esperado.

### Build adapters

`packages/ui/tsup.config.ts` e `packages/blocks/tsup.config.ts` deixarão glob como fonte implícita. Ambos obterão entradas do deep module usando `exports` do próprio manifest.

`packages/tokens/scripts/build-tokens.mjs` continua adapter CSS independente. Nenhuma lógica tsup será aplicada a tokens.

### Gates

Fluxo local e CI:

1. `pnpm check`: integridade textual, tokens, marcas, paridade da distribuição, pureza e Biome.
2. `pnpm typecheck`: contratos TypeScript do workspace.
3. `pnpm build`: Turbo gera `dist`; check pós-build confirma cada `.mjs` e `.d.mts` esperado.
4. Workflow de release: gates anteriores, dry-run/pack, inspeção do inventário, publish somente após sucesso.

`packages/ui/turbo.json` e `packages/blocks/turbo.json` não poderão anular `dist/**` declarado na raiz. Cache deve refletir outputs reais.

## Interface pública preservada

- Imports raiz continuam válidos.
- Todos subpaths atuais continuam válidos.
- Desenvolvimento no workspace continua resolvendo `exports` para `src`.
- Publicação continua resolvendo `publishConfig.exports` para `dist`.
- Formatos publicados continuam ESM `.mjs` com tipos `.d.mts`.
- Registry, access, versions e peer dependencies não mudam neste ciclo.

## Erros

Falhas bloqueantes:

- Export sem target TypeScript suportado.
- Source target inexistente.
- `publishConfig.exports` diferente do mapa derivado.
- Campo publicado raiz divergente.
- Artefato `.mjs` ou `.d.mts` ausente após build.
- Tarball contendo `src`, `.env`, `.npmrc`, secret conhecido ou arquivo fora da allowlist.
- Tarball contendo dependência `workspace:*` não resolvida.

`--check` nunca escreve. `--write` não altera versões, dependencies, scripts ou source exports.

## Testes

Usar `node:test` e `node:assert/strict`; nenhuma dependência nova.

Fixtures temporárias cobrem:

- Root export e múltiplos subpaths válidos.
- Derivação `.ts`/`.tsx` para `.mjs`/`.d.mts`.
- Target inválido.
- Source target ausente.
- Publish map divergente.
- Dist completo e incompleto.
- Tarball permitido.
- Tarball com `src`, credencial, arquivo indevido ou `workspace:*`.

TDD obrigatório: cada comportamento começa com teste falhando pelo motivo esperado. Testes atravessam interface do deep module; não testam helpers internos.

## Mudanças documentais

Atualizar:

- `docs/architecture/package-distribution.md`
- `ai/prompts/release-portais-orion.md`
- `.github/workflows/release-packages.yml`
- scripts raiz em `package.json`

Remover instruções manuais tornadas redundantes. ADRs históricos permanecem imutáveis.

## Não objetivos

- Trocar tsup, pnpm, Turbo, Changesets ou GitHub Packages.
- Alterar scope ou versões.
- Publicar packages durante implementação.
- Modificar repositórios consumidores.
- Redesenhar interface pública dos packages.
- Implementar demais deepenings nesta spec.

## Critérios de aceite

- Uma fonte canônica para subpaths TypeScript: `package.json.exports`.
- UI e Blocks geram entradas e publish map dessa fonte.
- Divergência falha em `pnpm check`.
- Artefato ausente falha em `pnpm build`.
- Release inspeciona tarball antes de publish.
- Testes Node cobrem caminhos positivos e negativos.
- `pnpm check`, `pnpm typecheck` e `pnpm build` terminam com exit code 0.
- Nenhum subpath público atual muda.
