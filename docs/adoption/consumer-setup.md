# Consumer setup — adotando `@design-systems-orion`

Guia canônico para instalar e adotar os packages públicos do Orion em um portal
React. O scope oficial é `@design-systems-orion`, publicado em
`registry.npmjs.org`; não é necessário `.npmrc`, token ou login para consumir
os packages.

## 1. Compatibilidade e packages

O Orion requer React 19 e Tailwind CSS v4. Os packages são:

- `@design-systems-orion/tokens`: sempre instale; fornece tokens semânticos e temas CSS.
- `@design-systems-orion/ui`: instale quando usar primitives como `Button`, `Badge` ou `Tabs`.
- `@design-systems-orion/blocks`: instale quando precisar de composições como `PageHeader` ou
  `DataTable`. Ele traz `ui` como dependency, mas o consumidor ainda precisa satisfazer todos os
  peers de `ui` e `blocks`.

Os peers publicados são os seguintes. Mesmo quando o gerenciador os instala automaticamente,
confirme que **todos os peers dos packages instalados** existem no consumidor e respeitam os
ranges publicados.

| Package | Peer dependencies |
| --- | --- |
| `tokens` | Nenhum |
| `ui` | `react@^19.0.0`, `react-dom@^19.0.0`, `@base-ui/react@^1.5.0`, `class-variance-authority@^0.7.1`, `lucide-react@^1.16.0`, `tailwind-merge@^3.6.0` |
| `blocks` | `react@^19.0.0`, `react-dom@^19.0.0`, `@tanstack/react-table@^8.20.0`, `lucide-react@^1.16.0` |

> Não use os scopes legados `@grupo`, `@mateusarcestr`,
> `@supertrans-transportes` ou `@portais-orion` em novos projetos.

## 2. Instalação pelo npm (npm, pnpm e Yarn)

Escolha o menor conjunto que atende ao portal. O caminho completo abaixo instala os três packages
e a união de todos os peers. Em projeto novo, `create-next-app` e Vite já fornecem React e React
DOM; se as versões instaladas satisfizerem `^19.0.0`, mantenha-as. Caso contrário, alinhe também
`react@^19.0.0` e `react-dom@^19.0.0` com o comando correspondente.

### Instalação completa

```bash
npm install @design-systems-orion/tokens @design-systems-orion/ui @design-systems-orion/blocks @base-ui/react@^1.5.0 @tanstack/react-table@^8.20.0 class-variance-authority@^0.7.1 lucide-react@^1.16.0 react@^19.0.0 react-dom@^19.0.0 tailwind-merge@^3.6.0
```

```bash
pnpm add @design-systems-orion/tokens @design-systems-orion/ui @design-systems-orion/blocks @base-ui/react@^1.5.0 @tanstack/react-table@^8.20.0 class-variance-authority@^0.7.1 lucide-react@^1.16.0 react@^19.0.0 react-dom@^19.0.0 tailwind-merge@^3.6.0
```

```bash
yarn add @design-systems-orion/tokens @design-systems-orion/ui @design-systems-orion/blocks @base-ui/react@^1.5.0 @tanstack/react-table@^8.20.0 class-variance-authority@^0.7.1 lucide-react@^1.16.0 react@^19.0.0 react-dom@^19.0.0 tailwind-merge@^3.6.0
```

### Instalação seletiva

Somente tokens não têm peers:

```bash
npm install @design-systems-orion/tokens
pnpm add @design-systems-orion/tokens
yarn add @design-systems-orion/tokens
```

Para tokens + primitives, instale `ui` e **todos** os peers de `ui`:

```bash
npm install @design-systems-orion/tokens @design-systems-orion/ui @base-ui/react@^1.5.0 class-variance-authority@^0.7.1 lucide-react@^1.16.0 react@^19.0.0 react-dom@^19.0.0 tailwind-merge@^3.6.0
pnpm add @design-systems-orion/tokens @design-systems-orion/ui @base-ui/react@^1.5.0 class-variance-authority@^0.7.1 lucide-react@^1.16.0 react@^19.0.0 react-dom@^19.0.0 tailwind-merge@^3.6.0
yarn add @design-systems-orion/tokens @design-systems-orion/ui @base-ui/react@^1.5.0 class-variance-authority@^0.7.1 lucide-react@^1.16.0 react@^19.0.0 react-dom@^19.0.0 tailwind-merge@^3.6.0
```

Para tokens + composições, `blocks` traz `ui` como dependency; instale a união dos peers dos dois:

```bash
npm install @design-systems-orion/tokens @design-systems-orion/blocks @base-ui/react@^1.5.0 @tanstack/react-table@^8.20.0 class-variance-authority@^0.7.1 lucide-react@^1.16.0 react@^19.0.0 react-dom@^19.0.0 tailwind-merge@^3.6.0
pnpm add @design-systems-orion/tokens @design-systems-orion/blocks @base-ui/react@^1.5.0 @tanstack/react-table@^8.20.0 class-variance-authority@^0.7.1 lucide-react@^1.16.0 react@^19.0.0 react-dom@^19.0.0 tailwind-merge@^3.6.0
yarn add @design-systems-orion/tokens @design-systems-orion/blocks @base-ui/react@^1.5.0 @tanstack/react-table@^8.20.0 class-variance-authority@^0.7.1 lucide-react@^1.16.0 react@^19.0.0 react-dom@^19.0.0 tailwind-merge@^3.6.0
```

Se o portal também importar primitives diretamente, prefira declarar `ui` como dependency direta,
usando a instalação completa. Não remova peers do comando com base apenas nos componentes usados:
o contrato é por package instalado.

## Skills opcionais para Codex e Claude Code

O npm instala os packages de runtime `tokens`, `ui` e `blocks`; as skills não acompanham o
`npm install` e não existe `postinstall` para instalá-las. No Codex, use o `skill-installer` e
reinicie o Codex. No Claude Code, copie as pastas oficiais completas de `ai/skills` para
`~/.claude/skills` (pessoal) ou `.claude/skills` (projeto). Elas podem ser chamadas por
`/new-portal` e `/portais-orion-adoption` ou ativadas automaticamente. Veja comandos Bash e
PowerShell na seção [Skills para Codex e Claude Code do README](https://github.com/portais-orion/design-systems-orion#skills-para-codex-e-claude-code).

## 3. Projeto novo com Next.js

Crie o app com TypeScript, Tailwind e App Router:

```bash
npx create-next-app@latest meu-portal --typescript --tailwind --eslint --app --src-dir --use-npm
cd meu-portal
```

Use `--use-pnpm` ou `--use-yarn` no lugar de `--use-npm` quando esse for o gerenciador escolhido.
O `--src-dir` torna o layout determinístico: o CSS global fica em `src/app/globals.css`. Depois do
scaffold, execute uma das receitas da seção 2; o exemplo de primeiro componente usa a instalação
completa.

Em `src/app/globals.css`, use os imports e sources abaixo. Partindo desse arquivo, `../../` alcança
o `node_modules` na raiz de `meu-portal`.

```css
@import "tailwindcss";
@import "@design-systems-orion/tokens/base.css";
@import "@design-systems-orion/tokens/themes/orion.css";
@source "../../node_modules/@design-systems-orion/ui/dist";
@source "../../node_modules/@design-systems-orion/blocks/dist";
```

Se estiver configurando um projeto existente sem `src/`, com CSS em `app/globals.css`, use
`../node_modules/...` nos `@source`. Omita o `@source` de um package que não foi instalado;
`tokens` não precisa de `@source`.

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
```

Depois, execute uma das receitas da seção 2 com npm. Para pnpm ou Yarn, use o comando de scaffold
equivalente do próprio Vite e a receita correspondente da seção 2.

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
de pacotes já adotado. Escolha packages e instale todos os peers correspondentes pela seção 2,
importe os tokens no CSS global existente e acrescente somente os `@source` dos packages com
componentes instalados, apontando para `dist` e com profundidade relativa ao arquivo CSS real.
Aplique `data-brand` no `<html>`
mantendo layout, rotas, autenticação, hooks e integrações do portal intactos.

Para Next.js, `transpilePackages` continua desnecessário por padrão. Para Vite,
garanta que `@tailwindcss/vite` esteja configurado como na seção anterior.

## 6. Tokens, tema e Tailwind v4

Na instalação completa, carregue nesta ordem no CSS global:

```css
@import "tailwindcss";
@import "@design-systems-orion/tokens/base.css";
@import "@design-systems-orion/tokens/themes/orion.css";
@source "../node_modules/@design-systems-orion/ui/dist";
@source "../node_modules/@design-systems-orion/blocks/dist";
```

Os caminhos acima ilustram um CSS um nível abaixo da raiz. Ajuste apenas a
profundidade de `node_modules`: cada `@source` é relativo ao próprio arquivo
CSS e deve apontar para `ui/dist` e `blocks/dist`, nunca para `src`. Na instalação seletiva, omita
o `@source` do package não instalado; `tokens` não precisa de `@source`.

`base.css` define os tokens semânticos; o tema define seus valores por marca.
Escolha o tema pelo CSS e pelo atributo `data-brand`, nunca por uma prop de
marca em componentes.

## 7. Primeiro componente

O exemplo abaixo pressupõe a instalação completa. Na instalação seletiva, renderize somente um
componente de cada package escolhido. Prefira imports por subpath para manter o consumo explícito:

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

Crie somente o arquivo correspondente a cada package escolhido.

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

Leia as release notes e atualize os packages instalados de forma compatível. Revise
os peers após a atualização, execute typecheck e build do portal e faça smoke
test das telas que consomem componentes alterados. Mantenha os adaptadores
locais como o único ponto para absorver mudanças de API.

## 11. Troubleshooting

| Sintoma | Verificação |
| --- | --- |
| Componentes sem estilo | Confirme `base.css`, o CSS do tema, `data-brand` e os `@source` dos packages instalados. |
| Classes do Orion ausentes no CSS final | Confira se cada `@source` é relativo ao CSS global e termina em `ui/dist` ou `blocks/dist`. |
| Aviso ou erro de peer dependency | Alinhe as versões instaladas aos ranges publicados na seção 1. |
| Erro de compilação no Next.js | Não adicione `transpilePackages` automaticamente; investigue o erro específico e use-o apenas se necessário. |
| Import não encontrado | Use um subpath exportado, como `@design-systems-orion/ui/button`, e confira a versão instalada. |

## 12. Checklist final

- [ ] Todos os peers dos packages instalados respeitam os ranges publicados.
- [ ] `tokens` está instalado; `ui` e `blocks` foram adicionados somente quando necessários.
- [ ] O CSS global importa Tailwind, `base.css` e o tema da marca.
- [ ] `data-brand` corresponde ao tema importado.
- [ ] Os `@source` são relativos ao CSS, apontam somente para `dist` e cobrem os packages instalados.
- [ ] Os componentes são importados por subpath, preferencialmente via adaptadores locais.
- [ ] Typecheck, build e smoke test do portal passaram.
- [ ] Em uma migração, a dependência antiga só foi removida após não haver imports remanescentes.
