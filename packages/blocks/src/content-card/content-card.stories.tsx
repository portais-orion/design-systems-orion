import { Button } from "@grupo/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { FormSection } from "../form-section";
import { ContentCard } from "./content-card";

const meta: Meta<typeof ContentCard> = {
	title: "Blocks/Layouts/ContentCard",
	component: ContentCard,
	tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof ContentCard>;

export const Default: Story = {
	render: () => (
		<ContentCard className="w-96">
			<p className="text-sm text-muted-foreground">Conteúdo simples sem cabeçalho.</p>
		</ContentCard>
	),
};
export const WithHeader: Story = {
	render: () => (
		<ContentCard className="w-96" title="Resumo" description="Informações principais">
			<p className="text-sm text-muted-foreground">Conteúdo do card.</p>
		</ContentCard>
	),
};
export const WithActions: Story = {
	render: () => (
		<ContentCard
			className="w-96"
			title="Resumo"
			actions={
				<Button variant="outline" size="sm">
					Editar
				</Button>
			}
		>
			<p className="text-sm text-muted-foreground">Conteúdo do card.</p>
		</ContentCard>
	),
};
export const NestedSections: Story = {
	render: () => (
		<ContentCard className="w-[32rem]" title="Configurações">
			<div className="space-y-6">
				<FormSection title="Geral">
					<p className="text-sm text-muted-foreground">Campos gerais…</p>
				</FormSection>
				<FormSection title="Avançado">
					<p className="text-sm text-muted-foreground">Campos avançados…</p>
				</FormSection>
			</div>
		</ContentCard>
	),
};
