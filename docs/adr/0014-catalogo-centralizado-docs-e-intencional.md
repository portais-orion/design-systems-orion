# 0014 — Catálogo centralizado de categorias em generate-docs.mjs é intencional

## Contexto
Review de arquitetura (2026-08-12) apontou `scripts/generate-docs.mjs:46-139`
(`uiCategories`, `blocksCategories`, ~90 entradas) como perda de locality — a categoria de
docs de um componente vive longe do componente, exigindo abrir o script pra descobrir a
categoria de `data-table` ou `sidebar`.

O próprio arquivo já documenta a escolha (`generate-docs.mjs:40-44`): o gerador não varre o
filesystem de propósito, para que a inclusão de um componente novo nos docs seja sempre uma
decisão explícita — não um efeito colateral de criar uma pasta. O catálogo centralizado também
dá visão completa da estrutura de categorias e da ordem da sidebar (`categoryOrder`) num só
lugar, sem precisar agregar dezenas de arquivos `*.meta.ts` pra montar o menu.

## Decisão
`uiCategories`/`blocksCategories` permanecem centralizados em `generate-docs.mjs`. Reviews de
arquitetura futuras não devem reclassificar isso como perda de locality — é metadata de
documentação (não de domínio), e a centralização é o mecanismo deliberado de manter a inclusão
nos docs explícita.

## Alternativas consideradas
Mover categoria para `*.meta.ts` co-localizado ao componente, com `generate-docs.mjs` agregando
em vez de declarar — rejeitado: mudança em ~90 componentes só pra trocar uma decisão de
trade-off já pesada pelo autor original (explicitness vs. locality), sem problema concreto
reportado (nenhum caso de categoria errada ou esquecida até hoje).

## Consequências
Nenhuma mudança de código.

## Riscos
Se o catálogo crescer a ponto de divergir com frequência do estado real dos componentes
(categoria desatualizada, componente publicado sem entrada), reabrir esta decisão com os casos
concretos em mãos.
