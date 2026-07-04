# Quality Gates

## Local (obrigatório antes de todo commit)

```bash
pnpm check            # Biome lint + format
pnpm typecheck        # TS em todos os packages
pnpm build            # turbo build
pnpm build:storybook  # build estático das stories
pnpm check:pureza     # vazamentos: hex, radix, marca, portais, next, data-fetching
```

## Storybook (camada de qualidade de componentes)

| Gate | Como | Estado |
|---|---|---|
| Acessibilidade | `@storybook/addon-a11y` — painel Accessibility em toda story; `parameters.a11y.test: "todo"` (violações visíveis, não bloqueiam). Mudar para `"error"` quando a base estiver limpa | ativo |
| Component tests | `@storybook/addon-vitest` — stories rodam como testes em Chromium headless. `pnpm test:storybook`. Pré-requisito por máquina: `pnpm --filter @nucleo/storybook exec playwright install chromium` | ativo |
| Visual tests | `@chromatic-com/storybook` (painel Visual Tests) + CLI `chromatic`. Local: preparado. Nuvem: requer conta + `CHROMATIC_PROJECT_TOKEN` (ver `.env.example`; `pnpm chromatic`) | preparado, sem token |
| Multi-marca | toolbar Marca + story "Comparativo de Marcas" — toda story deve passar nas duas | ativo |

## Futuro CI (quando houver pipeline)

1. `pnpm install --frozen-lockfile`
2. `pnpm check && pnpm typecheck && pnpm check:pureza`
3. `pnpm build && pnpm build:storybook`
4. `pnpm test:storybook` (com `playwright install chromium` no runner)
5. `pnpm chromatic` (secret `CHROMATIC_PROJECT_TOKEN`; `--exit-zero-on-changes` até o baseline estabilizar)

Regras: nenhum gate depende de secret para PRs de forks (Chromatic roda apenas em branches internas); nenhum secret no repositório.
