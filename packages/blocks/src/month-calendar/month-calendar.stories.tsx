import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

import { StatusDot } from "../status-dot";
import { type CalendarDayBadge, MonthCalendar } from "./month-calendar";

const meta: Meta<typeof MonthCalendar> = {
	title: "Blocks/MonthCalendar",
	component: MonthCalendar,
};

export default meta;

type Story = StoryObj<typeof MonthCalendar>;

const SAMPLE_MONTH = new Date(2026, 5, 1); // Junho/2026

const SAMPLE_EVENTS: Record<number, CalendarDayBadge[]> = {
	3: [{ label: "2 Programada", tone: "info" }],
	9: [
		{ label: "1 Realizada", tone: "success" },
		{ label: "1 Pendente", tone: "warning" },
	],
	18: [{ label: "1 Atrasada", tone: "danger" }],
};

function getDayBadges(date: Date): CalendarDayBadge[] {
	return SAMPLE_EVENTS[date.getDate()] ?? [];
}

function isSampleToday(date: Date): boolean {
	return date.getDate() === 9 && date.getMonth() === 5;
}

export const Default: Story = {
	render: () => {
		const [selected, setSelected] = React.useState<Date | null>(null);
		return (
			<MonthCalendar
				month={SAMPLE_MONTH}
				getDayBadges={getDayBadges}
				isToday={isSampleToday}
				selectedDate={selected}
				onSelectDate={setSelected}
				onPrevMonth={() => {}}
				onNextMonth={() => {}}
				legend={
					<>
						<StatusDot tone="success" label="Realizada" />
						<StatusDot tone="info" label="Programada" />
						<StatusDot tone="warning" label="Pendente" />
						<StatusDot tone="danger" label="Atrasada" />
					</>
				}
				footerHint="Clique em um dia para ver as programações."
			/>
		);
	},
};

export const SemNavegacao: Story = {
	render: () => (
		<MonthCalendar month={SAMPLE_MONTH} getDayBadges={getDayBadges} isToday={isSampleToday} />
	),
};
