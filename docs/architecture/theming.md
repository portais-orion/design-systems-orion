# Theming

Modelo (ADR 0005): componentes usam apenas tokens semânticos; marcas são CSS.

1. `@grupo/tokens/base.css` — bloco `@theme inline` (Tailwind v4) mapeando `--color-*` para CSS variables + defaults neutros em `:root`. Não contém cor de marca.
2. `@grupo/tokens/themes/supertrans.css` — azul petróleo `#00526b`, hover `#005a75`, accent `#3caec4`, sidebar navy `#001e2b` (promovido a token `--sidebar`).
3. `@grupo/tokens/themes/aurora.css` — laranja `#f97316`, hover `#ea580c`, accent `#fb923c`, sidebar slate. A escala `primary-50..900` do Aurora foi abolida: variações são tokens (`--primary-hover`).

Resolução: cada tema define três seletores:

```css
:root:not([data-brand]),          /* fallback: nenhum data-brand definido       */
:root[data-brand="<marca>"],      /* marca ativa no elemento raiz (0,2,0)       */
[data-brand="<marca>"] { ... }    /* containers aninhados (previews, lado a lado)*/
```

Por que não `:root, [data-brand=...]`: `:root` e `[data-brand]` têm a mesma especificidade (0,1,0) — com dois temas carregados, o último importado venceria SEMPRE no `<html>`, ignorando o atributo (bug corrigido pós-Sprint 3). Com `:root[data-brand=...]` (0,2,0) a marca ativa vence os fallbacks dos outros temas. Produto importa `base.css` + UM tema (fallback `:root:not([data-brand])` cobre tudo). Ambientes multi-marca importam `index.css` e trocam a marca por `data-brand`; sem atributo, vale o último tema importado (documentado).

Proibições nos packages compartilhados: hex em componente; classes de marca (`orange-*`, `blue-*`, `primary-600`); prop `brand`; `tailwind.config.ts`.

Marca nova = criar `themes/<marca>.css` redefinindo os tokens de identidade (workflow `ai/workflows/add-brand-theme.md`).
