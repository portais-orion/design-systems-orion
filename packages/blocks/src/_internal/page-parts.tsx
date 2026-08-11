/*
 * Peças de página compartilhadas pelos layouts. NÃO exportar pelo barrel
 * público — a interface pública continua sendo `PageLayout` e os layouts
 * especializados construídos sobre ele.
 */
import type * as React from "react";

import { cn } from "@design-systems-orion/ui";

import {
	ASIDE_COLUMN_CLASS,
	ASIDE_GRID_CLASS,
	PAGE_MAX_WIDTH_CLASS,
	PAGE_SHELL_CLASS,
	type PageMaxWidth,
	type PageVariant,
	pageContentClass,
} from "./page-regions";

export type PageShellProps = {
	maxWidth?: PageMaxWidth;
	className?: string;
	children?: React.ReactNode;
};

/** A página inteira: padding, largura máxima e espaçamento entre as regiões. */
export function PageShell({ maxWidth = "none", className, children }: PageShellProps) {
	return (
		<div className={cn(PAGE_SHELL_CLASS, PAGE_MAX_WIDTH_CLASS[maxWidth], className)}>
			{children}
		</div>
	);
}

export type PageContentProps = {
	variant: PageVariant;
	aside?: React.ReactNode;
	className?: string;
	children?: React.ReactNode;
};

/** Coluna de conteúdo, com a coluna lateral aberta quando há `aside`. */
export function PageContent({ variant, aside, className, children }: PageContentProps) {
	const content = (
		<div className={cn(pageContentClass(variant, Boolean(aside)), className)}>{children}</div>
	);

	if (!aside) return content;

	return (
		<div className={ASIDE_GRID_CLASS}>
			{content}
			<div className={ASIDE_COLUMN_CLASS}>{aside}</div>
		</div>
	);
}
