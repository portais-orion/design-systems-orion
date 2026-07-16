import type * as React from "react";

import { PageLayout } from "../page-layout";

/* Layout de página de detalhe: resumo + tabs/conteúdo + aside opcional. */
export type DetailPageLayoutProps = {
	header?: React.ReactNode;
	summary?: React.ReactNode;
	tabs?: React.ReactNode;
	content?: React.ReactNode;
	aside?: React.ReactNode;
	className?: string;
};

/**
 * Layout de página de detalhe de um registro: resumo, abas e conteúdo, com
 * `aside` opcional para metadados e ações secundárias.
 */
export function DetailPageLayout({
	header,
	summary,
	tabs,
	content,
	aside,
	className,
}: DetailPageLayoutProps) {
	const main = (
		<>
			{summary}
			{tabs}
			{content}
		</>
	);
	return (
		<PageLayout header={header} className={className}>
			{aside ? (
				<div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
					<div className="min-w-0 space-y-6">{main}</div>
					<div className="space-y-4">{aside}</div>
				</div>
			) : (
				main
			)}
		</PageLayout>
	);
}
