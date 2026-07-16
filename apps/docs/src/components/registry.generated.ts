// GERADO por scripts/generate-docs.mjs — não edite à mão.
import type * as React from 'react';
import type { StoryObj } from '@storybook/react';

import * as s0 from '../../../../packages/ui/src/accordion/accordion.stories';
import * as s1 from '../../../../packages/ui/src/alert/alert.stories';
import * as s2 from '../../../../packages/ui/src/alert-dialog/alert-dialog.stories';
import * as s3 from '../../../../packages/ui/src/avatar/avatar.stories';
import * as s4 from '../../../../packages/ui/src/badge/badge.stories';
import * as s5 from '../../../../packages/ui/src/button/button.stories';
import * as s6 from '../../../../packages/ui/src/card/card.stories';
import * as s7 from '../../../../packages/ui/src/checkbox/checkbox.stories';
import * as s8 from '../../../../packages/ui/src/combobox/combobox.stories';
import * as s9 from '../../../../packages/ui/src/dialog/dialog.stories';
import * as s10 from '../../../../packages/ui/src/dropdown-menu/dropdown-menu.stories';
import * as s11 from '../../../../packages/ui/src/input/input.stories';
import * as s12 from '../../../../packages/ui/src/label/label.stories';
import * as s13 from '../../../../packages/ui/src/multi-select/multi-select.stories';
import * as s14 from '../../../../packages/ui/src/popover/popover.stories';
import * as s15 from '../../../../packages/ui/src/progress/progress.stories';
import * as s16 from '../../../../packages/ui/src/radio-group/radio-group.stories';
import * as s17 from '../../../../packages/ui/src/scroll-area/scroll-area.stories';
import * as s18 from '../../../../packages/ui/src/select/select.stories';
import * as s19 from '../../../../packages/ui/src/separator/separator.stories';
import * as s20 from '../../../../packages/ui/src/sheet/sheet.stories';
import * as s21 from '../../../../packages/ui/src/skeleton/skeleton.stories';
import * as s22 from '../../../../packages/ui/src/spinner/spinner.stories';
import * as s23 from '../../../../packages/ui/src/switch/switch.stories';
import * as s24 from '../../../../packages/ui/src/table/table.stories';
import * as s25 from '../../../../packages/ui/src/tabs/tabs.stories';
import * as s26 from '../../../../packages/ui/src/textarea/textarea.stories';
import * as s27 from '../../../../packages/ui/src/tooltip/tooltip.stories';
import * as s28 from '../../../../packages/blocks/src/app-shell/app-shell.stories';
import * as s29 from '../../../../packages/blocks/src/breadcrumbs/breadcrumbs.stories';
import * as s30 from '../../../../packages/blocks/src/code-badge/code-badge.stories';
import * as s31 from '../../../../packages/blocks/src/confirm-dialog/confirm-dialog.stories';
import * as s32 from '../../../../packages/blocks/src/content-card/content-card.stories';
import * as s33 from '../../../../packages/blocks/src/crud-modal-header/crud-modal-header.stories';
import * as s34 from '../../../../packages/blocks/src/dashboard-page-layout/dashboard-page-layout.stories';
import * as s35 from '../../../../packages/blocks/src/data-table/data-table.stories';
import * as s36 from '../../../../packages/blocks/src/detail-page-layout/detail-page-layout.stories';
import * as s37 from '../../../../packages/blocks/src/empty-state/empty-state.stories';
import * as s38 from '../../../../packages/blocks/src/error-state/error-state.stories';
import * as s39 from '../../../../packages/blocks/src/field-group/field-group.stories';
import * as s40 from '../../../../packages/blocks/src/filter-pill/filter-pill.stories';
import * as s41 from '../../../../packages/blocks/src/filters-card/filters-card.stories';
import * as s42 from '../../../../packages/blocks/src/form-actions/form-actions.stories';
import * as s43 from '../../../../packages/blocks/src/form-field/form-field.stories';
import * as s44 from '../../../../packages/blocks/src/form-message/form-message.stories';
import * as s45 from '../../../../packages/blocks/src/form-page-layout/form-page-layout.stories';
import * as s46 from '../../../../packages/blocks/src/form-section/form-section.stories';
import * as s47 from '../../../../packages/blocks/src/launcher-card/launcher-card.stories';
import * as s48 from '../../../../packages/blocks/src/list-page-layout/list-page-layout.stories';
import * as s49 from '../../../../packages/blocks/src/loading-overlay/loading-overlay.stories';
import * as s50 from '../../../../packages/blocks/src/page-examples/page-examples.stories';
import * as s51 from '../../../../packages/blocks/src/page-header/page-header.stories';
import * as s52 from '../../../../packages/blocks/src/page-layout/page-layout.stories';
import * as s53 from '../../../../packages/blocks/src/pagination/pagination.stories';
import * as s54 from '../../../../packages/blocks/src/search-bar/search-bar.stories';
import * as s55 from '../../../../packages/blocks/src/section-header/section-header.stories';
import * as s56 from '../../../../packages/blocks/src/sidebar/sidebar.stories';
import * as s57 from '../../../../packages/blocks/src/status-cards/status-cards.stories';
import * as s58 from '../../../../packages/blocks/src/status-dot/status-dot.stories';
import * as s59 from '../../../../packages/blocks/src/table-skeleton-rows/table-skeleton-rows.stories';

export type RegistryEntry = {
  // O componente-alvo vive no meta (default export), não na story:
  // stories sem render() precisam dele para renderizar os args.
  meta: { component?: React.ComponentType<Record<string, unknown>> };
  stories: Record<string, StoryObj>;
  code: Record<string, string>;
};

export const registry: Record<string, RegistryEntry> = {
  "ui/accordion": {
    meta: s0.default as RegistryEntry['meta'],
    stories: s0 as unknown as Record<string, StoryObj>,
    code: {
      "Single": "<Accordion type=\"single\" className=\"w-96\">\n\t<AccordionItem value=\"item-1\">\n\t\t<AccordionTrigger>O que é o Núcleo de Portais?</AccordionTrigger>\n\t\t<AccordionContent>\n\t\t\tA base oficial de componentes, tokens e padrões dos portais do grupo.\n\t\t</AccordionContent>\n\t</AccordionItem>\n\t<AccordionItem value=\"item-2\">\n\t\t<AccordionTrigger>Como os temas funcionam?</AccordionTrigger>\n\t\t<AccordionContent>Por CSS variables com data-brand — nunca por props.</AccordionContent>\n\t</AccordionItem>\n</Accordion>",
      "Multiple": "<Accordion type=\"multiple\" className=\"w-96\">\n\t{[\"Seção A\", \"Seção B\", \"Seção C\"].map((s, i) => (\n\t\t<AccordionItem key={s} value={`m-${i}`}>\n\t\t\t<AccordionTrigger>{s}</AccordionTrigger>\n\t\t\t<AccordionContent>Conteúdo de {s} — várias podem ficar abertas.</AccordionContent>\n\t\t</AccordionItem>\n\t))}\n</Accordion>",
      "WithLongContent": "<Accordion type=\"single\" className=\"w-96\">\n\t<AccordionItem value=\"longo\">\n\t\t<AccordionTrigger>Detalhes completos</AccordionTrigger>\n\t\t<AccordionContent>\n\t\t\t{Array.from({ length: 6 }).map((_, i) => (\n\t\t\t\t<p key={`p-${i + 1}`} className=\"mb-2\">\n\t\t\t\t\tParágrafo {i + 1} de conteúdo extenso dentro do painel do accordion.\n\t\t\t\t</p>\n\t\t\t))}\n\t\t</AccordionContent>\n\t</AccordionItem>\n</Accordion>",
      "DisabledItem": "<Accordion type=\"single\" className=\"w-96\">\n\t<AccordionItem value=\"ok\">\n\t\t<AccordionTrigger>Disponível</AccordionTrigger>\n\t\t<AccordionContent>Este item abre normalmente.</AccordionContent>\n\t</AccordionItem>\n\t<AccordionItem value=\"bloqueado\" disabled>\n\t\t<AccordionTrigger>Indisponível</AccordionTrigger>\n\t\t<AccordionContent>Nunca visível.</AccordionContent>\n\t</AccordionItem>\n</Accordion>",
    },
  },
  "ui/alert": {
    meta: s1.default as RegistryEntry['meta'],
    stories: s1 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<Alert className=\"w-96\">\n\t<Terminal />\n\t<AlertTitle>Atenção</AlertTitle>\n\t<AlertDescription>Você pode adicionar componentes usando a CLI.</AlertDescription>\n</Alert>",
      "Destructive": "<Alert variant=\"destructive\" className=\"w-96\">\n\t<AlertCircle />\n\t<AlertTitle>Erro</AlertTitle>\n\t<AlertDescription>Não foi possível salvar as alterações.</AlertDescription>\n</Alert>",
      "InfoVariant": "<Alert variant=\"info\" className=\"w-96\">\n\t<Info />\n\t<AlertTitle>Informação</AlertTitle>\n\t<AlertDescription>A sincronização roda automaticamente no startup.</AlertDescription>\n</Alert>",
    },
  },
  "ui/alert-dialog": {
    meta: s2.default as RegistryEntry['meta'],
    stories: s2 as unknown as Record<string, StoryObj>,
    code: {
      "Confirmacao": "<AlertDialog>\n\t<AlertDialogTrigger render={<Button variant=\"destructive\">Excluir registro</Button>} />\n\t<AlertDialogContent>\n\t\t<AlertDialogHeader>\n\t\t\t<AlertDialogTitle>Tem certeza?</AlertDialogTitle>\n\t\t\t<AlertDialogDescription>\n\t\t\t\tEsta ação não pode ser desfeita. O registro será removido permanentemente.\n\t\t\t</AlertDialogDescription>\n\t\t</AlertDialogHeader>\n\t\t<AlertDialogFooter>\n\t\t\t<AlertDialogCancel>Cancelar</AlertDialogCancel>\n\t\t\t<AlertDialogAction>Confirmar exclusão</AlertDialogAction>\n\t\t</AlertDialogFooter>\n\t</AlertDialogContent>\n</AlertDialog>",
    },
  },
  "ui/avatar": {
    meta: s3.default as RegistryEntry['meta'],
    stories: s3 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<Avatar>\n\t<AvatarImage src=\"https://github.com/shadcn.png\" alt=\"@shadcn\" />\n\t<AvatarFallback>CN</AvatarFallback>\n</Avatar>",
      "WithFallback": "<Avatar>\n\t<AvatarImage src=\"https://invalid-url.com/image.png\" alt=\"@shadcn\" />\n\t<AvatarFallback>JD</AvatarFallback>\n</Avatar>",
      "CustomSize": "<Avatar className=\"h-20 w-20\">\n\t<AvatarImage src=\"https://github.com/shadcn.png\" alt=\"@shadcn\" />\n\t<AvatarFallback>CN</AvatarFallback>\n</Avatar>",
    },
  },
  "ui/badge": {
    meta: s4.default as RegistryEntry['meta'],
    stories: s4 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<Badge variant=\"default\">Badge</Badge>",
      "Secondary": "<Badge variant=\"secondary\">Secondary</Badge>",
      "Destructive": "<Badge variant=\"destructive\">Destructive</Badge>",
      "Outline": "<Badge variant=\"outline\">Outline</Badge>",
      "Brand": "<Badge variant=\"tinted\">Brand Badge</Badge>",
    },
  },
  "ui/button": {
    meta: s5.default as RegistryEntry['meta'],
    stories: s5 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<Button variant=\"default\">Button</Button>",
      "Outline": "<Button variant=\"outline\">Outline</Button>",
      "Secondary": "<Button variant=\"secondary\">Secondary</Button>",
      "Ghost": "<Button variant=\"ghost\">Ghost</Button>",
      "Destructive": "<Button variant=\"destructive\">Excluir</Button>",
      "Link": "<Button variant=\"link\">Link</Button>",
      "Disabled": "<Button disabled>Desabilitado</Button>",
      "WithIcon": "<div className=\"flex items-center gap-2\">\n\t<Button>\n\t\t<Send /> Enviar\n\t</Button>\n\t<Button variant=\"outline\">\n\t\t<Search /> Buscar\n\t</Button>\n\t<Button variant=\"destructive\" size=\"icon\" aria-label=\"Excluir\">\n\t\t<Trash2 />\n\t</Button>\n</div>",
      "AllSizes": "<div className=\"flex items-center gap-2\">\n\t<Button size=\"xs\">xs</Button>\n\t<Button size=\"sm\">sm</Button>\n\t<Button size=\"default\">default</Button>\n\t<Button size=\"lg\">lg</Button>\n</div>",
    },
  },
  "ui/card": {
    meta: s6.default as RegistryEntry['meta'],
    stories: s6 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<Card className=\"w-[350px]\">\n\t<CardHeader>\n\t\t<CardTitle>Create project</CardTitle>\n\t\t<CardDescription>Deploy your new project in one-click.</CardDescription>\n\t</CardHeader>\n\t<CardContent>\n\t\t<p>Card Content goes here.</p>\n\t</CardContent>\n\t<CardFooter className=\"flex justify-between\">\n\t\t<Button variant=\"outline\">Cancel</Button>\n\t\t<Button>Deploy</Button>\n\t</CardFooter>\n</Card>",
      "Simple": "<Card className=\"w-[350px]\">\n\t<CardContent className=\"pt-6\">\n\t\t<p>A simple card with only content.</p>\n\t</CardContent>\n</Card>",
    },
  },
  "ui/checkbox": {
    meta: s7.default as RegistryEntry['meta'],
    stories: s7 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<div className=\"flex items-center space-x-2\">\n\t<Checkbox id=\"terms\" />\n\t<Label htmlFor=\"terms\">Accept terms and conditions</Label>\n</div>",
      "Checked": "<div className=\"flex items-center space-x-2\">\n\t<Checkbox id=\"checked\" {...args} />\n\t<Label htmlFor=\"checked\">Checked by default</Label>\n</div>",
      "Disabled": "<div className=\"flex items-center space-x-2\">\n\t<Checkbox id=\"disabled\" {...args} />\n\t<Label htmlFor=\"disabled\">Disabled checkbox</Label>\n</div>",
    },
  },
  "ui/combobox": {
    meta: s8.default as RegistryEntry['meta'],
    stories: s8 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<Controlado onValueChange={args.onValueChange} />",
      "WithSearch": "<Controlado\n\tonValueChange={args.onValueChange}\n\toptions={Array.from({ length: 12 }).map((_, i) => ({\n\t\tlabel: `Registro ${i + 1}`,\n\t\tvalue: `reg-${i + 1}`,\n\t}))}\n\tplaceholder=\"Buscar registro...\"\n/>",
      "WithGroups": "<Controlado onValueChange={args.onValueChange} options={groupedOptions} />",
      "Disabled": "<Combobox options={simpleOptions} onValueChange={fn()} disabled value=\"option-1\" />",
      "Clearable": "<Controlado onValueChange={args.onValueChange} value=\"option-2\" clearable />",
      "WithDescriptions": "<Controlado\n\tonValueChange={args.onValueChange}\n\toptions={[\n\t\t{ label: \"Padrão\", value: \"padrao\", description: \"Fila normal de processamento\" },\n\t\t{ label: \"Prioritário\", value: \"prio\", description: \"Processado antes dos demais\" },\n\t]}\n/>",
      "EmptySearch": "<Controlado\n\tonValueChange={args.onValueChange}\n\temptyMessage=\"Nada encontrado — tente outro termo\"\n/>",
      "LongList": "<Controlado\n\tonValueChange={args.onValueChange}\n\toptions={Array.from({ length: 80 }).map((_, i) => ({\n\t\tlabel: `Item ${String(i + 1).padStart(2, \"0\")}`,\n\t\tvalue: `item-${i + 1}`,\n\t}))}\n/>",
      "KeyboardInteraction": "<Controlado onValueChange={args.onValueChange} options={groupedOptions} />",
      "ComLabelExterno": "<div className=\"grid w-64 gap-1.5\">\n\t<Label htmlFor=\"cb-tipo\">Tipo de registro</Label>\n\t<Controlado onValueChange={args.onValueChange} id=\"cb-tipo\" />\n</div>",
    },
  },
  "ui/dialog": {
    meta: s9.default as RegistryEntry['meta'],
    stories: s9 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<Dialog>\n\t<DialogTrigger render={<Button variant=\"outline\">Edit Profile</Button>} />\n\t<DialogContent className=\"sm:max-w-[425px]\">\n\t\t<DialogHeader>\n\t\t\t<DialogTitle>Edit profile</DialogTitle>\n\t\t\t<DialogDescription>\n\t\t\t\tMake changes to your profile here. Click save when you're done.\n\t\t\t</DialogDescription>\n\t\t</DialogHeader>\n\t\t<div className=\"grid gap-4 py-4\">\n\t\t\t<div className=\"grid grid-cols-4 items-center gap-4\">\n\t\t\t\t<Label htmlFor=\"name\" className=\"text-right\">\n\t\t\t\t\tName\n\t\t\t\t</Label>\n\t\t\t\t<Input id=\"name\" defaultValue=\"Pedro Duarte\" className=\"col-span-3\" />\n\t\t\t</div>\n\t\t\t<div className=\"grid grid-cols-4 items-center gap-4\">\n\t\t\t\t<Label htmlFor=\"username\" className=\"text-right\">\n\t\t\t\t\tUsername\n\t\t\t\t</Label>\n\t\t\t\t<Input id=\"username\" defaultValue=\"@peduarte\" className=\"col-span-3\" />\n\t\t\t</div>\n\t\t</div>\n\t\t<DialogFooter>\n\t\t\t<Button type=\"submit\">Save changes</Button>\n\t\t</DialogFooter>\n\t</DialogContent>\n</Dialog>",
    },
  },
  "ui/dropdown-menu": {
    meta: s10.default as RegistryEntry['meta'],
    stories: s10 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<DropdownMenu>\n\t<DropdownMenuTrigger render={<Button variant=\"outline\">Abrir menu</Button>} />\n\t<DropdownMenuContent className=\"w-56\">\n\t\t<DropdownMenuLabel>Minha conta</DropdownMenuLabel>\n\t\t<DropdownMenuSeparator />\n\t\t<DropdownMenuItem>\n\t\t\t<User /> Perfil\n\t\t\t<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>\n\t\t</DropdownMenuItem>\n\t\t<DropdownMenuItem>\n\t\t\t<Settings /> Configurações\n\t\t</DropdownMenuItem>\n\t\t<DropdownMenuSeparator />\n\t\t<DropdownMenuItem disabled>Item desabilitado</DropdownMenuItem>\n\t\t<DropdownMenuSeparator />\n\t\t<DropdownMenuItem>\n\t\t\t<LogOut /> Sair\n\t\t</DropdownMenuItem>\n\t</DropdownMenuContent>\n</DropdownMenu>",
      "ComCheckboxESubmenu": "<DropdownMenu>\n\t<DropdownMenuTrigger render={<Button variant=\"outline\">Exibir colunas</Button>} />\n\t<DropdownMenuContent className=\"w-56\">\n\t\t<DropdownMenuCheckboxItem defaultChecked>Nome</DropdownMenuCheckboxItem>\n\t\t<DropdownMenuCheckboxItem defaultChecked>Status</DropdownMenuCheckboxItem>\n\t\t<DropdownMenuCheckboxItem>Criado em</DropdownMenuCheckboxItem>\n\t\t<DropdownMenuSeparator />\n\t\t<DropdownMenuSub>\n\t\t\t<DropdownMenuSubTrigger>Exportar</DropdownMenuSubTrigger>\n\t\t\t<DropdownMenuSubContent>\n\t\t\t\t<DropdownMenuItem>Excel</DropdownMenuItem>\n\t\t\t\t<DropdownMenuItem>PDF</DropdownMenuItem>\n\t\t\t</DropdownMenuSubContent>\n\t\t</DropdownMenuSub>\n\t</DropdownMenuContent>\n</DropdownMenu>",
    },
  },
  "ui/input": {
    meta: s11.default as RegistryEntry['meta'],
    stories: s11 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<Input placeholder=\"Type something...\" />",
      "Password": "<Input type=\"password\" placeholder=\"Enter password\" />",
      "Disabled": "<Input disabled placeholder=\"Disabled input\" />",
      "WithValue": "<Input defaultValue=\"Hello World\" />",
    },
  },
  "ui/label": {
    meta: s12.default as RegistryEntry['meta'],
    stories: s12 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<div>\n\t<Label htmlFor=\"email\">Email address</Label>\n\t<Input type=\"email\" id=\"email\" placeholder=\"Email\" className=\"mt-2\" />\n</div>",
    },
  },
  "ui/multi-select": {
    meta: s13.default as RegistryEntry['meta'],
    stories: s13 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<Controlado onValueChange={args.onValueChange} />",
      "WithSearch": "<Controlado\n\tonValueChange={args.onValueChange}\n\toptions={Array.from({ length: 15 }).map((_, i) => ({\n\t\tlabel: `Registro ${i + 1}`,\n\t\tvalue: `reg-${i + 1}`,\n\t}))}\n\tplaceholder=\"Buscar e selecionar...\"\n/>",
      "WithGroups": "<Controlado onValueChange={args.onValueChange} options={groupedOptions} initial={[\"a1\"]} />",
      "Disabled": "<MultiSelect\n\toptions={simpleOptions}\n\tvalue={[\"option-1\", \"option-2\"]}\n\tonValueChange={fn()}\n\tdisabled\n/>",
      "WithDisabledOptions": "<Controlado\n\tonValueChange={args.onValueChange}\n\toptions={[\n\t\t{ label: \"Disponível 1\", value: \"d1\" },\n\t\t{ label: \"Indisponível\", value: \"x1\", disabled: true },\n\t\t{ label: \"Disponível 2\", value: \"d2\" },\n\t]}\n/>",
      "Clearable": "<Controlado onValueChange={args.onValueChange} initial={[\"option-1\", \"option-3\"]} clearable />",
      "MaxDisplay": "<Controlado\n\tonValueChange={args.onValueChange}\n\tinitial={[\"option-1\", \"option-2\", \"option-3\", \"option-4\"]}\n\tmaxDisplay={2}\n/>",
      "EmptySearch": "<Controlado onValueChange={args.onValueChange} emptyMessage=\"Nenhum resultado\" />",
      "LongList": "<Controlado\n\tonValueChange={args.onValueChange}\n\toptions={Array.from({ length: 100 }).map((_, i) => ({\n\t\tlabel: `Item ${String(i + 1).padStart(3, \"0\")}`,\n\t\tvalue: `item-${i + 1}`,\n\t}))}\n/>",
      "WithDescriptions": "<Controlado\n\tonValueChange={args.onValueChange}\n\toptions={[\n\t\t{ label: \"Leitura\", value: \"read\", description: \"Visualizar registros\" },\n\t\t{ label: \"Escrita\", value: \"write\", description: \"Criar e editar registros\" },\n\t\t{ label: \"Exclusão\", value: \"delete\", description: \"Remover registros\" },\n\t]}\n/>",
      "ManySelected": "<Controlado\n\tonValueChange={args.onValueChange}\n\toptions={Array.from({ length: 20 }).map((_, i) => ({\n\t\tlabel: `Item ${i + 1}`,\n\t\tvalue: `i-${i + 1}`,\n\t}))}\n\tinitial={Array.from({ length: 12 }).map((_, i) => `i-${i + 1}`)}\n\tmaxDisplay={4}\n\tclearable\n\tclassName=\"w-96\"\n/>",
      "KeyboardInteraction": "<Controlado onValueChange={args.onValueChange} options={groupedOptions} />",
    },
  },
  "ui/popover": {
    meta: s14.default as RegistryEntry['meta'],
    stories: s14 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<Exemplo />",
      "WithForm": "<Popover>\n\t<PopoverTrigger render={<Button variant=\"outline\">Ajustar dimensões</Button>} />\n\t<PopoverContent className=\"w-80\">\n\t\t<div className=\"grid gap-3\">\n\t\t\t<p className=\"text-sm font-medium\">Dimensões</p>\n\t\t\t<div className=\"grid grid-cols-3 items-center gap-2\">\n\t\t\t\t<Label htmlFor=\"pop-largura\">Largura</Label>\n\t\t\t\t<Input id=\"pop-largura\" defaultValue=\"100%\" className=\"col-span-2 h-8\" />\n\t\t\t</div>\n\t\t\t<div className=\"grid grid-cols-3 items-center gap-2\">\n\t\t\t\t<Label htmlFor=\"pop-altura\">Altura</Label>\n\t\t\t\t<Input id=\"pop-altura\" defaultValue=\"25px\" className=\"col-span-2 h-8\" />\n\t\t\t</div>\n\t\t</div>\n\t</PopoverContent>\n</Popover>",
      "WithCustomWidth": "<Popover>\n\t<PopoverTrigger render={<Button variant=\"outline\">Popover largo</Button>} />\n\t<PopoverContent className=\"w-96\">\n\t\t<p className=\"text-sm\">Largura customizada via className (w-96).</p>\n\t</PopoverContent>\n</Popover>",
      "SupertransBrand": "<div data-brand=\"supertrans\" className=\"rounded-lg border border-border bg-background p-6\">\n\t<Exemplo />\n</div>",
      "AuroraBrand": "<div data-brand=\"aurora\" className=\"rounded-lg border border-border bg-background p-6\">\n\t<Exemplo />\n</div>",
    },
  },
  "ui/progress": {
    meta: s15.default as RegistryEntry['meta'],
    stories: s15 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<Progress value={60} className=\"w-80\" />",
      "DifferentValues": "<div className=\"w-80 space-y-3\">\n\t{[0, 25, 50, 75, 100].map((v) => (\n\t\t<Progress key={v} value={v} />\n\t))}\n</div>",
      "Indeterminate": "<Progress className=\"w-80\" />",
      "WithLabel": "{\n\tconst [value, setValue] = React.useState(30);\n\tReact.useEffect(() => {\n\t\tconst t = setInterval(() => setValue((v) => (v >= 100 ? 0 : v + 10)), 900);\n\t\treturn () => clearInterval(t);\n\t}, []);\n\treturn (\n\t\t<div className=\"w-80 space-y-1.5\">\n\t\t\t<div className=\"flex justify-between text-sm\">\n\t\t\t\t<span className=\"text-muted-foreground\">Processando…</span>\n\t\t\t\t<span className=\"font-medium text-foreground\">{value}%</span>\n\t\t\t</div>\n\t\t\t<Progress value={value} />\n\t\t</div>\n\t);\n}",
    },
  },
  "ui/radio-group": {
    meta: s16.default as RegistryEntry['meta'],
    stories: s16 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "{\n\tconst [value, setValue] = React.useState<unknown>(\"sim\");\n\treturn (\n\t\t<RadioGroup value={value} onValueChange={setValue}>\n\t\t\t<div className=\"flex items-center gap-2\">\n\t\t\t\t<RadioGroupItem value=\"sim\" id=\"rg-sim\" />\n\t\t\t\t<Label htmlFor=\"rg-sim\">Sim</Label>\n\t\t\t</div>\n\t\t\t<div className=\"flex items-center gap-2\">\n\t\t\t\t<RadioGroupItem value=\"nao\" id=\"rg-nao\" />\n\t\t\t\t<Label htmlFor=\"rg-nao\">Não</Label>\n\t\t\t</div>\n\t\t</RadioGroup>\n\t);\n}",
      "Disabled": "<RadioGroup defaultValue=\"a\" disabled>\n\t<div className=\"flex items-center gap-2\">\n\t\t<RadioGroupItem value=\"a\" id=\"rg-a\" />\n\t\t<Label htmlFor=\"rg-a\">Opção A (grupo desabilitado)</Label>\n\t</div>\n\t<div className=\"flex items-center gap-2\">\n\t\t<RadioGroupItem value=\"b\" id=\"rg-b\" />\n\t\t<Label htmlFor=\"rg-b\">Opção B</Label>\n\t</div>\n</RadioGroup>",
      "Horizontal": "<RadioGroup defaultValue=\"1\" className=\"grid-flow-col gap-6\">\n\t{[\"1\", \"2\", \"3\"].map((v) => (\n\t\t<div key={v} className=\"flex items-center gap-2\">\n\t\t\t<RadioGroupItem value={v} id={`rg-h-${v}`} />\n\t\t\t<Label htmlFor={`rg-h-${v}`}>Opção {v}</Label>\n\t\t</div>\n\t))}\n</RadioGroup>",
      "WithDescriptions": "<RadioGroup defaultValue=\"padrao\" className=\"gap-4\">\n\t<div className=\"flex items-start gap-3\">\n\t\t<RadioGroupItem value=\"padrao\" id=\"rg-padrao\" className=\"mt-0.5\" />\n\t\t<div>\n\t\t\t<Label htmlFor=\"rg-padrao\">Padrão</Label>\n\t\t\t<p className=\"text-sm text-muted-foreground\">Processamento na fila normal.</p>\n\t\t</div>\n\t</div>\n\t<div className=\"flex items-start gap-3\">\n\t\t<RadioGroupItem value=\"prioritario\" id=\"rg-prio\" className=\"mt-0.5\" />\n\t\t<div>\n\t\t\t<Label htmlFor=\"rg-prio\">Prioritário</Label>\n\t\t\t<p className=\"text-sm text-muted-foreground\">Processado antes dos demais.</p>\n\t\t</div>\n\t</div>\n</RadioGroup>",
    },
  },
  "ui/scroll-area": {
    meta: s17.default as RegistryEntry['meta'],
    stories: s17 as unknown as Record<string, StoryObj>,
    code: {
      "Vertical": "<ScrollArea className=\"h-72 w-56 rounded-md border border-border\">\n\t<div className=\"p-4\">\n\t\t<p className=\"mb-3 text-sm font-medium\">Itens</p>\n\t\t{itens.map((item) => (\n\t\t\t<div key={item}>\n\t\t\t\t<p className=\"py-1.5 text-sm\">{item}</p>\n\t\t\t\t<Separator />\n\t\t\t</div>\n\t\t))}\n\t</div>\n</ScrollArea>",
      "Horizontal": "<ScrollArea className=\"w-96 rounded-md border border-border\">\n\t<div className=\"flex gap-4 p-4\">\n\t\t{Array.from({ length: 12 }).map((_, i) => (\n\t\t\t<div\n\t\t\t\tkey={`col-${i + 1}`}\n\t\t\t\tclassName=\"flex h-24 w-32 shrink-0 items-center justify-center rounded-md bg-muted text-sm text-muted-foreground\"\n\t\t\t>\n\t\t\t\tBloco {i + 1}\n\t\t\t</div>\n\t\t))}\n\t</div>\n</ScrollArea>",
      "LongList": "<ScrollArea className=\"h-80 w-72 rounded-md border border-border\">\n\t<div className=\"p-2\">\n\t\t{Array.from({ length: 200 }).map((_, i) => (\n\t\t\t<p key={`linha-${i + 1}`} className=\"rounded px-2 py-1 text-sm hover:bg-muted\">\n\t\t\t\tRegistro nº {i + 1}\n\t\t\t</p>\n\t\t))}\n\t</div>\n</ScrollArea>",
      "InsideCard": "<Card className=\"w-80\">\n\t<CardHeader>\n\t\t<CardTitle>Histórico</CardTitle>\n\t</CardHeader>\n\t<CardContent>\n\t\t<ScrollArea className=\"h-48\">\n\t\t\t{itens.slice(0, 20).map((item) => (\n\t\t\t\t<p key={item} className=\"py-1 text-sm text-muted-foreground\">\n\t\t\t\t\t{item} processado com sucesso\n\t\t\t\t</p>\n\t\t\t))}\n\t\t</ScrollArea>\n\t</CardContent>\n</Card>",
    },
  },
  "ui/select": {
    meta: s18.default as RegistryEntry['meta'],
    stories: s18 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<Select defaultValue=\"apple\">\n\t<SelectTrigger className=\"w-45\">\n\t\t<SelectValue placeholder=\"Select a fruit\" />\n\t</SelectTrigger>\n\t<SelectContent>\n\t\t<SelectItem value=\"apple\">Apple</SelectItem>\n\t\t<SelectItem value=\"banana\">Banana</SelectItem>\n\t\t<SelectItem value=\"blueberry\">Blueberry</SelectItem>\n\t\t<SelectItem value=\"grapes\">Grapes</SelectItem>\n\t\t<SelectItem value=\"pineapple\">Pineapple</SelectItem>\n\t</SelectContent>\n</Select>",
      "WithItemsArray": "{\n\tconst fruits = [\n\t\t{ value: \"apple\", label: \"Apple\" },\n\t\t{ value: \"banana\", label: \"Banana\" },\n\t\t{ value: \"orange\", label: \"Orange\" },\n\t];\n\treturn (\n\t\t<Select>\n\t\t\t<SelectTrigger className=\"w-45\">\n\t\t\t\t<SelectValue placeholder=\"Select a fruit\" items={fruits} />\n\t\t\t</SelectTrigger>\n\t\t\t<SelectContent>\n\t\t\t\t{fruits.map((f) => (\n\t\t\t\t\t<SelectItem key={f.value} value={f.value}>\n\t\t\t\t\t\t{f.label}\n\t\t\t\t\t</SelectItem>\n\t\t\t\t))}\n\t\t\t</SelectContent>\n\t\t</Select>\n\t);\n}",
    },
  },
  "ui/separator": {
    meta: s19.default as RegistryEntry['meta'],
    stories: s19 as unknown as Record<string, StoryObj>,
    code: {
      "Horizontal": "<div className=\"w-64 space-y-3\">\n\t<p className=\"text-sm\">Seção A</p>\n\t<Separator />\n\t<p className=\"text-sm\">Seção B</p>\n</div>",
      "Vertical": "<div className=\"flex h-6 items-center gap-3 text-sm\">\n\t<span>Item 1</span>\n\t<Separator orientation=\"vertical\" />\n\t<span>Item 2</span>\n\t<Separator orientation=\"vertical\" />\n\t<span>Item 3</span>\n</div>",
    },
  },
  "ui/sheet": {
    meta: s20.default as RegistryEntry['meta'],
    stories: s20 as unknown as Record<string, StoryObj>,
    code: {
      "Right": "<Painel side=\"right\" />",
      "Left": "<Painel side=\"left\" />",
      "Bottom": "<Painel side=\"bottom\" />",
      "WithFormContent": "<Sheet>\n\t<SheetTrigger render={<Button>Editar registro</Button>} />\n\t<SheetContent side=\"right\">\n\t\t<SheetHeader>\n\t\t\t<SheetTitle>Editar registro</SheetTitle>\n\t\t\t<SheetDescription>Altere os campos e salve.</SheetDescription>\n\t\t</SheetHeader>\n\t\t<div className=\"grid gap-4\">\n\t\t\t<div className=\"grid gap-1.5\">\n\t\t\t\t<Label htmlFor=\"sheet-nome\">Nome</Label>\n\t\t\t\t<Input id=\"sheet-nome\" defaultValue=\"Registro 42\" />\n\t\t\t</div>\n\t\t\t<div className=\"grid gap-1.5\">\n\t\t\t\t<Label htmlFor=\"sheet-codigo\">Código</Label>\n\t\t\t\t<Input id=\"sheet-codigo\" defaultValue=\"REG-042\" />\n\t\t\t</div>\n\t\t</div>\n\t\t<SheetFooter>\n\t\t\t<Button variant=\"outline\">Cancelar</Button>\n\t\t\t<Button>Salvar</Button>\n\t\t</SheetFooter>\n\t</SheetContent>\n</Sheet>",
      "ScrollableContent": "<Sheet>\n\t<SheetTrigger render={<Button variant=\"outline\">Histórico longo</Button>} />\n\t<SheetContent side=\"right\">\n\t\t<SheetHeader>\n\t\t\t<SheetTitle>Histórico</SheetTitle>\n\t\t</SheetHeader>\n\t\t<ScrollArea className=\"-mx-2 h-full px-2\">\n\t\t\t{Array.from({ length: 60 }).map((_, i) => (\n\t\t\t\t<p key={`h-${i + 1}`} className=\"border-b border-border py-2 text-sm\">\n\t\t\t\t\tEvento nº {i + 1}\n\t\t\t\t</p>\n\t\t\t))}\n\t\t</ScrollArea>\n\t</SheetContent>\n</Sheet>",
    },
  },
  "ui/skeleton": {
    meta: s21.default as RegistryEntry['meta'],
    stories: s21 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<Skeleton className=\"h-4 w-48\" />",
      "CardPlaceholder": "<div className=\"w-72 space-y-3 rounded-lg border border-border p-4\">\n\t<Skeleton className=\"h-5 w-2/3\" />\n\t<Skeleton className=\"h-4 w-full\" />\n\t<Skeleton className=\"h-4 w-5/6\" />\n\t<div className=\"flex items-center gap-2 pt-2\">\n\t\t<Skeleton className=\"size-9 rounded-full\" />\n\t\t<Skeleton className=\"h-4 w-24\" />\n\t</div>\n</div>",
    },
  },
  "ui/spinner": {
    meta: s22.default as RegistryEntry['meta'],
    stories: s22 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<Spinner />",
      "Sizes": "<div className=\"flex items-center gap-6\">\n\t<Spinner size=\"sm\" />\n\t<Spinner size=\"md\" />\n\t<Spinner size=\"lg\" />\n</div>",
      "WithLabel": "<Spinner label=\"Carregando...\" size=\"sm\" />",
      "InsideButton": "<div className=\"flex gap-3\">\n\t<Button disabled>\n\t\t<Spinner size=\"sm\" className=\"text-primary-foreground\" /> Salvando…\n\t</Button>\n\t<Button variant=\"outline\" disabled>\n\t\t<Spinner size=\"sm\" /> Processando…\n\t</Button>\n</div>",
    },
  },
  "ui/switch": {
    meta: s23.default as RegistryEntry['meta'],
    stories: s23 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<Switch />",
      "Checked": "<Switch defaultChecked />",
      "Disabled": "<Switch disabled />",
      "DisabledChecked": "<Switch disabled defaultChecked />",
      "ComLabel": "<div className=\"flex items-center gap-2\">\n\t<Switch id=\"notificacoes\" defaultChecked />\n\t<Label htmlFor=\"notificacoes\">Receber notificações</Label>\n</div>",
    },
  },
  "ui/table": {
    meta: s24.default as RegistryEntry['meta'],
    stories: s24 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<Table>\n\t<TableCaption>A list of your recent invoices.</TableCaption>\n\t<TableHeader>\n\t\t<TableRow>\n\t\t\t<TableHead className=\"w-25\">Invoice</TableHead>\n\t\t\t<TableHead>Status</TableHead>\n\t\t\t<TableHead>Method</TableHead>\n\t\t\t<TableHead className=\"text-right\">Amount</TableHead>\n\t\t</TableRow>\n\t</TableHeader>\n\t<TableBody>\n\t\t{invoices.map((invoice) => (\n\t\t\t<TableRow key={invoice.invoice}>\n\t\t\t\t<TableCell className=\"font-medium\">{invoice.invoice}</TableCell>\n\t\t\t\t<TableCell>{invoice.paymentStatus}</TableCell>\n\t\t\t\t<TableCell>{invoice.paymentMethod}</TableCell>\n\t\t\t\t<TableCell className=\"text-right\">{invoice.totalAmount}</TableCell>\n\t\t\t</TableRow>\n\t\t))}\n\t</TableBody>\n\t<TableFooter>\n\t\t<TableRow>\n\t\t\t<TableCell colSpan={3}>Total</TableCell>\n\t\t\t<TableCell className=\"text-right\">$750.00</TableCell>\n\t\t</TableRow>\n\t</TableFooter>\n</Table>",
    },
  },
  "ui/tabs": {
    meta: s25.default as RegistryEntry['meta'],
    stories: s25 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<Tabs defaultValue=\"geral\" className=\"w-[400px]\">\n\t<TabsList>\n\t\t<TabsTrigger value=\"geral\">Geral</TabsTrigger>\n\t\t<TabsTrigger value=\"detalhes\">Detalhes</TabsTrigger>\n\t\t<TabsTrigger value=\"historico\" disabled>\n\t\t\tHistórico\n\t\t</TabsTrigger>\n\t</TabsList>\n\t<TabsContent value=\"geral\">\n\t\t<Card>\n\t\t\t<CardHeader>\n\t\t\t\t<CardTitle>Geral</CardTitle>\n\t\t\t\t<CardDescription>Informações gerais do registro.</CardDescription>\n\t\t\t</CardHeader>\n\t\t\t<CardContent className=\"text-sm text-muted-foreground\">\n\t\t\t\tConteúdo da aba Geral.\n\t\t\t</CardContent>\n\t\t</Card>\n\t</TabsContent>\n\t<TabsContent value=\"detalhes\">\n\t\t<Card>\n\t\t\t<CardHeader>\n\t\t\t\t<CardTitle>Detalhes</CardTitle>\n\t\t\t</CardHeader>\n\t\t\t<CardContent className=\"text-sm text-muted-foreground\">\n\t\t\t\tConteúdo da aba Detalhes.\n\t\t\t</CardContent>\n\t\t</Card>\n\t</TabsContent>\n</Tabs>",
      "Line": "<Tabs defaultValue=\"geral\" className=\"w-[400px]\">\n\t<TabsList variant=\"line\">\n\t\t<TabsTrigger value=\"geral\">Geral</TabsTrigger>\n\t\t<TabsTrigger value=\"detalhes\">Detalhes</TabsTrigger>\n\t\t<TabsTrigger value=\"historico\" disabled>\n\t\t\tHistórico\n\t\t</TabsTrigger>\n\t</TabsList>\n\t<TabsContent value=\"geral\">\n\t\t<Card className=\"mt-4 border-none shadow-none\">\n\t\t\t<CardHeader className=\"p-0 pb-2\">\n\t\t\t\t<CardTitle>Geral</CardTitle>\n\t\t\t\t<CardDescription>Variante linha (line).</CardDescription>\n\t\t\t</CardHeader>\n\t\t\t<CardContent className=\"p-0 text-sm text-muted-foreground\">\n\t\t\t\tEstilo com borda inferior destacando a aba ativa.\n\t\t\t</CardContent>\n\t\t</Card>\n\t</TabsContent>\n\t<TabsContent value=\"detalhes\">\n\t\t<Card className=\"mt-4 border-none shadow-none\">\n\t\t\t<CardHeader className=\"p-0 pb-2\">\n\t\t\t\t<CardTitle>Detalhes</CardTitle>\n\t\t\t</CardHeader>\n\t\t\t<CardContent className=\"p-0 text-sm text-muted-foreground\">\n\t\t\t\tConteúdo da aba Detalhes.\n\t\t\t</CardContent>\n\t\t</Card>\n\t</TabsContent>\n</Tabs>",
      "Vertical": "<Tabs defaultValue=\"conta\" orientation=\"vertical\" className=\"flex w-[600px] gap-6\">\n\t<TabsList className=\"w-[200px]\">\n\t\t<TabsTrigger value=\"conta\">\n\t\t\t<User className=\"size-4 mr-2\" />\n\t\t\tConta\n\t\t</TabsTrigger>\n\t\t<TabsTrigger value=\"senha\">\n\t\t\t<Key className=\"size-4 mr-2\" />\n\t\t\tSenha\n\t\t</TabsTrigger>\n\t\t<TabsTrigger value=\"notificacoes\">\n\t\t\t<Bell className=\"size-4 mr-2\" />\n\t\t\tNotificações\n\t\t</TabsTrigger>\n\t</TabsList>\n\t<div className=\"flex-1\">\n\t\t<TabsContent value=\"conta\" className=\"mt-0\">\n\t\t\t<Card>\n\t\t\t\t<CardHeader>\n\t\t\t\t\t<CardTitle>Conta</CardTitle>\n\t\t\t\t\t<CardDescription>Faça alterações na sua conta aqui.</CardDescription>\n\t\t\t\t</CardHeader>\n\t\t\t\t<CardContent className=\"text-sm text-muted-foreground\">\n\t\t\t\t\tConfigurações de perfil.\n\t\t\t\t</CardContent>\n\t\t\t</Card>\n\t\t</TabsContent>\n\t\t<TabsContent value=\"senha\" className=\"mt-0\">\n\t\t\t<Card>\n\t\t\t\t<CardHeader>\n\t\t\t\t\t<CardTitle>Senha</CardTitle>\n\t\t\t\t\t<CardDescription>Altere sua senha aqui.</CardDescription>\n\t\t\t\t</CardHeader>\n\t\t\t\t<CardContent className=\"text-sm text-muted-foreground\">\n\t\t\t\t\tCampos para nova senha.\n\t\t\t\t</CardContent>\n\t\t\t</Card>\n\t\t</TabsContent>\n\t\t<TabsContent value=\"notificacoes\" className=\"mt-0\">\n\t\t\t<Card>\n\t\t\t\t<CardHeader>\n\t\t\t\t\t<CardTitle>Notificações</CardTitle>\n\t\t\t\t\t<CardDescription>Configure como receber avisos.</CardDescription>\n\t\t\t\t</CardHeader>\n\t\t\t\t<CardContent className=\"text-sm text-muted-foreground\">\n\t\t\t\t\tOpções de email e push.\n\t\t\t\t</CardContent>\n\t\t\t</Card>\n\t\t</TabsContent>\n\t</div>\n</Tabs>",
      "VerticalLine": "<Tabs defaultValue=\"conta\" orientation=\"vertical\" className=\"flex w-[600px] gap-6\">\n\t<TabsList variant=\"line\" className=\"w-[200px]\">\n\t\t<TabsTrigger value=\"conta\">\n\t\t\t<User className=\"size-4 mr-2\" />\n\t\t\tConta\n\t\t</TabsTrigger>\n\t\t<TabsTrigger value=\"senha\">\n\t\t\t<Key className=\"size-4 mr-2\" />\n\t\t\tSenha\n\t\t</TabsTrigger>\n\t\t<TabsTrigger value=\"notificacoes\">\n\t\t\t<Bell className=\"size-4 mr-2\" />\n\t\t\tNotificações\n\t\t</TabsTrigger>\n\t</TabsList>\n\t<div className=\"flex-1\">\n\t\t<TabsContent value=\"conta\" className=\"mt-0\">\n\t\t\t<Card className=\"border-none shadow-none\">\n\t\t\t\t<CardHeader className=\"p-0 pb-2\">\n\t\t\t\t\t<CardTitle>Conta</CardTitle>\n\t\t\t\t\t<CardDescription>Faça alterações na sua conta aqui.</CardDescription>\n\t\t\t\t</CardHeader>\n\t\t\t\t<CardContent className=\"p-0 text-sm text-muted-foreground\">\n\t\t\t\t\tConfigurações de perfil.\n\t\t\t\t</CardContent>\n\t\t\t</Card>\n\t\t</TabsContent>\n\t\t<TabsContent value=\"senha\" className=\"mt-0\">\n\t\t\t<Card className=\"border-none shadow-none\">\n\t\t\t\t<CardHeader className=\"p-0 pb-2\">\n\t\t\t\t\t<CardTitle>Senha</CardTitle>\n\t\t\t\t\t<CardDescription>Altere sua senha aqui.</CardDescription>\n\t\t\t\t</CardHeader>\n\t\t\t\t<CardContent className=\"p-0 text-sm text-muted-foreground\">\n\t\t\t\t\tCampos para nova senha.\n\t\t\t\t</CardContent>\n\t\t\t</Card>\n\t\t</TabsContent>\n\t\t<TabsContent value=\"notificacoes\" className=\"mt-0\">\n\t\t\t<Card className=\"border-none shadow-none\">\n\t\t\t\t<CardHeader className=\"p-0 pb-2\">\n\t\t\t\t\t<CardTitle>Notificações</CardTitle>\n\t\t\t\t\t<CardDescription>Configure como receber avisos.</CardDescription>\n\t\t\t\t</CardHeader>\n\t\t\t\t<CardContent className=\"p-0 text-sm text-muted-foreground\">\n\t\t\t\t\tOpções de email e push.\n\t\t\t\t</CardContent>\n\t\t\t</Card>\n\t\t</TabsContent>\n\t</div>\n</Tabs>",
    },
  },
  "ui/textarea": {
    meta: s26.default as RegistryEntry['meta'],
    stories: s26 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<Textarea placeholder=\"Type your message here.\" />",
      "WithLabel": "<div className=\"grid w-full gap-1.5\">\n\t<Label htmlFor=\"message\">Your message</Label>\n\t<Textarea placeholder=\"Type your message here.\" id=\"message\" />\n</div>",
      "Disabled": "<Textarea disabled placeholder=\"Type your message here.\" />",
    },
  },
  "ui/tooltip": {
    meta: s27.default as RegistryEntry['meta'],
    stories: s27 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<TooltipProvider>\n\t<Tooltip>\n\t\t<TooltipTrigger render={<Button variant=\"outline\">Hover me</Button>} />\n\t\t<TooltipContent>\n\t\t\t<p>Add to library</p>\n\t\t</TooltipContent>\n\t</Tooltip>\n</TooltipProvider>",
    },
  },
  "blocks/app-shell": {
    meta: s28.default as RegistryEntry['meta'],
    stories: s28 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<AppShell brand={<Marca />} navigation={NAV} activeItemId=\"registros\">\n\t<Miolo />\n</AppShell>",
      "WithBreadcrumbs": "<AppShell brand={<Marca />} navigation={NAV} activeItemId=\"registros\" breadcrumbs={TRILHA}>\n\t<Miolo />\n</AppShell>",
      "Collapsed": "<AppShell\n\tbrand={<Marca />}\n\tnavigation={NAV}\n\tactiveItemId=\"registros\"\n\tdefaultCollapsed\n\tbreadcrumbs={TRILHA}\n>\n\t<Miolo />\n</AppShell>",
      "WithFilteredNavigation": "<AppShell\n\tbrand={<Marca />}\n\tnavigation={NAV}\n\tactiveItemId=\"registros\"\n\tbreadcrumbs={TRILHA}\n\tcanAccessItem={(item) => item.meta?.requiredPermission !== \"admin.only\"}\n>\n\t<Miolo />\n</AppShell>",
      "ControlledCollapsed": "{\n\tconst [collapsed, setCollapsed] = React.useState(false);\n\treturn (\n\t\t<AppShell\n\t\t\tbrand={<Marca />}\n\t\t\tnavigation={NAV}\n\t\t\tactiveItemId=\"registros\"\n\t\t\tcollapsed={collapsed}\n\t\t\tonCollapsedChange={setCollapsed}\n\t\t\tbreadcrumbs={TRILHA}\n\t\t>\n\t\t\t<div className=\"m-6 space-y-3\">\n\t\t\t\t<Button variant=\"outline\" onClick={() => setCollapsed((c) => !c)}>\n\t\t\t\t\tAlternar colapso de fora do shell\n\t\t\t\t</Button>\n\t\t\t\t<Miolo />\n\t\t\t</div>\n\t\t</AppShell>\n\t);\n}",
      "MobileNavigation": "<AppShell brand={<Marca />} navigation={NAV} activeItemId=\"registros\" breadcrumbs={TRILHA}>\n\t<Miolo />\n</AppShell>",
      "AppShellWithListPage": "{\n\tconst [busca, setBusca] = React.useState(\"\");\n\tconst [page, setPage] = React.useState(1);\n\tconst dados = REGISTROS.filter((r) => r.nome.toLowerCase().includes(busca.toLowerCase()));\n\treturn (\n\t\t<AppShell\n\t\t\tbrand={<Marca />}\n\t\t\tnavigation={NAV}\n\t\t\tactiveItemId=\"registros\"\n\t\t\tbreadcrumbs={TRILHA}\n\t\t\tsidebarFooter={<Rodape />}\n\t\t>\n\t\t\t<ListPageLayout\n\t\t\t\theader={\n\t\t\t\t\t<PageHeader\n\t\t\t\t\t\ttitle=\"Registros\"\n\t\t\t\t\t\tdescription=\"Gerencie os registros e acompanhe seus status.\"\n\t\t\t\t\t\tactions={\n\t\t\t\t\t\t\t<Button onClick={fn()}>\n\t\t\t\t\t\t\t\t<Plus /> Novo registro\n\t\t\t\t\t\t\t</Button>\n\t\t\t\t\t\t}\n\t\t\t\t\t/>\n\t\t\t\t}\n\t\t\t\tstats={\n\t\t\t\t\t<StatusCards\n\t\t\t\t\t\tcolumns={3}\n\t\t\t\t\t\titems={[\n\t\t\t\t\t\t\t{ label: \"Total\", value: REGISTROS.length, icon: FileText },\n\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\tlabel: \"Ativos\",\n\t\t\t\t\t\t\t\tvalue: REGISTROS.filter((r) => r.status === \"ativo\").length,\n\t\t\t\t\t\t\t\ticon: CheckCircle,\n\t\t\t\t\t\t\t\ttone: \"success\",\n\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\tlabel: \"Pendentes\",\n\t\t\t\t\t\t\t\tvalue: REGISTROS.filter((r) => r.status === \"pendente\").length,\n\t\t\t\t\t\t\t\ticon: Clock,\n\t\t\t\t\t\t\t\ttone: \"warning\",\n\t\t\t\t\t\t\t},\n\t\t\t\t\t\t]}\n\t\t\t\t\t/>\n\t\t\t\t}\n\t\t\t\ttoolbar={<SearchBar className=\"w-72\" value={busca} onChange={setBusca} />}\n\t\t\t\tcontent={\n\t\t\t\t\t<DataTable\n\t\t\t\t\t\tdata={dados.slice((page - 1) * 5, page * 5)}\n\t\t\t\t\t\tcolumns={COLS}\n\t\t\t\t\t\tkeyExtractor={(r) => r.id}\n\t\t\t\t\t\tonRowClick={fn()}\n\t\t\t\t\t\tpagination={{ page, limit: 5, total: dados.length, onPageChange: setPage }}\n\t\t\t\t\t/>\n\t\t\t\t}\n\t\t\t/>\n\t\t</AppShell>\n\t);\n}",
      "AppShellWithFormPage": "<AppShell\n\tbrand={<Marca />}\n\tnavigation={NAV}\n\tactiveItemId=\"registros\"\n\tbreadcrumbs={[\n\t\t...TRILHA.slice(0, 1),\n\t\t{ label: \"Registros\", href: \"#\" },\n\t\t{ label: \"Novo\", current: true },\n\t]}\n>\n\t<FormPageLayout\n\t\theader={<PageHeader title=\"Novo registro\" />}\n\t\tform={\n\t\t\t<form className=\"space-y-8\" onSubmit={(e) => e.preventDefault()}>\n\t\t\t\t<FormSection title=\"Dados gerais\">\n\t\t\t\t\t<FieldGroup columns={2}>\n\t\t\t\t\t\t<FormField label=\"Nome\" htmlFor=\"as-nome\" required>\n\t\t\t\t\t\t\t<Input id=\"as-nome\" />\n\t\t\t\t\t\t</FormField>\n\t\t\t\t\t\t<FormField label=\"Código\" htmlFor=\"as-cod\">\n\t\t\t\t\t\t\t<Input id=\"as-cod\" />\n\t\t\t\t\t\t</FormField>\n\t\t\t\t\t</FieldGroup>\n\t\t\t\t</FormSection>\n\t\t\t\t<FormActions\n\t\t\t\t\tprimary={<Button onClick={fn()}>Salvar</Button>}\n\t\t\t\t\tsecondary={\n\t\t\t\t\t\t<Button variant=\"outline\" onClick={fn()}>\n\t\t\t\t\t\t\tCancelar\n\t\t\t\t\t\t</Button>\n\t\t\t\t\t}\n\t\t\t\t/>\n\t\t\t</form>\n\t\t}\n\t/>\n</AppShell>",
      "AppShellWithDetailPage": "<AppShell\n\tbrand={<Marca />}\n\tnavigation={NAV}\n\tactiveItemId=\"registros\"\n\tbreadcrumbs={[\n\t\t...TRILHA.slice(0, 1),\n\t\t{ label: \"Registros\", href: \"#\" },\n\t\t{ label: \"REG-003\", current: true },\n\t]}\n>\n\t<DetailPageLayout\n\t\theader={<PageHeader eyebrow=\"Registros\" title=\"Registro REG-003\" />}\n\t\tsummary={\n\t\t\t<ContentCard title=\"Resumo\">\n\t\t\t\t<div className=\"flex flex-wrap items-center gap-4 text-sm\">\n\t\t\t\t\t<CodeBadge>REG-003</CodeBadge>\n\t\t\t\t\t<StatusDot tone=\"success\" label=\"Ativo\" />\n\t\t\t\t\t<Badge variant=\"secondary\">Categoria A</Badge>\n\t\t\t\t</div>\n\t\t\t</ContentCard>\n\t\t}\n\t\tcontent={\n\t\t\t<DataTable data={REGISTROS.slice(0, 4)} columns={COLS} keyExtractor={(r) => r.id} />\n\t\t}\n\t/>\n</AppShell>",
      "AppShellWithDashboardPage": "<AppShell\n\tbrand={<Marca />}\n\tnavigation={NAV}\n\tactiveItemId=\"inicio\"\n\tbreadcrumbs={[{ label: \"Início\", current: true }]}\n>\n\t<DashboardPageLayout\n\t\theader={<PageHeader title=\"Painel operacional\" />}\n\t\tstats={\n\t\t\t<StatusCards\n\t\t\t\titems={[\n\t\t\t\t\t{ label: \"Total\", value: 128, icon: FileText },\n\t\t\t\t\t{ label: \"Pendentes\", value: 12, icon: Clock, tone: \"warning\" },\n\t\t\t\t\t{ label: \"Concluídos\", value: 98, icon: CheckCircle, tone: \"success\" },\n\t\t\t\t]}\n\t\t\t\tcolumns={3}\n\t\t\t/>\n\t\t}\n\t\tcontent={\n\t\t\t<div className=\"grid gap-6 lg:grid-cols-2\">\n\t\t\t\t<ContentCard title=\"Últimos registros\">\n\t\t\t\t\t<DataTable\n\t\t\t\t\t\tdata={REGISTROS.slice(0, 5)}\n\t\t\t\t\t\tcolumns={COLS.slice(0, 2)}\n\t\t\t\t\t\tkeyExtractor={(r) => r.id}\n\t\t\t\t\t/>\n\t\t\t\t</ContentCard>\n\t\t\t\t<ContentCard title=\"Distribuição\">\n\t\t\t\t\t<div className=\"flex h-64 items-center justify-center rounded bg-muted/40 text-sm text-muted-foreground\">\n\t\t\t\t\t\tárea reservada para gráfico\n\t\t\t\t\t</div>\n\t\t\t\t</ContentCard>\n\t\t\t</div>\n\t\t}\n\t/>\n</AppShell>",
    },
  },
  "blocks/breadcrumbs": {
    meta: s29.default as RegistryEntry['meta'],
    stories: s29 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<Breadcrumbs items={[{ label: \"Início\", href: \"#\" }, { label: \"Registros\" }]} />",
      "WithLinks": "<Breadcrumbs items={[\n\t\t\t{ label: \"Início\", href: \"#\" },\n\t\t\t{ label: \"Registros\", href: \"#\" },\n\t\t\t{ label: \"Detalhes\", current: true },\n\t\t]} />",
      "LongTrail": "<Breadcrumbs items={[\n\t\t\t{ label: \"Início\", href: \"#\" },\n\t\t\t{ label: \"Operações\", href: \"#\" },\n\t\t\t{ label: \"Registros\", href: \"#\" },\n\t\t\t{ label: \"Categoria com nome bem comprido\", href: \"#\" },\n\t\t\t{ label: \"Registro REG-042\", current: true },\n\t\t]} className=\"max-w-md\" />",
      "CurrentOnly": "<Breadcrumbs items={[{ label: \"Configurações\", current: true }]} />",
      "CustomSeparator": "<Breadcrumbs items={[{ label: \"Início\", href: \"#\" }, { label: \"Registros\" }]} separator={<span className} opacity-50={>/</span>} />",
    },
  },
  "blocks/code-badge": {
    meta: s30.default as RegistryEntry['meta'],
    stories: s30 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<CodeBadge>CNT-001</CodeBadge>",
      "EmTexto": "<p className=\"text-sm text-foreground\">\n\tA chave <CodeBadge>VISUALIZAR_REGISTRO</CodeBadge> controla o acesso à listagem.\n</p>",
    },
  },
  "blocks/confirm-dialog": {
    meta: s31.default as RegistryEntry['meta'],
    stories: s31 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<DemoDefault />",
      "Danger": "<DemoDanger />",
      "ComFalha": "<DemoErro />",
    },
  },
  "blocks/content-card": {
    meta: s32.default as RegistryEntry['meta'],
    stories: s32 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<ContentCard className=\"w-96\">\n\t<p className=\"text-sm text-muted-foreground\">Conteúdo simples sem cabeçalho.</p>\n</ContentCard>",
      "WithHeader": "<ContentCard className=\"w-96\" title=\"Resumo\" description=\"Informações principais\">\n\t<p className=\"text-sm text-muted-foreground\">Conteúdo do card.</p>\n</ContentCard>",
      "WithActions": "<ContentCard\n\tclassName=\"w-96\"\n\ttitle=\"Resumo\"\n\tactions={\n\t\t<Button variant=\"outline\" size=\"sm\">\n\t\t\tEditar\n\t\t</Button>\n\t}\n>\n\t<p className=\"text-sm text-muted-foreground\">Conteúdo do card.</p>\n</ContentCard>",
      "NestedSections": "<ContentCard className=\"w-[32rem]\" title=\"Configurações\">\n\t<div className=\"space-y-6\">\n\t\t<FormSection title=\"Geral\">\n\t\t\t<p className=\"text-sm text-muted-foreground\">Campos gerais⬦</p>\n\t\t</FormSection>\n\t\t<FormSection title=\"Avançado\">\n\t\t\t<p className=\"text-sm text-muted-foreground\">Campos avançados⬦</p>\n\t\t</FormSection>\n\t</div>\n</ContentCard>",
    },
  },
  "blocks/crud-modal-header": {
    meta: s33.default as RegistryEntry['meta'],
    stories: s33 as unknown as Record<string, StoryObj>,
    code: {
      "Criar": "<CrudModalHeader icon={Plus} title=\"Novo módulo\" description=\"Preencha os dados para cadastrar um módulo.\" />",
      "EditarComBadges": "<CrudModalHeader />",
    },
  },
  "blocks/dashboard-page-layout": {
    meta: s34.default as RegistryEntry['meta'],
    stories: s34 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<DashboardPageLayout\n\theader={<PageHeader title=\"Painel\" />}\n\tcontent={<Bloco titulo=\"Visão geral\" />}\n/>",
      "WithStats": "<DashboardPageLayout\n\theader={<PageHeader title=\"Painel\" />}\n\tstats={<Stats />}\n\tcontent={<Bloco titulo=\"Visão geral\" />}\n/>",
      "WithAside": "<DashboardPageLayout\n\theader={<PageHeader title=\"Painel\" />}\n\tstats={<Stats />}\n\tcontent={<Bloco titulo=\"Visão geral\" />}\n\taside={<Bloco titulo=\"Alertas\" />}\n/>",
      "WithCardsGrid": "<DashboardPageLayout\n\theader={<PageHeader title=\"Painel\" />}\n\tstats={<Stats />}\n\tcontent={\n\t\t<div className=\"grid gap-6 lg:grid-cols-2\">\n\t\t\t<Bloco titulo=\"Bloco A\" />\n\t\t\t<Bloco titulo=\"Bloco B\" />\n\t\t\t<Bloco titulo=\"Bloco C\" />\n\t\t\t<Bloco titulo=\"Bloco D\" />\n\t\t</div>\n\t}\n/>",
    },
  },
  "blocks/data-table": {
    meta: s35.default as RegistryEntry['meta'],
    stories: s35 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<DataTable data={PROCESSOS.slice(0, 6)} columns={columns} keyExtractor={(r) => r.id} />",
      "Loading": "<DataTable\n\tdata={[]}\n\tcolumns={columns}\n\tkeyExtractor={(r: Processo) => r.id}\n\tisLoading\n\tloadingRows={5}\n/>",
      "Empty": "<DataTable\n\tdata={[]}\n\tcolumns={columns}\n\tkeyExtractor={(r: Processo) => r.id}\n\temptyTitle=\"Nenhum processo encontrado\"\n\temptyDescription=\"Ajuste os filtros ou crie um novo processo.\"\n\temptyAction={\n\t\t<Button size=\"sm\">\n\t\t\t<Plus /> Novo processo\n\t\t</Button>\n\t}\n/>",
      "ErrorStory": "<DataTable\n\tdata={[]}\n\tcolumns={columns}\n\tkeyExtractor={(r: Processo) => r.id}\n\tisError\n\terrorTitle=\"Não foi possível carregar os processos\"\n\terrorDescription=\"Tente novamente em alguns instantes.\"\n\terrorAction={\n\t\t<Button variant=\"outline\" size=\"sm\">\n\t\t\tTentar novamente\n\t\t</Button>\n\t}\n/>",
      "WithPagination": "{\n\tconst [page, setPage] = React.useState(1);\n\tconst [limit, setLimit] = React.useState(5);\n\tconst start = (page - 1) * limit;\n\treturn (\n\t\t<DataTable\n\t\t\tdata={PROCESSOS.slice(start, start + limit)}\n\t\t\tcolumns={columns}\n\t\t\tkeyExtractor={(r) => r.id}\n\t\t\tpagination={{\n\t\t\t\tpage,\n\t\t\t\tlimit,\n\t\t\t\ttotal: PROCESSOS.length,\n\t\t\t\tlimitOptions: [5, 10, 20],\n\t\t\t\tonPageChange: setPage,\n\t\t\t\tonLimitChange: setLimit,\n\t\t\t}}\n\t\t/>\n\t);\n}",
      "WithActions": "<DataTable\n\tdata={PROCESSOS.slice(0, 5)}\n\tcolumns={columns}\n\tkeyExtractor={(r) => r.id}\n\tonRowClick={() => {}}\n\tactions={(row) => (\n\t\t<DropdownMenu>\n\t\t\t<DropdownMenuTrigger\n\t\t\t\trender={\n\t\t\t\t\t<Button variant=\"ghost\" size=\"icon-sm\" aria-label={`Ações de ${row.codigo}`}>\n\t\t\t\t\t\t<MoreHorizontal />\n\t\t\t\t\t</Button>\n\t\t\t\t}\n\t\t\t/>\n\t\t\t<DropdownMenuContent align=\"end\">\n\t\t\t\t<DropdownMenuItem>\n\t\t\t\t\t<Eye /> Visualizar\n\t\t\t\t</DropdownMenuItem>\n\t\t\t\t<DropdownMenuItem>\n\t\t\t\t\t<Pencil /> Editar\n\t\t\t\t</DropdownMenuItem>\n\t\t\t\t<DropdownMenuSeparator />\n\t\t\t\t<DropdownMenuItem>\n\t\t\t\t\t<Trash2 /> Excluir\n\t\t\t\t</DropdownMenuItem>\n\t\t\t</DropdownMenuContent>\n\t\t</DropdownMenu>\n\t)}\n/>",
      "WithRowClick": "{\n\tconst [selecionado, setSelecionado] = React.useState<string>();\n\treturn (\n\t\t<div className=\"space-y-2\">\n\t\t\t<p className=\"text-sm text-muted-foreground\">\n\t\t\t\tSelecionado: {selecionado ?? \"nenhum (clique numa linha)\"}\n\t\t\t</p>\n\t\t\t<DataTable\n\t\t\t\tdata={PROCESSOS.slice(0, 5)}\n\t\t\t\tcolumns={columns}\n\t\t\t\tkeyExtractor={(r) => r.id}\n\t\t\t\tonRowClick={(row) => setSelecionado(row.codigo)}\n\t\t\t\trowClassName={(row) => (row.codigo === selecionado ? \"bg-primary/5\" : undefined)}\n\t\t\t\tgetRowDisabled={(row) => row.status === \"bloqueado\"}\n\t\t\t/>\n\t\t</div>\n\t);\n}",
      "WithToolbar": "{\n\tconst [busca, setBusca] = React.useState(\"\");\n\tconst dados = PROCESSOS.filter((p) =>\n\t\t`${p.codigo} ${p.descricao}`.toLowerCase().includes(busca.toLowerCase()),\n\t);\n\treturn (\n\t\t<DataTable\n\t\t\tdata={dados}\n\t\t\tcolumns={columns}\n\t\t\tkeyExtractor={(r) => r.id}\n\t\t\ttoolbar={\n\t\t\t\t<div className=\"flex flex-wrap items-center gap-3\">\n\t\t\t\t\t<SearchBar\n\t\t\t\t\t\tclassName=\"w-72\"\n\t\t\t\t\t\tvalue={busca}\n\t\t\t\t\t\tonChange={setBusca}\n\t\t\t\t\t\tplaceholder=\"Buscar processo...\"\n\t\t\t\t\t/>\n\t\t\t\t\t<FilterPill label=\"Período\" value=\"Jun/2026\" onRemove={() => {}} />\n\t\t\t\t</div>\n\t\t\t}\n\t\t\temptyTitle=\"Nenhum resultado para a busca\"\n\t\t/>\n\t);\n}",
      "WithSorting": "{\n\tconst [sortBy, setSortBy] = React.useState<string>(\"codigo\");\n\tconst [sortOrder, setSortOrder] = React.useState<\"asc\" | \"desc\">(\"asc\");\n\t// sorting é controlado (server-side na prática); aqui simulamos externamente\n\tconst dados = [...PROCESSOS.slice(0, 8)].sort((a, b) => {\n\t\tconst va = String(a[sortBy as keyof Processo] ?? \"\");\n\t\tconst vb = String(b[sortBy as keyof Processo] ?? \"\");\n\t\treturn sortOrder === \"asc\" ? va.localeCompare(vb, \"pt-BR\") : vb.localeCompare(va, \"pt-BR\");\n\t});\n\tconst cols: DataTableColumn<Processo>[] = [\n\t\t{ id: \"codigo\", header: \"Código\", accessorKey: \"codigo\", sortable: true, width: 110 },\n\t\t{ id: \"descricao\", header: \"Descrição\", accessorKey: \"descricao\", sortable: true },\n\t\t{ id: \"responsavel\", header: \"Responsável\", accessorKey: \"responsavel\", sortable: true },\n\t\t{ header: \"Qtd.\", accessorKey: \"quantidade\", align: \"right\" },\n\t];\n\treturn (\n\t\t<DataTable\n\t\t\tdata={dados}\n\t\t\tcolumns={cols}\n\t\t\tkeyExtractor={(r) => r.id}\n\t\t\tsorting={{\n\t\t\t\tsortBy,\n\t\t\t\tsortOrder,\n\t\t\t\tonSortChange: (by, order) => {\n\t\t\t\t\tsetSortBy(by);\n\t\t\t\t\tsetSortOrder(order);\n\t\t\t\t},\n\t\t\t}}\n\t\t/>\n\t);\n}",
      "DenseOperationalExample": "{\n\tconst totalQtd = PROCESSOS.reduce((s, p) => s + p.quantidade, 0);\n\tconst totalValor = PROCESSOS.reduce((s, p) => s + p.valor, 0);\n\treturn (\n\t\t<DataTable\n\t\t\tdata={PROCESSOS}\n\t\t\tcolumns={[\n\t\t\t\t...columns,\n\t\t\t\t{ header: \"Criado em\", accessorKey: \"criadoEm\", align: \"center\", width: 110 },\n\t\t\t]}\n\t\t\tkeyExtractor={(r) => r.id}\n\t\t\tfooter={\n\t\t\t\t<div className=\"flex justify-end gap-8 px-4 py-3 text-sm\">\n\t\t\t\t\t<span className=\"text-muted-foreground\">\n\t\t\t\t\t\tQtd. total: <span className=\"font-semibold text-foreground\">{totalQtd}</span>\n\t\t\t\t\t</span>\n\t\t\t\t\t<span className=\"text-muted-foreground\">\n\t\t\t\t\t\tValor total:{\" \"}\n\t\t\t\t\t\t<span className=\"font-semibold text-foreground\">R$ {fmtBR.format(totalValor)}</span>\n\t\t\t\t\t</span>\n\t\t\t\t</div>\n\t\t\t}\n\t\t/>\n\t);\n}",
      "SupertransInspiredExample": "{\n\tconst [page, setPage] = React.useState(1);\n\treturn (\n\t\t<div className=\"space-y-4\">\n\t\t\t<PageHeader\n\t\t\t\ttitle=\"Cadastro de registros\"\n\t\t\t\tdescription=\"Tabela administrativa com código, status binário e ações.\"\n\t\t\t\tactions={\n\t\t\t\t\t<Button>\n\t\t\t\t\t\t<Plus /> Novo registro\n\t\t\t\t\t</Button>\n\t\t\t\t}\n\t\t\t/>\n\t\t\t<DataTable\n\t\t\t\tdata={PROCESSOS.slice((page - 1) * 5, page * 5)}\n\t\t\t\tcolumns={[\n\t\t\t\t\t{ header: \"Código\", cell: (r) => <CodeBadge>{r.codigo}</CodeBadge>, width: 110 },\n\t\t\t\t\t{ header: \"Nome\", accessorKey: \"descricao\" },\n\t\t\t\t\t{\n\t\t\t\t\t\theader: \"Situação\",\n\t\t\t\t\t\tcell: (r) =>\n\t\t\t\t\t\t\tr.status === \"concluido\" ? (\n\t\t\t\t\t\t\t\t<StatusDot tone=\"success\" label=\"Ativo\" />\n\t\t\t\t\t\t\t) : (\n\t\t\t\t\t\t\t\t<StatusDot tone=\"muted\" label=\"Inativo\" />\n\t\t\t\t\t\t\t),\n\t\t\t\t\t},\n\t\t\t\t\t{ header: \"Em uso\", accessorKey: \"quantidade\", align: \"right\", width: 90 },\n\t\t\t\t]}\n\t\t\t\tkeyExtractor={(r) => r.id}\n\t\t\t\tpagination={{ page, limit: 5, total: PROCESSOS.length, onPageChange: setPage }}\n\t\t\t\tactions={(r) => (\n\t\t\t\t\t<Button variant=\"ghost\" size=\"icon-sm\" aria-label={`Editar ${r.codigo}`}>\n\t\t\t\t\t\t<Pencil />\n\t\t\t\t\t</Button>\n\t\t\t\t)}\n\t\t\t/>\n\t\t</div>\n\t);\n}",
      "AuroraInspiredExample": "{\n\tconst [status, setStatus] = React.useState<string>(\"Todos\");\n\tconst dados =\n\t\tstatus === \"Todos\"\n\t\t\t? PROCESSOS\n\t\t\t: PROCESSOS.filter((p) => STATUS_LABEL[p.status].label === status);\n\tconst contagem = (s: Processo[\"status\"]) => PROCESSOS.filter((p) => p.status === s).length;\n\treturn (\n\t\t<div className=\"space-y-4\">\n\t\t\t<StatusCards\n\t\t\t\tcolumns={4}\n\t\t\t\titems={[\n\t\t\t\t\t{\n\t\t\t\t\t\tlabel: \"Todos\",\n\t\t\t\t\t\tvalue: PROCESSOS.length,\n\t\t\t\t\t\tonClick: () => setStatus(\"Todos\"),\n\t\t\t\t\t\tactive: status === \"Todos\",\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\tlabel: \"Pendente\",\n\t\t\t\t\t\tvalue: contagem(\"pendente\"),\n\t\t\t\t\t\ttone: \"warning\",\n\t\t\t\t\t\tonClick: () => setStatus(\"Pendente\"),\n\t\t\t\t\t\tactive: status === \"Pendente\",\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\tlabel: \"Em andamento\",\n\t\t\t\t\t\tvalue: contagem(\"em_andamento\"),\n\t\t\t\t\t\ttone: \"info\",\n\t\t\t\t\t\tonClick: () => setStatus(\"Em andamento\"),\n\t\t\t\t\t\tactive: status === \"Em andamento\",\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\tlabel: \"Concluído\",\n\t\t\t\t\t\tvalue: contagem(\"concluido\"),\n\t\t\t\t\t\ttone: \"success\",\n\t\t\t\t\t\tonClick: () => setStatus(\"Concluído\"),\n\t\t\t\t\t\tactive: status === \"Concluído\",\n\t\t\t\t\t},\n\t\t\t\t]}\n\t\t\t/>\n\t\t\t<DataTable\n\t\t\t\tdata={dados}\n\t\t\t\tcolumns={columns}\n\t\t\t\tkeyExtractor={(r) => r.id}\n\t\t\t\tonRowClick={() => {}}\n\t\t\t\ttoolbar={\n\t\t\t\t\t<div className=\"flex items-center justify-between gap-3\">\n\t\t\t\t\t\t<span className=\"text-sm text-muted-foreground\">{dados.length} processo(s)</span>\n\t\t\t\t\t\t<Button variant=\"outline\" size=\"sm\">\n\t\t\t\t\t\t\t<Download /> Exportar\n\t\t\t\t\t\t</Button>\n\t\t\t\t\t</div>\n\t\t\t\t}\n\t\t\t/>\n\t\t</div>\n\t);\n}",
    },
  },
  "blocks/detail-page-layout": {
    meta: s36.default as RegistryEntry['meta'],
    stories: s36 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<DetailPageLayout\n\theader={<Cabecalho />}\n\tcontent={\n\t\t<ContentCard>\n\t\t\t<p className=\"text-sm text-muted-foreground\">Conteúdo do detalhe.</p>\n\t\t</ContentCard>\n\t}\n/>",
      "WithSummary": "<DetailPageLayout header={<Cabecalho />} summary={<Resumo />} content={<Abas />} />",
      "WithTabs": "<DetailPageLayout header={<Cabecalho />} tabs={<Abas />} />",
      "WithAside": "<DetailPageLayout\n\theader={<Cabecalho />}\n\tsummary={<Resumo />}\n\ttabs={<Abas />}\n\taside={\n\t\t<ContentCard title=\"Ações rápidas\">\n\t\t\t<div className=\"grid gap-2\">\n\t\t\t\t<Button variant=\"outline\" size=\"sm\">\n\t\t\t\t\tDuplicar\n\t\t\t\t</Button>\n\t\t\t\t<Button variant=\"destructive\" size=\"sm\">\n\t\t\t\t\tExcluir\n\t\t\t\t</Button>\n\t\t\t</div>\n\t\t</ContentCard>\n\t}\n/>",
    },
  },
  "blocks/empty-state": {
    meta: s37.default as RegistryEntry['meta'],
    stories: s37 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<EmptyState title=\"Nenhum registro encontrado\" description=\"Tente ajustar os filtros ou criar um novo registro.\" />",
      "ComAcao": "<EmptyState />",
      "BuscaSemResultado": "<EmptyState />",
      "Minimo": "<EmptyState title=\"Nada por aqui\" />",
    },
  },
  "blocks/error-state": {
    meta: s38.default as RegistryEntry['meta'],
    stories: s38 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<ErrorState />",
      "ComRetry": "<ErrorState action={(\n\t\t\t<Button variant=\"outline\"} />",
      "TextoCustomizado": "<ErrorState title=\"Falha ao processar a solicitação\" description=\"O servidor demorou para responder.\" />",
    },
  },
  "blocks/field-group": {
    meta: s39.default as RegistryEntry['meta'],
    stories: s39 as unknown as Record<string, StoryObj>,
    code: {
      "OneColumn": "<FieldGroup columns={1} className=\"w-80\">\n\t{[1, 2].map(campo)}\n</FieldGroup>",
      "TwoColumns": "<FieldGroup columns={2} className=\"w-[36rem]\">\n\t{[1, 2, 3, 4].map(campo)}\n</FieldGroup>",
      "ThreeColumns": "<FieldGroup columns={3} className=\"w-[48rem]\">\n\t{[1, 2, 3].map(campo)}\n</FieldGroup>",
      "FourColumns": "<FieldGroup columns={4} className=\"w-[56rem]\">\n\t{[1, 2, 3, 4].map(campo)}\n</FieldGroup>",
      "WithMixedFields": "<FieldGroup columns={2} className=\"w-[36rem]\">\n\t{campo(1)}\n\t{campo(2)}\n\t<FormField label=\"Observações\" htmlFor=\"fg-obs\" className=\"sm:col-span-2\">\n\t\t<Textarea id=\"fg-obs\" rows={3} />\n\t</FormField>\n</FieldGroup>",
    },
  },
  "blocks/filter-pill": {
    meta: s40.default as RegistryEntry['meta'],
    stories: s40 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<FilterPill label=\"Status\" value=\"Ativo\" onRemove={() => {}} />",
      "SemValor": "<FilterPill label=\"Somente pendentes\" onRemove={() => {}} />",
      "SemRemocao": "<FilterPill label=\"Período\" value=\"Últimos 30 dias\" />",
      "Grupo": "<div className=\"flex flex-wrap gap-2\">\n\t<FilterPill label=\"Status\" value=\"Ativo\" onRemove={() => {}} />\n\t<FilterPill label=\"Tipo\" value=\"Importação\" onRemove={() => {}} />\n\t<FilterPill label=\"Período\" value=\"Jul/2026\" onRemove={() => {}} />\n</div>",
    },
  },
  "blocks/filters-card": {
    meta: s41.default as RegistryEntry['meta'],
    stories: s41 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<FiltersCard onClear={() => {}} Buscar...={/>\n\t\t\t\t<Input} Categoria={/>\n\t\t\t</div>}>{(\n\t\t\t<div className=\"grid gap-3 sm:grid-cols-3\">\n\t\t\t\t<Input placeholder}</FiltersCard>",
      "Fechado": "<FiltersCard defaultOpen={false} Buscar...={/>,}>{<Input placeholder}</FiltersCard>",
    },
  },
  "blocks/form-actions": {
    meta: s42.default as RegistryEntry['meta'],
    stories: s42 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<FormActions {...Botoes()} className=\"w-96\" />",
      "LeftAligned": "<FormActions {...Botoes()} align=\"left\" className=\"w-96\" />",
      "Between": "<FormActions\n\t{...Botoes()}\n\talign=\"between\"\n\textra={\n\t\t<Button variant=\"destructive\" onClick={fn()}>\n\t\t\tExcluir\n\t\t</Button>\n\t}\n\tclassName=\"w-[32rem]\"\n/>",
      "Sticky": "<div className=\"h-64 w-96 overflow-y-auto rounded-md border border-border p-4\">\n\t<div className=\"h-96 rounded bg-muted/40 p-3 text-sm text-muted-foreground\">\n\t\tConteúdo longo do formulário (role para ver as ações fixas)\n\t</div>\n\t<FormActions {...Botoes()} sticky />\n</div>",
      "WithExtra": "<FormActions\n\t{...Botoes()}\n\textra={\n\t\t<Button variant=\"ghost\" onClick={fn()}>\n\t\t\tSalvar rascunho\n\t\t</Button>\n\t}\n\tclassName=\"w-[28rem]\"\n/>",
    },
  },
  "blocks/form-field": {
    meta: s43.default as RegistryEntry['meta'],
    stories: s43 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<FormField label=\"Nome\" htmlFor=\"ff-nome\" className=\"w-72\">\n\t<Input id=\"ff-nome\" placeholder=\"Nome de exibição\" />\n</FormField>",
      "WithDescription": "<FormField\n\tlabel=\"Código\"\n\thtmlFor=\"ff-cod\"\n\tdescription=\"Identificador único, sem espaços.\"\n\tclassName=\"w-72\"\n>\n\t<Input id=\"ff-cod\" aria-describedby=\"ff-cod-description\" />\n</FormField>",
      "WithError": "<FormField label=\"E-mail\" htmlFor=\"ff-mail\" error=\"Formato de e-mail inválido\" className=\"w-72\">\n\t<Input id=\"ff-mail\" aria-invalid aria-describedby=\"ff-mail-error\" defaultValue=\"abc@\" />\n</FormField>",
      "Required": "<FormField label=\"Nome\" htmlFor=\"ff-req\" required className=\"w-72\">\n\t<Input id=\"ff-req\" required />\n</FormField>",
      "WithTextarea": "<FormField label=\"Observações\" htmlFor=\"ff-obs\" className=\"w-96\">\n\t<Textarea id=\"ff-obs\" rows={3} />\n</FormField>",
      "WithCombobox": "{\n\tconst [v, setV] = React.useState<string | null>(null);\n\treturn (\n\t\t<FormField label=\"Categoria\" htmlFor=\"ff-cat\" className=\"w-72\">\n\t\t\t<Combobox id=\"ff-cat\" options={opcoes} value={v} onValueChange={setV} />\n\t\t</FormField>\n\t);\n}",
      "WithMultiSelect": "{\n\tconst [v, setV] = React.useState<string[]>([]);\n\treturn (\n\t\t<FormField label=\"Marcadores\" htmlFor=\"ff-tags\" className=\"w-80\">\n\t\t\t<MultiSelect\n\t\t\t\tid=\"ff-tags\"\n\t\t\t\toptions={opcoes}\n\t\t\t\tvalue={v}\n\t\t\t\tonValueChange={setV}\n\t\t\t\tclassName=\"w-full\"\n\t\t\t/>\n\t\t</FormField>\n\t);\n}",
      "WithCheckbox": "<FormField htmlFor=\"ff-ativo\" description=\"Registros inativos não aparecem nas listagens.\">\n\t<div className=\"flex items-center gap-2\">\n\t\t<Checkbox id=\"ff-ativo\" defaultChecked onCheckedChange={fn()} />\n\t\t<label htmlFor=\"ff-ativo\" className=\"text-sm\">\n\t\t\tRegistro ativo\n\t\t</label>\n\t</div>\n</FormField>",
    },
  },
  "blocks/form-message": {
    meta: s44.default as RegistryEntry['meta'],
    stories: s44 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<FormMessage>Texto de apoio do campo.</FormMessage>",
      "ErrorStory": "<FormMessage tone=\"error\">Campo obrigatório</FormMessage>",
      "Warning": "<FormMessage tone=\"warning\">Valor fora do intervalo recomendado</FormMessage>",
      "Success": "<FormMessage tone=\"success\">Disponível</FormMessage>",
    },
  },
  "blocks/form-page-layout": {
    meta: s45.default as RegistryEntry['meta'],
    stories: s45 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<FormPageLayout header={<PageHeader title=\"Novo registro\" />} form={<Formulario />} />",
      "WithAside": "<FormPageLayout\n\theader={<PageHeader title=\"Editar registro\" />}\n\tform={<Formulario />}\n\taside={\n\t\t<ContentCard title=\"Dicas\">\n\t\t\t<p className=\"text-sm text-muted-foreground\">O código não pode ser alterado depois.</p>\n\t\t</ContentCard>\n\t}\n/>",
      "MultipleSections": "<FormPageLayout\n\theader={<PageHeader title=\"Novo registro\" />}\n\tform={\n\t\t<form className=\"space-y-8\" onSubmit={(e) => e.preventDefault()}>\n\t\t\t<FormSection title=\"Dados gerais\">\n\t\t\t\t<FieldGroup>\n\t\t\t\t\t<FormField label=\"Nome\" htmlFor=\"fpm-1\">\n\t\t\t\t\t\t<Input id=\"fpm-1\" />\n\t\t\t\t\t</FormField>\n\t\t\t\t\t<FormField label=\"Código\" htmlFor=\"fpm-2\">\n\t\t\t\t\t\t<Input id=\"fpm-2\" />\n\t\t\t\t\t</FormField>\n\t\t\t\t</FieldGroup>\n\t\t\t</FormSection>\n\t\t\t<FormSection title=\"Contato\" description=\"Informações opcionais.\">\n\t\t\t\t<FieldGroup>\n\t\t\t\t\t<FormField label=\"E-mail\" htmlFor=\"fpm-3\">\n\t\t\t\t\t\t<Input id=\"fpm-3\" />\n\t\t\t\t\t</FormField>\n\t\t\t\t\t<FormField label=\"Telefone\" htmlFor=\"fpm-4\">\n\t\t\t\t\t\t<Input id=\"fpm-4\" />\n\t\t\t\t\t</FormField>\n\t\t\t\t</FieldGroup>\n\t\t\t</FormSection>\n\t\t\t<FormActions primary={<Button onClick={fn()}>Salvar</Button>} />\n\t\t</form>\n\t}\n/>",
      "WithStickyActions": "<FormPageLayout header={<PageHeader title=\"Novo registro\" />} form={<Formulario sticky />} />",
    },
  },
  "blocks/form-section": {
    meta: s46.default as RegistryEntry['meta'],
    stories: s46 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<FormSection title=\"Dados gerais\" className=\"w-96\">\n\t<Campos />\n</FormSection>",
      "WithDescription": "<FormSection\n\ttitle=\"Dados gerais\"\n\tdescription=\"Informações principais do registro.\"\n\tclassName=\"w-96\"\n>\n\t<Campos />\n</FormSection>",
      "WithActions": "<FormSection\n\ttitle=\"Endereços\"\n\tactions={\n\t\t<Button variant=\"outline\" size=\"sm\">\n\t\t\tAdicionar\n\t\t</Button>\n\t}\n\tclassName=\"w-96\"\n>\n\t<Campos />\n</FormSection>",
      "MultipleSections": "<div className=\"w-96 space-y-8\">\n\t<FormSection title=\"Dados gerais\">\n\t\t<Campos />\n\t</FormSection>\n\t<FormSection title=\"Configurações\" description=\"Ajustes opcionais.\">\n\t\t<Campos />\n\t</FormSection>\n</div>",
    },
  },
  "blocks/launcher-card": {
    meta: s47.default as RegistryEntry['meta'],
    stories: s47 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<LauncherCard icon={Boxes} title=\"Gestão de Demandas\" description=\"Acompanhe e programe as demandas operacionais.\" cta=\"Abrir →\" />",
      "Clicavel": "<LauncherCard icon={Truck} title=\"Acompanhamento de Cargas\" description=\"Monitoramento de cargas em trânsito.\" cta=\"Abrir →\" onClick={() => {}} />",
      "Grade": "<div className=\"grid gap-4 sm:grid-cols-2 lg:grid-cols-3\">\n\t<LauncherCard\n\t\ticon={Boxes}\n\t\ttitle=\"Gestão de Demandas\"\n\t\tdescription=\"Programe demandas.\"\n\t\tcta=\"Abrir →\"\n\t/>\n\t<LauncherCard\n\t\ticon={Truck}\n\t\ttitle=\"Acompanhamento de Cargas\"\n\t\tdescription=\"Cargas em trânsito.\"\n\t\tcta=\"Abrir →\"\n\t/>\n</div>",
    },
  },
  "blocks/list-page-layout": {
    meta: s48.default as RegistryEntry['meta'],
    stories: s48 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<ListPageLayout header={<Cabecalho />} content={<Tabela />} />",
      "WithStats": "<ListPageLayout\n\theader={<Cabecalho />}\n\tstats={\n\t\t<StatusCards\n\t\t\titems={[\n\t\t\t\t{ label: \"Total\", value: 128, icon: FileText },\n\t\t\t\t{ label: \"Pendentes\", value: 12, icon: Clock, tone: \"warning\" },\n\t\t\t]}\n\t\t\tcolumns={2}\n\t\t/>\n\t}\n\tcontent={<Tabela />}\n/>",
      "WithToolbar": "{\n\tconst [busca, setBusca] = React.useState(\"\");\n\treturn (\n\t\t<ListPageLayout\n\t\t\theader={<Cabecalho />}\n\t\t\ttoolbar={<SearchBar className=\"w-72\" value={busca} onChange={setBusca} />}\n\t\t\tcontent={<Tabela data={dados.filter((d) => d.nome.includes(busca))} />}\n\t\t/>\n\t);\n}",
      "WithFilters": "<ListPageLayout\n\theader={<Cabecalho />}\n\tfilters={\n\t\t<>\n\t\t\t<FilterPill label=\"Status\" value=\"Ativo\" onRemove={() => {}} />\n\t\t\t<FilterPill label=\"Período\" value=\"Jul/2026\" onRemove={() => {}} />\n\t\t</>\n\t}\n\tcontent={<Tabela />}\n/>",
      "WithDataTable": "<ListPageLayout header={<Cabecalho />} content={<Tabela />} />",
      "LoadingTable": "<ListPageLayout header={<Cabecalho />} content={<Tabela isLoading />} />",
      "EmptyTable": "<ListPageLayout header={<Cabecalho />} content={<Tabela data={[]} />} />",
    },
  },
  "blocks/loading-overlay": {
    meta: s49.default as RegistryEntry['meta'],
    stories: s49 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<Demo label=\"Salvando...\" />",
      "WithCard": "<Demo label=\"Atualizando resumo...\" />",
      "WithTable": "{\n\tconst [loading, setLoading] = React.useState(true);\n\tconst dados = Array.from({ length: 4 }).map((_, i) => ({\n\t\tid: `r-${i + 1}`,\n\t\tnome: `Registro ${i + 1}`,\n\t\tqtd: (i + 1) * 7,\n\t}));\n\treturn (\n\t\t<div className=\"space-y-3\">\n\t\t\t<Button variant=\"outline\" size=\"sm\" onClick={() => setLoading((l) => !l)}>\n\t\t\t\tloading: {String(loading)}\n\t\t\t</Button>\n\t\t\t<LoadingOverlay loading={loading} label=\"Recarregando...\">\n\t\t\t\t<DataTable\n\t\t\t\t\tdata={dados}\n\t\t\t\t\tcolumns={[\n\t\t\t\t\t\t{ header: \"Nome\", accessorKey: \"nome\" },\n\t\t\t\t\t\t{ header: \"Qtd.\", accessorKey: \"qtd\", align: \"right\" },\n\t\t\t\t\t]}\n\t\t\t\t\tkeyExtractor={(r) => r.id}\n\t\t\t\t/>\n\t\t\t</LoadingOverlay>\n\t\t</div>\n\t);\n}",
      "WithoutLabel": "<LoadingOverlay loading>\n\t<Card className=\"w-80\">\n\t\t<CardContent className=\"py-10 text-center text-sm text-muted-foreground\">\n\t\t\tOverlay sem label (spinner aria-hidden).\n\t\t</CardContent>\n\t</Card>\n</LoadingOverlay>",
    },
  },
  "blocks/page-examples": {
    meta: s50.default as RegistryEntry['meta'],
    stories: s50 as unknown as Record<string, StoryObj>,
    code: {
      "ListPageExample": "{\n\tconst [busca, setBusca] = React.useState(\"\");\n\tconst [page, setPage] = React.useState(1);\n\tconst dados = REGISTROS.filter((r) => r.nome.toLowerCase().includes(busca.toLowerCase()));\n\treturn (\n\t\t<ListPageLayout\n\t\t\theader={\n\t\t\t\t<PageHeader\n\t\t\t\t\ttitle=\"Registros\"\n\t\t\t\t\tdescription=\"Gerencie os registros e acompanhe seus status.\"\n\t\t\t\t\tactions={\n\t\t\t\t\t\t<Button onClick={fn()}>\n\t\t\t\t\t\t\t<Plus /> Novo registro\n\t\t\t\t\t\t</Button>\n\t\t\t\t\t}\n\t\t\t\t/>\n\t\t\t}\n\t\t\tstats={\n\t\t\t\t<StatusCards\n\t\t\t\t\tcolumns={3}\n\t\t\t\t\titems={[\n\t\t\t\t\t\t{ label: \"Total\", value: REGISTROS.length, icon: FileText },\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\tlabel: \"Ativos\",\n\t\t\t\t\t\t\tvalue: REGISTROS.filter((r) => r.status === \"ativo\").length,\n\t\t\t\t\t\t\ticon: CheckCircle,\n\t\t\t\t\t\t\ttone: \"success\",\n\t\t\t\t\t\t},\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\tlabel: \"Pendentes\",\n\t\t\t\t\t\t\tvalue: REGISTROS.filter((r) => r.status === \"pendente\").length,\n\t\t\t\t\t\t\ticon: Clock,\n\t\t\t\t\t\t\ttone: \"warning\",\n\t\t\t\t\t\t},\n\t\t\t\t\t]}\n\t\t\t\t/>\n\t\t\t}\n\t\t\ttoolbar={<SearchBar className=\"w-72\" value={busca} onChange={setBusca} />}\n\t\t\tfilters={<FilterPill label=\"Período\" value=\"Jul/2026\" onRemove={fn()} />}\n\t\t\tcontent={\n\t\t\t\t<DataTable\n\t\t\t\t\tdata={dados.slice((page - 1) * 5, page * 5)}\n\t\t\t\t\tcolumns={[\n\t\t\t\t\t\t{ header: \"Código\", cell: (r) => <CodeBadge>{r.codigo}</CodeBadge>, width: 110 },\n\t\t\t\t\t\t{ header: \"Nome\", accessorKey: \"nome\" },\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\theader: \"Status\",\n\t\t\t\t\t\t\tcell: (r) =>\n\t\t\t\t\t\t\t\tr.status === \"ativo\" ? (\n\t\t\t\t\t\t\t\t\t<StatusDot tone=\"success\" label=\"Ativo\" />\n\t\t\t\t\t\t\t\t) : (\n\t\t\t\t\t\t\t\t\t<StatusDot tone=\"warning\" label=\"Pendente\" />\n\t\t\t\t\t\t\t\t),\n\t\t\t\t\t\t},\n\t\t\t\t\t\t{ header: \"Qtd.\", accessorKey: \"qtd\", align: \"right\", width: 80 },\n\t\t\t\t\t]}\n\t\t\t\t\tkeyExtractor={(r) => r.id}\n\t\t\t\t\tonRowClick={fn()}\n\t\t\t\t\tpagination={{ page, limit: 5, total: dados.length, onPageChange: setPage }}\n\t\t\t\t\temptyTitle=\"Nenhum registro para a busca\"\n\t\t\t\t/>\n\t\t\t}\n\t\t/>\n\t);\n}",
      "FormPageExample": "{\n\tconst [nome, setNome] = React.useState(\"\");\n\tconst [categoria, setCategoria] = React.useState<string | null>(null);\n\tconst [tags, setTags] = React.useState<string[]>([]);\n\tconst [erros, setErros] = React.useState<{ nome?: string }>({});\n\tconst salvar = fn();\n\treturn (\n\t\t<FormPageLayout\n\t\t\theader={<PageHeader title=\"Novo registro\" description=\"Preencha os dados abaixo.\" />}\n\t\t\tform={\n\t\t\t\t<form\n\t\t\t\t\tclassName=\"space-y-8\"\n\t\t\t\t\tonSubmit={(e) => {\n\t\t\t\t\t\te.preventDefault();\n\t\t\t\t\t\tif (!nome.trim()) {\n\t\t\t\t\t\t\tsetErros({ nome: \"O nome é obrigatório\" });\n\t\t\t\t\t\t\treturn;\n\t\t\t\t\t\t}\n\t\t\t\t\t\tsetErros({});\n\t\t\t\t\t\tsalvar({ nome, categoria, tags });\n\t\t\t\t\t}}\n\t\t\t\t>\n\t\t\t\t\t<FormSection title=\"Dados gerais\" description=\"Informações principais do registro.\">\n\t\t\t\t\t\t<FieldGroup columns={2}>\n\t\t\t\t\t\t\t<FormField label=\"Nome\" htmlFor=\"ex-nome\" required error={erros.nome}>\n\t\t\t\t\t\t\t\t<Input\n\t\t\t\t\t\t\t\t\tid=\"ex-nome\"\n\t\t\t\t\t\t\t\t\tvalue={nome}\n\t\t\t\t\t\t\t\t\tonChange={(e) => setNome(e.target.value)}\n\t\t\t\t\t\t\t\t\taria-invalid={!!erros.nome}\n\t\t\t\t\t\t\t\t\taria-describedby=\"ex-nome-error\"\n\t\t\t\t\t\t\t\t/>\n\t\t\t\t\t\t\t</FormField>\n\t\t\t\t\t\t\t<FormField label=\"Categoria\" htmlFor=\"ex-cat\">\n\t\t\t\t\t\t\t\t<Combobox\n\t\t\t\t\t\t\t\t\tid=\"ex-cat\"\n\t\t\t\t\t\t\t\t\tclassName=\"w-full\"\n\t\t\t\t\t\t\t\t\toptions={[\n\t\t\t\t\t\t\t\t\t\t{ label: \"Categoria A\", value: \"a\" },\n\t\t\t\t\t\t\t\t\t\t{ label: \"Categoria B\", value: \"b\" },\n\t\t\t\t\t\t\t\t\t]}\n\t\t\t\t\t\t\t\t\tvalue={categoria}\n\t\t\t\t\t\t\t\t\tonValueChange={setCategoria}\n\t\t\t\t\t\t\t\t/>\n\t\t\t\t\t\t\t</FormField>\n\t\t\t\t\t\t\t<FormField label=\"Marcadores\" htmlFor=\"ex-tags\" className=\"sm:col-span-2\">\n\t\t\t\t\t\t\t\t<MultiSelect\n\t\t\t\t\t\t\t\t\tid=\"ex-tags\"\n\t\t\t\t\t\t\t\t\tclassName=\"w-full\"\n\t\t\t\t\t\t\t\t\toptions={[\n\t\t\t\t\t\t\t\t\t\t{ label: \"Urgente\", value: \"urgente\" },\n\t\t\t\t\t\t\t\t\t\t{ label: \"Revisão\", value: \"revisao\" },\n\t\t\t\t\t\t\t\t\t\t{ label: \"Interno\", value: \"interno\" },\n\t\t\t\t\t\t\t\t\t]}\n\t\t\t\t\t\t\t\t\tvalue={tags}\n\t\t\t\t\t\t\t\t\tonValueChange={setTags}\n\t\t\t\t\t\t\t\t/>\n\t\t\t\t\t\t\t</FormField>\n\t\t\t\t\t\t</FieldGroup>\n\t\t\t\t\t</FormSection>\n\t\t\t\t\t<FormActions\n\t\t\t\t\t\tprimary={<Button type=\"submit\">Salvar</Button>}\n\t\t\t\t\t\tsecondary={\n\t\t\t\t\t\t\t<Button type=\"button\" variant=\"outline\" onClick={fn()}>\n\t\t\t\t\t\t\t\tCancelar\n\t\t\t\t\t\t\t</Button>\n\t\t\t\t\t\t}\n\t\t\t\t\t/>\n\t\t\t\t</form>\n\t\t\t}\n\t\t/>\n\t);\n}",
      "DetailPageExample": "<DetailPageLayout\n\theader={\n\t\t<PageHeader\n\t\t\teyebrow=\"Registros\"\n\t\t\ttitle=\"Registro REG-003\"\n\t\t\tactions={\n\t\t\t\t<Button variant=\"outline\" onClick={fn()}>\n\t\t\t\t\t<Pencil /> Editar\n\t\t\t\t</Button>\n\t\t\t}\n\t\t/>\n\t}\n\tsummary={\n\t\t<ContentCard title=\"Resumo\">\n\t\t\t<div className=\"flex flex-wrap items-center gap-4 text-sm\">\n\t\t\t\t<CodeBadge>REG-003</CodeBadge>\n\t\t\t\t<StatusDot tone=\"success\" label=\"Ativo\" />\n\t\t\t\t<Badge variant=\"secondary\">Categoria A</Badge>\n\t\t\t\t<span className=\"text-muted-foreground\">Atualizado em 03/07/2026</span>\n\t\t\t</div>\n\t\t</ContentCard>\n\t}\n\ttabs={\n\t\t<Tabs defaultValue=\"itens\">\n\t\t\t<TabsList>\n\t\t\t\t<TabsTrigger value=\"itens\">Itens</TabsTrigger>\n\t\t\t\t<TabsTrigger value=\"historico\">Histórico</TabsTrigger>\n\t\t\t</TabsList>\n\t\t\t<TabsContent value=\"itens\">\n\t\t\t\t<DataTable\n\t\t\t\t\tdata={REGISTROS.slice(0, 4)}\n\t\t\t\t\tcolumns={[\n\t\t\t\t\t\t{ header: \"Código\", cell: (r) => <CodeBadge>{r.codigo}</CodeBadge> },\n\t\t\t\t\t\t{ header: \"Nome\", accessorKey: \"nome\" },\n\t\t\t\t\t\t{ header: \"Qtd.\", accessorKey: \"qtd\", align: \"right\" },\n\t\t\t\t\t]}\n\t\t\t\t\tkeyExtractor={(r) => r.id}\n\t\t\t\t/>\n\t\t\t</TabsContent>\n\t\t\t<TabsContent value=\"historico\">\n\t\t\t\t<ContentCard>\n\t\t\t\t\t<p className=\"text-sm text-muted-foreground\">Eventos do registro.</p>\n\t\t\t\t</ContentCard>\n\t\t\t</TabsContent>\n\t\t</Tabs>\n\t}\n/>",
      "DashboardPageExample": "<DashboardPageLayout\n\theader={\n\t\t<PageHeader\n\t\t\ttitle=\"Painel operacional\"\n\t\t\tactions={\n\t\t\t\t<Button variant=\"outline\" onClick={fn()}>\n\t\t\t\t\t<Download /> Exportar\n\t\t\t\t</Button>\n\t\t\t}\n\t\t/>\n\t}\n\tstats={\n\t\t<StatusCards\n\t\t\titems={[\n\t\t\t\t{ label: \"Total\", value: 128, icon: FileText },\n\t\t\t\t{ label: \"Pendentes\", value: 12, icon: Clock, tone: \"warning\" },\n\t\t\t\t{ label: \"Concluídos\", value: 98, icon: CheckCircle, tone: \"success\" },\n\t\t\t]}\n\t\t\tcolumns={3}\n\t\t/>\n\t}\n\tcontent={\n\t\t<div className=\"grid gap-6 lg:grid-cols-2\">\n\t\t\t<ContentCard title=\"Últimos registros\">\n\t\t\t\t<DataTable\n\t\t\t\t\tdata={REGISTROS.slice(0, 5)}\n\t\t\t\t\tcolumns={[\n\t\t\t\t\t\t{ header: \"Nome\", accessorKey: \"nome\" },\n\t\t\t\t\t\t{ header: \"Qtd.\", accessorKey: \"qtd\", align: \"right\" },\n\t\t\t\t\t]}\n\t\t\t\t\tkeyExtractor={(r) => r.id}\n\t\t\t\t/>\n\t\t\t</ContentCard>\n\t\t\t<ContentCard title=\"Distribuição\">\n\t\t\t\t<div className=\"flex h-64 items-center justify-center rounded bg-muted/40 text-sm text-muted-foreground\">\n\t\t\t\t\tárea reservada para gráfico\n\t\t\t\t</div>\n\t\t\t</ContentCard>\n\t\t</div>\n\t}\n/>",
    },
  },
  "blocks/page-header": {
    meta: s51.default as RegistryEntry['meta'],
    stories: s51 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<PageHeader title=\"Registros\" description=\"Gerencie os registros e acompanhe seus status.\" />",
      "ComAcoes": "<PageHeader title=\"Registros\" description=\"Gerencie os registros e acompanhe seus status.\" actions={(\n\t\t\t<>\n\t\t\t\t<Button variant=\"outline\">\n\t\t\t\t\t<Download /> Exportar\n\t\t\t\t</Button>\n\t\t\t\t<Button>\n\t\t\t\t\t<Plus /> Novo registro\n\t\t\t\t</Button>\n\t\t\t</>} />",
      "ComEyebrow": "<PageHeader eyebrow=\"Operações\" title=\"Painel de acompanhamento\" />",
      "SomenteTitulo": "<PageHeader title=\"Configurações\" />",
    },
  },
  "blocks/page-layout": {
    meta: s52.default as RegistryEntry['meta'],
    stories: s52 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<PageLayout header={<PageHeader title=\"Registros\" />}>\n\t<Conteudo />\n</PageLayout>",
      "WithFooter": "<PageLayout\n\theader={<PageHeader title=\"Registros\" />}\n\tfooter={<p className=\"text-xs text-muted-foreground\">Atualizado há 5 minutos</p>}\n>\n\t<Conteudo />\n</PageLayout>",
      "NarrowContent": "<PageLayout maxWidth=\"screen-xl\" header={<PageHeader title=\"Configurações\" />}>\n\t<Conteudo />\n</PageLayout>",
      "FullWidth": "<PageLayout\n\tmaxWidth=\"none\"\n\theader={<PageHeader title=\"Painel\" actions={<Button>Ação</Button>} />}\n>\n\t<Conteudo />\n</PageLayout>",
    },
  },
  "blocks/pagination": {
    meta: s53.default as RegistryEntry['meta'],
    stories: s53 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<Demo />",
      "SemTrocaDeLimite": "{\n\tconst [page, setPage] = React.useState(3);\n\treturn <Pagination page={page} limit={10} total={57} onPageChange={setPage} />;\n}",
      "PaginaUnica": "<Pagination page={1} limit={20} total={8} onPageChange={() => {}} />",
      "TotalZeroNaoRenderiza": "<div className=\"text-sm text-muted-foreground\">\n\t<Pagination page={1} limit={20} total={0} onPageChange={() => {}} />\n\t(total=0 → o componente não renderiza nada)\n</div>",
    },
  },
  "blocks/search-bar": {
    meta: s54.default as RegistryEntry['meta'],
    stories: s54 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<Demo />",
      "ComPlaceholderCustom": "{\n\tconst [value, setValue] = React.useState(\"\");\n\treturn (\n\t\t<SearchBar\n\t\t\tclassName=\"w-80\"\n\t\t\tvalue={value}\n\t\t\tonChange={setValue}\n\t\t\tplaceholder=\"Buscar por código ou nome...\"\n\t\t/>\n\t);\n}",
    },
  },
  "blocks/section-header": {
    meta: s55.default as RegistryEntry['meta'],
    stories: s55 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<SectionHeader title=\"Histórico\" />",
      "WithDescription": "<SectionHeader title=\"Histórico\" description=\"Eventos recentes do registro.\" />",
      "WithActions": "<SectionHeader title=\"Anexos\" actions={(\n\t\t\t<Button variant=\"outline\"} />",
    },
  },
  "blocks/sidebar": {
    meta: s56.default as RegistryEntry['meta'],
    stories: s56 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<Sidebar brand={<Marca />, navigation: NAV, activeItemId: \"registros\"} />",
      "Collapsed": "<Sidebar brand={<Marca />, navigation: NAV, activeItemId: \"registros\", defaultCollapsed: true} />",
      "WithGroups": "<Sidebar brand={<Marca />,} activeItemId=\"registros\" navigation={[\n\t\t\t{\n\t\t\t\tid: \"g-operacao\",\n\t\t\t\tlabel: \"Operação\",\n\t\t\t\tmeta: { group: true },\n\t\t\t\tchildren: NAV.slice(0, 3),\n\t\t\t},\n\t\t\t{\n\t\t\t\tid: \"g-admin\",\n\t\t\t\tlabel: \"Administração\",\n\t\t\t\tmeta: { group: true },\n\t\t\t\tchildren: NAV.slice(3),\n\t\t\t},\n\t\t]} />",
      "WithSubmenus": "<Sidebar brand={<Marca />, navigation: NAV} />",
      "WithBadges": "<Sidebar brand={<Marca />,} navigation={[\n\t\t\t{ id: \"inicio\", label: \"Início\", href: \"#\", icon: Home },\n\t\t\t{\n\t\t\t\tid: \"pendencias\",\n\t\t\t\tlabel: \"Pendências\",\n\t\t\t\thref: \"#\",\n\t\t\t\ticon: FileText,\n\t\t\t\tbadge: <Badge variant=\"destructive\">12</Badge>,\n\t\t\t},\n\t\t]} />",
      "WithDisabledItems": "<Sidebar brand={<Marca />,} navigation={[\n\t\t\t...NAV.slice(0, 2),\n\t\t\t{ id: \"restrito\", label: \"Em breve\", icon: Lock, disabled: true, href: \"#\" },\n\t\t]} />",
      "WithFilteredItems": "<Sidebar brand={<Marca />,} navigation={NAV} canAccessItem={(item) => item.id !== \"usuarios\"} />",
      "WithFooter": "<Sidebar />",
      "ComModuloAtivo": "<Sidebar />",
      "ComModuloColapsado": "<Sidebar defaultCollapsed />",
      "BotaoDeColapso": "<Sidebar brand={<Marca />, navigation: NAV, activeItemId: \"registros\", onCollapsedChange: fn()} />",
      "SemBotaoDeColapso": "<Sidebar brand={<Marca />, navigation: NAV, activeItemId: \"registros\", collapsible: false} />",
      "ControlledCollapsed": "{\n\tconst [collapsed, setCollapsed] = React.useState(false);\n\treturn (\n\t\t<div className=\"flex h-full\">\n\t\t\t<Sidebar\n\t\t\t\tbrand={<Marca />}\n\t\t\t\tnavigation={NAV}\n\t\t\t\tactiveItemId=\"registros\"\n\t\t\t\tcollapsed={collapsed}\n\t\t\t\tonCollapsedChange={(c) => {\n\t\t\t\t\targs.onCollapsedChange?.(c);\n\t\t\t\t\tsetCollapsed(c);\n\t\t\t\t}}\n\t\t\t/>\n\t\t\t<div className=\"p-4\">\n\t\t\t\t<button\n\t\t\t\t\ttype=\"button\"\n\t\t\t\t\tclassName=\"rounded-md border border-border px-3 py-1.5 text-sm\"\n\t\t\t\t\tonClick={() => {\n\t\t\t\t\t\tconst next = !collapsed;\n\t\t\t\t\t\targs.onCollapsedChange?.(next);\n\t\t\t\t\t\tsetCollapsed(next);\n\t\t\t\t\t}}\n\t\t\t\t>\n\t\t\t\t\tAlternar colapso (controle do portal)\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t</div>\n\t);\n}",
    },
  },
  "blocks/status-cards": {
    meta: s57.default as RegistryEntry['meta'],
    stories: s57 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<StatusCards items={[\n\t\t\t{ label: \"Total\", value: 128, icon: FileText, tone: \"default\" },\n\t\t\t{\n\t\t\t\tlabel: \"Pendentes\",\n\t\t\t\tvalue: 12,\n\t\t\t\ticon: Clock,\n\t\t\t\ttone: \"warning\",\n\t\t\t\tdescription: \"Aguardando análise\",\n\t\t\t},\n\t\t\t{ label: \"Concluídos\", value: 98, icon: CheckCircle, tone: \"success\" },\n\t\t\t{ label: \"Com erro\", value: 18, icon: AlertTriangle, tone: \"danger\" },\n\t\t]} />",
      "SemIcones": "<StatusCards columns={3} items={[\n\t\t\t{ label: \"Abertos\", value: 42 },\n\t\t\t{ label: \"Em andamento\", value: 7, tone: \"info\" },\n\t\t\t{ label: \"Arquivados\", value: 315, tone: \"muted\" },\n\t\t]} />",
      "ComoFiltroClicavel": "{\n\tconst [ativo, setAtivo] = React.useState(\"Pendentes\");\n\tconst itens = [\n\t\t{ label: \"Pendentes\", value: 12, icon: Clock, tone: \"warning\" as const },\n\t\t{ label: \"Concluídos\", value: 98, icon: CheckCircle, tone: \"success\" as const },\n\t\t{ label: \"Com erro\", value: 18, icon: AlertTriangle, tone: \"danger\" as const },\n\t];\n\treturn (\n\t\t<StatusCards\n\t\t\tcolumns={3}\n\t\t\titems={itens.map((i) => ({\n\t\t\t\t...i,\n\t\t\t\tonClick: () => setAtivo(i.label),\n\t\t\t\tactive: ativo === i.label,\n\t\t\t}))}\n\t\t/>\n\t);\n}",
    },
  },
  "blocks/status-dot": {
    meta: s58.default as RegistryEntry['meta'],
    stories: s58 as unknown as Record<string, StoryObj>,
    code: {
      "ComLabel": "<StatusDot tone=\"success\" label=\"Ativo\" />",
      "ApenasDot": "<StatusDot tone=\"warning\" />",
      "TodosOsTons": "<div className=\"flex flex-wrap items-center gap-2\">\n\t<StatusDot tone=\"default\" label=\"Padrão\" />\n\t<StatusDot tone=\"success\" label=\"Concluído\" />\n\t<StatusDot tone=\"warning\" label=\"Pendente\" />\n\t<StatusDot tone=\"danger\" label=\"Bloqueado\" />\n\t<StatusDot tone=\"info\" label=\"Em análise\" />\n\t<StatusDot tone=\"muted\" label=\"Arquivado\" />\n</div>",
    },
  },
  "blocks/table-skeleton-rows": {
    meta: s59.default as RegistryEntry['meta'],
    stories: s59 as unknown as Record<string, StoryObj>,
    code: {
      "Default": "<Table>\n\t<TableHeader>\n\t\t<TableRow>\n\t\t\t<TableHead>Código</TableHead>\n\t\t\t<TableHead>Nome</TableHead>\n\t\t\t<TableHead>Status</TableHead>\n\t\t\t<TableHead>Criado em</TableHead>\n\t\t</TableRow>\n\t</TableHeader>\n\t<TableBody>\n\t\t<TableSkeletonRows rows={5} columns={4} />\n\t</TableBody>\n</Table>",
      "ComColunaDeAcoes": "<Table>\n\t<TableBody>\n\t\t<TableSkeletonRows rows={3} columns={3} withActionsColumn />\n\t</TableBody>\n</Table>",
    },
  },
};
