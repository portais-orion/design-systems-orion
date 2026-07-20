import type { Meta, StoryObj } from "@storybook/react";

import { KanbanBoard } from "./kanban-board";

const meta: Meta<typeof KanbanBoard> = {
	title: "Blocks/KanbanBoard",
	component: KanbanBoard,
};

export default meta;

type Story = StoryObj<typeof KanbanBoard>;

export const Default: Story = {
	args: {
		columns: [
			{
				id: "impedido",
				title: "Impedido",
				tone: "danger",
				cards: [{ id: "1", title: "Tarefa A", subtitle: "Aguardando terceiros" }],
			},
			{
				id: "progresso",
				title: "Em progresso",
				tone: "info",
				cards: [
					{ id: "2", title: "Tarefa B", subtitle: "Responsável: Maria" },
					{ id: "3", title: "Tarefa C" },
				],
			},
			{
				id: "concluido",
				title: "Concluído",
				tone: "success",
				cards: [{ id: "4", title: "Tarefa D" }],
			},
		],
	},
};
