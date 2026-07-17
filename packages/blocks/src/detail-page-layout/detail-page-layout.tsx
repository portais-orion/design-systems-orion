import type * as React from "react";

import { ContentWithAside } from "../_internal/content-with-aside";
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
			<ContentWithAside content={main} aside={aside} />
		</PageLayout>
	);
}
