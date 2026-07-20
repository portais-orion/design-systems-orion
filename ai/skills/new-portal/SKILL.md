---
name: new-portal
description: Use quando for criar um projeto/portal NOVO do zero que consome o Orion @portais-orion (tokens/ui/blocks) — scaffold Next.js + Tailwind v4, autenticação no GitHub Packages, tema por data-brand e adaptadores locais. Não use para migrar telas de portal existente (use portais-orion-adoption).
---

# Criar portal novo consumindo o Orion

Guia de setup: `docs/adoption/consumer-setup.md` (fonte de verdade — seguir seção a seção).
Esta skill define a ordem e o que validar. O portal vive em **repo separado** (ADR 0007);
nunca criar produto dentro do nucleo-portais.

## Sequência

1. **Scaffold**: Next.js (App Router) + Tailwind v4 (CSS-first, sem `tailwind.config.ts`) +
   TypeScript. Monorepo pnpm com `apps/web` é o padrão dos portais existentes.
2. **Registry**: `.npmrc` com scope `@portais-orion` → GitHub Packages (consumer-setup §1).
   Token via env, nunca commitado. Scopes legados (`@grupo`, `@supertrans-transportes`,
   `@mateusarcestr`) proibidos.
3. **Instalar**: packages + peers (consumer-setup §2).
4. **Tokens + marca**: imports no `globals.css` e `data-brand="<marca>"` no `<html>`
   (consumer-setup §3). Tema NUNCA por prop.
5. **`@source` do Tailwind** relativo ao `globals.css` (consumer-setup §4 — erro clássico é
   profundidade errada do caminho) + `transpilePackages` enquanto source-based (§5).
6. **Adaptadores locais**: barrels `components/nucleo-ui` e `components/nucleo-blocks`
   re-exportando só o que o portal usa; telas nunca importam `@portais-orion/*` direto (§6).
7. **Smoke test**: página com `Button`, `PageHeader`, `DataTable` renderizando estilizados;
   `typecheck` + `build` + `dev` verdes (§7).

## Convenções que o portal herda

- Domínio (rotas, APIs, permissões, entidades) é Camada 3 — vive só no portal.
- Gap de API do Orion → issue em `portais-orion/nucleo-portais` (consumer-setup §8); nunca
  fork/patch local do package. Componente genérico novo → skill `contribute-to-nucleo`.
- Telas novas: montar com blocks (`page-header`, `data-table`, `list-page-layout`,
  `empty-state`...) antes de escrever markup próprio — `ai/workflows/find-component.md`.
