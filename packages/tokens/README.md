# @design-systems-orion/tokens

Tokens semânticos e temas por marca do Design System Orion — CSS puro, sem runtime.

Camada 0 do Orion: base para `@design-systems-orion/ui` e `@design-systems-orion/blocks`.

## Instalação

```bash
pnpm add @design-systems-orion/tokens
```

## Uso

```css
/* globals.css */
@import "@design-systems-orion/tokens/base.css";
@import "@design-systems-orion/tokens/themes/supertrans.css"; /* ou aurora.css */
```

```tsx
// layout.tsx
<html lang="pt-BR" data-brand="supertrans">
```

A marca ativa é definida por `data-brand` no `<html>` — troca de tema é 100% CSS variables, sem
prop `brand` em componente nenhum.

## Documentação completa

Guia de consumo e arquitetura de theming: [docs/adoption/consumer-setup.md](https://github.com/portais-orion/design-systems-orion/blob/main/docs/adoption/consumer-setup.md) ·
[docs/architecture/theming.md](https://github.com/portais-orion/design-systems-orion/blob/main/docs/architecture/theming.md)

Skills opcionais para Codex e Claude Code: [instalação via GitHub](https://github.com/portais-orion/design-systems-orion#skills-para-codex-e-claude-code).

## Repositório

Parte do monorepo [design-systems-orion](https://github.com/portais-orion/design-systems-orion),
junto com `@design-systems-orion/ui` e `@design-systems-orion/blocks`.
