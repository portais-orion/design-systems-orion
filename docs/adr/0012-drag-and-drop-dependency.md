# 0012 — Drag-and-drop no Orion: adotar `@dnd-kit`? (não implementado)

## Status
Proposto — aguardando decisão. Não implementado.

## Contexto
Dois padrões do audit completo do Supertrans (2026-07-20) precisam de drag-and-drop real:

- **`BuilderWithLivePreview`** (`menu-builder`) — reordenar itens de menu com preview lado a lado
  em tempo real. Único consumidor conhecido até agora.
- **`KanbanBoard`** — já foi construído e publicado (ver changeset `backlog-blocks-batch.md`), mas
  **sem** drag-and-drop: cartões são estáticos, reordenação (se necessária) é responsabilidade do
  consumidor. O componente foi deliberadamente entregue incompleto nesse aspecto para não decidir
  a dependência de forma silenciosa.

Ambos precisam da mesma capacidade (arrastar-e-soltar acessível, com suporte a teclado), então a
decisão de biblioteca deve ser única para os dois, não duas escolhas independentes.

## Decisão proposta
Adotar `@dnd-kit/core` (+ `@dnd-kit/sortable` quando aplicável) como a única lib de
drag-and-drop permitida no Orion, e:

1. Adicionar suporte a reordenação opcional no `KanbanBoard` (`onReorder?: (cardId, fromColumn,
   toColumn, index) => void`, ativado só quando a prop é passada — mantém o componente atual
   funcionando sem D&D para quem não precisa).
2. Construir `BuilderWithLivePreview` como bloco novo usando `@dnd-kit` para a lista arrastável e
   compondo com `children`/slots para o preview lado a lado (preview em si não é genérico o
   suficiente para virar parte do bloco — cada consumidor renderiza o próprio preview).

## Alternativas consideradas
1. **`react-beautiful-dnd`** — descontinuado pelo mantenedor original (Atlassian arquivou o
   projeto); rejeitado por falta de manutenção ativa.
2. **HTML5 Drag and Drop API nativa** (zero dependência) — rejeitada como padrão principal: API
   nativa tem suporte a acessibilidade/teclado fraco e comportamento inconsistente em mobile;
   aceitável apenas para casos triviais que não justificam nem `@dnd-kit`.
3. **Não adicionar D&D ao Orion; cada portal implementa o próprio** — rejeitada: dnd é
   exatamente o tipo de padrão estrutural (não visual) que o Orion deveria centralizar, evitando
   duas implementações divergentes de acessibilidade de drag-and-drop no mesmo grupo de portais.

## Consequências se aprovado
- Segunda dependência de peso não trivial adicionada ao Orion (a primeira seria as libs do ADR
  0010, se também aprovado) — reforça a necessidade de decidir isso via ADR em vez de
  acumular dependências ad hoc.
- `KanbanBoard` precisa de uma versão minor nova quando o suporte a `onReorder` for adicionado
  (mudança aditiva, não é breaking).
- `BuilderWithLivePreview` nasce sabendo que hoje tem um único consumidor (`menu-builder`) — regra
  geral do Orino de "dois usos antes de generalizar" some aqui; aceitar a exceção citando que a
  dependência (`@dnd-kit`) já estaria decidida pelo `KanbanBoard`, reduzindo o custo marginal de
  criar o segundo bloco.

## Pendências antes de implementar
- Confirmar tamanho de bundle do `@dnd-kit/core` + `@dnd-kit/sortable` é aceitável (historicamente
  é leve comparado a alternativas, mas medir no contexto real do Orion).
- Definir se `@dnd-kit` fica como `dependency` direta de `packages/blocks` ou como `peerDependency`
  (evitando duplicar instância em consumidores que já usam `@dnd-kit` por conta própria).
