# @design-systems-orion/blocks

Composições genéricas do Design System Orion — dados via props, sem domínio de negócio.

Camada 2 do Orion: DataTable, AppShell, Sidebar, layouts de página e outras composições
reutilizáveis entre portais, construídas sobre `@design-systems-orion/ui`.

## Instalação

```bash
pnpm add @design-systems-orion/blocks @design-systems-orion/ui @design-systems-orion/tokens
pnpm add react react-dom @tanstack/react-table lucide-react
```

## Uso

```tsx
import { PageHeader } from "@design-systems-orion/blocks/page-header";
import { DataTable, type DataTableColumn } from "@design-systems-orion/blocks/data-table";
```

Precisa dos tokens (`@design-systems-orion/tokens`) e do Tailwind v4 escaneando o pacote — veja o
guia de consumo abaixo pro `@source` correto.

## Documentação completa

Guia de consumo: [docs/adoption/consumer-setup.md](https://github.com/portais-orion/design-systems-orion/blob/main/docs/adoption/consumer-setup.md)

Catálogo de componentes com props e exemplos: site de docs do monorepo (`apps/docs`, Fumadocs) e
Storybook (`apps/storybook`) — ambos rodados localmente a partir do repo.

## Repositório

Parte do monorepo [design-systems-orion](https://github.com/portais-orion/design-systems-orion),
junto com `@design-systems-orion/tokens` e `@design-systems-orion/ui`.
