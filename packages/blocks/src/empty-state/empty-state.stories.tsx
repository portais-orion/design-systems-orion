import { Button } from "@portais-orion/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { Inbox, SearchX } from "lucide-react";
import { EmptyState } from "./empty-state";

const meta: Meta<typeof EmptyState> = {
	title: "Blocks/EmptyState",
	component: EmptyState,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
	args: {
		title: "Nenhum registro encontrado",
		description: "Tente ajustar os filtros ou criar um novo registro.",
	},
};

export const ComAcao: Story = {
	args: {
		title: "Nenhum item cadastrado",
		description: "Cadastre o primeiro item para comeÃ§ar.",
		icon: Inbox,
		action: <Button size="sm">Novo registro</Button>,
	},
};

export const BuscaSemResultado: Story = {
	args: {
		title: "Nenhum resultado para a busca",
		icon: SearchX,
		action: (
			<Button variant="outline" size="sm">
				Limpar busca
			</Button>
		),
	},
};

export const Minimo: Story = {
	args: { title: "Nada por aqui" },
};
