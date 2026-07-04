import type { Meta, StoryObj } from "@storybook/react";
import { LogOut, Settings, User } from "lucide-react";
import { Button } from "../button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "./dropdown-menu";

const meta: Meta<typeof DropdownMenu> = {
	title: "UI/DropdownMenu",
	component: DropdownMenu,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger render={<Button variant="outline">Abrir menu</Button>} />
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>Minha conta</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<User /> Perfil
					<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Settings /> Configurações
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem disabled>Item desabilitado</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<LogOut /> Sair
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
};

export const ComCheckboxESubmenu: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger render={<Button variant="outline">Exibir colunas</Button>} />
			<DropdownMenuContent className="w-56">
				<DropdownMenuCheckboxItem defaultChecked>Nome</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem defaultChecked>Status</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem>Criado em</DropdownMenuCheckboxItem>
				<DropdownMenuSeparator />
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>Exportar</DropdownMenuSubTrigger>
					<DropdownMenuSubContent>
						<DropdownMenuItem>Excel</DropdownMenuItem>
						<DropdownMenuItem>PDF</DropdownMenuItem>
					</DropdownMenuSubContent>
				</DropdownMenuSub>
			</DropdownMenuContent>
		</DropdownMenu>
	),
};
