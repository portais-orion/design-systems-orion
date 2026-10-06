import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import { MotionProvider, useMotionPolicy } from "./motion-provider";

function PolicyProbe() {
	const policy = useMotionPolicy();
	return <output aria-label="Motion policy">{JSON.stringify(policy)}</output>;
}

function PolicyExample() {
	const [enabled, setEnabled] = useState(false);
	return (
		<MotionProvider enabled={enabled} reducedMotion="always">
			<label htmlFor="motion-state">Preserved input</label>
			<input id="motion-state" />
			<button type="button" onClick={() => setEnabled((value) => !value)}>
				Toggle motion
			</button>
			<PolicyProbe />
		</MotionProvider>
	);
}

const meta: Meta = {
	title: "Fundações/Motion/Policy",
	component: PolicyExample,
	parameters: { a11y: { test: "error" } },
};
export default meta;
type Story = StoryObj;

export const PreservesState: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("textbox");
		await userEvent.type(input, "saved");
		await userEvent.click(canvas.getByRole("button", { name: "Toggle motion" }));
		await expect(canvas.getByRole("textbox")).toBe(input);
		await expect(input).toHaveValue("saved");
		await expect(canvas.getByLabelText("Motion policy")).toHaveTextContent('"reduceMotion":true');
	},
};
