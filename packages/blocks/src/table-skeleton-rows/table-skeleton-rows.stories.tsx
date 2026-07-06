import { Table, TableBody, TableHead, TableHeader, TableRow } from "@portais-orion/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { TableSkeletonRows } from "./table-skeleton-rows";

const meta: Meta<typeof TableSkeletonRows> = {
	title: "Blocks/TableSkeletonRows",
	component: TableSkeletonRows,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TableSkeletonRows>;

export const Default: Story = {
	render: () => (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>CÃ³digo</TableHead>
					<TableHead>Nome</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Criado em</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableSkeletonRows rows={5} columns={4} />
			</TableBody>
		</Table>
	),
};

export const ComColunaDeAcoes: Story = {
	render: () => (
		<Table>
			<TableBody>
				<TableSkeletonRows rows={3} columns={3} withActionsColumn />
			</TableBody>
		</Table>
	),
};
