import type * as React from "react";

import type { CanAccessNavigationItem, NavigationItem, RenderLink } from "../navigation";

export type SidebarProps = {
	brand?: React.ReactNode;
	navigation: NavigationItem[];
	activeItemId?: string;
	collapsed?: boolean;
	defaultCollapsed?: boolean;
	onCollapsedChange?: (collapsed: boolean) => void;
	canAccessItem?: CanAccessNavigationItem;
	renderLink?: RenderLink;
	footer?: React.ReactNode;
	className?: string;
};
