import { Button } from "@portais-orion/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { Download, Plus } from "lucide-react";
import { PageHeader } from "./page-header";

const meta: Meta<typeof PageHeader> = {
	title: "Blocks/PageHeader",
	component: PageHeader,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {
	args: {
		title: "Registros",
		description: "Gerencie os registros e acompanhe seus status.",
	},
};

export const ComAcoes: Story = {
	args: {
		title: "Registros",
		description: "Gerencie os registros e acompanhe seus status.",
		actions: (
			<>
				<Button variant="outline">
					<Download /> Exportar
				</Button>
				<Button>
					<Plus /> Novo registro
				</Button>
			</>
		),
	},
};

export const ComEyebrow: Story = {
	args: {
		eyebrow: "Operações",
		title: "Painel de acompanhamento",
	},
};

export const SomenteTitulo: Story = {
	args: { title: "Configurações" },
};
