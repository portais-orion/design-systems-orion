import type * as React from "react";

import { cn } from "@design-systems-orion/ui";

/*
 * Origem: portal-supertrans shared.tsx (CodeBadge) — tokenizado (o original
 * usava #3caec4/#00526b) e com children livre em vez de prop `code`.
 */
export type CodeBadgeProps = {
	children: React.ReactNode;
	className?: string;
};

/**
 * Exibe um código ou identificador de registro em fonte monoespaçada, para que
 * sequências como `PRC-001` fiquem alinhadas e legíveis numa coluna.
 */
export function CodeBadge({ children, className }: CodeBadgeProps) {
	return (
		<span
			className={cn(
				"inline-flex items-center rounded border border-primary/20 bg-primary/5 px-2 py-0.5 font-mono text-xs font-medium text-primary",
				className,
			)}
		>
			{children}
		</span>
	);
}
