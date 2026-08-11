import {
	Badge,
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@design-systems-orion/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { Download, Eye, MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react";
import * as React from "react";
import { CodeBadge } from "../code-badge";
import { FilterPill } from "../filter-pill";
import { PageHeader } from "../page-header";
import { SearchBar } from "../search-bar";
import { StatusCards } from "../status-cards";
import { StatusDot } from "../status-dot";
import { DataTable } from "./data-table";
import type { DataTableColumn } from "./data-table.types";

const meta: Meta<typeof DataTable> = {
	title: "Blocks/DataTable",
	component: DataTable,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DataTable>;

// dados genéricos

type Processo = {
	id: string;
	codigo: string;
	descricao: string;
	responsavel: string;
	status: "pendente" | "em_andamento" | "concluido" | "bloqueado";
	quantidade: number;
	valor: number;
	criadoEm: string;
};

const STATUS_LABEL: Record<
	Processo["status"],
	{ label: string; tone: "warning" | "info" | "success" | "danger" }
> = {
	pendente: { label: "Pendente", tone: "warning" },
	em_andamento: { label: "Em andamento", tone: "info" },
	concluido: { label: "Concluído", tone: "success" },
	bloqueado: { label: "Bloqueado", tone: "danger" },
};

const fmtBR = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2 });

const PROCESSOS: Processo[] = Array.from({ length: 12 }).map((_, i) => ({
	id: `p-${i + 1}`,
	codigo: `PRC-${String(i + 1).padStart(3, "0")}`,
	descricao:
		["Conferência de documentos", "Registro de entrada", "Análise técnica", "Liberação"][i % 4] ??
		"Conferência de documentos",
	responsavel: ["Ana Souza", "Carlos Lima", "Beatriz Nunes"][i % 3] ?? "Ana Souza",
	status: (["pendente", "em_andamento", "concluido", "bloqueado"] as const)[i % 4] ?? "pendente",
	quantidade: (i + 1) * 3,
	valor: (i + 1) * 1250.5,
	criadoEm: `2026-06-${String((i % 28) + 1).padStart(2, "0")}`,
}));

const columns: DataTableColumn<Processo>[] = [
	{ header: "Código", cell: (row: Processo) => <CodeBadge>{row.codigo}</CodeBadge>, width: 110 },
	{ header: "Descrição", accessorKey: "descricao" },
	{ header: "Responsável", accessorKey: "responsavel" },
	{
		header: "Status",
		cell: (row: Processo) => (
			<StatusDot tone={STATUS_LABEL[row.status].tone} label={STATUS_LABEL[row.status].label} />
		),
	},
	{ header: "Qtd.", accessorKey: "quantidade", align: "right", width: 80 },
	{
		header: "Valor (R$)",
		cell: (row: Processo) => fmtBR.format(row.valor),
		align: "right",
	},
];

// stories

export const Default: Story = {
	render: () => (
		<DataTable data={PROCESSOS.slice(0, 6)} columns={columns} keyExtractor={(r: Processo) => r.id}>
			<DataTable.Card>
				<DataTable.Empty />
				<DataTable.Content />
			</DataTable.Card>
		</DataTable>
	),
};

export const Loading: Story = {
	render: () => (
		<DataTable data={[]} columns={columns} keyExtractor={(r: Processo) => r.id} isLoading>
			<DataTable.Card>
				<DataTable.Empty />
				<DataTable.Content loadingRows={5} />
			</DataTable.Card>
		</DataTable>
	),
};

export const Empty: Story = {
	render: () => (
		<DataTable data={[]} columns={columns} keyExtractor={(r: Processo) => r.id}>
			<DataTable.Card>
				<DataTable.Empty
					title="Nenhum processo encontrado"
					description="Ajuste os filtros ou crie um novo processo."
					action={
						<Button size="sm">
							<Plus /> Novo processo
						</Button>
					}
				/>
				<DataTable.Content />
			</DataTable.Card>
		</DataTable>
	),
};

export const ErrorStory: Story = {
	name: "Error",
	render: () => (
		<DataTable data={[]} columns={columns} keyExtractor={(r: Processo) => r.id} isError>
			<DataTable.Card>
				<DataTable.Error
					title="Não foi possível carregar os processos"
					description="Tente novamente em alguns instantes."
					action={
						<Button variant="outline" size="sm">
							Tentar novamente
						</Button>
					}
				/>
				<DataTable.Content />
			</DataTable.Card>
		</DataTable>
	),
};

export const WithPagination: Story = {
	render: function Paginado() {
		const [page, setPage] = React.useState(1);
		const [limit, setLimit] = React.useState(5);
		const start = (page - 1) * limit;
		return (
			<DataTable
				data={PROCESSOS.slice(start, start + limit)}
				columns={columns}
				keyExtractor={(r: Processo) => r.id}
			>
				<DataTable.Card>
					<DataTable.Empty />
					<DataTable.Content />
				</DataTable.Card>
				<DataTable.Pagination
					page={page}
					limit={limit}
					total={PROCESSOS.length}
					limitOptions={[5, 10, 20]}
					onPageChange={setPage}
					onLimitChange={setLimit}
				/>
			</DataTable>
		);
	},
};

export const WithActions: Story = {
	render: () => (
		<DataTable
			data={PROCESSOS.slice(0, 5)}
			columns={columns}
			keyExtractor={(r: Processo) => r.id}
			actions={(row: Processo) => (
				<DropdownMenu>
					<DropdownMenuTrigger
						render={
							<Button variant="ghost" size="icon-sm" aria-label={`Ações de ${row.codigo}`}>
								<MoreHorizontal />
							</Button>
						}
					/>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>
							<Eye /> Visualizar
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Pencil /> Editar
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<Trash2 /> Excluir
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)}
		>
			<DataTable.Card>
				<DataTable.Empty />
				<DataTable.Content onRowClick={() => {}} />
			</DataTable.Card>
		</DataTable>
	),
};

export const WithRowClick: Story = {
	render: function ComClique() {
		const [selecionado, setSelecionado] = React.useState<string>();
		return (
			<div className="space-y-2">
				<p className="text-sm text-muted-foreground">
					Selecionado: {selecionado ?? "nenhum (clique numa linha)"}
				</p>
				<DataTable
					data={PROCESSOS.slice(0, 5)}
					columns={columns}
					keyExtractor={(r: Processo) => r.id}
				>
					<DataTable.Card>
						<DataTable.Empty />
						<DataTable.Content
							onRowClick={(row: Processo) => setSelecionado(row.codigo)}
							rowClassName={(row: Processo) =>
								row.codigo === selecionado ? "bg-primary/5" : undefined
							}
							getRowDisabled={(row: Processo) => row.status === "bloqueado"}
						/>
					</DataTable.Card>
				</DataTable>
			</div>
		);
	},
};

export const WithToolbar: Story = {
	render: function ComToolbar() {
		const [busca, setBusca] = React.useState("");
		const dados = PROCESSOS.filter((p) =>
			`${p.codigo} ${p.descricao}`.toLowerCase().includes(busca.toLowerCase()),
		);
		return (
			<DataTable data={dados} columns={columns} keyExtractor={(r: Processo) => r.id}>
				<DataTable.Card>
					<DataTable.Toolbar>
						<div className="flex flex-wrap items-center gap-3">
							<SearchBar
								className="w-72"
								value={busca}
								onChange={setBusca}
								placeholder="Buscar processo..."
							/>
							<FilterPill label="Período" value="Jun/2026" onRemove={() => {}} />
						</div>
					</DataTable.Toolbar>
					<DataTable.Empty title="Nenhum resultado para a busca" />
					<DataTable.Content />
				</DataTable.Card>
			</DataTable>
		);
	},
};

export const WithSorting: Story = {
	render: function Ordenavel() {
		const [sortBy, setSortBy] = React.useState<string>("codigo");
		const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");
		// sorting é controlado (server-side na prática); aqui simulamos externamente
		const dados = [...PROCESSOS.slice(0, 8)].sort((a, b) => {
			const va = String(a[sortBy as keyof Processo] ?? "");
			const vb = String(b[sortBy as keyof Processo] ?? "");
			return sortOrder === "asc" ? va.localeCompare(vb, "pt-BR") : vb.localeCompare(va, "pt-BR");
		});
		const cols: DataTableColumn<Processo>[] = [
			{ id: "codigo", header: "Código", accessorKey: "codigo", sortable: true, width: 110 },
			{ id: "descricao", header: "Descrição", accessorKey: "descricao", sortable: true },
			{ id: "responsavel", header: "Responsável", accessorKey: "responsavel", sortable: true },
			{ header: "Qtd.", accessorKey: "quantidade", align: "right" },
		];
		return (
			<DataTable
				data={dados}
				columns={cols}
				keyExtractor={(r: Processo) => r.id}
				sorting={{
					sortBy,
					sortOrder,
					onSortChange: (by, order) => {
						setSortBy(by);
						setSortOrder(order);
					},
				}}
			>
				<DataTable.Card>
					<DataTable.Empty />
					<DataTable.Content />
				</DataTable.Card>
			</DataTable>
		);
	},
};

export const DenseOperationalExample: Story = {
	render: () => {
		const totalQtd = PROCESSOS.reduce((s, p) => s + p.quantidade, 0);
		const totalValor = PROCESSOS.reduce((s, p) => s + p.valor, 0);
		return (
			<DataTable
				data={PROCESSOS}
				columns={[
					...columns,
					{ header: "Criado em", accessorKey: "criadoEm", align: "center", width: 110 },
				]}
				keyExtractor={(r: Processo) => r.id}
			>
				<DataTable.Card>
					<DataTable.Empty />
					<DataTable.Content />
					<DataTable.Footer>
						<div className="flex justify-end gap-8 px-4 py-3 text-sm">
							<span className="text-muted-foreground">
								Qtd. total: <span className="font-semibold text-foreground">{totalQtd}</span>
							</span>
							<span className="text-muted-foreground">
								Valor total:{" "}
								<span className="font-semibold text-foreground">R$ {fmtBR.format(totalValor)}</span>
							</span>
						</div>
					</DataTable.Footer>
				</DataTable.Card>
			</DataTable>
		);
	},
};

export const SupertransInspiredExample: Story = {
	name: "Exemplo inspirado no Supertrans (cadastros)",
	render: function Cadastros() {
		const [page, setPage] = React.useState(1);
		return (
			<div className="space-y-4">
				<PageHeader
					title="Cadastro de registros"
					description="Tabela administrativa com código, status binário e ações."
					actions={
						<Button>
							<Plus /> Novo registro
						</Button>
					}
				/>
				<DataTable
					data={PROCESSOS.slice((page - 1) * 5, page * 5)}
					columns={[
						{
							header: "Código",
							cell: (r: Processo) => <CodeBadge>{r.codigo}</CodeBadge>,
							width: 110,
						},
						{ header: "Nome", accessorKey: "descricao" },
						{
							header: "Situação",
							cell: (r: Processo) =>
								r.status === "concluido" ? (
									<StatusDot tone="success" label="Ativo" />
								) : (
									<StatusDot tone="muted" label="Inativo" />
								),
						},
						{ header: "Em uso", accessorKey: "quantidade", align: "right", width: 90 },
					]}
					keyExtractor={(r: Processo) => r.id}
					actions={(r: Processo) => (
						<Button variant="ghost" size="icon-sm" aria-label={`Editar ${r.codigo}`}>
							<Pencil />
						</Button>
					)}
				>
					<DataTable.Card>
						<DataTable.Empty />
						<DataTable.Content />
					</DataTable.Card>
					<DataTable.Pagination
						page={page}
						limit={5}
						total={PROCESSOS.length}
						onPageChange={setPage}
					/>
				</DataTable>
			</div>
		);
	},
};

export const AuroraInspiredExample: Story = {
	name: "Exemplo inspirado no Aurora (operacional)",
	render: function Operacional() {
		const [status, setStatus] = React.useState<string>("Todos");
		const dados =
			status === "Todos"
				? PROCESSOS
				: PROCESSOS.filter((p) => STATUS_LABEL[p.status].label === status);
		const contagem = (s: Processo["status"]) => PROCESSOS.filter((p) => p.status === s).length;
		return (
			<div className="space-y-4">
				<StatusCards columns={4}>
					<StatusCards.Item onClick={() => setStatus("Todos")} active={status === "Todos"}>
						<StatusCards.Content>
							<StatusCards.Label>Todos</StatusCards.Label>
							<StatusCards.Value>{PROCESSOS.length}</StatusCards.Value>
						</StatusCards.Content>
					</StatusCards.Item>
					<StatusCards.Item
						tone="warning"
						onClick={() => setStatus("Pendente")}
						active={status === "Pendente"}
					>
						<StatusCards.Content>
							<StatusCards.Label>Pendente</StatusCards.Label>
							<StatusCards.Value>{contagem("pendente")}</StatusCards.Value>
						</StatusCards.Content>
					</StatusCards.Item>
					<StatusCards.Item
						tone="info"
						onClick={() => setStatus("Em andamento")}
						active={status === "Em andamento"}
					>
						<StatusCards.Content>
							<StatusCards.Label>Em andamento</StatusCards.Label>
							<StatusCards.Value>{contagem("em_andamento")}</StatusCards.Value>
						</StatusCards.Content>
					</StatusCards.Item>
					<StatusCards.Item
						tone="success"
						onClick={() => setStatus("Concluído")}
						active={status === "Concluído"}
					>
						<StatusCards.Content>
							<StatusCards.Label>Concluído</StatusCards.Label>
							<StatusCards.Value>{contagem("concluido")}</StatusCards.Value>
						</StatusCards.Content>
					</StatusCards.Item>
				</StatusCards>
				<DataTable data={dados} columns={columns} keyExtractor={(r: Processo) => r.id}>
					<DataTable.Card>
						<DataTable.Toolbar>
							<div className="flex items-center justify-between gap-3">
								<span className="text-sm text-muted-foreground">{dados.length} processo(s)</span>
								<Button variant="outline" size="sm">
									<Download /> Exportar
								</Button>
							</div>
						</DataTable.Toolbar>
						<DataTable.Empty />
						<DataTable.Content onRowClick={() => {}} />
					</DataTable.Card>
				</DataTable>
			</div>
		);
	},
};
