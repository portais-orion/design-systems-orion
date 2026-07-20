import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

import { TableToggle } from "./table-toggle";

const meta: Meta<typeof TableToggle> = {
	title: "Blocks/TableToggle",
	component: TableToggle,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TableToggle>;

function Demo() {
	const [checked, setChecked] = React.useState(true);
	return (
		<TableToggle
			checked={checked}
			onToggle={() => setChecked((v) => !v)}
			aria-label="Ativar módulo"
		/>
	);
}

export const Default: Story = { render: () => <Demo /> };
export const Disabled: Story = {
	render: () => <TableToggle checked={false} onToggle={() => {}} disabled aria-label="Indisponível" />,
};
