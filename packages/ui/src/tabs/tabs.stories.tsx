import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const meta: Meta<typeof Tabs> = {
	title: "UI/Tabs",
	component: Tabs,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
	render: () => (
		<Tabs defaultValue="geral" className="w-96">
			<TabsList>
				<TabsTrigger value="geral">Geral</TabsTrigger>
				<TabsTrigger value="detalhes">Detalhes</TabsTrigger>
				<TabsTrigger value="historico" disabled>
					Histórico
				</TabsTrigger>
			</TabsList>
			<TabsContent value="geral">
				<Card>
					<CardHeader>
						<CardTitle>Geral</CardTitle>
						<CardDescription>Informações gerais do registro.</CardDescription>
					</CardHeader>
					<CardContent className="text-sm text-muted-foreground">
						Conteúdo da aba Geral.
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value="detalhes">
				<Card>
					<CardHeader>
						<CardTitle>Detalhes</CardTitle>
					</CardHeader>
					<CardContent className="text-sm text-muted-foreground">
						Conteúdo da aba Detalhes.
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	),
};
