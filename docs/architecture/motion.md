# Movimento compartilhado

Accordion, Dialog, Popover e Sheet usam transições CSS com tokens. FiltersCard
anima abertura/fechamento; LauncherCard recebe entrada curta e feedback de hover.
As APIs existentes permanecem iguais. A política vive no pacote de suporte
`@design-systems-orion/motion` (ADR 0015).

## Ativação

Após publicar e atualizar os packages, declare `@design-systems-orion/motion`
como dependência direta no consumidor que importar o provider. Em Next.js,
coloque-o num componente cliente e envolva o layout por esse componente:

```tsx
"use client";
import type { ReactNode } from "react";
import { MotionProvider } from "@design-systems-orion/motion/react";

export function Providers({ children }: { children: ReactNode }) {
  return <MotionProvider enabled>{children}</MotionProvider>;
}
```

Componentes migrados já recebem comportamento. Não é necessário trocar cada
instância. Sem provider, os primitives mantêm animações legadas; blocks não
ativam o movimento novo. `enabled={false}` desativa os componentes migrados;
`reducedMotion="always"` força movimento reduzido. O padrão `"user"` respeita
`prefers-reduced-motion`, inclusive alterações durante o uso. A preferência
desconhecida durante SSR é tratada como reduzida.

O provider não cria wrapper DOM. Alterar sua configuração preserva a identidade
dos elementos e o estado do formulário aberto. Fechar FiltersCard desmonta seu
conteúdo após a saída, como no contrato anterior; valores internos não persistem
entre fechamento e reabertura. Durante a saída, controles ficam `inert` e foco
interno retorna ao botão Mostrar/Ocultar.

## Tokens e engines

Tokens de duração: fast 120 ms, default 180 ms, panel 240 ms. Distâncias: short
4 px, default 8 px; intensidade 1. Easing e valores vivem em `tokens`, com
defaults neutros e valores em cada tema. Primitives usam CSS; o adapter converte
ms/s em segundos lendo computed style do elemento efetivo, sem presets duplicados.
Reduced motion evita deslocamento, escala e altura animada; transições simples
podem manter somente opacidade. Off resolve instantaneamente.

Os imports `/react` não carregam engines. `/motion` usa `m` e LazyMotion; features
são solicitadas quando ativado. A divisão física de chunks depende do bundler:
não assumir custo inicial zero dos blocks. Ver medições em
[motion-baseline.md](./motion-baseline.md).

Anime.js 4.5.0 foi instalado para uso futuro. Nenhum componente desta entrega
importa Anime e não há adapter/export Anime. Para uso direto num produto,
declare `animejs` nesse produto; uma dependência transitiva não é API pública.
Um efeito futuro precisa justificar seu uso e implementar scope, cleanup,
movimento reduzido, SSR e carregamento apropriado.

## Validação e release

Storybook oferece os modos Full, Reduced e Off, separados da marca. Stories
cobrem as três marcas, foco, Escape, estado de formulário e ausência de wrappers.
`tw-animate-css` continua necessário aos componentes ainda não migrados.

Esta entrega prepara os packages e changesets. Publicação e atualização dos
portais exigem tarefas próprias; nenhum portal é alterado neste checkout.
Rollback inicial no consumidor: desativar o provider.
