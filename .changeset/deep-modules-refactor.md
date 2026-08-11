---
"@design-systems-orion/tokens": minor
"@design-systems-orion/blocks": minor
"@design-systems-orion/ui": minor
---

Aprofunda os módulos do núcleo: um esqueleto de página, um estado de tabela, um dono do colapso e um dicionário de tons.

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
