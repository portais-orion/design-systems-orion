import type { Meta, StoryObj } from "@storybook/react";
import { Truck } from "lucide-react";
import * as React from "react";

import { Badge, Button } from "@design-systems-orion/ui";
import { CrudModalFrame } from "./crud-modal-frame";

const meta: Meta<typeof CrudModalFrame> = {
	title: "Blocks/CrudModalFrame",
	component: CrudModalFrame,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CrudModalFrame>;

function DemoCriar() {
	const [open, setOpen] = React.useState(false);
	return (
		<>
			<Button onClick={() => setOpen(true)}>Nova carga</Button>
			<CrudModalFrame
				open={open}
				onOpenChange={setOpen}
				title="Cadastrar carga"
				description="Preencha os dados básicos da carga."
				icon={Truck}
				size="md"
				footer={
					<>
						<Button variant="outline" onClick={() => setOpen(false)}>
							Cancelar
						</Button>
						<Button onClick={() => setOpen(false)}>Salvar</Button>
					</>
				}
			>
				<p className="text-sm text-muted-foreground">Formulário do consumidor entra aqui.</p>
			</CrudModalFrame>
		</>
	);
}

function DemoDetalhe() {
	const [open, setOpen] = React.useState(false);
	return (
		<>
			<Button variant="outline" onClick={() => setOpen(true)}>
				Ver detalhe
			</Button>
			<CrudModalFrame
				open={open}
				onOpenChange={setOpen}
				title="Carga Nº 4821"
				description="Detalhes da carga em trânsito."
				icon={Truck}
				tone="info"
				size="lg"
				badges={<Badge variant="secondary">Em trânsito</Badge>}
			>
				<p className="text-sm text-muted-foreground">Conteúdo rolável do consumidor entra aqui.</p>
			</CrudModalFrame>
		</>
	);
}

export const Criar: Story = { render: () => <DemoCriar /> };
export const Detalhe: Story = { render: () => <DemoDetalhe /> };
