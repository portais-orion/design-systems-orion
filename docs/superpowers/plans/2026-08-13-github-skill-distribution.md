# GitHub Skill Distribution Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Distribuir as skills Orion pelo GitHub, documentar instalação no README/manual/páginas npm e manter packages React livres de automação de agentes.

**Architecture:** `ai/skills/` continua fonte oficial. Cada skill deve funcionar quando copiada isoladamente pelo instalador GitHub, usando documento local somente quando existir e URL GitHub como fallback canônico. Packages npm continuam contendo runtime + README; changeset patch republica links nas páginas npm.

**Tech Stack:** Markdown, Agent Skills, Codex skill-installer, GitHub, Changesets, pnpm.

## Global Constraints

- Repositório GitHub: `portais-orion/design-systems-orion`.
- Skills distribuídas: `ai/skills/new-portal` e `ai/skills/portais-orion-adoption`.
- Fonte oficial permanece em `ai/skills/<nome>/SKILL.md`.
- Não incluir skills em `@design-systems-orion/tokens`, `ui` ou `blocks`.
- Não usar `postinstall` nem escrever automaticamente em diretórios do usuário.
- `npm install` instala runtime, não skills do Codex.
- Reiniciar Codex após instalar skills.
- Mudança de README publicável exige changeset patch para os três packages.
- Não publicar packages nem fazer push nesta tarefa.

---

### Task 1: Tornar skills instaláveis isoladamente

**Files:**
- Modify: `ai/skills/new-portal/SKILL.md`
- Modify: `ai/skills/portais-orion-adoption/SKILL.md`
- Verify: `.agents/skills/{new-portal,portais-orion-adoption}/SKILL.md`
- Verify: `.claude/skills/{new-portal,portais-orion-adoption}/SKILL.md`

**Interfaces:**
- Consumes: manual local `docs/adoption/consumer-setup.md` quando estiver no repositório Orion.
- Produces: duas pastas autocontidas, válidas para cópia em `$CODEX_HOME/skills/<nome>`.

- [ ] **Step 1: Executar RED com cópias isoladas atuais**

Copiar cada pasta `ai/skills/<nome>` para diretório temporário e pedir a um agente sem contexto do
monorepo para localizar todas as referências obrigatórias. Registrar falha esperada: links
`../../../docs/...`, `ai/workflows/...` ou ADRs locais não resolvem dentro de `$CODEX_HOME/skills`.

- [ ] **Step 2: Implementar resolução local/GitHub**

Em ambas as skills, definir manual assim:

```markdown
Se `docs/adoption/consumer-setup.md` existir no repositório atual, leia-o. Fora do monorepo Orion,
abra o [manual canônico no GitHub](https://github.com/portais-orion/design-systems-orion/blob/main/docs/adoption/consumer-setup.md).
```

Remover dependências obrigatórias de ADRs, workflows ou outras skills por paths relativos. Manter
o contrato operacional necessário dentro do `SKILL.md`. Não mudar frontmatter salvo necessidade
demonstrada pelo teste.

- [ ] **Step 3: Sincronizar stubs somente se frontmatter mudar**

Comparar `name` e `description` das fontes com `.agents` e `.claude`. Se idênticos, não tocar stubs.
Se mudarem, copiar somente frontmatter e preservar corpo como ponteiro.

- [ ] **Step 4: Executar GREEN isolado e validators**

Copiar skills atualizadas para uma pasta temporária que não contenha `docs/`, `ai/` ou ADRs.
Confirmar que links obrigatórios são URLs HTTPS ou arquivos presentes dentro da pasta. Executar:

```powershell
$env:PYTHONPATH = Join-Path $env:TEMP "orion-skill-validator-pyyaml"
python C:\Users\marce\.codex\skills\.system\skill-creator\scripts\quick_validate.py ai/skills/new-portal
python C:\Users\marce\.codex\skills\.system\skill-creator\scripts\quick_validate.py ai/skills/portais-orion-adoption
```

Expected: `Skill is valid!` duas vezes.

- [ ] **Step 5: Commit**

```bash
git add ai/skills/new-portal/SKILL.md ai/skills/portais-orion-adoption/SKILL.md
git commit -m "docs(skill): make Orion skills standalone"
```

---

### Task 2: Documentar GitHub no projeto e no npm

**Files:**
- Modify: `README.md`
- Modify: `docs/adoption/consumer-setup.md`
- Modify: `packages/tokens/README.md`
- Modify: `packages/ui/README.md`
- Modify: `packages/blocks/README.md`
- Create: `.changeset/bright-orions-share.md`

**Interfaces:**
- Consumes: paths GitHub estáveis produzidos pela Task 1.
- Produces: instruções humanas e CLI; READMEs incluídos nos tarballs npm.

- [ ] **Step 1: Executar RED de documentação**

Run:

```powershell
rg -n "install-skill-from-github|Skills para Codex|não.*npm install|reinicie o Codex" README.md docs/adoption/consumer-setup.md packages/tokens/README.md packages/ui/README.md packages/blocks/README.md
```

Expected: ausência de instalação GitHub completa e explicação npm versus skill.

- [ ] **Step 2: Destacar links no README raiz**

Adicionar próximo ao início link visível para `docs/adoption/consumer-setup.md`. Criar seção
`## Skills para Codex` contendo:

```text
Skills não vêm com npm install. Instale pelo GitHub e reinicie Codex.
```

Incluir prompt recomendado:

```text
Use o skill-installer para instalar new-portal e portais-orion-adoption do repositório
portais-orion/design-systems-orion, nos paths ai/skills/new-portal e
ai/skills/portais-orion-adoption.
```

Incluir PowerShell executável:

```powershell
$codexHome = if ($env:CODEX_HOME) { $env:CODEX_HOME } else { Join-Path $HOME ".codex" }
$installer = Join-Path $codexHome "skills/.system/skill-installer/scripts/install-skill-from-github.py"
python $installer --repo portais-orion/design-systems-orion --path ai/skills/new-portal ai/skills/portais-orion-adoption
```

Incluir URLs individuais GitHub e exemplos de prompts que acionam cada skill.

- [ ] **Step 3: Explicar separação runtime/skills no manual**

Adicionar seção curta no manual: npm instala `tokens`, `ui`, `blocks`; skill-installer copia
skills para Codex; nenhum `postinstall`; reinício necessário. Apontar para seção `Skills para
Codex` no README GitHub.

- [ ] **Step 4: Atualizar READMEs dos packages**

Em cada `packages/{tokens,ui,blocks}/README.md`, manter link atual do manual e adicionar:

```markdown
Skills opcionais para criar/migrar projetos: [instalação via GitHub](https://github.com/portais-orion/design-systems-orion#skills-para-codex).
```

- [ ] **Step 5: Criar changeset patch**

Criar `.changeset/bright-orions-share.md`:

```markdown
---
"@design-systems-orion/tokens": patch
"@design-systems-orion/ui": patch
"@design-systems-orion/blocks": patch
---

Documenta instalação das skills Orion pelo GitHub nas páginas dos packages no npm.
```

- [ ] **Step 6: Validar cobertura e links**

Run:

```powershell
rg -n "Skills para Codex|install-skill-from-github|reinici|consumer-setup|skills-para-codex" README.md docs/adoption/consumer-setup.md packages/tokens/README.md packages/ui/README.md packages/blocks/README.md
git diff --check
```

Expected: todos os cinco destinos documentados; nenhum erro de whitespace.

- [ ] **Step 7: Commit**

```bash
git add README.md docs/adoption/consumer-setup.md packages/tokens/README.md packages/ui/README.md packages/blocks/README.md .changeset
git commit -m "docs: document GitHub skill installation"
```

---

### Task 3: Validar distribuição completa

**Files:**
- Verify: `ai/skills/{new-portal,portais-orion-adoption}/SKILL.md`
- Verify: `README.md`
- Verify: `docs/adoption/consumer-setup.md`
- Verify: `packages/{tokens,ui,blocks}/README.md`
- Verify: `.changeset/*.md`
- Create: `docs/superpowers/plans/2026-08-13-github-skill-distribution.md` commit tracking

**Interfaces:**
- Consumes: skills standalone e documentação das Tasks 1–2.
- Produces: evidência de instalação, tarballs válidos e gates verdes.

- [ ] **Step 1: Testar instalador oficial contra GitHub**

Criar destino temporário vazio em `$env:TEMP/orion-github-skill-install/skills` e executar
`install-skill-from-github.py` com:

```text
--repo portais-orion/design-systems-orion
--path ai/skills/new-portal ai/skills/portais-orion-adoption
--dest $env:TEMP/orion-github-skill-install/skills
```

Confirmar as duas pastas e `SKILL.md`. Se o commit atual ainda não estiver no remoto, registrar que
esse teste valida acesso/path do GitHub, enquanto o teste isolado da Task 1 valida conteúdo local
que ficará disponível após push.

- [ ] **Step 2: Validar tarballs npm**

Run:

```bash
pnpm pack:all
```

Expected: tarballs de tokens/ui/blocks aprovados; READMEs incluídos; nenhuma skill ou arquivo `ai/`
incluído.

- [ ] **Step 3: Rodar gates obrigatórios**

Run:

```bash
pnpm check
pnpm typecheck
pnpm build
```

Expected: três exit codes 0.

- [ ] **Step 4: Revisar estado final**

Run:

```powershell
git diff --check
git status --short
```

Expected: somente este plano não rastreado antes do commit; nenhum artefato temporário rastreável.

- [ ] **Step 5: Commit do plano**

```bash
git add docs/superpowers/plans/2026-08-13-github-skill-distribution.md
git commit -m "docs: add GitHub skill distribution plan"
```
