# Regras de componente (contexto rÃ¡pido)

- Primitives (`@supertrans-transportes/ui`): Base UI quando houver primitivo aplicÃ¡vel; cva para variants; `cn` de `src/utils/cn.ts`; forwardRef; `data-slot`.
- SÃ³ tokens semÃ¢nticos: `bg-primary`, `text-muted-foreground`, `border-border`, `bg-primary-hover`. Nunca hex, nunca `orange-*`/`blue-*`/`primary-600`.
- Base UI â‰  Radix: `render` prop (nÃ£o `asChild`); `Popup` (nÃ£o `Content`); `Backdrop` (nÃ£o `Overlay`); `Positioner` (nÃ£o `Viewport`); CSS vars `--base-ui-*`.
- Sem domÃ­nio: nada de rotas, endpoints, permissÃµes, entidades, textos de negÃ³cio. Dados via props; conteÃºdo via ReactNode/slots.
- Story colocalizada obrigatÃ³ria, validada nas 2 marcas (toolbar do Storybook).
- ReferÃªncia de estilo de cÃ³digo: `packages/ui/src/button/`.
