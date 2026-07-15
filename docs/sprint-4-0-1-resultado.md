# Sprint 4.0.1 — Storybook Addons Audit

## Resumo

Auditoria conclu?da com **zero mudan?a estrutural**: a stack de addons está correta para uma biblioteca React no Storybook 10. Achado central: `@storybook/addon-essentials` **não existe no SB 10** — Controls, Actions, Viewport, Backgrounds, Toolbars, Measure e Outline foram absorvidos pelo core (verificado: 0 ocorr?ncias no lockfile; recursos presentes na UI). Nenhum addon novo instalado, nenhum removido; ajustes foram apenas de documentação e conven??o.

## Addons encontrados

`main.ts` (via `getAbsolutePath`, padr?o monorepo): `@storybook/addon-docs`, `@storybook/addon-a11y`, `@storybook/addon-vitest`, `@chromatic-com/storybook`. Infra de teste: `vitest ^4.1.7`, `playwright ^1.60.0`, `chromatic ^13.3.0`. Framework: `@storybook/react-vite ^10.4.1`.

## Decisóes por addon

| Addon/Recurso | Estado atual | Decisão | Justificativa |
|---|---|---|---|
| Essentials | **N/A no SB 10** (absorvido pelo core) | não instalar | pacote não existe mais; instalar quebraria o setup |
| Docs | instalado + 2 p?ginas MDX no ar | **manter** | autodocs + Comece agora + Funda??es/Tokens funcionando |
| Controls | core; `argTypes` nas stories + matchers no preview | **manter** | inspe??o de props ativa nas stories com args |
| Actions | core; aparece quando args usam `fn()` de `storybook/test` | **manter + conven??o** | SB10 não tem mais actions impl?citas por regex; conven??o `fn()` registrada em `ai/rules/components.md` para stories novas com callbacks |
| Viewport | core, disponível na toolbar | **manter default** | responsividade verific?vel; sem presets custom at? haver demanda real |
| Backgrounds | core, disponível | **manter default + regra** | fundo é governado pelo tema (decorator `bg-background`); NÃO usar backgrounds para simular marca (regra documentada) |
| Measure/Outline | core | **manter** | v?m de gra?a no SB10 |
| A11y | instalado; painel em todas as stories; `test: "todo"` | **manter** | quality gate ativo; endurecer p/ `"error"` p?s-auditoria da base |
| Vitest | instalado; `vitest.config.ts` com browser mode | **manter** | component tests via stories; requer `playwright install chromium` local |
| Chromatic | instalado; preparado sem token; `--exit-zero-on-changes` | **manter** | regressóo visual pronta; nuvem aguarda `CHROMATIC_PROJECT_TOKEN` |
| Themes (`@storybook/addon-themes`) | ausente | **descartar** | duplicaria a toolbar de marca (`data-brand`), que ? superior por testar o mecanismo real de theming do núcleo |
| MSW/mocks | ausente | **adiar** | nenhum componente do núcleo depende de API (regra de pureza pro?be); reavaliar apenas se surgirem stories de fluxo integrado |
| Interactions extra | N/A | nada a fazer | `play` functions sóo core; execu??o via addon-vitest |
| Figma/design | ausente | **adiar** | sem fluxo de design conectado definido |

## Addons mantidos / adicionados / adiados / descartados

Mantidos: docs, a11y, vitest, chromatic (+ recursos core). Adicionados: **nenhum**. Adiados: MSW, Figma. Descartados: essentials (inexistente no SB10), addon-themes (toolbar de marca cobre).

## Ajustes realizados

Somente documentação: esta auditoria; nota "essentials = core no SB10" e regra de backgrounds em `docs/architecture/storybook.md`; conven??o `fn()` para callbacks em `ai/rules/components.md`. `main.ts`, `preview.tsx`, `package.json` e scripts: **inalterados** (nenhuma lacuna real).

## Scripts e comandos

Inalterados e verificados: `pnpm storybook`, `pnpm build:storybook`, `pnpm test:storybook`, `pnpm chromatic`.

## Valida??es executadas

```
pnpm install          ? verde
pnpm check            ? verde
pnpm typecheck        ? 3/3
pnpm build            ? 3/3
pnpm build:storybook  ? success (133 stories + 2 docs MDX)
pnpm check:pureza     ? OK
pnpm storybook (dev)  ? HTTP 200
```

Checklist manual (na máquina do time): Comece agora  topo da navega??o, Funda??es/Tokens , toolbar de marca , pain?is Accessibility/Visual Tests/Vitest , Controls nas stories com args , nenhuma story sumiu (133) .

## Resultado do check de pureza

Verde, inalterado.

## Riscos pendentes

1. Ambiente local fora de sincronia com o lockfile ? a causa recorrente de quebra (3? ocorr?ncia) — sempre `pnpm install` após sync; considerar script `postinstall`/nota de bootstrap.
2. Chromatic sem baseline at? existir token/conta.
3. `a11y.test: "todo"` não bloqueia — auditoria da base ? backlog.

## Recomenda??o final para a Sprint 4.1

Stack aprovada — iniciar **Combobox + MultiSelect** sem mudan?as no Storybook. Os dois componentes devem nascer com: stories com `fn()` nos callbacks, teste de teclado via play function, painel a11y limpo e validação nas duas marcas (checklist `storybook-acceptance.md`).
