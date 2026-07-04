# 0005 — Temas por CSS variables (data-brand), nunca por props

## Contexto
Cada empresa tem identidade própria (Supertrans: azul petróleo #00526b/accent #3caec4/navy #001e2b; Aurora: laranja #f97316). Componentes devem ser únicos, servindo todas as marcas.

## Decisão
Componentes usam apenas tokens semânticos (`bg-primary`, `text-muted-foreground`). Marcas são arquivos CSS em `@grupo/tokens/themes/*` que redefinem variables sob `:root` (fallback) e `[data-brand="<marca>"]`. Proibido: `brand` como prop de componente, hex em componente, classes de marca (`orange-*`, `primary-600`).

## Alternativas consideradas
Prop `brand` (fork lógico dentro do componente — explode variantes); build por marca (duas distribuições para manter); ThemeProvider JS (runtime desnecessário; CSS resolve).

## Consequências
Uma marca nova = um arquivo CSS; Storybook alterna marca trocando um atributo; escala `primary-50..900` do Aurora é abolida em favor de `--primary`/`--primary-hover`.

## Riscos
Token semântico insuficiente para alguma diferença de marca. Mitigação: criar token novo no base.css (nunca desviar para hex local).

## Critérios de aceite
Mesmo Button renderiza corretamente sob `data-brand="supertrans"` e `data-brand="aurora"` sem mudança de código.
