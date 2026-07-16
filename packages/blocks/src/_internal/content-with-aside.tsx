/*
 * Helper interno dos layouts de página. NÃO exportar pelo barrel público.
 * Codifica o par conteúdo + coluna lateral usado por FormPageLayout,
 * DetailPageLayout e DashboardPageLayout: sem `aside`, o conteúdo ocupa a
 * largura toda; com `aside`, abre a coluna de 20rem.
 */
import type * as React from "react";

export type ContentWithAsideProps = {
	content: React.ReactNode;
	aside?: React.ReactNode;
	contentClassName?: string;
};

export function ContentWithAside({ content, aside, contentClassName }: ContentWithAsideProps) {
	if (!aside) return content;
	return (
		<div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
			<div className={contentClassName ?? "min-w-0 space-y-6"}>{content}</div>
			<div className="space-y-4">{aside}</div>
		</div>
	);
}
