import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "../label";
import { Switch } from "./switch";

const meta: Meta<typeof Switch> = {
	title: "UI/Switch",
	component: Switch,
	tags: ["autodocs"],
	argTypes: { disabled: { control: "boolean" } },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {};

export const Checked: Story = {
	args: { defaultChecked: true },
};

export const Disabled: Story = {
	args: { disabled: true },
};

export const DisabledChecked: Story = {
	args: { disabled: true, defaultChecked: true },
};

export const ComLabel: Story = {
	render: () => (
		<div className="flex items-center gap-2">
			<Switch id="notificacoes" defaultChecked />
			<Label htmlFor="notificacoes">Receber notificações</Label>
		</div>
	),
};
