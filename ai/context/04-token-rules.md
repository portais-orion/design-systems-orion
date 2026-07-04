# Regras de tokens (contexto rápido)

- `base.css` = mapeamento semântico + defaults neutros. NUNCA colocar cor de marca aqui.
- `themes/<marca>.css` = somente valores de identidade, no seletor `:root, [data-brand="<marca>"]`.
- Token novo: adicionar mapeamento em `@theme inline` no base.css + valor default neutro em `:root` + valor por marca em CADA tema existente (os dois hoje). Tema incompleto quebra a outra marca silenciosamente.
- Variações de cor (hover/active) são tokens (`--primary-hover`), não escala numérica (`primary-600` é proibido).
- Validar no Storybook: story "Núcleo/Comparativo de Marcas" e toolbar de marca.

## Seletor de tema (obrigatório)

Todo tema usa EXATAMENTE três seletores (nunca `:root, [data-brand]` simples — empata especificidade e o último import vence sempre):
```css
:root:not([data-brand]),
:root[data-brand="<marca>"],
[data-brand="<marca>"] { ... }
```
