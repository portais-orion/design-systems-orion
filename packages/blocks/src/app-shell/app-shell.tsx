"use client";

import { Menu } from "lucide-react";
import * as React from "react";

import {
	Button,
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
	cn,
} from "@design-systems-orion/ui";

import { useControllable } from "../_internal/use-controllable";
import { Breadcrumbs } from "../breadcrumbs";
import { useBlocksCopy } from "../copy";
import { Sidebar } from "../sidebar";
import type { AppShellProps, AppShellSidebarSlotProps } from "./app-shell.types";

/*
 * Chrome oficial dos portais: sidebar lateral + barra de breadcrumbs no topo
 * do conteúdo + miolo (page layouts da Sprint 5). SEM header/topbar fixo —
 * padrão do grupo (AdminShell do Supertrans).
 *
 * Responsividade: no desktop (md+) a sidebar é fixa lateral; abaixo de md
 * ela desaparece e um botão minimalista na barra de breadcrumbs abre a MESMA
 * navegação num Sheet (drawer à esquerda). O shell não conhece rotas, sessão
 * ou permissões — a navegação chega como dados em `sidebar`.
 *
 * O shell é o dono do colapso. Antes, `collapsed`/`defaultCollapsed`/
 * `onCollapsedChange` existiam na interface mas não eram lidos: quem guardava
 * o estado era o portal, que reinjetava tudo na Sidebar por um closure de
 * `renderSidebar` repetido em cada uso. Agora as props valem, e `renderSidebar`
 * fica como escape hatch — recebendo o estado já resolvido.
 */
/**
 * Chrome do portal: sidebar fixa, barra de breadcrumbs e a área de conteúdo.
 * Não tem topbar, por decisão do padrão do grupo. Abaixo de `md` a sidebar vira
 * um drawer com a mesma navegação. Não conhece rota, sessão nem permissão —
 * passe a navegação em `sidebar` (ou monte a sua com `renderSidebar`).
 */
export function AppShell({
	sidebar,
	renderSidebar,
	breadcrumbs,
	renderLink,
	children,
	collapsed: collapsedProp,
	defaultCollapsed = false,
	onCollapsedChange,
	className,
	contentClassName,
}: AppShellProps) {
	const copy = useBlocksCopy();
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [collapsed, setCollapsed] = useControllable(
		collapsedProp,
		defaultCollapsed,
		onCollapsedChange,
	);

	if (!sidebar && !renderSidebar) {
		throw new Error("AppShell precisa de `sidebar` (navegação) ou de `renderSidebar`.");
	}

	/* No drawer a sidebar já ocupa a tela toda: colapsar não faz sentido. */
	const renderNavigation = (slot: AppShellSidebarSlotProps) => {
		if (renderSidebar) return renderSidebar(slot);
		if (!sidebar) return null;
		return (
			<Sidebar
				{...sidebar}
				collapsed={slot.collapsed}
				onCollapsedChange={slot.onCollapsedChange}
				collapsible={slot.collapsible}
				onNavigate={slot.onNavigate}
			/>
		);
	};

	return (
		<div className={cn("flex h-screen overflow-hidden bg-muted/30", className)}>
			<div className="hidden h-full md:block">
				<div className="h-full">
					{renderNavigation({
						isMobile: false,
						collapsed,
						onCollapsedChange: setCollapsed,
						collapsible: true,
					})}
				</div>
			</div>

			<div className="flex min-w-0 flex-1 flex-col">
				<div className="flex h-12 shrink-0 items-center gap-3 border-b border-border bg-background px-4 md:px-6">
					<Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
						<SheetTrigger
							render={
								<Button
									variant="ghost"
									size="icon-sm"
									aria-label={copy.appShell.openNavigation}
									className="md:hidden"
								>
									<Menu />
								</Button>
							}
						/>
						<SheetContent side="left" className="w-72 max-w-full p-0">
							<SheetTitle className="sr-only">{copy.appShell.navigationMenu}</SheetTitle>
							{renderNavigation({
								isMobile: true,
								onNavigate: () => setMobileOpen(false),
								collapsed: false,
								onCollapsedChange: setCollapsed,
								collapsible: false,
							})}
						</SheetContent>
					</Sheet>
					{breadcrumbs && breadcrumbs.length > 0 && (
						<Breadcrumbs items={breadcrumbs} renderLink={renderLink} />
					)}
				</div>

				<main className={cn("min-h-0 flex-1 overflow-y-auto", contentClassName)}>{children}</main>
			</div>
		</div>
	);
}
