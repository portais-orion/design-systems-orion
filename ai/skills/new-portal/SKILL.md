---
name: new-portal
description: Use quando for criar um projeto React NOVO que consome o Orion @design-systems-orion (tokens/ui/blocks, público no npm, sem token) com Next.js App Router ou Vite, Tailwind v4, tema por data-brand e adaptadores locais. Não use para migrar telas de portal existente (use portais-orion-adoption).
---

# Criar portal novo consumindo o Orion

Se `docs/adoption/consumer-setup.md` existir no repositório atual, leia-o. Fora do monorepo Orion,
abra o [manual canônico no GitHub](https://github.com/portais-orion/design-systems-orion/blob/main/docs/adoption/consumer-setup.md).
Esta skill define a ordem e o que validar. O portal vive em repo separado; nunca criar produto
dentro do nucleo-portais.

## Sequência

1. **Confirmar fronteira e scaffold**: o portal vive em repo separado. Escolha
   Next.js com App Router ou Vite e gere o scaffold TypeScript + Tailwind v4 CSS-first, conforme
   as seções 3 ou 4 do manual; não crie `tailwind.config.ts`.
2. **Escolher e instalar**: `tokens` é obrigatório; adicione `ui` para primitives e `blocks` para
   composições. `blocks` traz `ui` como dependency, mas todos os peers dos packages envolvidos
   continuam obrigatórios. Use a receita seletiva ou completa do manual §§1–2 para o gerenciador
   escolhido. Não use `.npmrc`, token ou scopes legados.
3. **Tokens, tema e Tailwind**: no CSS global, importe Tailwind, `base.css` e o tema; acrescente
   somente os `@source` dos packages escolhidos, relativos ao próprio CSS e apontando para `dist`.
   Aplique o mesmo valor de marca no CSS importado e em `data-brand` do `<html>`; tema nunca é prop.
   No Vite, configure também `@tailwindcss/vite` em `vite.config.ts`.
4. **Next.js**: `transpilePackages` não é necessário por padrão, pois o npm entrega ESM compilado
   em `dist`. Só o adicione diante de um erro específico, documentando o motivo.
5. **Adaptadores locais**: crie em `components/orion/*` somente os adaptadores dos packages
   escolhidos, reexportando apenas o que o portal usa. As telas importam esses adaptadores, não os
   subpaths `@design-systems-orion/*` diretamente.
6. **Smoke page**: renderize uma página pequena com um componente de cada package escolhido, como
   `Button` para `ui` e `PageHeader` para `blocks`, confirmando no navegador que tokens, tema e
   classes foram carregados.
7. **Validar**: execute `typecheck`, `build` e o servidor de desenvolvimento do portal.

## Convenções que o portal herda

- Domínio (rotas, APIs, permissões, entidades) é Camada 3 — vive só no portal.
- Gap genérico de API do Orion → backlog/issue em `portais-orion/design-systems-orion`; nunca
  fork/patch local do package. Necessidade de domínio permanece no consumidor. Para propor um
  componente genérico novo, siga as instruções de contribuição do repositório Orion.
- Telas novas: antes de escrever markup próprio, procure blocks compatíveis (`page-header`,
  `data-table`, `list-page-layout`, `empty-state`...) nos exports públicos do Orion.
