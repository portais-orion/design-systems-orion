import * as React from "react";

import { CardContent, cn } from "@design-systems-orion/ui";

import { PageShell } from "../_internal/page-parts";
import { BAND_BOTTOM_CLASS, BAND_TOP_CLASS } from "../_internal/page-regions";
import { SurfaceCard } from "../_internal/surface-card";
import { LoadingOverlay } from "../loading-overlay";

/*
 * Variação de listagem do `PageLayout`: a página é o `PageShell` comum e o
 * que este layout acrescenta é o cartão que agrupa filtros, conteúdo e
 * rodapé — as faixas separadoras só aparecem dentro dele.
 */

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
	return <PageShell className={className}>{children}</PageShell>;
}

/**
 * Container opcional para agrupar Filtros, Conteúdo e Footer dentro de um Card com borda e sombra.
 * Substitui o antigo modelo `surface="card"`.
 */
function ListPageLayoutCard({ className, children }: ListPageLayoutCardProps) {
	return (
		<ListPageCardContext.Provider value={true}>
			<SurfaceCard className={className}>{children}</SurfaceCard>
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
				inCard && cn(BAND_BOTTOM_CLASS, "px-4 py-4"),
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
		<div className={cn(inCard ? cn(BAND_TOP_CLASS, "px-4 py-3") : "pt-4", className)}>
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
