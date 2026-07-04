# Regras de componente (contexto rápido)

- Primitives (`@grupo/ui`): Base UI quando houver primitivo aplicável; cva para variants; `cn` de `src/utils/cn.ts`; forwardRef; `data-slot`.
- Só tokens semânticos: `bg-primary`, `text-muted-foreground`, `border-border`, `bg-primary-hover`. Nunca hex, nunca `orange-*`/`blue-*`/`primary-600`.
- Base UI ≠ Radix: `render` prop (não `asChild`); `Popup` (não `Content`); `Backdrop` (não `Overlay`); `Positioner` (não `Viewport`); CSS vars `--base-ui-*`.
- Sem domínio: nada de rotas, endpoints, permissões, entidades, textos de negócio. Dados via props; conteúdo via ReactNode/slots.
- Story colocalizada obrigatória, validada nas 2 marcas (toolbar do Storybook).
- Referência de estilo de código: `packages/ui/src/button/`.
