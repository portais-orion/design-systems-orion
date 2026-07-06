import type * as React from "react";

import { Separator, cn } from "@portais-orion/ui";

/*
 * Agrupamento visual de campos. Origem do padrÃ£o: seÃ§Ãµes com tÃ­tulo +
 * space-y dos forms do Supertrans e das telas de cadastro do Aurora.
 */
export type FormSectionProps = {
	title?: React.ReactNode;
	description?: React.ReactNode;
	children: React.ReactNode;
	actions?: React.ReactNode;
	className?: string;
	contentClassName?: string;
};

export function FormSection({
	title,
	description,
	children,
	actions,
	className,
	contentClassName,
}: FormSectionProps) {
	const hasHeader = title || description || actions;
	return (
		<section className={cn("space-y-4", className)}>
			{hasHeader && (
				<div className="space-y-3">
					<div className="flex flex-wrap items-start justify-between gap-3">
						<div>
							{title && <h3 className="text-base font-semibold text-foreground">{title}</h3>}
							{description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
						</div>
						{actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
					</div>
					<Separator />
				</div>
			)}
			<div className={cn("space-y-4", contentClassName)}>{children}</div>
		</section>
	);
}
