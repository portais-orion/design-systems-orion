"use client";

import type * as React from "react";

import { Dialog, DialogContent, DialogFooter, DialogHeader, cn } from "@portais-orion/ui";

import { CrudModalHeader } from "../crud-modal-header";
import type { CrudModalHeaderTone } from "../crud-modal-header";

/*
 * Origem: portal-supertrans shared/crud-modal-frame.tsx. Invólucro completo de
 * modal CRUD: o Orion já tinha o CrudModalHeader (só o cabeçalho); faltava o
 * Dialog + corpo com scroll + footer opcional + mapa de tamanhos que envolve
 * ele. Presentational — não conhece domínio, só posiciona os slots.
 */
export type CrudModalFrameSize = "sm" | "md" | "lg" | "xl";
export type CrudModalFrameTone = CrudModalHeaderTone;

const sizeClassByModal: Record<CrudModalFrameSize, string> = {
	sm: "max-w-md",
	md: "max-w-xl",
	lg: "max-w-3xl",
	xl: "max-w-5xl",
};

export type CrudModalFrameProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	description?: string;
	icon?: React.ComponentType<{ className?: string }>;
	/** Badges contextuais no cabeçalho (status, código, etc.). */
	badges?: React.ReactNode;
	tone?: CrudModalFrameTone;
	children: React.ReactNode;
	footer?: React.ReactNode;
	size?: CrudModalFrameSize;
	className?: string;
};

/**
 * Invólucro completo para modais de criar, editar ou detalhar registro: `Dialog`
 * + `CrudModalHeader` + corpo com scroll próprio (`max-h-[85vh]`) + footer
 * opcional com borda superior. Escolha o tamanho por `size` em vez de
 * sobrescrever largura via `className`.
 */
export function CrudModalFrame({
	open,
	onOpenChange,
	title,
	description,
	icon,
	badges,
	tone = "default",
	children,
	footer,
	size = "lg",
	className,
}: CrudModalFrameProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className={cn("overflow-hidden p-0", sizeClassByModal[size], className)}>
				<div className="flex max-h-[85vh] flex-col">
					<DialogHeader className="px-6 pt-6 text-left">
						<CrudModalHeader
							title={title}
							description={description}
							icon={icon}
							badges={badges}
							tone={tone}
						/>
					</DialogHeader>

					<div className="overflow-y-auto px-6 py-5">{children}</div>

					{footer ? (
						<DialogFooter className="border-t border-border px-6 py-4">{footer}</DialogFooter>
					) : null}
				</div>
			</DialogContent>
		</Dialog>
	);
}
