# GitHub Pages para o site MDX/Fumadocs

Data: 2026-08-13

## Conclusão

Sim. O `apps/docs` pode ser hospedado no GitHub Pages. Fumadocs documenta o uso de
export estático do framework, e Next.js gera HTML, CSS e JavaScript em `out/` com
`output: 'export'`. GitHub Pages aceita esses artefatos estáticos.

Não funciona sem adaptações. O app atual usa busca e proxy pensados para servidor,
otimização padrão de imagens e URLs que partem da raiz do domínio. O site de projeto
será publicado, por padrão, em:

```txt
https://portais-orion.github.io/design-systems-orion/
```

Logo, o build precisa conhecer o subcaminho `/design-systems-orion`.

## Estado atual e bloqueios

### 1. Export estático não está habilitado

`apps/docs/next.config.mjs` define somente `reactStrictMode`. Deve configurar
`output: 'export'`. Segundo Next.js, `next build` então produz `out/`, publicável em
qualquer host estático.

Fonte: [Next.js — Static Exports](https://nextjs.org/docs/app/guides/static-exports).

### 2. GitHub Project Pages exige `basePath`

O repositório não é o site especial `portais-orion.github.io`; portanto, a URL padrão
contém o nome do repositório. Deve usar:

```js
basePath: '/design-systems-orion'
```

`next/link` aplica `basePath` automaticamente. URLs construídas manualmente não
recebem esse tratamento.

Fontes:

- [GitHub Pages — What is GitHub Pages?](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- [Next.js — `basePath`](https://nextjs.org/docs/pages/api-reference/config/next-config-js/basePath)

Impactos locais:

- Os `Link` em `apps/docs/src/app/(home)/page.tsx` são compatíveis com `basePath`.
- `docsRoute`, `docsImageRoute` e `docsContentRoute`, em
  `apps/docs/src/lib/shared.ts`, geram caminhos absolutos manualmente.
- `getPageImage()` e `getPageMarkdownUrl()`, em `apps/docs/src/lib/source.ts`,
  precisam gerar URLs válidas dentro do subcaminho.
- Links absolutos presentes em `apps/docs/content/docs/index.mdx` precisam ser
  verificados, pois não são necessariamente tratados como `next/link`.
- `NEXT_PUBLIC_SITE_URL` deve apontar para a URL completa do Project Pages, incluindo
  `/design-systems-orion`, para metadados e imagens OG não apontarem para localhost ou
  para a raiz errada.

### 3. Busca atual depende de rota de servidor

`apps/docs/src/app/api/search/route.ts` exporta o `GET` padrão de
`createFromSource()`. Para build estático, Fumadocs documenta:

```ts
export const { staticGET: GET } = createFromSource(source);
```

O cliente deve usar `oramaStaticClient()`. O índice passa a ser carregado no
navegador; custo cresce com o volume da documentação.

Fonte: [Fumadocs — Built-in Search: static export](https://www.fumadocs.dev/docs/headless/search/orama).

### 4. `proxy.ts` não existe em hospedagem estática

`apps/docs/proxy.ts` reescreve pedidos de Markdown conforme URL ou cabeçalho
`Accept`. Proxy e rewrites exigem servidor e constam entre recursos incompatíveis com
Static Export.

As páginas HTML continuam exportáveis. A negociação automática de Markdown precisa
ser removida, substituída por links diretos aos arquivos/Route Handlers pré-gerados,
ou dispensada no deploy do Pages.

Fonte: [Next.js — Static Exports: unsupported features](https://nextjs.org/docs/app/guides/static-exports#unsupported-features).

### 5. `next/image` precisa dispensar o otimizador padrão

`apps/docs/src/components/brand-switcher.tsx` usa `next/image` para logos importadas.
O otimizador padrão exige servidor e não está disponível em export estático. Deve
usar `images.unoptimized: true` ou um loader compatível com hospedagem estática.

Fonte: [Next.js — Export with Image Optimization API](https://nextjs.org/docs/messages/export-image-api).

### 6. Route Handlers precisam ser pré-geráveis

Existem handlers para:

- `/llms.txt`;
- `/llms-full.txt`;
- `/llms.mdx/docs/...`;
- `/og/docs/...`.

Next.js permite Route Handlers `GET` estáticos. Rotas dinâmicas precisam enumerar
todos os parâmetros com `generateStaticParams()`. As duas rotas dinâmicas atuais já
fazem isso; o build exportado deve confirmar que todos os artefatos são emitidos.
Recursos que dependam de valores do pedido ou de servidor continuam incompatíveis.

Fonte: [Next.js — Static Exports](https://nextjs.org/docs/app/guides/static-exports).

## Deploy recomendado

Usar GitHub Actions, não branch `gh-pages` gerenciada manualmente:

1. Checkout.
2. Instalar Node e pnpm.
3. `pnpm install --frozen-lockfile`.
4. Build de `apps/docs` com URL pública correta.
5. `actions/configure-pages@v5`.
6. `actions/upload-pages-artifact@v4` com `path: apps/docs/out`.
7. Job separado com `actions/deploy-pages@v4`, permissões `pages: write` e
   `id-token: write`, no environment `github-pages`.

Fonte: [GitHub Pages — Using custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Mudanças mínimas

1. Configurar `output: 'export'`, `basePath: '/design-systems-orion'` e
   `images.unoptimized: true` em `apps/docs/next.config.mjs`.
2. Trocar busca por `staticGET` + `oramaStaticClient()`.
3. Remover dependência de `proxy.ts` no site publicado.
4. Tornar URLs de docs, Markdown e OG conscientes do `basePath`.
5. Configurar `NEXT_PUBLIC_SITE_URL` como
   `https://portais-orion.github.io/design-systems-orion` durante build.
6. Criar workflow que publique `apps/docs/out`.
7. Validar localmente todos os links, busca, logos, OG e arquivos `llms*` a partir do
   subcaminho, não apenas em `/`.

## Risco residual

Export estático elimina runtime Next.js. Busca roda no cliente, negociação por
cabeçalho não funciona e qualquer futura funcionalidade dependente de cookies,
Server Actions, ISR, redirects, headers ou rewrites exigirá outro host ou desenho
estático equivalente.

Fontes gerais:

- [Fumadocs — Static Build](https://www.fumadocs.dev/docs/deploying/static)
- [Next.js — Static Exports](https://nextjs.org/docs/app/guides/static-exports)
- [GitHub Pages — Custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
