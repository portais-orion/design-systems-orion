"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { Check } from "lucide-react";
import * as React from "react";
import { cn } from "../utils/cn";

/**
 * Caixa de seleção para escolhas independentes (marcar/desmarcar). Controle com
 * `checked` e `onCheckedChange`; associe um `Label` via `id`/`htmlFor`.
 */
const Checkbox = React.forwardRef<
	React.ElementRef<typeof CheckboxPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
	<CheckboxPrimitive.Root
		ref={ref}
		className={cn(
			"peer flex size-4 shrink-0 items-center justify-center rounded border border-border bg-background outline-none ring-offset-background transition-all hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
			className,
		)}
		{...props}
	>
		<CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
			<Check className="size-3 stroke-[3px]" />
		</CheckboxPrimitive.Indicator>
	</CheckboxPrimitive.Root>
));
Checkbox.displayName = "Checkbox";

export { Checkbox };
