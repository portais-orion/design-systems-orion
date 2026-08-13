# @design-systems-orion/ui

Primitives compartilhadas do Design System Orion — Base UI (headless) + Tailwind v4 + cva.

Camada 1 do Orion: componentes genéricos sem domínio (Button, Input, Dialog, Table...).

## Instalação

```bash
pnpm add @design-systems-orion/ui @design-systems-orion/tokens
pnpm add @base-ui/react class-variance-authority lucide-react react react-dom tailwind-merge
```

## Uso

```tsx
import { Button } from "@design-systems-orion/ui/button";

export function Example() {
  return <Button>Salvar</Button>;
}
```

Precisa dos tokens (`@design-systems-orion/tokens`) e do Tailwind v4 escaneando o pacote — veja o
guia de consumo abaixo pro `@source` correto.

## Documentação completa

Guia de consumo: [docs/adoption/consumer-setup.md](https://github.com/portais-orion/design-systems-orion/blob/main/docs/adoption/consumer-setup.md)

Skills opcionais para criar/migrar projetos: [instalação via GitHub](https://github.com/portais-orion/design-systems-orion#skills-para-codex).

Catálogo de componentes com props e exemplos: site de docs do monorepo (`apps/docs`, Fumadocs) e
Storybook (`apps/storybook`) — ambos rodados localmente a partir do repo.

## Repositório

Parte do monorepo [design-systems-orion](https://github.com/portais-orion/design-systems-orion),
junto com `@design-systems-orion/tokens` e `@design-systems-orion/blocks`.
