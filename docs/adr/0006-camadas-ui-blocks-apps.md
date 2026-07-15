# 0006 — Camadas: tokens → ui → blocks → apps

## Contexto
Precisamos de um corte objetivo entre o que é compartilhado e o que é produto, para evitar que domínio vaze para a base.

## Decisão
Camada 0 `@supertrans-transportes/tokens` (CSS puro); Camada 1 `@supertrans-transportes/ui` (primitives headless estilizadas); Camada 2 `@supertrans-transportes/blocks` (composições genéricas com dados via props — DataTable, PageHeader...); Camada 3 apps/produtos (telas, hooks de API, domínio). Regra de corte: se conhece entidade de negócio, rota, endpoint ou chave de permissão real, é Camada 3. Camadas inferiores nunca importam das superiores. Sem abstrações de runtime próprias sobre Next/Nest (convenção sobre framework).

## Alternativas consideradas
Pacote único de UI (mistura primitives e composições, dificulta versionar); pacote de "features" compartilhadas (rejeitado por acoplamento de domínio).

## Consequências
Reuso de telas entre empresas acontece por composição fina na Camada 3 sobre blocks/templates, nunca por tela compartilhada.

## Riscos
Generalização prematura na Camada 2. Mitigação: regra dos dois usos (só sobe o que tem 2+ consumidores reais).

## Critérios de aceite
blocks depende de ui e tokens; ui depende de tokens; nenhuma dependência invertida no lockfile.
