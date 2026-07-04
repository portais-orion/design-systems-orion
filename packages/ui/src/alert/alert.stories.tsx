import type { Meta, StoryObj } from "@storybook/react";
import { AlertCircle, Info, Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";

const meta: Meta<typeof Alert> = {
	title: "UI/Alert",
	component: Alert,
	tags: ["autodocs"],
	argTypes: {
		variant: { control: "select", options: ["default", "destructive", "info"] },
	},
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
	render: () => (
		<Alert className="w-96">
			<Terminal />
			<AlertTitle>Atenção</AlertTitle>
			<AlertDescription>Você pode adicionar componentes usando a CLI.</AlertDescription>
		</Alert>
	),
};

export const Destructive: Story = {
	render: () => (
		<Alert variant="destructive" className="w-96">
			<AlertCircle />
			<AlertTitle>Erro</AlertTitle>
			<AlertDescription>Não foi possível salvar as alterações.</AlertDescription>
		</Alert>
	),
};

export const InfoVariant: Story = {
	name: "Info",
	render: () => (
		<Alert variant="info" className="w-96">
			<Info />
			<AlertTitle>Informação</AlertTitle>
			<AlertDescription>A sincronização roda automaticamente no startup.</AlertDescription>
		</Alert>
	),
};
