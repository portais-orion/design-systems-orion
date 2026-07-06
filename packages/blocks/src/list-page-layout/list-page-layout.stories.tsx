import { Button } from "@portais-orion/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { Clock, FileText, Plus } from "lucide-react";
import * as React from "react";
import { DataTable } from "../data-table";
import { FilterPill } from "../filter-pill";
import { PageHeader } from "../page-header";
import { SearchBar } from "../search-bar";
import { StatusCards } from "../status-cards";
import { ListPageLayout } from "./list-page-layout";

const meta: Meta<typeof ListPageLayout> = {
	title: "Blocks/Layouts/ListPageLayout",
	component: ListPageLayout,
	tags: ["autodocs"],
	parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof ListPageLayout>;

type Registro = { id: string; nome: string; qtd: number };
const dados: Registro[] = Array.from({ length: 6 }).map((_, i) => ({
	id: `r-${i + 1}`,
	nome: `Registro ${i + 1}`,
	qtd: (i + 1) * 3,
}));
const colunas = [
	{ header: "Nome", accessorKey: "nome" as const },
	{ header: "Qtd.", accessorKey: "qtd" as const, align: "right" as const },
];
const Cabecalho = () => (
	<PageHeader
		title="Registros"
		actions={
			<Button>
				<Plus /> Novo
			</Button>
		}
	/>
);
const Tabela = (p: { data?: Registro[]; isLoading?: boolean }) => (
	<DataTable
		data={p.data ?? dados}
		isLoading={p.isLoading}
		columns={colunas}
		keyExtractor={(r) => r.id}
	/>
);

export const Default: Story = {
	render: () => <ListPageLayout header={<Cabecalho />} content={<Tabela />} />,
};

export const WithStats: Story = {
	render: () => (
		<ListPageLayout
			header={<Cabecalho />}
			stats={
				<StatusCards
					items={[
						{ label: "Total", value: 128, icon: FileText },
						{ label: "Pendentes", value: 12, icon: Clock, tone: "warning" },
					]}
					columns={2}
				/>
			}
			content={<Tabela />}
		/>
	),
};

export const WithToolbar: Story = {
	render: function ComToolbar() {
		const [busca, setBusca] = React.useState("");
		return (
			<ListPageLayout
				header={<Cabecalho />}
				toolbar={<SearchBar className="w-72" value={busca} onChange={setBusca} />}
				content={<Tabela data={dados.filter((d) => d.nome.includes(busca))} />}
			/>
		);
	},
};

export const WithFilters: Story = {
	render: () => (
		<ListPageLayout
			header={<Cabecalho />}
			filters={
				<>
					<FilterPill label="Status" value="Ativo" onRemove={() => {}} />
					<FilterPill label="PerÃ­odo" value="Jul/2026" onRemove={() => {}} />
				</>
			}
			content={<Tabela />}
		/>
	),
};

export const WithDataTable: Story = {
	render: () => <ListPageLayout header={<Cabecalho />} content={<Tabela />} />,
};

export const LoadingTable: Story = {
	render: () => <ListPageLayout header={<Cabecalho />} content={<Tabela isLoading />} />,
};

export const EmptyTable: Story = {
	render: () => <ListPageLayout header={<Cabecalho />} content={<Tabela data={[]} />} />,
};
