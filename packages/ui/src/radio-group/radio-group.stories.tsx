import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Label } from "../label";
import { RadioGroup, RadioGroupItem } from "./radio-group";

const meta: Meta<typeof RadioGroup> = {
	title: "UI/RadioGroup",
	component: RadioGroup,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
	render: function Controlado() {
		const [value, setValue] = React.useState<unknown>("sim");
		return (
			<RadioGroup value={value} onValueChange={setValue}>
				<div className="flex items-center gap-2">
					<RadioGroupItem value="sim" id="rg-sim" />
					<Label htmlFor="rg-sim">Sim</Label>
				</div>
				<div className="flex items-center gap-2">
					<RadioGroupItem value="nao" id="rg-nao" />
					<Label htmlFor="rg-nao">Não</Label>
				</div>
			</RadioGroup>
		);
	},
};

export const Disabled: Story = {
	render: () => (
		<RadioGroup defaultValue="a" disabled>
			<div className="flex items-center gap-2">
				<RadioGroupItem value="a" id="rg-a" />
				<Label htmlFor="rg-a">Opção A (grupo desabilitado)</Label>
			</div>
			<div className="flex items-center gap-2">
				<RadioGroupItem value="b" id="rg-b" />
				<Label htmlFor="rg-b">Opção B</Label>
			</div>
		</RadioGroup>
	),
};

export const Horizontal: Story = {
	render: () => (
		<RadioGroup defaultValue="1" className="grid-flow-col gap-6">
			{["1", "2", "3"].map((v) => (
				<div key={v} className="flex items-center gap-2">
					<RadioGroupItem value={v} id={`rg-h-${v}`} />
					<Label htmlFor={`rg-h-${v}`}>Opção {v}</Label>
				</div>
			))}
		</RadioGroup>
	),
};

export const WithDescriptions: Story = {
	render: () => (
		<RadioGroup defaultValue="padrao" className="gap-4">
			<div className="flex items-start gap-3">
				<RadioGroupItem value="padrao" id="rg-padrao" className="mt-0.5" />
				<div>
					<Label htmlFor="rg-padrao">Padrão</Label>
					<p className="text-sm text-muted-foreground">Processamento na fila normal.</p>
				</div>
			</div>
			<div className="flex items-start gap-3">
				<RadioGroupItem value="prioritario" id="rg-prio" className="mt-0.5" />
				<div>
					<Label htmlFor="rg-prio">Prioritário</Label>
					<p className="text-sm text-muted-foreground">Processado antes dos demais.</p>
				</div>
			</div>
		</RadioGroup>
	),
};
