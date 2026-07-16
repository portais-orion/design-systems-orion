# Theming

Modelo (ADR 0005): componentes usam apenas tokens semânticos; marcas são CSS.

1. `@portais-orion/tokens/base.css` — bloco `@theme inline` (Tailwind v4) mapeando `--color-*` para CSS variables + defaults neutros em `:root`. Não contém cor de marca.
2. `@portais-orion/tokens/themes/supertrans.css` — azul petróleo `#00526b`, hover `#005a75`, accent `#3caec4`, sidebar navy `#001e2b`.
3. `@portais-orion/tokens/themes/aurora.css` — laranja `#f97316`, hover `#ea580c`, accent `#fb923c`, sidebar slate. A escala `primary-50..900` do Aurora foi abolida: variações são tokens (`--primary-hover`).

Resolução: cada tema define três seletores:

```css
:root:not([data-brand]),          /* fallback: nenhum data-brand definido        */
:root[data-brand="<marca>"],      /* marca ativa no elemento raiz (0,2,0)        */
[data-brand="<marca>"] { ... }    /* containers aninhados (previews, lado a lado) */
```

Por que não `:root, [data-brand=...]`: `:root` e `[data-brand]` têm a mesma especificidade (0,1,0) — com dois temas carregados, o último importado venceria sempre no `<html>`, ignorando o atributo. Com `:root[data-brand=...]` (0,2,0) a marca ativa vence os fallbacks dos outros temas. Produto importa `base.css` + UM tema. Ambientes multi-marca importam `index.css` e trocam a marca por `data-brand`.

Proibições nos packages compartilhados: hex em componente; classes de marca (`orange-*`, `blue-*`, `primary-600`); prop `brand`; `tailwind.config.ts`.

O conjunto de marcas é declarado em `packages/tokens/brands.json` (catálogo interno — fora do tarball publicado). `index.css` e os exports `./themes/*` do manifesto são derivados dele: `pnpm sync:brands` regrava, `pnpm check:brands` valida (integra o `pnpm check`). Toolbar e comparativo do Storybook consomem o mesmo catálogo.

Marca nova = entrada no `brands.json` + `themes/<id>.css` redefinindo os tokens de identidade (workflow `ai/workflows/add-brand-theme.md`).
