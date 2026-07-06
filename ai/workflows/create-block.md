# Workflow: criar block em @supertrans-transportes/blocks

ReferÃªncias de padrÃ£o: packages/blocks/src/confirm-dialog (estado assÃ­ncrono), status-cards (tons semÃ¢nticos + clique opcional), pagination (envelope {data,total,page,limit}).

1. Confirmar regra dos dois usos: 2+ consumidores reais previstos nos portais.
2. Ler `ai/rules/blocks.md` + `ai/context/06-migration-aurora.md` (APIs de referÃªncia).
3. Definir a API primeiro (props, slots, estados) e validar contra 1 tela real de CADA portal antes de implementar.
4. Implementar sobre `@supertrans-transportes/ui` + tokens; dados por props; estados loading/empty/error com defaults.
5. Story cobrindo: dados normais, vazio, erro, loading â€” nas 2 marcas.
6. Checklist `component-acceptance.md` + changeset.
