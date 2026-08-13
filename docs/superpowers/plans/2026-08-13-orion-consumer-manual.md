# Orion Consumer Manual Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publicar manual canônico para instalar e adotar Orion em Next.js ou Vite e tornar skills oficiais capazes de conduzir projeto novo e migração gradual de outra biblioteca.

**Architecture:** Manter uma fonte humana canônica em `docs/adoption/consumer-setup.md`. Skills oficiais carregam somente decisão e sequência operacional, apontando ao manual para detalhes. Stubs repetem apenas frontmatter e ponteiro, evitando cópia do workflow.

**Tech Stack:** React 19, TypeScript, Next.js App Router, Vite, Tailwind CSS v4, npm/pnpm/Yarn, Markdown, Agent Skills.

## Global Constraints

- Packages públicos: `@design-systems-orion/tokens`, `@design-systems-orion/ui`, `@design-systems-orion/blocks`.
- Registry: `https://registry.npmjs.org`; consumo sem token ou `.npmrc`.
- React 19, conforme peer dependencies publicadas.
- Tailwind CSS v4 CSS-first; não criar `tailwind.config.ts`.
- Tema ativado por CSS variables e `data-brand`; nunca por prop `brand`.
- Next.js usa App Router; Vite usa plugin oficial `@tailwindcss/vite`.
- Imports Orion usam subpaths públicos; nenhum caminho para `src` ou repositório local.
- Migração preserva hooks, APIs, autenticação, permissões, rotas, validações e ações.
- Uma tela ou componente de baixo risco por vez; biblioteca antiga pode coexistir até não possuir consumidores.
- Nenhuma mudança em repositórios consumidores nesta implementação.

---

### Task 1: Manual canônico de instalação e adoção

**Files:**
- Modify: `docs/adoption/consumer-setup.md`

**Interfaces:**
- Consumes: exports e peers declarados em `packages/{tokens,ui,blocks}/package.json`.
- Produces: fonte de verdade referenciada por README dos packages e pelas duas skills.

- [ ] **Step 1: Registrar falhas atuais do manual**

Run:

```powershell
rg -n "^## |pnpm add|Next.js|Vite|npm install|yarn add|biblioteca antiga|Troubleshooting" docs/adoption/consumer-setup.md
```

Expected: comandos somente para pnpm; nenhuma receita Vite; nenhuma estratégia completa de
coexistência e retirada da biblioteca anterior.

- [ ] **Step 2: Reescrever manual com navegação por cenário**

Usar esta ordem de seções:

```text
1. Compatibilidade e packages
2. Instalação pelo npm (npm, pnpm e Yarn)
3. Projeto novo com Next.js
4. Projeto novo com Vite
5. Projeto existente
6. Tokens, tema e Tailwind v4
7. Primeiro componente
8. Adaptadores locais
9. Migração de outra biblioteca
10. Atualização de versão
11. Troubleshooting
12. Checklist final
```

Incluir comandos equivalentes:

```bash
npm install @design-systems-orion/tokens @design-systems-orion/ui @design-systems-orion/blocks
pnpm add @design-systems-orion/tokens @design-systems-orion/ui @design-systems-orion/blocks
yarn add @design-systems-orion/tokens @design-systems-orion/ui @design-systems-orion/blocks
```

Incluir peers por package, deixando claro que gerenciadores modernos podem instalá-los
automaticamente, mas as versões precisam respeitar os ranges publicados. Incluir criação Next.js:

```bash
npx create-next-app@latest meu-portal --typescript --tailwind --eslint --app
```

Incluir criação Vite:

```bash
npm create vite@latest meu-portal -- --template react-ts
cd meu-portal
npm install
npm install tailwindcss @tailwindcss/vite
```

Mostrar `vite.config.ts` com `tailwindcss()` e `react()`. Mostrar CSS canônico:

```css
@import "tailwindcss";
@import "@design-systems-orion/tokens/base.css";
@import "@design-systems-orion/tokens/themes/orion.css";
@source "../node_modules/@design-systems-orion/ui/dist";
@source "../node_modules/@design-systems-orion/blocks/dist";
```

Explicar que cada `@source` é relativo ao arquivo CSS. Usar profundidade específica para
`apps/web/src/app/globals.css` no exemplo Next.js e `src/index.css` no exemplo Vite.

Mostrar primeiro uso com imports por subpath:

```tsx
import { Button } from "@design-systems-orion/ui/button";
import { PageHeader } from "@design-systems-orion/blocks/page-header";
```

Documentar adaptadores `components/orion/ui.ts` e `components/orion/blocks.ts`, coexistência,
mapeamento por comportamento, sequência por fatia vertical, busca de imports remanescentes e
remoção da dependência antiga somente após typecheck, build e smoke test.

- [ ] **Step 3: Confirmar cobertura do manual**

Run:

```powershell
rg -n "npm install|pnpm add|yarn add|create-next-app|create vite|@tailwindcss/vite|data-brand|@source|transpilePackages|biblioteca|Troubleshooting|Checklist" docs/adoption/consumer-setup.md
```

Expected: todos os assuntos encontrados; `transpilePackages` descrito como desnecessário por
padrão; `@source` apontando somente para `dist`.

- [ ] **Step 4: Validar integridade textual**

Run:

```bash
pnpm check:integrity
```

Expected: `check:integrity OK`.

- [ ] **Step 5: Commit**

```bash
git add docs/adoption/consumer-setup.md
git commit -m "docs: expand Orion consumer setup"
```

---

### Task 2: Skill de migração de biblioteca existente

**Files:**
- Modify: `ai/skills/portais-orion-adoption/SKILL.md`
- Modify: `.agents/skills/portais-orion-adoption/SKILL.md`
- Modify: `.claude/skills/portais-orion-adoption/SKILL.md`

**Interfaces:**
- Consumes: contrato humano de `docs/adoption/consumer-setup.md` e catálogo de exports públicos.
- Produces: workflow acionável para migrar uma tela React/Next.js/Vite de shadcn/Radix, MUI,
  Chakra ou biblioteca interna para Orion.

- [ ] **Step 1: Executar checks RED contra limitações atuais**

Run:

```powershell
rg -n "Vite|MUI|Chakra|shadcn|biblioteca interna|coexist|remoção" ai/skills/portais-orion-adoption/SKILL.md
rg -n "ui/src|blocks/src|transpilePackages" ai/skills/portais-orion-adoption/SKILL.md
```

Expected: primeiro comando sem cobertura suficiente; segundo encontra orientação obsoleta para
`src` e `transpilePackages`.

- [ ] **Step 2: Atualizar frontmatter e workflow oficial**

Descrição deve acionar para aplicação React existente, Next.js ou Vite, incluindo substituição
gradual de outra biblioteca. Corpo deve conter:

```text
- pré-checagem do stack, package manager, React e Tailwind;
- baseline de typecheck/build/test e captura visual da tela;
- inventário de imports da biblioteca anterior;
- classificação de primitives, blocks e domínio;
- matriz comportamento atual -> subpath Orion -> adaptação necessária;
- instalação/configuração pelo manual canônico;
- adaptadores locais neutros components/orion/*;
- migração de uma fatia vertical;
- validação dos estados e acessibilidade;
- coexistência explícita;
- busca de consumidores restantes antes de desinstalar;
- rollback por reversão da fatia, sem alterar contratos de negócio.
```

Manter tabela local→Orion útil. Remover referências específicas a paths `src`, necessidade de
`transpilePackages`, barrels `grupo-*` obrigatórios e proibição genérica de Aurora. Preservar regra
contra migração em massa e mudança de auth/backend junto com UI.

- [ ] **Step 3: Sincronizar stubs**

Copiar exatamente campos `name` e `description` do frontmatter oficial para stubs `.agents` e
`.claude`. Manter somente ponteiro para `ai/skills/portais-orion-adoption/SKILL.md` no corpo.

- [ ] **Step 4: Validar estrutura e conteúdo da skill**

Run:

```powershell
python C:\Users\marce\.codex\skills\.system\skill-creator\scripts\quick_validate.py ai/skills/portais-orion-adoption
rg -n "Vite|MUI|Chakra|shadcn|coexist|desinstal|components/orion|dist" ai/skills/portais-orion-adoption/SKILL.md
rg -n "ui/src|blocks/src|transpilePackages|grupo-ui|grupo-blocks" ai/skills/portais-orion-adoption/SKILL.md
```

Expected: validator retorna sucesso; segundo comando encontra todos os conceitos; terceiro não
encontra orientação ativa obsoleta.

- [ ] **Step 5: Commit**

```bash
git add ai/skills/portais-orion-adoption/SKILL.md .agents/skills/portais-orion-adoption/SKILL.md .claude/skills/portais-orion-adoption/SKILL.md
git commit -m "docs(skill): expand Orion migration workflow"
```

---

### Task 3: Skill para projeto novo em Next.js ou Vite

**Files:**
- Modify: `ai/skills/new-portal/SKILL.md`
- Modify: `.agents/skills/new-portal/SKILL.md`
- Modify: `.claude/skills/new-portal/SKILL.md`

**Interfaces:**
- Consumes: receitas Next.js/Vite do manual atualizado.
- Produces: workflow curto para criar consumidor Orion novo em repo separado.

- [ ] **Step 1: Executar checks RED contra orientação atual**

Run:

```powershell
rg -n "Vite|@tailwindcss/vite|transpilePackages" ai/skills/new-portal/SKILL.md
```

Expected: Vite ausente e `transpilePackages` tratado como necessário.

- [ ] **Step 2: Atualizar skill oficial**

Descrição deve acionar para projeto React novo com Next.js ou Vite. Sequência deve:

```text
1. Confirmar repo separado e escolher Next.js App Router ou Vite.
2. Gerar scaffold TypeScript + Tailwind v4 segundo manual.
3. Instalar packages Orion públicos e peers compatíveis.
4. Configurar tokens, tema e @source relativo ao CSS.
5. Criar adaptadores components/orion/*.
6. Criar smoke page com Button e PageHeader.
7. Rodar typecheck, build e dev.
```

Declarar que `transpilePackages` não é necessário por padrão porque npm contém ESM compilado em
`dist`. Manter domínio no consumidor e gaps genéricos no backlog Orion.

- [ ] **Step 3: Sincronizar stubs**

Copiar exatamente frontmatter oficial para `.agents` e `.claude`; manter seus corpos como ponteiro.

- [ ] **Step 4: Validar skill**

Run:

```powershell
python C:\Users\marce\.codex\skills\.system\skill-creator\scripts\quick_validate.py ai/skills/new-portal
rg -n "Next.js|Vite|@tailwindcss/vite|dist|components/orion|typecheck|build" ai/skills/new-portal/SKILL.md
```

Expected: validator retorna sucesso e todos os conceitos aparecem.

- [ ] **Step 5: Commit**

```bash
git add ai/skills/new-portal/SKILL.md .agents/skills/new-portal/SKILL.md .claude/skills/new-portal/SKILL.md
git commit -m "docs(skill): support Next and Vite consumers"
```

---

### Task 4: Consistência e gates do repositório

**Files:**
- Verify: `docs/adoption/consumer-setup.md`
- Verify: `ai/skills/{new-portal,portais-orion-adoption}/SKILL.md`
- Verify: `.agents/skills/{new-portal,portais-orion-adoption}/SKILL.md`
- Verify: `.claude/skills/{new-portal,portais-orion-adoption}/SKILL.md`

**Interfaces:**
- Consumes: entregáveis das Tasks 1–3.
- Produces: conjunto coerente e validado, sem instruções legadas.

- [ ] **Step 1: Verificar referências e instruções legadas**

Run:

```powershell
rg -n "@design-systems-orion|consumer-setup|portais-orion-adoption" docs/adoption ai/skills .agents/skills/new-portal .agents/skills/portais-orion-adoption .claude/skills/new-portal .claude/skills/portais-orion-adoption
rg -n "@design-systems-orion/(ui|blocks)/src|transpilePackages enquanto|components/grupo-|@grupo/|@mateusarcestr/|@supertrans-transportes/" docs/adoption ai/skills/new-portal ai/skills/portais-orion-adoption
```

Expected: primeiro comando mostra referências coerentes; segundo não encontra recomendação ativa
legada, exceto scopes antigos dentro de seção explicitamente marcada como proibida.

- [ ] **Step 2: Executar gates obrigatórios**

Run:

```bash
pnpm check
pnpm typecheck
pnpm build
```

Expected: três comandos encerram com exit code 0.

- [ ] **Step 3: Revisar diff e placeholders**

Run:

```powershell
git diff --check
rg -n "implementar depois|preencher depois|pendente de definição" docs/adoption/consumer-setup.md ai/skills/new-portal/SKILL.md ai/skills/portais-orion-adoption/SKILL.md
git status --short
```

Expected: dois primeiros comandos sem saída; status contém somente plano, se ainda não commitado.

- [ ] **Step 4: Commit do plano e ajustes finais**

```bash
git add docs/superpowers/plans/2026-08-13-orion-consumer-manual.md
git commit -m "docs: add Orion adoption implementation plan"
```
