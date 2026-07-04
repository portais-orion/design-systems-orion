import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { SearchBar } from "./search-bar";

const meta: Meta<typeof SearchBar> = {
	title: "Blocks/SearchBar",
	component: SearchBar,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

function Demo() {
	const [value, setValue] = React.useState("");
	const [debounced, setDebounced] = React.useState("");
	return (
		<div className="w-80 space-y-2">
			<SearchBar value={value} onChange={setValue} onDebouncedChange={setDebounced} />
			<p className="text-xs text-muted-foreground">
				valor: “{value}” · debounced (300ms): “{debounced}”
			</p>
		</div>
	);
}

export const Default: Story = { render: () => <Demo /> };

export const ComPlaceholderCustom: Story = {
	render: function Custom() {
		const [value, setValue] = React.useState("");
		return (
			<SearchBar
				className="w-80"
				value={value}
				onChange={setValue}
				placeholder="Buscar por código ou nome..."
			/>
		);
	},
};
