import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@supertrans-transportes/ui";
import { SectionHeader } from "./section-header";

const meta: Meta<typeof SectionHeader> = {
	title: "Blocks/Layouts/SectionHeader",
	component: SectionHeader,
	tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof SectionHeader>;

export const Default: Story = { args: { title: "HistÃ³rico" } };
export const WithDescription: Story = {
	args: { title: "HistÃ³rico", description: "Eventos recentes do registro." },
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
