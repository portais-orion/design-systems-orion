import type * as React from "react";

import { ContentWithAside } from "../_internal/content-with-aside";
import { PageLayout } from "../page-layout";

/*
 * Layout de página de criar/editar. Largura contida (padrão max-w-3xl do
 * Supertrans) com aside opcional. Não cria <form> nem conhece RHF.
 */
export type FormPageLayoutProps = {
	header?: React.ReactNode;
	form: React.ReactNode;
	aside?: React.ReactNode;
	footer?: React.ReactNode;
	className?: string;
};

/**
 * Layout de página de criar ou editar registro. Sem `aside`, contém o
 * formulário numa coluna estreita para não esticar demais as linhas; com
 * `aside`, abre espaço lateral. Não cria o elemento `<form>` nem conhece
 * biblioteca de formulário — isso fica com o consumidor.
 */
export function FormPageLayout({ header, form, aside, footer, className }: FormPageLayoutProps) {
	return (
		<PageLayout header={header} footer={footer} className={className}>
			{aside ? (
				<ContentWithAside content={form} aside={aside} contentClassName="min-w-0" />
			) : (
				<div className="mx-auto w-full max-w-3xl">{form}</div>
			)}
		</PageLayout>
	);
}
