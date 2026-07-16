# Workflow: adicionar tema de marca

A fonte única de marcas é `packages/tokens/brands.json` (catálogo interno — não é publicado).
`index.css`, exports de tema do `package.json` e a toolbar do Storybook são derivados dele.

1. Adicionar a marca em `packages/tokens/brands.json` (`id` slug minúsculo, `label` visível; a ordem do array define a ordem na toolbar e nos comparativos).
2. Criar `packages/tokens/src/themes/<id>.css` copiando a ESTRUTURA de um tema existente (mesma lista de tokens — nenhum a mais, nenhum a menos).
3. Seletor triplo obrigatório: `:root:not([data-brand])`, `:root[data-brand="<id>"]`, `[data-brand="<id>"]` (ver ai/context/04-token-rules.md).
4. Preencher: --primary, --primary-foreground, --primary-hover, --ring, --brand-*, --sidebar-* .
5. Sincronizar derivados e validar:

   ```powershell
   pnpm sync:brands      # regrava index.css + exports do package.json a partir do catálogo
   pnpm check:brands     # valida catálogo, temas, imports e exports
   pnpm check:tokens     # gate completo de tokens
   pnpm build:storybook  # toolbar e comparativo pegam a marca automaticamente
   ```

   NUNCA editar à mão os `@import` de tema em `src/index.css` nem os exports `./themes/*` do `package.json` — são derivados do catálogo.
6. Validar contraste primary × primary-foreground (WCAG AA) na story "Núcleo/Comparativo de Marcas".
7. Checklist `token-acceptance.md` + changeset (minor).
