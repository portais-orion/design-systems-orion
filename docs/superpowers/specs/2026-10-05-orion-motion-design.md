# Movimento compartilhado no Orion — proposta de arquitetura

Data: 2026-10-05. Status: proposta para revisão; nenhuma implementação autorizada por este documento.

## Objetivo e escopo

Dar continuidade visual a abertura de painéis, entrada de cards e mudanças de estado, sem atrasar ações, perder foco ou prejudicar usuários que preferem movimento reduzido. Política compartilhada no Orion; gatilhos de negócio e ativação por tela pertencem aos portais.

O pedido atualizado prioriza animar os componentes JÁ EXISTENTES e deixar Anime.js instalado para uso futuro. Motion será aplicado aos componentes existentes; Anime.js estará disponível como dependência, sem exigir demonstração ou adapter nesta entrega. Supertrans é o primeiro consumidor proposto; filtros de demandas e cards da home são candidatos, ainda sem inspeção do checkout desse produto nesta tarefa. Aurora entra depois. Esta etapa entrega somente planejamento.

## Evidência do checkout

| Fonte | Situação observada | Consequência |
| --- | --- | --- |
| `docs/adr/0006-camadas-ui-blocks-apps.md` | Camadas tokens → ui → blocks → apps; sem dependência invertida | Introdução de pacote de suporte exige decisão arquitetural explícita |
| `packages/ui/package.json` e `docs/adoption/consumer-setup.md` | React 19 e Base UI; exports de desenvolvimento e publicação distintos | Preservar compatibilidade, subpaths e distribuição ESM |
| `packages/ui/src/{dialog,popover,sheet}/*.tsx` | Classes de animação CSS já presentes | Evitar animar duas vezes a mesma propriedade |
| `packages/ui/src/accordion/accordion.tsx` | Seta possui transição; painel sem animação explícita | Candidato futuro; não criar outro Accordion |
| `packages/blocks/src/filters-card/filters-card.tsx` | Conteúdo desmontado quando `isOpen` fica falso | Piloto precisa coordenar saída, foco e desmontagem |
| `packages/blocks/src/launcher-card/launcher-card.tsx` | Hover CSS e navegação delegada ao consumidor | Preservar elemento interativo e API de navegação |
| `packages/tokens/brands.json` | Supertrans, Aurora e Orion | Tokens e validação devem cobrir três marcas |
| `apps/storybook/.storybook/preview.tsx` | Marca via catálogo; a11y global em `todo` | Pilotos precisam de a11y em `error`, além de inspeção visual |
| `scripts/lib/workspace.mjs`, `package.json`, `.github/workflows/release-packages.yml` | Catálogo/distribuição e publicação existentes | Integrar novo pacote ao pipeline, sem publicação automática |
| `scripts/check-purity.mjs` | Algumas regras limitadas a ui/blocks/tokens | Estender proteção contra Next e data-fetching ao novo pacote |

As notas em `ai/context/02-current-decisions.md` não descrevem todas as versões atuais. Manifests e catálogo do checkout prevalecem para inventário.

## Alternativas

1. **Pacote de suporte dedicado, recomendado:** política única, adapter Motion e consumo por subpath. As duas libs ficam instaladas nele; integração Anime será criada quando houver uso concreto. Acrescenta trabalho de distribuição, mas evita acoplar todos os componentes às duas engines.
2. **Tudo dentro de ui:** menos configuração inicial; mistura política, engines e primitives, dificultando consumo independente e controle de bundle.
3. **Implementar em cada portal:** adoção local rápida; duplica defaults, acessibilidade e manutenção. Contraria centralização pedida.

CSS continua adequado para transições simples. Motion cobre comportamento React; Anime.js entra apenas em sequências que justifiquem seu custo. Uma engine por elemento/propriedade durante cada animação.

## Arquitetura proposta

Criar `@design-systems-orion/motion` como suporte transversal, dependente de tokens e independente de ui, blocks e produtos. Dependências permitidas propostas: ui → tokens/motion; blocks → ui/motion; motion → tokens. Tokens permanece CSS puro. Registrar essa ampliação em uma ADR proposta; não alterar a ADR 0006 nem implementar o novo grafo antes da decisão.

| Entrada pública proposta | Responsabilidade | Dependência de engine |
| --- | --- | --- |
| `@design-systems-orion/motion` | Tipos e resolução pura de política | Nenhuma |
| `@design-systems-orion/motion/react` | Provider e hook de política | Nenhuma |
| `@design-systems-orion/motion/motion` | Boundary React, presets e componentes leves `m` | Motion |

Barrels raiz não reexportam adapters. React e React DOM seguem peers compatíveis com Orion. `motion` e `animejs` serão dependencies normais do novo pacote, external no build. Anime.js ficará instalado, sem imports de runtime enquanto não for usado; consumidores receberão a dependência transitiva, mas não precisarão de uma instalação extra para os componentes Orion. Instalação em disco não equivale a bytes enviados ao navegador: confirmar ausência de Anime nos bundles dos componentes atuais.

Quando houver necessidade concreta, criar integração Anime delimitada pelo root e carregada sob demanda. Não declarar export `/anime` nem construir wrapper antes desse uso. Um produto que queira importar `animejs` diretamente deve declará-lo em seu próprio manifest; dependência transitiva do Orion não constitui API pública para imports diretos do produto.

Versões exatas e ranges serão registrados no primeiro trabalho de compatibilidade, após verificar releases, manifests e APIs. Não instalar `latest` sem registrar a versão validada. Não depender de Motion+ nem de exemplos premium.

## Contrato de política proposto

- `MotionProvider({ children, enabled = false, reducedMotion = "user" })`; `reducedMotion` aceita `"user" | "always"`. Sem provider, comportamento novo fica desativado e componentes mantêm comportamento atual.
- `useMotionPolicy()` retorna `{ enabled: boolean, reduceMotion: boolean }`. Política do sistema operacional sempre prevalece sobre ativação local; não oferecer `"never"` nesta primeira versão.
- `resolveMotionPolicy({ enabled, reducedMotion, userPrefersReducedMotion })` é função pura compartilhada pelos adapters. Preferência ainda desconhecida na hidratação usa resolução conservadora, sem entrada animada inicial.
- Provider não cria wrapper DOM. Estilos/atributos de política são aplicados ao elemento animado pelo adapter, inclusive conteúdo portaled; não depender exclusivamente de herança CSS de um ancestral fora do portal.
- `OrionMotionBoundary({ children })` traduz política para MotionConfig e LazyMotion. Usar `m` e `domAnimation`; features carregadas sob demanda. `domMax`, drag e layout global ficam fora do piloto.
- Integração Anime futura deve respeitar a mesma política, criar scope no effect restrito ao root e executar `revert()` no cleanup. Import pendente não pode iniciar após desmontagem ou desativação. Falha de carregamento mantém estado final estático e informação visível. API será definida junto do primeiro uso real.

Nomes são propostas. Não construir API genérica que esconda todas as funcionalidades das duas libs. Tipos de Motion/Anime não entram nas props públicas de FiltersCard ou LauncherCard.

## Tokens e comportamento

Propor duração rápida `120ms`, padrão `180ms`, painel `240ms`; distância curta `4px`, padrão `8px`; intensidade `1`; easing de entrada `cubic-bezier(0.16, 1, 0.3, 1)` e saída `cubic-bezier(0.4, 0, 1, 1)`. São defaults de projeto para validar visualmente, não valores recomendados oficialmente pelas bibliotecas.

Tokens recebem namespace `motion`, mapeamento em `@theme inline`, defaults neutros e valores explícitos em TODOS os temas do catálogo. Começar com valores iguais entre marcas. Resolver CSS variables no elemento animado após montagem; converter ms para segundos somente na fronteira Motion. Não duplicar números em presets JavaScript nem ler document/window ao importar módulo. Validar suporte do Tailwind v4 aos namespaces escolhidos antes de fixar nomes de utilities.

Preferir opacity/transform. Altura de FiltersCard é exceção localizada, com medição de custo e suporte a conteúdo dinâmico. Evitar `transition-all`, parallax, loops decorativos, entrada de cada linha de tabela e atraso artificial em ações.

Modo desativado: estado final imediato, sem novos efeitos. Movimento reduzido: sem deslocamento, escala ou altura interpolada; permitir apenas fade curto, limitado à duração rápida. Anime decorativo fica estático. Troca de preferência durante animação cancela movimento e converge ao estado final. CSS recebe proteção por media query; MotionConfig sozinho não cobre CSS nem Anime.

## Pilotos e expansão

1. **FiltersCard:** Motion na abertura/saída do corpo, incluindo footer; estado controlado e não controlado preservados. Fechamento torna controles indisponíveis ao teclado imediatamente; se foco estiver no corpo, retorná-lo ao toggle antes de ocultar. Retenção de DOM para saída não pode criar submissão inesperada nem mudar callbacks.
2. **LauncherCard:** entrada sutil e feedback visual usando tokens, sem alterar botão/link, onClick ou layout. Efeitos não interferem com scroll nem substituem navegação. Reusar componente atual.

Dialog, Popover, Sheet e Accordion também fazem parte da entrega, depois dos dois pilotos, um por vez. Preservar foco, Escape, scroll lock, posicionamento Base UI e lifecycle de saída. Integração por `render`, nunca `asChild`; validar versão instalada, pois exemplos oficiais podem usar nomes antigos de packages. Não sobrepor transform de posicionamento com transform de animação.

Resultado esperado: atualizar versão Orion e ativar provider uma vez no consumidor habilita comportamento nos componentes migrados já usados pelas telas, sem trocar componentes ou reescrever cada tela. Anime.js não precisa ser aplicado nesses componentes para estar disponível depois.

## Critérios de aceite

- Sem regressão de API, foco, teclado, estado de formulário ou hidratação; callbacks não dependem de animation-end para concluir negócio.
- Sem animação nova sem provider ativo; desativar em runtime mantém estado/foco e não remonta formulário.
- Reduced motion testado em CSS e Motion, inclusive alteração em runtime; exigir o mesmo na primeira integração Anime futura.
- Strict Mode, abertura/fechamento rápidos, desmontagem e carregamento atrasado de features Motion sem efeitos órfãos.
- Consumidor que usa somente Button não carrega engines; piloto Motion não carrega Anime. Confirmar com build e rede, não apenas grep de source.
- Medir gzip inicial, chunks posteriores e tempo de interação antes/depois. Orçamentos numéricos definidos com baseline na tarefa 1; bloquear expansão até cumpri-los. Sem promessa de FPS ou melhoria de backend.
- Storybook nas três marcas; estados normal, reduzido e desativado; snapshots estáveis e assertions funcionais, sem waits arbitrários.
- Gates `pnpm check`, `pnpm typecheck`, `pnpm build`, `pnpm test:storybook` e `pnpm pack:all`; smoke em consumidor descartável React 19/Vite e Next.js App Router usando tarballs.

## Fontes oficiais consultadas

- [Motion: instalação](https://motion.dev/docs/react-installation) — pacote `motion`, imports React e integração com Next.js.
- [Motion: bundle](https://motion.dev/docs/react-reduce-bundle-size) — `m`, LazyMotion, domAnimation e carregamento assíncrono; tamanhos da documentação não equivalem ao bundle Orion.
- [Motion: acessibilidade](https://motion.dev/docs/react-accessibility) — reduced motion não elimina automaticamente opacity/cor.
- [Motion: Base UI](https://motion.dev/docs/base-ui) — composição por `render` e coordenação de montagem/saída.
- [Anime.js: React](https://animejs.com/documentation/getting-started/using-with-react/) — effect, createScope e revert.
- [Anime.js: módulos](https://animejs.com/documentation/getting-started/module-imports/) — imports granulares por subpath.
