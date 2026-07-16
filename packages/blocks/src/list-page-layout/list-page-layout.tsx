import type * as React from "react";

import { cn } from "@portais-orion/ui";

import { PageLayout } from "../page-layout";

/*
 * Layout de página de listagem — formaliza o esqueleto repetido em 30+ telas
 * do Aurora (PageHeader + StatusCards + busca + tabela) e nas views do
 * Supertrans. Tudo por slots; o layout não conhece dados nem filtros.
 */
export type ListPageLayoutProps = {
	header?: React.ReactNode;
	stats?: React.ReactNode;
	toolbar?: React.ReactNode;
	filters?: React.ReactNode;
	content: React.ReactNode;
	footer?: React.ReactNode;
	className?: string;
};

/**
 * Layout de página de listagem: cabeçalho, indicadores, barra de ferramentas,
 * filtros aplicados e o conteúdo (normalmente um `DataTable`). Tudo por slots —
 * o layout não conhece dados nem filtros, só os posiciona.
 */
export function ListPageLayout({
	header,
	stats,
	toolbar,
	filters,
	content,
	footer,
	className,
}: ListPageLayoutProps) {
	return (
		<PageLayout header={header} footer={footer} className={className}>
			{stats}
			{(toolbar || filters) && (
				<div className="space-y-3">
					{toolbar}
					{filters && <div className={cn("flex flex-wrap items-center gap-2")}>{filters}</div>}
				</div>
			)}
			{content}
		</PageLayout>
	);
}
