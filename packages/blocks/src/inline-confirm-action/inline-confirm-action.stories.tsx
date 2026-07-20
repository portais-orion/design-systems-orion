import { Trash2 } from "lucide-react";
import type { Meta, StoryObj } from "@storybook/react";

import { InlineConfirmAction } from "./inline-confirm-action";

const meta: Meta<typeof InlineConfirmAction> = {
	title: "Blocks/InlineConfirmAction",
	component: InlineConfirmAction,
};

export default meta;

type Story = StoryObj<typeof InlineConfirmAction>;

export const Destrutiva: Story = {
	args: {
		triggerLabel: "Purgar órfãs",
		triggerIcon: Trash2,
		confirmQuestion: "Confirmar remoção?",
		tone: "danger",
		onConfirm: () => console.log("confirmado"),
	},
};
