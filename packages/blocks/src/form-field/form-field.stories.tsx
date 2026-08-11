import { Checkbox, Combobox, Input, MultiSelect, Textarea } from "@design-systems-orion/ui";
import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { fn } from "storybook/test";
import { FormField } from "./form-field";

const meta: Meta<typeof FormField> = {
	title: "Blocks/Forms/FormField",
	component: FormField,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FormField>;

const opcoes = [
	{ label: "Opção 1", value: "1" },
	{ label: "Opção 2", value: "2" },
];

export const Default: Story = {
	render: () => (
		<FormField label="Nome" htmlFor="ff-nome" className="w-72">
			<Input id="ff-nome" placeholder="Nome de exibição" />
		</FormField>
	),
};

export const WithDescription: Story = {
	render: () => (
		<FormField
			label="Código"
			htmlFor="ff-cod"
			description="Identificador único, sem espaços."
			className="w-72"
		>
			<Input id="ff-cod" aria-describedby="ff-cod-description" />
		</FormField>
	),
};

export const WithError: Story = {
	render: () => (
		<FormField label="E-mail" htmlFor="ff-mail" error="Formato de e-mail inválido" className="w-72">
			<Input id="ff-mail" aria-invalid aria-describedby="ff-mail-error" defaultValue="abc@" />
		</FormField>
	),
};

export const Required: Story = {
	render: () => (
		<FormField label="Nome" htmlFor="ff-req" required className="w-72">
			<Input id="ff-req" required />
		</FormField>
	),
};

export const WithTextarea: Story = {
	render: () => (
		<FormField label="Observações" htmlFor="ff-obs" className="w-96">
			<Textarea id="ff-obs" rows={3} />
		</FormField>
	),
};

export const WithCombobox: Story = {
	render: function ComCombobox() {
		const [v, setV] = React.useState<string | null>(null);
		return (
			<FormField label="Categoria" htmlFor="ff-cat" className="w-72">
				<Combobox id="ff-cat" options={opcoes} value={v} onValueChange={setV} />
			</FormField>
		);
	},
};

export const WithMultiSelect: Story = {
	render: function ComMulti() {
		const [v, setV] = React.useState<string[]>([]);
		return (
			<FormField label="Marcadores" htmlFor="ff-tags" className="w-80">
				<MultiSelect
					id="ff-tags"
					options={opcoes}
					value={v}
					onValueChange={setV}
					className="w-full"
				/>
			</FormField>
		);
	},
};

export const WithCheckbox: Story = {
	render: () => (
		<FormField htmlFor="ff-ativo" description="Registros inativos não aparecem nas listagens.">
			<div className="flex items-center gap-2">
				<Checkbox id="ff-ativo" defaultChecked onCheckedChange={fn()} />
				<label htmlFor="ff-ativo" className="text-sm">
					Registro ativo
				</label>
			</div>
		</FormField>
	),
};
