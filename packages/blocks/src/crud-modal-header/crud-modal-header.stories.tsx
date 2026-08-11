import { Badge } from "@design-systems-orion/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { Pencil, Plus } from "lucide-react";
import { CrudModalHeader } from "./crud-modal-header";

const meta: Meta<typeof CrudModalHeader> = {
	title: "Blocks/CrudModalHeader",
	component: CrudModalHeader,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CrudModalHeader>;

export const Criar: Story = {
	args: {
		icon: Plus,
		title: "Novo módulo",
		description: "Preencha os dados para cadastrar um módulo.",
	},
};

export const EditarComBadges: Story = {
	args: {
		icon: Pencil,
		title: "Editar módulo",
		description: "Alterações afetam o acesso dos usuários.",
		tone: "warning",
		badges: (
			<>
				<Badge variant="secondary">BUSINESS</Badge>
				<Badge variant="tinted">ordem 3</Badge>
			</>
		),
	},
};
