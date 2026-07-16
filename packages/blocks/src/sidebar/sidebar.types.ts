import type * as React from "react";

import type { CanAccessNavigationItem, NavigationItem, RenderLink } from "../navigation";

/**
 * Módulo em que o portal está, exibido acima da navegação. O núcleo não sabe o
 * que é um módulo nem como descobri-lo: nome, ícone e destino vêm prontos.
 */
export type SidebarModule = {
	name: string;
	icon?: React.ComponentType<{ className?: string }>;
	/** Destino do "trocar módulo". Sem href, o link não é renderizado. */
	switchHref?: string;
	/** Rótulo do link de troca. Padrão: "Trocar módulo". */
	switchLabel?: string;
};

export type SidebarProps = {
	brand?: React.ReactNode;
	activeModule?: SidebarModule;
	navigation: NavigationItem[];
	activeItemId?: string;
	collapsed?: boolean;
	defaultCollapsed?: boolean;
	onCollapsedChange?: (collapsed: boolean) => void;
	/**
	 * Botão de colapso na borda. Padrão `true`. Desligue onde a sidebar não é
	 * lateral fixa (ex.: dentro do drawer mobile do AppShell), ou quando o portal
	 * já oferece o gesto em outro lugar. Mesmo desligado, `collapsed` continua
	 * valendo — só o botão some.
	 */
	collapsible?: boolean;
	canAccessItem?: CanAccessNavigationItem;
	renderLink?: RenderLink;
	onNavigate?: () => void;
	footer?: React.ReactNode;
	className?: string;
};
