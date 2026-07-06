import { Button, Input } from "@portais-orion/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";
import { ContentCard } from "../content-card";
import { FieldGroup } from "../field-group";
import { FormActions } from "../form-actions";
import { FormField } from "../form-field";
import { FormSection } from "../form-section";
import { PageHeader } from "../page-header";
import { FormPageLayout } from "./form-page-layout";

const meta: Meta<typeof FormPageLayout> = {
	title: "Blocks/Layouts/FormPageLayout",
	component: FormPageLayout,
	tags: ["autodocs"],
	parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof FormPageLayout>;

const Formulario = ({ sticky = false }: { sticky?: boolean }) => (
	<form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
		<FormSection title="Dados gerais">
			<FieldGroup columns={2}>
				<FormField label="Nome" htmlFor="fp-nome" required>
					<Input id="fp-nome" />
				</FormField>
				<FormField label="CÃ³digo" htmlFor="fp-cod">
					<Input id="fp-cod" />
				</FormField>
			</FieldGroup>
		</FormSection>
		<FormActions
			sticky={sticky}
			primary={<Button onClick={fn()}>Salvar</Button>}
			secondary={
				<Button variant="outline" onClick={fn()}>
					Cancelar
				</Button>
			}
		/>
	</form>
);

export const Default: Story = {
	render: () => (
		<FormPageLayout header={<PageHeader title="Novo registro" />} form={<Formulario />} />
	),
};

export const WithAside: Story = {
	render: () => (
		<FormPageLayout
			header={<PageHeader title="Editar registro" />}
			form={<Formulario />}
			aside={
				<ContentCard title="Dicas">
					<p className="text-sm text-muted-foreground">O cÃ³digo nÃ£o pode ser alterado depois.</p>
				</ContentCard>
			}
		/>
	),
};

export const MultipleSections: Story = {
	render: () => (
		<FormPageLayout
			header={<PageHeader title="Novo registro" />}
			form={
				<form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
					<FormSection title="Dados gerais">
						<FieldGroup>
							<FormField label="Nome" htmlFor="fpm-1">
								<Input id="fpm-1" />
							</FormField>
							<FormField label="CÃ³digo" htmlFor="fpm-2">
								<Input id="fpm-2" />
							</FormField>
						</FieldGroup>
					</FormSection>
					<FormSection title="Contato" description="InformaÃ§Ãµes opcionais.">
						<FieldGroup>
							<FormField label="E-mail" htmlFor="fpm-3">
								<Input id="fpm-3" />
							</FormField>
							<FormField label="Telefone" htmlFor="fpm-4">
								<Input id="fpm-4" />
							</FormField>
						</FieldGroup>
					</FormSection>
					<FormActions primary={<Button onClick={fn()}>Salvar</Button>} />
				</form>
			}
		/>
	),
};

export const WithStickyActions: Story = {
	render: () => (
		<FormPageLayout header={<PageHeader title="Novo registro" />} form={<Formulario sticky />} />
	),
};
