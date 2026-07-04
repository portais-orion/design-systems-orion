import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button";
import { Input } from "../input";
import { Label } from "../label";
import { ScrollArea } from "../scroll-area";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "./sheet";

const meta: Meta<typeof Sheet> = {
	title: "UI/Sheet",
	component: Sheet,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Sheet>;

function Painel({ side }: { side: "right" | "left" | "top" | "bottom" }) {
	return (
		<Sheet>
			<SheetTrigger render={<Button variant="outline">Abrir ({side})</Button>} />
			<SheetContent side={side}>
				<SheetHeader>
					<SheetTitle>Detalhes</SheetTitle>
					<SheetDescription>Informações complementares do registro.</SheetDescription>
				</SheetHeader>
				<p className="text-sm text-muted-foreground">Conteúdo do painel.</p>
			</SheetContent>
		</Sheet>
	);
}

export const Right: Story = { render: () => <Painel side="right" /> };
export const Left: Story = { render: () => <Painel side="left" /> };
export const Bottom: Story = { render: () => <Painel side="bottom" /> };

export const WithFormContent: Story = {
	render: () => (
		<Sheet>
			<SheetTrigger render={<Button>Editar registro</Button>} />
			<SheetContent side="right">
				<SheetHeader>
					<SheetTitle>Editar registro</SheetTitle>
					<SheetDescription>Altere os campos e salve.</SheetDescription>
				</SheetHeader>
				<div className="grid gap-4">
					<div className="grid gap-1.5">
						<Label htmlFor="sheet-nome">Nome</Label>
						<Input id="sheet-nome" defaultValue="Registro 42" />
					</div>
					<div className="grid gap-1.5">
						<Label htmlFor="sheet-codigo">Código</Label>
						<Input id="sheet-codigo" defaultValue="REG-042" />
					</div>
				</div>
				<SheetFooter>
					<Button variant="outline">Cancelar</Button>
					<Button>Salvar</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	),
};

export const ScrollableContent: Story = {
	render: () => (
		<Sheet>
			<SheetTrigger render={<Button variant="outline">Histórico longo</Button>} />
			<SheetContent side="right">
				<SheetHeader>
					<SheetTitle>Histórico</SheetTitle>
				</SheetHeader>
				<ScrollArea className="-mx-2 h-full px-2">
					{Array.from({ length: 60 }).map((_, i) => (
						<p key={`h-${i + 1}`} className="border-b border-border py-2 text-sm">
							Evento nº {i + 1}
						</p>
					))}
				</ScrollArea>
			</SheetContent>
		</Sheet>
	),
};
