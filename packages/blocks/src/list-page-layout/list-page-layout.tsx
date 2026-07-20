import type * as React from "react";

import { Card, CardContent, cn } from "@portais-orion/ui";

import { LoadingOverlay } from "../loading-overlay";
import { PageLayout } from "../page-layout";

/*
 * Layout de página de listagem — formaliza o esqueleto repetido em 30+ telas
 * do Aurora (PageHeader + StatusCards + busca + tabela) e nas views do
 * Supertrans. Tudo por slots; o layout não conhece dados nem filtros.
 *
 * `surface="card"` foi adicionado a partir da comparação com o `CrudPageShell`
 * bespoke do Supertrans (docs/nucleo-gaps-round-2.md): a diferença real entre
 * os dois não era estrutural, era só envolver filters+content+footer numa
 * superfície com borda/sombra. Default `"transparent"` preserva o
 * comportamento anterior — nenhum dos consumidores existentes quebra.
 */
export type ListPageLayoutSurface = "transparent" | "card";

export type ListPageLayoutProps = {
	header?: React.ReactNode;
	stats?: React.ReactNode;
	toolbar?: React.ReactNode;
	filters?: React.ReactNode;
	content: React.ReactNode;
	footer?: React.ReactNode;
	/**
	 * `"card"` envolve filters+content+footer numa superfície com borda,
	 * sombra e cantos arredondados (padrão Aurora-like). Default
	 * `"transparent"`: cada slot fica solto, como hoje.
	 */
	surface?: ListPageLayoutSurface;
	/** Cobre `content` com `LoadingOverlay` enquanto `true`. Não afeta `stats`/`toolbar`/`filters`. */
	loading?: boolean;
	loadingLabel?: string;
	className?: string;
};

/**
 * Layout de página de listagem: cabeçalho, indicadores, barra de ferramentas,
 * filtros aplicados e o conteúdo (normalmente um `DataTable`). Tudo por slots —
 * o layout não conhece dados nem filtros, só os posiciona. Use
 * `surface="card"` para o visual de superfície única (filtros + conteúdo +
 * footer dentro do mesmo card com borda/sombra).
 */
export function ListPageLayout({
	header,
	stats,
	toolbar,
	filters,
	content,
	footer,
	surface = "transparent",
	loading = false,
	loadingLabel,
	className,
}: ListPageLayoutProps) {
	const body = loading ? (
		<LoadingOverlay loading={loading} label={loadingLabel} className="min-h-72">
			{content}
		</LoadingOverlay>
	) : (
		content
	);

	if (surface === "card") {
		return (
			<PageLayout header={header} className={className}>
				{stats}
				{toolbar}
				<Card className="overflow-hidden rounded-2xl">
					{filters ? (
						<div className={cn("flex flex-wrap items-center gap-2 border-b border-border px-4 py-4")}>
							{filters}
						</div>
					) : null}
					<CardContent className="p-0">{body}</CardContent>
					{footer ? <div className="border-t border-border px-4 py-3">{footer}</div> : null}
				</Card>
			</PageLayout>
		);
	}

	return (
		<PageLayout header={header} footer={footer} className={className}>
			{stats}
			{(toolbar || filters) && (
				<div className="space-y-3">
					{toolbar}
					{filters && <div className={cn("flex flex-wrap items-center gap-2")}>{filters}</div>}
				</div>
			)}
			{body}
		</PageLayout>
	);
}
