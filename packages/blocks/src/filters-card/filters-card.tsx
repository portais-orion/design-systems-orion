"use client";

import { ChevronDown, Filter, X } from "lucide-react";
import * as React from "react";

import { Button, Card, CardContent, cn } from "@portais-orion/ui";

/*
 * Card de filtros colapsável para listagens CRUD: título com ícone + toggle
 * Mostrar/Ocultar, corpo por slot (busca + selects) e footer com "Limpar filtros".
 * Estado interno (não-controlado) ou controlado via open/onOpenChange.
 * Presentational — não conhece os filtros, só os renderiza.
 */
export type FiltersCardProps = {
	title?: string;
	icon?: React.ComponentType<{ className?: string }>;
	defaultOpen?: boolean;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	onClear?: () => void;
	clearLabel?: string;
	/** Controles de filtro (SearchBar, selects, etc.). */
	children: React.ReactNode;
	/** Ações extras no footer, à esquerda do "Limpar". */
	footer?: React.ReactNode;
	className?: string;
};

/**
 * Card colapsável que abriga os controles de filtro de uma listagem. Não conhece
 * os filtros: renderiza o que vier em `children` e avisa por `onClear`. Funciona
 * não-controlado (`defaultOpen`) ou controlado (`open` + `onOpenChange`).
 */
export function FiltersCard({
	title = "Filtros",
	icon: Icon = Filter,
	defaultOpen = true,
	open,
	onOpenChange,
	onClear,
	clearLabel = "Limpar filtros",
	children,
	footer,
	className,
}: FiltersCardProps) {
	const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
	const isControlled = open !== undefined;
	const isOpen = isControlled ? open : internalOpen;

	const toggle = () => {
		const next = !isOpen;
		if (!isControlled) setInternalOpen(next);
		onOpenChange?.(next);
	};

	return (
		<Card className={cn("overflow-hidden", className)}>
			<div className="flex items-center justify-between gap-3 px-6 py-4">
				<div className="flex items-center gap-2 text-sm font-semibold text-foreground">
					<Icon className="size-4 text-muted-foreground" />
					{title}
				</div>
				<Button variant="ghost" size="sm" onClick={toggle} aria-expanded={isOpen}>
					{isOpen ? "Ocultar" : "Mostrar"}
					<ChevronDown className={cn("transition-transform", isOpen && "rotate-180")} />
				</Button>
			</div>

			{isOpen && (
				<>
					<CardContent className="pt-0">{children}</CardContent>
					{(onClear || footer) && (
						<div className="flex items-center justify-end gap-2 border-t border-border px-6 py-3">
							{footer}
							{onClear && (
								<Button variant="ghost" size="sm" onClick={onClear}>
									<X />
									{clearLabel}
								</Button>
							)}
						</div>
					)}
				</>
			)}
		</Card>
	);
}
