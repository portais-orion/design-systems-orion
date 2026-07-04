import type { Meta, StoryObj } from "@storybook/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

const meta: Meta<typeof Select> = {
	title: "UI/Select",
	component: Select,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
	render: () => (
		<Select defaultValue="apple">
			<SelectTrigger className="w-45">
				<SelectValue placeholder="Select a fruit" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="apple">Apple</SelectItem>
				<SelectItem value="banana">Banana</SelectItem>
				<SelectItem value="blueberry">Blueberry</SelectItem>
				<SelectItem value="grapes">Grapes</SelectItem>
				<SelectItem value="pineapple">Pineapple</SelectItem>
			</SelectContent>
		</Select>
	),
};

export const WithItemsArray: Story = {
	render: () => {
		const fruits = [
			{ value: "apple", label: "Apple" },
			{ value: "banana", label: "Banana" },
			{ value: "orange", label: "Orange" },
		];
		return (
			<Select>
				<SelectTrigger className="w-45">
					<SelectValue placeholder="Select a fruit" items={fruits} />
				</SelectTrigger>
				<SelectContent>
					{fruits.map((f) => (
						<SelectItem key={f.value} value={f.value}>
							{f.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		);
	},
};
