# Consumer setup — adotando `@design-systems-orion`

Guia canônico para instalar e adotar os packages públicos do Orion em um portal
React. O scope oficial é `@design-systems-orion`, publicado em
`registry.npmjs.org`; não é necessário `.npmrc`, token ou login para consumir
os packages.

## 1. Compatibilidade e packages

O Orion requer React 19 e Tailwind CSS v4. Os packages são:

- `@design-systems-orion/tokens`: tokens semânticos e temas CSS.
- `@design-systems-orion/ui`: primitives compartilhadas.
- `@design-systems-orion/blocks`: composições genéricas construídas sobre `ui`.

Os peers publicados são os seguintes. Gerenciadores modernos podem instalá-los
automaticamente, mas as versões no portal precisam respeitar os ranges
publicados.

| Package | Peer dependencies |
| --- | --- |
| `tokens` | Nenhum |
| `ui` | `react@^19.0.0`, `react-dom@^19.0.0`, `@base-ui/react@^1.5.0`, `class-variance-authority@^0.7.1`, `lucide-react@^1.16.0`, `tailwind-merge@^3.6.0` |
| `blocks` | `react@^19.0.0`, `react-dom@^19.0.0`, `@tanstack/react-table@^8.20.0`, `lucide-react@^1.16.0` |

> Não use os scopes legados `@grupo`, `@mateusarcestr`,
> `@supertrans-transportes` ou `@portais-orion` em novos projetos.

## 2. Instalação pelo npm (npm, pnpm e Yarn)

Escolha o gerenciador já usado pelo portal:

```bash
npm install @design-systems-orion/tokens @design-systems-orion/ui @design-systems-orion/blocks
```

```bash
pnpm add @design-systems-orion/tokens @design-systems-orion/ui @design-systems-orion/blocks
```

```bash
yarn add @design-systems-orion/tokens @design-systems-orion/ui @design-systems-orion/blocks
```

Se o gerenciador não resolver os peers automaticamente, instale os que forem
usados pelo portal respeitando os ranges da seção anterior.

## 3. Projeto novo com Next.js

Crie o app com TypeScript, Tailwind e App Router:

```bash
npx create-next-app@latest meu-portal --typescript --tailwind --eslint --app
cd meu-portal
npm install @design-systems-orion/tokens @design-systems-orion/ui @design-systems-orion/blocks
```

Em `apps/web/src/app/globals.css`, use os imports e sources abaixo. O caminho
dos `@source` é relativo a esse arquivo; neste layout, `../../` alcança
`apps/web/node_modules`.

```css
@import "tailwindcss";
@import "@design-systems-orion/tokens/base.css";
@import "@design-systems-orion/tokens/themes/orion.css";
@source "../../node_modules/@design-systems-orion/ui/dist";
@source "../../node_modules/@design-systems-orion/blocks/dist";
```

No layout raiz, aplique a marca que representa o portal:

```tsx
<html lang="pt-BR" data-brand="orion">
```

Troque `orion` por uma marca publicada, como `supertrans` ou `aurora`, e
importe o CSS do tema correspondente quando necessário.

`transpilePackages` é desnecessário por padrão: o Orion publica ESM compilado
em `dist`. Adicione-o somente se um erro específico do seu setup exigir isso e
registre o motivo.

## 4. Projeto novo com Vite

Crie e instale o projeto:

```bash
npm create vite@latest meu-portal -- --template react-ts
cd meu-portal
npm install
npm install tailwindcss @tailwindcss/vite
npm install @design-systems-orion/tokens @design-systems-orion/ui @design-systems-orion/blocks
```

Configure o plugin do Tailwind em `vite.config.ts`:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

Em `src/index.css`, use o CSS canônico. Cada `@source` é relativo ao arquivo
CSS; partindo de `src/index.css`, `../` alcança o `node_modules` do projeto.

```css
@import "tailwindcss";
@import "@design-systems-orion/tokens/base.css";
@import "@design-systems-orion/tokens/themes/orion.css";
@source "../node_modules/@design-systems-orion/ui/dist";
@source "../node_modules/@design-systems-orion/blocks/dist";
```

Defina `data-brand="orion"` no elemento `<html>` de `index.html` (ou no root
renderizado pelo React). Para outra marca, altere tanto o atributo quanto o
import do tema.

## 5. Projeto existente

Não recrie o projeto. Primeiro confirme React 19, Tailwind v4 e o gerenciador
de pacotes já adotado. Instale os três packages, importe os tokens no CSS global
existente e acrescente os dois `@source` apontando apenas para `dist`, com a
profundidade relativa ao arquivo CSS real. Aplique `data-brand` no `<html>`
mantendo layout, rotas, autenticação, hooks e integrações do portal intactos.

Para Next.js, `transpilePackages` continua desnecessário por padrão. Para Vite,
garanta que `@tailwindcss/vite` esteja configurado como na seção anterior.

## 6. Tokens, tema e Tailwind v4

Sempre carregue nesta ordem no CSS global:

```css
@import "tailwindcss";
@import "@design-systems-orion/tokens/base.css";
@import "@design-systems-orion/tokens/themes/orion.css";
@source "../node_modules/@design-systems-orion/ui/dist";
@source "../node_modules/@design-systems-orion/blocks/dist";
```

Os caminhos acima ilustram um CSS um nível abaixo da raiz. Ajuste apenas a
profundidade de `node_modules`: cada `@source` é relativo ao próprio arquivo
CSS e deve apontar para `ui/dist` e `blocks/dist`, nunca para `src`.

`base.css` define os tokens semânticos; o tema define seus valores por marca.
Escolha o tema pelo CSS e pelo atributo `data-brand`, nunca por uma prop de
marca em componentes.

## 7. Primeiro componente

Prefira imports por subpath para manter o consumo explícito:

```tsx
import { Button } from "@design-systems-orion/ui/button";
import { PageHeader } from "@design-systems-orion/blocks/page-header";

export function Example() {
  return (
    <main className="space-y-6 p-6">
      <PageHeader title="Visão geral" />
      <Button>Salvar</Button>
    </main>
  );
}
```

Inicie com uma tela pequena e confirme no navegador que tokens, tema e classes
dos packages foram carregados.

## 8. Adaptadores locais

Crie uma fronteira de consumo no portal para que o restante do app não dependa
diretamente de cada subpath do Orion:

```ts
// components/orion/ui.ts
export { Button } from "@design-systems-orion/ui/button";

// components/orion/blocks.ts
export { PageHeader } from "@design-systems-orion/blocks/page-header";
```

Importe esses adaptadores locais nas telas. Eles podem normalizar pequenos
detalhes de API ou expor aliases temporários, mas não devem copiar código do
Orion nem esconder lógica de negócio. Quando uma API genérica faltar, abra uma
issue no Orion em vez de alterar o package por uma necessidade específica do
portal.

## 9. Migração de outra biblioteca

A nova e a antiga biblioteca podem coexistir durante a transição. Mapeie cada
componente pelo comportamento (estados, acessibilidade, eventos e dados), não
apenas pelo nome ou aparência. Migre uma fatia vertical por vez — por exemplo,
uma tela ou fluxo completo de baixa criticidade — preservando rotas, hooks,
permissões e APIs do portal.

Após cada fatia, procure imports remanescentes da biblioteca antiga e mantenha
uma lista do que ainda depende dela. Remova a dependência antiga somente depois
que todos os imports forem eliminados e o typecheck, build e smoke test do
portal passarem. A skill `portais-orion-adoption` detalha o fluxo de migração.

## 10. Atualização de versão

Leia as release notes e atualize os três packages de forma compatível. Revise
os peers após a atualização, execute typecheck e build do portal e faça smoke
test das telas que consomem componentes alterados. Mantenha os adaptadores
locais como o único ponto para absorver mudanças de API.

## 11. Troubleshooting

| Sintoma | Verificação |
| --- | --- |
| Componentes sem estilo | Confirme `base.css`, o CSS do tema, `data-brand` e os dois `@source` para `dist`. |
| Classes do Orion ausentes no CSS final | Confira se cada `@source` é relativo ao CSS global e termina em `ui/dist` ou `blocks/dist`. |
| Aviso ou erro de peer dependency | Alinhe as versões instaladas aos ranges publicados na seção 1. |
| Erro de compilação no Next.js | Não adicione `transpilePackages` automaticamente; investigue o erro específico e use-o apenas se necessário. |
| Import não encontrado | Use um subpath exportado, como `@design-systems-orion/ui/button`, e confira a versão instalada. |

## 12. Checklist final

- [ ] React, React DOM e peers respeitam os ranges publicados.
- [ ] `tokens`, `ui` e `blocks` estão instalados pelo gerenciador do portal.
- [ ] O CSS global importa Tailwind, `base.css` e o tema da marca.
- [ ] `data-brand` corresponde ao tema importado.
- [ ] Os `@source` são relativos ao CSS e apontam somente para `ui/dist` e `blocks/dist`.
- [ ] Os componentes são importados por subpath, preferencialmente via adaptadores locais.
- [ ] Typecheck, build e smoke test do portal passaram.
- [ ] Em uma migração, a dependência antiga só foi removida após não haver imports remanescentes.
