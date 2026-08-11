import { Avatar, AvatarFallback, Badge, Button, Input } from "@design-systems-orion/ui";
import type { Meta, StoryObj } from "@storybook/react";
import {
	CheckCircle,
	Clock,
	FileText,
	FolderOpen,
	Home,
	Plus,
	Settings,
	Users,
} from "lucide-react";
import * as React from "react";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import { CodeBadge } from "../code-badge";
import { ContentCard } from "../content-card";
import { DashboardPageLayout } from "../dashboard-page-layout";
import { DataTable } from "../data-table";
import { DetailPageLayout } from "../detail-page-layout";
import { FieldGroup } from "../field-group";
import { FormActions } from "../form-actions";
import { FormField } from "../form-field";
import { FormPageLayout } from "../form-page-layout";
import { FormSection } from "../form-section";
import { ListPageLayout } from "../list-page-layout";
import type { NavigationItem } from "../navigation";
import { PageHeader } from "../page-header";
import { SearchBar } from "../search-bar";
import { Sidebar } from "../sidebar";
import { StatusCards } from "../status-cards";
import { StatusDot } from "../status-dot";
import { AppShell } from "./app-shell";

const meta: Meta<typeof AppShell> = {
	title: "Blocks/Chrome/AppShell",
	component: AppShell,
	tags: ["autodocs"],
	parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof AppShell>;

const Marca = () => <span className="text-sm font-bold tracking-wide">NÚCLEO</span>;

const NAV: NavigationItem[] = [
	{ id: "inicio", label: "Início", href: "#", icon: Home },
	{ id: "registros", label: "Registros", href: "#", icon: FileText },
	{
		id: "cadastros",
		label: "Cadastros",
		icon: FolderOpen,
		children: [
			{ id: "cadastros-tipos", label: "Tipos", href: "#" },
			{ id: "cadastros-categorias", label: "Categorias", href: "#" },
		],
	},
	{
		id: "usuarios",
		label: "Usuários",
		href: "#",
		icon: Users,
		meta: { requiredPermission: "admin.only" },
	},
	{ id: "config", label: "Configurações", href: "#", icon: Settings },
];

const TRILHA = [
	{ label: "Início", href: "#" },
	{ label: "Registros", current: true },
];

const Rodape = () => (
	<div className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5">
		<Avatar className="size-7">
			<AvatarFallback>MA</AvatarFallback>
		</Avatar>
		<span className="truncate text-xs">usuario@exemplo.dev</span>
	</div>
);

type Registro = {
	id: string;
	codigo: string;
	nome: string;
	status: "ativo" | "pendente";
	qtd: number;
};
const REGISTROS: Registro[] = Array.from({ length: 7 }).map((_, i) => ({
	id: `r-${i + 1}`,
	codigo: `REG-${String(i + 1).padStart(3, "0")}`,
	nome: `Registro ${i + 1}`,
	status: i % 3 === 0 ? "pendente" : "ativo",
	qtd: (i + 1) * 4,
}));
const COLS = [
	{ header: "Código", cell: (r: Registro) => <CodeBadge>{r.codigo}</CodeBadge>, width: 110 },
	{ header: "Nome", accessorKey: "nome" as const },
	{
		header: "Status",
		cell: (r: Registro) =>
			r.status === "ativo" ? (
				<StatusDot tone="success" label="Ativo" />
			) : (
				<StatusDot tone="warning" label="Pendente" />
			),
	},
	{ header: "Qtd.", accessorKey: "qtd" as const, align: "right" as const, width: 80 },
];

const Miolo = () => (
	<ContentCard title="Conteúdo" className="m-6">
		<p className="text-sm text-muted-foreground">O miolo da página entra como children.</p>
	</ContentCard>
);

export const Default: Story = {
	render: () => (
		<AppShell
			sidebar={{ brand: <Marca />, navigation: NAV, activeItemId: "registros" }}
		>
			<Miolo />
		</AppShell>
	),
};

export const WithBreadcrumbs: Story = {
	render: () => (
		<AppShell
			breadcrumbs={TRILHA}
			sidebar={{ brand: <Marca />, navigation: NAV, activeItemId: "registros" }}
		>
			<Miolo />
		</AppShell>
	),
};

export const Collapsed: Story = {
	render: () => (
		<AppShell
			breadcrumbs={TRILHA}
			defaultCollapsed
			sidebar={{ brand: <Marca />, navigation: NAV, activeItemId: "registros" }}
		>
			<Miolo />
		</AppShell>
	),
};

export const WithFilteredNavigation: Story = {
	render: () => (
		<AppShell
			breadcrumbs={TRILHA}
			sidebar={{
				brand: <Marca />,
				navigation: NAV,
				activeItemId: "registros",
				canAccessItem: (item) => item.meta?.requiredPermission !== "admin.only",
			}}
		>
			<Miolo />
		</AppShell>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await waitFor(() =>
			expect(canvas.getAllByText("Registros").some((node) => node instanceof HTMLElement)).toBe(
				true,
			),
		);
		await expect(canvas.queryByText("Usuários")).toBeNull();
	},
};

export const ControlledCollapsed: Story = {
	render: function Controlado() {
		const [collapsed, setCollapsed] = React.useState(false);
		return (
			<AppShell
				breadcrumbs={TRILHA}
				collapsed={collapsed}
				onCollapsedChange={setCollapsed}
				sidebar={{ brand: <Marca />, navigation: NAV, activeItemId: "registros" }}
			>
				<div className="m-6 space-y-3">
					<Button variant="outline" onClick={() => setCollapsed((c) => !c)}>
						Alternar colapso de fora do shell
					</Button>
					<Miolo />
				</div>
			</AppShell>
		);
	},
};

/**
 * Escape hatch: quem precisa de outra navegação monta a sua com
 * `renderSidebar` e recebe o colapso já resolvido pelo shell.
 */
export const CustomSidebar: Story = {
	render: () => (
		<AppShell
			breadcrumbs={TRILHA}
			renderSidebar={(props) => (
				<Sidebar
					brand={<Marca />}
					navigation={NAV}
					activeItemId="registros"
					collapsed={props.collapsed}
					onCollapsedChange={props.onCollapsedChange}
					collapsible={props.collapsible}
					onNavigate={props.onNavigate}
				/>
			)}
		>
			<Miolo />
		</AppShell>
	),
};

export const MobileNavigation: Story = {
	name: "MobileNavigation (viewport mobile)",
	globals: { viewport: { value: "mobile1" } },
	render: () => (
		<AppShell
			breadcrumbs={TRILHA}
			sidebar={{ brand: <Marca />, navigation: NAV, activeItemId: "registros" }}
		>
			<Miolo />
		</AppShell>
	),
};

// Stories integradas (Parte H)

export const AppShellWithListPage: Story = {
	render: function Lista() {
		const [busca, setBusca] = React.useState("");
		const [page, setPage] = React.useState(1);
		const dados = REGISTROS.filter((r) => r.nome.toLowerCase().includes(busca.toLowerCase()));
		return (
			<AppShell
				breadcrumbs={TRILHA}
				sidebar={{
					brand: <Marca />,
					navigation: NAV,
					activeItemId: "registros",
					footer: <Rodape />,
				}}
			>
				<ListPageLayout>
					<PageHeader
						title="Registros"
						description="Gerencie os registros e acompanhe seus status."
						actions={
							<Button onClick={fn()}>
								<Plus /> Novo registro
							</Button>
						}
					/>
					<StatusCards columns={3}>
						<StatusCards.Item>
							<StatusCards.Icon as={FileText} />
							<StatusCards.Content>
								<StatusCards.Label>Total</StatusCards.Label>
								<StatusCards.Value>{REGISTROS.length}</StatusCards.Value>
							</StatusCards.Content>
						</StatusCards.Item>
						<StatusCards.Item tone="success">
							<StatusCards.Icon as={CheckCircle} />
							<StatusCards.Content>
								<StatusCards.Label>Ativos</StatusCards.Label>
								<StatusCards.Value>
									{REGISTROS.filter((r) => r.status === "ativo").length}
								</StatusCards.Value>
							</StatusCards.Content>
						</StatusCards.Item>
						<StatusCards.Item tone="warning">
							<StatusCards.Icon as={Clock} />
							<StatusCards.Content>
								<StatusCards.Label>Pendentes</StatusCards.Label>
								<StatusCards.Value>
									{REGISTROS.filter((r) => r.status === "pendente").length}
								</StatusCards.Value>
							</StatusCards.Content>
						</StatusCards.Item>
					</StatusCards>
					<SearchBar className="w-72" value={busca} onChange={setBusca} />
					<ListPageLayout.Content>
						<DataTable
							data={dados.slice((page - 1) * 5, page * 5)}
							columns={COLS}
							keyExtractor={(r) => r.id}
						>
							<DataTable.Card>
								<DataTable.Empty />
								<DataTable.Content onRowClick={fn()} />
							</DataTable.Card>
							<DataTable.Pagination
								page={page}
								limit={5}
								total={dados.length}
								onPageChange={setPage}
							/>
						</DataTable>
					</ListPageLayout.Content>
				</ListPageLayout>
			</AppShell>
		);
	},
};

export const AppShellWithFormPage: Story = {
	render: () => (
		<AppShell
			breadcrumbs={[
				...TRILHA.slice(0, 1),
				{ label: "Registros", href: "#" },
				{ label: "Novo", current: true },
			]}
			sidebar={{ brand: <Marca />, navigation: NAV, activeItemId: "registros" }}
		>
			<FormPageLayout>
				<PageHeader title="Novo registro" />
				<FormPageLayout.Content>
					<form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
						<FormSection title="Dados gerais">
							<FieldGroup columns={2}>
								<FormField label="Nome" htmlFor="as-nome" required>
									<Input id="as-nome" />
								</FormField>
								<FormField label="Código" htmlFor="as-cod">
									<Input id="as-cod" />
								</FormField>
							</FieldGroup>
						</FormSection>
						<FormActions
							primary={<Button onClick={fn()}>Salvar</Button>}
							secondary={
								<Button variant="outline" onClick={fn()}>
									Cancelar
								</Button>
							}
						/>
					</form>
				</FormPageLayout.Content>
			</FormPageLayout>
		</AppShell>
	),
};

export const AppShellWithDetailPage: Story = {
	render: () => (
		<AppShell
			breadcrumbs={[
				...TRILHA.slice(0, 1),
				{ label: "Registros", href: "#" },
				{ label: "REG-003", current: true },
			]}
			sidebar={{ brand: <Marca />, navigation: NAV, activeItemId: "registros" }}
		>
			<DetailPageLayout>
				<PageHeader eyebrow="Registros" title="Registro REG-003" />
				<DetailPageLayout.Content>
					<ContentCard title="Resumo">
						<div className="flex flex-wrap items-center gap-4 text-sm">
							<CodeBadge>REG-003</CodeBadge>
							<StatusDot tone="success" label="Ativo" />
							<Badge variant="secondary">Categoria A</Badge>
						</div>
					</ContentCard>
					<DataTable data={REGISTROS.slice(0, 4)} columns={COLS} keyExtractor={(r) => r.id}>
						<DataTable.Card>
							<DataTable.Empty />
							<DataTable.Content />
						</DataTable.Card>
					</DataTable>
				</DetailPageLayout.Content>
			</DetailPageLayout>
		</AppShell>
	),
};

export const AppShellWithDashboardPage: Story = {
	render: () => (
		<AppShell
			breadcrumbs={[{ label: "Início", current: true }]}
			sidebar={{ brand: <Marca />, navigation: NAV, activeItemId: "inicio" }}
		>
			<DashboardPageLayout
				header={<PageHeader title="Painel operacional" />}
				stats={
					<StatusCards columns={3}>
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
						<StatusCards.Item tone="success">
							<StatusCards.Icon as={CheckCircle} />
							<StatusCards.Content>
								<StatusCards.Label>Concluídos</StatusCards.Label>
								<StatusCards.Value>98</StatusCards.Value>
							</StatusCards.Content>
						</StatusCards.Item>
					</StatusCards>
				}
				content={
					<div className="grid gap-6 lg:grid-cols-2">
						<ContentCard title="Últimos registros">
							<DataTable
								data={REGISTROS.slice(0, 5)}
								columns={COLS.slice(0, 2)}
								keyExtractor={(r) => r.id}
							>
								<DataTable.Card>
									<DataTable.Empty />
									<DataTable.Content />
								</DataTable.Card>
							</DataTable>
						</ContentCard>
						<ContentCard title="Distribuição">
							<div className="flex h-64 items-center justify-center rounded bg-muted/40 text-sm text-muted-foreground">
								área reservada para gráfico
							</div>
						</ContentCard>
					</div>
				}
			/>
		</AppShell>
	),
};
