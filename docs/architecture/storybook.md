# Storybook

`apps/storybook` � a documenta��o oficial e o ambiente de valida��o do design system do grupo.

Princ�pios: independente dos produtos (sem AuthContext, QueryProvider ou mocks de app real); todo componente compartilhado tem story colocalizada (`packages/*/src/**/*.stories.tsx`); toda story deve ser validada nas duas marcas.

Mec�nica de marcas: toolbar global "Marca" (Supertrans/Aurora) � decorator aplica `data-brand` no `<html>` � tokens resolvem. A story "N�cleo/Comparativo de Marcas" mostra o mesmo componente sob as duas marcas simultaneamente.

Comandos: `pnpm storybook` (dev, porta 6006) e `pnpm build:storybook` (est�tico).

Nota SB10: `addon-essentials` n�o existe mais  Controls, Actions, Viewport, Backgrounds, Measure e Outline s�o core. Backgrounds N�O deve ser usado para simular marca: o fundo � governado pelo tema via decorator (`bg-background`).

Addons ativos: `addon-docs`, `addon-a11y` (painel Accessibility; `parameters.a11y.test = "todo"`  mude para "error" para falhar testes com viola��o) e `addon-vitest` (roda as stories como testes em Chromium headless via `vitest.config.ts`).

Comandos de teste: `pnpm --filter @nucleo/storybook test-storybook`. Pr�-requisito �nico por m�quina: `pnpm --filter @nucleo/storybook exec playwright install chromium`.

Evolu��o prevista: visual regression na matriz componente � marca; deploy est�tico como doc oficial do grupo.
