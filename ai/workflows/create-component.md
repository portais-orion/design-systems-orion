# Workflow: criar componente em @supertrans-transportes/ui

1. Confirmar que Ã© Camada 1 (primitive genÃ©rico, sem domÃ­nio). ComposiÃ§Ã£o de vÃ¡rios primitives â†’ Ã© block, use `create-block.md`.
2. Ler `ai/rules/components.md` e `packages/ui/src/button/` como referÃªncia.
3. Criar `packages/ui/src/<nome>/{<nome>.tsx,<nome>.stories.tsx,index.ts}`.
4. Base UI se existir primitivo correspondente (`@base-ui/react/<nome>`); cva para variants; apenas tokens semÃ¢nticos.
5. Exportar no barrel `src/index.ts` (componente + variants).
6. Story: variants principais + disabled + exemplo com Ã­cone quando fizer sentido.
7. Validar: `pnpm check && pnpm typecheck && pnpm build:storybook`; abrir story e alternar marca na toolbar (Supertrans e Aurora).
8. Conferir `ai/checklists/component-acceptance.md` item a item.
9. Criar changeset (`pnpm changeset`, minor).
