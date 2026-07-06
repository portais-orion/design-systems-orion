import { Button } from "@portais-orion/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { RefreshCw } from "lucide-react";
import { ErrorState } from "./error-state";

const meta: Meta<typeof ErrorState> = {
	title: "Blocks/ErrorState",
	component: ErrorState,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ErrorState>;

export const Default: Story = {};

export const ComRetry: Story = {
	args: {
		action: (
			<Button variant="outline" size="sm">
				<RefreshCw /> Tentar novamente
			</Button>
		),
	},
};

export const TextoCustomizado: Story = {
	args: {
		title: "Falha ao processar a solicitaÃ§Ã£o",
		description: "O servidor demorou para responder.",
	},
};
