import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "../label";
import { Textarea } from "./textarea";

const meta: Meta<typeof Textarea> = {
	title: "UI/Textarea",
	component: Textarea,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
	args: {
		placeholder: "Type your message here.",
	},
};

export const WithLabel: Story = {
	render: () => (
		<div className="grid w-full gap-1.5">
			<Label htmlFor="message">Your message</Label>
			<Textarea placeholder="Type your message here." id="message" />
		</div>
	),
};

export const Disabled: Story = {
	args: {
		disabled: true,
		placeholder: "Type your message here.",
	},
};
