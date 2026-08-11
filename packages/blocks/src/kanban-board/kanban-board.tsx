import * as React from "react";

import { cn } from "@design-systems-orion/ui";

export type KanbanTone = "default" | "success" | "warning" | "danger" | "info" | "muted";

export type KanbanBoardProps = {
	emptyMessage?: string;
	className?: string;
	children?: React.ReactNode;
};

export type KanbanColumnProps = {
	title: React.ReactNode;
	count?: number;
	tone?: KanbanTone;
	className?: string;
	children?: React.ReactNode;
};

export type KanbanCardProps = {
	tone?: KanbanTone;
	onClick?: () => void;
	className?: string;
	children?: React.ReactNode;
};

const dotToneClass: Record<KanbanTone, string> = {
	default: "bg-foreground/60",
	success: "bg-emerald-500",
	warning: "bg-amber-500",
	danger: "bg-rose-500",
	info: "bg-sky-500",
	muted: "bg-muted-foreground/50",
};

const cardBorderToneClass: Record<KanbanTone, string> = {
	default: "border-l-foreground/40",
	success: "border-l-emerald-500",
	warning: "border-l-amber-500",
	danger: "border-l-rose-500",
	info: "border-l-sky-500",
	muted: "border-l-muted-foreground/40",
};

/**
 * Quadro Kanban em formato Compound Components.
 * Renderiza um container horizontal flexível.
 */
function KanbanBoardRoot({
	emptyMessage = "Nenhuma coluna.",
	className,
	children,
}: KanbanBoardProps) {
	// Verifica se tem filhos válidos
	let hasChildren = false;
	React.Children.forEach(children, (child) => {
		if (child) hasChildren = true;
	});

	if (!hasChildren) {
		return <p className="py-8 text-center text-sm text-muted-foreground">{emptyMessage}</p>;
	}

	return <div className={cn("flex gap-4 overflow-x-auto pb-2", className)}>{children}</div>;
}

/**
 * Coluna do Kanban. Agrupa os cards de um status específico.
 */
function KanbanColumn({ title, count, tone = "default", className, children }: KanbanColumnProps) {
	// Calcular count se não for provido explicitamente
	let childCount = 0;
	if (count === undefined) {
		React.Children.forEach(children, (child) => {
			if (child) childCount++;
		});
	}
	const displayCount = count ?? childCount;

	return (
		<div
			className={cn(
				"flex w-72 shrink-0 flex-col rounded-xl border border-border bg-muted/20",
				className,
			)}
		>
			<div className="flex items-center gap-2 border-b border-border px-3 py-2.5">
				<span className={cn("size-2 rounded-full", dotToneClass[tone])} />
				<h3 className="text-sm font-semibold text-foreground">{title}</h3>
				<span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
					{displayCount}
				</span>
			</div>
			<div className="flex flex-col gap-2 p-2.5">
				{childCount === 0 && count === undefined ? (
					<p className="py-4 text-center text-xs text-muted-foreground">Vazio.</p>
				) : (
					children
				)}
			</div>
		</div>
	);
}

/**
 * Card do Kanban.
 */
function KanbanCard({ tone = "default", onClick, className, children }: KanbanCardProps) {
	const Comp = onClick ? "button" : "div";
	return (
		<Comp
			type={onClick ? "button" : undefined}
			onClick={onClick}
			className={cn(
				"rounded-lg border border-l-4 bg-card p-3 text-left shadow-sm transition-shadow",
				cardBorderToneClass[tone],
				onClick ? "cursor-pointer hover:shadow-md" : "cursor-default",
				className,
			)}
		>
			{children}
		</Comp>
	);
}

export const KanbanBoard = Object.assign(KanbanBoardRoot, {
	Column: KanbanColumn,
	Card: KanbanCard,
});
