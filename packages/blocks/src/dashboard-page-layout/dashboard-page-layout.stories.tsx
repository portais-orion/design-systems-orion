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
	<StatusCards
		items={[
			{ label: "Total", value: 128, icon: FileText },
			{ label: "Pendentes", value: 12, icon: Clock, tone: "warning" },
			{ label: "Concluídos", value: 98, icon: CheckCircle, tone: "success" },
			{ label: "Com erro", value: 18, icon: AlertTriangle, tone: "danger" },
		]}
	/>
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
