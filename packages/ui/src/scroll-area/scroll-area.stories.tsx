import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { Separator } from "../separator";
import { ScrollArea } from "./scroll-area";

const meta: Meta<typeof ScrollArea> = {
	title: "UI/ScrollArea",
	component: ScrollArea,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

const itens = Array.from({ length: 40 }).map((_, i) => `Item ${i + 1}`);

export const Vertical: Story = {
	render: () => (
		<ScrollArea className="h-72 w-56 rounded-md border border-border">
			<div className="p-4">
				<p className="mb-3 text-sm font-medium">Itens</p>
				{itens.map((item) => (
					<div key={item}>
						<p className="py-1.5 text-sm">{item}</p>
						<Separator />
					</div>
				))}
			</div>
		</ScrollArea>
	),
};

export const Horizontal: Story = {
	render: () => (
		<ScrollArea className="w-96 rounded-md border border-border">
			<div className="flex gap-4 p-4">
				{Array.from({ length: 12 }).map((_, i) => (
					<div
						key={`col-${i + 1}`}
						className="flex h-24 w-32 shrink-0 items-center justify-center rounded-md bg-muted text-sm text-muted-foreground"
					>
						Bloco {i + 1}
					</div>
				))}
			</div>
		</ScrollArea>
	),
};

export const LongList: Story = {
	render: () => (
		<ScrollArea className="h-80 w-72 rounded-md border border-border">
			<div className="p-2">
				{Array.from({ length: 200 }).map((_, i) => (
					<p key={`linha-${i + 1}`} className="rounded px-2 py-1 text-sm hover:bg-muted">
						Registro nº {i + 1}
					</p>
				))}
			</div>
		</ScrollArea>
	),
};

export const InsideCard: Story = {
	render: () => (
		<Card className="w-80">
			<CardHeader>
				<CardTitle>Histórico</CardTitle>
			</CardHeader>
			<CardContent>
				<ScrollArea className="h-48">
					{itens.slice(0, 20).map((item) => (
						<p key={item} className="py-1 text-sm text-muted-foreground">
							{item} processado com sucesso
						</p>
					))}
				</ScrollArea>
			</CardContent>
		</Card>
	),
};
