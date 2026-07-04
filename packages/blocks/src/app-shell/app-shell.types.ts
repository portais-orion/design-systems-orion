import type * as React from "react";

import type {
	BreadcrumbItem,
	CanAccessNavigationItem,
	NavigationItem,
	RenderLink,
} from "../navigation";

export type AppShellProps = {
	brand?: React.ReactNode;
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
