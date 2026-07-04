import type { Meta, StoryObj } from "@storybook/react";
import { AlertTriangle, CheckCircle, Clock, FileText } from "lucide-react";
import * as React from "react";
import { StatusCards } from "./status-cards";

const meta: Meta<typeof StatusCards> = {
	title: "Blocks/StatusCards",
	component: StatusCards,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StatusCards>;

export const Default: Story = {
	args: {
		items: [
			{ label: "Total", value: 128, icon: FileText, tone: "default" },
			{
				label: "Pendentes",
				value: 12,
				icon: Clock,
				tone: "warning",
				description: "Aguardando análise",
			},
			{ label: "Concluídos", value: 98, icon: CheckCircle, tone: "success" },
			{ label: "Com erro", value: 18, icon: AlertTriangle, tone: "danger" },
		],
	},
};

export const SemIcones: Story = {
	args: {
		columns: 3,
		items: [
			{ label: "Abertos", value: 42 },
			{ label: "Em andamento", value: 7, tone: "info" },
			{ label: "Arquivados", value: 315, tone: "muted" },
		],
	},
};

export const ComoFiltroClicavel: Story = {
	render: function Filtro() {
		const [ativo, setAtivo] = React.useState("Pendentes");
		const itens = [
			{ label: "Pendentes", value: 12, icon: Clock, tone: "warning" as const },
			{ label: "Concluídos", value: 98, icon: CheckCircle, tone: "success" as const },
			{ label: "Com erro", value: 18, icon: AlertTriangle, tone: "danger" as const },
		];
		return (
			<StatusCards
				columns={3}
				items={itens.map((i) => ({
					...i,
					onClick: () => setAtivo(i.label),
					active: ativo === i.label,
				}))}
			/>
		);
	},
};
