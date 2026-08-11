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
	render: () => (
		<StatusCards columns={4}>
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
					<StatusCards.Description>Aguardando análise</StatusCards.Description>
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
	),
};

export const SemIcones: Story = {
	render: () => (
		<StatusCards columns={3}>
			<StatusCards.Item>
				<StatusCards.Content>
					<StatusCards.Label>Abertos</StatusCards.Label>
					<StatusCards.Value>42</StatusCards.Value>
				</StatusCards.Content>
			</StatusCards.Item>
			<StatusCards.Item tone="info">
				<StatusCards.Content>
					<StatusCards.Label>Em andamento</StatusCards.Label>
					<StatusCards.Value>7</StatusCards.Value>
				</StatusCards.Content>
			</StatusCards.Item>
			<StatusCards.Item tone="muted">
				<StatusCards.Content>
					<StatusCards.Label>Arquivados</StatusCards.Label>
					<StatusCards.Value>315</StatusCards.Value>
				</StatusCards.Content>
			</StatusCards.Item>
		</StatusCards>
	),
};

export const ComoFiltroClicavel: Story = {
	render: function Filtro() {
		const [ativo, setAtivo] = React.useState("Pendentes");
		return (
			<StatusCards columns={3}>
				<StatusCards.Item
					tone="warning"
					onClick={() => setAtivo("Pendentes")}
					active={ativo === "Pendentes"}
				>
					<StatusCards.Icon as={Clock} />
					<StatusCards.Content>
						<StatusCards.Label>Pendentes</StatusCards.Label>
						<StatusCards.Value>12</StatusCards.Value>
					</StatusCards.Content>
				</StatusCards.Item>

				<StatusCards.Item
					tone="success"
					onClick={() => setAtivo("Concluídos")}
					active={ativo === "Concluídos"}
				>
					<StatusCards.Icon as={CheckCircle} />
					<StatusCards.Content>
						<StatusCards.Label>Concluídos</StatusCards.Label>
						<StatusCards.Value>98</StatusCards.Value>
					</StatusCards.Content>
				</StatusCards.Item>

				<StatusCards.Item
					tone="danger"
					onClick={() => setAtivo("Com erro")}
					active={ativo === "Com erro"}
				>
					<StatusCards.Icon as={AlertTriangle} />
					<StatusCards.Content>
						<StatusCards.Label>Com erro</StatusCards.Label>
						<StatusCards.Value>18</StatusCards.Value>
					</StatusCards.Content>
				</StatusCards.Item>
			</StatusCards>
		);
	},
};
