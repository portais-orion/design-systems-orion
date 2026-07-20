import type { Meta, StoryObj } from "@storybook/react";

import { MissingPrerequisitesState } from "./missing-prerequisites-state";

const meta: Meta<typeof MissingPrerequisitesState> = {
	title: "Blocks/MissingPrerequisitesState",
	component: MissingPrerequisitesState,
};

export default meta;

type Story = StoryObj<typeof MissingPrerequisitesState>;

export const Default: Story = {
	args: {
		items: [
			{ label: "Clientes", action: <a href="/admin/clientes">Cadastrar agora</a> },
			{ label: "Portos", action: <a href="/admin/portos">Cadastrar agora</a> },
		],
		onCancel: () => {},
	},
};
