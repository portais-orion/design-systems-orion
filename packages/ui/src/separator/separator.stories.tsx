import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./separator";

const meta: Meta<typeof Separator> = {
	title: "UI/Separator",
	component: Separator,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
	render: () => (
		<div className="w-64 space-y-3">
			<p className="text-sm">Seção A</p>
			<Separator />
			<p className="text-sm">Seção B</p>
		</div>
	),
};

export const Vertical: Story = {
	render: () => (
		<div className="flex h-6 items-center gap-3 text-sm">
			<span>Item 1</span>
			<Separator orientation="vertical" />
			<span>Item 2</span>
			<Separator orientation="vertical" />
			<span>Item 3</span>
		</div>
	),
};
