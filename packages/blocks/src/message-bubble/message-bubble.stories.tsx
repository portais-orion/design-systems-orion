import type { Meta, StoryObj } from "@storybook/react";
import { MessageBubble } from "./message-bubble";

const meta: Meta<typeof MessageBubble> = {
	title: "Blocks/MessageBubble",
	component: MessageBubble,
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div className="w-[480px] bg-muted/30 p-4">
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof MessageBubble>;

export const Recebida: Story = {
	args: {
		direction: "incoming",
		timestamp: "14:32",
		children: "Bom dia! Pode confirmar a janela?",
	},
};

export const Enviada: Story = {
	args: {
		direction: "outgoing",
		timestamp: "14:35",
		children: "Confirmado para amanhã, às 9h.\nQualquer ajuste, avise por aqui.",
	},
};

export const ComStatus: Story = {
	args: {
		direction: "outgoing",
		timestamp: "14:36",
		status: "Enviando...",
		children: "Um instante.",
	},
};
