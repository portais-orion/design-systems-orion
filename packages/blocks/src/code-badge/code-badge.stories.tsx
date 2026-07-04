import type { Meta, StoryObj } from "@storybook/react";
import { CodeBadge } from "./code-badge";

const meta: Meta<typeof CodeBadge> = {
	title: "Blocks/CodeBadge",
	component: CodeBadge,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CodeBadge>;

export const Default: Story = {
	args: { children: "CNT-001" },
};

export const EmTexto: Story = {
	render: () => (
		<p className="text-sm text-foreground">
			A chave <CodeBadge>VISUALIZAR_REGISTRO</CodeBadge> controla o acesso à listagem.
		</p>
	),
};
