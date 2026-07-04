import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Progress } from "./progress";

const meta: Meta<typeof Progress> = {
	title: "UI/Progress",
	component: Progress,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
	render: () => <Progress value={60} className="w-80" />,
};

export const DifferentValues: Story = {
	render: () => (
		<div className="w-80 space-y-3">
			{[0, 25, 50, 75, 100].map((v) => (
				<Progress key={v} value={v} />
			))}
		</div>
	),
};

export const Indeterminate: Story = {
	render: () => <Progress className="w-80" />,
};

export const WithLabel: Story = {
	render: function ComLabel() {
		const [value, setValue] = React.useState(30);
		React.useEffect(() => {
			const t = setInterval(() => setValue((v) => (v >= 100 ? 0 : v + 10)), 900);
			return () => clearInterval(t);
		}, []);
		return (
			<div className="w-80 space-y-1.5">
				<div className="flex justify-between text-sm">
					<span className="text-muted-foreground">Processando…</span>
					<span className="font-medium text-foreground">{value}%</span>
				</div>
				<Progress value={value} />
			</div>
		);
	},
};
