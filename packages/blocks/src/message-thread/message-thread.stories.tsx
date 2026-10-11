import type { Meta, StoryObj } from "@storybook/react";
import { MessageBubble } from "../message-bubble";
import { ThreadEvent } from "../thread-event";
import { MessageThread } from "./message-thread";

const meta: Meta<typeof MessageThread> = {
	title: "Blocks/MessageThread",
	component: MessageThread,
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div className="flex h-[360px] w-[520px] flex-col border border-border">
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof MessageThread>;

export const Default: Story = {
	args: {
		scrollKey: 4,
		children: (
			<>
				<MessageBubble direction="incoming" timestamp="14:32">
					Bom dia! Pode confirmar a janela de retirada?
				</MessageBubble>
				<ThreadEvent timestamp="14:33" title="Atendimento assumido por Ana Souza" />
				<MessageBubble direction="outgoing" timestamp="14:35">
					Confirmado para amanhã, às 9h.
				</MessageBubble>
				<ThreadEvent
					timestamp="14:40"
					title="Transferido para a fila Operações"
					detail="Aguardando confirmação do pátio"
				/>
			</>
		),
	},
};
