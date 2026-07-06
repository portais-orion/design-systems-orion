# Contexto de migração � portal-supertrans

Estado: doador da fundação (TW4, Base UI, Storybook, Biome, Turborepo). Primeiro a consumir o núcleo.

Plano (executado no repo DELE, não aqui): substituir `apps/web/src/components/ui/*` por re-exports de `@supertrans-transportes/ui`; importar `@supertrans-transportes/tokens` no globals.css mantendo aliases atuais; expectativa de zero mudança visual.

Débitos conhecidos a não replicar no núcleo: ~60 arquivos com `#00526b`/`brand-primary` hardcoded; navy `#001e2b` hardcoded no sidebar (aqui já é token `--sidebar`).

Proibido nesta fase: alterar o repositório do portal a partir de tarefas do núcleo.
