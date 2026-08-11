import { cn } from "@design-systems-orion/ui";

import { type Tone, toneClass } from "../_internal/tone";

/*
 * Indicador de status por tom semântico. Origem conceitual: StatusDot do
 * portal-supertrans (que era binário Ativo/Inativo com textos fixos) —
 * generalizado para tons + label livre.
 */
export type StatusTone = "default" | "success" | "warning" | "danger" | "info" | "muted";

export type StatusDotProps = {
	tone?: StatusTone;
	label?: string;
	className?: string;
};

/* Os tons públicos deste bloco traduzidos para os tons semânticos do núcleo. */
const semanticTone: Record<StatusTone, Tone> = {
	default: "neutral",
	success: "success",
	warning: "warning",
	danger: "danger",
	info: "info",
	muted: "neutral",
};

/**
 * Indicador de status por tom semântico. Sem `label` é só um ponto decorativo
 * (`aria-hidden`), então o significado precisa vir do contexto; com `label`
 * vira uma pílula com o texto legível.
 */
export function StatusDot({ tone = "default", label, className }: StatusDotProps) {
	const semantic = semanticTone[tone];
	const dot = toneClass(semantic, "dot");

	if (!label) {
		return (
			<span
				aria-hidden="true"
				className={cn("inline-block size-1.5 rounded-full", dot, className)}
			/>
		);
	}
	return (
		<span
			className={cn(
				"inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
				toneClass(semantic, "surface"),
				className,
			)}
		>
			<span aria-hidden="true" className={cn("size-1.5 rounded-full", dot)} />
			{label}
		</span>
	);
}
