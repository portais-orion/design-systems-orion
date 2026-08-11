"use client";

import { HelpCircle } from "lucide-react";
import type * as React from "react";

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
	cn,
} from "@design-systems-orion/ui";

import { type Tone, toneClass } from "../_internal/tone";

/*
 * Extraído de governanca/desempenho (MetricCard/SourceBar): card de métrica
 * com tooltip explicativo e barra de progresso opcional. Mais rico que
 * `StatusCards` (que é só ícone+valor+label, sem tooltip/threshold/barra).
 * O tom (cor) é decidido pelo consumidor a partir do próprio threshold de
 * negócio — este bloco não embute faixas de latência/hit-rate/etc.
 */
export type MetricGaugeTone = "default" | "success" | "warning" | "danger" | "info" | "muted";

export type MetricGaugeCardProps = {
	label: string;
	value: React.ReactNode;
	unit?: string;
	tone?: MetricGaugeTone;
	tooltip?: React.ReactNode;
	/** Progresso opcional 0-100 (ex.: hit rate, ocupação). */
	progress?: number;
	className?: string;
};

/* Os tons públicos deste bloco traduzidos para os tons semânticos do núcleo. */
const semanticTone: Record<MetricGaugeTone, Tone> = {
	default: "brand",
	success: "success",
	warning: "warning",
	danger: "danger",
	info: "info",
	muted: "neutral",
};

/**
 * Card de métrica com tom semântico (definido pelo consumidor), tooltip
 * explicativo opcional e barra de progresso opcional — para dashboards de
 * monitoramento/desempenho.
 */
export function MetricGaugeCard({
	label,
	value,
	unit,
	tone = "default",
	tooltip,
	progress,
	className,
}: MetricGaugeCardProps) {
	return (
		<div className={cn("rounded-2xl border border-border bg-card p-5 shadow-sm", className)}>
			<div className="flex items-start justify-between">
				<span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
					{label}
				</span>
				{tooltip && (
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger
								render={
									<button
										type="button"
										className="flex size-5 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground"
									/>
								}
							>
								<HelpCircle className="size-3.5" />
							</TooltipTrigger>
							<TooltipContent side="top" className="max-w-56 text-xs">
								{tooltip}
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				)}
			</div>
			<div className="mt-3 flex items-baseline gap-1">
				<span className={cn("text-3xl font-bold", toneClass(semanticTone[tone], "text"))}>
					{value}
				</span>
				{unit && <span className="text-sm text-muted-foreground">{unit}</span>}
			</div>
			{progress !== undefined && (
				<div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
					<div
						className={cn(
							"h-full rounded-full transition-all",
							toneClass(semanticTone[tone], "dot"),
						)}
						style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
					/>
				</div>
			)}
		</div>
	);
}
