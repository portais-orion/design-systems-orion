import type { Meta, StoryObj } from "@storybook/react";
import { AlertTriangle, CheckCircle, Clock, FileText } from "lucide-react";
import { ContentCard } from "../content-card";
import { PageHeader } from "../page-header";
import { StatusCards } from "../status-cards";
import { DashboardPageLayout } from "./dashboard-page-layout";

const meta: Meta<typeof DashboardPageLayout> = {
	title: "Blocks/Layouts/DashboardPageLayout",
	component: DashboardPageLayout,
	tags: ["autodocs"],
	parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof DashboardPageLayout>;

const Stats = () => (
	<StatusCards>
		<StatusCards.Item tone="default">
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
		<StatusCards.Item tone="danger">
			<StatusCards.Icon as={AlertTriangle} />
			<StatusCards.Content>
				<StatusCards.Label>Com erro</StatusCards.Label>
				<StatusCards.Value>18</StatusCards.Value>
			</StatusCards.Content>
		</StatusCards.Item>
	</StatusCards>
);
const Bloco = ({ titulo }: { titulo: string }) => (
	<ContentCard title={titulo}>
		<div className="flex h-40 items-center justify-center rounded bg-muted/40 text-sm text-muted-foreground">
			área de conteúdo/gráfico
		</div>
	</ContentCard>
);

export const Default: Story = {
	render: () => (
		<DashboardPageLayout
			header={<PageHeader title="Painel" />}
			content={<Bloco titulo="Visão geral" />}
		/>
	),
};
export const WithStats: Story = {
	render: () => (
		<DashboardPageLayout
			header={<PageHeader title="Painel" />}
			stats={<Stats />}
			content={<Bloco titulo="Visão geral" />}
		/>
	),
};
export const WithAside: Story = {
	render: () => (
		<DashboardPageLayout
			header={<PageHeader title="Painel" />}
			stats={<Stats />}
			content={<Bloco titulo="Visão geral" />}
			aside={<Bloco titulo="Alertas" />}
		/>
	),
};
export const WithCardsGrid: Story = {
	render: () => (
		<DashboardPageLayout
			header={<PageHeader title="Painel" />}
			stats={<Stats />}
			content={
				<div className="grid gap-6 lg:grid-cols-2">
					<Bloco titulo="Bloco A" />
					<Bloco titulo="Bloco B" />
					<Bloco titulo="Bloco C" />
					<Bloco titulo="Bloco D" />
				</div>
			}
		/>
	),
};
