import type { Meta, StoryObj } from "@storybook/react";
import { ConversationHeader } from "../conversation-header";
import { ConversationListItem, getInitials } from "../conversation-list-item";
import { DescriptionList } from "../description-list";
import { MessageBubble } from "../message-bubble";
import { MessageThread } from "../message-thread";
import { SearchBar } from "../search-bar";
import { InboxLayout } from "./inbox-layout";

const meta: Meta<typeof InboxLayout> = {
	title: "Blocks/InboxLayout",
	component: InboxLayout,
	tags: ["autodocs"],
	parameters: { layout: "fullscreen" },
	decorators: [
		(Story) => (
			<div className="h-[560px]">
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof InboxLayout>;

const contacts = ["Marina Costa", "Operações Porto Norte", "Rafael Dias"];

export const Default: Story = {
	args: {
		list: (
			<>
				<div className="border-b border-border p-4">
					<SearchBar value="" onChange={() => {}} placeholder="Buscar conversa..." />
				</div>
				<div className="flex-1 overflow-y-auto">
					{contacts.map((name, index) => (
						<ConversationListItem
							key={name}
							title={name}
							avatarFallback={getInitials(name)}
							timestamp="14:32"
							preview="Bom dia, consegue confirmar?"
							selected={index === 0}
							unread={index === 1}
						/>
					))}
				</div>
			</>
		),
		children: (
			<>
				<ConversationHeader title="Marina Costa" avatarFallback="MC" subtitle="WhatsApp" />
				<MessageThread scrollKey={1}>
					<MessageBubble direction="incoming" timestamp="14:32">
						Bom dia! Pode confirmar a janela?
					</MessageBubble>
					<MessageBubble direction="outgoing" timestamp="14:35">
						Confirmado para amanhã, às 9h.
					</MessageBubble>
				</MessageThread>
			</>
		),
		aside: (
			<DescriptionList
				items={[
					{ label: "Canal", value: "WhatsApp" },
					{ label: "Papel", value: "Solicitante" },
				]}
			/>
		),
	},
};

export const SemPainelDeContexto: Story = {
	args: { ...Default.args, aside: undefined },
};
