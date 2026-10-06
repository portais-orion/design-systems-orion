import { useOrionMotionReady } from "@design-systems-orion/motion/motion";
import { MotionProvider } from "@design-systems-orion/motion/react";
import { Input } from "@design-systems-orion/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { type CSSProperties, useState } from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { FiltersCard } from "./filters-card";

const meta: Meta<typeof FiltersCard> = {
	title: "Blocks/FiltersCard",
	component: FiltersCard,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FiltersCard>;

export const Default: Story = {
	args: {
		onClear: () => {},
		children: (
			<div className="grid gap-3 sm:grid-cols-3">
				<Input placeholder="Buscar..." />
				<Input placeholder="Status" />
				<Input placeholder="Categoria" />
			</div>
		),
	},
};

export const Fechado: Story = {
	args: {
		defaultOpen: false,
		children: <Input placeholder="Buscar..." />,
	},
};

function ControlledFilters() {
	const [open, setOpen] = useState(true);
	const [enabled, setEnabled] = useState(true);
	return (
		<MotionProvider enabled={enabled}>
			<form style={{ "--motion-duration-panel": "1000ms" } as CSSProperties}>
				<button type="button" onClick={() => setOpen(false)}>
					Close from outside
				</button>
				<button type="button" onClick={() => setEnabled((value) => !value)}>
					Toggle motion
				</button>
				<FiltersCard open={open} onOpenChange={setOpen}>
					<label htmlFor="motion-filter">Filter value</label>
					<Input id="motion-filter" name="query" required />
					<ReadyProbe />
				</FiltersCard>
			</form>
		</MotionProvider>
	);
}

function ReadyProbe() {
	return <span data-testid="motion-ready" data-ready={useOrionMotionReady()} />;
}

export const MotionPreservesStateAndFocus: Story = {
	render: () => <ControlledFilters />,
	parameters: { a11y: { test: "error" } },
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("textbox");
		await userEvent.type(input, "retained");
		await userEvent.click(canvas.getByRole("button", { name: "Toggle motion" }));
		await expect(canvas.getByRole("textbox")).toBe(input);
		await expect(input).toHaveValue("retained");
		await userEvent.click(canvas.getByRole("button", { name: "Toggle motion" }));
		await waitFor(() =>
			expect(canvas.getByTestId("motion-ready")).toHaveAttribute("data-ready", "true"),
		);
		input.focus();
		// Programmatic close must restore focus before retaining DOM for exit.
		canvas.getByRole("button", { name: "Close from outside" }).click();
		await waitFor(() => expect(canvas.getByRole("button", { name: /Mostrar/ })).toHaveFocus());
		const form = canvasElement.querySelector("form");
		if (!form) throw new Error("Missing form fixture");
		await expect(new FormData(form).has("query")).toBe(false);
		await waitFor(() => expect(canvas.queryByRole("textbox")).toBeNull());
		await userEvent.click(canvas.getByRole("button", { name: /Mostrar/ }));
		await waitFor(() => {
			const surface = canvas.getByRole("textbox").closest(".overflow-hidden[id]");
			if (!surface) throw new Error("Missing animated panel");
			const opacity = Number(getComputedStyle(surface).opacity);
			expect(opacity).toBeGreaterThan(0);
			expect(opacity).toBeLessThan(1);
		});
		await waitFor(() => expect(canvas.getByRole("textbox")).toBeVisible());
		await waitFor(() => {
			const surface = canvas.getByRole("textbox").closest(".overflow-hidden[id]");
			if (!surface) throw new Error("Missing animated panel");
			expect(getComputedStyle(surface).opacity).toBe("1");
		});
	},
};
