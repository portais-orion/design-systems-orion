import { Button } from "@grupo/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { ContentCard } from "../content-card";
import { PageHeader } from "../page-header";
import { PageLayout } from "./page-layout";

const meta: Meta<typeof PageLayout> = {
	title: "Blocks/Layouts/PageLayout",
	component: PageLayout,
	tags: ["autodocs"],
	parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof PageLayout>;

const Conteudo = () => (
	<ContentCard title="Bloco de conteúdo">
		<p className="text-sm text-muted-foreground">Qualquer conteúdo de página.</p>
	</ContentCard>
);

export const Default: Story = {
	render: () => (
		<PageLayout header={<PageHeader title="Registros" />}>
			<Conteudo />
		</PageLayout>
	),
};
export const WithFooter: Story = {
	render: () => (
		<PageLayout
			header={<PageHeader title="Registros" />}
			footer={<p className="text-xs text-muted-foreground">Atualizado há 5 minutos</p>}
		>
			<Conteudo />
		</PageLayout>
	),
};
export const NarrowContent: Story = {
	render: () => (
		<PageLayout maxWidth="screen-xl" header={<PageHeader title="Configurações" />}>
			<Conteudo />
		</PageLayout>
	),
};
export const FullWidth: Story = {
	render: () => (
		<PageLayout
			maxWidth="none"
			header={<PageHeader title="Painel" actions={<Button>Ação</Button>} />}
		>
			<Conteudo />
		</PageLayout>
	),
};
