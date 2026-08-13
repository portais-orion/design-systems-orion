# Manual de consumo e migração do Orion

## Objetivo

Transformar `docs/adoption/consumer-setup.md` na fonte canônica para instalar e adotar os packages
`@design-systems-orion` em aplicações React novas ou existentes. Cobrir Next.js e React com Vite,
incluindo migração gradual de outra biblioteca de componentes.

## Entregáveis

1. Expandir `docs/adoption/consumer-setup.md` com:
   - pré-requisitos e escolha dos packages;
   - comandos para npm, pnpm e Yarn;
   - criação e configuração de projetos Next.js e Vite;
   - instalação dos peer dependencies;
   - tokens, tema por `data-brand` e Tailwind CSS v4;
   - imports por subpath e adaptadores locais;
   - adoção em projeto existente;
   - migração incremental de outra biblioteca;
   - atualização, troubleshooting e checklist de validação.
2. Atualizar `ai/skills/portais-orion-adoption/SKILL.md` para orientar migrações partindo de
   shadcn/Radix, MUI, Chakra ou bibliotecas internas, sem alterar domínio, APIs, rotas ou permissões.
3. Atualizar `ai/skills/new-portal/SKILL.md` para escolher entre Next.js e Vite e remover orientação
   obsoleta sobre `transpilePackages`.
4. Sincronizar metadados/stubs das skills quando necessário.

## Estrutura do manual

Manual único, organizado por decisão:

1. Escolher stack e packages.
2. Criar projeto novo ou preparar projeto existente.
3. Instalar pelo registry público do npm.
4. Configurar Tailwind v4, tokens e marca.
5. Renderizar primeiro componente.
6. Criar adaptadores locais.
7. Migrar uma fatia vertical por vez.
8. Remover biblioteca antiga somente quando não houver consumidores.
9. Validar build e comportamento.

Exemplos completos usam TypeScript. Comandos equivalentes para npm, pnpm e Yarn aparecem sem
duplicar todas as explicações.

## Regras de migração

- Preservar hooks, contratos de API, autenticação, permissões, rotas, validações e ações.
- Trocar somente camada visual/composição.
- Manter biblioteca antiga durante coexistência.
- Migrar uma tela ou componente de baixo risco por vez.
- Preferir adaptadores locais para isolar imports e diferenças de API.
- Não mapear componentes apenas por semelhança de nome; conferir comportamento e acessibilidade.
- Não introduzir `@radix-ui/*` no Orion nem copiar código de domínio para packages compartilhados.
- Registrar gaps genéricos no repositório Orion; não criar fork local da biblioteca.

## Compatibilidade documentada

- React 19, conforme peer dependencies publicadas.
- Tailwind CSS v4, CSS-first.
- Next.js com App Router.
- React com Vite e plugin oficial `@tailwindcss/vite`.
- Packages públicos em `registry.npmjs.org`, sem token para consumo.

Outras stacks ficam fora do escopo até existir consumidor real e validação correspondente.

## Validação

- Conferir comandos, paths e exports contra `package.json` dos três packages.
- Validar links e referências com buscas no repositório.
- Executar `pnpm check`, `pnpm typecheck` e `pnpm build`.
- Validar estrutura da skill com `quick_validate.py` quando disponível.
- Revisar ausência de placeholders, contradições e instruções legadas.

## Fora de escopo

- Criar portal de produto dentro deste monorepo.
- Migrar repositórios consumidores nesta tarefa.
- Redesign de telas.
- Suporte a Tailwind v3, React 18 ou frameworks sem consumidor real confirmado.
- Publicar nova versão npm, abrir PR ou fazer merge automático.
