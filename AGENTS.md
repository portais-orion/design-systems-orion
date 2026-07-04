# AGENTS.md — Núcleo de Portais do Grupo

Ponto de entrada único para agentes de IA. Contexto detalhado vive em `ai/` — carregue apenas o que a tarefa pedir (ver `ai/context/00-read-first.md`).

## Natureza do projeto

Este projeto é o **Núcleo de Portais do Grupo**, não uma biblioteca específica da Supertrans ou do Aurora. É a plataforma interna para design system compartilhado, tokens/temas por empresa, Storybook oficial, documentação arquitetural e estrutura de desenvolvimento assistido por agentes. Produtos (portais) vivem em repositórios separados e consomem os packages daqui por versão.

## Estrutura

```
apps/storybook/        Storybook oficial (toolbar de marca Supertrans/Aurora)
packages/tokens/       @grupo/tokens — base.css + themes/{supertrans,aurora}.css
packages/ui/           @grupo/ui — primitives (Base UI + Tailwind v4 + cva)
packages/blocks/       @grupo/blocks — composições (vazio na Sprint 0)
packages/tsconfig/     @grupo/tsconfig
packages/biome-config/ @grupo/biome-config
docs/adr/              decisões de arquitetura (fonte de verdade)
docs/architecture/     overview, packages, theming, camadas, storybook, migração
ai/                    context, rules, workflows, skills, prompts, examples, checklists
```

## Comandos

```bash
pnpm install            # instalar
pnpm build              # turbo build (typecheck dos packages + build do storybook)
pnpm check              # biome lint + format check
pnpm typecheck          # turbo typecheck
pnpm storybook          # storybook dev na porta 6006
pnpm build:storybook    # build estático do storybook
pnpm changeset          # registrar mudança de package
pnpm test:storybook     # stories como testes (requer playwright install chromium, 1x)
pnpm chromatic          # visual tests na nuvem (requer CHROMATIC_PROJECT_TOKEN)
```

## Regras fundamentais

- Este projeto é o Núcleo de Portais do Grupo, não uma biblioteca específica da Supertrans ou do Aurora.
- Shared packages não podem conter domínio de negócio.
- Componentes compartilhados não podem conter rotas, endpoints, permissões reais, services ou hooks de API dos portais.
- Temas devem ser resolvidos por CSS variables, nunca por props como `brand="aurora"`.
- Não usar hex colors diretamente dentro de componentes (hex só em `packages/tokens/src/themes/*`).
- Não usar classes específicas de marca como `orange-*`, `blue-*`, `primary-600` dentro dos packages compartilhados.
- Todo componente compartilhado deve ter story.
- Todo componente deve ser validado nas marcas Supertrans e Aurora.

## O que NUNCA fazer

- Alterar os repositórios `portal-supertrans` ou `Portal-Aurora` a partir de tarefas deste repo.
- Usar `@radix-ui/*` (ADR 0004 — Base UI é o único headless; `render`, não `asChild`).
- Criar `tailwind.config.ts` (ADR 0003 — Tailwind v4 é CSS-first).
- Copiar código Radix/TW3 do Aurora — recriar seguindo `ai/workflows/recreate-from-aurora.md`.
- Adicionar block sem 2+ consumidores reais previstos (regra dos dois usos).
- Contornar uma ADR; conflito → parar e reportar.
- Declarar sucesso sem executar `pnpm check && pnpm typecheck && pnpm build`.

## Onde buscar contexto

| Tarefa | Ler |
|---|---|
| Qualquer | `ai/context/00-read-first.md` |
| Componente | `ai/context/03-component-rules.md` + `ai/rules/components.md` + `ai/workflows/create-component.md` |
| Tokens/tema | `ai/context/04-token-rules.md` + `ai/rules/tokens.md` + `ai/workflows/add-brand-theme.md` |
| Block | `ai/rules/blocks.md` + `ai/workflows/create-block.md` |
| Decisão/arquitetura | `ai/context/02-current-decisions.md` → `docs/adr/` |
| Migração dos portais | `ai/context/05-*.md`, `ai/context/06-*.md` |

## Como criar componentes

Seguir `ai/workflows/create-component.md`. Referência canônica: `packages/ui/src/button/`. Estrutura: `src/<nome>/{<nome>.tsx, <nome>.stories.tsx, index.ts}` + export no barrel. Extração do Supertrans e recriação do Aurora têm workflows próprios.

## Como mexer em tokens

Seguir `ai/context/04-token-rules.md`. Token novo entra no `@theme inline` do base.css, com default neutro em `:root` e valor em TODOS os temas. Cor de marca nunca entra no base.css.

## Como validar mudanças

`pnpm check && pnpm typecheck && pnpm build` + abrir a story no Storybook e alternar a marca na toolbar (Supertrans e Aurora) + preencher o checklist de `ai/checklists/` correspondente + changeset quando mudar package consumível.

## Como evitar acoplamento com domínio

Teste rápido de `ai/rules/no-domain-in-shared-packages.md`: "este código faria sentido num terceiro portal de outra empresa criado amanhã?" Se não, é Camada 3 e fica no produto. Dados por props, conteúdo por slots, integrações por providers injetados.
