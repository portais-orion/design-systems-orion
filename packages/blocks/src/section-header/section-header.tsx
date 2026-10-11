import type * as React from "react";

import { cn } from "@design-systems-orion/ui";

/* Cabeçalho de seção dentro de página (menor que PageHeader). */
export type SectionHeaderProps = {
	title: React.ReactNode;
	description?: React.ReactNode;
	actions?: React.ReactNode;
	/**
	 * `default`: título de seção (`text-lg`). `sm`: rótulo em caixa alta para
	 * painéis laterais e cartões, sem descrição.
	 */
	size?: "default" | "sm";
	className?: string;
};

/**
 * Cabeçalho de uma seção dentro da página, com título, descrição e ações.
 * Renderiza um `<h2>`: para o título principal da página use `PageHeader`.
 */
export function SectionHeader({
	title,
	description,
	actions,
	size = "default",
	className,
}: SectionHeaderProps) {
	if (size === "sm") {
		return (
			<div className={cn("mb-2.5 flex items-center justify-between gap-2", className)}>
				<h2 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
					{title}
				</h2>
				{actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
			</div>
		);
	}
	return (
		<div className={cn("flex flex-wrap items-start justify-between gap-3", className)}>
			<div className="min-w-0">
				<h2 className="text-lg font-semibold text-foreground">{title}</h2>
				{description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
			</div>
			{actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
		</div>
	);
}
