# @design-systems-orion/motion

Política de movimento do Orion. React 19; tokens por CSS variables.

```tsx
"use client";
import { MotionProvider } from "@design-systems-orion/motion/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionProvider enabled>{children}</MotionProvider>;
}
```

O provider não adiciona elemento DOM. Sem provider, os primitives preservam as
transições anteriores; o movimento novo dos blocks permanece desativado.
`enabled={false}` desativa o movimento dos componentes migrados.
`reducedMotion="always"` reduz movimento; o padrão `"user"` acompanha o sistema.

Entrypoints: raiz para `resolveMotionPolicy` e tipos puros; `/react` para provider
e hooks; `/motion` para integração Motion. A raiz não importa React ou engines.
Anime.js 4.5.0 está instalado como dependência, sem import, adapter ou export
público nesta versão. Um produto que importar Anime diretamente deve declarar
sua própria dependência.

Veja `docs/architecture/motion.md` no repositório para adoção e limites de bundle.
