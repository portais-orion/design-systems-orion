import type { Meta, StoryObj } from "@storybook/react";
import { ThreadEvent } from "./thread-event";

const meta: Meta<typeof ThreadEvent> = {
	title: "Blocks/ThreadEvent",
	component: ThreadEvent,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ThreadEvent>;

export const Default: Story = {
	args: { timestamp: "14:40", title: "Atendimento assumido por Ana Souza" },
};

export const ComDetalhe: Story = {
	args: {
		timestamp: "15:02",
		title: "Transferido para a fila Operações",
		detail: "Cliente pediu confirmação de janela de retirada",
	},
};
