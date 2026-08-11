import type * as React from "react";

import type { BreadcrumbItem, RenderLink } from "../navigation";

export type AppShellProps = {
	/** Slot para renderizar a Sidebar. Recebe propriedades para adaptar entre Desktop e Mobile. */
	renderSidebar: (props: { isMobile: boolean; onNavigate?: () => void }) => React.ReactNode;
	breadcrumbs?: BreadcrumbItem[];
	/** Injetor de links usado pelos breadcrumbs. */
	renderLink?: RenderLink;
	children: React.ReactNode;
	collapsed?: boolean;
	defaultCollapsed?: boolean;
	onCollapsedChange?: (collapsed: boolean) => void;
	className?: string;
	contentClassName?: string;
};
