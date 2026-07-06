import type * as React from "react";

import { cn } from "@portais-orion/ui";

/* CabeÃ§alho de seÃ§Ã£o dentro de pÃ¡gina (menor que PageHeader). */
export type SectionHeaderProps = {
	title: React.ReactNode;
	description?: React.ReactNode;
	actions?: React.ReactNode;
	className?: string;
};

export function SectionHeader({ title, description, actions, className }: SectionHeaderProps) {
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
