import { MotionProvider } from "@design-systems-orion/motion/react";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "storybook/test";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../../../packages/ui/src/accordion";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "../../../packages/ui/src/dialog";
import {
	Popover,
	PopoverClose,
	PopoverContent,
	PopoverTrigger,
} from "../../../packages/ui/src/popover";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetTitle,
	SheetTrigger,
} from "../../../packages/ui/src/sheet";

type Props = {
	kind: "accordion" | "dialog" | "popover" | "sheet";
	mode: "full" | "reduced" | "off";
};

function ExistingSurface({ kind, mode }: Props) {
	return (
		<MotionProvider enabled={mode !== "off"} reducedMotion={mode === "reduced" ? "always" : "user"}>
			{kind === "accordion" && (
				<Accordion>
					<AccordionItem value="panel">
						<AccordionTrigger>Open panel</AccordionTrigger>
						<AccordionContent data-testid="motion-surface">Panel content</AccordionContent>
					</AccordionItem>
				</Accordion>
			)}
			{kind === "dialog" && (
				<Dialog>
					<DialogTrigger>Open panel</DialogTrigger>
					<DialogContent data-testid="motion-surface">
						<DialogTitle>Panel</DialogTitle>
						<DialogDescription>Panel content</DialogDescription>
					</DialogContent>
				</Dialog>
			)}
			{kind === "popover" && (
				<Popover>
					<PopoverTrigger>Open panel</PopoverTrigger>
					<PopoverContent data-testid="motion-surface" aria-label="Panel">
						<p>Panel content</p>
						<PopoverClose>Close panel</PopoverClose>
					</PopoverContent>
				</Popover>
			)}
			{kind === "sheet" && (
				<Sheet>
					<SheetTrigger>Open panel</SheetTrigger>
					<SheetContent data-testid="motion-surface">
						<SheetTitle>Panel</SheetTitle>
						<SheetDescription>Panel content</SheetDescription>
					</SheetContent>
				</Sheet>
			)}
		</MotionProvider>
	);
}

const meta: Meta<typeof ExistingSurface> = {
	title: "Fundações/Motion/Existing components",
	component: ExistingSurface,
	parameters: { a11y: { test: "error" } },
};
export default meta;
type Story = StoryObj<typeof ExistingSurface>;

function surfaceStory(kind: Props["kind"], mode: Props["mode"]): Story {
	return {
		args: { kind, mode },
		play: async ({ canvasElement }) => {
			const canvas = within(canvasElement);
			const body = within(canvasElement.ownerDocument.body);
			for (const brand of ["Supertrans", "Aurora", "Grupo Orion"]) {
				await userEvent.click(canvas.getByRole("radio", { name: brand }));
				const trigger = canvas.getByRole("button", { name: "Open panel" });
				await userEvent.click(trigger);
				const surface = await body.findByTestId("motion-surface");
				await waitFor(() => expect(surface).toBeVisible());
				const style = getComputedStyle(surface);
				if (mode === "off") {
					await expect(style.animationName).toBe("none");
					await expect(style.transitionDuration).toBe("0s");
				} else {
					await expect(Number.parseFloat(style.transitionDuration)).toBeGreaterThan(0);
					if (mode === "reduced") await expect(style.transitionProperty).toBe("opacity");
				}
				if (kind === "accordion") await userEvent.click(trigger);
				else await userEvent.keyboard("{Escape}");
				await waitFor(() => expect(body.queryByTestId("motion-surface")).toBeNull());
				await expect(trigger).toHaveFocus();
			}
		},
	};
}

export const AccordionFull = surfaceStory("accordion", "full");
export const AccordionReduced = surfaceStory("accordion", "reduced");
export const AccordionOff = surfaceStory("accordion", "off");
export const DialogFull = surfaceStory("dialog", "full");
export const DialogReduced = surfaceStory("dialog", "reduced");
export const DialogOff = surfaceStory("dialog", "off");
export const PopoverFull = surfaceStory("popover", "full");
export const PopoverReduced = surfaceStory("popover", "reduced");
export const PopoverOff = surfaceStory("popover", "off");
export const SheetFull = surfaceStory("sheet", "full");
export const SheetReduced = surfaceStory("sheet", "reduced");
export const SheetOff = surfaceStory("sheet", "off");
