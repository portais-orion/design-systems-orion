"use client";

import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import * as React from "react";

import { cn } from "../utils/cn";

/*
 * Sobre o Progress do Base UI (aria-valuenow/min/max automáticos).
 * value ausente/null → indeterminate (barra animada).
 */
export type ProgressProps = Omit<
	React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
	"value"
> & {
	/** Progresso atual. `null` (padrão) rende a barra indeterminada. */
	value?: number | null;
	/** Valor que representa 100%. */
	max?: number;
	/** Classes aplicadas à barra preenchida, não ao trilho. */
	indicatorClassName?: string;
};

/**
 * Barra de progresso de uma tarefa. `value` ausente ou `null` significa
 * progresso indeterminado e renderiza uma barra animada.
 */
const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
	({ className, value = null, max = 100, indicatorClassName, ...props }, ref) => {
		const indeterminate = value == null;
		const pct = indeterminate ? 0 : Math.min(100, Math.max(0, (value / max) * 100));
		return (
			<ProgressPrimitive.Root ref={ref} value={value ?? null} max={max} {...props}>
				<ProgressPrimitive.Track
					className={cn("relative h-2 w-full overflow-hidden rounded-full bg-muted", className)}
				>
					<ProgressPrimitive.Indicator
						className={cn(
							"h-full rounded-full bg-primary transition-all",
							indeterminate && "w-1/3 animate-pulse",
							indicatorClassName,
						)}
						style={indeterminate ? undefined : { width: `${pct}%` }}
					/>
				</ProgressPrimitive.Track>
			</ProgressPrimitive.Root>
		);
	},
);
Progress.displayName = "Progress";

export { Progress };
