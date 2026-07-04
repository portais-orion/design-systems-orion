"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import {
	Button,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	cn,
} from "@grupo/ui";

/*
 * Recriado a partir da API do Portal-Aurora ui/Pagination.tsx, tokenizado e
 * sobre @grupo/ui. Compatível com o envelope { data, total, page, limit }.
 */
export type PaginationProps = {
	page: number;
	limit: number;
	total: number;
	limitOptions?: number[];
	onPageChange: (page: number) => void;
	onLimitChange?: (limit: number) => void;
	className?: string;
};

export function Pagination({
	page,
	limit,
	total,
	limitOptions = [10, 20, 50, 100],
	onPageChange,
	onLimitChange,
	className,
}: PaginationProps) {
	if (total === 0) return null;

	const totalPages = Math.max(1, Math.ceil(total / limit));
	const from = (page - 1) * limit + 1;
	const to = Math.min(page * limit, total);
	const fmt = new Intl.NumberFormat("pt-BR");

	return (
		<div
			className={cn(
				"flex flex-col gap-3 rounded-xl border border-border bg-background px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between",
				className,
			)}
		>
			<div className="flex items-center gap-3 text-sm text-muted-foreground">
				{onLimitChange && (
					<div className="flex items-center gap-2">
						<span>Exibir</span>
						<Select
							value={String(limit)}
							onValueChange={(v) => {
								onLimitChange(Number(v));
								onPageChange(1);
							}}
							items={limitOptions.map((o) => ({ value: String(o), label: String(o) }))}
						>
							<SelectTrigger className="h-8 w-fit min-w-16" aria-label="Itens por página">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{limitOptions.map((opt) => (
									<SelectItem key={opt} value={String(opt)}>
										{opt}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				)}
				<span>
					Mostrando <span className="font-medium text-foreground">{fmt.format(from)}</span> a{" "}
					<span className="font-medium text-foreground">{fmt.format(to)}</span> de{" "}
					<span className="font-medium text-foreground">{fmt.format(total)}</span> resultados
				</span>
			</div>
			<div className="flex items-center gap-2">
				<Button
					variant="outline"
					size="icon-sm"
					aria-label="Página anterior"
					disabled={page <= 1}
					onClick={() => onPageChange(page - 1)}
				>
					<ChevronLeft />
				</Button>
				<span className="min-w-20 text-center text-sm text-muted-foreground">
					Página <span className="font-medium text-foreground">{fmt.format(page)}</span> de{" "}
					<span className="font-medium text-foreground">{fmt.format(totalPages)}</span>
				</span>
				<Button
					variant="outline"
					size="icon-sm"
					aria-label="Próxima página"
					disabled={page >= totalPages}
					onClick={() => onPageChange(page + 1)}
				>
					<ChevronRight />
				</Button>
			</div>
		</div>
	);
}
