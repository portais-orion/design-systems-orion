import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "../label";
import { Checkbox } from "./checkbox";

const meta: Meta<typeof Checkbox> = {
	title: "UI/Checkbox",
	component: Checkbox,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
	render: () => (
		<div className="flex items-center space-x-2">
			<Checkbox id="terms" />
			<Label htmlFor="terms">Accept terms and conditions</Label>
		</div>
	),
};

export const Checked: Story = {
	args: {
		defaultChecked: true,
	},
	render: (args) => (
		<div className="flex items-center space-x-2">
			<Checkbox id="checked" {...args} />
			<Label htmlFor="checked">Checked by default</Label>
		</div>
	),
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
	render: (args) => (
		<div className="flex items-center space-x-2">
			<Checkbox id="disabled" {...args} />
			<Label htmlFor="disabled">Disabled checkbox</Label>
		</div>
	),
};
