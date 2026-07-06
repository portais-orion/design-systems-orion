import type * as React from "react";

/*
 * Tipos de navega��o do chrome oficial (Sidebar/AppShell/Breadcrumbs).
 * O n�cleo renderiza; o portal fornece destinos (renderLink) e visibilidade
 * (canAccessItem). Nenhuma permiss�o real � interpretada aqui.
 */
export type NavigationItem = {
	id: string;
	label: string;
	href?: string;
	icon?: React.ComponentType<{ className?: string }>;
	badge?: React.ReactNode;
	disabled?: boolean;
	children?: NavigationItem[];
	/** Espa�o livre do portal (ex.: chave de permiss�o). O n�cleo N�O interpreta. */
	meta?: Record<string, unknown>;
};

export type BreadcrumbItem = {
	label: React.ReactNode;
	href?: string;
	current?: boolean;
};

export type RenderLinkProps = {
	href: string;
	children: React.ReactNode;
	className?: string;
	"aria-current"?: "page";
	onClick?: React.MouseEventHandler<HTMLElement>;
};

export type RenderLink = (props: RenderLinkProps) => React.ReactNode;

export type CanAccessNavigationItem = (item: NavigationItem) => boolean;

/**
 * Filtra a �rvore de navega��o:
 * - item negado por canAccessItem some;
 * - filhos s�o filtrados recursivamente;
 * - pai SEM href que ficou sem filhos some (grupo/submenu vazio);
 * - pai COM href e filhos todos filtrados permanece como link simples.
 */
export function filterNavigation(
	items: NavigationItem[],
	canAccessItem?: CanAccessNavigationItem,
): NavigationItem[] {
	if (!canAccessItem) return items;
	return items.flatMap((item) => {
		if (!canAccessItem(item)) return [];
		if (!item.children?.length) return [item];
		const children = filterNavigation(item.children, canAccessItem);
		if (children.length === 0 && !item.href) return [];
		return [{ ...item, children }];
	});
}

/** true se o item ou algum descendente � o ativo. */
export function containsActiveItem(item: NavigationItem, activeItemId?: string): boolean {
	if (!activeItemId) return false;
	if (item.id === activeItemId) return true;
	return item.children?.some((c) => containsActiveItem(c, activeItemId)) ?? false;
}
