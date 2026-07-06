# 0004 � Base UI como primitivo headless

## Contexto
Supertrans usa `@base-ui/react` (padrão shadcn atual do projeto); Aurora usa Radix UI. As APIs são incompatíveis (`render` vs `asChild`, `Popup` vs `Content`).

## Decisão
`@base-ui/react` é o único primitivo headless permitido em `@supertrans-transportes/ui` e `@supertrans-transportes/blocks`. `@radix-ui/*` é proibido. Componentes que existem só no Aurora (tabs, popover, dropdown-menu, switch...) serão recriados em Base UI, nunca portados do código Radix.

## Alternativas consideradas
Radix (base do Aurora, porém legada no grupo e substituída no shadcn deste ecossistema); manter os dois (duplicaria manutenção e confundiria agentes).

## Consequências
Aurora substituirá Radix gradualmente via adoção da lib; rules de agente devem reforçar as diferenças de API (`render`, `Backdrop`, `Positioner`).

## Riscos
Diferenças sutis de foco/portal na recriação. Mitigação: gerar via shadcn/Base UI + validação de a11y no Storybook.

## Critérios de aceite
Button publicado sobre Base UI; nenhuma dependência `@radix-ui/*` no lockfile do nucleo-portais.
