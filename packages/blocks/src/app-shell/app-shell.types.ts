import type * as React from "react";

import type {
	BreadcrumbItem,
	CanAccessNavigationItem,
	NavigationItem,
	RenderLink,
} from "../navigation";
import type { SidebarModule } from "../sidebar";

export type AppShellProps = {
	brand?: React.ReactNode;
	/** Módulo ativo, repassado à Sidebar. */
	activeModule?: SidebarModule;
	navigation: NavigationItem[];
	activeItemId?: string;
	breadcrumbs?: BreadcrumbItem[];
	renderLink?: RenderLink;
	canAccessItem?: CanAccessNavigationItem;
	sidebarFooter?: React.ReactNode;
	children: React.ReactNode;
	collapsed?: boolean;
	defaultCollapsed?: boolean;
	onCollapsedChange?: (collapsed: boolean) => void;
	className?: string;
	contentClassName?: string;
};
