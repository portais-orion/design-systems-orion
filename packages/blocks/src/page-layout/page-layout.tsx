import type * as React from "react";

import { PageContent, PageShell } from "../_internal/page-parts";
import type { PageMaxWidth, PageVariant } from "../_internal/page-regions";

/*
 * Layout de página (sem shell/sidebar/breadcrumb — isso é o `AppShell`).
 *
 * Este é o único módulo que sabe montar uma página: padding, largura máxima,
 * pilha vertical, header, coluna lateral e rodapé. `ListPageLayout`,
 * `FormPageLayout`, `DetailPageLayout` e `DashboardPageLayout` são variações
 * dele, não implementações paralelas.
 */
export type PageLayoutProps = {
	/** Escolhe a largura e o espaçamento da coluna de conteúdo. */
	variant?: PageVariant;
	header?: React.ReactNode;
	children: React.ReactNode;
	/** Coluna lateral de 20rem à direita do conteúdo. */
	aside?: React.ReactNode;
	footer?: React.ReactNode;
	className?: string;
	contentClassName?: string;
	maxWidth?: PageMaxWidth;
};

/**
 * Esqueleto de uma página: padding, largura máxima e o espaçamento vertical
 * padrão entre header, conteúdo, coluna lateral e footer. Não inclui sidebar
 * nem breadcrumb — isso é o `AppShell`.
 */
export function PageLayout({
	variant = "plain",
	header,
	children,
	aside,
	footer,
	className,
	contentClassName,
	maxWidth = "none",
}: PageLayoutProps) {
	return (
		<PageShell maxWidth={maxWidth} className={className}>
			{header}
			<PageContent variant={variant} aside={aside} className={contentClassName}>
				{children}
			</PageContent>
			{footer}
		</PageShell>
	);
}
