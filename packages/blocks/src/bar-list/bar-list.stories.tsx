import type { Meta, StoryObj } from "@storybook/react";
import { BarList } from "./bar-list";

const meta: Meta<typeof BarList> = {
	title: "Blocks/BarList",
	component: BarList,
	tags: ["autodocs"],
	argTypes: {
		tone: {
			control: "select",
			options: ["default", "brand", "success", "warning", "danger", "info", "muted"],
		},
	},
	decorators: [
		(Story) => (
			<div className="w-96">
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof BarList>;

export const Default: Story = {
	args: {
		items: [
			{ label: "WhatsApp", value: 128 },
			{ label: "E-mail", value: 64 },
			{ label: "Telefone", value: 12 },
		],
	},
};

export const TonsPorItem: Story = {
	args: {
		items: [
			{ label: "Resolvido", value: 40, tone: "success" },
			{ label: "Sem retorno do cliente", value: 18, tone: "warning" },
			{ label: "Cancelado", value: 7, tone: "muted" },
		],
	},
};

export const ValorFormatado: Story = {
	args: {
		items: [
			{ label: "Ana Souza", value: 42 },
			{ label: "Bruno Lima", value: 17 },
		],
		formatValue: (value) => `${value} atend.`,
	},
};

export const Vazio: Story = {
	args: { items: [], emptyMessage: "Nenhum atendimento encerrado no período." },
};
