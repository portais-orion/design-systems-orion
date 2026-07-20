import type { Meta, StoryObj } from "@storybook/react";

import { KioskModeToggle } from "./kiosk-mode-toggle";

const meta: Meta<typeof KioskModeToggle> = {
	title: "Blocks/KioskModeToggle",
	component: KioskModeToggle,
};

export default meta;

type Story = StoryObj<typeof KioskModeToggle>;

export const Default: Story = {
	render: () => <KioskModeToggle />,
};
