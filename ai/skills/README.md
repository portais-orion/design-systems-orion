# Skills

Skills executáveis (formato SKILL.md com frontmatter `name`/`description`). **Fonte de verdade
é este diretório**; cada skill tem um stub de registro em `.claude/skills/<nome>/SKILL.md` para
o Claude Code descobrir — o stub só aponta para cá, nunca duplica conteúdo. Ao criar/alterar
skill: editar aqui e manter o stub (frontmatter idêntico + ponteiro).

| Skill | Cenário |
|---|---|
| `new-portal` | criar projeto/portal novo do zero consumindo `@design-systems-orion` |
| `portais-orion-adoption` | migrar uma tela de portal existente para o Orion |
| `create-component` | criar primitive em `@design-systems-orion/ui` (Camada 1) |
| `create-block` | criar composição em `@design-systems-orion/blocks` (Camada 2) |
| `contribute-to-nucleo` | contribuir componente/block de volta via PR (sem merge automático) |

As skills orquestram (e nunca substituem) os artefatos de `ai/workflows/`, `ai/rules/` e
`ai/checklists/` — mudança de padrão se faz lá, não na skill.

`portais-orion-adoption`, `new-portal` e `contribute-to-nucleo` também são expostas
globalmente via junction (`C:\Users\marce\.portais-orion\skills\<nome>` → `ai/skills/<nome>`)
para uso a partir dos repos consumidores. `create-component`/`create-block` só fazem sentido
dentro deste repo — sem link global.
