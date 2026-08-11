import { WifiOff } from "lucide-react";
import type * as React from "react";

import { cn } from "@design-systems-orion/ui";

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
export function ErrorState({
	title = "Não foi possível carregar os dados",
	description = "Ocorreu um erro de comunicação. Tente novamente em alguns instantes.",
	action,
	className,
}: ErrorStateProps) {
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
				<p className="text-base font-semibold text-foreground">{title}</p>
				{description && (
					<p className="mx-auto mt-1 max-w-xs text-sm text-muted-foreground">{description}</p>
				)}
			</div>
			{action && <div className="flex gap-2">{action}</div>}
		</div>
	);
}
