import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "../input";
import { Label } from "./label";

const meta: Meta<typeof Label> = {
	title: "UI/Label",
	component: Label,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
	render: () => (
		<div>
			<Label htmlFor="email">Email address</Label>
			<Input type="email" id="email" placeholder="Email" className="mt-2" />
		</div>
	),
};
