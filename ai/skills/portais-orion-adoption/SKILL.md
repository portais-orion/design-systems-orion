---
name: portais-orion-adoption
description: Use esta skill para migrar gradualmente uma tela de aplicação React existente (Next.js ou Vite) de shadcn/Radix, MUI, Chakra ou biblioteca interna para o Orion @design-systems-orion, preservando contratos de negócio, APIs, permissões e layout.
---

# Adoção gradual do Orion

Migre uma fatia visual por vez. Se `docs/adoption/consumer-setup.md` existir no repositório atual,
leia-o. Fora do monorepo Orion, abra o [manual canônico no GitHub](https://github.com/portais-orion/design-systems-orion/blob/main/docs/adoption/consumer-setup.md).
Os packages npm são somente runtime: `npm install` não instala esta skill. Instale-a separadamente
pelo GitHub/skill-installer e reinicie o Codex após instalar ou copiar a skill; ela não se instala
sozinha.
Ele define packages, peers, instalação, CSS, temas e exports públicos.

## Escopo

Use em uma aplicação React existente com Next.js ou Vite que substitui gradualmente shadcn/Radix,
MUI, Chakra ou biblioteca interna. Não use para redesign, migração em massa, fluxo crítico sem
ambiente real de validação ou mudança simultânea de auth, permissões, backend e UI.

## Contrato invariável

Troque somente visual e composição. Preserve hooks, contratos de API, autenticação, permissões,
rotas, dados, validações, eventos e ações. A biblioteca anterior pode coexistir com o Orion até não
restar consumidor.

## Sequência operacional

1. Identifique stack, package manager, raiz do app, React/React DOM, Tailwind e scripts reais do
   `package.json`.
2. Rode como baseline os gates existentes e capture a tela alvo. Registre scripts ausentes em vez
   de inventar comandos.
3. Inventarie imports da biblioteca anterior e classifique cada item como primitive, block ou
   domínio.
4. Preencha a matriz comportamento atual → subpath público Orion → adaptação necessária.
5. Escolha packages e configure peers, tokens, tema e `@source` pelo manual. Os `@source` são
   relativos ao CSS e apontam para `dist`; Vite usa `@tailwindcss/vite`.
6. Crie adaptadores neutros em `components/orion/*` e migre uma única fatia de baixo risco.
7. Valide estados, eventos, acessibilidade, build e comportamento visual.
8. Procure consumidores restantes antes de desinstalar a biblioteca anterior.

## Matriz mínima

Compare comportamento, estados, teclado e eventos; semelhança de nome ou aparência não basta.

| Padrão atual | Subpath Orion preferido | Conferir/adaptar |
| --- | --- | --- |
| header de página | `blocks/page-header` | título, ações e hierarquia |
| tabela/listagem | `blocks/data-table` | loading, vazio, ordenação e paginação |
| busca | `blocks/search-bar` | valor, mudança e limpeza |
| feedback vazio/erro | `blocks/empty-state` / `blocks/error-state` | mensagem e ação |
| botão/badge | `ui/button` / `ui/badge` | variantes, disabled e eventos |
| tabs | `ui/tabs` | seleção, foco e teclado |

Hooks, formatters, autorização, integrações e componentes de domínio permanecem no consumidor.

## Adaptadores locais

Centralize subpaths públicos e diferenças pequenas de API:

```ts
// components/orion/ui.ts
export { Badge } from "@design-systems-orion/ui/badge";
export { Button } from "@design-systems-orion/ui/button";

// components/orion/blocks.ts
export { DataTable } from "@design-systems-orion/blocks/data-table";
export { PageHeader } from "@design-systems-orion/blocks/page-header";
```

Crie somente os adaptadores necessários à fatia. Eles não copiam código Orion, não escondem regra
de negócio e não substituem hooks ou services do portal.

## Gates proporcionais ao consumidor

Leia `package.json` antes de executar. Para cada script realmente declarado entre `typecheck`,
`check`, `lint`, `test` e `build`, rode o mesmo comando antes e depois da migração:

| Contexto detectado | Forma de executar um `<script-existente>` |
| --- | --- |
| npm, na raiz do app | `npm run <script-existente>` |
| pnpm standalone, na raiz do app | `pnpm run <script-existente>` |
| Yarn standalone, na raiz do app | `yarn <script-existente>` |
| workspace pnpm, a partir da raiz | `pnpm --filter <package> run <script-existente>` |
| workspace Yarn, a partir da raiz | `yarn workspace <package> <script-existente>` |

`pnpm --filter` vale somente para workspace pnpm. Em monorepo npm ou configuração diferente, entre
na raiz do app e use o runner adotado pelo repositório. Não presuma `typecheck` ou `test`: se não
existirem, registre a cobertura ausente. Um build de produção — script `build` ou equivalente já
documentado pelo consumidor — precisa passar para considerar a fatia pronta.

Suba o script existente de desenvolvimento (`dev`, `start` ou equivalente) com o mesmo runner e
valide no navegador loading, vazio, erro, busca, foco, teclado e ações. Compare com a captura de
baseline e confirme que nenhum contrato de negócio mudou.

## Coexistência, remoção e rollback

Mantenha as duas bibliotecas enquanto houver imports, adaptadores, stories ou testes consumidores.
Desinstale a anterior somente após busca vazia, gates recuperados e smoke test. Se a fatia falhar,
reverta apenas seus commits; não altere domínio para contornar uma incompatibilidade visual. Gap
genérico pertence ao backlog Orion, não a fork local.

## Checklist

- [ ] stack, package manager, scripts e baseline registrados
- [ ] imports classificados e matriz de comportamento preenchida
- [ ] packages seletivos e todos os peers correspondentes instalados
- [ ] tokens, tema, `data-brand` e `@source` para `dist` conferidos
- [ ] uma fatia de baixo risco migrada por adaptadores `components/orion/*`
- [ ] hooks, APIs, permissões, rotas, validações e ações preservados
- [ ] gates existentes repetidos; cobertura ausente registrada; build aprovado
- [ ] estados e acessibilidade validados no navegador
- [ ] consumidores restantes buscados antes de desinstalar; rollback isolado possível
