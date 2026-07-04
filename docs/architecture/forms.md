# Forms

## Princípio

Os blocks de formulário são **agnósticos de form library**: `FormField` recebe `error` por prop, `FormActions` recebe botões por slot, nada importa RHF/Zod. O padrão RHF+Zod é convenção dos **portais**, não dependência do núcleo.

## Blocks

`FormField` (label + controle + description/erro, com ids `<htmlFor>-description`/`<htmlFor>-error` para `aria-describedby`), `FormMessage` (tons default/error/warning/success; erro tem `role="alert"`), `FormSection` (título/descrição/ações + separador), `FieldGroup` (grid 1–4 colunas, 1 no mobile), `FormActions` (primary/secondary/extra, align, sticky).

## Padrão recomendado nos portais

React Hook Form + Zod + zodResolver (padrão consolidado do Supertrans); FormField para cada campo; FormSection para agrupar; FieldGroup para grid; FormActions para ações; toasts de mutação via sonner (`onError: toast.error`).

## Exemplo com RHF + Zod (código do portal, não do núcleo)

```tsx
const schema = z.object({
  nome: z.string().min(1, "O nome é obrigatório"),
  categoria: z.string().nullable(),
  tags: z.array(z.string()),
});
type FormData = z.infer<typeof schema>;

const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>({
  resolver: zodResolver(schema),
});

<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
  <FormSection title="Dados gerais">
    <FieldGroup columns={2}>
      <FormField label="Nome" htmlFor="nome" required error={errors.nome?.message}>
        <Input id="nome" aria-invalid={!!errors.nome} aria-describedby="nome-error" {...register("nome")} />
      </FormField>
      <FormField label="Categoria" htmlFor="categoria" error={errors.categoria?.message}>
        <Controller name="categoria" control={control}
          render={({ field }) => (
            <Combobox id="categoria" className="w-full" options={opcoes}
              value={field.value} onValueChange={field.onChange} />
          )} />
      </FormField>
    </FieldGroup>
  </FormSection>
  <FormActions
    primary={<Button type="submit">Salvar</Button>}
    secondary={<Button type="button" variant="outline" onClick={voltar}>Cancelar</Button>}
  />
</form>
```

Componentes controlados (Combobox, MultiSelect, Select, Switch, Checkbox) entram via `Controller`; nativos via `register`.

## a11y

`error` → sempre com `aria-invalid` + `aria-describedby="<id>-error"` no controle; `required` do FormField é visual — o `required` real vai no controle.
