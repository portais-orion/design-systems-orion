import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./skeleton";

const meta: Meta<typeof Skeleton> = {
	title: "UI/Skeleton",
	component: Skeleton,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
	render: () => <Skeleton className="h-4 w-48" />,
};

export const CardPlaceholder: Story = {
	render: () => (
		<div className="w-72 space-y-3 rounded-lg border border-border p-4">
			<Skeleton className="h-5 w-2/3" />
			<Skeleton className="h-4 w-full" />
			<Skeleton className="h-4 w-5/6" />
			<div className="flex items-center gap-2 pt-2">
				<Skeleton className="size-9 rounded-full" />
				<Skeleton className="h-4 w-24" />
			</div>
		</div>
	),
};
