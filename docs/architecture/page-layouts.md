# Page Layouts

Layouts de página formalizam o miolo das telas. Shell é chrome; layouts são conteúdo.

ListPageLayout
`header` → `stats` → `toolbar` + `filters` → `content` → `footer`

FormPageLayout
slot `form` único; o `<form>` pertence ao consumidor. Pode ter `aside` opcional.

DetailPageLayout
`summary` → `tabs` → `content`, com `aside` opcional.

DashboardPageLayout
`stats` → `content`, com `aside` opcional.

Princípio: o layout só posiciona. Busca, filtros, estado e integração ficam fora.
