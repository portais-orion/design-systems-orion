import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

import { ViewEditField } from "./view-edit-field";

const meta: Meta<typeof ViewEditField> = {
	title: "Blocks/ViewEditField",
	component: ViewEditField,
};

export default meta;

type Story = StoryObj<typeof ViewEditField>;

export const Leitura: Story = {
	render: () => (
		<ViewEditField label="Cliente" editing={false} viewValue="Transportes ABC Ltda.">
			<input className="h-9 w-full rounded-md border px-3 text-sm" />
		</ViewEditField>
	),
};

export const Edicao: Story = {
	render: () => {
		const [value, setValue] = React.useState("Transportes ABC Ltda.");
		return (
			<ViewEditField label="Cliente" editing viewValue={value}>
				<input
					className="h-9 w-full rounded-md border px-3 text-sm"
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
			</ViewEditField>
		);
	},
};
