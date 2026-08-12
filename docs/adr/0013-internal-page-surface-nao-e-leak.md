# 0013 — `_internal/` de packages/blocks é seam interno intencional, não leak

## Contexto
Review de arquitetura (2026-08-12) apontou `packages/blocks/src/_internal/` (page-regions.ts,
page-parts.tsx, surface-card.tsx) como acoplamento cruzado escondido entre `DataTable` e
`ListPageLayout` — dois módulos públicos dependendo das mesmas constantes (`BAND_TOP_CLASS`,
`SurfaceCard`) sem import explícito nomeando a relação.

Investigação mostrou que a leitura estava incompleta: `_internal/` é consumido por 26 arquivos em
`packages/blocks/src`, não só os dois citados, e cada arquivo do diretório já documenta no
cabeçalho por que existe e por que não é exportado pelo barrel público — evitar que layouts
especializados (`PageLayout`, `ListPageLayout`, `FormPageLayout`, `DetailPageLayout`,
`DashboardPageLayout`, `DataTable`) repitam a mesma decisão de esqueleto (padding, grid de aside,
raio de cartão) de forma divergente.

## Decisão
`_internal/` permanece um módulo interno do pacote `blocks`, não exportado pelo barrel público.
Reviews de arquitetura futuras não devem reclassificar isso como leakage — é o seam correto entre
os blocks que compõem página, deliberadamente fechado para consumidores externos ao pacote.

## Alternativas consideradas
Tornar `_internal/` público como `PageSurface`/`SurfaceCard` — rejeitado: nenhum consumidor fora
de `packages/blocks` foi identificado; abriria API pública sem os dois usos reais exigidos pela
regra de generalização (ADR 0006).

## Consequências
Nenhuma mudança de código. Documentado para não gastar ciclo de review repetindo a mesma
investigação.

## Riscos
Se um portal (Camada 3) algum dia precisar de `PageSurface`/`SurfaceCard` diretamente, reabrir esta
decisão com o caso de uso real em mãos.
