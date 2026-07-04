# 0008 — Repositório agent-first

## Contexto
~95% do desenvolvimento será executado por agentes de IA operados por desenvolvedores. O Supertrans já pratica isso (rules por assunto, specs design+plan, verificadores), mas com contexto triplicado (CLAUDE.md/AGENTS.md/GEMINI.md); o Aurora tem um monolito de contexto de 25KB — ambos anti-padrões de custo de token.

## Decisão
Contexto, regras, workflows, skills, prompts e checklists são artefatos versionados em `ai/`, com arquivos curtos e por assunto. `AGENTS.md` na raiz é o ponto de entrada único e aponta para `ai/`. Regras têm exemplos certo/errado; workflows são passo a passo executáveis; checklists são critérios de aceite objetivos. Preferir stack mainstream, registries, generators e verificadores baratos a abstrações próprias — agentes rendem mais e gastam menos tokens sobre o que já conhecem do treinamento.

## Alternativas consideradas
Documentação tradicional para humanos (agentes não a encontram/consomem bem); contexto num arquivo único (caro em toda sessão); regras fora do repo (dessincronizam).

## Consequências
Todo PR que muda um padrão deve atualizar a rule correspondente; futuramente `ai/` será distribuído aos produtos como kit sincronizável.

## Riscos
Rules desatualizadas viram fonte de erro sistemático. Mitigação: revisar `ai/` como parte do Definition of Done.

## Critérios de aceite
Estrutura `ai/` completa e `AGENTS.md` presente na Sprint 0.
