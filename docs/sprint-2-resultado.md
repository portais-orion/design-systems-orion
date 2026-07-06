# Sprint 2 � Resultado

## Resumo

`@supertrans-transportes/blocks` saiu de pacote vazio para **11 blocks** genéricos com 34 stories, todos sobre `@supertrans-transportes/ui` + tokens, dados por props e zero domínio. Criado também o `pnpm check:pureza` (script Node cross-platform) que automatiza as verificações de vazamento. Nenhum portal foi alterado. DataTable ficou fora, conforme o plano (sprint própria).

## Blocos implementados

EmptyState, ErrorState, TableSkeletonRows, FilterPill, StatusDot, CodeBadge, ConfirmDialog, Pagination, PageHeader, SearchBar, StatusCards � cada um em `packages/blocks/src/<nome>/{tsx,stories,index}`, exportado pelo barrel e por subpath.

## Blocos extraídos/adaptados do Supertrans

Origem `gestao-cadastros/shared.tsx` (genéricos presos em pasta de domínio):

- **EmptyState** � textos fixos/onClear/onNew viraram `title/description/icon/action` (slot); `bg-slate-100` �  `bg-muted`.
- **ErrorState** � `onRetry` fixo virou slot `action`; defaults genéricos; `bg-red-50/text-red-400` �  `bg-destructive/10 text-destructive`.
- **TableSkeletonRows** � refeito sobre `TableRow/TableCell/Skeleton` do @supertrans-transportes/ui (era tr/td cru com `bg-slate-100`); + `withActionsColumn`.
- **StatusDot** � o original era binário com textos fixos "Ativo/Inativo"; generalizado para 6 tons semânticos + label livre; sem label vira dot puro.
- **CodeBadge** � `#3caec4`/`#00526b` �  `border-primary/20 bg-primary/5 text-primary`; prop `code` virou `children`.
- **FilterPill** � implementado conforme a API do plano (chip de filtro ativo com `onRemove` acessível). O "FilterPill" do Supertrans é um dropdown de seleção � peça diferente, anotada para o futuro FilterBar.

## Blocos recriados inspirados no Aurora

- **ConfirmDialog** (`ui/ConfirmDialog.tsx`) � sobre AlertDialog do núcleo; `variant="danger"` usa `destructive`; loading com spinner; **fecha somente quando `onConfirm` resolve** (o original fechava mesmo com erro em voo � correção deliberada); erro mantém aberto.
- **Pagination** (`ui/Pagination.tsx`) � Select do @supertrans-transportes/ui para limite; `Intl.NumberFormat("pt-BR")`; `total=0` não renderiza; botões desabilitados nos extremos; troca de limite volta à página 1.
- **PageHeader** (`ui/DataTable/PageHeader.tsx`) � + `eyebrow`; sem breadcrumb/rota.
- **SearchBar** (`ui/DataTable/SearchBar.tsx`) � API controlada (`value/onChange`) no lugar do submit imperativo; **debounce implementado**: `onDebouncedChange` dispara `debounceMs` (default 300ms) após a última digitação; botão de limpar acessível.
- **StatusCards** (`ui/DataTable/StatusCards.tsx`) � `bgColor/textColor` string viraram 6 tons semânticos; clique é **opcional por item** (`onClick` + `active` com `aria-pressed`), preservando o padrão de cards-filtro do Aurora sem obrigá-lo.

## Estrutura final do @supertrans-transportes/blocks

```
packages/blocks/src/
  code-badge/ confirm-dialog/ empty-state/ error-state/ filter-pill/
  page-header/ pagination/ search-bar/ status-cards/ status-dot/
  table-skeleton-rows/                    (cada um: tsx + stories + index)
  index.ts
```

Deps: `@supertrans-transportes/ui` (workspace) + `lucide-react`. Subpath exports por bloco.

## Stories adicionadas

34 stories em 11 grupos (`Blocks/*`): default, ações/slots, tons, estados assíncronos do ConfirmDialog (incl. story "ComFalha" demonstrando que erro mantém o diálogo aberto), paginação interativa, debounce visível na SearchBar, StatusCards como filtro clicável. Total do Storybook: 87 stories.

## Scripts de qualidade adicionados

`pnpm check:pureza` �  `scripts/check-purity.mjs` (Node puro, sem deps, cross-platform). Regras: hex fora de `tokens/themes`; `@radix-ui`; classes de marca (`orange-*`, `blue-*`, `primary-600`, `brand-primary`); imports dos portais (apenas dentro de aspas � comentários de proveniência são permitidos e incentivados); `next/*` em packages compartilhados; axios/`@tanstack/react-query`/`fetch(` em packages compartilhados. Comentários são ignorados por todas as regras.

## Documentação atualizada

`docs/architecture/blocks.md` (novo � ui vs blocks, regras de props/slots/anti-domínio, tabela de origem); `docs/architecture/packages.md` e `components.md` (estado do blocks); `ai/rules/blocks.md` (desbloqueado + aprendizados: vocabulário de tons, regra do ConfirmDialog, proveniência obrigatória); `ai/workflows/create-block.md` (referências de padrão); checklist de aceite (+3 itens); changeset minor do @supertrans-transportes/blocks.

## Validações executadas

```
pnpm install          �  Done in 5.1s
pnpm check            �  Checked 120 files. No fixes applied (verde)
pnpm typecheck        �  3 successful, 3 total
pnpm build            �  3 successful, 3 total
pnpm build:storybook  �  completed successfully (87 stories / 31 grupos)
pnpm check:pureza     �  OK � nenhum vazamento encontrado
pnpm storybook (dev)  �  HTTP 200
```

## Resultado do check de pureza

Verde. Durante o desenvolvimento o script flagrou 19 falsos positivos (menções a portais e hex em comentários de proveniência) � a regra foi refinada para ignorar comentários e exigir aspas na regra de portais, mantendo a detecção de imports reais.

## Problemas encontrados

1. Primeira execução do check-purity com cwd errado passou em falso (regras relativas à raiz) � script agora é executado via `pnpm check:pureza` (cwd raiz garantido pelo pnpm).
2. Falsos positivos em comentários (acima) � resolvido com `isComment`.
3. `pnpm build` com cache do turbo não regenera o storybook-static � `build:storybook` foi executado explicitamente para validar as stories novas.

## Decisões tomadas

1. Vocabulário único de tons para blocks: `default/success/warning/danger/info/muted` (emerald/amber/destructive/sky) � registrado em `ai/rules/blocks.md`.
2. FilterPill do plano �0� FilterPill do Supertrans: a peça do plano (chip removível) foi implementada; o dropdown do Supertrans vai para o futuro FilterBar.
3. ConfirmDialog não fecha em erro � divergência documentada em relação ao Aurora.
4. StatusCards com clique opcional por item (o Aurora obrigava; telas de dashboard puro não precisam).
5. Comentário de proveniência obrigatório nos blocks; check:pureza ignora comentários por design.

## Pendências

- Debounce da SearchBar usa timer simples; sem cancelamento em unmount de callbacks já disparados (aceitável para o caso de uso).
- a11y automatizada e visual regression continuam pendentes (desde a Sprint 0) � próxima janela natural: antes do DataTable.
- check:pureza ainda não roda em CI (não há CI configurado no repo).

## Próxima sprint recomendada

**Sprint 3 � DataTable**: agora existem todas as peças que ele consome (TableSkeletonRows, EmptyState, ErrorState, Pagination, Table do ui). Conforme o diagnóstico: TanStack Table por baixo, API inspirada no `Column<T>`/`keyExtractor` do Aurora, envelope `{data,total,page,limit}`, validado contra 2�3 telas reais de cada portal antes de estabilizar. Alternativa curta antes: Sprint 1.1 (popover, radio-group, scroll-area) se quiser fechar o inventário de primitives primeiro.
