"use client";

import { Loader2 } from "lucide-react";
import * as React from "react";

import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	Button,
} from "@grupo/ui";

/*
 * Recriado a partir da API do Portal-Aurora ui/ConfirmDialog.tsx, sobre o
 * AlertDialog do @grupo/ui. Diferença deliberada em relação ao original:
 * fecha somente quando onConfirm resolve; se lançar/rejeitar, permanece
 * aberto (o original fechava mesmo com erro em voo).
 */
export type ConfirmDialogVariant = "default" | "danger";

export type ConfirmDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	description?: string;
	confirmLabel?: string;
	cancelLabel?: string;
	variant?: ConfirmDialogVariant;
	isLoading?: boolean;
	onConfirm: () => void | Promise<void>;
};

export function ConfirmDialog({
	open,
	onOpenChange,
	title,
	description,
	confirmLabel = "Confirmar",
	cancelLabel = "Cancelar",
	variant = "default",
	isLoading = false,
	onConfirm,
}: ConfirmDialogProps) {
	const [pending, setPending] = React.useState(false);
	const busy = isLoading || pending;

	const handleConfirm = async () => {
		try {
			setPending(true);
			await onConfirm();
			onOpenChange(false);
		} catch {
			// mantém aberto; o chamador é responsável por exibir o erro (toast etc.)
		} finally {
			setPending(false);
		}
	};

	return (
		<AlertDialog open={open} onOpenChange={(next) => !busy && onOpenChange(next)}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					{description && <AlertDialogDescription>{description}</AlertDialogDescription>}
				</AlertDialogHeader>
				<AlertDialogFooter>
					<Button variant="outline" disabled={busy} onClick={() => onOpenChange(false)}>
						{cancelLabel}
					</Button>
					<Button
						variant={variant === "danger" ? "destructive" : "default"}
						disabled={busy}
						onClick={handleConfirm}
					>
						{busy && <Loader2 className="animate-spin" />}
						{confirmLabel}
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
