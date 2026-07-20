import { Users } from "lucide-react";
import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

import type { AssignmentCandidate } from "./entity-assignment-panel";
import { EntityAssignmentPanel } from "./entity-assignment-panel";

const meta: Meta<typeof EntityAssignmentPanel> = {
	title: "Blocks/EntityAssignmentPanel",
	component: EntityAssignmentPanel,
};

export default meta;

type Story = StoryObj<typeof EntityAssignmentPanel>;

const ALL_USERS: AssignmentCandidate[] = [
	{ id: "1", label: "Maria Silva", sublabel: "maria@empresa.com" },
	{ id: "2", label: "João Souza", sublabel: "joao@empresa.com" },
];

export const Default: Story = {
	render: () => {
		const [assigned, setAssigned] = React.useState<AssignmentCandidate[]>([ALL_USERS[0]]);
		const [query, setQuery] = React.useState("");
		const assignedIds = new Set(assigned.map((u) => u.id));
		const candidates = ALL_USERS.filter(
			(u) => !assignedIds.has(u.id) && u.label.toLowerCase().includes(query.toLowerCase()),
		);

		return (
			<EntityAssignmentPanel
				title="Usuários com este perfil"
				icon={Users}
				assignedItems={assigned}
				searchQuery={query}
				onSearchQueryChange={setQuery}
				candidates={query.length >= 1 ? candidates : []}
				onAssign={(c) => {
					setAssigned((prev) => [...prev, c]);
					setQuery("");
				}}
				onUnassign={(item) => setAssigned((prev) => prev.filter((u) => u.id !== item.id))}
			/>
		);
	},
};
