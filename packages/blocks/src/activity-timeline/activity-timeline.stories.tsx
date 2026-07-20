import { CheckCircle2, PlusCircle } from "lucide-react";
import type { Meta, StoryObj } from "@storybook/react";

import { ActivityTimeline } from "./activity-timeline";

const meta: Meta<typeof ActivityTimeline> = {
	title: "Blocks/ActivityTimeline",
	component: ActivityTimeline,
};

export default meta;

type Story = StoryObj<typeof ActivityTimeline>;

export const Default: Story = {
	args: {
		items: [
			{
				id: "1",
				icon: PlusCircle,
				tone: "info",
				title: "Criado manualmente",
				timestampLabel: "18/07/2026 às 09:12",
				meta: "Responsável: Sistema",
			},
			{
				id: "2",
				icon: CheckCircle2,
				tone: "success",
				title: "Inspeção finalizada",
				timestampLabel: "19/07/2026 às 14:30",
				description: "Status alterado de Em Andamento para Concluído.",
				meta: "Responsável: Usuário Web",
			},
		],
	},
};

export const Vazio: Story = {
	args: { items: [] },
};
