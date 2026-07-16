import type * as React from "react";

import { ContentWithAside } from "../_internal/content-with-aside";
import { PageLayout } from "../page-layout";

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
 * `aside` opcional em coluna lateral.
 */
export function DashboardPageLayout({
	header,
	stats,
	content,
	aside,
	className,
}: DashboardPageLayoutProps) {
	return (
		<PageLayout header={header} className={className}>
			{stats}
			<ContentWithAside content={content} aside={aside} />
		</PageLayout>
	);
}
