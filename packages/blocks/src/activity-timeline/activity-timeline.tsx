import type * as React from "react";

import { cn } from "@design-systems-orion/ui";

/*
 * Extraído de gestao-demandas/[id] ("Histórico") e ContainerInspection
 * HistoryView ("Linha do Tempo"): linha vertical conectando nós circulares
 * com ícone, cada um com card de título/data/descrição e um slot livre no
 * rodapé (ex.: "de X para Y", "responsável: Fulano").
 */
export type TimelineTone = "default" | "success" | "warning" | "danger" | "info" | "muted";

export type TimelineItem = {
	id: string;
	icon?: React.ComponentType<{ className?: string }>;
	tone?: TimelineTone;
	title: React.ReactNode;
	timestampLabel?: string;
	description?: React.ReactNode;
	/** Conteúdo livre no rodapé do card (ex.: diff de status, responsável). */
	meta?: React.ReactNode;
};

export type ActivityTimelineProps = {
	items: TimelineItem[];
	emptyMessage?: string;
	className?: string;
};

const iconBoxByTone: Record<TimelineTone, string> = {
	default: "bg-primary/10 text-primary",
	success: "bg-emerald-50 text-emerald-600",
	warning: "bg-amber-50 text-amber-600",
	danger: "bg-rose-50 text-rose-600",
	info: "bg-sky-50 text-sky-600",
	muted: "bg-muted text-muted-foreground",
};

/**
 * Linha do tempo vertical de eventos (auditoria, histórico de status, etc.):
 * nó circular com ícone, conectado por uma linha, e um card com
 * título/data/descrição. Dados via props — não busca nada.
 */
export function ActivityTimeline({
	items,
	emptyMessage = "Nenhum evento registrado.",
	className,
}: ActivityTimelineProps) {
	if (items.length === 0) {
		return <p className="text-sm text-muted-foreground">{emptyMessage}</p>;
	}

	return (
		<div className={cn("ml-3 space-y-6 border-l-2 border-border pb-1", className)}>
			{items.map((item) => {
				const Icon = item.icon;
				return (
					<div key={item.id} className="relative pl-6">
						<div
							className={cn(
								"absolute -left-[17px] flex size-8 items-center justify-center rounded-full ring-4 ring-background",
								iconBoxByTone[item.tone ?? "default"],
							)}
						>
							{Icon && <Icon className="size-4" />}
						</div>
						<div className="rounded-lg border border-border bg-card p-3 shadow-sm">
							<div className="mb-1 flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between">
								<span className="text-sm font-semibold text-foreground">{item.title}</span>
								{item.timestampLabel && (
									<span className="text-xs text-muted-foreground">{item.timestampLabel}</span>
								)}
							</div>
							{item.description && (
								<p className="mb-1 text-sm text-muted-foreground">{item.description}</p>
							)}
							{item.meta && (
								<div className="mt-2 border-t border-dashed border-border pt-2 text-xs text-muted-foreground">
									{item.meta}
								</div>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
}
