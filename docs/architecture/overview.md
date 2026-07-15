# Visão geral

O `nucleo-portais` (Núcleo de Portais do Grupo) é a base oficial para criação, padronização e evolução dos portais das empresas do grupo. Não é uma biblioteca da Supertrans nem uma cópia do Aurora: é uma curadoria do melhor dos dois portais, mantida como plataforma.

O que vive aqui: design system (tokens, primitives, blocks), Storybook oficial, documentação arquitetural (ADRs), estrutura de contexto/regras/workflows para agentes de IA e, futuramente, templates e CLI para novos portais.

O que NÃO vive aqui: produtos, telas, domínio de negócio, hooks de API, permissões reais, auth. Produtos ficam em repositórios próprios (ADR 0007) e consomem os packages por versão.

Documentos de origem das decisões: `docs/adr/` e os diagnósticos comparativos em `Portal-Aurora/doc/`.
