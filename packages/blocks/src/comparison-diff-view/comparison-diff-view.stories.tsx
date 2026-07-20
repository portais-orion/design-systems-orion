import type { Meta, StoryObj } from "@storybook/react";

import { ComparisonDiffView } from "./comparison-diff-view";

const meta: Meta<typeof ComparisonDiffView> = {
	title: "Blocks/ComparisonDiffView",
	component: ComparisonDiffView,
};

export default meta;

type Story = StoryObj<typeof ComparisonDiffView>;

export const Default: Story = {
	args: {
		groups: [
			{
				title: "Diferenças de Permissões",
				description: "Permissões que um usuário possui e o outro não.",
				columns: [
					{ label: "Somente Usuário A possui", tone: "danger", items: ["CRIAR_DEMANDA"] },
					{ label: "Somente Usuário B possui", tone: "info", items: ["APROVAR_DEMANDA", "EXCLUIR_DEMANDA"] },
				],
			},
			{
				title: "Módulos",
				columns: [
					{ label: "Comuns (Ambos)", items: ["Gestão de Demandas"] },
					{ label: "Somente Usuário A", tone: "danger", items: [] },
					{ label: "Somente Usuário B", tone: "info", items: ["Governança"] },
				],
			},
		],
	},
};
