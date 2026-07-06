import { X } from "lucide-react";

import { cn } from "@portais-orion/ui";

/*
 * Chip de filtro ativo (label: valor + remover). Inspirado nos pills de
 * filtro do portal-supertrans (shared.tsx), com a API do plano da sprint:
 * o pill de dropdown do Supertrans Ã© outra peÃ§a e ficarÃ¡ no futuro FilterBar.
 */
export type FilterPillProps = {
	label: string;
	value?: string | number;
	onRemove?: () => void;
	className?: string;
};

export function FilterPill({ label, value, onRemove, className }: FilterPillProps) {
	return (
		<span
			className={cn(
				"inline-flex h-7 items-center gap-1.5 rounded-full border border-border bg-muted/50 pl-2.5 text-xs font-medium text-foreground",
				onRemove ? "pr-1" : "pr-2.5",
				className,
			)}
		>
			<span className="text-muted-foreground">{label}</span>
			{value !== undefined && value !== "" && (
				<>
					<span aria-hidden="true" className="text-muted-foreground/60">
						Â·
					</span>
					<span>{value}</span>
				</>
			)}
			{onRemove && (
				<button
					type="button"
					onClick={onRemove}
					aria-label={`Remover filtro ${label}`}
					className="flex size-5 items-center justify-center rounded-full text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
				>
					<X className="size-3" />
				</button>
			)}
		</span>
	);
}
