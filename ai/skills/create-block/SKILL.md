---
name: create-block
description: Use quando precisar criar uma composição nova em @portais-orion/blocks (Camada 2) neste repo — padrão de página/formulário/tabela reutilizável entre portais. Não use para primitive simples (é ui) nem para composição usada por um único portal (fica no produto).
---

# Criar block em @portais-orion/blocks

Orquestra os artefatos existentes do repo. Fonte de verdade dos padrões: `ai/rules/blocks.md`.

## Passos

1. **Anti-duplicidade**: rodar `ai/workflows/find-component.md` (33+ blocks existem; verificar
   também se é só composição de blocks existentes — nesse caso fica no produto).
2. **Regra dos dois usos**: 2+ consumidores reais previstos nos portais, nomeados. Sem isso,
   parar — fica no produto até o segundo uso aparecer.
3. **API primeiro**: definir props/slots/estados e validar contra 1 tela real de CADA portal
   antes de implementar (`ai/workflows/create-block.md` passos 3–4). Dados por props, conteúdo
   por slots, integrações por providers injetados; nada de Next/rotas/permissões no block.
4. **Implementar** sobre `@portais-orion/ui` + tokens. Referências de padrão:
   `confirm-dialog` (estado assíncrono), `status-cards` (tons semânticos), `pagination`
   (envelope `{data,total,page,limit}`), `data-table` (server-first, TanStack não vaza).
5. **Story** cobrindo dados normais / vazio / erro / loading, nas 2 marcas. Comentário de
   proveniência no topo do arquivo.
6. **JSDoc** + registrar no mapa de `scripts/generate-docs.mjs` + rodar
   `node scripts/generate-docs.mjs`.
7. **Gates**: `pnpm check && pnpm typecheck && pnpm build` + checklist
   `ai/checklists/component-acceptance.md` (itens de blocks incluídos) + changeset.

## Limites

- Tons sempre no vocabulário `default/success/warning/danger/info/muted`.
- Dependência só para baixo: blocks → ui → tokens; nunca o inverso.
- Para contribuir o resultado via PR: skill `contribute-to-nucleo`.
