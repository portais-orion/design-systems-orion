# 0005 â€” Temas por CSS variables (data-brand), nunca por props

## Contexto
Cada empresa tem identidade prÃ³pria (Supertrans: azul petrÃ³leo #00526b/accent #3caec4/navy #001e2b; Aurora: laranja #f97316). Componentes devem ser Ãºnicos, servindo todas as marcas.

## DecisÃ£o
Componentes usam apenas tokens semÃ¢nticos (`bg-primary`, `text-muted-foreground`). Marcas sÃ£o arquivos CSS em `@supertrans-transportes/tokens/themes/*` que redefinem variables sob `:root` (fallback) e `[data-brand="<marca>"]`. Proibido: `brand` como prop de componente, hex em componente, classes de marca (`orange-*`, `primary-600`).

## Alternativas consideradas
Prop `brand` (fork lÃ³gico dentro do componente â€” explode variantes); build por marca (duas distribuiÃ§Ãµes para manter); ThemeProvider JS (runtime desnecessÃ¡rio; CSS resolve).

## ConsequÃªncias
Uma marca nova = um arquivo CSS; Storybook alterna marca trocando um atributo; escala `primary-50..900` do Aurora Ã© abolida em favor de `--primary`/`--primary-hover`.

## Riscos
Token semÃ¢ntico insuficiente para alguma diferenÃ§a de marca. MitigaÃ§Ã£o: criar token novo no base.css (nunca desviar para hex local).

## CritÃ©rios de aceite
Mesmo Button renderiza corretamente sob `data-brand="supertrans"` e `data-brand="aurora"` sem mudanÃ§a de cÃ³digo.
