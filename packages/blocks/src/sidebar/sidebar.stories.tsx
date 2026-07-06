import { Avatar, AvatarFallback, Badge } from "@portais-orion/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { FileText, FolderOpen, Home, Lock, LogOut, Settings, Users } from "lucide-react";
import * as React from "react";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import type { NavigationItem } from "../navigation";
import { Sidebar } from "./sidebar";

const meta: Meta<typeof Sidebar> = {
	title: "Blocks/Chrome/Sidebar",
	component: Sidebar,
	tags: ["autodocs"],
	parameters: { layout: "fullscreen" },
	decorators: [
		(Story) => (
			<div className="h-[36rem]">
				<Story />
			</div>
		),
	],
};
export default meta;
type Story = StoryObj<typeof Sidebar>;

const Marca = () => <span className="text-sm font-bold tracking-wide">NÃšCLEO</span>;

const NAV: NavigationItem[] = [
	{ id: "inicio", label: "InÃ­cio", href: "#", icon: Home },
	{ id: "registros", label: "Registros", href: "#", icon: FileText },
	{
		id: "cadastros",
		label: "Cadastros",
		icon: FolderOpen,
		children: [
			{ id: "cadastros-tipos", label: "Tipos", href: "#" },
			{ id: "cadastros-categorias", label: "Categorias", href: "#" },
		],
	},
	{ id: "usuarios", label: "UsuÃ¡rios", href: "#", icon: Users },
	{ id: "config", label: "ConfiguraÃ§Ãµes", href: "#", icon: Settings },
];

export const Default: Story = {
	args: { brand: <Marca />, navigation: NAV, activeItemId: "registros" },
};

export const Collapsed: Story = {
	args: { brand: <Marca />, navigation: NAV, activeItemId: "registros", defaultCollapsed: true },
};

export const WithGroups: Story = {
	args: {
		brand: <Marca />,
		activeItemId: "registros",
		navigation: [
			{
				id: "g-operacao",
				label: "OperaÃ§Ã£o",
				meta: { group: true },
				children: NAV.slice(0, 3),
			},
			{
				id: "g-admin",
				label: "AdministraÃ§Ã£o",
				meta: { group: true },
				children: NAV.slice(3),
			},
		],
	},
};

export const WithSubmenus: Story = {
	args: { brand: <Marca />, navigation: NAV },
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const pai = canvas.getByRole("button", { name: /Cadastros/ });
		await expect(pai).toHaveAttribute("aria-expanded", "false");
		await userEvent.click(pai);
		await waitFor(() => expect(pai).toHaveAttribute("aria-expanded", "true"));
		await expect(canvas.getByText("Categorias")).toBeVisible();
		await userEvent.click(pai);
		await waitFor(() => expect(pai).toHaveAttribute("aria-expanded", "false"));
	},
};

export const WithBadges: Story = {
	args: {
		brand: <Marca />,
		navigation: [
			{ id: "inicio", label: "InÃ­cio", href: "#", icon: Home },
			{
				id: "pendencias",
				label: "PendÃªncias",
				href: "#",
				icon: FileText,
				badge: <Badge variant="destructive">12</Badge>,
			},
		],
	},
};

export const WithDisabledItems: Story = {
	args: {
		brand: <Marca />,
		navigation: [
			...NAV.slice(0, 2),
			{ id: "restrito", label: "Em breve", icon: Lock, disabled: true, href: "#" },
		],
	},
};

export const WithFilteredItems: Story = {
	args: {
		brand: <Marca />,
		navigation: NAV,
		canAccessItem: (item) => item.id !== "usuarios",
	},
};

export const WithFooter: Story = {
	args: {
		brand: <Marca />,
		navigation: NAV,
		activeItemId: "registros",
		footer: (
			<div className="flex w-full items-center gap-2.5">
				<Avatar className="size-8">
					<AvatarFallback>MA</AvatarFallback>
				</Avatar>
				<div className="min-w-0 flex-1 leading-tight">
					<p className="truncate text-xs font-semibold">UsuÃ¡rio Exemplo</p>
					<p className="truncate text-[0.65rem] text-sidebar-foreground/60">Administrador</p>
				</div>
				<button
					type="button"
					aria-label="Sair"
					className="flex size-7 shrink-0 items-center justify-center rounded text-sidebar-foreground/60 outline-none transition-colors hover:text-sidebar-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring"
				>
					<LogOut className="size-4" />
				</button>
			</div>
		),
	},
};

export const ControlledCollapsed: Story = {
	render: function Controlada(args) {
		const [collapsed, setCollapsed] = React.useState(false);
		return (
			<div className="flex h-full">
				<Sidebar
					brand={<Marca />}
					navigation={NAV}
					activeItemId="registros"
					collapsed={collapsed}
					onCollapsedChange={(c) => {
						args.onCollapsedChange?.(c);
						setCollapsed(c);
					}}
				/>
				<div className="p-4">
					<button
						type="button"
						className="rounded-md border border-border px-3 py-1.5 text-sm"
						onClick={() => {
							const next = !collapsed;
							args.onCollapsedChange?.(next);
							setCollapsed(next);
						}}
					>
						Alternar colapso (controle do portal)
					</button>
				</div>
			</div>
		);
	},
	args: { navigation: NAV, onCollapsedChange: fn() },
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const toggle = canvas.getByRole("button", { name: /Alternar colapso/ });
		await userEvent.click(toggle);
		await waitFor(() => expect(args.onCollapsedChange).toHaveBeenCalledWith(true));
		await userEvent.click(toggle);
		await waitFor(() => expect(args.onCollapsedChange).toHaveBeenCalledWith(false));
	},
};
