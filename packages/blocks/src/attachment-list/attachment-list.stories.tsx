import type { Meta, StoryObj } from "@storybook/react";

import { AttachmentList } from "./attachment-list";

const meta: Meta<typeof AttachmentList> = {
	title: "Blocks/AttachmentList",
	component: AttachmentList,
};

export default meta;

type Story = StoryObj<typeof AttachmentList>;

export const Default: Story = {
	args: {
		items: [
			{
				id: "1",
				name: "planilha.xlsx",
				extension: "xlsx",
				dateLabel: "20/07/2026",
				tone: "success",
			},
			{ id: "2", name: "contrato.docx", extension: "docx", dateLabel: "18/07/2026", tone: "info" },
			{
				id: "3",
				name: "nota-fiscal.pdf",
				extension: "pdf",
				dateLabel: "15/07/2026",
				tone: "danger",
			},
		],
		onSelect: (item) => console.log("abrir preview", item),
		onRemove: (item) => console.log("remover", item),
	},
};

export const Vazio: Story = {
	args: { items: [] },
};
