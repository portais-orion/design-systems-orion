# 🏗️ Design System Orion

![tokens version](https://img.shields.io/badge/@design--systems--orion/tokens-0.3.1-blue?style=flat-square)
![ui version](https://img.shields.io/badge/@design--systems--orion/ui-0.4.1-blue?style=flat-square)
![blocks version](https://img.shields.io/badge/@design--systems--orion/blocks-0.5.1-blue?style=flat-square)
<!-- Badge de CI: ativar junto com o workflow (ver docs/ci/README.md) -->
![build status](https://img.shields.io/badge/build-passing-brightgreen?style=flat-square)
<!-- ![Storybook](https://img.shields.io/badge/Storybook-deployed-ff4785?style=flat-square&logo=storybook&logoColor=white) -->

**Plataforma interna do grupo** — design system compartilhado (tokens, primitives, blocks), Storybook oficial, documentação arquitetural e estrutura de desenvolvimento assistido por agentes de IA.

> **Não é** uma biblioteca da Supertrans nem uma cópia do Aurora — é a curadoria do melhor dos dois portais, mantida como plataforma para todas as empresas do grupo.

Vai consumir os packages em um portal? Veja o [guia de adoção](docs/adoption/consumer-setup.md).

---

## 📖 Visão Geral

O `nucleo-portais` (**Design System Orion**) é a base oficial para criação, padronização e evolução dos portais das empresas do grupo.

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
| 0 — Tokens | `@design-systems-orion/tokens` | 0.3.1 | Tokens semânticos + temas por marca (CSS puro) |
| 1 — UI | `@design-systems-orion/ui` | 0.4.1 | primitives (Base UI + Tailwind v4 + cva) |
| 2 — Blocks | `@design-systems-orion/blocks` | 0.5.1 | composições genéricas (DataTable, AppShell, layouts…) |
| Infra | `@design-systems-orion/tsconfig` | privado | TSConfigs compartilhados (`base`, `react-library`, `nextjs`) |
| Infra | `@design-systems-orion/biome-config` | privado | Config Biome compartilhada (tab, 100 col, double quotes) |

Regra de corte entre camadas: se o componente conhece entidade de negócio, rota, endpoint ou chave de permissão real, é **Camada 3** e fica no produto ([ADR 0006](docs/adr/0006-camadas-ui-blocks-apps.md)).

---

## 🧩 Catálogo de Componentes

<details>
<summary><strong>UI Primitives — 28 componentes</strong> (<code>@design-systems-orion/ui</code>)</summary>

| Componente | Import |
|---|---|
| Accordion | `@design-systems-orion/ui/accordion` |
| Alert | `@design-systems-orion/ui/alert` |
| Alert Dialog | `@design-systems-orion/ui/alert-dialog` |
| Avatar | `@design-systems-orion/ui/avatar` |
| Badge | `@design-systems-orion/ui/badge` |
| Button | `@design-systems-orion/ui/button` |
| Card | `@design-systems-orion/ui/card` |
| Checkbox | `@design-systems-orion/ui/checkbox` |
| Combobox | `@design-systems-orion/ui/combobox` |
| Dialog | `@design-systems-orion/ui/dialog` |
| Dropdown Menu | `@design-systems-orion/ui/dropdown-menu` |
| Input | `@design-systems-orion/ui/input` |
| Label | `@design-systems-orion/ui/label` |
| Multi Select | `@design-systems-orion/ui/multi-select` |
| Popover | `@design-systems-orion/ui/popover` |
| Progress | `@design-systems-orion/ui/progress` |
| Radio Group | `@design-systems-orion/ui/radio-group` |
| Scroll Area | `@design-systems-orion/ui/scroll-area` |
| Select | `@design-systems-orion/ui/select` |
| Separator | `@design-systems-orion/ui/separator` |
| Sheet | `@design-systems-orion/ui/sheet` |
| Skeleton | `@design-systems-orion/ui/skeleton` |
| Spinner | `@design-systems-orion/ui/spinner` |
| Switch | `@design-systems-orion/ui/switch` |
| Table | `@design-systems-orion/ui/table` |
| Tabs | `@design-systems-orion/ui/tabs` |
| Textarea | `@design-systems-orion/ui/textarea` |
| Tooltip | `@design-systems-orion/ui/tooltip` |

</details>

<details>
<summary><strong>Blocks — 32 composições</strong> (<code>@design-systems-orion/blocks</code>)</summary>

| Componente | Import |
|---|---|
| App Shell | `@design-systems-orion/blocks/app-shell` |
| Breadcrumbs | `@design-systems-orion/blocks/breadcrumbs` |
| Code Badge | `@design-systems-orion/blocks/code-badge` |
| Confirm Dialog | `@design-systems-orion/blocks/confirm-dialog` |
| Content Card | `@design-systems-orion/blocks/content-card` |
| CRUD Modal Header | `@design-systems-orion/blocks/crud-modal-header` |
| Dashboard Page Layout | `@design-systems-orion/blocks/dashboard-page-layout` |
| Data Table | `@design-systems-orion/blocks/data-table` |
| Detail Page Layout | `@design-systems-orion/blocks/detail-page-layout` |
| Empty State | `@design-systems-orion/blocks/empty-state` |
| Error State | `@design-systems-orion/blocks/error-state` |
| Field Group | `@design-systems-orion/blocks/field-group` |
| Filter Pill | `@design-systems-orion/blocks/filter-pill` |
| Filters Card | `@design-systems-orion/blocks/filters-card` |
| Form Actions | `@design-systems-orion/blocks/form-actions` |
| Form Field | `@design-systems-orion/blocks/form-field` |
| Form Message | `@design-systems-orion/blocks/form-message` |
| Form Page Layout | `@design-systems-orion/blocks/form-page-layout` |
| Form Section | `@design-systems-orion/blocks/form-section` |
| Launcher Card | `@design-systems-orion/blocks/launcher-card` |
| List Page Layout | `@design-systems-orion/blocks/list-page-layout` |
| Loading Overlay | `@design-systems-orion/blocks/loading-overlay` |
| Navigation | `@design-systems-orion/blocks/navigation` |
| Page Header | `@design-systems-orion/blocks/page-header` |
| Page Layout | `@design-systems-orion/blocks/page-layout` |
| Pagination | `@design-systems-orion/blocks/pagination` |
| Search Bar | `@design-systems-orion/blocks/search-bar` |
| Section Header | `@design-systems-orion/blocks/section-header` |
| Sidebar | `@design-systems-orion/blocks/sidebar` |
| Status Cards | `@design-systems-orion/blocks/status-cards` |
| Status Dot | `@design-systems-orion/blocks/status-dot` |
| Table Skeleton Rows | `@design-systems-orion/blocks/table-skeleton-rows` |

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
git clone https://github.com/portais-orion/design-systems-orion.git
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
| `pnpm publish:packages` | Publica no npm público (`@design-systems-orion`) |

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

### 1. Instalação

Pacotes `@design-systems-orion` são públicos no npm — sem `.npmrc`, sem token, só instalar:

```bash
pnpm add @design-systems-orion/tokens @design-systems-orion/ui @design-systems-orion/blocks
```

### 2. Tokens + marca

```css
/* globals.css */
@import "@design-systems-orion/tokens/base.css";
@import "@design-systems-orion/tokens/themes/supertrans.css";
```

```tsx
// layout.tsx
<html lang="pt-BR" data-brand="supertrans">
```

### 3. Tailwind `@source`

Os packages publicam só `dist/` (ESM pré-compilado, sem `src/` no tarball) — aponte o
`@source` para lá:

```css
@source "../../node_modules/@design-systems-orion/ui/dist";
@source "../../node_modules/@design-systems-orion/blocks/dist";
```

`transpilePackages` não é necessário: o pacote já é ESM puro, sem JSX/TS pra transformar.

### 4. Usar componentes

```tsx
import { Button } from "@design-systems-orion/ui/button";
import { DataTable } from "@design-systems-orion/blocks/data-table";
import { PageHeader } from "@design-systems-orion/blocks/page-header";
```

---

## Skills para Codex e Claude Code

Skills não vêm com `npm install`: os packages npm contêm somente o runtime. As mesmas pastas
`ai/skills/new-portal` e `ai/skills/portais-orion-adoption` seguem o padrão Agent Skills e funcionam
no Codex e no Claude Code.

### Codex

Instale pelo GitHub e reinicie o Codex.

Prompt recomendado:

```text
Use o skill-installer para instalar new-portal e portais-orion-adoption do repositório
portais-orion/design-systems-orion, nos paths ai/skills/new-portal e
ai/skills/portais-orion-adoption.
```

Ou execute no Bash:

```bash
CODEX_HOME="${CODEX_HOME:-"$HOME/.codex"}"
python3 "$CODEX_HOME/skills/.system/skill-installer/scripts/install-skill-from-github.py" \
  --repo portais-orion/design-systems-orion \
  --path ai/skills/new-portal ai/skills/portais-orion-adoption
```

Ou no PowerShell:

```powershell
$codexHome = if ($env:CODEX_HOME) { $env:CODEX_HOME } else { Join-Path $HOME ".codex" }
$installer = Join-Path $codexHome "skills/.system/skill-installer/scripts/install-skill-from-github.py"
python $installer --repo portais-orion/design-systems-orion --path ai/skills/new-portal ai/skills/portais-orion-adoption
```

### Claude Code

Copie as pastas oficiais completas de `ai/skills`, não os stubs internos de `.claude/skills` deste
monorepo. Para disponibilizá-las em todos os projetos, instale em `~/.claude/skills`. Para limitar
ao portal atual, use `.claude/skills` na raiz dele. A skill pessoal prevalece sobre uma skill de
projeto com o mesmo nome.

Bash — instalação pessoal:

```bash
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
git clone --depth 1 https://github.com/portais-orion/design-systems-orion.git "$tmp/orion"
claude_skills="${CLAUDE_SKILLS_DIR:-"$HOME/.claude/skills"}"
mkdir -p "$claude_skills"
for skill in new-portal portais-orion-adoption; do
  target="$claude_skills/$skill"
  test ! -e "$target" || { echo "Skill já existe: $target" >&2; exit 1; }
  cp -R "$tmp/orion/ai/skills/$skill" "$target"
done
```

PowerShell — instalação pessoal:

```powershell
$tempRepo = Join-Path ([IO.Path]::GetTempPath()) ("orion-skills-" + [guid]::NewGuid())
$claudeSkills = if ($env:CLAUDE_SKILLS_DIR) { $env:CLAUDE_SKILLS_DIR } else { Join-Path $HOME ".claude/skills" }
try {
  git clone --depth 1 https://github.com/portais-orion/design-systems-orion.git $tempRepo
  New-Item -ItemType Directory -Force -Path $claudeSkills | Out-Null
  foreach ($skill in @("new-portal", "portais-orion-adoption")) {
    $target = Join-Path $claudeSkills $skill
    if (Test-Path $target) { throw "Skill já existe: $target" }
    Copy-Item -Recurse (Join-Path $tempRepo "ai/skills/$skill") $target
  }
} finally {
  if (Test-Path $tempRepo) { Remove-Item -Recurse -Force $tempRepo }
}
```

Para instalação por projeto, antes do bloco defina `CLAUDE_SKILLS_DIR="$PWD/.claude/skills"` no
Bash ou `$env:CLAUDE_SKILLS_DIR = Join-Path (Get-Location) ".claude/skills"` no PowerShell. Os
comandos recusam sobrescrever uma skill existente; revise ou remova conscientemente a versão
anterior antes de reinstalar. Claude Code detecta mudanças em um
diretório de skills já existente; reinicie apenas se `.claude/skills` foi criado depois de iniciar
a sessão. Acione diretamente com `/new-portal` ou `/portais-orion-adoption`; Claude também pode
ativá-las automaticamente pela descrição.

- [new-portal](https://github.com/portais-orion/design-systems-orion/tree/main/ai/skills/new-portal): use o prompt “Crie um novo portal React consumindo o Design System Orion”.
- [portais-orion-adoption](https://github.com/portais-orion/design-systems-orion/tree/main/ai/skills/portais-orion-adoption): use o prompt “Migre esta tela existente para o Design System Orion”.

---

## 📐 Architecture Decision Records

As decisões arquiteturais são documentadas como ADRs em [`docs/adr/`](docs/adr/):

| # | Decisão | Link |
|---|---|---|
| 0001 | Núcleo de Portais como plataforma (renomeado para Design System Orion — [ADR 0009](docs/adr/0009-rename-design-system-orion.md)) | [ADR](docs/adr/0001-nucleo-de-portais.md) |
| 0009 | Rename para Design System Orion | [ADR](docs/adr/0009-rename-design-system-orion.md) |
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

**Skill de adoção:** a skill [`portais-orion-adoption`](ai/skills/portais-orion-adoption/SKILL.md) guia a migração de telas de portais existentes para consumir os packages do Orion.

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

Se não → é Camada 3 e fica no produto, não no Orion.

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
| [`docs/adoption/consumer-setup.md`](docs/adoption/consumer-setup.md) | Guia para novos portais consumirem o Orion |
| [`docs/migration/ui-primitives-inventory.md`](docs/migration/ui-primitives-inventory.md) | Inventário de primitives para migração |

---

## 📄 Licença

Este projeto é **proprietary** e de uso interno exclusivo do grupo. O código, documentação e artefatos contidos neste repositório não podem ser copiados, distribuídos ou utilizados fora das empresas do grupo sem autorização expressa.

> Dúvidas sobre uso e permissões: consulte a liderança técnica do grupo.
