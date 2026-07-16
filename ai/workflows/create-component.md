# Workflow: criar componente em @portais-orion/ui

1. Confirmar que é Camada 1 (primitive genérico, sem domínio). Composição de vários primitives → é block, use `create-block.md`.
2. Ler `ai/rules/components.md` e `packages/ui/src/button/` como referência.
3. Criar `packages/ui/src/<nome>/{<nome>.tsx,<nome>.stories.tsx,index.ts}`.
4. Base UI se existir primitivo correspondente (`@base-ui/react/<nome>`); cva para variants; apenas tokens semânticos.
5. Exportar no barrel `src/index.ts` (componente + variants).
6. Story: variants principais + disabled + exemplo com ícone quando fizer sentido.
7. Validar: `pnpm check && pnpm typecheck && pnpm build:storybook`; abrir story e alternar marca na toolbar (Supertrans e Aurora).
8. Conferir `ai/checklists/component-acceptance.md` item a item.
9. Criar changeset (`pnpm changeset`, minor).
