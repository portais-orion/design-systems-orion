import type { Meta, StoryObj } from "@storybook/react";
import { Search, Send, Trash2 } from "lucide-react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
	title: "UI/Button",
	component: Button,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["default", "outline", "secondary", "ghost", "destructive", "link"],
		},
		size: {
			control: "select",
			options: ["default", "xs", "sm", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"],
		},
		disabled: { control: "boolean" },
	},
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
	args: { children: "Button", variant: "default" },
};

export const Outline: Story = {
	args: { children: "Outline", variant: "outline" },
};

export const Secondary: Story = {
	args: { children: "Secondary", variant: "secondary" },
};

export const Ghost: Story = {
	args: { children: "Ghost", variant: "ghost" },
};

export const Destructive: Story = {
	args: { children: "Excluir", variant: "destructive" },
};

export const Link: Story = {
	args: { children: "Link", variant: "link" },
};

export const Disabled: Story = {
	args: { children: "Desabilitado", disabled: true },
};

export const WithIcon: Story = {
	render: () => (
		<div className="flex items-center gap-2">
			<Button>
				<Send /> Enviar
			</Button>
			<Button variant="outline">
				<Search /> Buscar
			</Button>
			<Button variant="destructive" size="icon" aria-label="Excluir">
				<Trash2 />
			</Button>
		</div>
	),
};

export const AllSizes: Story = {
	render: () => (
		<div className="flex items-center gap-2">
			<Button size="xs">xs</Button>
			<Button size="sm">sm</Button>
			<Button size="default">default</Button>
			<Button size="lg">lg</Button>
		</div>
	),
};
