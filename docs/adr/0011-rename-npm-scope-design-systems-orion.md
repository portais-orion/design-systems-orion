# 0011 — Rename do scope npm para `@design-systems-orion`

## Contexto
A ADR 0009 tratou apenas do nome de marca/produto ("Design System Orion") e deixou
explicitamente **fora de escopo** trocar o scope npm `@portais-orion`, citando o custo de já ter
migrado 3 vezes antes (`@grupo` → `@mateusarcestr` → `@supertrans-transportes` →
`@portais-orion`) e a ausência de motivo técnico para uma 4ª migração.

O motivo técnico surgiu: ao mover a publicação de GitHub Packages (privado, exige token) para o
registry público do npm (`registry.npmjs.org`, decisão registrada em
`docs/architecture/package-distribution.md`), o dono do produto optou por também alinhar o nome
da conta/organização no npmjs.com ao nome de marca já adotado ("Design System Orion"), escolhendo
o login `design-systems-orion`.

## Decisão
Renomear o **scope npm** de `@portais-orion` para `@design-systems-orion` em todos os packages
publicáveis (`tokens`, `ui`, `blocks`) e em toda referência viva no repositório: `package.json`
(`name`, `dependencies`, `devDependencies`, `publishConfig`), CI (`release-packages.yml`),
`.npmrc.example`, imports de exemplo em `.mdx`/`.tsx`/`.stories.tsx`, `README.md`, `AGENTS.md`,
skills (`ai/skills/*`), regras/contexto/checklists de agente (`ai/rules`, `ai/context`,
`ai/checklists`, `ai/workflows`), e docs de arquitetura/adoção.

`@portais-orion` passa a ser **scope legado** (mesmo tratamento dado a `@grupo`,
`@mateusarcestr`, `@supertrans-transportes`): não usar em novos consumidores; pacotes já
publicados sob ele não são apagados sem autorização.

## Fora de escopo desta ADR (mantido como estava)
- Nome da pasta/repositório: `nucleo-portais`.
- Org GitHub `portais-orion` (repositório continua em `portais-orion/nucleo-portais`) — o rename
  aqui é só do scope/conta **npm**, não do GitHub.
- Nome da skill `portais-orion-adoption` e seu path — nome de skill não é scope npm; renomear
  quebraria referências cruzadas por um ganho cosmético.
- Documentos históricos: ADRs já aceitas (0001–0010), `CHANGELOG.md` de cada package,
  `docs/sprint-*-resultado.md` e `docs/superpowers/{plans,specs}/*` datados — preservados como
  registro do que era verdade no momento em que foram escritos.

## Consequências
- Qualquer consumidor externo que já instalou `@portais-orion/*` precisa migrar para
  `@design-systems-orion/*` numa próxima atualização; não há redirect automático no npm.
- `pnpm-lock.yaml` precisa ser regenerado (`pnpm install`) após o rename dos `package.json`.
- É a 4ª migração de scope da história do produto. Tratar como estável a partir daqui; nova
  migração exige motivo técnico equivalente (registrado como ADR), não preferência de nome.

## Riscos
Quebra de instalação para consumidores que ainda apontam para `@portais-orion/*` até migrarem.
Mitigação: pacotes legados permanecem publicados (não removidos) até confirmação de que nenhum
consumidor ativo depende deles.

## Critérios de aceite
`package.json` dos 3 packages publicáveis com `name`/`publishConfig` sob `@design-systems-orion`;
CI publicando sob o novo scope; docs de consumo, README, AGENTS.md e skills referenciando
`@design-systems-orion`; `@portais-orion` listado como legado em
`docs/adoption/consumer-setup.md`; `pnpm-lock.yaml` regenerado; gates (`pnpm check`,
`pnpm typecheck`, `pnpm build`, `pnpm test:scripts`) verdes.
