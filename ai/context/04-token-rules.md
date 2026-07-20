# Regras de tokens (contexto rápido)

- Marcas vivem em `packages/tokens/brands.json` (catálogo interno, não publicado). Os `@import` de tema em `index.css` e os exports `./themes/*` do `package.json` são DERIVADOS: use `pnpm sync:brands` para regravar e `pnpm check:brands` para validar — nunca edite à mão.
- `base.css` = mapeamento semântico + defaults neutros. NUNCA colocar cor de marca aqui.
- `themes/<marca>.css` = somente valores de identidade, nos três seletores obrigatórios (`:root:not([data-brand])`, `:root[data-brand="<marca>"]`, `[data-brand="<marca>"]`).
- Token novo: adicionar mapeamento em `@theme inline` no base.css + valor default neutro em `:root` + valor por marca em CADA tema existente (os dois hoje). Tema incompleto quebra a outra marca silenciosamente.
- Variações de cor (hover/active) são tokens (`--primary-hover`), não escala numérica (`primary-600` é proibido).
- Validar no Storybook: story "Orion/Comparativo de Marcas" e toolbar de marca.

## Seletor de tema (obrigatório)

Todo tema usa EXATAMENTE três seletores (nunca `:root, [data-brand]` simples — empata especificidade e o último import vence sempre):
```css
:root:not([data-brand]),
:root[data-brand="<marca>"],
[data-brand="<marca>"] { ... }
```
