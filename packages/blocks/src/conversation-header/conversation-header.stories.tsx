import { Badge } from "@design-systems-orion/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { MessageCircle } from "lucide-react";
import { ConversationHeader } from "./conversation-header";

const meta: Meta<typeof ConversationHeader> = {
	title: "Blocks/ConversationHeader",
	component: ConversationHeader,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ConversationHeader>;

export const Default: Story = {
	args: {
		title: "Marina Costa",
		avatarFallback: "MC",
		subtitle: (
			<>
				<MessageCircle className="size-3 flex-none" /> WhatsApp · Porto Norte Logística
			</>
		),
	},
};

export const ComAcoes: Story = {
	args: {
		...Default.args,
		actions: <Badge variant="outline">WhatsApp conectado</Badge>,
	},
};
