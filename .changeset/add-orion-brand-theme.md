---
"@portais-orion/tokens": minor
---

Adiciona o tema da marca Grupo Orion ao catálogo de marcas.

- Nova marca `orion` (label "Grupo Orion") em `brands.json`, repositório `portal-orion`.
- Tema `themes/orion.css`: primária teal `#29A699` (HSL 175 60% 40%), acento de marca laranja queimado `#D95A11` (HSL 22 85% 45%) em `--brand-accent`, sidebar teal escura e `--radius: 0.5rem`.
- `index.css` e os exports de tema do `package.json` derivados via `sync:brands`.
- Toolbar do Storybook e o comparativo de marcas passam a incluir Orion automaticamente.
