import type * as React from "react";

import { cn } from "@design-systems-orion/ui";

/*
 * Cabeçalho de modal com identidade de CRUD (criar/editar/detalhe):
 * bloco de ícone tonalizado + título forte + subtítulo + slot de badges contextuais.
 * Presentational — sem domínio, sem rota. Vai dentro de um Dialog do consumidor.
 */
export type CrudModalHeaderTone = "default" | "success" | "warning" | "danger" | "info";

const iconBoxByTone: Record<CrudModalHeaderTone, string> = {
	default: "bg-primary/10 text-primary",
	success: "bg-emerald-50 text-emerald-600",
	warning: "bg-amber-50 text-amber-600",
	danger: "bg-destructive/10 text-destructive",
	info: "bg-sky-50 text-sky-600",
};

export type CrudModalHeaderProps = {
	title: string;
	description?: string;
	icon?: React.ComponentType<{ className?: string }>;
	/** Badges contextuais (status, código, etc.). */
	badges?: React.ReactNode;
	tone?: CrudModalHeaderTone;
	className?: string;
};

/**
 * Cabeçalho para modais de criar, editar ou detalhar registro: ícone tonalizado,
 * título, subtítulo e um slot para badges de contexto. Vai dentro do `Dialog` do
 * consumidor — não abre nem fecha nada por conta própria.
 */
export function CrudModalHeader({
	title,
	description,
	icon: Icon,
	badges,
	tone = "default",
	className,
}: CrudModalHeaderProps) {
	return (
		<div className={cn("flex items-start gap-4 border-b border-border pb-4", className)}>
			{Icon && (
				<div
					className={cn(
						"flex size-11 shrink-0 items-center justify-center rounded-lg",
						iconBoxByTone[tone],
					)}
				>
					<Icon className="size-5" />
				</div>
			)}
			<div className="min-w-0 space-y-1">
				<h2 className="text-lg font-semibold leading-tight text-foreground">{title}</h2>
				{description && <p className="text-sm text-muted-foreground">{description}</p>}
				{badges && <div className="flex flex-wrap items-center gap-1.5 pt-1">{badges}</div>}
			</div>
		</div>
	);
}
