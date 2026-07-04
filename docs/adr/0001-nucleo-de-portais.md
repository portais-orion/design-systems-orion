# 0001 — Núcleo de Portais: plataforma interna, não UI lib

## Contexto
O grupo mantém portais por empresa (portal-supertrans, Portal-Aurora) com telas e padrões quase iguais e identidades visuais distintas. Diagnóstico comparativo (2026-07) concluiu que nenhum portal vence em todas as camadas e que ~95% do desenvolvimento futuro será feito por agentes de IA.

## Decisão
Criar o `nucleo-portais`: plataforma interna do grupo para design system, tokens/temas, componentes, Storybook oficial, documentação arquitetural, regras/workflows para agentes e, futuramente, templates e CLI de novos portais. É a base oficial de criação, padronização e evolução dos portais — não uma biblioteca da Supertrans nem uma cópia do Aurora.

## Alternativas consideradas
Boilerplate puro (cópias divergem); UI lib pura (não cobre padrões, agentes e templates); framework interno (rejeitado — ver ADR 0006/0008: agentes rendem melhor em stack mainstream); fundir os produtos num monorepo único (acopla releases de empresas distintas).

## Consequências
Curadoria do melhor dos dois portais; produtos consomem pacotes versionados; toda decisão de plataforma passa a ser registrada aqui em ADR.

## Riscos
Plataforma capturada pelas necessidades de um único portal. Mitigação: regra dos dois usos + revisão cruzada.

## Critérios de aceite
Sprint 0 concluída com monorepo, tokens 2 marcas, Button nas duas marcas no Storybook, docs e estrutura ai/.
