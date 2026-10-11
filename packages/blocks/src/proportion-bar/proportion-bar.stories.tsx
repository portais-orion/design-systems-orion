import type { Meta, StoryObj } from "@storybook/react";
import { ProportionBar } from "./proportion-bar";

const meta: Meta<typeof ProportionBar> = {
	title: "Blocks/ProportionBar",
	component: ProportionBar,
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div className="w-96">
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof ProportionBar>;

export const Default: Story = {
	args: {
		segments: [
			{ id: "approved", label: "Aprovadas", value: 24, tone: "success" },
			{ id: "rejected", label: "Rejeitadas", value: 6, tone: "danger" },
			{ id: "pending", label: "Pendentes", value: 9, tone: "warning" },
			{ id: "canceled", label: "Canceladas", value: 0, tone: "muted" },
		],
	},
};

export const SemLegenda: Story = {
	args: {
		showLegend: false,
		segments: [
			{ id: "a", label: "Dentro do prazo", value: 80, tone: "success" },
			{ id: "b", label: "Atrasado", value: 20, tone: "danger" },
		],
	},
};

export const Vazio: Story = {
	args: {
		segments: [{ id: "a", label: "Aprovadas", value: 0, tone: "success" }],
		emptyMessage: "Nenhuma demanda no período.",
	},
};
