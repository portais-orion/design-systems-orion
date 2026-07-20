import type { Meta, StoryObj } from "@storybook/react";

import { FileDropzone } from "./file-dropzone";

const meta: Meta<typeof FileDropzone> = {
	title: "Blocks/FileDropzone",
	component: FileDropzone,
};

export default meta;

type Story = StoryObj<typeof FileDropzone>;

export const Default: Story = {
	args: {
		title: "Clique para fazer upload",
		description: "Formato suportado: .xlsx",
		accept: ".xlsx,.csv",
		onFilesSelected: (files) => console.log(files),
	},
};

export const Desabilitado: Story = {
	args: {
		disabled: true,
		onFilesSelected: () => {},
	},
};
