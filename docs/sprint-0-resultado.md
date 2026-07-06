# Sprint 0 â€” Resultado

## 1. O que foi criado

FundaÃ§Ã£o completa do `nucleo-portais` (NÃºcleo de Portais do Grupo): monorepo pnpm + Turborepo com Biome e Changesets; `@supertrans-transportes/tokens` com temas Supertrans e Aurora via `data-brand`; `@supertrans-transportes/ui` com o primeiro componente (`Button`, portado do padrÃ£o Supertrans â€” Base UI + Tailwind v4 + cva); `@supertrans-transportes/blocks` preparado (vazio); `@supertrans-transportes/tsconfig` e `@supertrans-transportes/biome-config`; Storybook oficial com toolbar de marca; 8 ADRs; 6 documentos de arquitetura; estrutura agent-first completa em `ai/`; `AGENTS.md`. Nenhum arquivo dos portais atuais foi alterado.

## 2. Estrutura final do repositÃ³rio

```
nucleo-portais/
  apps/storybook/            .storybook/{main.ts,preview.tsx}, src/styles.css, stories/marcas.stories.tsx
  packages/
    tokens/src/{base.css, themes/{supertrans,aurora}.css, index.css}
    ui/src/{button/{button.tsx,button.stories.tsx,index.ts}, utils/cn.ts, index.ts}
    blocks/src/index.ts      (vazio, preparado)
    tsconfig/{base,react-library,nextjs}.json
    biome-config/biome.json
  docs/{adr/ (8), architecture/ (6), migration/, sprint-0-resultado.md}
  ai/{context/ (7), rules/ (6), workflows/ (6), checklists/ (4), prompts/ (2), skills/, examples/}
  .changeset/  package.json  pnpm-workspace.yaml  turbo.json  biome.json  README.md  AGENTS.md
```

## 3. Pacotes criados

| Pacote | Estado |
|---|---|
| `@supertrans-transportes/tokens` | Funcional â€” base semÃ¢ntico (`@theme inline`, origem Supertrans) + 2 temas de marca |
| `@supertrans-transportes/ui` | Funcional â€” Button + cn; JIT (exports em src/), peer deps React 19 |
| `@supertrans-transportes/blocks` | Estrutura preparada, sem implementaÃ§Ã£o (conforme escopo) |
| `@supertrans-transportes/tsconfig` | base / react-library / nextjs |
| `@supertrans-transportes/biome-config` | Derivado do biome.json do Supertrans (tab, 100 col, double quotes) |

## 4. Storybook

`@nucleo/storybook` (react-vite + @tailwindcss/vite), independente dos portais (sem AuthContext/QueryProvider). Toolbar global "Marca" (Supertrans/Aurora) via `globalTypes` + decorator que aplica `data-brand` no `<html>`. Stories: 9 do Button (variants, sizes, disabled, Ã­cones) + "NÃºcleo/Comparativo de Marcas" (lado a lado e amostras de tokens). 11 entradas no index do build.

## 5. Temas disponÃ­veis

- **supertrans**: `--primary #00526b`, hover `#005a75`, accent `#3caec4`, `--sidebar #001e2b` (navy promovido a token â€” no portal ainda Ã© hardcoded).
- **aurora**: `--primary #f97316`, hover `#ea580c` (ex-primary-600), accent `#fb923c`, sidebar slate. Escala `primary-50..900` abolida em favor de tokens semÃ¢nticos.
Ambos com seletor `:root, [data-brand="<marca>"]`; hex existe apenas dentro de `packages/tokens/src/themes/`.

## 6. Componente Button

Portado de `portal-supertrans/apps/web/src/components/ui/button.tsx`: Base UI (`@base-ui/react/button`), cva com 6 variants Ã— 8 sizes, estados `focus-visible`/`aria-invalid`/`aria-expanded`/`disabled`, `data-slot`, forwardRef, `buttonVariants` exportado. Ãšnica mudanÃ§a semÃ¢ntica: `hover` do variant default usa o token novo `bg-primary-hover` (antes `bg-primary/80` + hex de app). Zero cor hardcoded. Renderiza nas duas marcas (validado no comparativo e no CSS compilado â€” ambas as paletas presentes no bundle).

## 7. ADRs criadas

0001 plataforma interna (nÃ£o UI lib) Â· 0002 pnpm+Turborepo Â· 0003 Tailwind v4 CSS-first Â· 0004 Base UI (Radix proibido) Â· 0005 temas por CSS variables/data-brand (nunca prop) Â· 0006 camadas tokensâ†’uiâ†’blocksâ†’apps + convenÃ§Ã£o sobre framework Â· 0007 produtos em repos separados Â· 0008 repositÃ³rio agent-first.

## 8. Estrutura agent-first

`ai/context/` (7 arquivos: read-first, repo-map, decisÃµes, regras rÃ¡pidas de componente/token, contexto de migraÃ§Ã£o por portal) Â· `ai/rules/` (general, frontend, tokens, components, blocks, no-domain â€” com exemplos âœ…/âŒ) Â· `ai/workflows/` (create-component, create-block, extract-from-supertrans, recreate-from-aurora, add-brand-theme, review-pr) Â· `ai/checklists/` (component, token, storybook, pr-review) Â· `ai/prompts/` (2 prompts prontos de extraÃ§Ã£o/recriaÃ§Ã£o) Â· `ai/skills/` e `ai/examples/` reservados. `AGENTS.md` na raiz Ã© o ponto de entrada e contÃ©m as 8 regras obrigatÃ³rias.

## 9. Comandos executados (validaÃ§Ã£o)

Ambiente: Linux sandbox, Node v22.22.3, pnpm 9.15.4.

```
pnpm install          â†’ Done in 20.2s (391 pacotes)
pnpm check            â†’ Checked 30 files. No fixes applied (verde)
pnpm typecheck        â†’ 3 successful, 3 total (ui, blocks, storybook)
pnpm build            â†’ 3 successful, 3 total (12.3s; storybook-static gerado)
pnpm build:storybook  â†’ "Storybook build completed successfully"
pnpm storybook (dev)  â†’ HTTP 200 em http://localhost:6006
```

VerificaÃ§Ãµes de pureza: zero hex fora de `tokens/themes`; zero `orange-*`/`blue-*`/`primary-NNN` em cÃ³digo; zero `@radix-ui` no repo; index do Storybook com as 11 stories; `#00526b` e `#f97316` presentes no CSS compilado (os dois temas ativos).

## 10. Problemas encontrados

1. Turbo alertava ausÃªncia de outputs em `build` de ui/blocks (pacotes JIT sem dist) â€” resolvido com `turbo.json` por pacote (`outputs: []`).
2. Biome acusou formataÃ§Ã£o/organizaÃ§Ã£o de imports em uma story â€” corrigido com `biome check --write`.
3. Infra do sandbox (CA do proxy) exigiu `NODE_EXTRA_CA_CERTS` para npm/pnpm â€” irrelevante fora do sandbox.

## 11. PendÃªncias

- Rodar `pnpm install` no Windows (node_modules nÃ£o sÃ£o copiados entre plataformas; lockfile incluÃ­do).
- Addon de a11y e visual regression (matriz componente Ã— marca) no Storybook.
- Lint automatizado anti-hex/anti-marca no CI (hoje a verificaÃ§Ã£o foi por grep manual; a regra existe em `ai/rules/tokens.md`).
- ValidaÃ§Ã£o de contraste WCAG AA dos pares primary/foreground do tema aurora.
- CI (build + check + build-storybook) e deploy estÃ¡tico do Storybook.
- Dark mode: variant declarado no base.css, sem tema dark completo ainda.

## 12. PrÃ³xima sprint recomendada

**Sprint 1 â€” InventÃ¡rio de primitives**: extrair do Supertrans os 12 primitives restantes (input, label, textarea, checkbox, select, dialog, card, badge, tooltip, skeleton, avatar, table) via `ai/workflows/extract-from-supertrans.md` e recriar em Base UI os primeiros exclusivos do Aurora com maior uso real (switch â€” 16 usos, dropdown-menu â€” 12, tabs) via `recreate-from-aurora.md`. Adicionar addon a11y + CI. Isso deixa `@supertrans-transportes/ui` completo o bastante para a fase "Supertrans consome" (ver `docs/architecture/migration-strategy.md`).
