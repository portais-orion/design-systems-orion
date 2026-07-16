# O que

<!-- Componente/block/mudança em 1–3 frases. Um componente ou uma decisão por PR. -->

# Por que pertence ao Núcleo

<!-- Por que é genérico (teste do "terceiro portal de outra empresa"). -->
<!-- Blocks: nomear os 2+ consumidores reais previstos (regra dos dois usos). -->

# Validações executadas

<!-- Colar evidência (saída resumida), não só marcar. -->

- [ ] `pnpm check` verde
- [ ] `pnpm typecheck` verde
- [ ] `pnpm build` verde
- [ ] Story validada nas 2 marcas (Supertrans e Aurora) na toolbar do Storybook
- [ ] Checklist `ai/checklists/component-acceptance.md` preenchido item a item
- [ ] Changeset criado (mudança em package consumível)

# Docs

- [ ] JSDoc no componente e props
- [ ] Mapa de `scripts/generate-docs.mjs` atualizado + docs regeneradas (componente novo)
- [ ] Rule em `ai/` atualizada no mesmo PR (se a mudança altera um padrão — ADR 0008)

# Notas para o revisor

<!-- Decisões de API, trade-offs, o que NÃO foi feito de propósito. -->
<!-- Roteiro de revisão: ai/workflows/review-pr.md -->
