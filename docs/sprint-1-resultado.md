# Sprint 1 â€” Resultado

## 1. Objetivo

Completar a primeira leva de primitives do `@supertrans-transportes/ui`: 12 componentes extraÃ­dos do Supertrans + 6 recriados em Base UI a partir da API do Aurora, todos com stories, tokens semÃ¢nticos e validaÃ§Ã£o nas duas marcas.

## 2. Componentes criados

19 componentes pÃºblicos no `@supertrans-transportes/ui` (18 desta sprint + button da Sprint 0), todos exportados pelo barrel e por subpath (`@supertrans-transportes/ui/<nome>`).

## 3. Componentes extraÃ­dos do Supertrans

`input, label, textarea, checkbox, select, dialog, tooltip, card, badge, skeleton, avatar, table` â€” origem `apps/web/src/components/ui/`. AdaptaÃ§Ãµes aplicadas:

- `@/lib/utils` â†’ `cn` interno do pacote.
- **badge**: variants com hex/domÃ­nio removidas (`brand` â†’ `tinted` tokenizada; `origin-profile/group/direct` eliminadas â€” sÃ£o semÃ¢ntica do Configurador; adicionada `warning`). Story atualizada.
- **table**: `bg-[#f9fafb]` no thead â†’ `bg-muted/50`.
- **input/textarea/select/checkbox**: `bg-white` â†’ `bg-background` (compatibilidade com temas/dark).
- **skeleton**: faltava story no Supertrans â€” criada; faltava import de React â€” corrigido.
- Stories portadas com imports cross-componente reescritos (`./button` â†’ `../button`).

## 4. Componentes recriados inspirados no Aurora

`switch (15 usos no Aurora), dropdown-menu (4), tabs (1), separator (2), alert (3), alert-dialog (1)` â€” API pÃºblica no padrÃ£o shadcn (idÃªntica Ã  superfÃ­cie do Aurora) para baratear a migraÃ§Ã£o futura; implementaÃ§Ã£o 100% Base UI/TW4/tokens, zero cÃ³digo Radix portado.

Mapa Radixâ†’Base UI aplicado: `Contentâ†’Positioner+Popup` (menu), `Overlayâ†’Backdrop`, `Subâ†’SubmenuRoot`, `SubTriggerâ†’SubmenuTrigger`, `Tabs.Trigger/Contentâ†’Tab/Panel`, `data-[state=checked]â†’data-[checked]`. `alert` nÃ£o usa primitivo (div `role="alert"`); `alert-dialog` reutiliza `buttonVariants` nos botÃµes Action/Cancel.

## 5. Componentes adiados

`popover (5 usos), radio-group (2), scroll-area (7), command (5), multi-select (10), grouped-multi-select (9)` â€” inventÃ¡rio completo com complexidade, riscos e sprint sugerida em `docs/migration/ui-primitives-inventory.md`. Destaques: popover/radio-group/scroll-area sÃ£o mecÃ¢nicos (Sprint 1.1); command exige spike (cmdk vs Base UI autocomplete); multi-select e grouped-multi-select devem convergir para UM componente sobre Base UI Select `multiple` (Sprint 2).

## 6. Estrutura final do @supertrans-transportes/ui

```
packages/ui/src/
  alert/ alert-dialog/ avatar/ badge/ button/ card/ checkbox/ dialog/
  dropdown-menu/ input/ label/ select/ separator/ skeleton/ switch/
  table/ tabs/ textarea/ tooltip/          (cada um: tsx + stories + index)
  utils/cn.ts
  index.ts                                  (barrel pÃºblico)
```

`lucide-react` promovido a dependency (Ã­cones em runtime: checkbox, select, dialog, dropdown-menu, alert-dialog).

## 7. Stories criadas

53 stories em 20 grupos no build do Storybook (19 componentes + comparativo de marcas). Cobrem variants, sizes, disabled, invalid (input), composiÃ§Ãµes (form em dialog, menu com submenu/checkbox, tabs com card) â€” todas alternÃ¡veis entre Supertrans e Aurora pela toolbar.

## 8. DecisÃµes tomadas

1. Variants de domÃ­nio nÃ£o sobem para o nÃºcleo (badge `origin-*` eliminadas) â€” registrado em `ai/rules/components.md`.
2. `bg-white`/`text-gray-*` proibidos; tokens sempre â€” adicionado ao checklist de aceite.
3. AnimaÃ§Ãµes via `tw-animate-css` importado pelo consumidor (Storybook do nÃºcleo jÃ¡ importa) â€” documentado em `docs/architecture/components.md`.
4. Nomes pÃºblicos das recriaÃ§Ãµes seguem shadcn (TabsTrigger/TabsContent, DropdownMenuContent...) e nÃ£o os nomes internos do Base UI â€” prioriza migraÃ§Ã£o barata dos portais.
5. Subpath exports por componente no package.json.

## 9. Problemas encontrados

- `skeleton.tsx` do Supertrans sem import de React e sem story â€” corrigido/criado.
- Hex hardcoded em badge e table do Supertrans (dÃ©bito conhecido do diagnÃ³stico) â€” tokenizado na entrada do nÃºcleo.
- Biome reformatou 17 arquivos copiados (indentaÃ§Ã£o/ordenaÃ§Ã£o de imports) â€” esperado.

## 10. Riscos pendentes

- Comportamento de foco/teclado das recriaÃ§Ãµes (dropdown-menu, alert-dialog) validado apenas manualmente via stories; addon de testes de interaÃ§Ã£o/a11y automatizados ainda nÃ£o configurado.
- `command`/`multi-select` (Sprint 2) dependem de spike â€” maior risco do inventÃ¡rio.
- Contraste WCAG do tema aurora ainda sem validaÃ§Ã£o automatizada (pendÃªncia desde a Sprint 0).

## 11. ValidaÃ§Ãµes executadas

```
pnpm install          â†’ Done in 5.2s
pnpm check            â†’ Checked 86 files. No fixes applied (verde)
pnpm typecheck        â†’ 3 successful, 3 total
pnpm build            â†’ 3 successful, 3 total (16.6s)
pnpm build:storybook  â†’ completed successfully (53 stories / 20 grupos)
```

Pureza (greps da seÃ§Ã£o 14 do plano): zero hex fora de `packages/tokens/src/themes`; zero `@radix-ui`; zero `orange-*`/`blue-*`/`primary-600`/`brand-*` em packages/ui e packages/blocks; zero imports dos portais. Nenhum arquivo de `portal-supertrans` ou `Portal-Aurora` alterado.

## 12. PrÃ³xima sprint recomendada

**Sprint 1.1 (curta)**: popover, radio-group, scroll-area (mecÃ¢nicos, destravam o restante) + addon a11y/testes de interaÃ§Ã£o no Storybook + CI com os greps de pureza. Depois, **Sprint 2**: spike command/combobox â†’ multi-select unificado; na sequÃªncia o roadmap de blocks (`DataTable` primeiro) conforme `docs/architecture/migration-strategy.md`.
