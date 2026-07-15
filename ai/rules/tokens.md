# Regras de tokens

✅ Correto:
```css
/* themes/aurora.css */
:root:not([data-brand]),
:root[data-brand="aurora"],
[data-brand="aurora"] {
	--primary: #f97316;
	--primary-hover: #ea580c;
}
```
```tsx
<div className="bg-primary text-primary-foreground hover:bg-primary-hover" />
```

❌ Errado:
```tsx
<div className="bg-[#f97316]" />          /* hex em componente */
<div className="bg-orange-500" />          /* classe de marca */
<Button brand="aurora" />                  /* marca por prop */
```
```css
/* base.css */
--primary: #00526b;                        /* cor de marca no base */
```

- Todo token novo entra em TODOS os temas + default neutro no base.css.
- Todo tema usa exatamente três seletores: `:root:not([data-brand])`, `:root[data-brand="<marca>"]` e `[data-brand="<marca>"]`.
- hex é permitido APENAS dentro de `packages/tokens/src/themes/*.css`.
- `pnpm check:tokens` valida defaults, mapeamentos e seletores obrigatórios.
