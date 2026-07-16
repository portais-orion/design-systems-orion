---
name: create-component
description: Use quando precisar criar um primitive novo em @portais-orion/ui (Camada 1) neste repo — componente genérico sem domínio, com story, tokens semânticos e Base UI. Não use para composições (é block) nem para código de produto.
---

# Criar componente (primitive) em @portais-orion/ui

Orquestra os artefatos existentes do repo — não os substitui. Fonte de verdade dos padrões:
`ai/rules/components.md`.

## Passos

1. **Anti-duplicidade**: rodar `ai/workflows/find-component.md`. Existente/parcial → estender,
   não criar.
2. **Camada**: composição de vários primitives ou padrão de página → é block; trocar para a
   skill `create-block`.
3. **Implementar**: seguir `ai/workflows/create-component.md` passo a passo. Referência canônica
   de código: `packages/ui/src/button/`. Estrutura obrigatória
   `src/<nome>/{<nome>.tsx, <nome>.stories.tsx, index.ts}` + barrel + subpath export no
   `package.json`.
4. **JSDoc** no componente e props — vira a página em `apps/docs`; sem JSDoc a doc sai genérica.
5. **Docs geradas**: adicionar o componente ao mapa de `scripts/generate-docs.mjs` e rodar
   `node scripts/generate-docs.mjs`.
6. **Gates**: `pnpm check && pnpm typecheck && pnpm build`; abrir story e alternar marca
   (Supertrans e Aurora); checklist `ai/checklists/component-acceptance.md` item a item.
7. **Changeset**: `pnpm changeset` (minor).

## Limites

- Nunca `@radix-ui/*` (ADR 0004), nunca hex fora de `packages/tokens/src/themes/*`, nunca
  `tailwind.config.ts` (ADR 0003), nunca domínio de negócio (`ai/rules/no-domain-in-shared-packages.md`).
- Não declarar sucesso sem executar os gates.
- Para contribuir o resultado via PR: skill `contribute-to-nucleo`.
