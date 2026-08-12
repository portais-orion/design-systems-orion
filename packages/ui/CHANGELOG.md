# @portais-orion/ui

## 0.4.1

### Patch Changes

- Adiciona `README.md` e os campos `repository`/`homepage` do `package.json` — os três pacotes estavam publicados no npm sem nenhum dos dois, então a página do pacote em npmjs.com não mostrava descrição nem link pro repositório. Sem mudança de comportamento.

## 0.4.0

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

## 0.3.1

### Patch Changes

- 7a7e036: Corrige estados visuais de componentes migrados do Radix para Base UI:

  - RadioGroup: indicador centralizado no círculo (Root agora é flex centrado — no Base UI o Indicator não preenche o Root automaticamente).
  - Checkbox: estado marcado voltou a estilizar (seletores `data-[state=checked]` do Radix trocados por `data-[checked]` do Base UI).
  - Select: popup não sobrepõe mais o trigger — `alignItemWithTrigger` desabilitado no modo padrão `popper`; a prop `position="item-aligned"` reativa o alinhamento.
  - Combobox/MultiSelect: removido espaço vazio no topo do popup (`Empty` agora fica oculto quando há resultados).
  - Dialog: removidos estilos mortos `data-[state=open]` no botão de fechar.

## 0.3.0

### Minor Changes

- Adiciona suporte a variantes de `Tabs` (line) e orientação vertical.

## 0.2.1

### Patch Changes

- fix: update gen-dist-exports to use .mjs and .d.mts extensions instead of .js and .d.ts

## 0.2.0

### Minor Changes

- 133cd34: Sprint 1: primeira leva de primitives. Extraídos do Supertrans: input, label, textarea, checkbox, select, dialog, tooltip, card, badge, skeleton, avatar, table. Recriados em Base UI a partir da API do Aurora: switch, tabs, separator, alert, alert-dialog, dropdown-menu. Badge sem variants de domínio; bg-white tokenizado; subpath exports; lucide-react como dependency.
- 133cd34: Sprint 4.1: Combobox (seleção única com busca) e MultiSelect (múltipla com chips, grupos, maxDisplay, clear) sobre o Combobox do Base UI — sem cmdk, sem Radix. MultiSelect único substitui multi-select e GroupedMultiSelect do Aurora. Stories com fn() e play functions de teclado.
- 133cd34: Sprint 4: +7 primitives no @portais-orion/ui (popover, radio-group, scroll-area, sheet, accordion, progress, spinner — Base UI/tokens) e LoadingOverlay no @portais-orion/blocks. Combobox/Command/MultiSelect analisados e adiados para 4.1 com API definida (docs/architecture/advanced-inputs.md).

### Patch Changes

- Build distribuível (Sprint 10 hardening): tsup para `ui` e `blocks` (ESM + `.d.ts`, subpaths
  preservados, sem bundlar peers), cópia de CSS para `dist` em `tokens`. Sem breaking change de API
  pública. `publishConfig.exports` aponta para `dist`; consumidores podem dispensar
  `transpilePackages` após validar o build ESM.
