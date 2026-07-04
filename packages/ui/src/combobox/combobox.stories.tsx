import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import { Label } from "../label";
import { Combobox } from "./combobox";
import type { ComboboxOptions } from "./combobox.types";

const meta: Meta<typeof Combobox> = {
	title: "UI/Combobox",
	component: Combobox,
	tags: ["autodocs"],
	args: { onValueChange: fn() },
};

export default meta;
type Story = StoryObj<typeof Combobox>;

const simpleOptions: ComboboxOptions = [
	{ label: "Opção 1", value: "option-1" },
	{ label: "Opção 2", value: "option-2" },
	{ label: "Opção 3", value: "option-3" },
];

const groupedOptions: ComboboxOptions = [
	{
		label: "Grupo A",
		options: [
			{ label: "Opção A1", value: "a1" },
			{ label: "Opção A2", value: "a2" },
		],
	},
	{
		label: "Grupo B",
		options: [
			{ label: "Opção B1", value: "b1" },
			{ label: "Opção B2", value: "b2", disabled: true },
		],
	},
];

function Controlado(props: Partial<React.ComponentProps<typeof Combobox>>) {
	const [value, setValue] = React.useState<string | null>(props.value ?? null);
	return (
		<Combobox
			options={simpleOptions}
			{...props}
			value={value}
			onValueChange={(v) => {
				setValue(v);
				props.onValueChange?.(v);
			}}
		/>
	);
}

export const Default: Story = {
	render: (args) => <Controlado onValueChange={args.onValueChange} />,
};

export const WithSearch: Story = {
	render: (args) => (
		<Controlado
			onValueChange={args.onValueChange}
			options={Array.from({ length: 12 }).map((_, i) => ({
				label: `Registro ${i + 1}`,
				value: `reg-${i + 1}`,
			}))}
			placeholder="Buscar registro..."
		/>
	),
};

export const WithGroups: Story = {
	render: (args) => <Controlado onValueChange={args.onValueChange} options={groupedOptions} />,
};

export const Disabled: Story = {
	render: () => <Combobox options={simpleOptions} onValueChange={fn()} disabled value="option-1" />,
};

export const Clearable: Story = {
	render: (args) => <Controlado onValueChange={args.onValueChange} value="option-2" clearable />,
};

export const WithDescriptions: Story = {
	render: (args) => (
		<Controlado
			onValueChange={args.onValueChange}
			options={[
				{ label: "Padrão", value: "padrao", description: "Fila normal de processamento" },
				{ label: "Prioritário", value: "prio", description: "Processado antes dos demais" },
			]}
		/>
	),
};

export const EmptySearch: Story = {
	render: (args) => (
		<Controlado
			onValueChange={args.onValueChange}
			emptyMessage="Nada encontrado — tente outro termo"
		/>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("combobox");
		await userEvent.type(input, "zzz");
		const body = within(canvasElement.ownerDocument.body);
		await waitFor(() =>
			expect(body.getByText("Nada encontrado — tente outro termo")).toBeVisible(),
		);
	},
};

export const LongList: Story = {
	render: (args) => (
		<Controlado
			onValueChange={args.onValueChange}
			options={Array.from({ length: 80 }).map((_, i) => ({
				label: `Item ${String(i + 1).padStart(2, "0")}`,
				value: `item-${i + 1}`,
			}))}
		/>
	),
};

export const KeyboardInteraction: Story = {
	render: (args) => <Controlado onValueChange={args.onValueChange} options={groupedOptions} />,
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const body = within(canvasElement.ownerDocument.body);
		const input = canvas.getByRole("combobox");
		// abre e busca
		await userEvent.click(input);
		await userEvent.type(input, "A2");
		await waitFor(() => expect(body.getByText("Opção A2")).toBeVisible());
		// navega e seleciona com teclado
		await userEvent.keyboard("{ArrowDown}{Enter}");
		await waitFor(() => expect(args.onValueChange).toHaveBeenCalledWith("a2"));
		// fecha com Escape
		await userEvent.keyboard("{Escape}");
	},
};

export const ComLabelExterno: Story = {
	render: (args) => (
		<div className="grid w-64 gap-1.5">
			<Label htmlFor="cb-tipo">Tipo de registro</Label>
			<Controlado onValueChange={args.onValueChange} id="cb-tipo" />
		</div>
	),
};
