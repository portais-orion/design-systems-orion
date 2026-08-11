import { Button } from "@design-systems-orion/ui";
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

const TabelaConteudo = (p: { data?: Registro[] }) => (
	<DataTable data={p.data ?? dados} columns={colunas} keyExtractor={(r) => r.id}>
		<DataTable.Card>
			<DataTable.Empty />
			<DataTable.Content />
		</DataTable.Card>
	</DataTable>
);

export const Default: Story = {
	render: () => (
		<ListPageLayout>
			<Cabecalho />
			<ListPageLayout.Content>
				<TabelaConteudo />
			</ListPageLayout.Content>
		</ListPageLayout>
	),
};

export const WithStats: Story = {
	render: () => (
		<ListPageLayout>
			<Cabecalho />
			<StatusCards columns={2}>
				<StatusCards.Item>
					<StatusCards.Icon as={FileText} />
					<StatusCards.Content>
						<StatusCards.Label>Total</StatusCards.Label>
						<StatusCards.Value>128</StatusCards.Value>
					</StatusCards.Content>
				</StatusCards.Item>
				<StatusCards.Item tone="warning">
					<StatusCards.Icon as={Clock} />
					<StatusCards.Content>
						<StatusCards.Label>Pendentes</StatusCards.Label>
						<StatusCards.Value>12</StatusCards.Value>
					</StatusCards.Content>
				</StatusCards.Item>
			</StatusCards>
			<ListPageLayout.Content>
				<TabelaConteudo />
			</ListPageLayout.Content>
		</ListPageLayout>
	),
};

export const WithToolbar: Story = {
	render: function ComToolbar() {
		const [busca, setBusca] = React.useState("");
		return (
			<ListPageLayout>
				<Cabecalho />
				<SearchBar className="w-72" value={busca} onChange={setBusca} />
				<ListPageLayout.Content>
					<TabelaConteudo data={dados.filter((d) => d.nome.includes(busca))} />
				</ListPageLayout.Content>
			</ListPageLayout>
		);
	},
};

export const WithFilters: Story = {
	render: () => (
		<ListPageLayout>
			<Cabecalho />
			<ListPageLayout.Filters>
				<FilterPill label="Status" value="Ativo" onRemove={() => {}} />
				<FilterPill label="Período" value="Jul/2026" onRemove={() => {}} />
			</ListPageLayout.Filters>
			<ListPageLayout.Content>
				<TabelaConteudo />
			</ListPageLayout.Content>
		</ListPageLayout>
	),
};

export const WithDataTable: Story = {
	render: () => (
		<ListPageLayout>
			<Cabecalho />
			<ListPageLayout.Content>
				<TabelaConteudo />
			</ListPageLayout.Content>
		</ListPageLayout>
	),
};

export const LoadingTable: Story = {
	render: () => (
		<ListPageLayout>
			<Cabecalho />
			<ListPageLayout.Content loading>
				<TabelaConteudo />
			</ListPageLayout.Content>
		</ListPageLayout>
	),
};

export const EmptyTable: Story = {
	render: () => (
		<ListPageLayout>
			<Cabecalho />
			<ListPageLayout.Content>
				<TabelaConteudo data={[]} />
			</ListPageLayout.Content>
		</ListPageLayout>
	),
};

export const SurfaceCard: Story = {
	render: () => (
		<ListPageLayout>
			<Cabecalho />
			<ListPageLayout.Card>
				<ListPageLayout.Filters>
					<FilterPill label="Status" value="Ativo" onRemove={() => {}} />
					<FilterPill label="Período" value="Jul/2026" onRemove={() => {}} />
				</ListPageLayout.Filters>
				<ListPageLayout.Content>
					<TabelaConteudo />
				</ListPageLayout.Content>
				<ListPageLayout.Footer>
					<span className="text-sm text-muted-foreground">6 registros</span>
				</ListPageLayout.Footer>
			</ListPageLayout.Card>
		</ListPageLayout>
	),
};

export const SurfaceCardLoading: Story = {
	render: () => (
		<ListPageLayout>
			<Cabecalho />
			<ListPageLayout.Card>
				<ListPageLayout.Content loading loadingLabel="Carregando registros...">
					<TabelaConteudo />
				</ListPageLayout.Content>
			</ListPageLayout.Card>
		</ListPageLayout>
	),
};
