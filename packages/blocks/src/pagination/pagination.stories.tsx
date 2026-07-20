import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Pagination } from "./pagination";

const meta: Meta<typeof Pagination> = {
	title: "Blocks/Pagination",
	component: Pagination,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Pagination>;

function Demo({ total = 137 }: { total?: number }) {
	const [page, setPage] = React.useState(1);
	const [limit, setLimit] = React.useState(20);
	return (
		<Pagination
			page={page}
			limit={limit}
			total={total}
			onPageChange={setPage}
			onLimitChange={setLimit}
		/>
	);
}

export const Default: Story = { render: () => <Demo /> };

export const SemTrocaDeLimite: Story = {
	render: function SemLimite() {
		const [page, setPage] = React.useState(3);
		return <Pagination page={page} limit={10} total={57} onPageChange={setPage} />;
	},
};

export const PaginaUnica: Story = {
	render: () => <Pagination page={1} limit={20} total={8} onPageChange={() => {}} />,
};

export const TotalZeroNaoRenderiza: Story = {
	render: () => (
		<div className="text-sm text-muted-foreground">
			<Pagination page={1} limit={20} total={0} onPageChange={() => {}} />
			(total=0 → o componente não renderiza nada, comportamento default)
		</div>
	),
};

export const TotalZeroVisivel: Story = {
	render: () => (
		<Pagination
			page={1}
			limit={20}
			total={0}
			itemLabel="clientes"
			showWhenEmpty
			onPageChange={() => {}}
		/>
	),
};
