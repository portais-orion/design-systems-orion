# 🏗️ Núcleo de Portais do Grupo

![tokens version](https://img.shields.io/badge/@portais--orion/tokens-0.1.1-blue?style=flat-square)
![ui version](https://img.shields.io/badge/@portais--orion/ui-0.3.0-blue?style=flat-square)
![blocks version](https://img.shields.io/badge/@portais--orion/blocks-0.3.1-blue?style=flat-square)
<!-- Badge de CI: ativar junto com o workflow (ver docs/ci/README.md) -->
![build status](https://img.shields.io/badge/build-passing-brightgreen?style=flat-square)
<!-- ![Storybook](https://img.shields.io/badge/Storybook-deployed-ff4785?style=flat-square&logo=storybook&logoColor=white) -->

**Plataforma interna do grupo** — design system compartilhado (tokens, primitives, blocks), Storybook oficial, documentação arquitetural e estrutura de desenvolvimento assistido por agentes de IA.

> **Não é** uma biblioteca da Supertrans nem uma cópia do Aurora — é a curadoria do melhor dos dois portais, mantida como plataforma para todas as empresas do grupo.

---

## 📖 Visão Geral

O `nucleo-portais` é a base oficial para criação, padronização e evolução dos portais das empresas do grupo.

### O que vive aqui

- **Design system** — tokens semânticos, primitives (UI) e composições genéricas (blocks)
- **Storybook oficial** — documentação visual com toolbar de marca (Supertrans/Aurora)
- **Site de docs** — `apps/docs` (Fumadocs + Next), páginas geradas das fontes via `scripts/generate-docs.mjs`
- **Documentação arquitetural** — ADRs, guias de arquitetura e decisões de design
- **Infraestrutura de agentes IA** — contexto, regras, workflows, skills e checklists

### O que **não** vive aqui

Produtos, telas, domínio de negócio, hooks de API, permissões reais, auth. Produtos ficam em repositórios próprios ([ADR 0007](docs/adr/0007-repos-produtos-separados.md)) e consomem os packages por versão.

### Marcas atendidas

Atualmente: **Supertrans** e **Aurora**. Adicionar uma nova marca = criar `themes/<marca>.css` no package de tokens (ver [workflow](ai/workflows/add-brand-theme.md)).

---

## 🛠️ Stack Tecnológica

| Tecnologia | Uso |
|---|---|
| **React 19** | Runtime de componentes |
| **Tailwind CSS v4** | Estilização CSS-first (sem `tailwind.config.ts` — [ADR 0003](docs/adr/0003-tailwind-v4-css-first.md)) |
| **Base UI (MUI)** | Headless primitives ([ADR 0004](docs/adr/0004-base-ui-como-primitivo-headless.md), substitui Radix) |
| **cva + tailwind-merge** | Variants de componentes |
| **Turborepo** | Orquestração de monorepo ([ADR 0002](docs/adr/0002-pnpm-turborepo.md)) |
| **pnpm 9** | Package manager (workspaces) |
| **Storybook 10** | Documentação e preview visual |
| **Changesets** | Versionamento semântico |
| **Biome** | Lint + format |
| **tsup** | Build de dist (ESM + `.d.ts`) |
| **TypeScript 5.7** | Tipagem estática |

---

## 📦 Packages

| Camada | Package | Versão | Descrição |
|---|---|---|---|
| 0 — Tokens | `@portais-orion/tokens` | 0.1.1 | Tokens semânticos + temas por marca (CSS puro) |
| 1 — UI | `@portais-orion/ui` | 0.3.0 | 28 primitives (Base UI + Tailwind v4 + cva) |
| 2 — Blocks | `@portais-orion/blocks` | 0.3.1 | 32 composições genéricas (DataTable, AppShell, layouts…) |
| Infra | `@portais-orion/tsconfig` | privado | TSConfigs compartilhados (`base`, `react-library`, `nextjs`) |
| Infra | `@portais-orion/biome-config` | privado | Config Biome compartilhada (tab, 100 col, double quotes) |

Regra de corte entre camadas: se o componente conhece entidade de negócio, rota, endpoint ou chave de permissão real, é **Camada 3** e fica no produto ([ADR 0006](docs/adr/0006-camadas-ui-blocks-apps.md)).

---

## 🧩 Catálogo de Componentes

<details>
<summary><strong>UI Primitives — 28 componentes</strong> (<code>@portais-orion/ui</code>)</summary>

| Componente | Import |
|---|---|
| Accordion | `@portais-orion/ui/accordion` |
| Alert | `@portais-orion/ui/alert` |
| Alert Dialog | `@portais-orion/ui/alert-dialog` |
| Avatar | `@portais-orion/ui/avatar` |
| Badge | `@portais-orion/ui/badge` |
| Button | `@portais-orion/ui/button` |
| Card | `@portais-orion/ui/card` |
| Checkbox | `@portais-orion/ui/checkbox` |
| Combobox | `@portais-orion/ui/combobox` |
| Dialog | `@portais-orion/ui/dialog` |
| Dropdown Menu | `@portais-orion/ui/dropdown-menu` |
| Input | `@portais-orion/ui/input` |
| Label | `@portais-orion/ui/label` |
| Multi Select | `@portais-orion/ui/multi-select` |
| Popover | `@portais-orion/ui/popover` |
| Progress | `@portais-orion/ui/progress` |
| Radio Group | `@portais-orion/ui/radio-group` |
| Scroll Area | `@portais-orion/ui/scroll-area` |
| Select | `@portais-orion/ui/select` |
| Separator | `@portais-orion/ui/separator` |
| Sheet | `@portais-orion/ui/sheet` |
| Skeleton | `@portais-orion/ui/skeleton` |
| Spinner | `@portais-orion/ui/spinner` |
| Switch | `@portais-orion/ui/switch` |
| Table | `@portais-orion/ui/table` |
| Tabs | `@portais-orion/ui/tabs` |
| Textarea | `@portais-orion/ui/textarea` |
| Tooltip | `@portais-orion/ui/tooltip` |

</details>

<details>
<summary><strong>Blocks — 32 composições</strong> (<code>@portais-orion/blocks</code>)</summary>

| Componente | Import |
|---|---|
| App Shell | `@portais-orion/blocks/app-shell` |
| Breadcrumbs | `@portais-orion/blocks/breadcrumbs` |
| Code Badge | `@portais-orion/blocks/code-badge` |
| Confirm Dialog | `@portais-orion/blocks/confirm-dialog` |
| Content Card | `@portais-orion/blocks/content-card` |
| CRUD Modal Header | `@portais-orion/blocks/crud-modal-header` |
| Dashboard Page Layout | `@portais-orion/blocks/dashboard-page-layout` |
| Data Table | `@portais-orion/blocks/data-table` |
| Detail Page Layout | `@portais-orion/blocks/detail-page-layout` |
| Empty State | `@portais-orion/blocks/empty-state` |
| Error State | `@portais-orion/blocks/error-state` |
| Field Group | `@portais-orion/blocks/field-group` |
| Filter Pill | `@portais-orion/blocks/filter-pill` |
| Filters Card | `@portais-orion/blocks/filters-card` |
| Form Actions | `@portais-orion/blocks/form-actions` |
| Form Field | `@portais-orion/blocks/form-field` |
| Form Message | `@portais-orion/blocks/form-message` |
| Form Page Layout | `@portais-orion/blocks/form-page-layout` |
| Form Section | `@portais-orion/blocks/form-section` |
| Launcher Card | `@portais-orion/blocks/launcher-card` |
| List Page Layout | `@portais-orion/blocks/list-page-layout` |
| Loading Overlay | `@portais-orion/blocks/loading-overlay` |
| Navigation | `@portais-orion/blocks/navigation` |
| Page Header | `@portais-orion/blocks/page-header` |
| Page Layout | `@portais-orion/blocks/page-layout` |
| Pagination | `@portais-orion/blocks/pagination` |
| Search Bar | `@portais-orion/blocks/search-bar` |
| Section Header | `@portais-orion/blocks/section-header` |
| Sidebar | `@portais-orion/blocks/sidebar` |
| Status Cards | `@portais-orion/blocks/status-cards` |
| Status Dot | `@portais-orion/blocks/status-dot` |
| Table Skeleton Rows | `@portais-orion/blocks/table-skeleton-rows` |

> **Page Examples** (`page-examples`) contém stories de exemplo de telas completas e não é exportado como componente consumível.

</details>

---

## ✅ Requisitos

- **Node** ≥ 22
- **pnpm** ≥ 9 — ative com `corepack enable`
- **Git**

---

## 🚀 Quick Start

```bash
git clone https://github.com/portais-orion/nucleo-portais.git
cd nucleo-portais
pnpm install
pnpm storybook        # abre o Storybook em http://localhost:6006
```

Na toolbar do Storybook, o seletor **Marca** alterna os temas Supertrans ↔ Aurora — todo componente deve funcionar nas duas marcas.

> **Após cada `git pull`**: rode `pnpm install` antes de `pnpm storybook` — o lockfile chega atualizado, mas o `node_modules` local não é tocado pelo git.

---

## 📋 Scripts

| Comando | Descrição |
|---|---|
| `pnpm install` | Instala todas as dependências do monorepo |
| `pnpm build` | Build de todos os workspaces via Turborepo |
| `pnpm check` | Biome lint + format check |
| `pnpm typecheck` | TypeScript check em todos os packages |
| `pnpm storybook` | Dev server do Storybook (porta 6006) |
| `pnpm build:storybook` | Build estático do Storybook |
| `pnpm changeset` | Registra mudança para versionamento semântico |
| `pnpm test:storybook` | Roda stories como testes (requer `playwright install chromium`, 1×) |
| `pnpm chromatic` | Visual tests na nuvem (requer `CHROMATIC_PROJECT_TOKEN`) |
| `pnpm check:pureza` | Valida que packages não contêm domínio de negócio |
| `pnpm pack:all` | Empacota tokens/ui/blocks como tarballs |
| `pnpm publish:packages` | Publica no GitHub Packages (`@portais-orion`) |

---

## 📁 Estrutura do Repositório

```
nucleo-portais/
├── apps/
│   ├── storybook/              # Storybook oficial (toolbar de marca Supertrans/Aurora)
│   └── docs/                   # Site de documentação (Fumadocs + Next) — MDX gerado das fontes
├── packages/
│   ├── tokens/                 # Camada 0 — base.css + themes/{supertrans,aurora}.css
│   ├── ui/                     # Camada 1 — primitives (Base UI + TW4 + cva)
│   ├── blocks/                 # Camada 2 — composições genéricas (dados por props, sem domínio)
│   ├── tsconfig/               # TSConfigs compartilhados
│   └── biome-config/           # Config Biome compartilhada
├── docs/
│   ├── adr/                    # Architecture Decision Records (8 ADRs)
│   ├── architecture/           # Visão geral, packages, theming, camadas, storybook
│   └── adoption/               # Guia de consumo por novos portais
├── ai/                         # Contexto, regras, workflows, skills para agentes de IA
├── scripts/                    # Utilidades de build e release
├── .changeset/                 # Configuração do Changesets
├── .github/                    # Workflows do GitHub Actions
├── AGENTS.md                   # Ponto de entrada para agentes de IA
└── README.md                   # ← Você está aqui
```

**Convenções de código:** kebab-case em nomes de arquivos; um componente por pasta (`button/button.tsx` + `button.stories.tsx` + `index.ts`); story colocalizada obrigatória; barrel export em `src/index.ts`.

---

## 🎨 Theming

O sistema de temas é baseado em **CSS variables** ([ADR 0005](docs/adr/0005-temas-por-css-variables.md)):

1. **`base.css`** — bloco `@theme inline` (Tailwind v4) mapeando tokens semânticos (`--color-*`) para CSS variables, com defaults neutros em `:root`. Não contém cor de marca.

2. **`themes/supertrans.css`** — azul petróleo (`#00526b`), accent `#3caec4`, sidebar navy.

3. **`themes/aurora.css`** — laranja (`#f97316`), accent `#fb923c`, sidebar slate.

A marca ativa é definida por `data-brand` no `<html>`:

```html
<html lang="pt-BR" data-brand="supertrans">
```

### Adicionar uma nova marca

Crie `packages/tokens/src/themes/<marca>.css` redefinindo os tokens de identidade. Veja o [workflow completo](ai/workflows/add-brand-theme.md).

### Regras nos packages compartilhados

- ❌ Hex direto em componentes (hex só nos temas)
- ❌ Classes de marca (`orange-*`, `blue-*`, `primary-600`)
- ❌ Prop `brand` em componentes
- ❌ `tailwind.config.ts`

Para detalhes, veja [`docs/architecture/theming.md`](docs/architecture/theming.md).

---

## 🔌 Consumindo em um Portal

Resumo rápido — guia completo em [`docs/adoption/consumer-setup.md`](docs/adoption/consumer-setup.md).

### 1. Autenticação

Configure o `.npmrc` com o scope `@portais-orion` apontando para GitHub Packages:

```ini
@portais-orion:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_PACKAGES_TOKEN}
```

### 2. Instalação

```bash
pnpm add @portais-orion/tokens @portais-orion/ui @portais-orion/blocks
```

### 3. Tokens + marca

```css
/* globals.css */
@import "@portais-orion/tokens/base.css";
@import "@portais-orion/tokens/themes/supertrans.css";
```

```tsx
// layout.tsx
<html lang="pt-BR" data-brand="supertrans">
```

### 4. Tailwind `@source` + `transpilePackages`

```css
@source "../../node_modules/@portais-orion/ui/src";
@source "../../node_modules/@portais-orion/blocks/src";
```

```ts
// next.config.ts
transpilePackages: ["@portais-orion/ui", "@portais-orion/blocks"]
```

### 5. Usar componentes

```tsx
import { Button } from "@portais-orion/ui/button";
import { DataTable } from "@portais-orion/blocks/data-table";
import { PageHeader } from "@portais-orion/blocks/page-header";
```

---

## 📐 Architecture Decision Records

As decisões arquiteturais são documentadas como ADRs em [`docs/adr/`](docs/adr/):

| # | Decisão | Link |
|---|---|---|
| 0001 | Núcleo de Portais como plataforma | [ADR](docs/adr/0001-nucleo-de-portais.md) |
| 0002 | pnpm + Turborepo | [ADR](docs/adr/0002-pnpm-turborepo.md) |
| 0003 | Tailwind v4 CSS-first (sem `tailwind.config.ts`) | [ADR](docs/adr/0003-tailwind-v4-css-first.md) |
| 0004 | Base UI como primitivo headless (substitui Radix) | [ADR](docs/adr/0004-base-ui-como-primitivo-headless.md) |
| 0005 | Temas por CSS variables | [ADR](docs/adr/0005-temas-por-css-variables.md) |
| 0006 | Camadas UI → Blocks → Apps | [ADR](docs/adr/0006-camadas-ui-blocks-apps.md) |
| 0007 | Repositórios de produtos separados | [ADR](docs/adr/0007-repos-produtos-separados.md) |
| 0008 | Agent-first repository | [ADR](docs/adr/0008-agent-first-repository.md) |

---

## 🤖 Desenvolvimento Assistido por IA

Este é um **agent-first repository** ([ADR 0008](docs/adr/0008-agent-first-repository.md)). O diretório `ai/` contém toda a infraestrutura de contexto para agentes de IA:

```
ai/
├── context/       # Contexto fatiado por tarefa (carregue só o necessário)
├── rules/         # Regras específicas (componentes, tokens, blocks, domínio)
├── workflows/     # Passo a passo para tarefas recorrentes
├── skills/        # Skills reutilizáveis (ex: portais-orion-adoption)
├── checklists/    # Checklists de validação
└── prompts/       # Templates de prompt
```

**Ponto de entrada para agentes:** [`AGENTS.md`](AGENTS.md) + [`ai/context/00-read-first.md`](ai/context/00-read-first.md)

**Skill de adoção:** a skill [`portais-orion-adoption`](ai/skills/portais-orion-adoption/SKILL.md) guia a migração de telas de portais existentes para consumir os packages do Núcleo.

---

## 🤝 Contribuindo

### Regras essenciais

- Todo componente compartilhado **deve ter story colocalizada**
- Validar componentes nas **duas marcas** (Supertrans e Aurora) via toolbar do Storybook
- Rodar gates antes de commit: `pnpm check && pnpm typecheck && pnpm build`
- Registrar **changeset** ao alterar package consumível: `pnpm changeset`
- Hex colors **somente** em `packages/tokens/src/themes/*`
- Usar **Base UI** como headless — nunca `@radix-ui/*` ([ADR 0004](docs/adr/0004-base-ui-como-primitivo-headless.md))
- **Não** criar `tailwind.config.ts` ([ADR 0003](docs/adr/0003-tailwind-v4-css-first.md))
- Componentes compartilhados **não podem conter domínio** (rotas, endpoints, permissões, hooks de API)

### Convenções

- Nomenclatura: **kebab-case** para arquivos e pastas
- Estrutura de componente: `src/<nome>/<nome>.tsx` + `<nome>.stories.tsx` + `index.ts`
- Exports: barrel em `src/index.ts` + subpath export no `package.json`
- Base UI usa `render` prop, **não** `asChild`

### Teste rápido de pureza

> "Este código faria sentido num terceiro portal de outra empresa criado amanhã?"

Se não → é Camada 3 e fica no produto, não no Núcleo.

---

## 📚 Documentação Adicional

| Documento | Descrição |
|---|---|
| [`docs/architecture/overview.md`](docs/architecture/overview.md) | Visão geral da arquitetura |
| [`docs/architecture/packages.md`](docs/architecture/packages.md) | Detalhes dos packages e camadas |
| [`docs/architecture/theming.md`](docs/architecture/theming.md) | Modelo de theming em profundidade |
| [`docs/architecture/component-layering.md`](docs/architecture/component-layering.md) | Regras de camadas de componentes |
| [`docs/architecture/storybook.md`](docs/architecture/storybook.md) | Arquitetura e configuração do Storybook |
| [`docs/architecture/package-distribution.md`](docs/architecture/package-distribution.md) | Empacotamento e distribuição |
| [`docs/adoption/consumer-setup.md`](docs/adoption/consumer-setup.md) | Guia para novos portais consumirem o Núcleo |
| [`docs/migration/ui-primitives-inventory.md`](docs/migration/ui-primitives-inventory.md) | Inventário de primitives para migração |

---

## 📄 Licença

Este projeto é **proprietary** e de uso interno exclusivo do grupo. O código, documentação e artefatos contidos neste repositório não podem ser copiados, distribuídos ou utilizados fora das empresas do grupo sem autorização expressa.

> Dúvidas sobre uso e permissões: consulte a liderança técnica do grupo.
