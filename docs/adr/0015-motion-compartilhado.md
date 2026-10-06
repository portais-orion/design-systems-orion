# 0015 — Movimento compartilhado no Orion

## Status

Aceito em 2026-10-05: usuário aprovou execução do plano revisado, integrando movimento nos componentes existentes e disponibilizando Anime.js para uso futuro.

## Decisão

Adicionar `@design-systems-orion/motion` como pacote de suporte dependente de tokens. UI e Blocks podem depender deste suporte; motion nunca importa UI, Blocks, produtos ou frameworks de aplicação. Esta decisão complementa a ADR 0006 sem inverter camadas ou alterar o corte de domínio.

Instalar `motion@14.0.0` e `animejs@4.5.0` como dependencies do novo pacote. Motion é motor principal para os blocks; transições simples de primitives usam CSS com tokens. Anime.js fica instalado, sem imports ou adapter até existir necessidade concreta. Ambas as bibliotecas têm licença MIT; peers Three.js do Anime são opcionais.

Política React e resolver puro possuem entradas independentes da engine. Barrels não reexportam Anime. Provider não cria elemento DOM, respeita preferência do sistema e mantém movimento novo desativado por padrão. A ativação deve acontecer uma vez no consumidor; nenhuma rota ou flag de negócio entra nos packages compartilhados.

## Consequências

Preservar APIs dos componentes existentes, foco, SSR/hidratação e estilos de posicionamento Base UI. Tokens de movimento são comuns às três marcas. Distribuição deve manter client boundaries, subpaths e engines externas, com validação de tarballs e medição de bundle.

Instalação transitiva disponibiliza Anime aos componentes Orion futuros; produtos que importem Anime diretamente declaram sua própria dependency. Publicação e mudança em produtos são etapas separadas, não executadas nesta implementação local.
