import type { Meta, StoryObj } from "@storybook/react";

import { GanttChart } from "./gantt-chart";

const meta: Meta<typeof GanttChart> = {
	title: "Blocks/GanttChart",
	component: GanttChart,
};

export default meta;

type Story = StoryObj<typeof GanttChart>;

export const Default: Story = {
	args: {
		rangeStart: new Date(2026, 0, 1),
		rangeEnd: new Date(2026, 11, 1),
		todayDate: new Date(2026, 6, 20),
		rows: [
			{ id: "1", label: "Épico A", startDate: "2026-01-15", endDate: "2026-04-10", tone: "info" },
			{
				id: "2",
				label: "Épico B",
				startDate: "2026-03-01",
				endDate: "2026-07-20",
				tone: "success",
			},
			{
				id: "3",
				label: "Épico C",
				startDate: "2026-08-01",
				endDate: "2026-11-30",
				tone: "warning",
			},
		],
	},
};
