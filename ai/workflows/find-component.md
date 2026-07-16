# Workflow: localizar e reutilizar componente/block existente

Rode SEMPRE antes de criar componente novo, migrar tela ou aceitar pedido de "componente novo".
Duplicidade é o erro mais caro: dois componentes para o mesmo papel divergem para sempre.

## 1. Enumerar o que existe

```powershell
Get-ChildItem packages/ui/src -Directory      # primitives (Camada 1)
Get-ChildItem packages/blocks/src -Directory  # composições (Camada 2)
```

Fontes complementares:

- `apps/storybook` (`pnpm storybook`) — estados e variants reais, toolbar de marca.
- `apps/docs` — props/exemplos gerados; agentes podem ler `content/docs/{ui,blocks}/*.mdx` direto.
- `docs/migration/ui-primitives-inventory.md` — inventário da migração.
- Tabela "padrão local → Núcleo" em `ai/skills/portais-orion-adoption/SKILL.md` §8.

## 2. Critério de duplicidade

Um candidato é duplicata se responde SIM a qualquer um:

- Mesmo papel de UI com outro nome? (ex.: "drawer" → `sheet` já existe; "modal" → `dialog`).
- API desejada é subconjunto de um existente + 1–2 props? → estender o existente (variant/prop), não criar.
- É composição de blocks existentes? → compor no produto (Camada 3), não criar block novo.

## 3. Decidir

| Situação | Ação |
|---|---|
| Existe equivalente | Usar/estender; gap de API vira issue (`gh issue create`) ou PR pequeno |
| Existe parcial | Estender o existente no mesmo dir; nunca criar `*-v2`/paralelo |
| Não existe | Seguir `create-component.md` (primitive) ou `create-block.md` (composição) |

Estender componente existente muda package consumível → changeset obrigatório.
