import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button";
import { Input } from "../input";
import { Label } from "../label";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const meta: Meta<typeof Popover> = {
	title: "UI/Popover",
	component: Popover,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Popover>;

function Exemplo() {
	return (
		<Popover>
			<PopoverTrigger render={<Button variant="outline">Abrir popover</Button>} />
			<PopoverContent>
				<p className="text-sm text-foreground">Conteúdo do popover com tokens do tema ativo.</p>
			</PopoverContent>
		</Popover>
	);
}

export const Default: Story = { render: () => <Exemplo /> };

export const WithForm: Story = {
	render: () => (
		<Popover>
			<PopoverTrigger render={<Button variant="outline">Ajustar dimensões</Button>} />
			<PopoverContent className="w-80">
				<div className="grid gap-3">
					<p className="text-sm font-medium">Dimensões</p>
					<div className="grid grid-cols-3 items-center gap-2">
						<Label htmlFor="pop-largura">Largura</Label>
						<Input id="pop-largura" defaultValue="100%" className="col-span-2 h-8" />
					</div>
					<div className="grid grid-cols-3 items-center gap-2">
						<Label htmlFor="pop-altura">Altura</Label>
						<Input id="pop-altura" defaultValue="25px" className="col-span-2 h-8" />
					</div>
				</div>
			</PopoverContent>
		</Popover>
	),
};

export const WithCustomWidth: Story = {
	render: () => (
		<Popover>
			<PopoverTrigger render={<Button variant="outline">Popover largo</Button>} />
			<PopoverContent className="w-96">
				<p className="text-sm">Largura customizada via className (w-96).</p>
			</PopoverContent>
		</Popover>
	),
};

export const SupertransBrand: Story = {
	render: () => (
		<div data-brand="supertrans" className="rounded-lg border border-border bg-background p-6">
			<Exemplo />
		</div>
	),
};

export const AuroraBrand: Story = {
	render: () => (
		<div data-brand="aurora" className="rounded-lg border border-border bg-background p-6">
			<Exemplo />
		</div>
	),
};
