import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

import type { NestedToggleGroup } from "./nested-toggle-accordion-list";
import { NestedToggleAccordionList } from "./nested-toggle-accordion-list";

const meta: Meta<typeof NestedToggleAccordionList> = {
	title: "Blocks/NestedToggleAccordionList",
	component: NestedToggleAccordionList,
};

export default meta;

type Story = StoryObj<typeof NestedToggleAccordionList>;

export const Default: Story = {
	render: () => {
		const [expandedIds, setExpandedIds] = React.useState(new Set(["mod-1"]));
		const groups: NestedToggleGroup[] = [
			{
				id: "mod-1",
				title: "Gestão de Demandas",
				enabled: true,
				activeCount: 2,
				totalCount: 3,
				onToggleEnabled: () => {},
				sections: [
					{
						id: "sec-1",
						title: "Sub-páginas no Sidebar",
						items: [
							{ id: "a", label: "Demandas", checked: true, onToggle: () => {} },
							{
								id: "b",
								label: "Registrar Demanda",
								checked: true,
								originBadges: [{ label: "Perfil: Operador", tone: "info" }],
								onToggle: () => {},
							},
							{ id: "c", label: "Relatórios", checked: false, onToggle: () => {} },
						],
					},
				],
			},
			{
				id: "mod-2",
				title: "Governança",
				enabled: false,
				activeCount: 0,
				totalCount: 0,
				onToggleEnabled: () => {},
				sections: [],
			},
		];

		return (
			<NestedToggleAccordionList
				groups={groups}
				expandedIds={expandedIds}
				onToggleExpand={(id) =>
					setExpandedIds((prev) => {
						const next = new Set(prev);
						next.has(id) ? next.delete(id) : next.add(id);
						return next;
					})
				}
			/>
		);
	},
};
