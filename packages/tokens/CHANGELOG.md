# @portais-orion/tokens

## 0.3.0

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

## 0.2.0

### Minor Changes

- b0c4e69: Adiciona o tema da marca Grupo Orion ao catálogo de marcas.

  - Nova marca `orion` (label "Grupo Orion") em `brands.json`, repositório `portal-orion`.
  - Tema `themes/orion.css`: primária teal `#29A699` (HSL 175 60% 40%), acento de marca laranja queimado `#D95A11` (HSL 22 85% 45%) em `--brand-accent`, sidebar teal escura e `--radius: 0.5rem`.
  - `index.css` e os exports de tema do `package.json` derivados via `sync:brands`.
  - Toolbar do Storybook e o comparativo de marcas passam a incluir Orion automaticamente.

## 0.1.1

### Patch Changes

- 133cd34: Corrige troca de marca: seletores de tema passam de `:root, [data-brand]` (empate de especificidade — último import vencia sempre) para `:root:not([data-brand])` + `:root[data-brand="<marca>"]` + `[data-brand="<marca>"]`.
- Build distribuível (Sprint 10 hardening): tsup para `ui` e `blocks` (ESM + `.d.ts`, subpaths
  preservados, sem bundlar peers), cópia de CSS para `dist` em `tokens`. Sem breaking change de API
  pública. `publishConfig.exports` aponta para `dist`; consumidores podem dispensar
  `transpilePackages` após validar o build ESM.
