import * as React from "react";

import { Card, CardContent, cn } from "@design-systems-orion/ui";
import { LoadingOverlay } from "../loading-overlay";

// Contexto para detectar se estamos dentro de um ListPageLayout.Card
const ListPageCardContext = React.createContext<boolean>(false);

export type ListPageLayoutProps = {
	className?: string;
	children?: React.ReactNode;
};

export type ListPageLayoutCardProps = {
	className?: string;
	children?: React.ReactNode;
};

export type ListPageLayoutFiltersProps = {
	className?: string;
	children?: React.ReactNode;
};

export type ListPageLayoutContentProps = {
	loading?: boolean;
	loadingLabel?: string;
	className?: string;
	children?: React.ReactNode;
};

export type ListPageLayoutFooterProps = {
	className?: string;
	children?: React.ReactNode;
};

/**
 * Raiz do layout de página de listagem.
 */
function ListPageLayoutRoot({ className, children }: ListPageLayoutProps) {
	return <div className={cn("space-y-6 p-6", className)}>{children}</div>;
}

/**
 * Container opcional para agrupar Filtros, Conteúdo e Footer dentro de um Card com borda e sombra.
 * Substitui o antigo modelo `surface="card"`.
 */
function ListPageLayoutCard({ className, children }: ListPageLayoutCardProps) {
	return (
		<ListPageCardContext.Provider value={true}>
			<Card className={cn("overflow-hidden rounded-2xl", className)}>{children}</Card>
		</ListPageCardContext.Provider>
	);
}

/**
 * Faixa de filtros. Aplica bordas e paddings automaticamente caso esteja dentro de um Card.
 */
function ListPageLayoutFilters({ className, children }: ListPageLayoutFiltersProps) {
	const inCard = React.useContext(ListPageCardContext);
	return (
		<div
			className={cn(
				"flex flex-wrap items-center gap-2",
				inCard ? "border-b border-border px-4 py-4" : "",
				className,
			)}
		>
			{children}
		</div>
	);
}

/**
 * Área de conteúdo (geralmente tabela).
 * Gerencia o estado de loading e padding automático se dentro de um Card.
 */
function ListPageLayoutContent({
	loading = false,
	loadingLabel,
	className,
	children,
}: ListPageLayoutContentProps) {
	const inCard = React.useContext(ListPageCardContext);
	const body = loading ? (
		<LoadingOverlay loading={loading} label={loadingLabel} className="min-h-72">
			{children}
		</LoadingOverlay>
	) : (
		children
	);

	if (inCard) {
		return <CardContent className={cn("p-0", className)}>{body}</CardContent>;
	}
	return <div className={className}>{body}</div>;
}

/**
 * Rodapé da listagem (geralmente agregações ou botões secundários).
 */
function ListPageLayoutFooter({ className, children }: ListPageLayoutFooterProps) {
	const inCard = React.useContext(ListPageCardContext);
	return (
		<div className={cn(inCard ? "border-t border-border px-4 py-3" : "pt-4", className)}>
			{children}
		</div>
	);
}

export const ListPageLayout = Object.assign(ListPageLayoutRoot, {
	Card: ListPageLayoutCard,
	Filters: ListPageLayoutFilters,
	Content: ListPageLayoutContent,
	Footer: ListPageLayoutFooter,
});
