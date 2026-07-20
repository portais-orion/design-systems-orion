"use client";

import * as React from "react";

import { Button, cn } from "@portais-orion/ui";

/*
 * Extraído de configurador/permissions/orphan-audit ("Purgar órfãs"): ação
 * destrutiva que, ao clicar, vira um par confirmar/cancelar inline na mesma
 * barra — sem abrir modal. Distinto do ConfirmDialog (que é modal).
 */
export type InlineConfirmActionProps = {
	triggerLabel: React.ReactNode;
	triggerIcon?: React.ComponentType<{ className?: string }>;
	confirmQuestion?: string;
	confirmLabel?: string;
	cancelLabel?: string;
	onConfirm: () => void;
	isLoading?: boolean;
	tone?: "default" | "danger";
	className?: string;
};

/**
 * Ação com confirmação inline (sem modal): o trigger vira "confirmar +
 * cancelar" na mesma posição. Útil para ações rápidas em toolbars onde um
 * ConfirmDialog seria pesado demais.
 */
export function InlineConfirmAction({
	triggerLabel,
	triggerIcon: Icon,
	confirmQuestion,
	confirmLabel = "Confirmar",
	cancelLabel = "Cancelar",
	onConfirm,
	isLoading = false,
	tone = "default",
	className,
}: InlineConfirmActionProps) {
	const [confirming, setConfirming] = React.useState(false);

	if (confirming) {
		return (
			<div className={cn("flex items-center gap-2", className)}>
				{confirmQuestion && (
					<span
						className={cn(
							"text-sm font-medium",
							tone === "danger" ? "text-destructive" : "text-foreground",
						)}
					>
						{confirmQuestion}
					</span>
				)}
				<Button
					type="button"
					size="sm"
					variant={tone === "danger" ? "destructive" : "default"}
					disabled={isLoading}
					onClick={onConfirm}
				>
					{isLoading ? "..." : confirmLabel}
				</Button>
				<Button
					type="button"
					size="sm"
					variant="outline"
					disabled={isLoading}
					onClick={() => setConfirming(false)}
				>
					{cancelLabel}
				</Button>
			</div>
		);
	}

	return (
		<Button
			type="button"
			size="sm"
			variant={tone === "danger" ? "destructive" : "outline"}
			onClick={() => setConfirming(true)}
			className={className}
		>
			{Icon && <Icon />}
			{triggerLabel}
		</Button>
	);
}
