# Decisões vigentes (resumo — fonte: docs/adr/)

- 0001: plataforma interna de portais, não UI lib.
- 0002: pnpm + Turborepo + Changesets.
- 0003: Tailwind v4 CSS-first; sem tailwind.config.ts.
- 0004: Base UI (`@base-ui/react`) único headless; Radix proibido.
- 0005: temas por CSS variables + `[data-brand]`; nunca prop de marca; nunca hex em componente.
- 0006: camadas tokens→ui→blocks→apps; domínio só na Camada 3 (produtos); convenção sobre framework.
- 0007: produtos em repos separados; consomem packages por versão.
- 0008: repositório agent-first; rules curtas por assunto; exemplos certo/errado.

- Sprint 4.0: Storybook é o quality gate oficial (a11y + vitest + chromatic + MDX); páginas "Comece agora" e "Fundações/Tokens" são a doc de entrada.

- Sprint 6: chrome oficial = AppShell (sidebar + breadcrumbs + miolo, SEM topbar); navegação por dados; renderLink/canAccessItem injetados; subcomponentes da Sidebar são internos; mobile via Sheet.

- Sprint 7–10: **scope oficial `@portais-orion`** (org `portais-orion`, npm público — sem token pra instalar). `@grupo`, `@mateusarcestr`, `@supertrans-transportes` = **legado** (não usar em novos projetos; não apagar sem autorização). **Supertrans é o 1º consumidor oficial** (`/configurador/permissions`, `/configurador/app-shell-canary`). Packages 0.1.0 source-based; **dist/tsup + Changesets** preparado p/ 0.1.1 (dev usa `exports`→src; publish usa `dist` via `publishConfig`). Novos consumidores: `docs/adoption/consumer-setup.md`. Migração de telas: skill `ai/skills/portais-orion-adoption`. **Aurora não é alvo imediato** (depende de preparo próprio + Turborepo, outro dev).

Se sua tarefa conflita com uma ADR, pare e reporte — não contorne.
