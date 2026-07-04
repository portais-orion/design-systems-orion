# Sprint 4.0 — Resultado

## Resumo

Storybook promovido a quality gate oficial do núcleo: a11y + Vitest (já configurados no hotfix pós-Sprint 4, agora documentados e integrados), Chromatic preparado (sem token), duas páginas MDX ("Comece agora" e "Fundações/Tokens"), navegação ordenada, scripts de qualidade na raiz e `docs/architecture/quality-gates.md`. 133 stories preservadas; todas as validações verdes; nenhum portal alterado; nenhum secret commitado.

## Addons instalados/configurados

| Addon | Estado | Origem |
|---|---|---|
| `@storybook/addon-docs` | já estava (hotfix pós-Sprint 4) | validado |
| `@storybook/addon-a11y` | já estava (hotfix pós-Sprint 4) | validado + documentado |
| `@storybook/addon-vitest` | já estava (hotfix pós-Sprint 4) | validado + documentado |
| `@chromatic-com/storybook` | **novo** nesta sprint | + CLI `chromatic` |

Todos registrados em `main.ts` via `getAbsolutePath` (padrão monorepo pnpm). Nada foi reinstalado sem necessidade (regra 10 do plano).

## Acessibilidade

Painel Accessibility em toda story; `parameters.a11y.test: "todo"` no preview — violações aparecem no painel e nos testes sem bloquear (decisão: mudar para `"error"` quando a base estiver auditada, registrado em quality-gates.md). Regra agent-first: não mascarar violação sem justificativa documentada.

## Visual tests / Chromatic

**Preparado, não conectado** (sem token disponível — conforme regra da sprint). Addon no painel "Visual Tests"; CLI `chromatic --exit-zero-on-changes` (script cross-platform: o CLI lê `CHROMATIC_PROJECT_TOKEN` do ambiente, sem interpolação de shell); `.env.example` criado com a variável vazia; `.env`/`.env.local` adicionados ao `.gitignore`. Para conectar: conta no chromatic.com → token do projeto → `.env` local ou secret de CI.

## Vitest addon

Stories rodam como component tests em Chromium headless (`vitest.config.ts` com `storybookTest`). Comandos: `pnpm test:storybook` (novo alias raiz); pré-requisito único por máquina: `pnpm --filter @nucleo/storybook exec playwright install chromium`. Execução no sandbox Linux não baixa browsers do Playwright — o comando foi validado como configuração (typecheck/build), a execução dos testes é local/CI (documentado).

## MDX criado

- `apps/storybook/src/introduction.mdx` → **"Comece agora"**: o que é o núcleo, pacotes, instalação com CSS de entrada, temas, regras principais, qualidade, ponte para agentes.
- `apps/storybook/src/tokens.mdx` → **"Fundações/Tokens"**: modelo de 2 camadas, seletor triplo de tema (incl. o porquê, pós-bug da troca de marca), tabela de marcas, uso nos produtos, regras.
- Glob `../src/**/*.mdx` adicionado ao `main.ts`. Ambas confirmadas no index do build (`get-started--docs`, `fundações-tokens--docs`).

## Navegação do Storybook

`storySort` no preview: **Comece agora → Fundações → UI → Blocks → Núcleo**. Nenhuma story renomeada (os titles existentes já seguiam UI/* e Blocks/*).

## Scripts adicionados ou alterados

Raiz: `test:storybook`, `chromatic` (delegam ao app). App: `chromatic`. Mantidos e verificados: `pnpm storybook`, `pnpm build:storybook`.

## Documentação criada/atualizada

`docs/architecture/quality-gates.md` (novo — gates locais, Storybook e plano de CI futuro sem secrets em forks); `storybook.md` (já atualizado no hotfix); `AGENTS.md` (comandos novos); `ai/context/02-current-decisions.md`; `ai/rules/components.md` (regras de a11y/marca); `ai/checklists/storybook-acceptance.md` (+5 itens: a11y, duas marcas, teclado, test:storybook, validação visual pré-merge).

## Validações executadas

```
pnpm install          → Done in 5.6s (+@chromatic-com/storybook, chromatic)
pnpm check            → Checked 150 files. No fixes applied (verde)
pnpm typecheck        → 3 successful, 3 total
pnpm build            → 3 successful, 3 total
pnpm build:storybook  → completed successfully (133 stories + 2 docs MDX)
pnpm check:pureza     → OK — nenhum vazamento encontrado
pnpm storybook (dev)  → HTTP 200; "Comece agora" presente no index
```

Validação manual pendente na sua máquina (checklist da seção 16): painéis Accessibility/Visual Tests/Vitest visíveis, toolbar de marca ok.

## Resultado do check de pureza

Verde, sem ajustes no script.

## Problemas encontrados

Nenhum novo. Contexto herdado: o `.git` local do usuário havia sido corrompido por sync anterior e removido — o histórico completo foi restaurado nesta sincronização.

## Decisões tomadas

1. Chromatic com `--exit-zero-on-changes` até existir baseline aprovado (evita bloquear fluxo no início).
2. `a11y.test = "todo"` (não "error") até auditoria da base — endurecer é um passo consciente futuro.
3. Script chromatic sem interpolação de token no shell (cross-platform Windows/Linux).
4. Addons via edição manual de `main.ts` + devDependencies, não via `storybook add` (CLI falha na raiz de monorepo — regra registrada na sprint anterior).

## O que ficou fora

GitHub Actions (documentado como plano em quality-gates.md — criar quando houver remoto/CI definido); conexão real do Chromatic (depende de conta/token); auditoria a11y da base atual (as violações agora são visíveis; corrigi-las é backlog contínuo).

## Pendências

- Rodar na sua máquina: `pnpm install`, depois `pnpm --filter @nucleo/storybook exec playwright install chromium` (1x) e `pnpm test:storybook`.
- Criar conta/projeto no Chromatic quando decidido, preencher `.env` local e secret de CI.

## Próxima sprint recomendada

**Sprint 4.1 — Advanced Inputs: Combobox + MultiSelect**, conforme `docs/architecture/advanced-inputs.md`, agora com o quality gate ativo para nascerem já auditados.
