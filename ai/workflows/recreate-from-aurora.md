# Workflow: recriar componente inspirado no Portal-Aurora

Uso: componente existe só no Aurora (Radix/TW3) — tabs, popover, switch, DataTable, Pagination etc.

1. Ler a implementação no Aurora APENAS para extrair a API pública (props, comportamento, estados). O código não será copiado.
2. Escrever a interface TypeScript primeiro, espelhando a API do Aurora onde ela for boa (facilita a migração futura das telas dele).
3. Implementar do zero: Base UI (nunca traduzir chamadas Radix — mapa: asChild→render, Content→Popup, Overlay→Backdrop, Viewport→Positioner), TW4, tokens.
4. Retokenizar tudo: `bg-white`→`bg-background`, `text-gray-*`→`text-muted-foreground`/`text-foreground`, `primary-500`→`bg-primary`, `border-gray-200`→`border-border`.
5. Story + validação nas 2 marcas + checklist + changeset.
