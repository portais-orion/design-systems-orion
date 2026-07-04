import type { Meta, StoryObj } from "@storybook/react";
import { FormMessage } from "./form-message";

const meta: Meta<typeof FormMessage> = {
	title: "Blocks/Forms/FormMessage",
	component: FormMessage,
	tags: ["autodocs"],
	argTypes: { tone: { control: "select", options: ["default", "error", "warning", "success"] } },
};

export default meta;
type Story = StoryObj<typeof FormMessage>;

export const Default: Story = { args: { children: "Texto de apoio do campo." } };
export const ErrorStory: Story = {
	name: "Error",
	args: { tone: "error", children: "Campo obrigatório" },
};
export const Warning: Story = {
	args: { tone: "warning", children: "Valor fora do intervalo recomendado" },
};
export const Success: Story = { args: { tone: "success", children: "Disponível" } };
