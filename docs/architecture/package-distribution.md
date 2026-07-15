# Package Distribution

Como o núcleo é empacotado e distribuído como pacotes internos versionados.

Decisão vigente:
- scope final: `@portais-orion`
- publish privado em GitHub Packages
- `tokens`, `ui` e `blocks` são consumíveis
- `tsconfig` e `biome-config` permanecem internos

Modelo atual:
- publish source-based na linha `0.1.x`
- dependências entre packages resolvidas por versão publicada

Regras:
- não commitar `.npmrc` com token
- não publicar em registry público
- não usar scopes legados em novos consumidores
- rodar scripts de rename/sed apenas em locale UTF-8

Operação pendente de Sprint 8:
- transferir repo para org `portais-orion`
- re-scope completo de código/config quando aplicável
- publish
- consumer test
- migração final do primeiro consumidor
