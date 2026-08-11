import { Input } from "@design-systems-orion/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { FiltersCard } from "./filters-card";

const meta: Meta<typeof FiltersCard> = {
	title: "Blocks/FiltersCard",
	component: FiltersCard,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FiltersCard>;

export const Default: Story = {
	args: {
		onClear: () => {},
		children: (
			<div className="grid gap-3 sm:grid-cols-3">
				<Input placeholder="Buscar..." />
				<Input placeholder="Status" />
				<Input placeholder="Categoria" />
			</div>
		),
	},
};

export const Fechado: Story = {
	args: {
		defaultOpen: false,
		children: <Input placeholder="Buscar..." />,
	},
};
