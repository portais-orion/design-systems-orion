# Movimento — entrega 2026-10-05

- [x] ADR 0015 registrada; suporte sem domínio, Next ou data fetching.
- [x] Tokens neutros e valores nas três marcas; nenhuma cor de marca em componentes.
- [x] Anime instalado e ausente dos imports/bundles dos componentes atuais.
- [x] Root puro, provider sem wrapper e entrada de engine separada.
- [x] Enabled, reduced, off e preferência desconhecida testados.
- [x] Accordion, Dialog, Popover e Sheet: foco/Escape e transições nas três marcas.
- [x] FiltersCard: provider preserva input, fechamento devolve foco, fieldset de saída
  desabilitado não participa de FormData, reabertura tem duração dos tokens.
- [x] LauncherCard: teclado e callback únicos; Off sem transição CSS residual.
- [x] Troca de preferência durante saída validada no consumidor Vite empacotado.
- [x] Cliente/servidor distribuídos por fonte; helper puro `cn` não marcado cliente.
- [x] Changeset dos quatro packages consumíveis, sem publicação.
- [x] `pnpm check`, `pnpm typecheck`, `pnpm build` e `pnpm pack:all` passaram.
- [x] Suíte completa: 312 stories em Chromium, incluindo a11y dos novos cenários.
- [x] Vite/tarballs: build, interação, marca, viewport mobile e CSS de dist.
- [x] SSR Node: resolver sem DOM e conteúdo visível no primeiro render.
- [x] Next/tarballs: Webpack, SSR/hidratação, helpers puros no servidor, foco e marcas.
  CSS pré-compilado pelo Vite. Turbopack/Windows com `@source` em symlinks pnpm
  falhou por normalização de caminho; esse pipeline não está validado.

Limites: tema scoped fora de container de portal mantém contrato anterior;
slots em Shadow DOM/portais próprios não recebem garantia adicional. Benchmark
de FPS em produto real e release/canário permanecem fora desta entrega.
