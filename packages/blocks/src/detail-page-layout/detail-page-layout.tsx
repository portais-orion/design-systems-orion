import type * as React from "react";

import { PageContent, PageShell } from "../_internal/page-parts";

/*
 * Variação de detalhe do `PageLayout`: conteúdo em largura cheia, com coluna
 * lateral opcional para metadados e ações secundárias. A montagem mora em
 * `PageLayout`/`_internal/page-parts`.
 */
export type DetailPageLayoutProps = {
	className?: string;
	children?: React.ReactNode;
};

export type DetailPageLayoutContentProps = {
	aside?: React.ReactNode;
	className?: string;
	children?: React.ReactNode;
};

/**
 * Raiz do layout de página de detalhe.
 */
function DetailPageLayoutRoot({ className, children }: DetailPageLayoutProps) {
	return <PageShell className={className}>{children}</PageShell>;
}

/**
 * Área principal do detalhe (geralmente contém resumo, abas e conteúdo).
 * Com `aside`, abre espaço lateral para ações secundárias ou metadados.
 */
function DetailPageLayoutContent({ aside, className, children }: DetailPageLayoutContentProps) {
	return (
		<PageContent variant="detail" aside={aside} className={className}>
			{children}
		</PageContent>
	);
}

export const DetailPageLayout = Object.assign(DetailPageLayoutRoot, {
	Content: DetailPageLayoutContent,
});
