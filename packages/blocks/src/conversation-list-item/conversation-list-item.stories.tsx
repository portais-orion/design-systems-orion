import type { Meta, StoryObj } from "@storybook/react";
import { Mail, MessageCircle } from "lucide-react";
import { StatusDot } from "../status-dot";
import { ConversationListItem, getInitials } from "./conversation-list-item";

const meta: Meta<typeof ConversationListItem> = {
	title: "Blocks/ConversationListItem",
	component: ConversationListItem,
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div className="w-[300px] border border-border">
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof ConversationListItem>;

export const Default: Story = {
	args: {
		title: "Marina Costa",
		avatarFallback: getInitials("Marina Costa"),
		timestamp: "14:32",
		preview: "Bom dia, consegue confirmar a janela de retirada?",
		previewIcon: MessageCircle,
	},
};

export const NaoLidaComMeta: Story = {
	args: {
		title: "Operações Porto Norte",
		avatarFallback: getInitials("Operações Porto Norte"),
		timestamp: "Ontem",
		preview: "Re: Agendamento de gate",
		previewIcon: Mail,
		unread: true,
		meta: <StatusDot tone="warning" label="Aguardando cliente" />,
	},
};

export const Selecionada: Story = {
	args: { ...Default.args, selected: true },
};
