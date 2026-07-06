"use client";

import { Menu } from "lucide-react";
import * as React from "react";

import { Button, Sheet, SheetContent, SheetTitle, SheetTrigger, cn } from "@portais-orion/ui";

import { Breadcrumbs } from "../breadcrumbs";
import { Sidebar } from "../sidebar";
import type { AppShellProps } from "./app-shell.types";

/*
 * Chrome oficial dos portais: sidebar lateral + barra de breadcrumbs no topo
 * do conteÃºdo + miolo (page layouts da Sprint 5). SEM header/topbar fixo â€”
 * padrÃ£o do grupo (AdminShell do Supertrans).
 *
 * Responsividade: no desktop (md+) a sidebar Ã© fixa lateral; abaixo de md
 * ela desaparece e um botÃ£o minimalista na barra de breadcrumbs abre a MESMA
 * navegaÃ§Ã£o num Sheet (drawer Ã  esquerda). O shell nÃ£o conhece rotas,
 * sessÃ£o ou permissÃµes â€” renderLink e canAccessItem sÃ£o injetados.
 */
export function AppShell({
	brand,
	navigation,
	activeItemId,
	breadcrumbs,
	renderLink,
	canAccessItem,
	sidebarFooter,
	children,
	collapsed,
	defaultCollapsed,
	onCollapsedChange,
	className,
	contentClassName,
}: AppShellProps) {
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const sidebarProps = {
		brand,
		navigation,
		activeItemId,
		canAccessItem,
		renderLink,
		footer: sidebarFooter,
	};

	return (
		<div className={cn("flex h-screen overflow-hidden bg-muted/30", className)}>
			<div className="hidden h-full md:block">
				<Sidebar
					{...sidebarProps}
					collapsed={collapsed}
					defaultCollapsed={defaultCollapsed}
					onCollapsedChange={onCollapsedChange}
				/>
			</div>

			<div className="flex min-w-0 flex-1 flex-col">
				<div className="flex h-12 shrink-0 items-center gap-3 border-b border-border bg-background px-4 md:px-6">
					<Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
						<SheetTrigger
							render={
								<Button
									variant="ghost"
									size="icon-sm"
									aria-label="Abrir menu de navegaÃ§Ã£o"
									className="md:hidden"
								>
									<Menu />
								</Button>
							}
						/>
						<SheetContent side="left" className="w-72 max-w-full p-0 [&>button]:z-10">
							<SheetTitle className="sr-only">Menu de navegaÃ§Ã£o</SheetTitle>
							<Sidebar
								{...sidebarProps}
								className="h-full w-full border-r-0"
								renderLink={(props) =>
									(
										renderLink ??
										((p) => (
											<a
												href={p.href}
												className={p.className}
												{...(p["aria-current"] ? { "aria-current": p["aria-current"] } : {})}
											>
												{p.children}
											</a>
										))
									)({
										...props,
										onClick: (e) => {
											props.onClick?.(e);
											setMobileOpen(false);
										},
									})
								}
							/>
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
