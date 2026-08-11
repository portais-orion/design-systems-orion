import type * as React from "react";

import { cn } from "@design-systems-orion/ui";
import { ContentWithAside } from "../_internal/content-with-aside";

export type FormPageLayoutProps = {
	className?: string;
	children?: React.ReactNode;
};

export type FormPageLayoutContentProps = {
	aside?: React.ReactNode;
	className?: string;
	children?: React.ReactNode;
};

/**
 * Raiz do layout de página de formulário.
 */
function FormPageLayoutRoot({ className, children }: FormPageLayoutProps) {
	return <div className={cn("space-y-6 p-6", className)}>{children}</div>;
}

/**
 * Área de conteúdo principal do formulário.
 * Sem `aside`, centraliza e limita a largura. Com `aside`, abre a barra lateral.
 */
function FormPageLayoutContent({ aside, className, children }: FormPageLayoutContentProps) {
	if (aside) {
		return (
			<ContentWithAside
				content={children}
				aside={aside}
				contentClassName={cn("min-w-0", className)}
			/>
		);
	}
	return <div className={cn("mx-auto w-full max-w-3xl", className)}>{children}</div>;
}

export const FormPageLayout = Object.assign(FormPageLayoutRoot, {
	Content: FormPageLayoutContent,
});
