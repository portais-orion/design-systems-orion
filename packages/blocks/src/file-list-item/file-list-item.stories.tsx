import type { Meta, StoryObj } from "@storybook/react";

import { FileListItem } from "./file-list-item";

const meta: Meta<typeof FileListItem> = {
	title: "Blocks/FileListItem",
	component: FileListItem,
};

export default meta;

type Story = StoryObj<typeof FileListItem>;

export const Default: Story = {
	args: {
		name: "planilha-containers.xlsx",
		size: 143_360,
		onRemove: () => {},
	},
};

export const SomenteLeitura: Story = {
	args: {
		name: "comprovante.pdf",
		size: "812 KB",
	},
};
