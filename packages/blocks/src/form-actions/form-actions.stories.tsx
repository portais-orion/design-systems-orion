import { Button } from "@portais-orion/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";
import { FormActions } from "./form-actions";

const meta: Meta<typeof FormActions> = {
	title: "Blocks/Forms/FormActions",
	component: FormActions,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FormActions>;

const Botoes = () => ({
	primary: <Button onClick={fn()}>Salvar</Button>,
	secondary: (
		<Button variant="outline" onClick={fn()}>
			Cancelar
		</Button>
	),
});

export const Default: Story = { render: () => <FormActions {...Botoes()} className="w-96" /> };

export const LeftAligned: Story = {
	render: () => <FormActions {...Botoes()} align="left" className="w-96" />,
};

export const Between: Story = {
	render: () => (
		<FormActions
			{...Botoes()}
			align="between"
			extra={
				<Button variant="destructive" onClick={fn()}>
					Excluir
				</Button>
			}
			className="w-[32rem]"
		/>
	),
};

export const Sticky: Story = {
	render: () => (
		<div className="h-64 w-96 overflow-y-auto rounded-md border border-border p-4">
			<div className="h-96 rounded bg-muted/40 p-3 text-sm text-muted-foreground">
				ConteÃºdo longo do formulÃ¡rio (role para ver as aÃ§Ãµes fixas)
			</div>
			<FormActions {...Botoes()} sticky />
		</div>
	),
};

export const WithExtra: Story = {
	render: () => (
		<FormActions
			{...Botoes()}
			extra={
				<Button variant="ghost" onClick={fn()}>
					Salvar rascunho
				</Button>
			}
			className="w-[28rem]"
		/>
	),
};
