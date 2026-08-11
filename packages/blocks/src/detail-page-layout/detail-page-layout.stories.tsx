import { Badge, Button, Tabs, TabsContent, TabsList, TabsTrigger } from "@design-systems-orion/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { CodeBadge } from "../code-badge";
import { ContentCard } from "../content-card";
import { PageHeader } from "../page-header";
import { StatusDot } from "../status-dot";
import { DetailPageLayout } from "./detail-page-layout";

const meta: Meta<typeof DetailPageLayout> = {
	title: "Blocks/Layouts/DetailPageLayout",
	component: DetailPageLayout,
	tags: ["autodocs"],
	parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof DetailPageLayout>;

const Cabecalho = () => (
	<PageHeader
		eyebrow="Registros"
		title="Registro REG-042"
		actions={<Button variant="outline">Editar</Button>}
	/>
);
const Resumo = () => (
	<ContentCard title="Resumo">
		<div className="flex flex-wrap items-center gap-4 text-sm">
			<CodeBadge>REG-042</CodeBadge>
			<StatusDot tone="success" label="Ativo" />
			<span className="text-muted-foreground">Criado em 01/07/2026</span>
			<Badge variant="secondary">Categoria X</Badge>
		</div>
	</ContentCard>
);
const Abas = () => (
	<Tabs defaultValue="geral">
		<TabsList>
			<TabsTrigger value="geral">Geral</TabsTrigger>
			<TabsTrigger value="historico">Histórico</TabsTrigger>
		</TabsList>
		<TabsContent value="geral">
			<ContentCard>
				<p className="text-sm text-muted-foreground">Conteúdo da aba Geral.</p>
			</ContentCard>
		</TabsContent>
		<TabsContent value="historico">
			<ContentCard>
				<p className="text-sm text-muted-foreground">Eventos do registro.</p>
			</ContentCard>
		</TabsContent>
	</Tabs>
);

export const Default: Story = {
	render: () => (
		<DetailPageLayout>
			<Cabecalho />
			<DetailPageLayout.Content>
				<ContentCard>
					<p className="text-sm text-muted-foreground">Conteúdo do detalhe.</p>
				</ContentCard>
			</DetailPageLayout.Content>
		</DetailPageLayout>
	),
};
export const WithSummary: Story = {
	render: () => (
		<DetailPageLayout>
			<Cabecalho />
			<DetailPageLayout.Content>
				<Resumo />
				<Abas />
			</DetailPageLayout.Content>
		</DetailPageLayout>
	),
};
export const WithTabs: Story = {
	render: () => (
		<DetailPageLayout>
			<Cabecalho />
			<DetailPageLayout.Content>
				<Abas />
			</DetailPageLayout.Content>
		</DetailPageLayout>
	),
};
export const WithAside: Story = {
	render: () => (
		<DetailPageLayout>
			<Cabecalho />
			<DetailPageLayout.Content
				aside={
					<ContentCard title="Ações rápidas">
						<div className="grid gap-2">
							<Button variant="outline" size="sm">
								Duplicar
							</Button>
							<Button variant="destructive" size="sm">
								Excluir
							</Button>
						</div>
					</ContentCard>
				}
			>
				<Resumo />
				<Abas />
			</DetailPageLayout.Content>
		</DetailPageLayout>
	),
};
