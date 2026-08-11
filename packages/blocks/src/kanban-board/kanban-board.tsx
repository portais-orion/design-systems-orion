import type * as React from "react";

import { cn } from "@design-systems-orion/ui";

/*
 * Extraído de components/cronograma/cronograma-page.tsx (KanbanBoardView):
 * colunas por status com header colorido + contagem, cards deslizando
 * horizontalmente. Sem drag-and-drop — o original também não reordenava por
 * arraste entre colunas; se isso for necessário depois, é uma decisão de
 * dependência nova (@dnd-kit) e cabe um ADR, não vem embutido aqui.
 */
export type KanbanTone = "default" | "success" | "warning" | "danger" | "info" | "muted";

export type KanbanCardItem = {
	id: string;
	title: React.ReactNode;
	subtitle?: React.ReactNode;
	tone?: KanbanTone;
	onClick?: () => void;
};

export type KanbanColumn = {
	id: string;
	title: string;
	tone?: KanbanTone;
	cards: KanbanCardItem[];
};

export type KanbanBoardProps = {
	columns: KanbanColumn[];
	emptyMessage?: string;
	className?: string;
};

const dotToneClass: Record<KanbanTone, string> = {
	default: "bg-foreground/60",
	success: "bg-emerald-500",
	warning: "bg-amber-500",
	danger: "bg-rose-500",
	info: "bg-sky-500",
	muted: "bg-muted-foreground/50",
};

const cardBorderToneClass: Record<KanbanTone, string> = {
	default: "border-l-foreground/40",
	success: "border-l-emerald-500",
	warning: "border-l-amber-500",
	danger: "border-l-rose-500",
	info: "border-l-sky-500",
	muted: "border-l-muted-foreground/40",
};

/**
 * Quadro Kanban: colunas por status com contagem no header e cards em pilha
 * vertical, colunas deslizando horizontalmente. Sem drag-and-drop — reordenar
 * é responsabilidade do consumidor (via `onClick` + sua própria mutação).
 */
export function KanbanBoard({
	columns,
	emptyMessage = "Nenhuma coluna.",
	className,
}: KanbanBoardProps) {
	if (columns.length === 0) {
		return <p className="py-8 text-center text-sm text-muted-foreground">{emptyMessage}</p>;
	}

	return (
		<div className={cn("flex gap-4 overflow-x-auto pb-2", className)}>
			{columns.map((column) => (
				<div
					key={column.id}
					className="flex w-72 shrink-0 flex-col rounded-xl border border-border bg-muted/20"
				>
					<div className="flex items-center gap-2 border-b border-border px-3 py-2.5">
						<span className={cn("size-2 rounded-full", dotToneClass[column.tone ?? "default"])} />
						<h3 className="text-sm font-semibold text-foreground">{column.title}</h3>
						<span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
							{column.cards.length}
						</span>
					</div>
					<div className="flex flex-col gap-2 p-2.5">
						{column.cards.length === 0 ? (
							<p className="py-4 text-center text-xs text-muted-foreground">Vazio.</p>
						) : (
							column.cards.map((card) => (
								<button
									key={card.id}
									type="button"
									onClick={card.onClick}
									disabled={!card.onClick}
									className={cn(
										"rounded-lg border border-l-4 bg-card p-3 text-left shadow-sm transition-shadow",
										cardBorderToneClass[card.tone ?? "default"],
										card.onClick ? "cursor-pointer hover:shadow-md" : "cursor-default",
									)}
								>
									<p className="text-sm font-medium text-foreground">{card.title}</p>
									{card.subtitle && (
										<p className="mt-0.5 text-xs text-muted-foreground">{card.subtitle}</p>
									)}
								</button>
							))
						)}
					</div>
				</div>
			))}
		</div>
	);
}
