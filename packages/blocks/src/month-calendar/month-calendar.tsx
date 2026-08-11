"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";

import { Button, Card, cn } from "@design-systems-orion/ui";

/*
 * Extraído de gestao-demandas/grade-programacao (Supertrans): calendário mensal
 * com badges de contagem por dia e seleção de dia (a tela mostra uma tabela
 * abaixo com o detalhe do dia selecionado — isso fica a cargo do consumidor,
 * já coberto por DataTable/Table). O original tinha mês/ano fixos (Junho/2026)
 * e 30 células fixas; aqui o grid de semanas é calculado a partir de `month`,
 * incluindo os dias de borda do mês anterior/seguinte.
 */
export type CalendarDayTone = "default" | "success" | "warning" | "danger" | "info" | "muted";

export type CalendarDayBadge = {
	label: string;
	tone?: CalendarDayTone;
};

export type MonthCalendarProps = {
	/** Qualquer data dentro do mês exibido — só o ano/mês são considerados. */
	month: Date;
	/** Rótulo do header (ex.: "Junho 2026"). Sem isso, formata `month` em pt-BR. */
	monthLabel?: string;
	weekdayLabels?: string[];
	/** Badges (contadores de status, eventos, etc.) de um dia do mês exibido. */
	getDayBadges?: (date: Date) => CalendarDayBadge[];
	/** Por padrão compara com a data atual do ambiente. */
	isToday?: (date: Date) => boolean;
	selectedDate?: Date | null;
	onSelectDate?: (date: Date) => void;
	/** Omitir esconde/desabilita o botão de navegação correspondente. */
	onPrevMonth?: () => void;
	onNextMonth?: () => void;
	/** Legenda de tons (ex.: bolinhas coloridas + texto) no rodapé. */
	legend?: React.ReactNode;
	/** Texto auxiliar no rodapé, à direita da legenda (ex.: "Clique em um dia..."). */
	footerHint?: React.ReactNode;
	className?: string;
};

const DEFAULT_WEEKDAY_LABELS = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];

const badgeToneClass: Record<CalendarDayTone, string> = {
	default: "bg-primary/10 text-primary",
	success: "bg-emerald-100 text-emerald-700",
	warning: "bg-amber-100 text-amber-700",
	danger: "bg-rose-100 text-rose-700",
	info: "bg-sky-100 text-sky-700",
	muted: "bg-muted text-muted-foreground",
};

function isSameDay(a: Date, b: Date): boolean {
	return (
		a.getFullYear() === b.getFullYear() &&
		a.getMonth() === b.getMonth() &&
		a.getDate() === b.getDate()
	);
}

function buildMonthGrid(month: Date): Date[] {
	const year = month.getFullYear();
	const monthIndex = month.getMonth();
	const firstOfMonth = new Date(year, monthIndex, 1);
	const lastOfMonth = new Date(year, monthIndex + 1, 0);

	const leading = firstOfMonth.getDay();
	const gridStart = new Date(year, monthIndex, 1 - leading);

	const usedBeforeTrailing = leading + lastOfMonth.getDate();
	const trailing = (7 - (usedBeforeTrailing % 7)) % 7;
	const totalCells = usedBeforeTrailing + trailing;

	return Array.from({ length: totalCells }, (_, i) => {
		const day = new Date(gridStart);
		day.setDate(gridStart.getDate() + i);
		return day;
	});
}

function defaultMonthLabel(month: Date): string {
	const formatted = month.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
	return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

/**
 * Calendário mensal com grid de semanas completas (incluindo dias de borda dos
 * meses vizinhos, desabilitados), badges por dia e seleção de um dia. Não busca
 * dados nem conhece o domínio: `getDayBadges` e `onSelectDate` são a única
 * ponte com o consumidor, que decide o que renderizar abaixo (ex.: uma
 * `DataTable` com a programação do dia selecionado).
 */
export function MonthCalendar({
	month,
	monthLabel,
	weekdayLabels = DEFAULT_WEEKDAY_LABELS,
	getDayBadges,
	isToday,
	selectedDate,
	onSelectDate,
	onPrevMonth,
	onNextMonth,
	legend,
	footerHint,
	className,
}: MonthCalendarProps) {
	const days = React.useMemo(() => buildMonthGrid(month), [month]);
	const label = monthLabel ?? defaultMonthLabel(month);

	return (
		<Card className={cn("overflow-hidden p-0", className)}>
			<div className="flex items-center justify-between border-b border-border p-4">
				<Button
					type="button"
					variant="outline"
					size="icon-sm"
					onClick={onPrevMonth}
					disabled={!onPrevMonth}
					aria-label="Mês anterior"
				>
					<ChevronLeft />
				</Button>
				<h2 className="text-base font-bold text-foreground">{label}</h2>
				<Button
					type="button"
					variant="outline"
					size="icon-sm"
					onClick={onNextMonth}
					disabled={!onNextMonth}
					aria-label="Próximo mês"
				>
					<ChevronRight />
				</Button>
			</div>

			<div className="grid grid-cols-7 border-b border-border">
				{weekdayLabels.map((weekday) => (
					<div
						key={weekday}
						className="py-3 text-center text-[10px] font-bold tracking-widest text-muted-foreground uppercase"
					>
						{weekday}
					</div>
				))}
			</div>

			<div className="p-4">
				<div className="grid grid-cols-7 gap-2">
					{days.map((date) => {
						const inMonth = date.getMonth() === month.getMonth();

						if (!inMonth) {
							return (
								<div
									key={date.toISOString()}
									className="min-h-30 rounded-xl border border-transparent"
								/>
							);
						}

						const today = isToday ? isToday(date) : isSameDay(date, new Date());
						const selected = selectedDate ? isSameDay(date, selectedDate) : false;
						const badges = getDayBadges?.(date) ?? [];

						return (
							<button
								key={date.toISOString()}
								type="button"
								onClick={() => onSelectDate?.(date)}
								aria-pressed={selected}
								className={cn(
									"flex min-h-30 flex-col rounded-xl border p-2.5 text-left transition-colors",
									selected
										? "border-transparent ring-2 ring-primary ring-offset-2"
										: today
											? "border-primary bg-muted/40"
											: "border-border hover:border-muted-foreground/40",
								)}
							>
								<div className="mb-2 flex items-center justify-between">
									<span
										className={cn(
											"text-sm font-semibold",
											today
												? "flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground"
												: "text-foreground",
										)}
									>
										{date.getDate()}
									</span>
									{today && (
										<span className="text-[10px] font-bold tracking-wider text-primary uppercase">
											Hoje
										</span>
									)}
								</div>
								<div className="flex w-full flex-col gap-1">
									{badges.map((badge, index) => (
										<div
											key={`${badge.label}-${index}`}
											className={cn(
												"w-full truncate rounded px-1.5 py-0.5 text-center text-[9px] font-bold",
												badgeToneClass[badge.tone ?? "default"],
											)}
										>
											{badge.label}
										</div>
									))}
								</div>
							</button>
						);
					})}
				</div>
			</div>

			{(legend || footerHint) && (
				<div className="flex items-center justify-between border-t border-border px-6 py-4 text-sm text-muted-foreground">
					{legend && <div className="flex flex-wrap items-center gap-6">{legend}</div>}
					{footerHint && <div>{footerHint}</div>}
				</div>
			)}
		</Card>
	);
}
