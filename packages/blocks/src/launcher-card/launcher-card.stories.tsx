import { MotionProvider } from "@design-systems-orion/motion/react";
import type { Meta, StoryObj } from "@storybook/react";
import { Boxes, Truck } from "lucide-react";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import { LauncherCard } from "./launcher-card";

const meta: Meta<typeof LauncherCard> = {
	title: "Blocks/LauncherCard",
	component: LauncherCard,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LauncherCard>;

export const Default: Story = {
	args: {
		icon: Boxes,
		title: "Gestão de Demandas",
		description: "Acompanhe e programe as demandas operacionais.",
		cta: "Abrir →",
	},
};

export const Clicavel: Story = {
	args: {
		icon: Truck,
		title: "Acompanhamento de Cargas",
		description: "Monitoramento de cargas em trânsito.",
		cta: "Abrir →",
		onClick: () => {},
	},
};

export const Grade: Story = {
	render: () => (
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			<LauncherCard
				icon={Boxes}
				title="Gestão de Demandas"
				description="Programe demandas."
				cta="Abrir →"
			/>
			<LauncherCard
				icon={Truck}
				title="Acompanhamento de Cargas"
				description="Cargas em trânsito."
				cta="Abrir →"
			/>
		</div>
	),
};

export const MotionKeyboard: Story = {
	args: { title: "Open item", description: "Keyboard interaction", onClick: fn() },
	decorators: [
		(Story) => (
			<MotionProvider enabled reducedMotion="always">
				<Story />
			</MotionProvider>
		),
	],
	parameters: { a11y: { test: "error" } },
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole("button", { name: /Open item/ });
		button.focus();
		await userEvent.keyboard("{Enter}");
		await expect(args.onClick).toHaveBeenCalledTimes(1);
		await userEvent.hover(button);
		await waitFor(() => expect(new DOMMatrix(getComputedStyle(button).transform).m42).toBe(0));
		await expect(button).toHaveFocus();
	},
};

export const MotionOff: Story = {
	args: { title: "Motion off", onClick: fn() },
	decorators: [
		(Story) => (
			<MotionProvider enabled={false}>
				<Story />
			</MotionProvider>
		),
	],
	parameters: { a11y: { test: "error" } },
	play: async ({ canvasElement }) => {
		const button = within(canvasElement).getByRole("button", { name: "Motion off" });
		await expect(getComputedStyle(button).transitionDuration).toBe("0s");
	},
};
