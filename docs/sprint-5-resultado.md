# Sprint 5 � Resultado

## Resumo

Camada de composição de **forms e layouts de página** entregue no `@supertrans-transportes/blocks`: 12 blocks novos (5 de formulário + 7 de layout), 4 stories integradas de página completa e 2 documentos de arquitetura (`forms.md`, `page-layouts.md`). Storybook saltou de 155 para **215 stories** (+60). Uma tela nova agora se monta 100% com padrões oficiais � o princípio "a biblioteca sabe como montar a tela, não o que ela significa" está aplicado em todos os slots. Nenhum portal alterado; validações e pureza verdes.

## Form blocks implementados (5)

| Block | Nota |
|---|---|
| FormField | label+controle+description/erro (trio repetido à mão nos forms do Supertrans, agora padronizado); ids `<htmlFor>-description`/`-error` para `aria-describedby` (conexão documentada � sem clonar filhos) |
| FormMessage | tons default/error/warning/success; erro com `role="alert"`; usado pelo FormField |
| FormSection | título/descrição/ações + Separator; padrão de seções dos dois portais |
| FormActions | primary/secondary/extra por slots; align left/right/between; `sticky` opcional |
| FieldGroup | grid 1�4 colunas, 1 no mobile; `sm:col-span-2` para campos largos (story WithMixedFields) |

Agnósticos de form library: **zero import de RHF/Zod** (critério 17 �S).

## Page layouts implementados (7)

PageLayout (base: header+pilha space-y-6+footer, maxWidth none/xl/2xl) · ListPageLayout (header� stats� toolbar/filters� content � o esqueleto das 30+ listagens do Aurora) · FormPageLayout (form em max-w-3xl, padrão Supertrans, ou grid com aside 20rem) · DetailPageLayout (summary� tabs� content+aside) · DashboardPageLayout (stats� content+aside) · SectionHeader · ContentCard (Card com cabeçalho/ações padronizados). Nome "Layout" (não "Template") conforme decisão da sprint.

## Stories adicionadas

60 novas em 3 grupos de navegação: `Blocks/Forms/*` (25: FormField 8, FormMessage 4, FormSection 4, FormActions 5, FieldGroup 5 � incluindo FormField com Combobox, MultiSelect e Checkbox), `Blocks/Layouts/*` (29: PageLayout 4, ListPage 7 incl. Loading/Empty, FormPage 4 incl. sticky, Detail 4, Dashboard 4, SectionHeader 3, ContentCard 4) e `Blocks/Exemplos de Página` (4 integradas). Callbacks com `fn()`.

## Stories integradas

- **ListPageExample**: PageHeader + StatusCards + SearchBar funcional + FilterPill + DataTable paginado com CodeBadge/StatusDot.
- **FormPageExample**: FormSection + FieldGroup + FormField com Input/**Combobox**/**MultiSelect**, validação com erro e **play function** (submete vazio �  erro `role=alert` visível �  preenche �  erro some).
- **DetailPageExample**: summary + Tabs com DataTable embutido.
- **DashboardPageExample**: StatusCards + grid de ContentCards (área de gráfico reservada � lib de charts segue sem ADR).

## API final � forms e layouts

Conforme as seções 7 e 8 do plano, sem desvios de assinatura. �anicos acréscimos: `id` no FormMessage (para aria-describedby) e `contentClassName` no PageLayout já previsto.

## Padrão recomendado com RHF + Zod

Documentado em `docs/architecture/forms.md` com exemplo completo (schema Zod, `register` para nativos, `Controller` para Combobox/MultiSelect/controlados, aria-invalid+describedby, FormActions). RHF/Zod permanecem dependências **dos portais**, nunca do núcleo.

## Documentação criada/atualizada

Novos: `forms.md`, `page-layouts.md` (com a relação explícita com o futuro AppShell � shell é chrome, layout é miolo). Atualizados: `blocks.md`, `ai/rules/blocks.md` (3 regras novas, incl. "tela nova começa por um PageLayout"), changeset minor.

## Arquivos principais alterados

36 arquivos novos em `packages/blocks/src/{form-field,form-message,form-section,form-actions,field-group,page-layout,list-page-layout,form-page-layout,detail-page-layout,dashboard-page-layout,section-header,content-card,page-examples}/` + barrel + package.json (12 subpaths novos) + docs.

## Validações executadas

```
pnpm install          �  Done in 1.1s (zero deps novas)
pnpm check            �  Checked 197 files. No fixes applied (verde)
pnpm typecheck        �  3 successful, 3 total
pnpm build            �  3 successful, 3 total
pnpm build:storybook  �  completed successfully (215 stories)
pnpm check:pureza     �  OK � nenhum vazamento encontrado
pnpm storybook (dev)  �  HTTP 200
pnpm test:storybook   �  não roda no sandbox (sem browsers Playwright);
                        localmente: playwright install chromium + pnpm test:storybook
```

## Resultado do check de pureza

Verde, sem ajustes.

## Problemas encontrados

Apenas o já conhecido `noShadowRestrictedNames` na story `Error` do FormMessage (�  `ErrorStory` com `name: "Error"`, mesmo padrão das sprints anteriores).

## Decisões tomadas

1. FormField **não clona filhos** para injetar aria � ids previsíveis + conexão pelo consumidor (explícito > mágico; documentado).
2. `required` do FormField é indicador visual; o `required` real vai no controle.
3. Aside dos layouts fixo em 20rem no breakpoint lg (consistência entre Form/Detail/Dashboard).
4. FormActions com `border-t` integrado (padrão de footer dos dois portais) e sticky com backdrop-blur.
5. Dashboard sem componente de gráfico � slot livre até a ADR de charts.

## O que ficou fora

AppShell/Sidebar/Breadcrumb (Sprint 6); charts; FilterBar completo (FilterPills entram via slot `filters`); integração RHF no núcleo (por design, permanente).

## Pendências

`pnpm test:storybook` local para executar as 3 play functions novas; auditoria a11y contínua.

## Próxima sprint recomendada

**Sprint 6 � AppShell/Sidebar/Breadcrumb**: o chrome que envolve estes layouts (estrutura visual do Supertrans + UX de colapso/submenu do Aurora, navegação e permissões injetadas por props/provider, conforme diagnóstico original). Com ela, o núcleo fica completo para a Sprint 7 � Supertrans consome.
