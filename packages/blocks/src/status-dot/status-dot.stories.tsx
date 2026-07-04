import type { Meta, StoryObj } from "@storybook/react";
import { StatusDot } from "./status-dot";

const meta: Meta<typeof StatusDot> = {
	title: "Blocks/StatusDot",
	component: StatusDot,
	tags: ["autodocs"],
	argTypes: {
		tone: {
			control: "select",
			options: ["default", "success", "warning", "danger", "info", "muted"],
		},
	},
};

export default meta;
type Story = StoryObj<typeof StatusDot>;

export const ComLabel: Story = {
	args: { tone: "success", label: "Ativo" },
};

export const ApenasDot: Story = {
	args: { tone: "warning" },
};

export const TodosOsTons: Story = {
	render: () => (
		<div className="flex flex-wrap items-center gap-2">
			<StatusDot tone="default" label="Padrão" />
			<StatusDot tone="success" label="Concluído" />
			<StatusDot tone="warning" label="Pendente" />
			<StatusDot tone="danger" label="Bloqueado" />
			<StatusDot tone="info" label="Em análise" />
			<StatusDot tone="muted" label="Arquivado" />
		</div>
	),
};
