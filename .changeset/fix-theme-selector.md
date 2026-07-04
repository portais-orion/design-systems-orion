---
"@grupo/tokens": patch
---

Corrige troca de marca: seletores de tema passam de `:root, [data-brand]` (empate de especificidade — último import vencia sempre) para `:root:not([data-brand])` + `:root[data-brand="<marca>"]` + `[data-brand="<marca>"]`.
