import type * as React from "react";

import { PageContent, PageShell } from "../_internal/page-parts";

/* Layout de dashboard simples: stats + conteúdo + aside opcional. */
export type DashboardPageLayoutProps = {
	header?: React.ReactNode;
	stats?: React.ReactNode;
	content: React.ReactNode;
	aside?: React.ReactNode;
	className?: string;
};

/**
 * Layout de dashboard: faixa de indicadores no topo, conteúdo principal e
 * `aside` opcional em coluna lateral. Variação do `PageLayout` — a montagem
 * da página mora lá.
 */
export function DashboardPageLayout({
	header,
	stats,
	content,
	aside,
	className,
}: DashboardPageLayoutProps) {
	return (
		<PageShell className={className}>
			{header}
			{stats}
			<PageContent variant="dashboard" aside={aside}>
				{content}
			</PageContent>
		</PageShell>
	);
}
