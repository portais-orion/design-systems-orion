# Núcleo de Portais do Grupo

Plataforma interna do grupo: design system compartilhado (tokens, primitives, blocks), Storybook oficial, documentação arquitetural e estrutura de desenvolvimento assistido por agentes de IA. Base oficial para criação, padronização e evolução dos portais das empresas do grupo.

**Não é** uma biblioteca da Supertrans nem uma cópia do Aurora — é a curadoria do melhor dos dois portais (ver `docs/adr/0001`).

## Requisitos

- Node >= 22
- pnpm >= 9 (`corepack enable`)

## Começando

> **Após cada sincronização de sprint**: rode `pnpm install` antes de `pnpm storybook` — o lockfile chega atualizado, mas o `node_modules` local não é tocado.

```bash
pnpm install
pnpm storybook        # abre o Storybook em http://localhost:6006
```

Na toolbar do Storybook, o seletor **Marca** alterna os temas Supertrans/Aurora — todo componente deve funcionar nas duas.

## Scripts

| Comando | Ação |
|---|---|
| `pnpm build` | build de todos os workspaces (turbo) |
| `pnpm check` | Biome (lint + format) |
| `pnpm typecheck` | TypeScript em todos os packages |
| `pnpm storybook` | Storybook dev (porta 6006) |
| `pnpm build:storybook` | Storybook estático |
| `pnpm changeset` | registra mudança para versionamento |

## Estrutura

Ver `AGENTS.md` (mapa completo) e `docs/architecture/overview.md`.

## Para agentes de IA

Comece por `AGENTS.md` e `ai/context/00-read-first.md`. Regras, workflows e checklists estão em `ai/`.
