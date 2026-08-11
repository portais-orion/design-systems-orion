import type { Meta, StoryObj } from "@storybook/react";
import { Box, CheckSquare } from "lucide-react";
import * as React from "react";

import type { TreeNode } from "./filterable-tree-list";
import { FilterableTreeList } from "./filterable-tree-list";

const meta: Meta<typeof FilterableTreeList> = {
	title: "Blocks/FilterableTreeList",
	component: FilterableTreeList,
};

export default meta;

type Story = StoryObj<typeof FilterableTreeList>;

const NODES: TreeNode[] = [
	{
		id: "epic-1",
		title: "Épico A",
		icon: Box,
		meta: "2 itens",
		children: [
			{ id: "story-1", title: "História 1", icon: CheckSquare, meta: "1 subtask" },
			{ id: "story-2", title: "História 2", icon: CheckSquare },
		],
	},
];

export const Default: Story = {
	render: () => {
		const [openIds, setOpenIds] = React.useState(new Set<string>());
		return (
			<FilterableTreeList
				nodes={NODES}
				openIds={openIds}
				onToggle={(id) =>
					setOpenIds((prev) => {
						const next = new Set(prev);
						next.has(id) ? next.delete(id) : next.add(id);
						return next;
					})
				}
				onSelectNode={(node) => console.log("detalhes", node)}
			/>
		);
	},
};
