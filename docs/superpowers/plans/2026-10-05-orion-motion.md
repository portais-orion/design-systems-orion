# Plano de implementação — movimento compartilhado no Orion

> **Para execução por agentes:** usar `superpowers:executing-plans` para implementar tarefa por tarefa após revisão. Delegação somente quando autorizada pelo usuário ou por instruções aplicáveis. Checkboxes registram trabalho futuro, não concluído nesta etapa.

**Objetivo:** aplicar movimento aos componentes existentes do Orion e instalar Anime.js como dependência disponível para uso futuro.

**Arquitetura:** tokens CSS como fonte de valores; novo pacote de suporte com política independente de engines e adapter Motion. Motion e Anime.js ficam instalados; apenas Motion será integrado agora. Primitives e blocks existentes recebem comportamento sem duplicação; portais ativam provider central e controlam fluxos.

**Stack:** pnpm 9, Turbo, React 19, Base UI, Tailwind v4, tsup, Storybook/Vitest/Playwright, Changesets, Motion e Anime.js.

**Especificação:** [Proposta de arquitetura](../specs/2026-10-05-orion-motion-design.md).

**Status:** planejamento entregue; tarefas abaixo não executadas. Escrever plano não aprova ADR, instalação, publicação ou mudança nos portais.

## Restrições globais

- Scope `@design-systems-orion`; React/React DOM `^19.0.0`; Base UI existente, sem Radix.
- Tailwind v4 CSS-first; nenhum `tailwind.config.ts`, hex em componente ou prop de marca.
- Marcas atuais: Supertrans, Aurora e Orion; derivar futuras marcas do catálogo.
- Shared packages sem rotas, endpoints, permissões reais ou hooks de API de produto.
- Sem novos componentes de apresentação; melhorar FiltersCard, LauncherCard, Accordion, Dialog, Popover e Sheet existentes. Não editar repositórios de produtos nesta tarefa.
- Preservar alterações pré-existentes no worktree. Commits, push, PR e publicação exigem escopo autorizado; plano não agenda merge automático.
- Novo grafo de dependências só pode ser implementado após decidir extensão da ADR 0006.
- Movimento novo desativado sem provider ativo; reduced motion do sistema respeitado por Motion e CSS e obrigatório em qualquer uso Anime futuro.

## Foco de revisão

Execução em 2026-10-05: tarefas 2–4 implementadas nos componentes existentes;
tarefa 5 com docs, changeset e quatro tarballs. Gates `check`, `typecheck`,
`build` e `pack:all` passaram; 312 stories passaram após correções da revisão.
Vite/tarballs e SSR Node passaram. Next/tarballs passou com Webpack e CSS
pré-compilado no Vite: SSR, hidratação, helpers puros e interações. Pipeline CSS
Turbopack/Windows falhou ao normalizar caminhos pnpm e permanece não validado.
Tarefa 1 mediu o proxy de bundle; não houve benchmark de FPS ou canário real,
e orçamento de 40 KiB foi adotado após a medição. Os checkboxes abaixo preservam
o plano original; evidência final vive em `ai/checklists/motion.md` e
`docs/architecture/motion-baseline.md`. Tarefa 6 segue em escopo separado.

| Condição | Comportamento esperado | Tarefa responsável |
| --- | --- | --- |
| Preferência de movimento muda no meio da saída | Cancelar movimento e resolver estado final, sem foco perdido | 2, 3 e 4 |
| Filtro fecha com input focado ou formulário preenchido | Foco retorna ao toggle; callbacks e contrato de estado preservados | 3 |
| Anime.js está instalado, mas nenhum componente o usa | Nenhum código Anime carregado nos bundles dos componentes | 2, 3 e 5 |
| Provider é ativado/desativado durante uso | Estado de formulário e identidade DOM preservados | 2 e 3 |
| Conteúdo está em portal Base UI fora do ancestral CSS | Política e tema corretos, sem transform de posicionamento sobrescrito | 4 |

## Tarefa 1 — baseline, decisão e compatibilidade

**Arquivos existentes:** `docs/adr/0006-camadas-ui-blocks-apps.md`, `docs/architecture/package-distribution.md`, `packages/{tokens,ui,blocks}/package.json`, `packages/tokens/brands.json`.

**Criar:** `docs/adr/0015-motion-compartilhado.md` com status proposto e `docs/architecture/motion-baseline.md` para evidência de medições.

**Produz:** decisão sobre grafo, matriz de versões, métricas e orçamentos reproduzíveis usados nas tarefas seguintes.

- [ ] Registrar baseline dos gates e dos pilotos atuais; isolar falhas pré-existentes sem corrigir adjacências.
- [ ] Verificar manifests das versões candidatas de `motion` e `animejs`, licenses, React 19, SSR e APIs usadas. Registrar versões exatas e ranges; nenhum comando de instalação nesta etapa de planejamento.
- [ ] Propor ADR 0015: suporte motion → tokens; ui/blocks podem consumir motion; nenhuma dependência invertida ou engine dentro de tokens. Levar decisão para revisão antes de implementar esse grafo.
- [ ] Medir consumidor mínimo com somente Button e consumidor com FiltersCard/LauncherCard. Registrar toolchain, gzip por chunk, imports efetivamente carregados e perfil de interação em desktop/mobile.
- [ ] Fixar orçamento máximo de bytes iniciais/adicionais e tolerância de tempo de interação a partir desse baseline. Critérios de a11y/SSR têm tolerância zero para regressão funcional.

**Aceite:** versões e método de comparação registrados; decisão arquitetural resolvida antes da tarefa 2. Simples capacidade de Motion também fazer sequências não constitui motivo para usar Anime em componentes comuns.

## Tarefa 2 — tokens, política e pacote distribuível

**Criar:** `packages/motion/{package.json,tsconfig.json,tsup.config.ts,README.md}`, `packages/motion/src/{index.ts,policy.ts}`, `packages/motion/src/react/{index.ts,motion-provider.tsx,use-motion-policy.ts}`, `packages/motion/tests/policy.test.ts`, `packages/motion/src/react/motion-provider.stories.tsx`.

**Modificar:** `packages/tokens/src/base.css`, todos os `packages/tokens/src/themes/*.css` do catálogo, `scripts/check-purity.mjs`, `scripts/package-distribution.test.mjs`, scripts de distribuição somente onde necessário, `package.json`, `.github/workflows/release-packages.yml`, `apps/storybook/{package.json,.storybook/main.ts,.storybook/preview.tsx}`, `pnpm-lock.yaml`.

**Interfaces produzidas:** `MotionProvider`, `useMotionPolicy()` e `resolveMotionPolicy(input)` conforme especificação. Root export só possui tipos/resolução pura; `/react` não importa engines.

- [ ] Escrever testes da matriz enabled × preferência: disabled sempre resolve off; `always` sempre reduz; `user` acompanha preferência; preferência desconhecida não anima entrada na hidratação.
- [ ] Executar `pnpm test:packages`; confirmar falha por contrato ausente. Implementar resolução pura e provider mínimo; executar novamente até passar.
- [ ] Criar tokens com defaults da especificação e valores em todos os temas; validar namespaces Tailwind, leitura de CSS variables no root efetivo e conversão de unidade. Não criar cópia fixa de valores no adapter.
- [ ] Adicionar stories de provider cobrindo hidratação, troca de preferência e ausência de wrapper DOM. Verificar que toggle do provider mantém estado de formulário e nó focado.
- [ ] Confirmar descoberta automática do manifest pelo inventário existente em `scripts/lib/workspace.mjs`, sem criar lista paralela. Adicionar teste dessa descoberta para motion. Derivar exports com módulo existente; preservar `.mjs`, `.d.mts`, `use client`, externals e entrypoints independentes no tsup.
- [ ] Adicionar `motion` e `animejs` como dependencies normais do novo pacote, com versões validadas na tarefa 1 e externals no build. Não importar Anime nos componentes, criar adapter Anime ou declarar export sem implementação. Confirmar resolução da dependência instalada sem iniciar engine ou acessar DOM.
- [ ] Estender regras de pureza ao pacote; adicionar teste que rejeita import de Next/data-fetching em motion. Incluir pacote nos filtros de build/publicação, sem acionar publicação.
- [ ] Incluir stories de motion no Storybook e adicionar controle de política separado do controle de marca. Novas stories usam a11y `error`; manter decisão global fora desta alteração.
- [ ] Executar `pnpm check`, `pnpm typecheck`, `pnpm build`, `pnpm test:storybook` e `pnpm pack:all`; testar import root sem React/DOM/Anime necessário ao resolver puro.

**Aceite:** tokens completos e política utilizável sem engine; tarball contém todos os exports declarados, sem source nem `workspace:*` não resolvido.

## Tarefa 3 — adapter Motion e dois pilotos

**Criar:** `packages/motion/src/motion/{index.ts,orion-motion-boundary.tsx,features.ts,presets.ts}` e stories/testes dos contratos do adapter.

**Modificar:** `packages/motion/package.json`, `packages/blocks/{package.json,tsup.config.ts}`, `packages/blocks/src/filters-card/{filters-card.tsx,filters-card.stories.tsx}`, `packages/blocks/src/launcher-card/{launcher-card.tsx,launcher-card.stories.tsx}` e manifests/lockfile necessários.

**Consome:** política da tarefa 2 e tokens resolvidos no elemento. **Produz:** `OrionMotionBoundary({ children })`, presets internos e comportamento dos dois blocks sem props de engine.

- [ ] Escrever assertions de estado controlado/não controlado, toggle rápido, conteúdo dinâmico, footer, fechamento com input focado e navegação do LauncherCard. Confirmar falhas dos comportamentos novos antes de implementar.
- [ ] Implementar boundary com `m`/LazyMotion e features `domAnimation` assíncronas. Não importar componente `motion` completo nem `domMax`; engine não deve tocar o DOM no import server-side.
- [ ] Substituir montagem instantânea de FiltersCard somente quando política nova estiver ativa; preservar caminho legado sem provider. Coordenar foco, indisponibilidade de controles na saída e desmontagem sem callback duplicado.
- [ ] Aplicar entrada curta/feedback no LauncherCard. Preservar elemento botão/card, onClick, ref quando aplicável e classes do consumidor. Remover conflito de propriedade com CSS somente nos trechos migrados.
- [ ] Testar disabled, reduced motion, mudança de preferência em runtime e desativação no meio da animação. Não remountar formulários ao trocar política ou ao concluir carregamento de features.
- [ ] Rodar stories nas três marcas e nos três modos. Snapshots capturam estados estáveis; teste funcional verifica início/fim/cancelamento por sinais concretos, sem timeout arbitrário.
- [ ] Executar gates completos e medir bundle/rede: consumidor somente Button não carrega engine; piloto Motion não inclui Anime; imports internos por subpath evitam puxar adapters pelo barrel.

**Aceite:** pilotos suaves e funcionais, budgets da tarefa 1 cumpridos, reduced motion sem escala/deslocamento/altura animada. Preservar comportamento existente de estado dos filtros; não introduzir persistência de formulário diferente silenciosamente.

## Tarefa 4 — animar primitives existentes

**Modificar gradualmente:** `packages/ui/src/{accordion,dialog,popover,sheet}/*`, `packages/ui/{package.json,tsup.config.ts}`.

**Consome:** política e tokens da tarefa 2, boundary da tarefa 3 quando Motion for necessário. **Produz:** mesmos componentes e exports públicos, com transições consistentes.

- [ ] Priorizar CSS com tokens para transições simples. Onde necessário usar Motion, compor por `render` e respeitar lifecycle Base UI; não criar versão paralela de componente.
- [ ] Testar Dialog/Popover/Sheet portaled com foco, Escape, scroll lock, reabertura rápida e modos normal/reduzido/off. Aplicar política no popup efetivo e não sobrescrever transform do Positioner/centralização.
- [ ] Verificar scoped brand em popup e mudança de tema; cobrir as três marcas. Não ampliar portais de DOM nem mudar o contrato de containers nesta iniciativa.
- [ ] Rodar gates completos e validar stories normais, reduzidas e desativadas. Preservar APIs existentes e dependências de `tw-animate-css` nos componentes ainda não migrados.

**Aceite:** Accordion, Dialog, Popover e Sheet existentes recebem movimento consistente sem componentes paralelos, regressão de foco ou conflito de posição.

## Tarefa 5 — documentação e distribuição

**Modificar:** `docs/architecture/motion.md`, `docs/adoption/consumer-setup.md`, `apps/storybook/src/motion.mdx`, `ai/checklists/motion.md`, `.changeset/<nome>.md`.

- [ ] Documentar imports, provider em client boundary Next.js, fallback, reduced motion e exemplo de desativação. Explicar que Anime está instalado para uso futuro, sem adapter ou demonstração nesta entrega. Atualizar docs geradas somente pelo gerador quando necessário.
- [ ] Documentar adoção: atualizar versão e ativar provider central; telas que já usam componentes migrados recebem comportamento sem substituição de componentes. Imports diretos de Anime por produto exigem dependency própria; a dependência transitiva do Orion não é API pública.
- [ ] Registrar changesets dos packages consumíveis afetados; escolher versão compatível segundo política atual do projeto, sem prometer que mudança de dependência/comportamento é sempre patch.
- [ ] Executar checklist, gates completos, pack e smokes Vite/Next.js com tarballs. Validar SSR/hidratação, classes Tailwind provenientes de `dist`, diretivas client e ausência de peers duplicados.
- [ ] Verificar dependências nos tarballs e rede dos consumidores: Anime instalado transitivamente, mas ausente dos bundles emitidos/carregados para todos os componentes desta entrega.

**Aceite:** documentação reproduzível, exports íntegros e componentes mantêm contratos públicos. Não remover `tw-animate-css` globalmente enquanto houver componentes dependentes.

## Tarefa 6 — release e canário Supertrans, em escopo separado

Esta fase depende de autorização de release e de uma tarefa no repositório do consumidor. Não editar Supertrans/Aurora a partir da tarefa Orion.

- [ ] Preparar artefatos e release notes; executar workflow em dry-run. Publicar versões somente com autorização correspondente.
- [ ] No checkout Supertrans, confirmar componentes e versão usados em filtros de demandas/cards da home. Definir páginas e baseline locais; nomes de telas citados no pedido não provam integração atual.
- [ ] Atualizar versão e peers necessários; adicionar provider em boundary cliente, atrás de flag local inicialmente desativada. Ativar primeiro em telas selecionadas e ambiente de validação.
- [ ] Medir mesmos indicadores da tarefa 1, validar acessibilidade, formulários, navegação, SSR e mobile; comparar com flag off. Não misturar melhoria de backend com efeito visual.
- [ ] Rollback: desligar flag; se necessário retornar às versões anteriores testadas. Rollback não depende de recompilar Orion nem de alterar dados.
- [ ] Expandir somente após canário aceito. Aurora e demais consumidores recebem tarefas próprias e validação de versões/SSR; não assumir compatibilidade pelo Storybook.

**Aceite:** política compartilhada adotada em consumidor real, resultado medido e reversível, sem acoplamento de negócio no Orion.

## Sequência de entregas

1. Baseline e decisão arquitetural.
2. Tokens/política/pacote distribuível.
3. Motion e pilotos FiltersCard/LauncherCard.
4. Movimento em Accordion, Dialog, Popover e Sheet existentes.
5. Documentação e candidate de release; Anime instalado, sem uso antecipado.
6. Release autorizado e canário em tarefa separada do Supertrans.

Cada entrega deve ser revisável e validada antes da seguinte. Estimativa de prazo depende principalmente de baseline SSR/pack e lifecycle Base UI; não fixar dias antes dessa evidência.

## Anime.js quando surgir necessidade

Instalação ocorre na tarefa 2. Uso fica para tarefa futura motivada por um efeito concreto em componente existente. Nessa ocasião definir menor API necessária, carregamento sob demanda, scope restrito, cleanup, SSR e movimento reduzido. Não bloquear melhorias atuais para construir infraestrutura Anime antecipadamente.
