import { type VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import type * as React from "react";

import { cn } from "../utils/cn";

/*
 * Indicador de carregamento. Com label → role="status" com texto acessível;
 * sem label → aria-hidden (quem anuncia é o contexto).
 */
const spinnerVariants = cva("animate-spin text-muted-foreground", {
	variants: {
		size: {
			sm: "size-4",
			md: "size-6",
			lg: "size-8",
		},
	},
	defaultVariants: { size: "md" },
});

export type SpinnerProps = React.HTMLAttributes<HTMLSpanElement> &
	VariantProps<typeof spinnerVariants> & {
		label?: string;
	};

function Spinner({ size, label, className, ...props }: SpinnerProps) {
	if (!label) {
		return (
			<span aria-hidden="true" className={cn("inline-flex", className)} {...props}>
				<Loader2 className={spinnerVariants({ size })} />
			</span>
		);
	}
	return (
		// biome-ignore lint/a11y/useSemanticElements: role="status" é a live region correta; não existe elemento nativo equivalente
		<span
			role="status"
			className={cn("inline-flex items-center gap-2 text-sm text-muted-foreground", className)}
			{...props}
		>
			<Loader2 className={spinnerVariants({ size })} />
			{label}
		</span>
	);
}

export { Spinner, spinnerVariants };
