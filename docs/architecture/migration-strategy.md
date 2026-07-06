# EstratÃ©gia de migraÃ§Ã£o (alto nÃ­vel)

1. **Criar o nÃºcleo** (esta sprint): monorepo, tokens 2 marcas, primeiro primitive, Storybook, docs, estrutura ai/.
2. **Supertrans consome primeiro**: `components/ui/*` viram re-exports de `@supertrans-transportes/ui`; `globals.css` importa `@supertrans-transportes/tokens`. Valida o pipeline no portal mais alinhado (jÃ¡ Ã© TW4 + Base UI). Zero mudanÃ§a visual esperada.
3. **Aurora converge depois**: prÃ©-requisitos primeiro (npmâ†’pnpm, ESLintâ†’Biome, Tailwind v3â†’v4, remoÃ§Ã£o da escala primary-50..900), depois substituiÃ§Ã£o 1:1 de primitives Radixâ†’lib via re-exports. Sem big-bang: telas antigas migram quando tocadas.
4. **Blocks e templates em seguida**: DataTable (TanStack Table, API do Aurora, envelope `{data,total,page,limit}`), PageHeader, Pagination, ConfirmDialog, FilterBar, EmptyState, StatCards; depois templates de tela (List/Form/Detail).
5. **CLI somente apÃ³s template validado**: `create-*` nasce do esqueleto do Supertrans jÃ¡ consumindo os packages, menos o domÃ­nio. Produtos existentes nunca passam pelo CLI â€” convergem adotando os mesmos packages.

Detalhes, fases e riscos: diagnÃ³sticos em `Portal-Aurora/doc/` (fonte) e ADRs 0001â€“0008.
