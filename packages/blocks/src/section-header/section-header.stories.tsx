import { Button } from "@portais-orion/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { SectionHeader } from "./section-header";

const meta: Meta<typeof SectionHeader> = {
	title: "Blocks/Layouts/SectionHeader",
	component: SectionHeader,
	tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof SectionHeader>;

export const Default: Story = { args: { title: "Histórico" } };
export const WithDescription: Story = {
	args: { title: "Histórico", description: "Eventos recentes do registro." },
};
export const WithActions: Story = {
	args: {
		title: "Anexos",
		actions: (
			<Button variant="outline" size="sm">
				Adicionar
			</Button>
		),
	},
};
