import { Button, Input } from "@portais-orion/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { FormField } from "../form-field";
import { FormSection } from "./form-section";

const meta: Meta<typeof FormSection> = {
	title: "Blocks/Forms/FormSection",
	component: FormSection,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FormSection>;

const Campos = () => (
	<>
		<FormField label="Nome" htmlFor="fs-nome">
			<Input id="fs-nome" />
		</FormField>
		<FormField label="CÃ³digo" htmlFor="fs-cod">
			<Input id="fs-cod" />
		</FormField>
	</>
);

export const Default: Story = {
	render: () => (
		<FormSection title="Dados gerais" className="w-96">
			<Campos />
		</FormSection>
	),
};

export const WithDescription: Story = {
	render: () => (
		<FormSection
			title="Dados gerais"
			description="InformaÃ§Ãµes principais do registro."
			className="w-96"
		>
			<Campos />
		</FormSection>
	),
};

export const WithActions: Story = {
	render: () => (
		<FormSection
			title="EndereÃ§os"
			actions={
				<Button variant="outline" size="sm">
					Adicionar
				</Button>
			}
			className="w-96"
		>
			<Campos />
		</FormSection>
	),
};

export const MultipleSections: Story = {
	render: () => (
		<div className="w-96 space-y-8">
			<FormSection title="Dados gerais">
				<Campos />
			</FormSection>
			<FormSection title="ConfiguraÃ§Ãµes" description="Ajustes opcionais.">
				<Campos />
			</FormSection>
		</div>
	),
};
