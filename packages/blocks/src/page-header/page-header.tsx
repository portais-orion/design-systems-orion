import type * as React from "react";

import { cn } from "@portais-orion/ui";

/*
 * Recriado a partir da API do Portal-Aurora ui/DataTable/PageHeader.tsx,
 * tokenizado (text-gray-900 â†’ text-foreground) e com `eyebrow` opcional.
 * Sem breadcrumb e sem dependÃªncia de rota, por decisÃ£o da sprint.
 */
export type PageHeaderProps = {
	title: string;
	description?: string;
	eyebrow?: string;
	actions?: React.ReactNode;
	className?: string;
};

export function PageHeader({ title, description, eyebrow, actions, className }: PageHeaderProps) {
	return (
		<div className={cn("flex flex-wrap items-start justify-between gap-4", className)}>
			<div className="min-w-0">
				{eyebrow && (
					<p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
						{eyebrow}
					</p>
				)}
				<h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
				{description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
			</div>
			{actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
		</div>
	);
}
