"use client";

import type * as React from "react";

import { Card, cn } from "@grupo/ui";

/*
 * Recriado a partir do Portal-Aurora ui/DataTable/StatusCards.tsx.
 * Diferenças: itens por props com tons semânticos (o original recebia
 * bgColor/textColor como strings de classe); clique é opcional por item
 * (no original todo card era botão de filtro).
 */
export type StatusCardTone = "default" | "success" | "warning" | "danger" | "info" | "muted";

export type StatusCardItem = {
	label: string;
	value: React.ReactNode;
	description?: string;
	icon?: React.ComponentType<{ className?: string }>;
	tone?: StatusCardTone;
	onClick?: () => void;
	active?: boolean;
};

export type StatusCardsProps = {
	items: StatusCardItem[];
	columns?: 2 | 3 | 4;
	className?: string;
};

const iconBoxByTone: Record<StatusCardTone, string> = {
	default: "bg-primary/10 text-primary",
	success: "bg-emerald-50 text-emerald-600",
	warning: "bg-amber-50 text-amber-600",
	danger: "bg-destructive/10 text-destructive",
	info: "bg-sky-50 text-sky-600",
	muted: "bg-muted text-muted-foreground",
};

const gridByColumns: Record<2 | 3 | 4, string> = {
	2: "sm:grid-cols-2",
	3: "sm:grid-cols-2 lg:grid-cols-3",
	4: "sm:grid-cols-2 lg:grid-cols-4",
};

function StatusCardContent({ item }: { item: StatusCardItem }) {
	const Icon = item.icon;
	return (
		<div className="flex items-center gap-4 p-5">
			{Icon && (
				<div
					className={cn(
						"flex size-11 shrink-0 items-center justify-center rounded-lg",
						iconBoxByTone[item.tone ?? "default"],
					)}
				>
					<Icon className="size-5" />
				</div>
			)}
			<div className="min-w-0 text-left">
				<p className="truncate text-sm text-muted-foreground">{item.label}</p>
				<p className="text-2xl font-bold text-foreground">{item.value}</p>
				{item.description && (
					<p className="truncate text-xs text-muted-foreground">{item.description}</p>
				)}
			</div>
		</div>
	);
}

export function StatusCards({ items, columns = 4, className }: StatusCardsProps) {
	return (
		<div className={cn("grid grid-cols-1 gap-4", gridByColumns[columns], className)}>
			{items.map((item) =>
				item.onClick ? (
					<button
						key={item.label}
						type="button"
						onClick={item.onClick}
						aria-pressed={item.active}
						className={cn(
							"rounded-xl border bg-card text-card-foreground shadow-sm outline-none transition-all hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring",
							item.active ? "border-primary ring-2 ring-primary/20" : "border-border",
						)}
					>
						<StatusCardContent item={item} />
					</button>
				) : (
					<Card key={item.label} className="p-0">
						<StatusCardContent item={item} />
					</Card>
				),
			)}
		</div>
	);
}
