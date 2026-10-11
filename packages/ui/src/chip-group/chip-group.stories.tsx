import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { ChipGroup, ChipGroupItem } from "./chip-group";

const meta: Meta<typeof ChipGroup> = {
	title: "UI/ChipGroup",
	component: ChipGroup,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ChipGroup>;

export const Default: Story = {
	render: function Render() {
		const [value, setValue] = React.useState("all");
		return (
			<ChipGroup value={value} onValueChange={setValue} aria-label="Canal">
				<ChipGroupItem value="all">Todas</ChipGroupItem>
				<ChipGroupItem value="whatsapp">WhatsApp</ChipGroupItem>
				<ChipGroupItem value="email">E-mail</ChipGroupItem>
			</ChipGroup>
		);
	},
};

export const ComPontoEContador: Story = {
	render: function Render() {
		const [value, setValue] = React.useState("mine");
		return (
			<ChipGroup value={value} onValueChange={setValue} aria-label="Visão">
				<ChipGroupItem value="all" tone="neutral" dot>
					Todas
				</ChipGroupItem>
				<ChipGroupItem value="mine" tone="brand" dot count={4}>
					Minha fila
				</ChipGroupItem>
				<ChipGroupItem value="unassigned" tone="danger" dot count={12}>
					Não atribuídas
				</ChipGroupItem>
				<ChipGroupItem value="waiting" tone="warning" dot count={0}>
					Em espera
				</ChipGroupItem>
				<ChipGroupItem value="closed" tone="success" dot count={31}>
					Encerradas
				</ChipGroupItem>
			</ChipGroup>
		);
	},
};

export const Medio: Story = {
	render: function Render() {
		const [value, setValue] = React.useState("USER");
		return (
			<ChipGroup value={value} onValueChange={setValue} aria-label="Destino">
				<ChipGroupItem value="USER" size="md">
					Atendente
				</ChipGroupItem>
				<ChipGroupItem value="QUEUE" size="md">
					Fila
				</ChipGroupItem>
			</ChipGroup>
		);
	},
};

export const ItemDesabilitado: Story = {
	render: function Render() {
		const [value, setValue] = React.useState("QUEUE");
		return (
			<ChipGroup value={value} onValueChange={setValue} aria-label="Destino">
				<ChipGroupItem value="USER" size="md" disabled>
					Atendente
				</ChipGroupItem>
				<ChipGroupItem value="QUEUE" size="md">
					Fila
				</ChipGroupItem>
			</ChipGroup>
		);
	},
};
