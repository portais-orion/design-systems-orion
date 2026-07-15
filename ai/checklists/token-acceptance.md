# Checklist — aceite de token/tema

- [ ] Mapeamento em `@theme inline` (base.css) + default neutro em `:root`
- [ ] Valor definido em TODOS os temas existentes (supertrans, aurora)
- [ ] Nenhuma cor de marca no base.css
- [ ] Tema usa exatamente `:root:not([data-brand])`, `:root[data-brand="..."]` e `[data-brand="..."]`
- [ ] Contraste AA nos pares primary/foreground alterados
- [ ] Story "Comparativo de Marcas" atualizada se token visual novo
- [ ] `pnpm check:tokens` verde
- [ ] `pnpm check:storybook-brands` verde quando adicionar/remover marca
- [ ] `pnpm build:storybook` verde
