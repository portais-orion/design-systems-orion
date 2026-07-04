# Prompt: extrair primitive do Supertrans

> Extraia o componente `<NOME>` do portal-supertrans (`apps/web/src/components/ui/<nome>.tsx` + story) para `packages/ui/src/<nome>/` deste repositório, seguindo `ai/workflows/extract-from-supertrans.md`. Ajuste imports para `../utils/cn`, remova qualquer dependência de app, garanta pureza de tokens (sem hex) e valide nas duas marcas com `pnpm check && pnpm typecheck && pnpm build:storybook`. Preencha `ai/checklists/component-acceptance.md` no PR e crie changeset minor.
