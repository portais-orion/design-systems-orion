# 0011 — DataTable: colunas sticky + resize por arraste (não implementado)

## Status
Proposto — aguardando decisão. Não implementado.

## Contexto
O audit completo do Supertrans (2026-07-20) identificou o padrão `ResizableStickyTable` em
`cronograma-page`: uma tabela com colunas fixas à esquerda (sticky) e resize de largura por
arraste na borda do header.

Diferente dos outros 9 itens do backlog original, este não é "um bloco novo que falta" — é uma
mudança de comportamento no **`DataTable`** já existente e amplamente consumido no Orion e no
Supertrans. Adicionar sticky+resize por fora (um wrapper novo) duplicaria lógica de scroll/header
que o `DataTable` já resolve, e divergiria da fonte única de verdade para tabelas do design system.

## Decisão proposta
Evoluir o contrato do `DataTable` (não criar um componente paralelo):

- Nova prop opcional `columns[].sticky?: "left" | "right"` — aplica `position: sticky` + offset
  calculado a partir da largura acumulada das colunas sticky anteriores.
- Nova prop opcional `columns[].resizable?: boolean` + `onColumnResize?: (columnId, width) => void`
  — o `DataTable` gerencia o handle de arraste; a persistência da largura (se necessária) fica a
  cargo do consumidor via callback, mantendo o `DataTable` sem estado além do de UI.
- Ambas as props são **opt-in e retrocompatíveis** — nenhum consumidor existente muda de
  comportamento sem declarar as novas props.

## Alternativas consideradas
1. **Componente novo `ResizableStickyTable` fora do `DataTable`** — rejeitado como padrão
   principal: duplicaria paginação/skeleton/empty-state que o `DataTable` já resolve, e criaria
   dois caminhos para "tabela" no Orion.
2. **Lib externa de tabela (TanStack Table, AG Grid) substituindo o `DataTable` interno** — fora de
   escopo desta decisão; é uma mudança arquitetural maior, não pontual. Se o time achar que o
   `DataTable` está chegando no limite de complexidade sustentável, isso merece um ADR próprio,
   separado deste.

## Consequências se aprovado
- `DataTable` ganha duas responsabilidades novas (posicionamento sticky, medição/resize de
  largura) — aumenta a complexidade interna do componente mais consumido do Orion.
- Precisa de teste visual em todos os consumidores atuais do `DataTable` para garantir que a
  mudança é realmente aditiva (nenhuma quebra quando `sticky`/`resizable` não são declarados).
- `cronograma-page` no Supertrans passa a consumir o `DataTable` padrão em vez de manter uma tabela
  bespoke — remove divergência visual.

## Pendências antes de implementar
- Prototipar a implementação de sticky (CSS puro vs. `ResizeObserver` para recalcular offsets)
  e confirmar que funciona com paginação e ordenação já existentes no `DataTable`.
- Decidir se resize por arraste é sempre px absoluto ou se aceita `%`/`fr` — impacta a API da prop.
