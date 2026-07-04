# Mapa do repositório

```
apps/storybook/           doc oficial; toolbar de marca; stories dos packages
packages/tokens/          Camada 0 — base.css + themes/{supertrans,aurora}.css
packages/ui/              Camada 1 — primitives (Base UI + TW4 + cva); um dir por componente
packages/blocks/          Camada 2 — composições (vazio na Sprint 0)
packages/tsconfig/        tsconfigs compartilhados
packages/biome-config/    lint/format compartilhado
docs/adr/                 decisões (fonte de verdade)
docs/architecture/        visão geral, packages, theming, camadas, storybook, migração
ai/                       contexto, regras, workflows, skills, prompts, checklists p/ agentes
```

Convenções: kebab-case em arquivos; um componente por pasta (`button/button.tsx` + `button.stories.tsx` + `index.ts`); story colocalizada obrigatória; barrel em `src/index.ts`.
