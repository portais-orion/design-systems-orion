import type * as React from "react";

import { cn } from "@design-systems-orion/ui";

/*
 * Extraído de components/cronograma/cronograma-page.tsx (GANTT_*, MONTHS,
 * pxOf/pctOf): timeline horizontal com cabeçalho de meses proporcional ao
 * intervalo total e barras posicionadas por data de início/fim. O original
 * tinha o intervalo (nov/25–set/26) e os meses hardcoded; aqui tudo é
 * derivado de `rangeStart`/`rangeEnd`. Sem lib de gráfico — grid e barras são
 * `div`s posicionados por porcentagem, igual ao original.
 */
export type GanttTone = "default" | "success" | "warning" | "danger" | "info" | "muted";

export type GanttRow = {
	id: string;
	label: React.ReactNode;
	/** Datas no formato aceito por `new Date(...)`; `null` = sem dado, barra não aparece. */
	startDate: string | Date | null;
	endDate: string | Date | null;
	tone?: GanttTone;
	tooltip?: string;
	onClick?: () => void;
};

export type GanttChartProps = {
	rangeStart: Date;
	rangeEnd: Date;
	rows: GanttRow[];
	/** Data marcada com uma linha vertical tracejada. Padrão: hoje. */
	todayDate?: Date;
	emptyMessage?: string;
	className?: string;
};

const barToneClass: Record<GanttTone, string> = {
	default: "bg-primary",
	success: "bg-emerald-500",
	warning: "bg-amber-500",
	danger: "bg-rose-500",
	info: "bg-sky-500",
	muted: "bg-muted-foreground",
};

function toDate(value: string | Date | null): Date | null {
	if (!value) return null;
	return value instanceof Date ? value : new Date(value);
}

function buildMonthSegments(rangeStart: Date, rangeEnd: Date) {
	const totalMs = rangeEnd.getTime() - rangeStart.getTime();
	if (totalMs <= 0) return [];

	const segments: { label: string; pctLeft: number; pctWidth: number }[] = [];
	const cursor = new Date(rangeStart.getFullYear(), rangeStart.getMonth(), 1);

	while (cursor.getTime() < rangeEnd.getTime()) {
		const segmentStart = cursor.getTime() < rangeStart.getTime() ? rangeStart : new Date(cursor);
		const nextMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1);
		const segmentEnd = nextMonth.getTime() > rangeEnd.getTime() ? rangeEnd : nextMonth;

		segments.push({
			label: cursor.toLocaleDateString("pt-BR", { month: "short", year: "2-digit" }),
			pctLeft: ((segmentStart.getTime() - rangeStart.getTime()) / totalMs) * 100,
			pctWidth: ((segmentEnd.getTime() - segmentStart.getTime()) / totalMs) * 100,
		});

		cursor.setMonth(cursor.getMonth() + 1);
	}

	return segments;
}

function pctOf(date: Date | null, rangeStart: Date, totalMs: number): number | null {
	if (!date || totalMs <= 0) return null;
	return Math.max(0, Math.min(1, (date.getTime() - rangeStart.getTime()) / totalMs)) * 100;
}

/**
 * Timeline horizontal (Gantt) com barras por linha posicionadas entre
 * `startDate`/`endDate` dentro de `rangeStart`–`rangeEnd`, cabeçalho de meses
 * proporcional e linha vertical marcando `todayDate`. Presentational — não
 * calcula datas de negócio, só posiciona o que recebe.
 */
export function GanttChart({
	rangeStart,
	rangeEnd,
	rows,
	todayDate,
	emptyMessage = "Nenhum item no período.",
	className,
}: GanttChartProps) {
	const totalMs = rangeEnd.getTime() - rangeStart.getTime();
	const months = buildMonthSegments(rangeStart, rangeEnd);
	const todayPct = pctOf(todayDate ?? new Date(), rangeStart, totalMs);

	if (rows.length === 0) {
		return (
			<p className={cn("py-8 text-center text-sm text-muted-foreground", className)}>
				{emptyMessage}
			</p>
		);
	}

	return (
		<div className={cn("overflow-x-auto rounded-xl border border-border bg-card", className)}>
			<div className="min-w-[900px]">
				<div className="relative flex border-b border-border">
					{months.map((month) => (
						<div
							key={`${month.label}-${month.pctLeft}`}
							style={{ width: `${month.pctWidth}%` }}
							className="border-l border-border px-2 py-2 text-center text-[10px] font-bold tracking-widest text-muted-foreground uppercase first:border-l-0"
						>
							{month.label}
						</div>
					))}
				</div>

				<div className="relative">
					{todayPct !== null && (
						<div
							className="pointer-events-none absolute top-0 bottom-0 z-10 border-l border-dashed border-primary"
							style={{ left: `${todayPct}%` }}
						/>
					)}

					{rows.map((row) => {
						const start = toDate(row.startDate);
						const end = toDate(row.endDate);
						const left = pctOf(start, rangeStart, totalMs);
						const rightPct = pctOf(end, rangeStart, totalMs);
						const width = left !== null && rightPct !== null ? Math.max(rightPct - left, 1) : null;

						return (
							<div
								key={row.id}
								className="flex items-center gap-3 border-b border-border/60 py-2 last:border-b-0"
							>
								<div className="w-48 shrink-0 truncate pl-3 text-sm text-foreground">
									{row.label}
								</div>
								<div className="relative h-6 flex-1">
									{left !== null && width !== null && (
										<button
											type="button"
											title={row.tooltip}
											onClick={row.onClick}
											disabled={!row.onClick}
											style={{ left: `${left}%`, width: `${width}%` }}
											className={cn(
												"absolute inset-y-0 rounded-md",
												barToneClass[row.tone ?? "default"],
												row.onClick
													? "cursor-pointer opacity-90 hover:opacity-100"
													: "cursor-default",
											)}
										/>
									)}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
