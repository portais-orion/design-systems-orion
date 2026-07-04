import {
	Badge,
	Button,
	Combobox,
	Input,
	MultiSelect,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@grupo/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { CheckCircle, Clock, Download, FileText, Pencil, Plus } from "lucide-react";
import * as React from "react";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import { CodeBadge } from "../code-badge";
import { ContentCard } from "../content-card";
import { DashboardPageLayout } from "../dashboard-page-layout";
import { DataTable } from "../data-table";
import { DetailPageLayout } from "../detail-page-layout";
import { FieldGroup } from "../field-group";
import { FilterPill } from "../filter-pill";
import { FormActions } from "../form-actions";
import { FormField } from "../form-field";
import { FormPageLayout } from "../form-page-layout";
import { FormSection } from "../form-section";
import { ListPageLayout } from "../list-page-layout";
import { PageHeader } from "../page-header";
import { SearchBar } from "../search-bar";
import { StatusCards } from "../status-cards";
import { StatusDot } from "../status-dot";

/*
 * Páginas completas genéricas — demonstram o encaixe oficial dos blocks.
 * Dados neutros ("Registro/Processo"); nenhuma API, rota ou permissão.
 */
const meta: Meta = {
	title: "Blocks/Exemplos de Página",
	parameters: { layout: "fullscreen" },
};
export default meta;

type Registro = {
	id: string;
	codigo: string;
	nome: string;
	status: "ativo" | "pendente";
	qtd: number;
};
const REGISTROS: Registro[] = Array.from({ length: 8 }).map((_, i) => ({
	id: `r-${i + 1}`,
	codigo: `REG-${String(i + 1).padStart(3, "0")}`,
	nome: `Registro ${i + 1}`,
	status: i % 3 === 0 ? "pendente" : "ativo",
	qtd: (i + 1) * 4,
}));

export const ListPageExample: StoryObj = {
	render: function Lista() {
		const [busca, setBusca] = React.useState("");
		const [page, setPage] = React.useState(1);
		const dados = REGISTROS.filter((r) => r.nome.toLowerCase().includes(busca.toLowerCase()));
		return (
			<ListPageLayout
				header={
					<PageHeader
						title="Registros"
						description="Gerencie os registros e acompanhe seus status."
						actions={
							<Button onClick={fn()}>
								<Plus /> Novo registro
							</Button>
						}
					/>
				}
				stats={
					<StatusCards
						columns={3}
						items={[
							{ label: "Total", value: REGISTROS.length, icon: FileText },
							{
								label: "Ativos",
								value: REGISTROS.filter((r) => r.status === "ativo").length,
								icon: CheckCircle,
								tone: "success",
							},
							{
								label: "Pendentes",
								value: REGISTROS.filter((r) => r.status === "pendente").length,
								icon: Clock,
								tone: "warning",
							},
						]}
					/>
				}
				toolbar={<SearchBar className="w-72" value={busca} onChange={setBusca} />}
				filters={<FilterPill label="Período" value="Jul/2026" onRemove={fn()} />}
				content={
					<DataTable
						data={dados.slice((page - 1) * 5, page * 5)}
						columns={[
							{ header: "Código", cell: (r) => <CodeBadge>{r.codigo}</CodeBadge>, width: 110 },
							{ header: "Nome", accessorKey: "nome" },
							{
								header: "Status",
								cell: (r) =>
									r.status === "ativo" ? (
										<StatusDot tone="success" label="Ativo" />
									) : (
										<StatusDot tone="warning" label="Pendente" />
									),
							},
							{ header: "Qtd.", accessorKey: "qtd", align: "right", width: 80 },
						]}
						keyExtractor={(r) => r.id}
						onRowClick={fn()}
						pagination={{ page, limit: 5, total: dados.length, onPageChange: setPage }}
						emptyTitle="Nenhum registro para a busca"
					/>
				}
			/>
		);
	},
};

export const FormPageExample: StoryObj = {
	render: function Formulario() {
		const [nome, setNome] = React.useState("");
		const [categoria, setCategoria] = React.useState<string | null>(null);
		const [tags, setTags] = React.useState<string[]>([]);
		const [erros, setErros] = React.useState<{ nome?: string }>({});
		const salvar = fn();
		return (
			<FormPageLayout
				header={<PageHeader title="Novo registro" description="Preencha os dados abaixo." />}
				form={
					<form
						className="space-y-8"
						onSubmit={(e) => {
							e.preventDefault();
							if (!nome.trim()) {
								setErros({ nome: "O nome é obrigatório" });
								return;
							}
							setErros({});
							salvar({ nome, categoria, tags });
						}}
					>
						<FormSection title="Dados gerais" description="Informações principais do registro.">
							<FieldGroup columns={2}>
								<FormField label="Nome" htmlFor="ex-nome" required error={erros.nome}>
									<Input
										id="ex-nome"
										value={nome}
										onChange={(e) => setNome(e.target.value)}
										aria-invalid={!!erros.nome}
										aria-describedby="ex-nome-error"
									/>
								</FormField>
								<FormField label="Categoria" htmlFor="ex-cat">
									<Combobox
										id="ex-cat"
										className="w-full"
										options={[
											{ label: "Categoria A", value: "a" },
											{ label: "Categoria B", value: "b" },
										]}
										value={categoria}
										onValueChange={setCategoria}
									/>
								</FormField>
								<FormField label="Marcadores" htmlFor="ex-tags" className="sm:col-span-2">
									<MultiSelect
										id="ex-tags"
										className="w-full"
										options={[
											{ label: "Urgente", value: "urgente" },
											{ label: "Revisão", value: "revisao" },
											{ label: "Interno", value: "interno" },
										]}
										value={tags}
										onValueChange={setTags}
									/>
								</FormField>
							</FieldGroup>
						</FormSection>
						<FormActions
							primary={<Button type="submit">Salvar</Button>}
							secondary={
								<Button type="button" variant="outline" onClick={fn()}>
									Cancelar
								</Button>
							}
						/>
					</form>
				}
			/>
		);
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		// submete vazio → erro aparece
		await userEvent.click(canvas.getByRole("button", { name: "Salvar" }));
		await waitFor(() => expect(canvas.getByText("O nome é obrigatório")).toBeVisible());
		// preenche → erro some
		await userEvent.type(canvas.getByLabelText(/Nome/), "Registro demo");
		await userEvent.click(canvas.getByRole("button", { name: "Salvar" }));
		await waitFor(() => expect(canvas.queryByText("O nome é obrigatório")).toBeNull());
	},
};

export const DetailPageExample: StoryObj = {
	render: () => (
		<DetailPageLayout
			header={
				<PageHeader
					eyebrow="Registros"
					title="Registro REG-003"
					actions={
						<Button variant="outline" onClick={fn()}>
							<Pencil /> Editar
						</Button>
					}
				/>
			}
			summary={
				<ContentCard title="Resumo">
					<div className="flex flex-wrap items-center gap-4 text-sm">
						<CodeBadge>REG-003</CodeBadge>
						<StatusDot tone="success" label="Ativo" />
						<Badge variant="secondary">Categoria A</Badge>
						<span className="text-muted-foreground">Atualizado em 03/07/2026</span>
					</div>
				</ContentCard>
			}
			tabs={
				<Tabs defaultValue="itens">
					<TabsList>
						<TabsTrigger value="itens">Itens</TabsTrigger>
						<TabsTrigger value="historico">Histórico</TabsTrigger>
					</TabsList>
					<TabsContent value="itens">
						<DataTable
							data={REGISTROS.slice(0, 4)}
							columns={[
								{ header: "Código", cell: (r) => <CodeBadge>{r.codigo}</CodeBadge> },
								{ header: "Nome", accessorKey: "nome" },
								{ header: "Qtd.", accessorKey: "qtd", align: "right" },
							]}
							keyExtractor={(r) => r.id}
						/>
					</TabsContent>
					<TabsContent value="historico">
						<ContentCard>
							<p className="text-sm text-muted-foreground">Eventos do registro.</p>
						</ContentCard>
					</TabsContent>
				</Tabs>
			}
		/>
	),
};

export const DashboardPageExample: StoryObj = {
	render: () => (
		<DashboardPageLayout
			header={
				<PageHeader
					title="Painel operacional"
					actions={
						<Button variant="outline" onClick={fn()}>
							<Download /> Exportar
						</Button>
					}
				/>
			}
			stats={
				<StatusCards
					items={[
						{ label: "Total", value: 128, icon: FileText },
						{ label: "Pendentes", value: 12, icon: Clock, tone: "warning" },
						{ label: "Concluídos", value: 98, icon: CheckCircle, tone: "success" },
					]}
					columns={3}
				/>
			}
			content={
				<div className="grid gap-6 lg:grid-cols-2">
					<ContentCard title="Últimos registros">
						<DataTable
							data={REGISTROS.slice(0, 5)}
							columns={[
								{ header: "Nome", accessorKey: "nome" },
								{ header: "Qtd.", accessorKey: "qtd", align: "right" },
							]}
							keyExtractor={(r) => r.id}
						/>
					</ContentCard>
					<ContentCard title="Distribuição">
						<div className="flex h-64 items-center justify-center rounded bg-muted/40 text-sm text-muted-foreground">
							área reservada para gráfico
						</div>
					</ContentCard>
				</div>
			}
		/>
	),
};
