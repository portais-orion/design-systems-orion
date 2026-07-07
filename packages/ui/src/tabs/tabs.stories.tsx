import type { Meta, StoryObj } from "@storybook/react";
import { User, Key, Bell } from "lucide-react";
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
		<Tabs defaultValue="geral" className="w-[400px]">
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

export const Line: Story = {
	render: () => (
		<Tabs defaultValue="geral" className="w-[400px]">
			<TabsList variant="line">
				<TabsTrigger value="geral">Geral</TabsTrigger>
				<TabsTrigger value="detalhes">Detalhes</TabsTrigger>
				<TabsTrigger value="historico" disabled>
					Histórico
				</TabsTrigger>
			</TabsList>
			<TabsContent value="geral">
				<Card className="mt-4 border-none shadow-none">
					<CardHeader className="p-0 pb-2">
						<CardTitle>Geral</CardTitle>
						<CardDescription>Variante linha (line).</CardDescription>
					</CardHeader>
					<CardContent className="p-0 text-sm text-muted-foreground">
						Estilo com borda inferior destacando a aba ativa.
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value="detalhes">
				<Card className="mt-4 border-none shadow-none">
					<CardHeader className="p-0 pb-2">
						<CardTitle>Detalhes</CardTitle>
					</CardHeader>
					<CardContent className="p-0 text-sm text-muted-foreground">
						Conteúdo da aba Detalhes.
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	),
};

export const Vertical: Story = {
	render: () => (
		<Tabs defaultValue="conta" orientation="vertical" className="flex w-[600px] gap-6">
			<TabsList className="w-[200px]">
				<TabsTrigger value="conta">
					<User className="size-4 mr-2" />
					Conta
				</TabsTrigger>
				<TabsTrigger value="senha">
					<Key className="size-4 mr-2" />
					Senha
				</TabsTrigger>
				<TabsTrigger value="notificacoes">
					<Bell className="size-4 mr-2" />
					Notificações
				</TabsTrigger>
			</TabsList>
			<div className="flex-1">
				<TabsContent value="conta" className="mt-0">
					<Card>
						<CardHeader>
							<CardTitle>Conta</CardTitle>
							<CardDescription>Faça alterações na sua conta aqui.</CardDescription>
						</CardHeader>
						<CardContent className="text-sm text-muted-foreground">
							Configurações de perfil.
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="senha" className="mt-0">
					<Card>
						<CardHeader>
							<CardTitle>Senha</CardTitle>
							<CardDescription>Altere sua senha aqui.</CardDescription>
						</CardHeader>
						<CardContent className="text-sm text-muted-foreground">
							Campos para nova senha.
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="notificacoes" className="mt-0">
					<Card>
						<CardHeader>
							<CardTitle>Notificações</CardTitle>
							<CardDescription>Configure como receber avisos.</CardDescription>
						</CardHeader>
						<CardContent className="text-sm text-muted-foreground">
							Opções de email e push.
						</CardContent>
					</Card>
				</TabsContent>
			</div>
		</Tabs>
	),
};

export const VerticalLine: Story = {
	render: () => (
		<Tabs defaultValue="conta" orientation="vertical" className="flex w-[600px] gap-6">
			<TabsList variant="line" className="w-[200px]">
				<TabsTrigger value="conta">
					<User className="size-4 mr-2" />
					Conta
				</TabsTrigger>
				<TabsTrigger value="senha">
					<Key className="size-4 mr-2" />
					Senha
				</TabsTrigger>
				<TabsTrigger value="notificacoes">
					<Bell className="size-4 mr-2" />
					Notificações
				</TabsTrigger>
			</TabsList>
			<div className="flex-1">
				<TabsContent value="conta" className="mt-0">
					<Card className="border-none shadow-none">
						<CardHeader className="p-0 pb-2">
							<CardTitle>Conta</CardTitle>
							<CardDescription>Faça alterações na sua conta aqui.</CardDescription>
						</CardHeader>
						<CardContent className="p-0 text-sm text-muted-foreground">
							Configurações de perfil.
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="senha" className="mt-0">
					<Card className="border-none shadow-none">
						<CardHeader className="p-0 pb-2">
							<CardTitle>Senha</CardTitle>
							<CardDescription>Altere sua senha aqui.</CardDescription>
						</CardHeader>
						<CardContent className="p-0 text-sm text-muted-foreground">
							Campos para nova senha.
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="notificacoes" className="mt-0">
					<Card className="border-none shadow-none">
						<CardHeader className="p-0 pb-2">
							<CardTitle>Notificações</CardTitle>
							<CardDescription>Configure como receber avisos.</CardDescription>
						</CardHeader>
						<CardContent className="p-0 text-sm text-muted-foreground">
							Opções de email e push.
						</CardContent>
					</Card>
				</TabsContent>
			</div>
		</Tabs>
	),
};
