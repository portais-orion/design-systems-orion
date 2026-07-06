import { Input, Textarea } from "@portais-orion/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { FormField } from "../form-field";
import { FieldGroup } from "./field-group";

const meta: Meta<typeof FieldGroup> = {
	title: "Blocks/Forms/FieldGroup",
	component: FieldGroup,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FieldGroup>;

const campo = (n: number) => (
	<FormField key={n} label={`Campo ${n}`} htmlFor={`fg-${n}`}>
		<Input id={`fg-${n}`} />
	</FormField>
);

export const OneColumn: Story = {
	render: () => (
		<FieldGroup columns={1} className="w-80">
			{[1, 2].map(campo)}
		</FieldGroup>
	),
};

export const TwoColumns: Story = {
	render: () => (
		<FieldGroup columns={2} className="w-[36rem]">
			{[1, 2, 3, 4].map(campo)}
		</FieldGroup>
	),
};

export const ThreeColumns: Story = {
	render: () => (
		<FieldGroup columns={3} className="w-[48rem]">
			{[1, 2, 3].map(campo)}
		</FieldGroup>
	),
};

export const FourColumns: Story = {
	render: () => (
		<FieldGroup columns={4} className="w-[56rem]">
			{[1, 2, 3, 4].map(campo)}
		</FieldGroup>
	),
};

export const WithMixedFields: Story = {
	render: () => (
		<FieldGroup columns={2} className="w-[36rem]">
			{campo(1)}
			{campo(2)}
			<FormField label="Observações" htmlFor="fg-obs" className="sm:col-span-2">
				<Textarea id="fg-obs" rows={3} />
			</FormField>
		</FieldGroup>
	),
};
