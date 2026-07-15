# Storybook

`apps/storybook` é a documentação oficial e o ambiente de validação do design system do grupo.

Princípios: independente dos produtos (sem AuthContext, QueryProvider ou mocks de app real); todo componente compartilhado tem story colocalizada (`packages/*/src/**/*.stories.tsx`); toda story deve ser validada nas duas marcas.

Mecânica de marcas: toolbar global "Marca" (Supertrans/Aurora) → decorator aplica `data-brand` no `<html>` → tokens resolvem. A story "Núcleo/Comparativo de Marcas" mostra o mesmo componente sob as duas marcas simultaneamente.

Comandos: `pnpm storybook` (dev, porta 6006) e `pnpm build:storybook` (estático).

Nota SB10: `addon-essentials` não existe mais — Controls, Actions, Viewport, Backgrounds, Measure e Outline são core. Backgrounds NÃO deve ser usado para simular marca: o fundo é governado pelo tema via decorator (`bg-background`).

Addons ativos: `addon-docs`, `addon-a11y` (painel Accessibility; `parameters.a11y.test = "todo"` — mude para `"error"` para falhar testes com violação) e `addon-vitest` (roda as stories como testes em Chromium headless via `vitest.config.ts`).

Comandos de teste: `pnpm --filter @nucleo/storybook test-storybook`. Pré-requisito único por máquina: `pnpm --filter @nucleo/storybook exec playwright install chromium`.

Evolução prevista: visual regression na matriz componente × marca; deploy estático como doc oficial do grupo.
