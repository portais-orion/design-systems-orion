import type { Meta, StoryObj } from "@storybook/react";
import { FilterPill } from "./filter-pill";

const meta: Meta<typeof FilterPill> = {
	title: "Blocks/FilterPill",
	component: FilterPill,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FilterPill>;

export const Default: Story = {
	args: { label: "Status", value: "Ativo", onRemove: () => {} },
};

export const SemValor: Story = {
	args: { label: "Somente pendentes", onRemove: () => {} },
};

export const SemRemocao: Story = {
	args: { label: "Período", value: "Últimos 30 dias" },
};

export const Grupo: Story = {
	render: () => (
		<div className="flex flex-wrap gap-2">
			<FilterPill label="Status" value="Ativo" onRemove={() => {}} />
			<FilterPill label="Tipo" value="Importação" onRemove={() => {}} />
			<FilterPill label="Período" value="Jul/2026" onRemove={() => {}} />
		</div>
	),
};
