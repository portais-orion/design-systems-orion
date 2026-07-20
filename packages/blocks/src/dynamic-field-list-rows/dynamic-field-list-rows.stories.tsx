import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

import { DynamicFieldListRows } from "./dynamic-field-list-rows";

const meta: Meta<typeof DynamicFieldListRows> = {
	title: "Blocks/DynamicFieldListRows",
	component: DynamicFieldListRows,
};

export default meta;

type Story = StoryObj<typeof DynamicFieldListRows>;

export const Default: Story = {
	render: () => {
		const [rows, setRows] = React.useState(["", ""]);
		return (
			<DynamicFieldListRows
				count={rows.length}
				renderRow={(index) => (
					<input
						className="h-9 w-full rounded-md border px-3 text-sm"
						placeholder={`Container ${index + 1}`}
						value={rows[index]}
						onChange={(e) =>
							setRows((prev) => prev.map((v, i) => (i === index ? e.target.value : v)))
						}
					/>
				)}
				onAdd={() => setRows((prev) => [...prev, ""])}
				onRemove={(index) => setRows((prev) => prev.filter((_, i) => i !== index))}
				canRemove={() => rows.length > 1}
			/>
		);
	},
};
