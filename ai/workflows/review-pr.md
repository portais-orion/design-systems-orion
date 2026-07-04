# Workflow: revisar PR do núcleo

1. Escopo: PR toca uma coisa só? Packages + rule atualizada juntos?
2. Pureza: rodar mentalmente `ai/rules/no-domain-in-shared-packages.md`; grep por hex, `@radix-ui`, `orange-`, `primary-600`, axios, fetch, rotas.
3. Camadas: dependências corretas (tokens ← ui ← blocks; nunca o inverso)?
4. Story existe e cobre estados? Validada nas 2 marcas?
5. Tokens novos entraram nos DOIS temas?
6. Checklist correspondente em `ai/checklists/` preenchido?
7. Changeset presente quando muda package consumível?
8. Comandos: `pnpm check && pnpm typecheck && pnpm build` verdes (exigir evidência de execução).
