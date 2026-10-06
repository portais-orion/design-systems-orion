# Baseline de movimento — 2026-10-05

Versões verificadas no registry e instaladas: Motion 14.0.0 e Anime.js 4.5.0,
ambas MIT. Motion aceita React 18/19; Orion mantém seu peer React 19. Peers
Three.js de Anime são opcionais. Nenhum módulo Anime é importado nesta entrega.

## Bundle comparável

Node 24.16.0, pnpm 9.15.4 e esbuild 0.27.7 (resolvido pelo tsup). Execute
`node scripts/measure-motion.mjs` na raiz. ESM minificado, splitting ligado,
React/React DOM externos, gzip por arquivo. A medição usa sources e é um proxy;
não inclui runtime React, CSS ou custos completos de um portal.

| Cenário | Antes (gzip) | Depois (gzip) | Engines |
| --- | ---: | ---: | --- |
| Button por subpath | 12.564 B | 12.564 B | Nenhuma |
| FiltersCard + LauncherCard, entrada | 15.043 B | 20.568 B | Motion |
| Chunk compartilhado dos pilotos | — | 27.774 B | Motion |
| Chunk dinâmico dos pilotos | — | 77 B | Reexport de features |

Somando os arquivos gzip dos pilotos: 48.419 B, aumento de 33.376 B. Neste
bundler, features e runtime acabam no chunk compartilhado carregado pela entrada;
LazyMotion não garante que os bytes das features serão transferidos depois.
Não anunciar custo inicial zero ou um chunk adicional de somente 77 B como
custo total de Motion. Anime está ausente dos dois cenários.

No smoke dos tarballs com Vite 8.1.3/Rolldown, o app completo (inclui React)
gerou entrada de 313,07 kB / 102,11 kB gzip e features de 5,50 kB / 2,17 kB gzip.
O browser solicitou o chunk de features na ativação. Esses números são de outro
cenário e não substituem a comparação source/esbuild acima.

O critério de distribuição é ausência de engines no Button e ausência de Anime
nos componentes migrados. Como referência para regressões futuras, usar aumento
máximo de 40 KiB gzip para os dois pilotos neste método. Esse limite foi adotado
após a medição, não constitui um orçamento previamente acordado de um produto.

## Funcionalidade e limites

Stories exercitam três marcas, Full/Reduced/Off, foco, Escape, teclado,
preservação de estado ao mudar provider, saída indisponível ao formulário e
entrada com duração lida de CSS. A preferência desconhecida no SSR resolve
movimento reduzido e o conteúdo inicial permanece visível.

Não foi feito benchmark de FPS ou latência num portal real. A validação local
de browser/SSR não demonstra ganho de desempenho de backend ou navegação. O
canário em consumidor real continua em tarefa separada, após publicação.

Smokes dos tarballs: Vite e Next 16.2.10 com React 19.2.7 passaram em desktop e
viewport de 390 px, nas três marcas. Input preservado ao alterar provider;
preferência alterada durante saída remove conteúdo e devolve foco; SSR Node e
hidratação Next não ocultam o conteúdo inicial. Next também chamou `cn()` e
`mergeCopy()` no servidor, protegendo exports puros contra fronteiras cliente.

Next foi validado com `next build --webpack` e CSS pré-compilado pelo Vite a
partir de `dist`. O processamento CSS com Turbopack/Windows e `@source` em
symlinks pnpm falhou com caminho `\\?\C:\...` considerado fora da raiz; Webpack
com o mesmo processamento CSS não concluiu e foi interrompido. Não há garantia
desse pipeline CSS neste ambiente. Nenhuma configuração de produto foi alterada.
