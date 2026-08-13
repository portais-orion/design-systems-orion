# GitHub Pages para documentação Orion — design

## Objetivo

Publicar `apps/docs`, site Next.js 16 + Fumadocs + MDX, em
`https://portais-orion.github.io/design-systems-orion/` usando GitHub Pages e GitHub Actions.

## Arquitetura

O site será exportado como arquivos estáticos por `next build` com `output: "export"`. O build
receberá `NEXT_PUBLIC_BASE_PATH=/design-systems-orion` e `NEXT_PUBLIC_SITE_URL` com a URL pública.
Desenvolvimento local continuará em `/`, sem subpath. `images.unoptimized` eliminará dependência
do otimizador de imagens do servidor Next.js.

GitHub Actions instalará pnpm/dependências, executará o build do workspace `docs`, enviará
`apps/docs/out` com `actions/upload-pages-artifact` e publicará com `actions/deploy-pages`.
Deploy ocorrerá em push para `main` e manualmente por `workflow_dispatch`.

## Conteúdo e rotas

- Páginas MDX continuam pré-renderizadas por `generateStaticParams()`.
- Busca Fumadocs trocará o handler por `staticGET` e o provider usará `oramaStaticClient`; índice e
  busca rodarão no navegador.
- Rotas `llms.txt`, `llms-full.txt`, Markdown e OG deverão ser totalmente pré-geradas.
- `proxy.ts` será removido, pois negociação por cabeçalho e rewrites exigem servidor. Links diretos
  para Markdown continuarão disponíveis.
- Helpers de URL aplicarão `basePath` somente a caminhos internos construídos manualmente.
- `trailingSlash: true` será usado para servir rotas aninhadas corretamente no Pages.

## Configuração do Pages

Workflow terá permissões mínimas `contents: read`, `pages: write`, `id-token: write`, concurrency
por grupo `pages` e environment `github-pages`. `gh api` será usado somente para habilitar Pages
com fonte `workflow`, após workflow estar no GitHub.

## Testes e aceitação

1. Teste automatizado RED/GREEN cobre basePath e URLs internas.
2. `pnpm --filter docs typecheck`, lint e build estático passam.
3. `apps/docs/out/index.html`, páginas de docs, busca estática, `llms*` e assets existem.
4. Busca/links gerados contêm `/design-systems-orion` no build Pages e não no build local.
5. Gates do monorepo passam, exceto falha comprovadamente causada por arquivo externo do usuário.
6. Workflow validado e enviado ao GitHub; Pages habilitado; run acompanhado até conclusão.

## Limites e rollback

Sem runtime Next.js no Pages: cookies, Server Actions, ISR, redirects, rewrites e negociação por
`Accept` ficam indisponíveis. Rollback: reverter workflow/configuração ou desabilitar Pages via
GitHub. Nenhum package npm muda por causa desta implantação.
