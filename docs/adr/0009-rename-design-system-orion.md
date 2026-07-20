# 0009 — Rename do produto para "Design System Orion"

## Contexto
O produto era chamado, em prosa/branding, de "Núcleo de Portais" (ou "Núcleo de Portais do
Grupo") — ver ADR 0001. Desde a Sprint 7.5.2 o scope npm e a organização GitHub já são
`@portais-orion` / `portais-orion` ("Orion"). Ter um nome de produto diferente do nome do
scope/org gerava dois identificadores para a mesma coisa em documentação, READMEs e no site de
docs, o que soava inconsistente e — no julgamento de quem mantém o produto — feio.

## Decisão
Renomear o **nome de produto/marca** (não o repositório, não o scope npm, não a skill) de
"Núcleo de Portais" / "Núcleo de Portais do Grupo" para **"Design System Orion"** (forma curta
em prosa: "Orion"). Aplicado em: título e prosa do `README.md`, `AGENTS.md`, descrições dos
`package.json` de `tokens`/`ui`/`blocks`, site de docs (Fumadocs: `appName`, home, `index.mdx`),
introdução do Storybook, `docs/architecture/overview.md`, o prompt de release, e o texto de
exemplo da story do `Accordion`.

## Fora de escopo deste ADR (mantido como estava)
- Nome da pasta/repositório: `nucleo-portais` — renomear exigiria mover o remote git, os paths
  usados por CI/scripts e as referências cruzadas no `AGENTS.md` do `portal-supertrans`; custo
  desproporcional a um rename só de marca.
- Scope npm `@portais-orion` e org GitHub `portais-orion` — já migrado 3 vezes antes (`@grupo` →
  `@mateusarcestr` → `@supertrans-transportes` → `@portais-orion`); estável e doloroso de mudar
  de novo sem motivo técnico.
- Nome da skill `portais-orion-adoption` e seu path.
- Documentos históricos "sprint-N-resultado.md" (registros datados; não são branding vivo) e o
  próprio ADR 0001 (registra a decisão original tal como foi tomada).

## Consequências
Um único nome de produto ("Design System Orion" / "Orion") em toda a prosa viva do repositório
e do site de docs, alinhado ao scope/org já estável. `apps/docs/src/lib/shared.ts` (`appName`)
passa a ser a fonte de verdade do nome exibido no site — mudar o nome de novo no futuro é editar
essa constante e re-rodar `node scripts/generate-docs.mjs`.

## Riscos
Nenhum: é rename de texto em documentação/branding, sem tocar em código funcional, scope,
exports ou nome de pastas. Risco residual é esquecer uma menção pontual em prosa — não afeta
build nem consumo dos packages.

## Critérios de aceite
`README.md`, `AGENTS.md`, descrições dos 3 packages, site de docs (Fumadocs) e introdução do
Storybook usando "Design System Orion"/"Orion" em vez de "Núcleo de Portais". Documentos
históricos e ADR 0001 preservados como registro do nome original.
