import type * as React from "react";

import { cn } from "@design-systems-orion/ui";

import { type Tone, toneClass } from "../_internal/tone";

/*
 * Extraído do card "Decisões" da Central de Atendimento do portal-supertrans:
 * barra segmentada única + legenda com contagem e percentual. Generalizado:
 * segmentos e tons chegam por props, sem mapa de status embutido.
 */
export type ProportionBarTone =
	| "default"
	| "brand"
	| "success"
	| "warning"
	| "danger"
	| "info"
	| "muted";

export type ProportionBarSegment = {
	id: string;
	label: string;
	value: number;
	tone?: ProportionBarTone;
};

export type ProportionBarProps = {
	segments: ProportionBarSegment[];
	/** Total de referência dos percentuais. Padrão: soma dos segmentos. */
	total?: number;
	/** Texto exibido quando não há nada a distribuir (total zero). */
	emptyMessage?: string;
	/** Mostra a legenda com contagem e percentual. Padrão: `true`. */
	showLegend?: boolean;
	/** Formata o percentual (já arredondado) da legenda. */
	formatPercent?: (percent: number) => React.ReactNode;
	className?: string;
};

const semanticTone: Record<ProportionBarTone, Tone> = {
	default: "neutral",
	muted: "neutral",
	brand: "brand",
	success: "success",
	warning: "warning",
	danger: "danger",
	info: "info",
};

const percentOf = (value: number, total: number) =>
	total > 0 ? Math.round((Math.max(0, value) / total) * 100) : 0;

/**
 * Barra horizontal dividida em segmentos proporcionais, com legenda. Use para
 * mostrar como um total se reparte (aprovadas × rejeitadas × pendentes). Os
 * segmentos de valor zero ficam fora da barra, mas continuam na legenda. Para
 * comparar itens independentes entre si use `BarList`.
 */
export function ProportionBar({
	segments,
	total,
	emptyMessage = "Sem dados para exibir.",
	showLegend = true,
	formatPercent = (percent) => `${percent}%`,
	className,
}: ProportionBarProps) {
	const sum = total ?? segments.reduce((acc, segment) => acc + Math.max(0, segment.value), 0);

	if (sum <= 0) {
		return <p className={cn("text-sm text-muted-foreground", className)}>{emptyMessage}</p>;
	}

	const summary = segments
		.map((segment) => `${segment.label}: ${segment.value} (${percentOf(segment.value, sum)}%)`)
		.join(", ");

	return (
		<div className={cn("space-y-4", className)}>
			<div
				role="img"
				aria-label={summary}
				className="flex h-3.5 overflow-hidden rounded-full bg-muted"
			>
				{segments
					.filter((segment) => segment.value > 0)
					.map((segment) => (
						<div
							key={segment.id}
							className={toneClass(semanticTone[segment.tone ?? "brand"], "dot")}
							style={{ width: `${(Math.max(0, segment.value) / sum) * 100}%` }}
						/>
					))}
			</div>
			{showLegend && (
				<ul className="space-y-2.5">
					{segments.map((segment) => (
						<li key={segment.id} className="flex items-center justify-between gap-3 text-sm">
							<span className="flex min-w-0 items-center gap-2">
								<span
									aria-hidden="true"
									className={cn(
										"size-2.5 flex-none rounded-full",
										toneClass(semanticTone[segment.tone ?? "brand"], "dot"),
									)}
								/>
								<span className="truncate">{segment.label}</span>
							</span>
							<span className="flex-none tabular-nums text-muted-foreground">
								{segment.value}{" "}
								<span className="opacity-60">({formatPercent(percentOf(segment.value, sum))})</span>
							</span>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
