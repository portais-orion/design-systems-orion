# Workflow: extrair componente do portal-supertrans

Uso: componente já está em Base UI + TW4 + tokens no Supertrans (caso dos primitives de `apps/web/src/components/ui/`).

1. Copiar `<nome>.tsx` + `<nome>.stories.tsx` do Supertrans para `packages/ui/src/<nome>/`.
2. Ajustar imports: `@/lib/utils` → `../utils/cn`; remover qualquer import de app (hooks, contextos, auth).
3. Varredura de pureza: grep por hex (`#`), `brand-`, rotas, `use[A-Z]` de app. Encontrou → substituir por token/prop.
4. Se a story usa providers do app (AuthContext, QueryProvider): reescrever sem providers — Storybook do núcleo é independente.
5. index.ts + barrel + validação padrão (check, typecheck, build:storybook nas 2 marcas).
6. NÃO alterar o repositório do Supertrans neste workflow (re-exports lá são fase de migração, sprint própria).
