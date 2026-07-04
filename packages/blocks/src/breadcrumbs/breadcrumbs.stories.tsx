import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";
import { Breadcrumbs } from "./breadcrumbs";

const meta: Meta<typeof Breadcrumbs> = {
	title: "Blocks/Chrome/Breadcrumbs",
	component: Breadcrumbs,
	tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
	args: {
		items: [{ label: "Início", href: "#" }, { label: "Registros" }],
	},
};

export const WithLinks: Story = {
	args: {
		items: [
			{ label: "Início", href: "#" },
			{ label: "Registros", href: "#" },
			{ label: "Detalhes", current: true },
		],
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const atual = canvas.getByText("Detalhes");
		await expect(atual).toHaveAttribute("aria-current", "page");
		await expect(canvas.getByRole("navigation", { name: "Breadcrumb" })).toBeVisible();
	},
};

export const LongTrail: Story = {
	args: {
		items: [
			{ label: "Início", href: "#" },
			{ label: "Operações", href: "#" },
			{ label: "Registros", href: "#" },
			{ label: "Categoria com nome bem comprido", href: "#" },
			{ label: "Registro REG-042", current: true },
		],
		className: "max-w-md",
	},
};

export const CurrentOnly: Story = {
	args: { items: [{ label: "Configurações", current: true }] },
};

export const CustomSeparator: Story = {
	args: {
		items: [{ label: "Início", href: "#" }, { label: "Registros" }],
		separator: <span className="opacity-50">/</span>,
	},
};
