# 0003 — Tailwind v4 CSS-first como padrão de estilo

## Contexto
Supertrans usa Tailwind v4 (`@theme` em CSS, sem config JS); Aurora usa v3 com `tailwind.config.ts` contendo escala de cores de marca hardcoded (`primary-50..900`).

## Decisão
Tailwind v4 CSS-first em todos os packages e produtos. Configuração de tema vive em CSS (`@supertrans-transportes/tokens`), nunca em `tailwind.config.ts`. Consumidores usam `@source` para escanear classes dos packages.

## Alternativas consideradas
Manter v3 (bloquearia o modelo de theming por CSS vars da ADR 0005); CSS-in-JS (fora do padrão dos portais e pior para agentes/SSR).

## Consequências
Theming por CSS variables nativo; Aurora precisa do upgrade v3→v4 antes de consumir os packages.

## Riscos
Upgrade do Aurora tem ~130 arquivos com classes de cor hardcoded. Mitigação: codemod oficial + migração por módulo (fora do escopo desta sprint).

## Critérios de aceite
Storybook renderiza componentes com classes v4 resolvendo tokens de `@supertrans-transportes/tokens`.
