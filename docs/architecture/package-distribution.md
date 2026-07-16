# Distribuição dos packages

Como o Núcleo empacota e distribui packages internos versionados.

## Decisão vigente

- scope oficial: `@portais-orion`
- registry privado: GitHub Packages
- packages consumíveis: `tokens`, `ui` e `blocks`
- packages internos: `tsconfig` e `biome-config`
- dependências entre packages são resolvidas pela versão publicada no tarball

## Fonte canônica e adapters

Em `ui` e `blocks`, `package.json.exports` é o catálogo canônico de imports públicos. No
workspace, seus targets apontam para `src`; o módulo profundo
`scripts/lib/package-distribution.mjs` deriva dessa interface:

- entradas entregues ao adapter tsup de cada package;
- `main`, `module`, `types` e `publishConfig.exports` commitados;
- artefatos `.mjs` e `.d.mts` esperados em `dist`;
- regras de inventário e conteúdo do tarball.

`tokens` usa adapter CSS próprio (`packages/tokens/scripts/build-tokens.mjs`): copia os CSS
de `src` para `dist` e publica apenas os exports CSS declarados. Lógica tsup não se aplica a
tokens.

## Pipeline

```txt
package.json.exports
  -> scripts/lib/package-distribution.mjs
  -> entradas tsup + publishConfig.exports commitado
  -> verificação de dist
  -> pnpm pack + inspeção dos tarballs
  -> publish
```

1. `pnpm check` testa o módulo e bloqueia source ausente, target inválido ou divergência entre
   `exports` e o mapa publicado.
2. `pnpm typecheck` verifica os contratos TypeScript do workspace.
3. `pnpm build` gera `dist` e executa `scripts/check-package-dist.mjs`, que exige cada `.mjs`
   e `.d.mts` derivado para UI e Blocks. Tokens gera CSS em `dist` pelo adapter próprio.
4. `pnpm pack:all` cria tarballs de Tokens, UI e Blocks em `.tmp/packages` e os inspeciona.
   Arquivo fora da allowlist, source, credencial, target publicado fora de `dist` ou dependência
   `workspace:*` não resolvida bloqueia o processo.
5. `pnpm publish:packages` publica somente depois dos gates. O workflow
   `release-packages.yml` é manual, faz pack sempre e publica apenas quando `dry-run` está
   desativado.

## Manutenção de exports

Adicionar ou remover um subpath TypeScript exige editar somente `exports` do manifest e o
source correspondente. Depois, sincronize os campos derivados quando necessário:

```powershell
node scripts/gen-dist-exports.mjs --write packages/ui/package.json packages/blocks/package.json
pnpm check
pnpm typecheck
pnpm build
pnpm pack:all
```

O modo `--check`, executado por `pnpm check:packages`, nunca escreve. `--write` não altera
versões, dependências, scripts nem os source exports.

## Regras operacionais

- Nunca commitar `.npmrc` com token; autenticação fica no ambiente, `~/.npmrc` ou CI.
- Nunca publicar em registry público.
- Nunca usar scopes legados em novos consumidores.
- Nunca publicar se `check`, `typecheck`, `build` ou `pack:all` falhar.
- Mudança consumível exige Changeset e teste em consumidor externo ao monorepo.
- Produtos permanecem em repositórios separados e consomem packages por versão.
