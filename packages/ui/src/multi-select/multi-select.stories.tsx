import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import { MultiSelect } from "./multi-select";
import type { MultiSelectOptions } from "./multi-select.types";

const meta: Meta<typeof MultiSelect> = {
	title: "UI/MultiSelect",
	component: MultiSelect,
	tags: ["autodocs"],
	args: { onValueChange: fn() },
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

const simpleOptions: MultiSelectOptions = [
	{ label: "Opção 1", value: "option-1" },
	{ label: "Opção 2", value: "option-2" },
	{ label: "Opção 3", value: "option-3" },
	{ label: "Opção 4", value: "option-4" },
];

const groupedOptions: MultiSelectOptions = [
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
			{ label: "Opção B2", value: "b2" },
		],
	},
];

function Controlado(
	props: Partial<React.ComponentProps<typeof MultiSelect>> & { initial?: string[] },
) {
	const [value, setValue] = React.useState<string[]>(props.initial ?? props.value ?? []);
	return (
		<MultiSelect
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
			options={Array.from({ length: 15 }).map((_, i) => ({
				label: `Registro ${i + 1}`,
				value: `reg-${i + 1}`,
			}))}
			placeholder="Buscar e selecionar..."
		/>
	),
};

export const WithGroups: Story = {
	render: (args) => (
		<Controlado onValueChange={args.onValueChange} options={groupedOptions} initial={["a1"]} />
	),
};

export const Disabled: Story = {
	render: () => (
		<MultiSelect
			options={simpleOptions}
			value={["option-1", "option-2"]}
			onValueChange={fn()}
			disabled
		/>
	),
};

export const WithDisabledOptions: Story = {
	render: (args) => (
		<Controlado
			onValueChange={args.onValueChange}
			options={[
				{ label: "Disponível 1", value: "d1" },
				{ label: "Indisponível", value: "x1", disabled: true },
				{ label: "Disponível 2", value: "d2" },
			]}
		/>
	),
};

export const Clearable: Story = {
	render: (args) => (
		<Controlado onValueChange={args.onValueChange} initial={["option-1", "option-3"]} clearable />
	),
};

export const MaxDisplay: Story = {
	render: (args) => (
		<Controlado
			onValueChange={args.onValueChange}
			initial={["option-1", "option-2", "option-3", "option-4"]}
			maxDisplay={2}
		/>
	),
};

export const EmptySearch: Story = {
	render: (args) => (
		<Controlado onValueChange={args.onValueChange} emptyMessage="Nenhum resultado" />
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("combobox");
		await userEvent.type(input, "zzz");
		const body = within(canvasElement.ownerDocument.body);
		await waitFor(() => expect(body.getByText("Nenhum resultado")).toBeVisible());
	},
};

export const LongList: Story = {
	render: (args) => (
		<Controlado
			onValueChange={args.onValueChange}
			options={Array.from({ length: 100 }).map((_, i) => ({
				label: `Item ${String(i + 1).padStart(3, "0")}`,
				value: `item-${i + 1}`,
			}))}
		/>
	),
};

export const WithDescriptions: Story = {
	render: (args) => (
		<Controlado
			onValueChange={args.onValueChange}
			options={[
				{ label: "Leitura", value: "read", description: "Visualizar registros" },
				{ label: "Escrita", value: "write", description: "Criar e editar registros" },
				{ label: "Exclusão", value: "delete", description: "Remover registros" },
			]}
		/>
	),
};

export const ManySelected: Story = {
	render: (args) => (
		<Controlado
			onValueChange={args.onValueChange}
			options={Array.from({ length: 20 }).map((_, i) => ({
				label: `Item ${i + 1}`,
				value: `i-${i + 1}`,
			}))}
			initial={Array.from({ length: 12 }).map((_, i) => `i-${i + 1}`)}
			maxDisplay={4}
			clearable
			className="w-96"
		/>
	),
};

export const KeyboardInteraction: Story = {
	render: (args) => <Controlado onValueChange={args.onValueChange} options={groupedOptions} />,
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const body = within(canvasElement.ownerDocument.body);
		const input = canvas.getByRole("combobox");
		// abre, busca e seleciona duas opções
		await userEvent.click(input);
		await userEvent.type(input, "A");
		await waitFor(() => expect(body.getByText("Opção A1")).toBeVisible());
		await userEvent.click(body.getByText("Opção A1"));
		await waitFor(() => expect(args.onValueChange).toHaveBeenCalledWith(["a1"]));
		await userEvent.click(input);
		await userEvent.type(input, "A");
		await waitFor(() => expect(body.getByText("Opção A2")).toBeVisible());
		await userEvent.click(body.getByText("Opção A2"));
		await waitFor(() => expect(args.onValueChange).toHaveBeenCalledWith(["a1", "a2"]));
		// remove pelo chip
		await waitFor(() =>
			expect(canvas.getByRole("button", { name: "Remover Opção A1" })).toBeVisible(),
		);
		const remover = canvas.getByRole("button", { name: "Remover Opção A1" });
		await userEvent.click(remover);
		await waitFor(() => expect(args.onValueChange).toHaveBeenCalledWith(["a2"]));
	},
};
