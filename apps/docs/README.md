# docs

This is a Next.js application generated with
[Create Fumadocs](https://github.com/fuma-nama/fumadocs).

Run development server:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open http://localhost:3000 with your browser to see the result.

## Explore

In the project, you can see:

- `lib/source.ts`: Code for content source adapter, [`loader()`](https://fumadocs.dev/docs/headless/source-api) provides the interface to access your content.
- `lib/layout.shared.tsx`: Shared options for layouts, optional but preferred to keep.

| Route                     | Description                                            |
| ------------------------- | ------------------------------------------------------ |
| `app/(home)`              | The route group for your landing page and other pages. |
| `app/docs`                | The documentation layout and pages.                    |
| `app/api/search/route.ts` | The Route Handler for search.                          |

### Fumadocs MDX

A `source.config.ts` config file has been included, you can customise different options like frontmatter schema.

Read the [Introduction](https://fumadocs.dev/docs/mdx) for further details.

## GitHub Pages

O site é publicado em
[portais-orion.github.io/design-systems-orion](https://portais-orion.github.io/design-systems-orion/)
pelo workflow `deploy-docs-pages.yml`. Pushes em `main` que alteram docs ou packages renderizados
disparam novo deploy; também existe execução manual por `workflow_dispatch`.

Build equivalente ao Pages no PowerShell:

```powershell
$env:NEXT_PUBLIC_BASE_PATH = "/design-systems-orion"
$env:NEXT_PUBLIC_SITE_URL = "https://portais-orion.github.io/design-systems-orion"
pnpm --filter docs build
```

O resultado estático fica em `apps/docs/out`. GitHub Pages não executa servidor Next.js: busca
roda no navegador e recursos como proxy, rewrites, cookies, ISR e Server Actions não estão
disponíveis.

## Learn More

To learn more about Next.js and Fumadocs, take a look at the following
resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Fumadocs](https://fumadocs.dev) - learn about Fumadocs
