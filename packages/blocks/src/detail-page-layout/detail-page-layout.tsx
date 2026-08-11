import type * as React from "react";

import { cn } from "@design-systems-orion/ui";
import { ContentWithAside } from "../_internal/content-with-aside";

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
	return <div className={cn("space-y-6 p-6", className)}>{children}</div>;
}

/**
 * Área principal do detalhe (geralmente contém resumo, abas e conteúdo).
 * Com `aside`, abre espaço lateral para ações secundárias ou metadados.
 */
function DetailPageLayoutContent({ aside, className, children }: DetailPageLayoutContentProps) {
	if (aside) {
		return (
			<ContentWithAside
				content={children}
				aside={aside}
				contentClassName={cn("min-w-0 space-y-6", className)}
			/>
		);
	}
	return <div className={cn("space-y-6", className)}>{children}</div>;
}

export const DetailPageLayout = Object.assign(DetailPageLayoutRoot, {
	Content: DetailPageLayoutContent,
});
