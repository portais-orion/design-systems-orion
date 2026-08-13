# Distribuição das skills Orion pelo GitHub

## Objetivo

Permitir que consumidores instalem `new-portal` e `portais-orion-adoption` diretamente do
repositório GitHub `portais-orion/design-systems-orion`, sem acoplar ferramentas de agentes aos
packages React publicados no npm.

## Decisão

- Manter fontes oficiais em `ai/skills/<nome>/SKILL.md`.
- Instalar pelo `skill-installer` oficial do Codex usando paths GitHub.
- Não incluir skills em `tokens`, `ui` ou `blocks`.
- Não executar `postinstall` nem escrever automaticamente em diretórios do usuário.
- Reiniciar Codex após instalação para redescobrir skills.

## Mudanças

1. Tornar `new-portal` e `portais-orion-adoption` autossuficientes quando copiadas isoladamente:
   - usar URL GitHub para manual canônico e demais documentos obrigatórios;
   - não depender de paths relativos ao monorepo consumidor;
   - manter instruções operacionais essenciais dentro de cada `SKILL.md`.
2. Destacar no README raiz:
   - link para manual de instalação e adoção;
   - seção de instalação das duas skills pelo GitHub;
   - comando para instalar ambas e URLs para instalação individual;
   - reinício do Codex e prompts de exemplo.
3. Explicar no manual que `npm install` instala runtime, não skills do Codex.
4. Atualizar READMEs de `tokens`, `ui` e `blocks`, exibidos nas páginas npm, com links para:
   - manual;
   - instruções de instalação das skills no README raiz.
5. Criar changeset patch para os três packages, necessário para republicar seus READMEs no npm.

## Instalação documentada

Forma recomendada para humanos:

```text
Instale as skills new-portal e portais-orion-adoption do repositório
portais-orion/design-systems-orion usando o skill-installer.
```

Forma CLI para Codex:

```bash
python "$CODEX_HOME/skills/.system/skill-installer/scripts/install-skill-from-github.py" \
  --repo portais-orion/design-systems-orion \
  --path ai/skills/new-portal ai/skills/portais-orion-adoption
```

Em Windows PowerShell, documentar a variante com `$env:CODEX_HOME`; quando a variável não existir,
usar o diretório padrão do Codex no perfil do usuário.

## Validação

- RED: provar que cópias isoladas atuais possuem referências locais não resolvíveis.
- GREEN: copiar cada skill para diretório temporário sem o monorepo e validar que nenhum link local
  obrigatório permanece.
- Executar `quick_validate.py` nas duas skills.
- Testar parsing/instalação do comando GitHub em destino temporário quando o commit estiver
  acessível no remoto; antes do push, validar estrutura local equivalente e registrar limitação.
- Verificar conteúdo dos tarballs com `pnpm pack:all` e confirmar READMEs presentes.
- Executar `pnpm check`, `pnpm typecheck` e `pnpm build`.

## Fora de escopo

- Publicar os packages ou fazer push nesta tarefa.
- Criar package npm de skills.
- Instalar skills automaticamente durante `npm install`.
- Modificar repositórios consumidores.
