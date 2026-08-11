import type * as React from "react";

import type { BreadcrumbItem, RenderLink } from "../navigation";
import type { SidebarProps } from "../sidebar";

/**
 * O que o shell precisa saber para montar a Sidebar sozinho. É o `SidebarProps`
 * menos o que o shell decide: colapso (ele é o dono) e o modo drawer.
 */
export type AppShellSidebar = Omit<
	SidebarProps,
	"collapsed" | "defaultCollapsed" | "onCollapsedChange" | "collapsible" | "onNavigate"
>;

/** O que o shell entrega a quem monta a sidebar por conta própria. */
export type AppShellSidebarSlotProps = {
	isMobile: boolean;
	onNavigate?: () => void;
	/** Estado de colapso resolvido pelo shell (sempre `false` no drawer). */
	collapsed: boolean;
	onCollapsedChange: (collapsed: boolean) => void;
	/** `false` no drawer, onde colapsar não faz sentido. */
	collapsible: boolean;
};

export type AppShellProps = {
	/** Navegação do portal — o caminho normal: o shell monta a `Sidebar`. */
	sidebar?: AppShellSidebar;
	/**
	 * Escape hatch para quem precisa de outra sidebar. Recebe o estado de
	 * colapso já resolvido pelo shell. Use `sidebar` quando puder.
	 */
	renderSidebar?: (props: AppShellSidebarSlotProps) => React.ReactNode;
	breadcrumbs?: BreadcrumbItem[];
	/** Injetor de links usado pelos breadcrumbs. */
	renderLink?: RenderLink;
	children: React.ReactNode;
	/** Colapso controlado. Sem isso, o shell guarda o estado. */
	collapsed?: boolean;
	defaultCollapsed?: boolean;
	onCollapsedChange?: (collapsed: boolean) => void;
	className?: string;
	contentClassName?: string;
};
