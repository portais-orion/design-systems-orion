# Sprint 5 â€” Resultado

## Resumo

Camada de composiÃ§Ã£o de **forms e layouts de pÃ¡gina** entregue no `@supertrans-transportes/blocks`: 12 blocks novos (5 de formulÃ¡rio + 7 de layout), 4 stories integradas de pÃ¡gina completa e 2 documentos de arquitetura (`forms.md`, `page-layouts.md`). Storybook saltou de 155 para **215 stories** (+60). Uma tela nova agora se monta 100% com padrÃµes oficiais â€” o princÃ­pio "a biblioteca sabe como montar a tela, nÃ£o o que ela significa" estÃ¡ aplicado em todos os slots. Nenhum portal alterado; validaÃ§Ãµes e pureza verdes.

## Form blocks implementados (5)

| Block | Nota |
|---|---|
| FormField | label+controle+description/erro (trio repetido Ã  mÃ£o nos forms do Supertrans, agora padronizado); ids `<htmlFor>-description`/`-error` para `aria-describedby` (conexÃ£o documentada â€” sem clonar filhos) |
| FormMessage | tons default/error/warning/success; erro com `role="alert"`; usado pelo FormField |
| FormSection | tÃ­tulo/descriÃ§Ã£o/aÃ§Ãµes + Separator; padrÃ£o de seÃ§Ãµes dos dois portais |
| FormActions | primary/secondary/extra por slots; align left/right/between; `sticky` opcional |
| FieldGroup | grid 1â€“4 colunas, 1 no mobile; `sm:col-span-2` para campos largos (story WithMixedFields) |

AgnÃ³sticos de form library: **zero import de RHF/Zod** (critÃ©rio 17 âœ“).

## Page layouts implementados (7)

PageLayout (base: header+pilha space-y-6+footer, maxWidth none/xl/2xl) Â· ListPageLayout (headerâ†’statsâ†’toolbar/filtersâ†’content â€” o esqueleto das 30+ listagens do Aurora) Â· FormPageLayout (form em max-w-3xl, padrÃ£o Supertrans, ou grid com aside 20rem) Â· DetailPageLayout (summaryâ†’tabsâ†’content+aside) Â· DashboardPageLayout (statsâ†’content+aside) Â· SectionHeader Â· ContentCard (Card com cabeÃ§alho/aÃ§Ãµes padronizados). Nome "Layout" (nÃ£o "Template") conforme decisÃ£o da sprint.

## Stories adicionadas

60 novas em 3 grupos de navegaÃ§Ã£o: `Blocks/Forms/*` (25: FormField 8, FormMessage 4, FormSection 4, FormActions 5, FieldGroup 5 â€” incluindo FormField com Combobox, MultiSelect e Checkbox), `Blocks/Layouts/*` (29: PageLayout 4, ListPage 7 incl. Loading/Empty, FormPage 4 incl. sticky, Detail 4, Dashboard 4, SectionHeader 3, ContentCard 4) e `Blocks/Exemplos de PÃ¡gina` (4 integradas). Callbacks com `fn()`.

## Stories integradas

- **ListPageExample**: PageHeader + StatusCards + SearchBar funcional + FilterPill + DataTable paginado com CodeBadge/StatusDot.
- **FormPageExample**: FormSection + FieldGroup + FormField com Input/**Combobox**/**MultiSelect**, validaÃ§Ã£o com erro e **play function** (submete vazio â†’ erro `role=alert` visÃ­vel â†’ preenche â†’ erro some).
- **DetailPageExample**: summary + Tabs com DataTable embutido.
- **DashboardPageExample**: StatusCards + grid de ContentCards (Ã¡rea de grÃ¡fico reservada â€” lib de charts segue sem ADR).

## API final â€” forms e layouts

Conforme as seÃ§Ãµes 7 e 8 do plano, sem desvios de assinatura. Ãšnicos acrÃ©scimos: `id` no FormMessage (para aria-describedby) e `contentClassName` no PageLayout jÃ¡ previsto.

## PadrÃ£o recomendado com RHF + Zod

Documentado em `docs/architecture/forms.md` com exemplo completo (schema Zod, `register` para nativos, `Controller` para Combobox/MultiSelect/controlados, aria-invalid+describedby, FormActions). RHF/Zod permanecem dependÃªncias **dos portais**, nunca do nÃºcleo.

## DocumentaÃ§Ã£o criada/atualizada

Novos: `forms.md`, `page-layouts.md` (com a relaÃ§Ã£o explÃ­cita com o futuro AppShell â€” shell Ã© chrome, layout Ã© miolo). Atualizados: `blocks.md`, `ai/rules/blocks.md` (3 regras novas, incl. "tela nova comeÃ§a por um PageLayout"), changeset minor.

## Arquivos principais alterados

36 arquivos novos em `packages/blocks/src/{form-field,form-message,form-section,form-actions,field-group,page-layout,list-page-layout,form-page-layout,detail-page-layout,dashboard-page-layout,section-header,content-card,page-examples}/` + barrel + package.json (12 subpaths novos) + docs.

## ValidaÃ§Ãµes executadas

```
pnpm install          â†’ Done in 1.1s (zero deps novas)
pnpm check            â†’ Checked 197 files. No fixes applied (verde)
pnpm typecheck        â†’ 3 successful, 3 total
pnpm build            â†’ 3 successful, 3 total
pnpm build:storybook  â†’ completed successfully (215 stories)
pnpm check:pureza     â†’ OK â€” nenhum vazamento encontrado
pnpm storybook (dev)  â†’ HTTP 200
pnpm test:storybook   â†’ nÃ£o roda no sandbox (sem browsers Playwright);
                        localmente: playwright install chromium + pnpm test:storybook
```

## Resultado do check de pureza

Verde, sem ajustes.

## Problemas encontrados

Apenas o jÃ¡ conhecido `noShadowRestrictedNames` na story `Error` do FormMessage (â†’ `ErrorStory` com `name: "Error"`, mesmo padrÃ£o das sprints anteriores).

## DecisÃµes tomadas

1. FormField **nÃ£o clona filhos** para injetar aria â€” ids previsÃ­veis + conexÃ£o pelo consumidor (explÃ­cito > mÃ¡gico; documentado).
2. `required` do FormField Ã© indicador visual; o `required` real vai no controle.
3. Aside dos layouts fixo em 20rem no breakpoint lg (consistÃªncia entre Form/Detail/Dashboard).
4. FormActions com `border-t` integrado (padrÃ£o de footer dos dois portais) e sticky com backdrop-blur.
5. Dashboard sem componente de grÃ¡fico â€” slot livre atÃ© a ADR de charts.

## O que ficou fora

AppShell/Sidebar/Breadcrumb (Sprint 6); charts; FilterBar completo (FilterPills entram via slot `filters`); integraÃ§Ã£o RHF no nÃºcleo (por design, permanente).

## PendÃªncias

`pnpm test:storybook` local para executar as 3 play functions novas; auditoria a11y contÃ­nua.

## PrÃ³xima sprint recomendada

**Sprint 6 â€” AppShell/Sidebar/Breadcrumb**: o chrome que envolve estes layouts (estrutura visual do Supertrans + UX de colapso/submenu do Aurora, navegaÃ§Ã£o e permissÃµes injetadas por props/provider, conforme diagnÃ³stico original). Com ela, o nÃºcleo fica completo para a Sprint 7 â€” Supertrans consome.
