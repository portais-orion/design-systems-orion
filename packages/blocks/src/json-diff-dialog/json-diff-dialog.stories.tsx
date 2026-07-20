import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

import { Button } from "@portais-orion/ui";
import { JsonDiffDialog } from "./json-diff-dialog";

const meta: Meta<typeof JsonDiffDialog> = {
	title: "Blocks/JsonDiffDialog",
	component: JsonDiffDialog,
};

export default meta;

type Story = StoryObj<typeof JsonDiffDialog>;

export const Default: Story = {
	render: () => {
		const [open, setOpen] = React.useState(false);
		return (
			<>
				<Button onClick={() => setOpen(true)}>Visualizar alteração</Button>
				<JsonDiffDialog
					open={open}
					onOpenChange={setOpen}
					beforeValue={{ status: "PENDENTE", assignedTo: null }}
					afterValue={{ status: "APROVADA", assignedTo: "usr_123" }}
				/>
			</>
		);
	},
};
