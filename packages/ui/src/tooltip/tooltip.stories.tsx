import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

const meta: Meta<typeof Tooltip> = {
	title: "UI/Tooltip",
	component: Tooltip,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
	render: () => (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger render={<Button variant="outline">Hover me</Button>} />
				<TooltipContent>
					<p>Add to library</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	),
};
