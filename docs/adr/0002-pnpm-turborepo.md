# 0002 — pnpm + Turborepo como padrão de monorepo

## Contexto
O portal-supertrans já opera com Turborepo + pnpm workspaces com bons resultados; o Portal-Aurora usa npm em repo plano, sem cache de tasks nem workspaces.

## Decisão
pnpm (>=9) + Turborepo em todos os repositórios do grupo, começando pelo nucleo-portais. Changesets para versionamento dos packages.

## Alternativas consideradas
npm workspaces (sem cache de pipeline); Nx (mais recursos, mais complexidade e convenções próprias — pior para agentes); yarn (sem vantagem sobre pnpm aqui).

## Consequências
Instalação e CI mais rápidos; `workspace:*` entre packages; o Aurora precisará migrar npm→pnpm na fase de convergência.

## Riscos
Curva para o time acostumado a npm. Mitigação: comandos documentados no AGENTS.md e README.

## Critérios de aceite
`pnpm install`, `pnpm build`, `pnpm check` funcionando na raiz.
