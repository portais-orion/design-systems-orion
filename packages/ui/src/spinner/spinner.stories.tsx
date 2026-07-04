import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button";
import { Spinner } from "./spinner";

const meta: Meta<typeof Spinner> = {
	title: "UI/Spinner",
	component: Spinner,
	tags: ["autodocs"],
	argTypes: { size: { control: "select", options: ["sm", "md", "lg"] } },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div className="flex items-center gap-6">
			<Spinner size="sm" />
			<Spinner size="md" />
			<Spinner size="lg" />
		</div>
	),
};

export const WithLabel: Story = {
	args: { label: "Carregando...", size: "sm" },
};

export const InsideButton: Story = {
	render: () => (
		<div className="flex gap-3">
			<Button disabled>
				<Spinner size="sm" className="text-primary-foreground" /> Salvando…
			</Button>
			<Button variant="outline" disabled>
				<Spinner size="sm" /> Processando…
			</Button>
		</div>
	),
};
