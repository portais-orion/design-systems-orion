# @portais-orion/blocks

## 0.5.1

### Patch Changes

- Adiciona `README.md` e os campos `repository`/`homepage` do `package.json` — os três pacotes estavam publicados no npm sem nenhum dos dois, então a página do pacote em npmjs.com não mostrava descrição nem link pro repositório. Sem mudança de comportamento.
- Updated dependencies
  - @design-systems-orion/ui@0.4.1

## 0.5.0

### Minor Changes

- eafc477: Aprofunda os módulos do núcleo: um esqueleto de página, um estado de tabela, um dono do colapso e um dicionário de tons.

  **tokens**

  - Novos tokens semânticos de estado, em claro e escuro: `--success`, `--warning`, `--info` e os pares `-foreground` / `-subtle` / `-subtle-foreground`, mais `--destructive-foreground` e `--destructive-subtle`. Não são tokens de identidade: uma marca pode redefini-los no seu tema, mas não precisa.

  **ui**

  - `Badge` ganhou a variante `info`; `success` e `warning` passaram a sair dos tokens (respondem a `data-brand` e ao modo escuro).
  - O botão de fechar do `Sheet` carrega o próprio `z-10`, então o consumidor não precisa mais alcançá-lo por seletor de filho.

  **blocks**

  - `PageLayout` virou o único módulo que monta uma página: ganhou `variant`, `aside` e `footer`. `ListPageLayout`, `FormPageLayout`, `DetailPageLayout` e `DashboardPageLayout` passaram a ser variações dele — as interfaces dos quatro continuam iguais.
  - `AppShell` aceita a navegação como dado em `sidebar` e é o dono do colapso: `collapsed`, `defaultCollapsed` e `onCollapsedChange` agora fazem efeito (antes eram declaradas e ignoradas). `renderSidebar` continua funcionando como escape hatch e passou a receber `collapsed`, `onCollapsedChange` e `collapsible`.
  - `DataTable` resolve o estado da tabela uma vez na raiz (carregando, erro, vazio, linhas) em vez de decidir em cinco subcomponentes; o contexto deixou de ser `any`. `DataTable.Card` e `ListPageLayout.Card` compartilham a mesma moldura — o raio do cartão da tabela mudou de `rounded-xl` para `rounded-2xl`.
  - Novo `BlocksCopyProvider` (subpath `./copy`) com os textos dos blocks e defaults em pt-BR. Strings que não eram sobrescrevíveis — o cabeçalho da coluna de ações, o título do drawer de navegação e o rótulo da navegação principal — agora são injetáveis. As props de texto continuam valendo por cima.
  - Os treze mapas de tom→cor com paleta crua foram substituídos por uma tradução única sobre os tokens. Os tons públicos de cada bloco (`tone`) não mudaram, mas as cores agora acompanham a marca e o modo escuro.

### Patch Changes

- Updated dependencies [eafc477]
  - @design-systems-orion/ui@0.4.0

## 0.4.1

### Patch Changes

- Corrige `.d.mts` ausentes em 26 dos 58 blocks publicados na 0.4.0 (incluindo os 6 blocks
  da rodada 2 — CrudModalFrame, TableToggle, ModuleIcon, ImpersonationBanner, OnboardingDialog,
  PermissionGate). O worker de geração de tipos do tsup estourava o heap default do Node ao
  processar todos os entry points de uma vez; o build publicado saiu parcial. O script de build
  agora roda o tsup com heap maior via `scripts/run-tsup-big-heap.mjs` (sem depender de
  `NODE_OPTIONS`, que pode ser bloqueado por política de ambiente corporativa).

## 0.4.0

### Minor Changes

- Batch de blocos a partir de um audit completo do Supertrans (26 padrões visuais
  bespoke mapeados; ver `portal-supertrans/docs/nucleo-crud-visual-gaps.md` para o
  relatório completo, o que foi resolvido e o que ficou como backlog/ADR).

  Novos blocos:

  - `FileDropzone` — zona de arraste-e-solte/clique para seleção de arquivo(s).
  - `FileListItem` — card de arquivo selecionado, pendente de envio, com remoção.
  - `AttachmentList` — lista de anexos com ícone tonalizado, extensão e seleção/remoção.
  - `ActivityTimeline` — linha do tempo vertical de eventos (auditoria, histórico de status).
  - `ViewEditField` — campo de detalhe com alternância view/edit inline, sem modal.
  - `InlineConfirmAction` — ação com confirmação inline (trigger vira confirmar/cancelar).
  - `JsonDiffDialog` — modal de diff antes/depois para telas de auditoria.
  - `ComparisonDiffView` — comparação lado a lado entre entidades, por grupos e colunas coloridas.
  - `MissingPrerequisitesState` — estado de bloqueio por cadastros básicos ausentes.
  - `DynamicFieldListRows` — linhas de formulário repetíveis (padrão `useFieldArray`).
  - `MetricGaugeCard` — card de métrica com tom semântico, tooltip e barra de progresso.
  - `EntityAssignmentPanel` — gerenciador de vínculo N:N (busca + atribuir/remover).
  - `PresenceAvatarStack` — pilha de avatares de presença com tooltip, sem conhecer sockets.

  Todos presentational — sem domínio, rota, fetch ou dependências novas.

- Adiciona 6 blocos do backlog de padrões visuais do audit Supertrans:

  - `GanttChart` — linha do tempo de barras por intervalo de datas, com marcador de "hoje"
  - `KanbanBoard` — colunas com cartões (sem drag-and-drop; ver ADR 0010 para @dnd-kit)
  - `FilterableTreeList` — árvore recursiva com expand/collapse e seleção de nó
  - `NestedToggleAccordionList` — accordion de seções com toggles aninhados e badges de origem
  - `KioskModeToggle` — alternância de modo tela cheia com relógio embutido
  - `ImpactAnalysisDialog` — modal de análise de impacto (dependências, última alteração, categorias)

- Rodada 2 de gaps encontrados na unificação de 7 telas de CRUD do Supertrans
  (`docs/nucleo-gaps-round-2.md`).

  Blocos novos:

  - `CrudModalFrame` — invólucro completo de modal CRUD (Dialog + `CrudModalHeader` + corpo
    scrollável + footer opcional + tamanhos `sm/md/lg/xl`).
  - `TableToggle` — switch compacto (36×20, sem label) para célula de tabela.
  - `ModuleIcon` + `ICON_MAP` + `ICON_OPTIONS` + `resolveModuleIcon` — ícone de módulo resolvido a
    partir de chave string persistida, com fallback.
  - `ImpersonationBanner` — faixa de aviso de sessão simulada, controlada por props (sem auth
    embutida).
  - `OnboardingDialog` — modal de primeiro acesso com passos numerados, controlado (sem
    `localStorage`).
  - `PermissionGate` + `PermissionProvider` — gate de permissão que recebe o resolvedor via context
    em vez de importar hook do consumidor.

  Ajustes em blocos existentes (aditivos, sem breaking change):

  - `Pagination` — novas props `showWhenEmpty` (default `false`) e `itemLabel` (default
    "resultados"). Com `showWhenEmpty`, o rodapé fica visível e desabilitado quando `total = 0` em
    vez de não renderizar nada.
  - `ListPageLayout` — novas props `surface` (`"transparent"` default | `"card"`), `loading` e
    `loadingLabel`. `surface="card"` envolve filters+content+footer numa superfície com
    borda/sombra/cantos arredondados, cobrindo o caso do `CrudPageShell` bespoke do Supertrans sem
    criar bloco novo.

  Nenhum bloco novo ou ajuste adiciona dependência externa ao Orion; todos são presentational.

- Novo bloco `MonthCalendar` — calendário mensal com grid de semanas completas,
  navegação de mês via callback, badges por dia com tons semânticos e seleção de
  dia. Extraído de `gestao-demandas/grade-programacao` (Supertrans), que tinha
  mês/ano fixos; aqui o grid é calculado a partir da data recebida. Presentational
  — não busca dados nem renderiza a tabela de detalhe do dia (isso continua a
  cargo do consumidor via `DataTable`).

### Patch Changes

- Updated dependencies [7a7e036]
  - @portais-orion/ui@0.3.1

## 0.3.1

### Patch Changes

- Updated dependencies
  - @portais-orion/ui@0.3.0

## 0.3.0

### Minor Changes

- Novos blocos para o padrão visual CRUD (gaps documentados na adoção do Supertrans):

  - `CrudModalHeader` — cabeçalho de modal (ícone tonalizado + título + subtítulo + badges) para criar/editar/detalhe.
  - `FiltersCard` — card de filtros colapsável (título + toggle Mostrar/Ocultar + slot de controles + footer "Limpar filtros").
  - `LauncherCard` — card de lançador de módulo (ícone + título + descrição + CTA), com estado clicável opcional.

  Presentational, sem domínio/rota/Next. `StatusCards` (faixa de resumo) já existia; `CrudTableFooter`
  não foi criado (coberto pela paginação embutida do `DataTable`).

## 0.2.1

### Patch Changes

- fix: update gen-dist-exports to use .mjs and .d.mts extensions instead of .js and .d.ts
- Updated dependencies
  - @portais-orion/ui@0.2.1

## 0.2.0

### Minor Changes

- 133cd34: Sprint 2: primeira leva de blocks. Do Supertrans (shared.tsx, generalizados): EmptyState, ErrorState, TableSkeletonRows, FilterPill, StatusDot, CodeBadge. Do Aurora (APIs recriadas sobre @portais-orion/ui): ConfirmDialog, Pagination, PageHeader, SearchBar, StatusCards. Tons semânticos padronizados; subpath exports; script check:pureza no repo.
- 133cd34: Sprint 3: DataTable — bloco oficial de listagem ("melhor dos dois"): API Column<T>/keyExtractor do Aurora, markup/tokens do Núcleo, TanStack Table interno (manualSorting), estados loading/empty/error embutidos, paginação e sorting controlados, actions por linha com stopPropagation, toolbar/footer slots.
- 133cd34: Sprint 4: +7 primitives no @portais-orion/ui (popover, radio-group, scroll-area, sheet, accordion, progress, spinner — Base UI/tokens) e LoadingOverlay no @portais-orion/blocks. Combobox/Command/MultiSelect analisados e adiados para 4.1 com API definida (docs/architecture/advanced-inputs.md).
- 133cd34: Sprint 5: form blocks (FormField, FormMessage, FormSection, FormActions, FieldGroup — agnósticos de RHF/Zod) e page layouts (PageLayout, ListPageLayout, FormPageLayout, DetailPageLayout, DashboardPageLayout, SectionHeader, ContentCard). Stories integradas de página completa com play function de validação.
- 133cd34: Sprint 6: chrome oficial — tipos de navegação (NavigationItem, RenderLink, canAccessItem, filterNavigation), Breadcrumbs (nav/ol/aria-current), Sidebar (tokens sidebar-\*, colapso controlado/não controlado, grupos, submenus com auto-open, badges, disabled, filtro injetado, tooltips em collapsed) e AppShell (sidebar + barra de breadcrumbs + miolo, mobile via Sheet). Sem Next.js, sem permissões reais.

### Patch Changes

- Build distribuível (Sprint 10 hardening): tsup para `ui` e `blocks` (ESM + `.d.ts`, subpaths
  preservados, sem bundlar peers), cópia de CSS para `dist` em `tokens`. Sem breaking change de API
  pública. `publishConfig.exports` aponta para `dist`; consumidores podem dispensar
  `transpilePackages` após validar o build ESM.
- Updated dependencies [133cd34]
- Updated dependencies
- Updated dependencies [133cd34]
- Updated dependencies [133cd34]
  - @portais-orion/ui@0.2.0
