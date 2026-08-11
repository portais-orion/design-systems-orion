import type * as React from "react";

import { PageContent, PageShell } from "../_internal/page-parts";

/*
 * Variação de formulário do `PageLayout`: a coluna de conteúdo é centralizada
 * e limitada quando está sozinha, e abre a coluna lateral quando há `aside`.
 * Toda a montagem mora em `PageLayout`/`_internal/page-parts` — aqui só se
 * escolhe a variante.
 */
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
	return <PageShell className={className}>{children}</PageShell>;
}

/**
 * Área de conteúdo principal do formulário.
 * Sem `aside`, centraliza e limita a largura. Com `aside`, abre a barra lateral.
 */
function FormPageLayoutContent({ aside, className, children }: FormPageLayoutContentProps) {
	return (
		<PageContent variant="form" aside={aside} className={className}>
			{children}
		</PageContent>
	);
}

export const FormPageLayout = Object.assign(FormPageLayoutRoot, {
	Content: FormPageLayoutContent,
});
