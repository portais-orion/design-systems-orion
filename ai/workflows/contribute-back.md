# Workflow: contribuir componente/block de volta ao Orion

Para quando um componente/block reutilizável nasceu num produto (ou numa tarefa) e deve entrar
neste repo. Termina em **PR aberta para revisão humana — NUNCA merge automático**.

## 1. Elegibilidade (parar aqui se falhar)

1. Duplicidade: rodar `ai/workflows/find-component.md`. Se existe equivalente/parcial, a
   contribuição vira extensão ou issue — não componente novo.
2. Pureza: teste de `ai/rules/no-domain-in-shared-packages.md` — "faria sentido num terceiro
   portal de outra empresa criado amanhã?" Se não, fica no produto (Camada 3).
3. Blocks: regra dos dois usos — 2+ consumidores reais previstos, nomeados no PR.
4. Camada certa: primitive genérico → `packages/ui`; composição de primitives → `packages/blocks`.

## 2. Adequar aos padrões

Reescrever (não colar) seguindo `ai/workflows/create-component.md` ou `create-block.md` +
`ai/rules/{components,blocks}.md`. Pontos que mais reprovam contribuições vindas de produtos:

- Radix → Base UI (`render`, não `asChild`); mapa Radix→Base UI em `ai/rules/components.md`.
- Hex/`bg-white`/`text-gray-*`/`orange-*` → tokens semânticos.
- Props de negócio (`showExportButton`, `isAdmin`) → slots/props genéricas.
- Textos de empresa hardcoded → props com default neutro.
- JSDoc no componente e nas props — alimenta `apps/docs` (sem JSDoc a página sai genérica).

## 3. Story + docs

1. Story colocalizada cobrindo variants, disabled, estados (blocks: dados/vazio/erro/loading).
2. Validar nas 2 marcas na toolbar do Storybook (Supertrans e Aurora).
3. Registrar o componente no mapa componente→categoria de `scripts/generate-docs.mjs`
   (hardcoded de propósito; sem isso a página não existe) e rodar
   `node scripts/generate-docs.mjs`.

## 4. Gates (exigir evidência, não declarar sem rodar)

```bash
pnpm check && pnpm typecheck && pnpm build
pnpm test:storybook          # se playwright chromium instalado
```

+ checklist `ai/checklists/component-acceptance.md` item a item
+ subpath export no `package.json` do package
+ changeset (`pnpm changeset`, minor para componente novo).

## 5. Branch + commit

```bash
git checkout -b feat/<ui|blocks>-<nome>       # ex.: feat/blocks-wizard-steps
```

Commit em Conventional Commits, escopo = package: `feat(blocks): add wizard-steps block`.
Corpo: por que é genérico + consumidores previstos. Um componente por PR (rule geral).

## 6. Abrir a PR

```bash
gh pr create --title "feat(blocks): add wizard-steps" --body-file <corpo>
```

O corpo segue `.github/PULL_REQUEST_TEMPLATE.md`: o que foi criado, por que pertence ao Orion
(consumidores nomeados), validações executadas (com saída dos gates), checklist preenchido.

**Proibido**: `gh pr merge`, auto-approve, push direto na `main`. A PR fica aberta para revisão
humana (`ai/workflows/review-pr.md` é o roteiro do revisor).
