import type * as React from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, cn } from "@portais-orion/ui";

/* Card de conteúdo com cabeçalho/ações � estrutura comum de painéis. */
export type ContentCardProps = {
	title?: React.ReactNode;
	description?: React.ReactNode;
	actions?: React.ReactNode;
	children: React.ReactNode;
	className?: string;
	contentClassName?: string;
};

export function ContentCard({
	title,
	description,
	actions,
	children,
	className,
	contentClassName,
}: ContentCardProps) {
	const hasHeader = title || description || actions;
	return (
		<Card className={className}>
			{hasHeader && (
				<CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
					<div className="min-w-0 space-y-1">
						{title && <CardTitle>{title}</CardTitle>}
						{description && <CardDescription>{description}</CardDescription>}
					</div>
					{actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
				</CardHeader>
			)}
			<CardContent className={contentClassName}>{children}</CardContent>
		</Card>
	);
}
