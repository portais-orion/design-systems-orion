"use client";

import type * as React from "react";

import { Spinner, cn } from "@portais-orion/ui";

/*
 * Overlay de carregamento para áreas assíncronas (cards, tabelas, formulários).
 * Compõe o Spinner do @portais-orion/ui; children permanecem montados (sem flicker
 * de desmontagem); interação bloqueada apenas enquanto loading=true.
 */
export type LoadingOverlayProps = {
	loading: boolean;
	label?: string;
	children: React.ReactNode;
	className?: string;
	overlayClassName?: string;
};

/**
 * Cobre uma área com um indicador de carregamento sem desmontar o conteúdo,
 * o que evita o salto de layout ao alternar. Bloqueia a interação e marca
 * `aria-busy` apenas enquanto `loading` é verdadeiro.
 */
export function LoadingOverlay({
	loading,
	label,
	children,
	className,
	overlayClassName,
}: LoadingOverlayProps) {
	return (
		<div className={cn("relative", className)} aria-busy={loading || undefined}>
			{children}
			{loading && (
				<div
					className={cn(
						"absolute inset-0 z-10 flex items-center justify-center rounded-[inherit] bg-background/60 backdrop-blur-[1px]",
						overlayClassName,
					)}
				>
					<Spinner size="md" label={label} />
				</div>
			)}
		</div>
	);
}
