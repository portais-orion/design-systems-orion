import type * as React from "react";

import { cn } from "@design-systems-orion/ui";

import { type Tone, toneClass } from "../_internal/tone";

/*
 * Extraído da Central de Atendimento do portal-supertrans (bar-list.tsx):
 * ranking de barras horizontais proporcionais ao maior valor. Generalizado:
 * a cor deixou de ser uma classe crua e virou tom semântico, por item ou
 * para a lista toda.
 */
export type BarListTone = "default" | "brand" | "success" | "warning" | "danger" | "info" | "muted";

export type BarListItem = {
	/** Identificador estável da linha; sem ele, o rótulo é usado como chave. */
	id?: string;
	label: string;
	value: number;
	/** Sobrescreve o tom da lista para esta barra. */
	tone?: BarListTone;
};

export type BarListProps = {
	items: BarListItem[];
	/** Tom das barras que não definem o próprio. Padrão: `brand`. */
	tone?: BarListTone;
	/** Texto exibido quando `items` está vazio. */
	emptyMessage?: string;
	/** Formata o valor mostrado à direita do rótulo. Padrão: número cru. */
	formatValue?: (value: number) => React.ReactNode;
	className?: string;
};

const semanticTone: Record<BarListTone, Tone> = {
	default: "neutral",
	muted: "neutral",
	brand: "brand",
	success: "success",
	warning: "warning",
	danger: "danger",
	info: "info",
};

/**
 * Lista de barras horizontais, cada uma proporcional ao maior valor da lista.
 * Serve para rankings e distribuições curtas (motivos, canais, responsáveis).
 * A barra é decorativa: rótulo e valor ficam em texto, então leitores de tela
 * recebem a mesma informação. Para partes de um todo use `ProportionBar`.
 */
export function BarList({
	items,
	tone = "brand",
	emptyMessage = "Sem dados para exibir.",
	formatValue = (value) => value,
	className,
}: BarListProps) {
	if (items.length === 0) {
		return <p className={cn("text-sm text-muted-foreground", className)}>{emptyMessage}</p>;
	}

	const max = Math.max(1, ...items.map((item) => item.value));

	return (
		<ul className={cn("space-y-3", className)}>
			{items.map((item) => {
				const width = Math.round((Math.max(0, item.value) / max) * 100);
				return (
					<li key={item.id ?? item.label}>
						<div className="mb-1 flex justify-between gap-3 text-xs">
							<span className="min-w-0 truncate font-medium text-foreground">{item.label}</span>
							<span className="flex-none tabular-nums text-muted-foreground">
								{formatValue(item.value)}
							</span>
						</div>
						<div aria-hidden="true" className="h-2 overflow-hidden rounded-full bg-muted">
							<div
								className={cn(
									"h-full rounded-full",
									toneClass(semanticTone[item.tone ?? tone], "dot"),
								)}
								style={{ width: `${width}%` }}
							/>
						</div>
					</li>
				);
			})}
		</ul>
	);
}
