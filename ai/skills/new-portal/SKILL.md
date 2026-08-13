---
name: new-portal
description: Use quando for criar um projeto React NOVO que consome o Orion @design-systems-orion (tokens/ui/blocks, público no npm, sem token) com Next.js App Router ou Vite, Tailwind v4, tema por data-brand e adaptadores locais. Não use para migrar telas de portal existente (use portais-orion-adoption).
---

# Criar portal novo consumindo o Orion

Guia de setup: `docs/adoption/consumer-setup.md` (fonte de verdade — seguir seção a seção).
Esta skill define a ordem e o que validar. O portal vive em **repo separado** (ADR 0007);
nunca criar produto dentro do nucleo-portais.

## Sequência

1. **Confirmar fronteira e scaffold**: o portal vive em repo separado (ADR 0007). Escolha
   Next.js com App Router ou Vite e gere o scaffold TypeScript + Tailwind v4 CSS-first, conforme
   as seções 3 ou 4 do manual; não crie `tailwind.config.ts`.
2. **Instalar**: os packages públicos `@design-systems-orion/tokens`, `ui` e `blocks`, mais peers
   compatíveis (manual §§1–2). Não use `.npmrc`, token ou scopes legados.
3. **Tokens, tema e Tailwind**: no CSS global, importe Tailwind, `base.css` e o tema; acrescente
   os `@source` relativos ao próprio CSS, apontando somente para `ui/dist` e `blocks/dist`. Aplique
   o mesmo valor de marca no CSS importado e em `data-brand` do `<html>`; tema nunca é prop.
   No Vite, configure também `@tailwindcss/vite` em `vite.config.ts`.
4. **Next.js**: `transpilePackages` não é necessário por padrão, pois o npm entrega ESM compilado
   em `dist`. Só o adicione diante de um erro específico, documentando o motivo.
5. **Adaptadores locais**: crie `components/orion/ui.ts` e `components/orion/blocks.ts`,
   reexportando apenas o que o portal usa. As telas importam esses adaptadores, não os subpaths
   `@design-systems-orion/*` diretamente.
6. **Smoke page**: renderize uma página pequena com `Button` e `PageHeader`, confirmando no
   navegador que tokens, tema e classes dos packages foram carregados.
7. **Validar**: execute `typecheck`, `build` e o servidor de desenvolvimento do portal.

## Convenções que o portal herda

- Domínio (rotas, APIs, permissões, entidades) é Camada 3 — vive só no portal.
- Gap genérico de API do Orion → backlog/issue em `portais-orion/design-systems-orion`; nunca
  fork/patch local do package. Necessidade de domínio permanece no consumidor. Componente genérico
  novo → skill `contribute-to-nucleo`.
- Telas novas: montar com blocks (`page-header`, `data-table`, `list-page-layout`,
  `empty-state`...) antes de escrever markup próprio — `ai/workflows/find-component.md`.
