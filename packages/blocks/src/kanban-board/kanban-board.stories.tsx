import type { Meta, StoryObj } from "@storybook/react";

import { KanbanBoard } from "./kanban-board";

const meta: Meta<typeof KanbanBoard> = {
	title: "Blocks/KanbanBoard",
	component: KanbanBoard,
};

export default meta;

type Story = StoryObj<typeof KanbanBoard>;

export const Default: Story = {
	render: () => (
		<KanbanBoard>
			<KanbanBoard.Column title="Impedido" tone="danger">
				<KanbanBoard.Card tone="danger">
					<p className="text-sm font-medium text-foreground">Tarefa A</p>
					<p className="mt-0.5 text-xs text-muted-foreground">Aguardando terceiros</p>
				</KanbanBoard.Card>
			</KanbanBoard.Column>

			<KanbanBoard.Column title="Em progresso" tone="info">
				<KanbanBoard.Card tone="info">
					<p className="text-sm font-medium text-foreground">Tarefa B</p>
					<p className="mt-0.5 text-xs text-muted-foreground">Responsável: Maria</p>
				</KanbanBoard.Card>
				<KanbanBoard.Card tone="info">
					<p className="text-sm font-medium text-foreground">Tarefa C</p>
				</KanbanBoard.Card>
			</KanbanBoard.Column>

			<KanbanBoard.Column title="Concluído" tone="success">
				<KanbanBoard.Card tone="success">
					<p className="text-sm font-medium text-foreground">Tarefa D</p>
				</KanbanBoard.Card>
			</KanbanBoard.Column>
		</KanbanBoard>
	),
};
