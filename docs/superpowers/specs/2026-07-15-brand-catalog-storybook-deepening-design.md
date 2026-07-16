# Catálogo interno de marcas e Storybook — design

Status: implementado e verificado

Data: 2026-07-15

## Problema

O conjunto de marcas aparece hoje em superfícies independentes: `apps/storybook/src/brands.ts`, `packages/tokens/scripts/validate-tokens.mjs`, `packages/tokens/src/index.css`, `packages/tokens/package.json` e os arquivos em `packages/tokens/src/themes/`. O gate atual detecta parte das divergências, mas depende de parsing textual e mantém mais de uma fonte de verdade. Adicionar uma marca exige conhecer e editar detalhes espalhados.

O objetivo é criar um módulo profundo: catálogo interno pequeno como interface; descoberta, derivação, sincronização e diagnósticos concentrados na implementação. Portais não recebem interface JavaScript nova e continuam importando somente CSS.

## Decisões vinculantes

- Catálogo é interno ao Núcleo; não integra o artefato publicado de `@portais-orion/tokens`.
- Marca nova exige exatamente um tema CSS e uma entrada explícita no catálogo.
- `packages/tokens/brands.json` é a fonte única de IDs, labels e marca padrão.
- Tema continua resolvido por CSS variables e `data-brand`; componentes não recebem prop de marca.
- `index.css` e exports de tema do manifesto são derivados e permanecem commitados para revisão.
- Storybook consome o catálogo diretamente; `apps/storybook/src/brands.ts` deixa de existir.
- Erros são agregados e retornados pelo módulo puro; adapters CLI decidem saída e escrita.

## Interface do catálogo

```json
{
  "defaultBrand": "supertrans",
  "brands": [
    { "id": "supertrans", "label": "Supertrans" },
    { "id": "aurora", "label": "Aurora" }
  ]
}
```

Invariantes:

- `defaultBrand` referencia exatamente uma marca cadastrada.
- `id` usa slug minúsculo `[a-z0-9]+(?:-[a-z0-9]+)*` e é único.
- `label` não é vazia e é única após normalização de espaços e caixa.
- Ordem do array define ordem da toolbar e dos comparativos.
- Cada ID corresponde a `packages/tokens/src/themes/<id>.css`.
- Nenhum tema CSS pode existir sem entrada correspondente.

## Módulo profundo

O seam vive em `scripts/lib/brand-catalog.mjs`. Sua interface pública para scripts e testes contém três operações:

```js
deriveBrandArtifacts(catalog)
validateBrandState(input)
synchronizeBrandArtifacts(input)
```

`deriveBrandArtifacts` retorna:

- imports ordenados esperados para `packages/tokens/src/index.css`;
- exports source esperados `./themes/<id>.css`;
- exports dist esperados para `publishConfig.exports`;
- itens da toolbar e `defaultBrand` normalizados.

`validateBrandState` recebe catálogo, inventário de temas, conteúdo dos temas, base CSS, index CSS e manifesto. Retorna diagnósticos estruturados ou strings determinísticas. Não lê disco, não escreve arquivos e não encerra processo.
`synchronizeBrandArtifacts` recebe estado já validado e retorna o novo conteúdo de `index.css` e o novo manifesto. Preserva todos os campos e exports não relacionados a temas. Também não produz efeitos colaterais.


Complexidade escondida no módulo:

- schema e unicidade do catálogo;
- correspondência exata catálogo ↔ temas;
- seletores triplos obrigatórios;
- completude dos tokens de identidade;
- paridade dos imports e exports derivados;
- preservação das partes não derivadas do manifesto.

## Adapters

Um CLI fino carrega arquivos reais e oferece:

- `--check`: compara estado atual com derivações, agrega diagnósticos e sai diferente de zero em divergência;
- `--write`: atualiza somente imports de temas em `index.css` e exports de temas em `package.json`, preservando comentários estáveis do CSS e todos os demais campos do manifesto.

Sem modo, o CLI mostra uso e falha. O adapter não duplica regras do módulo.

`packages/tokens/scripts/validate-tokens.mjs` passa a consumir catálogo e módulo compartilhado. `scripts/check-storybook-brands.mjs` deixa de fazer parsing textual de TypeScript; valida apenas integração relevante ou é absorvido pelo novo CLI quando não acrescentar comportamento.

## Storybook

`apps/storybook/.storybook/preview.tsx` e `apps/storybook/stories/marcas.stories.tsx` importam `packages/tokens/brands.json` diretamente. `resolveJsonModule` já está habilitado.

Toolbar:

- itens vêm de `brands` na ordem declarada;
- título usa `label`;
- valor usa `id`;
- fallback e `initialGlobals.brand` usam `defaultBrand`;
- decorator continua aplicando somente `data-brand` no `<html>`.

Comparativo:

- renderiza todas as marcas do catálogo;
- continua usando containers aninhados com `data-brand`;
- prova que componentes não bifurcam comportamento por prop.

## Fluxo operacional

```text
packages/tokens/brands.json
  ├─ toolbar e comparativo do Storybook
  ├─ validação de themes/*.css
  ├─ imports derivados de index.css
  └─ exports source/dist derivados do package.json
```

Adicionar marca:

1. criar `src/themes/<id>.css` com todos os tokens e seletores obrigatórios;
2. adicionar `{ id, label }` em `brands.json`;
3. executar sincronização `--write`;
4. executar gates e validar Storybook;
5. registrar changeset do package consumível.

## Erros e segurança de escrita

- Diagnósticos identificam arquivo, marca e valor esperado/atual quando aplicável.
- Escrita é limitada a `packages/tokens/src/index.css` e `packages/tokens/package.json`.
- Adapter resolve caminhos absolutos e confirma que ambos permanecem sob o repositório.
- Manifesto é sincronizado em memória; nenhum campo alheio a exports de tema é removido ou reordenado deliberadamente.
- Catálogo inválido impede `--write`; estado ambíguo nunca é corrigido parcialmente.

## Estratégia de testes

TDD no seam puro:

- catálogo atual válido;
- ID, label e default inválidos ou duplicados;
- tema ausente e tema órfão;
- selector obrigatório ausente;
- token de identidade ausente;
- imports de `index.css` desatualizados;
- exports source/dist desatualizados;
- derivação determinística e ordenada;
- sincronização preserva campos não derivados do manifesto.

Integração:

- CLI `--check` sobre arquivos reais;
- `pnpm check` inclui novo gate;
- `pnpm typecheck` valida import JSON no Storybook;
- `pnpm build` valida tokens e build estático do Storybook;
- story comparativa permanece disponível para Supertrans e Aurora.

## Compatibilidade e migração

- IDs `supertrans` e `aurora`, labels, ordem e default atuais permanecem.
- Subpaths públicos `./themes/supertrans.css` e `./themes/aurora.css` permanecem idênticos.
- Nenhuma dependência runtime nova.
- Nenhuma alteração nos portais consumidores.
- ADR 0005 permanece íntegra: CSS variables + `data-brand`, nunca props ou provider JavaScript.

## Critérios de aceite

- Existe uma única declaração manual de IDs e labels de marcas.
- Adicionar marca exige somente tema CSS + entrada no catálogo; derivados são sincronizados pelo CLI.
- Tema ausente, órfão ou incompleto falha com diagnóstico acionável.
- Storybook usa catálogo para toolbar, default e comparativo.
- Exports atuais permanecem inalterados.
- Catálogo não aparece no tarball publicado.
- `pnpm check`, `pnpm typecheck` e `pnpm build` passam.
- Storybook valida Supertrans e Aurora.

## Fora de escopo

- Catálogo público para portais.
- ThemeProvider JavaScript.
- Tokens ou identidade de nova empresa.
- Mudanças visuais nos temas atuais.
- Alterações nos repositórios de produtos.
