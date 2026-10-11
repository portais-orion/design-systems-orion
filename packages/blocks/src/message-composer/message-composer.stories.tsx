import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { MessageComposer } from "./message-composer";

const meta: Meta<typeof MessageComposer> = {
	title: "Blocks/MessageComposer",
	component: MessageComposer,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MessageComposer>;

export const Default: Story = {
	render: function Render() {
		const [value, setValue] = React.useState("");
		const [sent, setSent] = React.useState<string[]>([]);
		return (
			<div className="w-[560px] border border-border">
				<ul className="min-h-12 p-3 text-sm text-muted-foreground">
					{sent.map((text, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: demo estática
						<li key={index}>{text}</li>
					))}
				</ul>
				<MessageComposer
					value={value}
					onValueChange={setValue}
					onSend={() => {
						setSent((current) => [...current, value.trim()]);
						setValue("");
					}}
				/>
			</div>
		);
	},
};

export const Enviando: Story = {
	args: {
		value: "Confirmado para amanhã.",
		sending: true,
		onValueChange: () => {},
		onSend: () => {},
	},
	decorators: [
		(Story) => (
			<div className="w-[560px] border border-border">
				<Story />
			</div>
		),
	],
};

export const Desabilitado: Story = {
	args: { value: "", disabled: true, onValueChange: () => {}, onSend: () => {} },
	decorators: [
		(Story) => (
			<div className="w-[560px] border border-border">
				<Story />
			</div>
		),
	],
};
