import type { Meta, StoryObj } from "@storybook/react";
import { DescriptionList } from "./description-list";

const meta: Meta<typeof DescriptionList> = {
	title: "Blocks/DescriptionList",
	component: DescriptionList,
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div className="w-60">
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof DescriptionList>;

export const Default: Story = {
	args: {
		items: [
			{ label: "Status", value: "Em atendimento" },
			{ label: "Responsável", value: "Ana Souza" },
			{ label: "Fila", value: "Operações" },
			{ label: "Início", value: "há 12 min" },
		],
	},
};

export const Empilhada: Story = {
	args: {
		layout: "stacked",
		items: [
			{ label: "Cliente", value: "Porto Norte Logística Ltda." },
			{ label: "Motivo da espera", value: "Aguardando Operações confirmar a janela de retirada" },
		],
	},
};

export const ItemOculto: Story = {
	args: {
		items: [
			{ label: "Responsável", value: "Ana Souza" },
			{ label: "Fila", value: "Operações", hidden: true },
		],
	},
};
