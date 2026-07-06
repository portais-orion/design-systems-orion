# 0004 â€” Base UI como primitivo headless

## Contexto
Supertrans usa `@base-ui/react` (padrÃ£o shadcn atual do projeto); Aurora usa Radix UI. As APIs sÃ£o incompatÃ­veis (`render` vs `asChild`, `Popup` vs `Content`).

## DecisÃ£o
`@base-ui/react` Ã© o Ãºnico primitivo headless permitido em `@supertrans-transportes/ui` e `@supertrans-transportes/blocks`. `@radix-ui/*` Ã© proibido. Componentes que existem sÃ³ no Aurora (tabs, popover, dropdown-menu, switch...) serÃ£o recriados em Base UI, nunca portados do cÃ³digo Radix.

## Alternativas consideradas
Radix (base do Aurora, porÃ©m legada no grupo e substituÃ­da no shadcn deste ecossistema); manter os dois (duplicaria manutenÃ§Ã£o e confundiria agentes).

## ConsequÃªncias
Aurora substituirÃ¡ Radix gradualmente via adoÃ§Ã£o da lib; rules de agente devem reforÃ§ar as diferenÃ§as de API (`render`, `Backdrop`, `Positioner`).

## Riscos
DiferenÃ§as sutis de foco/portal na recriaÃ§Ã£o. MitigaÃ§Ã£o: gerar via shadcn/Base UI + validaÃ§Ã£o de a11y no Storybook.

## CritÃ©rios de aceite
Button publicado sobre Base UI; nenhuma dependÃªncia `@radix-ui/*` no lockfile do nucleo-portais.
