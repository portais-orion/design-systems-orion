# Prompt — Release dos packages `@portais-orion`

Cole este prompt num agente, ou execute-o numa máquina com `pnpm`, `gh` autenticado e rede.
Não execute publicação em sandbox sem rede.

---

Você é release engineer do Núcleo de Portais, monorepo pnpm + Turborepo + Changesets. Os
packages `@portais-orion/tokens`, `@portais-orion/ui` e `@portais-orion/blocks` são publicados
privadamente no GitHub Packages da organização `portais-orion`.

Objetivo: validar, versionar, empacotar, publicar e testar os packages em um consumidor
externo. Pare no primeiro gate que falhar e reporte erro exato.

## Guardrails obrigatórios

- Nunca commitar `.npmrc` com token. Use `~/.npmrc`, variável de ambiente ou secret do CI.
- Nunca publicar em registry público.
- Scope válido: somente `@portais-orion`. Não publicar scopes legados.
- Não publicar se `check`, `typecheck`, `build`, `pack:all` ou consumer test falhar.
- Não alterar o Portal Aurora. Ele não é alvo deste release.
- Não migrar telas de produto. Alterações no consumidor limitam-se à adoção da versão.
- Confirmar Changesets, versões e conteúdo do diff antes de publicar.

## 1. Preparar e validar o Núcleo

```powershell
Set-Location C:\projetos\nucleo-portais
git status
git branch --show-current
pnpm install --frozen-lockfile
pnpm check
pnpm typecheck
pnpm build
pnpm pack:all
```

Esse é o pipeline canônico. `package.json.exports` alimenta o módulo de distribuição; UI e
Blocks derivam entradas tsup e `publishConfig.exports`; Tokens usa adapter CSS. O build valida
`dist`. `pack:all` cria e inspeciona os três tarballs em `.tmp/packages`, recusando source,
credenciais, arquivos indevidos, targets fora de `dist` e dependências `workspace:*` não
resolvidas. Não gere exports manualmente e não substitua a inspeção automatizada por uma lista
manual de comandos `tar`.

## 2. Versionar com Changesets

Revise os Changesets pendentes. Se a versão ainda não tiver sido aplicada:

```powershell
pnpm changeset version
pnpm install
```

Confira versões e changelogs de `tokens`, `ui` e `blocks`. Rode novamente o pipeline canônico:

```powershell
pnpm check
pnpm typecheck
pnpm build
pnpm pack:all
```

## 3. Publicar

Preferência: workflow manual, que empacota e inspeciona antes de publicar.

```powershell
gh workflow run release-packages.yml --repo portais-orion/nucleo-portais -f dry-run=false
gh run watch --repo portais-orion/nucleo-portais
```

Alternativa local, somente com autenticação válida e todos os gates já verdes:

```powershell
pnpm publish:packages
```

Confirme no GitHub Packages as versões exatas esperadas. Falha de publicação bloqueia passos
no consumidor.

## 4. Testar em consumidor isolado

Fora do monorepo, instale as versões recém-publicadas e teste imports raiz e subpaths usados:

```powershell
pnpm install
pnpm typecheck
pnpm build
```

O consumidor deve importar CSS por `@portais-orion/tokens/*` e componentes pelos exports
públicos. Configuração Tailwind deve buscar classes no `dist` de UI e Blocks quando aplicável.
Se instalação, types, imports ou build falharem, não atualize produto: corrija exports ou
artefatos no Núcleo, gere nova versão e repita o release.

## 5. Atualizar consumidor autorizado

Somente após consumer test verde:

- crie branch no repositório consumidor;
- atualize dependências para versões exatas publicadas;
- mantenha tema por `data-brand` e imports de tokens existentes;
- valide `typecheck`, build e smoke test das telas afetadas;
- registre commit e PR separados do release do Núcleo.

Não tocar no Aurora. Para migração de telas, use outro plano e a skill oficial
`ai/skills/portais-orion-adoption/SKILL.md`.

## Critérios de aceite

- `pnpm check`, `pnpm typecheck`, `pnpm build` e `pnpm pack:all` verdes.
- Tarballs inspecionados automaticamente, contendo apenas artefatos permitidos.
- Packages privados publicados sob `@portais-orion` nas versões previstas.
- Consumer test instala, tipa e builda imports públicos.
- Nenhum token, `.npmrc`, source ou `workspace:*` indevido publicado.
- Nenhuma alteração no Portal Aurora.

## Falhas

- Gate local ou pack falhou: não publicar.
- Publish falhou: não atualizar consumidor.
- Consumer test falhou: corrigir Núcleo e publicar nova versão.
- Build do produto falhou: manter mudança isolada, reportar e não ampliar escopo.
