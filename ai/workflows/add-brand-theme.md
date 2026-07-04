# Workflow: adicionar tema de marca

1. Criar `packages/tokens/src/themes/<marca>.css` copiando a ESTRUTURA de um tema existente (mesma lista de tokens — nenhum a mais, nenhum a menos).
2. Seletor triplo obrigatório: `:root:not([data-brand])`, `:root[data-brand="<marca>"]`, `[data-brand="<marca>"]` (ver ai/context/04-token-rules.md).
3. Preencher: --primary, --primary-foreground, --primary-hover, --ring, --brand-*, --sidebar-* .
4. Adicionar `@import` no `src/index.css` e export no `package.json` do tokens.
5. Adicionar a marca na toolbar do Storybook (`apps/storybook/.storybook/preview.tsx`) e na story "Comparativo de Marcas".
6. Validar contraste primary × primary-foreground (WCAG AA) e rodar `pnpm build:storybook`.
7. Checklist `token-acceptance.md` + changeset (minor).
