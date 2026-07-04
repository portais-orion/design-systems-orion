# Regras gerais

- Trabalhe em português (código em inglês; nomes de domínio, textos e docs em pt-BR).
- Nunca contornar uma ADR; conflito → parar e reportar.
- Toda mudança de padrão exige atualizar a rule correspondente em `ai/` no mesmo PR.
- Commits/PRs pequenos; um componente ou uma decisão por PR.
- Rodar antes de entregar: `pnpm check`, `pnpm typecheck`, `pnpm build`. Não declarar sucesso sem executar.
- Mudança em `packages/*` que afeta consumidor → criar changeset (`pnpm changeset`).
- Em dúvida entre generalizar ou manter simples: manter simples (regra dos dois usos).

## Storybook em monorepo

- `npx storybook add <addon>` deve rodar DENTRO de `apps/storybook` (o CLI procura `.storybook/` no cwd). Preferível: adicionar a devDependency + entrada em `main.ts` manualmente (padrão `getAbsolutePath`).
- Testes de stories: `pnpm --filter @nucleo/storybook test-storybook` (requer uma vez: `pnpm --filter @nucleo/storybook exec playwright install chromium`).
