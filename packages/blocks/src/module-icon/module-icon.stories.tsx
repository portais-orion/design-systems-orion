import type { Meta, StoryObj } from "@storybook/react";

import { ICON_OPTIONS, ModuleIcon } from "./module-icon";

const meta: Meta<typeof ModuleIcon> = {
	title: "Blocks/ModuleIcon",
	component: ModuleIcon,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ModuleIcon>;

export const Default: Story = {
	args: { icon: "truck", size: "md" },
};

export const Fallback: Story = {
	args: { icon: "chave-inexistente", size: "md" },
};

export const Catalogo: Story = {
	render: () => (
		<div className="grid grid-cols-6 gap-3">
			{ICON_OPTIONS.map(({ name }) => (
				<div key={name} className="flex flex-col items-center gap-1">
					<ModuleIcon icon={name} size="sm" />
					<span className="text-[10px] text-muted-foreground">{name}</span>
				</div>
			))}
		</div>
	),
};
