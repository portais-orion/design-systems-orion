import type * as React from "react";

import { PageLayout } from "../page-layout";

/* Layout de dashboard simples: stats + conteúdo + aside opcional. */
export type DashboardPageLayoutProps = {
	header?: React.ReactNode;
	stats?: React.ReactNode;
	content: React.ReactNode;
	aside?: React.ReactNode;
	className?: string;
};

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
			{aside ? (
				<div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
					<div className="min-w-0 space-y-6">{content}</div>
					<div className="space-y-4">{aside}</div>
				</div>
			) : (
				content
			)}
		</PageLayout>
	);
}
