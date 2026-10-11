import { FolderOpen } from "lucide-react";
import type * as React from "react";

import { cn } from "@design-systems-orion/ui";

/*
 * Origem: portal-supertrans gestao-cadastros/shared.tsx (EmptyState).
 * Generalizado: textos e ação viraram props/slot (a versão original tinha
 * textos fixos e callbacks de domínio onClear/onNew).
 */
export type EmptyStateProps = {
	title: string;
	description?: string;
	icon?: React.ComponentType<{ className?: string }>;
	action?: React.ReactNode;
	/**
	 * `default`: área grande e centralizada, com ícone. `inline`: caixa tracejada
	 * compacta, sem ícone, para painéis laterais e cartões pequenos.
	 */
	variant?: "default" | "inline";
	className?: string;
};

/**
 * Estado vazio de uma lista ou área de conteúdo. Diz o que está faltando e,
 * pelo slot `action`, oferece a saída (criar registro, limpar filtros). Para
 * falha de carregamento use `ErrorState`.
 */
export function EmptyState({
	title,
	description,
	icon: Icon = FolderOpen,
	action,
	variant = "default",
	className,
}: EmptyStateProps) {
	if (variant === "inline") {
		return (
			<div
				className={cn(
					"rounded-xl border-2 border-dashed border-border p-4 text-center text-xs text-muted-foreground",
					className,
				)}
			>
				<p className="font-medium text-foreground">{title}</p>
				{description && <p className="mt-0.5">{description}</p>}
				{action && <div className="mt-2 flex justify-center gap-2">{action}</div>}
			</div>
		);
	}
	return (
		<div
			className={cn(
				"flex flex-col items-center justify-center gap-4 px-6 py-16 text-center",
				className,
			)}
		>
			<div className="flex size-14 items-center justify-center rounded-full bg-muted">
				<Icon className="size-6 text-muted-foreground" />
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
