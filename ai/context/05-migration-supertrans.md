# Contexto de migraÃ§Ã£o â€” portal-supertrans

Estado: doador da fundaÃ§Ã£o (TW4, Base UI, Storybook, Biome, Turborepo). Primeiro a consumir o nÃºcleo.

Plano (executado no repo DELE, nÃ£o aqui): substituir `apps/web/src/components/ui/*` por re-exports de `@supertrans-transportes/ui`; importar `@supertrans-transportes/tokens` no globals.css mantendo aliases atuais; expectativa de zero mudanÃ§a visual.

DÃ©bitos conhecidos a nÃ£o replicar no nÃºcleo: ~60 arquivos com `#00526b`/`brand-primary` hardcoded; navy `#001e2b` hardcoded no sidebar (aqui jÃ¡ Ã© token `--sidebar`).

Proibido nesta fase: alterar o repositÃ³rio do portal a partir de tarefas do nÃºcleo.
