# 0007 — Produtos permanecem em repositórios separados

## Contexto
portal-supertrans e Portal-Aurora são produtos de empresas diferentes, com deploys, ciclos e acessos distintos. Surgirão novos portais.

## Decisão
O nucleo-portais contém apenas plataforma: packages, Storybook, docs, estrutura de agentes e futuros templates/CLI. Produtos vivem em repositórios próprios e consomem os packages por versão. Nenhum produto será movido para dentro deste monorepo.

## Alternativas consideradas
Monorepo único do grupo (acopla release e permissão entre empresas); submódulos git (complexidade sem benefício).

## Consequências
Propagação de mudanças via versionamento (Changesets) e Renovate/Dependabot nos produtos; migração dos portais é adoção incremental de pacotes, não regeneração.

## Riscos
Produtos presos em versões antigas. Mitigação: releases pequenos e frequentes + automação de update.

## Critérios de aceite
Sprint 0 termina sem qualquer alteração nos repositórios dos portais.
