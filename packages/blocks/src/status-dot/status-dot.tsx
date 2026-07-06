import { cn } from "@portais-orion/ui";

/*
 * Indicador de status por tom semÃ¢ntico. Origem conceitual: StatusDot do
 * portal-supertrans (que era binÃ¡rio Ativo/Inativo com textos fixos) â€”
 * generalizado para tons + label livre.
 */
export type StatusTone = "default" | "success" | "warning" | "danger" | "info" | "muted";

export type StatusDotProps = {
	tone?: StatusTone;
	label?: string;
	className?: string;
};

const dotByTone: Record<StatusTone, string> = {
	default: "bg-foreground/60",
	success: "bg-emerald-500",
	warning: "bg-amber-500",
	danger: "bg-destructive",
	info: "bg-sky-500",
	muted: "bg-muted-foreground/50",
};

const pillByTone: Record<StatusTone, string> = {
	default: "border-border bg-muted/50 text-foreground",
	success: "border-emerald-200 bg-emerald-50 text-emerald-700",
	warning: "border-amber-200 bg-amber-50 text-amber-700",
	danger: "border-destructive/30 bg-destructive/10 text-destructive",
	info: "border-sky-200 bg-sky-50 text-sky-700",
	muted: "border-border bg-muted/50 text-muted-foreground",
};

export function StatusDot({ tone = "default", label, className }: StatusDotProps) {
	if (!label) {
		return (
			<span
				aria-hidden="true"
				className={cn("inline-block size-1.5 rounded-full", dotByTone[tone], className)}
			/>
		);
	}
	return (
		<span
			className={cn(
				"inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
				pillByTone[tone],
				className,
			)}
		>
			<span aria-hidden="true" className={cn("size-1.5 rounded-full", dotByTone[tone])} />
			{label}
		</span>
	);
}
