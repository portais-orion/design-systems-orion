import type * as React from "react";

import { cn } from "@portais-orion/ui";

import { PageLayout } from "../page-layout";

/*
 * Layout de pÃ¡gina de criar/editar. Largura contida (padrÃ£o max-w-3xl do
 * Supertrans) com aside opcional. NÃ£o cria <form> nem conhece RHF.
 */
export type FormPageLayoutProps = {
	header?: React.ReactNode;
	form: React.ReactNode;
	aside?: React.ReactNode;
	footer?: React.ReactNode;
	className?: string;
};

export function FormPageLayout({ header, form, aside, footer, className }: FormPageLayoutProps) {
	return (
		<PageLayout header={header} footer={footer} className={className}>
			{aside ? (
				<div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
					<div className={cn("min-w-0")}>{form}</div>
					<div className="space-y-4">{aside}</div>
				</div>
			) : (
				<div className="mx-auto w-full max-w-3xl">{form}</div>
			)}
		</PageLayout>
	);
}
