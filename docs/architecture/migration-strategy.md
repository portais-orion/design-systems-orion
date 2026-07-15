# Migration Strategy

1. Núcleo primeiro: tokens, primitives, blocks, Storybook e regras de adoção.
2. Supertrans como primeiro consumidor: menor atrito técnico, já usa Base UI e Tailwind v4.
3. Aurora converge depois: pré-requisitos antes da adoção (`npm → pnpm`, `ESLint → Biome`, `Tailwind v3 → v4`, remoção da escala `primary-50..900`).
4. Sem big-bang: telas antigas migram quando tocadas.
5. CLI só depois de template validado em consumidor real.

Detalhes e riscos: diagnósticos em `Portal-Aurora/doc/` e ADRs `0001–0008`.
