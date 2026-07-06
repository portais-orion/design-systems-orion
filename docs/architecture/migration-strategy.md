# Estratégia de migração (alto nível)

1. **Criar o núcleo** (esta sprint): monorepo, tokens 2 marcas, primeiro primitive, Storybook, docs, estrutura ai/.
2. **Supertrans consome primeiro**: `components/ui/*` viram re-exports de `@supertrans-transportes/ui`; `globals.css` importa `@supertrans-transportes/tokens`. Valida o pipeline no portal mais alinhado (já é TW4 + Base UI). Zero mudança visual esperada.
3. **Aurora converge depois**: pré-requisitos primeiro (npm� pnpm, ESLint� Biome, Tailwind v3� v4, remoção da escala primary-50..900), depois substituição 1:1 de primitives Radix� lib via re-exports. Sem big-bang: telas antigas migram quando tocadas.
4. **Blocks e templates em seguida**: DataTable (TanStack Table, API do Aurora, envelope `{data,total,page,limit}`), PageHeader, Pagination, ConfirmDialog, FilterBar, EmptyState, StatCards; depois templates de tela (List/Form/Detail).
5. **CLI somente após template validado**: `create-*` nasce do esqueleto do Supertrans já consumindo os packages, menos o domínio. Produtos existentes nunca passam pelo CLI � convergem adotando os mesmos packages.

Detalhes, fases e riscos: diagnósticos em `Portal-Aurora/doc/` (fonte) e ADRs 0001�0008.
