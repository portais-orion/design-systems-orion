"use client";

import { File as FileIcon, Trash2 } from "lucide-react";

import { cn } from "@portais-orion/ui";

/*
 * Extraído de gestao-demandas/[id] (lista de documentos anexados): ícone
 * tonalizado por extensão, nome, data, badge de extensão, clique abre preview
 * (a cargo do consumidor — ex.: um DocumentPreviewDialog próprio) e remoção
 * opcional.
 */
export type AttachmentTone = "default" | "success" | "warning" | "danger" | "info" | "muted";

export type AttachmentItem = {
	id: string;
	name: string;
	extension?: string;
	dateLabel?: string;
	tone?: AttachmentTone;
};

export type AttachmentListProps = {
	items: AttachmentItem[];
	onSelect?: (item: AttachmentItem) => void;
	onRemove?: (item: AttachmentItem) => void;
	removeLabel?: string;
	emptyMessage?: string;
	className?: string;
};

const iconBoxByTone: Record<AttachmentTone, string> = {
	default: "bg-primary/10 text-primary",
	success: "bg-emerald-50 text-emerald-600",
	warning: "bg-amber-50 text-amber-600",
	danger: "bg-rose-50 text-rose-600",
	info: "bg-sky-50 text-sky-600",
	muted: "bg-muted text-muted-foreground",
};

/**
 * Lista de anexos: ícone tonalizado, nome, data e extensão, com seleção
 * (ex.: abrir preview) e remoção opcionais. Não sabe renderizar o preview do
 * arquivo em si — isso fica com o consumidor.
 */
export function AttachmentList({
	items,
	onSelect,
	onRemove,
	removeLabel = "Remover",
	emptyMessage = "Nenhum anexo.",
	className,
}: AttachmentListProps) {
	if (items.length === 0) {
		return (
			<p className={cn("py-4 text-center text-sm text-muted-foreground", className)}>
				{emptyMessage}
			</p>
		);
	}

	return (
		<div className={cn("divide-y divide-border rounded-lg border border-border", className)}>
			{items.map((item) => {
				const clickable = Boolean(onSelect);
				return (
					<div
						key={item.id}
						role={clickable ? "button" : undefined}
						tabIndex={clickable ? 0 : undefined}
						onClick={clickable ? () => onSelect?.(item) : undefined}
						onKeyDown={
							clickable
								? (event) => {
										if (event.key === "Enter" || event.key === " ") onSelect?.(item);
									}
								: undefined
						}
						className={cn(
							"flex items-center justify-between gap-3 p-3",
							clickable && "cursor-pointer hover:bg-muted/50",
						)}
					>
						<div className="flex min-w-0 items-center gap-3">
							<div
								className={cn(
									"flex size-9 shrink-0 items-center justify-center rounded-lg",
									iconBoxByTone[item.tone ?? "default"],
								)}
							>
								<FileIcon className="size-4" />
							</div>
							<div className="min-w-0">
								<p className="truncate text-sm font-medium text-foreground">{item.name}</p>
								{item.dateLabel && (
									<p className="text-xs text-muted-foreground">{item.dateLabel}</p>
								)}
							</div>
							{item.extension && (
								<span className="shrink-0 rounded border border-border px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground uppercase">
									{item.extension}
								</span>
							)}
						</div>
						{onRemove && (
							<button
								type="button"
								onClick={(event) => {
									event.stopPropagation();
									onRemove(item);
								}}
								aria-label={removeLabel}
								className="shrink-0 text-muted-foreground hover:text-destructive"
							>
								<Trash2 className="size-4" />
							</button>
						)}
					</div>
				);
			})}
		</div>
	);
}
