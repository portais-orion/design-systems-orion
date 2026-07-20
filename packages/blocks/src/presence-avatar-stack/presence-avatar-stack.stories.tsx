import type { Meta, StoryObj } from "@storybook/react";

import { PresenceAvatarStack } from "./presence-avatar-stack";

const meta: Meta<typeof PresenceAvatarStack> = {
	title: "Blocks/PresenceAvatarStack",
	component: PresenceAvatarStack,
};

export default meta;

type Story = StoryObj<typeof PresenceAvatarStack>;

export const Default: Story = {
	args: {
		users: [
			{ id: "1", label: "Você", sublabel: "Vendo: Gestão de Demandas", isSelf: true },
			{ id: "2", label: "Maria Silva", sublabel: "Vendo: Grade de Programação" },
		],
	},
};
