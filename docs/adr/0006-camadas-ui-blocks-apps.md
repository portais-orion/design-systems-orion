# 0006 â€” Camadas: tokens â†’ ui â†’ blocks â†’ apps

## Contexto
Precisamos de um corte objetivo entre o que Ã© compartilhado e o que Ã© produto, para evitar que domÃ­nio vaze para a base.

## DecisÃ£o
Camada 0 `@supertrans-transportes/tokens` (CSS puro); Camada 1 `@supertrans-transportes/ui` (primitives headless estilizadas); Camada 2 `@supertrans-transportes/blocks` (composiÃ§Ãµes genÃ©ricas com dados via props â€” DataTable, PageHeader...); Camada 3 apps/produtos (telas, hooks de API, domÃ­nio). Regra de corte: se conhece entidade de negÃ³cio, rota, endpoint ou chave de permissÃ£o real, Ã© Camada 3. Camadas inferiores nunca importam das superiores. Sem abstraÃ§Ãµes de runtime prÃ³prias sobre Next/Nest (convenÃ§Ã£o sobre framework).

## Alternativas consideradas
Pacote Ãºnico de UI (mistura primitives e composiÃ§Ãµes, dificulta versionar); pacote de "features" compartilhadas (rejeitado por acoplamento de domÃ­nio).

## ConsequÃªncias
Reuso de telas entre empresas acontece por composiÃ§Ã£o fina na Camada 3 sobre blocks/templates, nunca por tela compartilhada.

## Riscos
GeneralizaÃ§Ã£o prematura na Camada 2. MitigaÃ§Ã£o: regra dos dois usos (sÃ³ sobe o que tem 2+ consumidores reais).

## CritÃ©rios de aceite
blocks depende de ui e tokens; ui depende de tokens; nenhuma dependÃªncia invertida no lockfile.
