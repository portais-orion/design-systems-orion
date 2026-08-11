import { WifiOff } from "lucide-react";
import type * as React from "react";

import { cn } from "@design-systems-orion/ui";

import { useBlocksCopy } from "../copy";

/*
 * Origem: portal-supertrans gestao-cadastros/shared.tsx (ErrorState).
 * Generalizado: textos com default genérico, ação vira slot (era onRetry fixo).
 */
export type ErrorStateProps = {
	title?: string;
	description?: string;
	action?: React.ReactNode;
	className?: string;
};

/**
 * Estado de falha ao carregar dados, com textos padrão genéricos e um slot
 * `action` para a tentativa de recuperação. Quando não houve erro e a lista
 * apenas não tem registros, use `EmptyState`.
 */
export function ErrorState({ title, description, action, className }: ErrorStateProps) {
	const copy = useBlocksCopy();
	const errorTitle = title ?? copy.states.errorTitle;
	const errorDescription = description ?? copy.states.errorDescription;

	return (
		<div
			className={cn(
				"flex flex-col items-center justify-center gap-4 px-6 py-16 text-center",
				className,
			)}
		>
			<div className="flex size-14 items-center justify-center rounded-full bg-destructive/10">
				<WifiOff className="size-6 text-destructive" />
			</div>
			<div>
				<p className="text-base font-semibold text-foreground">{errorTitle}</p>
				{errorDescription && (
					<p className="mx-auto mt-1 max-w-xs text-sm text-muted-foreground">{errorDescription}</p>
				)}
			</div>
			{action && <div className="flex gap-2">{action}</div>}
		</div>
	);
}
