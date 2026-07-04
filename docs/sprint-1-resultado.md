# Sprint 1 — Resultado

## 1. Objetivo

Completar a primeira leva de primitives do `@grupo/ui`: 12 componentes extraídos do Supertrans + 6 recriados em Base UI a partir da API do Aurora, todos com stories, tokens semânticos e validação nas duas marcas.

## 2. Componentes criados

19 componentes públicos no `@grupo/ui` (18 desta sprint + button da Sprint 0), todos exportados pelo barrel e por subpath (`@grupo/ui/<nome>`).

## 3. Componentes extraídos do Supertrans

`input, label, textarea, checkbox, select, dialog, tooltip, card, badge, skeleton, avatar, table` — origem `apps/web/src/components/ui/`. Adaptações aplicadas:

- `@/lib/utils` → `cn` interno do pacote.
- **badge**: variants com hex/domínio removidas (`brand` → `tinted` tokenizada; `origin-profile/group/direct` eliminadas — são semântica do Configurador; adicionada `warning`). Story atualizada.
- **table**: `bg-[#f9fafb]` no thead → `bg-muted/50`.
- **input/textarea/select/checkbox**: `bg-white` → `bg-background` (compatibilidade com temas/dark).
- **skeleton**: faltava story no Supertrans — criada; faltava import de React — corrigido.
- Stories portadas com imports cross-componente reescritos (`./button` → `../button`).

## 4. Componentes recriados inspirados no Aurora

`switch (15 usos no Aurora), dropdown-menu (4), tabs (1), separator (2), alert (3), alert-dialog (1)` — API pública no padrão shadcn (idêntica à superfície do Aurora) para baratear a migração futura; implementação 100% Base UI/TW4/tokens, zero código Radix portado.

Mapa Radix→Base UI aplicado: `Content→Positioner+Popup` (menu), `Overlay→Backdrop`, `Sub→SubmenuRoot`, `SubTrigger→SubmenuTrigger`, `Tabs.Trigger/Content→Tab/Panel`, `data-[state=checked]→data-[checked]`. `alert` não usa primitivo (div `role="alert"`); `alert-dialog` reutiliza `buttonVariants` nos botões Action/Cancel.

## 5. Componentes adiados

`popover (5 usos), radio-group (2), scroll-area (7), command (5), multi-select (10), grouped-multi-select (9)` — inventário completo com complexidade, riscos e sprint sugerida em `docs/migration/ui-primitives-inventory.md`. Destaques: popover/radio-group/scroll-area são mecânicos (Sprint 1.1); command exige spike (cmdk vs Base UI autocomplete); multi-select e grouped-multi-select devem convergir para UM componente sobre Base UI Select `multiple` (Sprint 2).

## 6. Estrutura final do @grupo/ui

```
packages/ui/src/
  alert/ alert-dialog/ avatar/ badge/ button/ card/ checkbox/ dialog/
  dropdown-menu/ input/ label/ select/ separator/ skeleton/ switch/
  table/ tabs/ textarea/ tooltip/          (cada um: tsx + stories + index)
  utils/cn.ts
  index.ts                                  (barrel público)
```

`lucide-react` promovido a dependency (ícones em runtime: checkbox, select, dialog, dropdown-menu, alert-dialog).

## 7. Stories criadas

53 stories em 20 grupos no build do Storybook (19 componentes + comparativo de marcas). Cobrem variants, sizes, disabled, invalid (input), composições (form em dialog, menu com submenu/checkbox, tabs com card) — todas alternáveis entre Supertrans e Aurora pela toolbar.

## 8. Decisões tomadas

1. Variants de domínio não sobem para o núcleo (badge `origin-*` eliminadas) — registrado em `ai/rules/components.md`.
2. `bg-white`/`text-gray-*` proibidos; tokens sempre — adicionado ao checklist de aceite.
3. Animações via `tw-animate-css` importado pelo consumidor (Storybook do núcleo já importa) — documentado em `docs/architecture/components.md`.
4. Nomes públicos das recriações seguem shadcn (TabsTrigger/TabsContent, DropdownMenuContent...) e não os nomes internos do Base UI — prioriza migração barata dos portais.
5. Subpath exports por componente no package.json.

## 9. Problemas encontrados

- `skeleton.tsx` do Supertrans sem import de React e sem story — corrigido/criado.
- Hex hardcoded em badge e table do Supertrans (débito conhecido do diagnóstico) — tokenizado na entrada do núcleo.
- Biome reformatou 17 arquivos copiados (indentação/ordenação de imports) — esperado.

## 10. Riscos pendentes

- Comportamento de foco/teclado das recriações (dropdown-menu, alert-dialog) validado apenas manualmente via stories; addon de testes de interação/a11y automatizados ainda não configurado.
- `command`/`multi-select` (Sprint 2) dependem de spike — maior risco do inventário.
- Contraste WCAG do tema aurora ainda sem validação automatizada (pendência desde a Sprint 0).

## 11. Validações executadas

```
pnpm install          → Done in 5.2s
pnpm check            → Checked 86 files. No fixes applied (verde)
pnpm typecheck        → 3 successful, 3 total
pnpm build            → 3 successful, 3 total (16.6s)
pnpm build:storybook  → completed successfully (53 stories / 20 grupos)
```

Pureza (greps da seção 14 do plano): zero hex fora de `packages/tokens/src/themes`; zero `@radix-ui`; zero `orange-*`/`blue-*`/`primary-600`/`brand-*` em packages/ui e packages/blocks; zero imports dos portais. Nenhum arquivo de `portal-supertrans` ou `Portal-Aurora` alterado.

## 12. Próxima sprint recomendada

**Sprint 1.1 (curta)**: popover, radio-group, scroll-area (mecânicos, destravam o restante) + addon a11y/testes de interação no Storybook + CI com os greps de pureza. Depois, **Sprint 2**: spike command/combobox → multi-select unificado; na sequência o roadmap de blocks (`DataTable` primeiro) conforme `docs/architecture/migration-strategy.md`.
