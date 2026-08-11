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

import { Breadcrumbs } from "../breadcrumbs";
import type { AppShellProps } from "./app-shell.types";

/*
 * Chrome oficial dos portais: sidebar lateral + barra de breadcrumbs no topo
 * do conteúdo + miolo (page layouts da Sprint 5). SEM header/topbar fixo —
 * padrão do grupo (AdminShell do Supertrans).
 *
 * Responsividade: no desktop (md+) a sidebar é fixa lateral; abaixo de md
 * ela desaparece e um botão minimalista na barra de breadcrumbs abre a MESMA
 * navegação num Sheet (drawer à esquerda). O shell não conhece rotas,
 * sessão ou permissões — o Sidebar é injetado através da propriedade `renderSidebar`.
 */
/**
 * Chrome do portal: sidebar fixa, barra de breadcrumbs e a área de conteúdo.
 * Não tem topbar, por decisão do padrão do grupo. Abaixo de `md` a sidebar vira
 * um drawer com a mesma navegação. Não conhece rota, sessão nem permissão —
 * injete o Sidebar via `renderSidebar`.
 */
export function AppShell({
	renderSidebar,
	breadcrumbs,
	renderLink,
	children,
	collapsed,
	defaultCollapsed,
	onCollapsedChange,
	className,
	contentClassName,
}: AppShellProps) {
	const [mobileOpen, setMobileOpen] = React.useState(false);

	return (
		<div className={cn("flex h-screen overflow-hidden bg-muted/30", className)}>
			<div className="hidden h-full md:block">
				<div className="h-full">{renderSidebar({ isMobile: false })}</div>
			</div>

			<div className="flex min-w-0 flex-1 flex-col">
				<div className="flex h-12 shrink-0 items-center gap-3 border-b border-border bg-background px-4 md:px-6">
					<Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
						<SheetTrigger
							render={
								<Button
									variant="ghost"
									size="icon-sm"
									aria-label="Abrir menu de navegação"
									className="md:hidden"
								>
									<Menu />
								</Button>
							}
						/>
						<SheetContent side="left" className="w-72 max-w-full p-0 [&>button]:z-10">
							<SheetTitle className="sr-only">Menu de navegação</SheetTitle>
							{/* No drawer a sidebar já ocupa a tela toda: colapsar não faz sentido. */}
							{renderSidebar({ isMobile: true, onNavigate: () => setMobileOpen(false) })}
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
