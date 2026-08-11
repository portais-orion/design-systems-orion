"use client";

import * as React from "react";

import { Card, cn } from "@design-systems-orion/ui";

export type StatusCardTone = "default" | "success" | "warning" | "danger" | "info" | "muted";

export type StatusCardsProps = {
	columns?: 2 | 3 | 4;
	className?: string;
	children?: React.ReactNode;
};

export type StatusCardItemProps = {
	tone?: StatusCardTone;
	onClick?: () => void;
	active?: boolean;
	className?: string;
	children?: React.ReactNode;
};

export type StatusCardIconProps = {
	as: React.ComponentType<{ className?: string }>;
	className?: string;
};

export type StatusCardContentProps = {
	className?: string;
	children?: React.ReactNode;
};

const gridByColumns: Record<2 | 3 | 4, string> = {
	2: "sm:grid-cols-2",
	3: "sm:grid-cols-2 lg:grid-cols-3",
	4: "sm:grid-cols-2 lg:grid-cols-4",
};

const iconBoxByTone: Record<StatusCardTone, string> = {
	default: "bg-primary/10 text-primary",
	success: "bg-emerald-50 text-emerald-600",
	warning: "bg-amber-50 text-amber-600",
	danger: "bg-destructive/10 text-destructive",
	info: "bg-sky-50 text-sky-600",
	muted: "bg-muted text-muted-foreground",
};

// Contexto para repassar o tom (tone) do Item para os filhos (Icon)
const StatusCardContext = React.createContext<{ tone: StatusCardTone }>({ tone: "default" });

/**
 * Faixa de indicadores (Status Cards). Container para os cards.
 */
function StatusCardsRoot({ columns = 4, className, children }: StatusCardsProps) {
	return (
		<div className={cn("grid grid-cols-1 gap-4", gridByColumns[columns], className)}>
			{children}
		</div>
	);
}

/**
 * Um Card individual. Se receber `onClick`, renderiza como `<button>`.
 */
function StatusCardItem({
	tone = "default",
	onClick,
	active,
	className,
	children,
}: StatusCardItemProps) {
	const Comp = onClick ? "button" : "div";
	const isButton = Boolean(onClick);

	const content = (
		<StatusCardContext.Provider value={{ tone }}>
			<div className="flex items-center gap-4 p-5 text-left">{children}</div>
		</StatusCardContext.Provider>
	);

	if (isButton) {
		return (
			<button
				type="button"
				onClick={onClick}
				aria-pressed={active}
				className={cn(
					"rounded-xl border bg-card text-card-foreground shadow-sm outline-none transition-all hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring w-full text-left",
					active ? "border-primary ring-2 ring-primary/20" : "border-border",
					className,
				)}
			>
				{content}
			</button>
		);
	}

	return <Card className={cn("p-0 overflow-hidden", className)}>{content}</Card>;
}

/**
 * Ícone do card, renderizado com o fundo correspondente ao tom (tone) do Item.
 */
function StatusCardIcon({ as: Icon, className }: StatusCardIconProps) {
	const { tone } = React.useContext(StatusCardContext);
	return (
		<div
			className={cn(
				"flex size-11 shrink-0 items-center justify-center rounded-lg",
				iconBoxByTone[tone],
				className,
			)}
		>
			<Icon className="size-5" />
		</div>
	);
}

/**
 * Container para os textos (label, valor, descrição).
 */
function StatusCardContent({ className, children }: StatusCardContentProps) {
	return <div className={cn("min-w-0 flex-1", className)}>{children}</div>;
}

/**
 * Título/Rótulo superior do card.
 */
function StatusCardLabel({
	className,
	children,
}: { className?: string; children?: React.ReactNode }) {
	return <p className={cn("truncate text-sm text-muted-foreground", className)}>{children}</p>;
}

/**
 * Valor em destaque no card.
 */
function StatusCardValue({
	className,
	children,
}: { className?: string; children?: React.ReactNode }) {
	return <p className={cn("text-2xl font-bold text-foreground", className)}>{children}</p>;
}

/**
 * Descrição adicional abaixo do valor.
 */
function StatusCardDescription({
	className,
	children,
}: { className?: string; children?: React.ReactNode }) {
	return (
		<p className={cn("truncate text-xs text-muted-foreground mt-0.5", className)}>{children}</p>
	);
}

export const StatusCards = Object.assign(StatusCardsRoot, {
	Item: StatusCardItem,
	Icon: StatusCardIcon,
	Content: StatusCardContent,
	Label: StatusCardLabel,
	Value: StatusCardValue,
	Description: StatusCardDescription,
});
