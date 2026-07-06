import { Button } from "@portais-orion/ui";
import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { ConfirmDialog } from "./confirm-dialog";

const meta: Meta<typeof ConfirmDialog> = {
	title: "Blocks/ConfirmDialog",
	component: ConfirmDialog,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ConfirmDialog>;

function DemoDefault() {
	const [open, setOpen] = React.useState(false);
	return (
		<>
			<Button variant="outline" onClick={() => setOpen(true)}>
				Aprovar item
			</Button>
			<ConfirmDialog
				open={open}
				onOpenChange={setOpen}
				title="Confirmar aprovaÃ§Ã£o"
				description="O item serÃ¡ enviado para a prÃ³xima etapa."
				confirmLabel="Aprovar"
				onConfirm={() => {}}
			/>
		</>
	);
}

function DemoDanger() {
	const [open, setOpen] = React.useState(false);
	return (
		<>
			<Button variant="destructive" onClick={() => setOpen(true)}>
				Excluir item
			</Button>
			<ConfirmDialog
				open={open}
				onOpenChange={setOpen}
				title="Excluir registro?"
				description="Esta aÃ§Ã£o nÃ£o poderÃ¡ ser desfeita."
				confirmLabel="Excluir"
				variant="danger"
				onConfirm={() => new Promise((r) => setTimeout(r, 1200))}
			/>
		</>
	);
}

function DemoErro() {
	const [open, setOpen] = React.useState(false);
	return (
		<>
			<Button variant="outline" onClick={() => setOpen(true)}>
				Confirmar com falha (permanece aberto)
			</Button>
			<ConfirmDialog
				open={open}
				onOpenChange={setOpen}
				title="Processar registro?"
				description="Esta confirmaÃ§Ã£o sempre falha â€” o diÃ¡logo deve permanecer aberto."
				onConfirm={() => new Promise((_, reject) => setTimeout(reject, 800))}
			/>
		</>
	);
}

export const Default: Story = { render: () => <DemoDefault /> };
export const Danger: Story = { render: () => <DemoDanger /> };
export const ComFalha: Story = { render: () => <DemoErro /> };
