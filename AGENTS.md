# AGENTS.md â€” NÃºcleo de Portais do Grupo

Ponto de entrada Ãºnico para agentes de IA. Contexto detalhado vive em `ai/` â€” carregue apenas o que a tarefa pedir (ver `ai/context/00-read-first.md`).

## Natureza do projeto

Este projeto Ã© o **NÃºcleo de Portais do Grupo**, nÃ£o uma biblioteca especÃ­fica da Supertrans ou do Aurora. Ã‰ a plataforma interna para design system compartilhado, tokens/temas por empresa, Storybook oficial, documentaÃ§Ã£o arquitetural e estrutura de desenvolvimento assistido por agentes. Produtos (portais) vivem em repositÃ³rios separados e consomem os packages daqui por versÃ£o.

## Estrutura

```
apps/storybook/        Storybook oficial (toolbar de marca Supertrans/Aurora)
packages/tokens/       @supertrans-transportes/tokens â€” base.css + themes/{supertrans,aurora}.css
packages/ui/           @supertrans-transportes/ui â€” primitives (Base UI + Tailwind v4 + cva)
packages/blocks/       @supertrans-transportes/blocks â€” composiÃ§Ãµes (vazio na Sprint 0)
packages/tsconfig/     @supertrans-transportes/tsconfig
packages/biome-config/ @supertrans-transportes/biome-config
docs/adr/              decisÃµes de arquitetura (fonte de verdade)
docs/architecture/     overview, packages, theming, camadas, storybook, migraÃ§Ã£o
ai/                    context, rules, workflows, skills, prompts, examples, checklists
```

## Comandos

```bash
pnpm install            # instalar
pnpm build              # turbo build (typecheck dos packages + build do storybook)
pnpm check              # biome lint + format check
pnpm typecheck          # turbo typecheck
pnpm storybook          # storybook dev na porta 6006
pnpm build:storybook    # build estÃ¡tico do storybook
pnpm changeset          # registrar mudanÃ§a de package
pnpm test:storybook     # stories como testes (requer playwright install chromium, 1x)
pnpm chromatic          # visual tests na nuvem (requer CHROMATIC_PROJECT_TOKEN)
```

## Regras fundamentais

- Este projeto Ã© o NÃºcleo de Portais do Grupo, nÃ£o uma biblioteca especÃ­fica da Supertrans ou do Aurora.
- Shared packages nÃ£o podem conter domÃ­nio de negÃ³cio.
- Componentes compartilhados nÃ£o podem conter rotas, endpoints, permissÃµes reais, services ou hooks de API dos portais.
- Temas devem ser resolvidos por CSS variables, nunca por props como `brand="aurora"`.
- NÃ£o usar hex colors diretamente dentro de componentes (hex sÃ³ em `packages/tokens/src/themes/*`).
- NÃ£o usar classes especÃ­ficas de marca como `orange-*`, `blue-*`, `primary-600` dentro dos packages compartilhados.
- Todo componente compartilhado deve ter story.
- Todo componente deve ser validado nas marcas Supertrans e Aurora.

## O que NUNCA fazer

- Alterar os repositÃ³rios `portal-supertrans` ou `Portal-Aurora` a partir de tarefas deste repo.
- Usar `@radix-ui/*` (ADR 0004 â€” Base UI Ã© o Ãºnico headless; `render`, nÃ£o `asChild`).
- Criar `tailwind.config.ts` (ADR 0003 â€” Tailwind v4 Ã© CSS-first).
- Copiar cÃ³digo Radix/TW3 do Aurora â€” recriar seguindo `ai/workflows/recreate-from-aurora.md`.
- Adicionar block sem 2+ consumidores reais previstos (regra dos dois usos).
- Contornar uma ADR; conflito â†’ parar e reportar.
- Declarar sucesso sem executar `pnpm check && pnpm typecheck && pnpm build`.

## Onde buscar contexto

| Tarefa | Ler |
|---|---|
| Qualquer | `ai/context/00-read-first.md` |
| Componente | `ai/context/03-component-rules.md` + `ai/rules/components.md` + `ai/workflows/create-component.md` |
| Tokens/tema | `ai/context/04-token-rules.md` + `ai/rules/tokens.md` + `ai/workflows/add-brand-theme.md` |
| Block | `ai/rules/blocks.md` + `ai/workflows/create-block.md` |
| DecisÃ£o/arquitetura | `ai/context/02-current-decisions.md` â†’ `docs/adr/` |
| MigraÃ§Ã£o dos portais | `ai/context/05-*.md`, `ai/context/06-*.md` |

## Como criar componentes

Seguir `ai/workflows/create-component.md`. ReferÃªncia canÃ´nica: `packages/ui/src/button/`. Estrutura: `src/<nome>/{<nome>.tsx, <nome>.stories.tsx, index.ts}` + export no barrel. ExtraÃ§Ã£o do Supertrans e recriaÃ§Ã£o do Aurora tÃªm workflows prÃ³prios.

## Como mexer em tokens

Seguir `ai/context/04-token-rules.md`. Token novo entra no `@theme inline` do base.css, com default neutro em `:root` e valor em TODOS os temas. Cor de marca nunca entra no base.css.

## Como validar mudanÃ§as

`pnpm check && pnpm typecheck && pnpm build` + abrir a story no Storybook e alternar a marca na toolbar (Supertrans e Aurora) + preencher o checklist de `ai/checklists/` correspondente + changeset quando mudar package consumÃ­vel.

## Como evitar acoplamento com domÃ­nio

Teste rÃ¡pido de `ai/rules/no-domain-in-shared-packages.md`: "este cÃ³digo faria sentido num terceiro portal de outra empresa criado amanhÃ£?" Se nÃ£o, Ã© Camada 3 e fica no produto. Dados por props, conteÃºdo por slots, integraÃ§Ãµes por providers injetados.
