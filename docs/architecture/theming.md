# Theming

Modelo (ADR 0005): componentes usam apenas tokens semÃ¢nticos; marcas sÃ£o CSS.

1. `@supertrans-transportes/tokens/base.css` â€” bloco `@theme inline` (Tailwind v4) mapeando `--color-*` para CSS variables + defaults neutros em `:root`. NÃ£o contÃ©m cor de marca.
2. `@supertrans-transportes/tokens/themes/supertrans.css` â€” azul petrÃ³leo `#00526b`, hover `#005a75`, accent `#3caec4`, sidebar navy `#001e2b` (promovido a token `--sidebar`).
3. `@supertrans-transportes/tokens/themes/aurora.css` â€” laranja `#f97316`, hover `#ea580c`, accent `#fb923c`, sidebar slate. A escala `primary-50..900` do Aurora foi abolida: variaÃ§Ãµes sÃ£o tokens (`--primary-hover`).

ResoluÃ§Ã£o: cada tema define trÃªs seletores:

```css
:root:not([data-brand]),          /* fallback: nenhum data-brand definido       */
:root[data-brand="<marca>"],      /* marca ativa no elemento raiz (0,2,0)       */
[data-brand="<marca>"] { ... }    /* containers aninhados (previews, lado a lado)*/
```

Por que nÃ£o `:root, [data-brand=...]`: `:root` e `[data-brand]` tÃªm a mesma especificidade (0,1,0) â€” com dois temas carregados, o Ãºltimo importado venceria SEMPRE no `<html>`, ignorando o atributo (bug corrigido pÃ³s-Sprint 3). Com `:root[data-brand=...]` (0,2,0) a marca ativa vence os fallbacks dos outros temas. Produto importa `base.css` + UM tema (fallback `:root:not([data-brand])` cobre tudo). Ambientes multi-marca importam `index.css` e trocam a marca por `data-brand`; sem atributo, vale o Ãºltimo tema importado (documentado).

ProibiÃ§Ãµes nos packages compartilhados: hex em componente; classes de marca (`orange-*`, `blue-*`, `primary-600`); prop `brand`; `tailwind.config.ts`.

Marca nova = criar `themes/<marca>.css` redefinindo os tokens de identidade (workflow `ai/workflows/add-brand-theme.md`).
