---
name: contribute-to-nucleo
description: Use quando um componente/block reutilizável criado fora do Núcleo (ou nesta sessão) deve ser contribuído de volta ao repo nucleo-portais via pull request — valida padrões, roda gates, gera docs, cria branch/commit e abre PR para revisão humana. Nunca faz merge.
---

# Contribuir componente/block ao Núcleo

Executa `ai/workflows/contribute-back.md` de ponta a ponta. Este arquivo é o roteiro de
decisão; o workflow tem os comandos.

## Sequência

1. **Elegibilidade** (workflow §1): duplicidade (`find-component.md`), pureza (teste do
   terceiro portal), regra dos dois usos (blocks), camada certa. Reprovou → reportar ao
   usuário com a alternativa (estender existente / manter no produto / abrir issue) e parar.
2. **Adequação** (workflow §2): reescrever seguindo `create-component`/`create-block`; nunca
   colar código Radix/TW3 — recriar.
3. **Story + docs** (workflow §3): story nas 2 marcas; JSDoc; mapa do
   `scripts/generate-docs.mjs`; regenerar docs.
4. **Gates** (workflow §4): `pnpm check && pnpm typecheck && pnpm build` — colar evidência de
   execução no PR; checklist de aceite; changeset.
5. **Branch + commit** (workflow §5): `feat/<ui|blocks>-<nome>`; Conventional Commits com
   escopo do package; um componente por PR.
6. **PR** (workflow §6): `gh pr create` com corpo no formato de
   `.github/PULL_REQUEST_TEMPLATE.md` — o quê, por quê (consumidores nomeados), validações
   executadas.

## Regras rígidas

- **NUNCA** `gh pr merge`, auto-approve ou push na `main` — a decisão é humana.
- Sem push/PR se qualquer gate estiver vermelho; reportar o vermelho.
- Mudou um padrão do repo? Atualizar a rule correspondente em `ai/` no MESMO PR (ADR 0008).
- Conflito com ADR → parar e reportar; nunca contornar.
